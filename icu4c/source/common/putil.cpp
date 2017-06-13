// © 2016 and later: Unicode, Inc. and others.
// License & terms of use: http://www.unicode.org/copyright.html
/*
******************************************************************************
*
*   Copyright (C) 1997-2016, International Business Machines
*   Corporation and others.  All Rights Reserved.
*
******************************************************************************
*
*  FILE NAME : putil.c (previously putil.cpp and ptypes.cpp)
*
*   Date        Name        Description
*   04/14/97    aliu        Creation.
*   04/24/97    aliu        Added getDefaultDataDirectory() and
*                            getDefaultLocaleID().
*   04/28/97    aliu        Rewritten to assume Unix and apply general methods
*                            for assumed case.  Non-UNIX platforms must be
*                            special-cased.  Rewrote numeric methods dealing
*                            with NaN and Infinity to be platform independent
*                             over all IEEE 754 platforms.
*   05/13/97    aliu        Restored sign of timezone
*                            (semantics are hours West of GMT)
*   06/16/98    erm         Added IEEE_754 stuff, cleaned up isInfinite, isNan,
*                             nextDouble..
*   07/22/98    stephen     Added remainder, max, min, trunc
*   08/13/98    stephen     Added isNegativeInfinity, isPositiveInfinity
*   08/24/98    stephen     Added longBitsFromDouble
*   09/08/98    stephen     Minor changes for Mac Port
*   03/02/99    stephen     Removed openFile().  Added AS400 support.
*                            Fixed EBCDIC tables
*   04/15/99    stephen     Converted to C.
*   06/28/99    stephen     Removed mutex locking in u_isBigEndian().
*   08/04/99    jeffrey R.  Added OS/2 changes
*   11/15/99    helena      Integrated S/390 IEEE support.
*   04/26/01    Barry N.    OS/400 support for uprv_getDefaultLocaleID
*   08/15/01    Steven H.   OS/400 support for uprv_getDefaultCodepage
*   01/03/08    Steven L.   Fake Time Support
******************************************************************************
*/

// Defines _XOPEN_SOURCE for access to POSIX functions.
// Must be before any other #includes.
#include "uposixdefs.h"

// First, the platform type. Need this for U_PLATFORM.
#include "unicode/platform.h"

#if U_PLATFORM == U_PF_MINGW && defined __STRICT_ANSI__
/* tzset isn't defined in strict ANSI on MinGW. */
#undef __STRICT_ANSI__
#endif

/*
 * Cygwin with GCC requires inclusion of time.h after the above disabling strict asci mode statement.
 */
#include <time.h>

#if !U_PLATFORM_USES_ONLY_WIN32_API
#include <sys/time.h>
#endif

/* include the rest of the ICU headers */
#include "unicode/putil.h"
#include "unicode/ustring.h"
#include "putilimp.h"
#include "uassert.h"
#include "umutex.h"
#include "cmemory.h"
#include "cstring.h"
#include "locmap.h"
#include "ucln_cmn.h"
#include "charstr.h"

/* Include standard headers. */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <locale.h>
#include <float.h>

#ifndef U_COMMON_IMPLEMENTATION
#error U_COMMON_IMPLEMENTATION not set - must be set for all ICU source files in common/ - see http://userguide.icu-project.org/howtouseicu
#endif


/* include system headers */
#if U_PLATFORM_USES_ONLY_WIN32_API
    /*
     * TODO: U_PLATFORM_USES_ONLY_WIN32_API includes MinGW.
     * Should Cygwin be included as well (U_PLATFORM_HAS_WIN32_API)
     * to use native APIs as much as possible?
     */
#ifndef WIN32_LEAN_AND_MEAN
#   define WIN32_LEAN_AND_MEAN
#endif
#   define VC_EXTRALEAN
#   define NOUSER
#   define NOSERVICE
#   define NOIME
#   define NOMCX
#   include <windows.h>
#   include "unicode/uloc.h"
#if U_PLATFORM_HAS_WINUWP_API == 0
#   include "wintz.h"
#else // U_PLATFORM_HAS_WINUWP_API
typedef PVOID LPMSG; // TODO: figure out how to get rid of this typedef
#include <Windows.Globalization.h>
#include <windows.system.userprofile.h>
#include <wrl/wrappers/corewrappers.h>
#include <wrl/client.h>

using namespace ABI::Windows::Foundation;
using namespace Microsoft::WRL;
using namespace Microsoft::WRL::Wrappers;
#endif
#elif U_PLATFORM == U_PF_OS400
#   include <float.h>
#   include <qusec.h>       /* error code structure */
#   include <qusrjobi.h>
#   include <qliept.h>      /* EPT_CALL macro  - this include must be after all other "QSYSINCs" */
#   include <mih/testptr.h> /* For uprv_maximumPtr */
#elif U_PLATFORM == U_PF_OS390
#   include "unicode/ucnv.h"   /* Needed for UCNV_SWAP_LFNL_OPTION_STRING */
#elif U_PLATFORM_IS_DARWIN_BASED || U_PLATFORM_IS_LINUX_BASED || U_PLATFORM == U_PF_BSD || U_PLATFORM == U_PF_SOLARIS
#   include <limits.h>
#   include <unistd.h>
#   if U_PLATFORM == U_PF_SOLARIS
#       ifndef _XPG4_2
#           define _XPG4_2
#       endif
#   endif
#elif U_PLATFORM == U_PF_QNX
#   include <sys/neutrino.h>
#endif

/*
 * Only include langinfo.h if we have a way to get the codeset. If we later
 * depend on more feature, we can test on U_HAVE_NL_LANGINFO.
 *
 */

#if U_HAVE_NL_LANGINFO_CODESET
#include <langinfo.h>
#endif

/**
 * Simple things (presence of functions, etc) should just go in configure.in and be added to
 * icucfg.h via autoheader.
 */
#if U_PLATFORM_IMPLEMENTS_POSIX
#   if U_PLATFORM == U_PF_OS400
#    define HAVE_DLFCN_H 0
#    define HAVE_DLOPEN 0
#   else
#   ifndef HAVE_DLFCN_H
#    define HAVE_DLFCN_H 1
#   endif
#   ifndef HAVE_DLOPEN
#    define HAVE_DLOPEN 1
#   endif
#   endif
#   ifndef HAVE_GETTIMEOFDAY
#    define HAVE_GETTIMEOFDAY 1
#   endif
#else
#   define HAVE_DLFCN_H 0
#   define HAVE_DLOPEN 0
#   define HAVE_GETTIMEOFDAY 0
#endif

U_NAMESPACE_USE

/* Define the extension for data files, again... */
#define DATA_TYPE "dat"

/* Leave this copyright notice here! */
static const char copyright[] = U_COPYRIGHT_STRING;

/* floating point implementations ------------------------------------------- */

/* We return QNAN rather than SNAN*/
#define SIGN 0x80000000U

/* Make it easy to define certain types of constants */
typedef union {
    int64_t i64; /* This must be defined first in order to allow the initialization to work. This is a C89 feature. */
    double d64;
} BitPatternConversion;
static const BitPatternConversion gNan = { (int64_t) INT64_C(0x7FF8000000000000) };
static const BitPatternConversion gInf = { (int64_t) INT64_C(0x7FF0000000000000) };

/*---------------------------------------------------------------------------
  Platform utilities
  Our general strategy is to assume we're on a POSIX platform.  Platforms which
  are non-POSIX must declare themselves so.  The default POSIX implementation
  will sometimes work for non-POSIX platforms as well (e.g., the NaN-related
  functions).
  ---------------------------------------------------------------------------*/

#if U_PLATFORM_USES_ONLY_WIN32_API || U_PLATFORM == U_PF_OS400
#   undef U_POSIX_LOCALE
#else
#   define U_POSIX_LOCALE    1
#endif

/*
    WARNING! u_topNBytesOfDouble and u_bottomNBytesOfDouble
    can't be properly optimized by the gcc compiler sometimes (i.e. gcc 3.2).
*/
#if !IEEE_754
static char*
u_topNBytesOfDouble(double* d, int n)
{
#if U_IS_BIG_ENDIAN
    return (char*)d;
#else
    return (char*)(d + 1) - n;
#endif
}

static char*
u_bottomNBytesOfDouble(double* d, int n)
{
#if U_IS_BIG_ENDIAN
    return (char*)(d + 1) - n;
#else
    return (char*)d;
#endif
}
#endif   /* !IEEE_754 */

#if IEEE_754
static UBool
u_signBit(double d) {
    uint8_t hiByte;
#if U_IS_BIG_ENDIAN
    hiByte = *(uint8_t *)&d;
#else
    hiByte = *(((uint8_t *)&d) + sizeof(double) - 1);
#endif
    return (hiByte & 0x80) != 0;
}
#endif



#if defined (U_DEBUG_FAKETIME)
/* Override the clock to test things without having to move the system clock.
 * Assumes POSIX gettimeofday() will function
 */
UDate fakeClock_t0 = 0; /** Time to start the clock from **/
UDate fakeClock_dt = 0; /** Offset (fake time - real time) **/
UBool fakeClock_set = FALSE; /** True if fake clock has spun up **/
static UMutex fakeClockMutex = U_MUTEX_INTIALIZER;

static UDate getUTCtime_real() {
    struct timeval posixTime;
    gettimeofday(&posixTime, NULL);
    return (UDate)(((int64_t)posixTime.tv_sec * U_MILLIS_PER_SECOND) + (posixTime.tv_usec/1000));
}

static UDate getUTCtime_fake() {
    umtx_lock(&fakeClockMutex);
    if(!fakeClock_set) {
        UDate real = getUTCtime_real();
        const char *fake_start = getenv("U_FAKETIME_START");
        if((fake_start!=NULL) && (fake_start[0]!=0)) {
            sscanf(fake_start,"%lf",&fakeClock_t0);
            fakeClock_dt = fakeClock_t0 - real;
            fprintf(stderr,"U_DEBUG_FAKETIME was set at compile time, so the ICU clock will start at a preset value\n"
                    "env variable U_FAKETIME_START=%.0f (%s) for an offset of %.0f ms from the current time %.0f\n",
                    fakeClock_t0, fake_start, fakeClock_dt, real);
        } else {
          fakeClock_dt = 0;
            fprintf(stderr,"U_DEBUG_FAKETIME was set at compile time, but U_FAKETIME_START was not set.\n"
                    "Set U_FAKETIME_START to the number of milliseconds since 1/1/1970 to set the ICU clock.\n");
        }
        fakeClock_set = TRUE;
    }
    umtx_unlock(&fakeClockMutex);

    return getUTCtime_real() + fakeClock_dt;
}
#endif

#if U_PLATFORM_USES_ONLY_WIN32_API
typedef union {
    int64_t int64;
    FILETIME fileTime;
} FileTimeConversion;   /* This is like a ULARGE_INTEGER */

/* Number of 100 nanoseconds from 1/1/1601 to 1/1/1970 */
#define EPOCH_BIAS  INT64_C(116444736000000000)
#define HECTONANOSECOND_PER_MILLISECOND   10000

#endif

/*---------------------------------------------------------------------------
  Universal Implementations
  These are designed to work on all platforms.  Try these, and if they
  don't work on your platform, then special case your platform with new
  implementations.
---------------------------------------------------------------------------*/

U_CAPI UDate U_EXPORT2
uprv_getUTCtime()
{
#if defined(U_DEBUG_FAKETIME)
    return getUTCtime_fake(); /* Hook for overriding the clock */
#else
    return uprv_getRawUTCtime();
#endif
}

/* Return UTC (GMT) time measured in milliseconds since 0:00 on 1/1/70.*/
U_CAPI UDate U_EXPORT2
uprv_getRawUTCtime()
{
#if U_PLATFORM_USES_ONLY_WIN32_API

    FileTimeConversion winTime;
    GetSystemTimeAsFileTime(&winTime.fileTime);
    return (UDate)((winTime.int64 - EPOCH_BIAS) / HECTONANOSECOND_PER_MILLISECOND);
#else

#if HAVE_GETTIMEOFDAY
    struct timeval posixTime;
    gettimeofday(&posixTime, NULL);
    return (UDate)(((int64_t)posixTime.tv_sec * U_MILLIS_PER_SECOND) + (posixTime.tv_usec/1000));
#else
    time_t epochtime;
    time(&epochtime);
    return (UDate)epochtime * U_MILLIS_PER_SECOND;
#endif

#endif
}

/*-----------------------------------------------------------------------------
  IEEE 754
  These methods detect and return NaN and infinity values for doubles
  conforming to IEEE 754.  Platforms which support this standard include X86,
  Mac 680x0, Mac PowerPC, AIX RS/6000, and most others.
  If this doesn't work on your platform, you have non-IEEE floating-point, and
  will need to code your own versions.  A naive implementation is to return 0.0
  for getNaN and getInfinity, and false for isNaN and isInfinite.
  ---------------------------------------------------------------------------*/

U_CAPI UBool U_EXPORT2
uprv_isNaN(double number)
{
#if IEEE_754
    BitPatternConversion convertedNumber;
    convertedNumber.d64 = number;
    /* Infinity is 0x7FF0000000000000U. Anything greater than that is a NaN */
    return (UBool)((convertedNumber.i64 & U_INT64_MAX) > gInf.i64);

#elif U_PLATFORM == U_PF_OS390
    uint32_t highBits = *(uint32_t*)u_topNBytesOfDouble(&number,
                        sizeof(uint32_t));
    uint32_t lowBits  = *(uint32_t*)u_bottomNBytesOfDouble(&number,
                        sizeof(uint32_t));

    return ((highBits & 0x7F080000L) == 0x7F080000L) &&
      (lowBits == 0x00000000L);

#else
    /* If your platform doesn't support IEEE 754 but *does* have an NaN value,*/
    /* you'll need to replace this default implementation with what's correct*/
    /* for your platform.*/
    return number != number;
#endif
}

U_CAPI UBool U_EXPORT2
uprv_isInfinite(double number)
{
#if IEEE_754
    BitPatternConversion convertedNumber;
    convertedNumber.d64 = number;
    /* Infinity is exactly 0x7FF0000000000000U. */
    return (UBool)((convertedNumber.i64 & U_INT64_MAX) == gInf.i64);
#elif U_PLATFORM == U_PF_OS390
    uint32_t highBits = *(uint32_t*)u_topNBytesOfDouble(&number,
                        sizeof(uint32_t));
    uint32_t lowBits  = *(uint32_t*)u_bottomNBytesOfDouble(&number,
                        sizeof(uint32_t));

    return ((highBits  & ~SIGN) == 0x70FF0000L) && (lowBits == 0x00000000L);

#else
    /* If your platform doesn't support IEEE 754 but *does* have an infinity*/
    /* value, you'll need to replace this default implementation with what's*/
    /* correct for your platform.*/
    return number == (2.0 * number);
#endif
}

U_CAPI UBool U_EXPORT2
uprv_isPositiveInfinity(double number)
{
#if IEEE_754 || U_PLATFORM == U_PF_OS390
    return (UBool)(number > 0 && uprv_isInfinite(number));
#else
    return uprv_isInfinite(number);
#endif
}

U_CAPI UBool U_EXPORT2
uprv_isNegativeInfinity(double number)
{
#if IEEE_754 || U_PLATFORM == U_PF_OS390
    return (UBool)(number < 0 && uprv_isInfinite(number));

#else
    uint32_t highBits = *(uint32_t*)u_topNBytesOfDouble(&number,
                        sizeof(uint32_t));
    return((highBits & SIGN) && uprv_isInfinite(number));

#endif
}

U_CAPI double U_EXPORT2
uprv_getNaN()
{
#if IEEE_754 || U_PLATFORM == U_PF_OS390
    return gNan.d64;
#else
    /* If your platform doesn't support IEEE 754 but *does* have an NaN value,*/
    /* you'll need to replace this default implementation with what's correct*/
    /* for your platform.*/
    return 0.0;
#endif
}

U_CAPI double U_EXPORT2
uprv_getInfinity()
{
#if IEEE_754 || U_PLATFORM == U_PF_OS390
    return gInf.d64;
#else
    /* If your platform doesn't support IEEE 754 but *does* have an infinity*/
    /* value, you'll need to replace this default implementation with what's*/
    /* correct for your platform.*/
    return 0.0;
#endif
}

U_CAPI double U_EXPORT2
uprv_floor(double x)
{
    return floor(x);
}

U_CAPI double U_EXPORT2
uprv_ceil(double x)
{
    return ceil(x);
}

U_CAPI double U_EXPORT2
uprv_round(double x)
{
    return uprv_floor(x + 0.5);
}

U_CAPI double U_EXPORT2
uprv_fabs(double x)
{
    return fabs(x);
}

U_CAPI double U_EXPORT2
uprv_modf(double x, double* y)
{
    return modf(x, y);
}

U_CAPI double U_EXPORT2
uprv_fmod(double x, double y)
{
    return fmod(x, y);
}

U_CAPI double U_EXPORT2
uprv_pow(double x, double y)
{
    /* This is declared as "double pow(double x, double y)" */
    return pow(x, y);
}

U_CAPI double U_EXPORT2
uprv_pow10(int32_t x)
{
    return pow(10.0, (double)x);
}

U_CAPI double U_EXPORT2
uprv_fmax(double x, double y)
{
#if IEEE_754
    /* first handle NaN*/
    if(uprv_isNaN(x) || uprv_isNaN(y))
        return uprv_getNaN();

    /* check for -0 and 0*/
    if(x == 0.0 && y == 0.0 && u_signBit(x))
        return y;

#endif

    /* this should work for all flt point w/o NaN and Inf special cases */
    return (x > y ? x : y);
}

U_CAPI double U_EXPORT2
uprv_fmin(double x, double y)
{
#if IEEE_754
    /* first handle NaN*/
    if(uprv_isNaN(x) || uprv_isNaN(y))
        return uprv_getNaN();

    /* check for -0 and 0*/
    if(x == 0.0 && y == 0.0 && u_signBit(y))
        return y;

#endif

    /* this should work for all flt point w/o NaN and Inf special cases */
    return (x > y ? y : x);
}

/**
 * Truncates the given double.
 * trunc(3.3) = 3.0, trunc (-3.3) = -3.0
 * This is different than calling floor() or ceil():
 * floor(3.3) = 3, floor(-3.3) = -4
 * ceil(3.3) = 4, ceil(-3.3) = -3
 */
U_CAPI double U_EXPORT2
uprv_trunc(double d)
{
#if IEEE_754
    /* handle error cases*/
    if(uprv_isNaN(d))
        return uprv_getNaN();
    if(uprv_isInfinite(d))
        return uprv_getInfinity();

    if(u_signBit(d))    /* Signbit() picks up -0.0;  d<0 does not. */
        return ceil(d);
    else
        return floor(d);

#else
    return d >= 0 ? floor(d) : ceil(d);

#endif
}

/**
 * Return the largest positive number that can be represented by an integer
 * type of arbitrary bit length.
 */
U_CAPI double U_EXPORT2
uprv_maxMantissa(void)
{
    return pow(2.0, DBL_MANT_DIG + 1.0) - 1.0;
}

U_CAPI double U_EXPORT2
uprv_log(double d)
{
    return log(d);
}

U_CAPI void * U_EXPORT2
uprv_maximumPtr(void * base)
{
#if U_PLATFORM == U_PF_OS400
    /*
     * With the provided function we should never be out of range of a given segment
     * (a traditional/typical segment that is).  Our segments have 5 bytes for the
     * id and 3 bytes for the offset.  The key is that the casting takes care of
     * only retrieving the offset portion minus x1000.  Hence, the smallest offset
     * seen in a program is x001000 and when casted to an int would be 0.
     * That's why we can only add 0xffefff.  Otherwise, we would exceed the segment.
     *
     * Currently, 16MB is the current addressing limitation on i5/OS if the activation is
     * non-TERASPACE.  If it is TERASPACE it is 2GB - 4k(header information).
     * This function determines the activation based on the pointer that is passed in and
     * calculates the appropriate maximum available size for
     * each pointer type (TERASPACE and non-TERASPACE)
     *
     * Unlike other operating systems, the pointer model isn't determined at
     * compile time on i5/OS.
     */
    if ((base != NULL) && (_TESTPTR(base, _C_TERASPACE_CHECK))) {
        /* if it is a TERASPACE pointer the max is 2GB - 4k */
        return ((void *)(((char *)base)-((uint32_t)(base))+((uint32_t)0x7fffefff)));
    }
    /* otherwise 16MB since NULL ptr is not checkable or the ptr is not TERASPACE */
    return ((void *)(((char *)base)-((uint32_t)(base))+((uint32_t)0xffefff)));

#else
    return U_MAX_PTR(base);
#endif
}

/*---------------------------------------------------------------------------
  Platform-specific Implementations
  Try these, and if they don't work on your platform, then special case your
  platform with new implementations.
  ---------------------------------------------------------------------------*/

/* Generic time zone layer -------------------------------------------------- */

/* Time zone utilities */
U_CAPI void U_EXPORT2
uprv_tzset()
{
#if defined(U_TZSET)
    U_TZSET();
#else
    /* no initialization*/
#endif
}

U_CAPI int32_t U_EXPORT2
uprv_timezone()
{
#ifdef U_TIMEZONE
    return U_TIMEZONE;
#else
    time_t t, t1, t2;
    struct tm tmrec;
    int32_t tdiff = 0;

    time(&t);
    uprv_memcpy( &tmrec, localtime(&t), sizeof(tmrec) );
#if U_PLATFORM != U_PF_IPHONE
    UBool dst_checked = (tmrec.tm_isdst != 0); /* daylight savings time is checked*/
#endif
    t1 = mktime(&tmrec);                 /* local time in seconds*/
    uprv_memcpy( &tmrec, gmtime(&t), sizeof(tmrec) );
    t2 = mktime(&tmrec);                 /* GMT (or UTC) in seconds*/
    tdiff = t2 - t1;

#if U_PLATFORM != U_PF_IPHONE
    /* imitate NT behaviour, which returns same timezone offset to GMT for
       winter and summer.
       This does not work on all platforms. For instance, on glibc on Linux
       and on Mac OS 10.5, tdiff calculated above remains the same
       regardless of whether DST is in effect or not. iOS is another
       platform where this does not work. Linux + glibc and Mac OS 10.5
       have U_TIMEZONE defined so that this code is not reached.
    */
    if (dst_checked)
        tdiff += 3600;
#endif
    return tdiff;
#endif
}

/* Note that U_TZNAME does *not* have to be tzname, but if it is,
   some platforms need to have it declared here. */

#if defined(U_TZNAME) && (U_PLATFORM == U_PF_IRIX || U_PLATFORM_IS_DARWIN_BASED)
/* RS6000 and others reject char **tzname.  */
extern U_IMPORT char *U_TZNAME[];
#endif

#if !UCONFIG_NO_FILE_IO && ((U_PLATFORM_IS_DARWIN_BASED && (U_PLATFORM != U_PF_IPHONE || defined(U_TIMEZONE))) || U_PLATFORM_IS_LINUX_BASED || U_PLATFORM == U_PF_BSD || U_PLATFORM == U_PF_SOLARIS)
/* These platforms are likely to use Olson timezone IDs. */
#define CHECK_LOCALTIME_LINK 1
#if U_PLATFORM_IS_DARWIN_BASED
#include <tzfile.h>
#define TZZONEINFO      (TZDIR "/")
#elif U_PLATFORM == U_PF_SOLARIS
#define TZDEFAULT       "/etc/localtime"
#define TZZONEINFO      "/usr/share/lib/zoneinfo/"
#define TZZONEINFO2     "../usr/share/lib/zoneinfo/"
#define TZ_ENV_CHECK    "localtime"
#else
#define TZDEFAULT       "/etc/localtime"
#define TZZONEINFO      "/usr/share/zoneinfo/"
#endif
#if U_HAVE_DIRENT_H
#define TZFILE_SKIP     "posixrules" /* tz file to skip when searching. */
/* Some Linux distributions have 'localtime' in /usr/share/zoneinfo
   symlinked to /etc/localtime, which makes searchForTZFile return
   'localtime' when it's the first match. */
#define TZFILE_SKIP2    "localtime"
#define SEARCH_TZFILE
#include <dirent.h>  /* Needed to search through system timezone files */
#endif
static char gTimeZoneBuffer[PATH_MAX];
static char *gTimeZoneBufferPtr = NULL;
#endif

#if !U_PLATFORM_USES_ONLY_WIN32_API
#define isNonDigit(ch) (ch < '0' || '9' < ch)
static UBool isValidOlsonID(const char *id) {
    int32_t idx = 0;

    /* Determine if this is something like Iceland (Olson ID)
    or AST4ADT (non-Olson ID) */
    while (id[idx] && isNonDigit(id[idx]) && id[idx] != ',') {
        idx++;
    }

    /* If we went through the whole string, then it might be okay.
    The timezone is sometimes set to "CST-7CDT", "CST6CDT5,J129,J131/19:30",
    "GRNLNDST3GRNLNDDT" or similar, so we cannot use it.
    The rest of the time it could be an Olson ID. George */
    return (UBool)(id[idx] == 0
        || uprv_strcmp(id, "PST8PDT") == 0
        || uprv_strcmp(id, "MST7MDT") == 0
        || uprv_strcmp(id, "CST6CDT") == 0
        || uprv_strcmp(id, "EST5EDT") == 0);
}

/* On some Unix-like OS, 'posix' subdirectory in
   /usr/share/zoneinfo replicates the top-level contents. 'right'
   subdirectory has the same set of files, but individual files
   are different from those in the top-level directory or 'posix'
   because 'right' has files for TAI (Int'l Atomic Time) while 'posix'
   has files for UTC.
   When the first match for /etc/localtime is in either of them
   (usually in posix because 'right' has different file contents),
   or TZ environment variable points to one of them, createTimeZone
   fails because, say, 'posix/America/New_York' is not an Olson
   timezone id ('America/New_York' is). So, we have to skip
   'posix/' and 'right/' at the beginning. */
static void skipZoneIDPrefix(const char** id) {
    if (uprv_strncmp(*id, "posix/", 6) == 0
        || uprv_strncmp(*id, "right/", 6) == 0)
    {
        *id += 6;
    }
}
#endif

#if defined(U_TZNAME) && !U_PLATFORM_USES_ONLY_WIN32_API

#define CONVERT_HOURS_TO_SECONDS(offset) (int32_t)(offset*3600)
typedef struct OffsetZoneMapping {
    int32_t offsetSeconds;
    int32_t daylightType; /* 0=U_DAYLIGHT_NONE, 1=daylight in June-U_DAYLIGHT_JUNE, 2=daylight in December=U_DAYLIGHT_DECEMBER*/
    const char *stdID;
    const char *dstID;
    const char *olsonID;
} OffsetZoneMapping;

enum { U_DAYLIGHT_NONE=0,U_DAYLIGHT_JUNE=1,U_DAYLIGHT_DECEMBER=2 };

/*
This list tries to disambiguate a set of abbreviated timezone IDs and offsets
and maps it to an Olson ID.
Before adding anything to this list, take a look at
icu/source/tools/tzcode/tz.alias
Sometimes no daylight savings (0) is important to define due to aliases.
This list can be tested with icu/source/test/compat/tzone.pl
More values could be added to daylightType to increase precision.
*/
static const struct OffsetZoneMapping OFFSET_ZONE_MAPPINGS[] = {
    {-45900, 2, "CHAST", "CHADT", "Pacific/Chatham"},
    {-43200, 1, "PETT", "PETST", "Asia/Kamchatka"},
    {-43200, 2, "NZST", "NZDT", "Pacific/Auckland"},
    {-43200, 1, "ANAT", "ANAST", "Asia/Anadyr"},
    {-39600, 1, "MAGT", "MAGST", "Asia/Magadan"},
    {-37800, 2, "LHST", "LHST", "Australia/Lord_Howe"},
    {-36000, 2, "EST", "EST", "Australia/Sydney"},
    {-36000, 1, "SAKT", "SAKST", "Asia/Sakhalin"},
    {-36000, 1, "VLAT", "VLAST", "Asia/Vladivostok"},
    {-34200, 2, "CST", "CST", "Australia/South"},
    {-32400, 1, "YAKT", "YAKST", "Asia/Yakutsk"},
    {-32400, 1, "CHOT", "CHOST", "Asia/Choibalsan"},
    {-31500, 2, "CWST", "CWST", "Australia/Eucla"},
    {-28800, 1, "IRKT", "IRKST", "Asia/Irkutsk"},
    {-28800, 1, "ULAT", "ULAST", "Asia/Ulaanbaatar"},
    {-28800, 2, "WST", "WST", "Australia/West"},
    {-25200, 1, "HOVT", "HOVST", "Asia/Hovd"},
    {-25200, 1, "KRAT", "KRAST", "Asia/Krasnoyarsk"},
    {-21600, 1, "NOVT", "NOVST", "Asia/Novosibirsk"},
    {-21600, 1, "OMST", "OMSST", "Asia/Omsk"},
    {-18000, 1, "YEKT", "YEKST", "Asia/Yekaterinburg"},
    {-14400, 1, "SAMT", "SAMST", "Europe/Samara"},
    {-14400, 1, "AMT", "AMST", "Asia/Yerevan"},
    {-14400, 1, "AZT", "AZST", "Asia/Baku"},
    {-10800, 1, "AST", "ADT", "Asia/Baghdad"},
    {-10800, 1, "MSK", "MSD", "Europe/Moscow"},
    {-10800, 1, "VOLT", "VOLST", "Europe/Volgograd"},
    {-7200, 0, "EET", "CEST", "Africa/Tripoli"},
    {-7200, 1, "EET", "EEST", "Europe/Athens"}, /* Conflicts with Africa/Cairo */
    {-7200, 1, "IST", "IDT", "Asia/Jerusalem"},
    {-3600, 0, "CET", "WEST", "Africa/Algiers"},
    {-3600, 2, "WAT", "WAST", "Africa/Windhoek"},
    {0, 1, "GMT", "IST", "Europe/Dublin"},
    {0, 1, "GMT", "BST", "Europe/London"},
    {0, 0, "WET", "WEST", "Africa/Casablanca"},
    {0, 0, "WET", "WET", "Africa/El_Aaiun"},
    {3600, 1, "AZOT", "AZOST", "Atlantic/Azores"},
    {3600, 1, "EGT", "EGST", "America/Scoresbysund"},
    {10800, 1, "PMST", "PMDT", "America/Miquelon"},
    {10800, 2, "UYT", "UYST", "America/Montevideo"},
    {10800, 1, "WGT", "WGST", "America/Godthab"},
    {10800, 2, "BRT", "BRST", "Brazil/East"},
    {12600, 1, "NST", "NDT", "America/St_Johns"},
    {14400, 1, "AST", "ADT", "Canada/Atlantic"},
    {14400, 2, "AMT", "AMST", "America/Cuiaba"},
    {14400, 2, "CLT", "CLST", "Chile/Continental"},
    {14400, 2, "FKT", "FKST", "Atlantic/Stanley"},
    {14400, 2, "PYT", "PYST", "America/Asuncion"},
    {18000, 1, "CST", "CDT", "America/Havana"},
    {18000, 1, "EST", "EDT", "US/Eastern"}, /* Conflicts with America/Grand_Turk */
    {21600, 2, "EAST", "EASST", "Chile/EasterIsland"},
    {21600, 0, "CST", "MDT", "Canada/Saskatchewan"},
    {21600, 0, "CST", "CDT", "America/Guatemala"},
    {21600, 1, "CST", "CDT", "US/Central"}, /* Conflicts with Mexico/General */
    {25200, 1, "MST", "MDT", "US/Mountain"}, /* Conflicts with Mexico/BajaSur */
    {28800, 0, "PST", "PST", "Pacific/Pitcairn"},
    {28800, 1, "PST", "PDT", "US/Pacific"}, /* Conflicts with Mexico/BajaNorte */
    {32400, 1, "AKST", "AKDT", "US/Alaska"},
    {36000, 1, "HAST", "HADT", "US/Aleutian"}
};

/*#define DEBUG_TZNAME*/

static const char* remapShortTimeZone(const char *stdID, const char *dstID, int32_t daylightType, int32_t offset)
{
    int32_t idx;
#ifdef DEBUG_TZNAME
    fprintf(stderr, "TZ=%s std=%s dst=%s daylight=%d offset=%d\n", getenv("TZ"), stdID, dstID, daylightType, offset);
#endif
    for (idx = 0; idx < UPRV_LENGTHOF(OFFSET_ZONE_MAPPINGS); idx++)
    {
        if (offset == OFFSET_ZONE_MAPPINGS[idx].offsetSeconds
            && daylightType == OFFSET_ZONE_MAPPINGS[idx].daylightType
            && strcmp(OFFSET_ZONE_MAPPINGS[idx].stdID, stdID) == 0
            && strcmp(OFFSET_ZONE_MAPPINGS[idx].dstID, dstID) == 0)
        {
            return OFFSET_ZONE_MAPPINGS[idx].olsonID;
        }
    }
    return NULL;
}
#endif

#ifdef SEARCH_TZFILE
#define MAX_READ_SIZE 512

typedef struct DefaultTZInfo {
    char* defaultTZBuffer;
    int64_t defaultTZFileSize;
    FILE* defaultTZFilePtr;
    UBool defaultTZstatus;
    int32_t defaultTZPosition;
} DefaultTZInfo;

/*
 * This method compares the two files given to see if they are a match.
 * It is currently use to compare two TZ files.
 */
static UBool compareBinaryFiles(const char* defaultTZFileName, const char* TZFileName, DefaultTZInfo* tzInfo) {
    FILE* file; 
    int64_t sizeFile;
    int64_t sizeFileLeft;
    int32_t sizeFileRead;
    int32_t sizeFileToRead;
    char bufferFile[MAX_READ_SIZE];
    UBool result = TRUE;

    if (tzInfo->defaultTZFilePtr == NULL) {
        tzInfo->defaultTZFilePtr = fopen(defaultTZFileName, "r");
    }
    file = fopen(TZFileName, "r");

    tzInfo->defaultTZPosition = 0; /* reset position to begin search */

    if (file != NULL && tzInfo->defaultTZFilePtr != NULL) {
        /* First check that the file size are equal. */
        if (tzInfo->defaultTZFileSize == 0) {
            fseek(tzInfo->defaultTZFilePtr, 0, SEEK_END);
            tzInfo->defaultTZFileSize = ftell(tzInfo->defaultTZFilePtr);
        }
        fseek(file, 0, SEEK_END);
        sizeFile = ftell(file);
        sizeFileLeft = sizeFile;

        if (sizeFile != tzInfo->defaultTZFileSize) {
            result = FALSE;
        } else {
            /* Store the data from the files in seperate buffers and
             * compare each byte to determine equality.
             */
            if (tzInfo->defaultTZBuffer == NULL) {
                rewind(tzInfo->defaultTZFilePtr);
                tzInfo->defaultTZBuffer = (char*)uprv_malloc(sizeof(char) * tzInfo->defaultTZFileSize);
                sizeFileRead = fread(tzInfo->defaultTZBuffer, 1, tzInfo->defaultTZFileSize, tzInfo->defaultTZFilePtr);
            }
            rewind(file);
            while(sizeFileLeft > 0) {
                uprv_memset(bufferFile, 0, MAX_READ_SIZE);
                sizeFileToRead = sizeFileLeft < MAX_READ_SIZE ? sizeFileLeft : MAX_READ_SIZE;

                sizeFileRead = fread(bufferFile, 1, sizeFileToRead, file);
                if (memcmp(tzInfo->defaultTZBuffer + tzInfo->defaultTZPosition, bufferFile, sizeFileRead) != 0) {
                    result = FALSE;
                    break;
                }
                sizeFileLeft -= sizeFileRead;
                tzInfo->defaultTZPosition += sizeFileRead;
            }
        }
    } else {
        result = FALSE;
    }

    if (file != NULL) {
        fclose(file);
    }

    return result;
}


/* dirent also lists two entries: "." and ".." that we can safely ignore. */
#define SKIP1 "."
#define SKIP2 ".."
static UBool U_CALLCONV putil_cleanup(void);
static CharString *gSearchTZFileResult = NULL;

/*
 * This method recursively traverses the directory given for a matching TZ file and returns the first match.
 * This function is not thread safe - it uses a global, gSearchTZFileResult, to hold its results.
 */
static char* searchForTZFile(const char* path, DefaultTZInfo* tzInfo) {
    DIR* dirp = NULL;
    struct dirent* dirEntry = NULL;
    char* result = NULL;
    UErrorCode status = U_ZERO_ERROR;

    /* Save the current path */
    CharString curpath(path, -1, status);
    if (U_FAILURE(status)) {
        goto cleanupAndReturn;
    }

    dirp = opendir(path);
    if (dirp == NULL) {
        goto cleanupAndReturn;
    }

    if (gSearchTZFileResult == NULL) {
        gSearchTZFileResult = new CharString;
        if (gSearchTZFileResult == NULL) {
            goto cleanupAndReturn;
        }
        ucln_common_registerCleanup(UCLN_COMMON_PUTIL, putil_cleanup);
    }

    /* Check each entry in the directory. */
    while((dirEntry = readdir(dirp)) != NULL) {
        const char* dirName = dirEntry->d_name;
        if (uprv_strcmp(dirName, SKIP1) != 0 && uprv_strcmp(dirName, SKIP2) != 0) {
            /* Create a newpath with the new entry to test each entry in the directory. */
            CharString newpath(curpath, status);
            newpath.append(dirName, -1, status);
            if (U_FAILURE(status)) {
                break;
            }

            DIR* subDirp = NULL;
            if ((subDirp = opendir(newpath.data())) != NULL) {
                /* If this new path is a directory, make a recursive call with the newpath. */
                closedir(subDirp);
                newpath.append('/', status);
                if (U_FAILURE(status)) {
                    break;
                }
                result = searchForTZFile(newpath.data(), tzInfo);
                /*
                 Have to get out here. Otherwise, we'd keep looking
                 and return the first match in the top-level directory
                 if there's a match in the top-level. If not, this function
                 would return NULL and set gTimeZoneBufferPtr to NULL in initDefault().
                 It worked without this in most cases because we have a fallback of calling
                 localtime_r to figure out the default timezone.
                */
                if (result != NULL)
                    break;
            } else if (uprv_strcmp(TZFILE_SKIP, dirName) != 0 && uprv_strcmp(TZFILE_SKIP2, dirName) != 0) {
                if(compareBinaryFiles(TZDEFAULT, newpath.data(), tzInfo)) {
                    int32_t amountToSkip = sizeof(TZZONEINFO) - 1;
                    if (amountToSkip > newpath.length()) {
                        amountToSkip = newpath.length();
                    }
                    const char* zoneid = newpath.data() + amountToSkip;
                    skipZoneIDPrefix(&zoneid);
                    gSearchTZFileResult->clear();
                    gSearchTZFileResult->append(zoneid, -1, status);
                    if (U_FAILURE(status)) {
                        break;
                    }
                    result = gSearchTZFileResult->data();
                    /* Get out after the first one found. */
                    break;
                }
            }
        }
    }

  cleanupAndReturn:
    if (dirp) {
        closedir(dirp);
    }
    return result;
}
#endif

U_CAPI void U_EXPORT2
uprv_tzname_clear_cache()
{
#if defined(CHECK_LOCALTIME_LINK) && !defined(DEBUG_SKIP_LOCALTIME_LINK)
    gTimeZoneBufferPtr = NULL;
#endif
}

// With the Universal Windows Platform we can just ask Windows for the name
#if U_PLATFORM_HAS_WINUWP_API
U_CAPI const char* U_EXPORT2
uprv_getWindowsTimeZone()
{
    // Get default Windows timezone.   
    ComPtr<IInspectable> calendar;
    HRESULT hr = RoActivateInstance(
        HStringReference(RuntimeClass_Windows_Globalization_Calendar).Get(),
        &calendar);
    if (SUCCEEDED(hr))
    {
        ComPtr<ABI::Windows::Globalization::ITimeZoneOnCalendar> timezone;
        hr = calendar.As(&timezone);
        if (SUCCEEDED(hr))
        {
            HString timezoneString;
            hr = timezone->GetTimeZone(timezoneString.GetAddressOf());
            if (SUCCEEDED(hr))
            {
                int32_t length = wcslen(timezoneString.GetRawBuffer(NULL));
                char* asciiId = (char*)uprv_calloc(length + 1, sizeof(char));
                if (asciiId != nullptr)
                {
                    u_UCharsToChars((UChar*)timezoneString.GetRawBuffer(NULL), asciiId, length);
                    return asciiId;
                }
            }
        }
    }

    // Failed
    return nullptr;
}
#endif

U_CAPI const char* U_EXPORT2
uprv_tzname(int n)
{
    const char *tzid = NULL;
#if U_PLATFORM_USES_ONLY_WIN32_API
#if U_PLATFORM_HAS_WINUWP_API > 0
    tzid = uprv_getWindowsTimeZone();
#else
    tzid = uprv_detectWindowsTimeZone();
#endif

    if (tzid != NULL) {
        return tzid;
    }

#ifndef U_TZNAME
    // The return value is free'd in timezone.cpp on Windows because
    // the other code path returns a pointer to a heap location.
    // If we don't have a name already, then tzname wouldn't be any
    // better, so just fall back.
    return uprv_strdup("Etc/UTC");
#endif // !U_TZNAME

#else

/*#if U_PLATFORM_IS_DARWIN_BASED
    int ret;

    tzid = getenv("TZFILE");
    if (tzid != NULL) {
        return tzid;
    }
#endif*/

/* This code can be temporarily disabled to test tzname resolution later on. */
#ifndef DEBUG_TZNAME
    tzid = getenv("TZ");
    if (tzid != NULL && isValidOlsonID(tzid)
#if U_PLATFORM == U_PF_SOLARIS
    /* When TZ equals localtime on Solaris, check the /etc/localtime file. */
        && uprv_strcmp(tzid, TZ_ENV_CHECK) != 0
#endif
    ) {
        /* The colon forces tzset() to treat the remainder as zoneinfo path */ 
        if (tzid[0] == ':') { 
            tzid++; 
        } 
        /* This might be a good Olson ID. */
        skipZoneIDPrefix(&tzid);
        return tzid;
    }
    /* else U_TZNAME will give a better result. */
#endif

#if defined(CHECK_LOCALTIME_LINK) && !defined(DEBUG_SKIP_LOCALTIME_LINK)
    /* Caller must handle threading issues */
    if (gTimeZoneBufferPtr == NULL) {
        /*
        This is a trick to look at the name of the link to get the Olson ID
        because the tzfile contents is underspecified.
        This isn't guaranteed to work because it may not be a symlink.
        */
        int32_t ret = (int32_t)readlink(TZDEFAULT, gTimeZoneBuffer, sizeof(gTimeZoneBuffer)-1);
        if (0 < ret) {
            int32_t tzZoneInfoLen = uprv_strlen(TZZONEINFO);
            gTimeZoneBuffer[ret] = 0;
            if (uprv_strncmp(gTimeZoneBuffer, TZZONEINFO, tzZoneInfoLen) == 0
                && isValidOlsonID(gTimeZoneBuffer + tzZoneInfoLen))
            {
                return (gTimeZoneBufferPtr = gTimeZoneBuffer + tzZoneInfoLen);
            }
#if U_PLATFORM == U_PF_SOLARIS
            else
            {
                tzZoneInfoLen = uprv_strlen(TZZONEINFO2);
                if (uprv_strncmp(gTimeZoneBuffer, TZZONEINFO2, tzZoneInfoLen) == 0
                                && isValidOlsonID(gTimeZoneBuffer + tzZoneInfoLen))
                {
                    return (gTimeZoneBufferPtr = gTimeZoneBuffer + tzZoneInfoLen);
                }
            }
#endif
        } else {
#if defined(SEARCH_TZFILE)
            DefaultTZInfo* tzInfo = (DefaultTZInfo*)uprv_malloc(sizeof(DefaultTZInfo));
            if (tzInfo != NULL) {
                tzInfo->defaultTZBuffer = NULL;
                tzInfo->defaultTZFileSize = 0;
                tzInfo->defaultTZFilePtr = NULL;
                tzInfo->defaultTZstatus = FALSE;
                tzInfo->defaultTZPosition = 0;

                gTimeZoneBufferPtr = searchForTZFile(TZZONEINFO, tzInfo);

                /* Free previously allocated memory */
                if (tzInfo->defaultTZBuffer != NULL) {
                    uprv_free(tzInfo->defaultTZBuffer);
                }
                if (tzInfo->defaultTZFilePtr != NULL) {
                    fclose(tzInfo->defaultTZFilePtr);
                }
                uprv_free(tzInfo);
            }

            if (gTimeZoneBufferPtr != NULL && isValidOlsonID(gTimeZoneBufferPtr)) {
                return gTimeZoneBufferPtr;
            }
#endif
        }
    }
    else {
        return gTimeZoneBufferPtr;
    }
#endif
#endif

#ifdef U_TZNAME
#if U_PLATFORM_USES_ONLY_WIN32_API
    /* The return value is free'd in timezone.cpp on Windows because
     * the other code path returns a pointer to a heap location. */
    return uprv_strdup(U_TZNAME[n]);
#else
    /*
    U_TZNAME is usually a non-unique abbreviation, which isn't normally usable.
    So we remap the abbreviation to an olson ID.

    Since Windows exposes a little more timezone information,
    we normally don't use this code on Windows because
    uprv_detectWindowsTimeZone should have already given the correct answer.
    */
    {
        struct tm juneSol, decemberSol;
        int daylightType;
        static const time_t juneSolstice=1182478260; /*2007-06-21 18:11 UT*/
        static const time_t decemberSolstice=1198332540; /*2007-12-22 06:09 UT*/

        /* This probing will tell us when daylight savings occurs.  */
        localtime_r(&juneSolstice, &juneSol);
        localtime_r(&decemberSolstice, &decemberSol);
        if(decemberSol.tm_isdst > 0) {
          daylightType = U_DAYLIGHT_DECEMBER;
        } else if(juneSol.tm_isdst > 0) {
          daylightType = U_DAYLIGHT_JUNE;
        } else {
          daylightType = U_DAYLIGHT_NONE;
        }
        tzid = remapShortTimeZone(U_TZNAME[0], U_TZNAME[1], daylightType, uprv_timezone());
        if (tzid != NULL) {
            return tzid;
        }
    }
    return U_TZNAME[n];
#endif
#else
    return "";
#endif
}

/* Get and set the ICU data directory --------------------------------------- */

static icu::UInitOnce gDataDirInitOnce = U_INITONCE_INITIALIZER;
static char *gDataDirectory = NULL;

UInitOnce gTimeZoneFilesInitOnce = U_INITONCE_INITIALIZER;
static CharString *gTimeZoneFilesDirectory = NULL;

#if U_POSIX_LOCALE || U_PLATFORM_USES_ONLY_WIN32_API
 static char *gCorrectedPOSIXLocale = NULL; /* Sometimes heap allocated */
 static bool gCorrectedPOSIXLocaleHeapAllocated = false;
#endif

static UBool U_CALLCONV putil_cleanup(void)
{
    if (gDataDirectory && *gDataDirectory) {
        uprv_free(gDataDirectory);
    }
    gDataDirectory = NULL;
    gDataDirInitOnce.reset();

    delete gTimeZoneFilesDirectory;
    gTimeZoneFilesDirectory = NULL;
    gTimeZoneFilesInitOnce.reset();

#ifdef SEARCH_TZFILE
    delete gSearchTZFileResult;
    gSearchTZFileResult = NULL;
#endif

#if U_POSIX_LOCALE || U_PLATFORM_USES_ONLY_WIN32_API
    if (gCorrectedPOSIXLocale && gCorrectedPOSIXLocaleHeapAllocated) {
        uprv_free(gCorrectedPOSIXLocale);
        gCorrectedPOSIXLocale = NULL;
        gCorrectedPOSIXLocaleHeapAllocated = false;
    }
#endif
    return TRUE;
}

/*
 * Set the data directory.
 *    Make a copy of the passed string, and set the global data dir to point to it.
 */
U_CAPI void U_EXPORT2
u_setDataDirectory(const char *directory) {
    char *newDataDir;
    int32_t length;

    if(directory==NULL || *directory==0) {
        /* A small optimization to prevent the malloc and copy when the
        shared library is used, and this is a way to make sure that NULL
        is never returned.
        */
        newDataDir = (char *)"";
    }
    else {
        length=(int32_t)uprv_strlen(directory);
        newDataDir = (char *)uprv_malloc(length + 2);
        /* Exit out if newDataDir could not be created. */
        if (newDataDir == NULL) {
            return;
        }
        uprv_strcpy(newDataDir, directory);

#if (U_FILE_SEP_CHAR != U_FILE_ALT_SEP_CHAR)
        {
            char *p;
            while(p = uprv_strchr(newDataDir, U_FILE_ALT_SEP_CHAR)) {
                *p = U_FILE_SEP_CHAR;
            }
        }
#endif
    }

    if (gDataDirectory && *gDataDirectory) {
        uprv_free(gDataDirectory);
    }
    gDataDirectory = newDataDir;
    ucln_common_registerCleanup(UCLN_COMMON_PUTIL, putil_cleanup);
}

U_CAPI UBool U_EXPORT2
uprv_pathIsAbsolute(const char *path)
{
  if(!path || !*path) {
    return FALSE;
  }

  if(*path == U_FILE_SEP_CHAR) {
    return TRUE;
  }

#if (U_FILE_SEP_CHAR != U_FILE_ALT_SEP_CHAR)
  if(*path == U_FILE_ALT_SEP_CHAR) {
    return TRUE;
  }
#endif

#if U_PLATFORM_USES_ONLY_WIN32_API
  if( (((path[0] >= 'A') && (path[0] <= 'Z')) ||
       ((path[0] >= 'a') && (path[0] <= 'z'))) &&
      path[1] == ':' ) {
    return TRUE;
  }
#endif

  return FALSE;
}

/* Temporary backup setting of ICU_DATA_DIR_PREFIX_ENV_VAR
   until some client wrapper makefiles are updated */
#if U_PLATFORM_IS_DARWIN_BASED && TARGET_IPHONE_SIMULATOR
# if !defined(ICU_DATA_DIR_PREFIX_ENV_VAR)
#  define ICU_DATA_DIR_PREFIX_ENV_VAR "IPHONE_SIMULATOR_ROOT"
# endif
#endif

static void U_CALLCONV dataDirectoryInitFn() {
    /* If we already have the directory, then return immediately. Will happen if user called
     * u_setDataDirectory().
     */
    if (gDataDirectory) {
        return;
    }

    const char *path = NULL;
#if defined(ICU_DATA_DIR_PREFIX_ENV_VAR)
    char datadir_path_buffer[PATH_MAX];
#endif

    /*
    When ICU_NO_USER_DATA_OVERRIDE is defined, users aren't allowed to
    override ICU's data with the ICU_DATA environment variable. This prevents
    problems where multiple custom copies of ICU's specific version of data
    are installed on a system. Either the application must define the data
    directory with u_setDataDirectory, define ICU_DATA_DIR when compiling
    ICU, set the data with udata_setCommonData or trust that all of the
    required data is contained in ICU's data library that contains
    the entry point defined by U_ICUDATA_ENTRY_POINT.

    There may also be some platforms where environment variables
    are not allowed.
    */
#   if !defined(ICU_NO_USER_DATA_OVERRIDE) && !UCONFIG_NO_FILE_IO
    /* First try to get the environment variable */
#       if U_PLATFORM_HAS_WINUWP_API == 0  // Windows UWP does not support getenv
        path=getenv("ICU_DATA");
#       endif
#   endif

    /* ICU_DATA_DIR may be set as a compile option.
     * U_ICU_DATA_DEFAULT_DIR is provided and is set by ICU at compile time
     * and is used only when data is built in archive mode eliminating the need
     * for ICU_DATA_DIR to be set. U_ICU_DATA_DEFAULT_DIR is set to the installation
     * directory of the data dat file. Users should use ICU_DATA_DIR if they want to
     * set their own path.
     */
#if defined(ICU_DATA_DIR) || defined(U_ICU_DATA_DEFAULT_DIR)
    if(path==NULL || *path==0) {
# if defined(ICU_DATA_DIR_PREFIX_ENV_VAR)
        const char *prefix = getenv(ICU_DATA_DIR_PREFIX_ENV_VAR);
# endif
# ifdef ICU_DATA_DIR
        path=ICU_DATA_DIR;
# else
        path=U_ICU_DATA_DEFAULT_DIR;
# endif
# if defined(ICU_DATA_DIR_PREFIX_ENV_VAR)
        if (prefix != NULL) {
            snprintf(datadir_path_buffer, PATH_MAX, "%s%s", prefix, path);
            path=datadir_path_buffer;
        }
# endif
    }
#endif

#if defined(ICU_DATA_DIR_WINDOWS) && U_PLATFORM_HAS_WINUWP_API != 0
    // Use data from the %windir%\globalization\icu directory
    // This is only available if ICU is built as a system component
    char datadir_path_buffer[MAX_PATH];
    UINT length = GetWindowsDirectoryA(datadir_path_buffer, UPRV_LENGTHOF(datadir_path_buffer));
    if (length > 0 && length < (UPRV_LENGTHOF(datadir_path_buffer) - sizeof(ICU_DATA_DIR_WINDOWS) - 1))
    {
        if (datadir_path_buffer[length - 1] != '\\')
        {
            datadir_path_buffer[length++] = '\\';
            datadir_path_buffer[length] = '\0';
        }

        if ((length + 1 + sizeof(ICU_DATA_DIR_WINDOWS)) < UPRV_LENGTHOF(datadir_path_buffer))
        {
            uprv_strcat(datadir_path_buffer, ICU_DATA_DIR_WINDOWS);
            path = datadir_path_buffer;
        }
    }
#endif

    if(path==NULL) {
        /* It looks really bad, set it to something. */
#if U_PLATFORM_HAS_WIN32_API
        // Windows UWP will require icudtl.dat file in same directory as icuuc.dll
        path = ".\\";
#else
        path = "";
#endif
    }

    u_setDataDirectory(path);
    return;
}

U_CAPI const char * U_EXPORT2
u_getDataDirectory(void) {
    umtx_initOnce(gDataDirInitOnce, &dataDirectoryInitFn);
    return gDataDirectory;
}

static void setTimeZoneFilesDir(const char *path, UErrorCode &status) {
    if (U_FAILURE(status)) {
        return;
    }
    gTimeZoneFilesDirectory->clear();
    gTimeZoneFilesDirectory->append(path, status);
#if (U_FILE_SEP_CHAR != U_FILE_ALT_SEP_CHAR)
    char *p = gTimeZoneFilesDirectory->data();
    while (p = uprv_strchr(p, U_FILE_ALT_SEP_CHAR)) {
        *p = U_FILE_SEP_CHAR;
    }
#endif
}

#define TO_STRING(x) TO_STRING_2(x) 
#define TO_STRING_2(x) #x

static void U_CALLCONV TimeZoneDataDirInitFn(UErrorCode &status) {
    U_ASSERT(gTimeZoneFilesDirectory == NULL);
    ucln_common_registerCleanup(UCLN_COMMON_PUTIL, putil_cleanup);
    gTimeZoneFilesDirectory = new CharString();
    if (gTimeZoneFilesDirectory == NULL) {
        status = U_MEMORY_ALLOCATION_ERROR;
        return;
    }
#if U_PLATFORM_HAS_WINUWP_API == 0
    const char *dir = getenv("ICU_TIMEZONE_FILES_DIR");
#else
    // TODO: UWP does not support alternate timezone data directories at this time
    const char *dir = "";
#endif // U_PLATFORM_HAS_WINUWP_API
#if defined(U_TIMEZONE_FILES_DIR)
    if (dir == NULL) {
        dir = TO_STRING(U_TIMEZONE_FILES_DIR);
    }
#endif
    if (dir == NULL) {
        dir = "";
    }
    setTimeZoneFilesDir(dir, status);
}


U_CAPI const char * U_EXPORT2
u_getTimeZoneFilesDirectory(UErrorCode *status) {
    umtx_initOnce(gTimeZoneFilesInitOnce, &TimeZoneDataDirInitFn, *status);
    return U_SUCCESS(*status) ? gTimeZoneFilesDirectory->data() : "";
}

U_CAPI void U_EXPORT2
u_setTimeZoneFilesDirectory(const char *path, UErrorCode *status) {
    umtx_initOnce(gTimeZoneFilesInitOnce, &TimeZoneDataDirInitFn, *status);
    setTimeZoneFilesDir(path, *status);

    // Note: this function does some extra churn, first setting based on the
    //       environment, then immediately replacing with the value passed in.
    //       The logic is simpler that way, and performance shouldn't be an issue.
}


#if U_POSIX_LOCALE
/* A helper function used by uprv_getPOSIXIDForDefaultLocale and
 * uprv_getPOSIXIDForDefaultCodepage. Returns the posix locale id for
 * LC_CTYPE and LC_MESSAGES. It doesn't support other locale categories.
 */
static const char *uprv_getPOSIXIDForCategory(int category)
{
    const char* posixID = NULL;
    if (category == LC_MESSAGES || category == LC_CTYPE) {
        /*
        * On Solaris two different calls to setlocale can result in
        * different values. Only get this value once.
        *
        * We must check this first because an application can set this.
        *
        * LC_ALL can't be used because it's platform dependent. The LANG
        * environment variable seems to affect LC_CTYPE variable by default.
        * Here is what setlocale(LC_ALL, NULL) can return.
        * HPUX can return 'C C C C C C C'
        * Solaris can return /en_US/C/C/C/C/C on the second try.
        * Linux can return LC_CTYPE=C;LC_NUMERIC=C;...
        *
        * The default codepage detection also needs to use LC_CTYPE.
        *
        * Do not call setlocale(LC_*, "")! Using an empty string instead
        * of NULL, will modify the libc behavior.
        */
        posixID = setlocale(category, NULL);
        if ((posixID == 0)
            || (uprv_strcmp("C", posixID) == 0)
            || (uprv_strcmp("POSIX", posixID) == 0))
        {
            /* Maybe we got some garbage.  Try something more reasonable */
            posixID = getenv("LC_ALL");
            /* Solaris speaks POSIX -  See IEEE Std 1003.1-2008 
             * This is needed to properly handle empty env. variables
             */
#if U_PLATFORM == U_PF_SOLARIS
            if ((posixID == 0) || (posixID[0] == '\0')) {
                posixID = getenv(category == LC_MESSAGES ? "LC_MESSAGES" : "LC_CTYPE");
                if ((posixID == 0) || (posixID[0] == '\0')) {
#else
            if (posixID == 0) {
                posixID = getenv(category == LC_MESSAGES ? "LC_MESSAGES" : "LC_CTYPE");
                if (posixID == 0) {
#endif                    
                    posixID = getenv("LANG");
                }
            }
        }
    }
    if ((posixID==0)
        || (uprv_strcmp("C", posixID) == 0)
        || (uprv_strcmp("POSIX", posixID) == 0))
    {
        /* Nothing worked.  Give it a nice POSIX default value. */
        posixID = "en_US_POSIX";
    }
    return posixID;
}

/* Return just the POSIX id for the default locale, whatever happens to be in
 * it. It gets the value from LC_MESSAGES and indirectly from LC_ALL and LANG.
 */
static const char *uprv_getPOSIXIDForDefaultLocale(void)
{
    static const char* posixID = NULL;
    if (posixID == 0) {
        posixID = uprv_getPOSIXIDForCategory(LC_MESSAGES);
    }
    return posixID;
}

#if !U_CHARSET_IS_UTF8
/* Return just the POSIX id for the default codepage, whatever happens to be in
 * it. It gets the value from LC_CTYPE and indirectly from LC_ALL and LANG.
 */
static const char *uprv_getPOSIXIDForDefaultCodepage(void)
{
    static const char* posixID = NULL;
    if (posixID == 0) {
        posixID = uprv_getPOSIXIDForCategory(LC_CTYPE);
    }
    return posixID;
}
#endif
#endif

/* NOTE: The caller should handle thread safety */
U_CAPI const char* U_EXPORT2
uprv_getDefaultLocaleID()
{
#if U_POSIX_LOCALE
/*
  Note that:  (a '!' means the ID is improper somehow)
     LC_ALL  ---->     default_loc          codepage
--------------------------------------------------------
     ab.CD             ab                   CD
     ab@CD             ab__CD               -
     ab@CD.EF          ab__CD               EF

     ab_CD.EF@GH       ab_CD_GH             EF

Some 'improper' ways to do the same as above:
  !  ab_CD@GH.EF       ab_CD_GH             EF
  !  ab_CD.EF@GH.IJ    ab_CD_GH             EF
  !  ab_CD@ZZ.EF@GH.IJ ab_CD_GH             EF

     _CD@GH            _CD_GH               -
     _CD.EF@GH         _CD_GH               EF

The variant cannot have dots in it.
The 'rightmost' variant (@xxx) wins.
The leftmost codepage (.xxx) wins.
*/
    char *correctedPOSIXLocale = 0;
    const char* posixID = uprv_getPOSIXIDForDefaultLocale();
    const char *p;
    const char *q;
    int32_t len;

    /* Format: (no spaces)
    ll [ _CC ] [ . MM ] [ @ VV]

      l = lang, C = ctry, M = charmap, V = variant
    */

    if (gCorrectedPOSIXLocale != NULL) {
        return gCorrectedPOSIXLocale;
    }

    if ((p = uprv_strchr(posixID, '.')) != NULL) {
        /* assume new locale can't be larger than old one? */
        correctedPOSIXLocale = static_cast<char *>(uprv_malloc(uprv_strlen(posixID)+1));
        /* Exit on memory allocation error. */
        if (correctedPOSIXLocale == NULL) {
            return NULL;
        }
        uprv_strncpy(correctedPOSIXLocale, posixID, p-posixID);
        correctedPOSIXLocale[p-posixID] = 0;

        /* do not copy after the @ */
        if ((p = uprv_strchr(correctedPOSIXLocale, '@')) != NULL) {
            correctedPOSIXLocale[p-correctedPOSIXLocale] = 0;
        }
    }

    /* Note that we scan the *uncorrected* ID. */
    if ((p = uprv_strrchr(posixID, '@')) != NULL) {
        if (correctedPOSIXLocale == NULL) {
            correctedPOSIXLocale = static_cast<char *>(uprv_malloc(uprv_strlen(posixID)+1));
            /* Exit on memory allocation error. */
            if (correctedPOSIXLocale == NULL) {
                return NULL;
            }
            uprv_strncpy(correctedPOSIXLocale, posixID, p-posixID);
            correctedPOSIXLocale[p-posixID] = 0;
        }
        p++;

        /* Take care of any special cases here.. */
        if (!uprv_strcmp(p, "nynorsk")) {
            p = "NY";
            /* Don't worry about no__NY. In practice, it won't appear. */
        }

        if (uprv_strchr(correctedPOSIXLocale,'_') == NULL) {
            uprv_strcat(correctedPOSIXLocale, "__"); /* aa@b -> aa__b */
        }
        else {
            uprv_strcat(correctedPOSIXLocale, "_"); /* aa_CC@b -> aa_CC_b */
        }

        if ((q = uprv_strchr(p, '.')) != NULL) {
            /* How big will the resulting string be? */
            len = (int32_t)(uprv_strlen(correctedPOSIXLocale) + (q-p));
            uprv_strncat(correctedPOSIXLocale, p, q-p);
            correctedPOSIXLocale[len] = 0;
        }
        else {
            /* Anything following the @ sign */
            uprv_strcat(correctedPOSIXLocale, p);
        }

        /* Should there be a map from 'no@nynorsk' -> no_NO_NY here?
         * How about 'russian' -> 'ru'?
         * Many of the other locales using ISO codes will be handled by the
         * canonicalization functions in uloc_getDefault.
         */
    }

    /* Was a correction made? */
    if (correctedPOSIXLocale != NULL) {
        posixID = correctedPOSIXLocale;
    }
    else {
        /* copy it, just in case the original pointer goes away.  See j2395 */
        correctedPOSIXLocale = (char *)uprv_malloc(uprv_strlen(posixID) + 1);
        /* Exit on memory allocation error. */
        if (correctedPOSIXLocale == NULL) {
            return NULL;
        }
        posixID = uprv_strcpy(correctedPOSIXLocale, posixID);
    }

    if (gCorrectedPOSIXLocale == NULL) {
        gCorrectedPOSIXLocale = correctedPOSIXLocale;
        gCorrectedPOSIXLocaleHeapAllocated = true;
        ucln_common_registerCleanup(UCLN_COMMON_PUTIL, putil_cleanup);
        correctedPOSIXLocale = NULL;
    }

    if (correctedPOSIXLocale != NULL) {  /* Was already set - clean up. */
        uprv_free(correctedPOSIXLocale);
    }

    return posixID;

#elif U_PLATFORM_USES_ONLY_WIN32_API
#define POSIX_LOCALE_CAPACITY 64
    UErrorCode status = U_ZERO_ERROR;
    char *correctedPOSIXLocale = 0;

    // If we have already figured this out just use the cached value
    if (gCorrectedPOSIXLocale != NULL) {
        return gCorrectedPOSIXLocale;
    }

    // No cached value, need to determine the current value
    static WCHAR windowsLocale[LOCALE_NAME_MAX_LENGTH];
#if U_PLATFORM_HAS_WINUWP_API == 0 
    // If not a Universal Windows App, we'll need user default language.
    // Vista and above should use Locale Names instead of LCIDs
    int length = GetUserDefaultLocaleName(windowsLocale, UPRV_LENGTHOF(windowsLocale));
#else
    // In a UWP app, we want the top language that the application and user agreed upon
    ComPtr<ABI::Windows::Foundation::Collections::IVectorView<HSTRING>> languageList;

    ComPtr<ABI::Windows::Globalization::IApplicationLanguagesStatics> applicationLanguagesStatics;
    HRESULT hr = GetActivationFactory(
        HStringReference(RuntimeClass_Windows_Globalization_ApplicationLanguages).Get(),
        &applicationLanguagesStatics);
    if (SUCCEEDED(hr))
    {
        hr = applicationLanguagesStatics->get_Languages(&languageList);
    }

    if (FAILED(hr))
    {
        // If there is no application context, then use the top language from the user language profile
        ComPtr<ABI::Windows::System::UserProfile::IGlobalizationPreferencesStatics> globalizationPreferencesStatics;
        hr = GetActivationFactory(
            HStringReference(RuntimeClass_Windows_System_UserProfile_GlobalizationPreferences).Get(),
            &globalizationPreferencesStatics);
        if (SUCCEEDED(hr))
        {
            hr = globalizationPreferencesStatics->get_Languages(&languageList);
        }
    }

    // We have a list of languages, ICU knows one, so use the top one for our locale
    HString topLanguage;
    if (SUCCEEDED(hr))
    {
        hr = languageList->GetAt(0, topLanguage.GetAddressOf());
    }

    if (FAILED(hr))
    {
        // Unexpected, use en-US by default
        if (gCorrectedPOSIXLocale == NULL) {
            gCorrectedPOSIXLocale = "en_US";
        }

        return gCorrectedPOSIXLocale;
    }

    // ResolveLocaleName will get a likely subtags form consistent with Windows behavior.
    int length = ResolveLocaleName(topLanguage.GetRawBuffer(NULL), windowsLocale, UPRV_LENGTHOF(windowsLocale));
#endif
    // Now we should have a Windows locale name that needs converted to the POSIX style,
    if (length > 0)
    {
        // First we need to go from UTF-16 to char (and also convert from _ to - while we're at it.)
        char modifiedWindowsLocale[LOCALE_NAME_MAX_LENGTH];

        int32_t i;
        for (i = 0; i < UPRV_LENGTHOF(modifiedWindowsLocale); i++)
        {
            if (windowsLocale[i] == '_')
            {
                modifiedWindowsLocale[i] = '-';
            }
            else
            {
                modifiedWindowsLocale[i] = static_cast<char>(windowsLocale[i]);
            }

            if (modifiedWindowsLocale[i] == '\0')
            {
                break;
            }
        }

        if (i >= UPRV_LENGTHOF(modifiedWindowsLocale))
        {
            // Ran out of room, can't really happen, maybe we'll be lucky about a matching
            // locale when tags are dropped
            modifiedWindowsLocale[UPRV_LENGTHOF(modifiedWindowsLocale) - 1] = '\0';
        }

        // Now normalize the resulting name
        correctedPOSIXLocale = static_cast<char *>(uprv_malloc(POSIX_LOCALE_CAPACITY + 1));
        /* TODO: Should we just exit on memory allocation failure? */
        if (correctedPOSIXLocale)
        {
            int32_t posixLen = uloc_canonicalize(modifiedWindowsLocale, correctedPOSIXLocale, POSIX_LOCALE_CAPACITY, &status);
            if (U_SUCCESS(status))
            {
                *(correctedPOSIXLocale + posixLen) = 0;
                gCorrectedPOSIXLocale = correctedPOSIXLocale;
                gCorrectedPOSIXLocaleHeapAllocated = true;
                ucln_common_registerCleanup(UCLN_COMMON_PUTIL, putil_cleanup);
            }
            else
            {
                uprv_free(correctedPOSIXLocale);
            }
        }
    }

    // If unable to find a locale we can agree upon, use en-US by default
    if (gCorrectedPOSIXLocale == NULL) {
        gCorrectedPOSIXLocale = "en_US";
    }
    return gCorrectedPOSIXLocale;

#elif U_PLATFORM == U_PF_OS400
    /* locales are process scoped and are by definition thread safe */
    static char correctedLocale[64];
    const  char *localeID = getenv("LC_ALL");
           char *p;

    if (localeID == NULL)
        localeID = getenv("LANG");
    if (localeID == NULL)
        localeID = setlocale(LC_ALL, NULL);
    /* Make sure we have something... */
    if (localeID == NULL)
        return "en_US_POSIX";

    /* Extract the locale name from the path. */
    if((p = uprv_strrchr(localeID, '/')) != NULL)
    {
        /* Increment p to start of locale name. */
        p++;
        localeID = p;
    }

    /* Copy to work location. */
    uprv_strcpy(correctedLocale, localeID);

    /* Strip off the '.locale' extension. */
    if((p = uprv_strchr(correctedLocale, '.')) != NULL) {
        *p = 0;
    }

    /* Upper case the locale name. */
    T_CString_toUpperCase(correctedLocale);

    /* See if we are using the POSIX locale.  Any of the
    * following are equivalent and use the same QLGPGCMA
    * (POSIX) locale.
    * QLGPGCMA2 means UCS2
    * QLGPGCMA_4 means UTF-32
    * QLGPGCMA_8 means UTF-8
    */
    if ((uprv_strcmp("C", correctedLocale) == 0) ||
        (uprv_strcmp("POSIX", correctedLocale) == 0) ||
        (uprv_strncmp("QLGPGCMA", correctedLocale, 8) == 0))
    {
        uprv_strcpy(correctedLocale, "en_US_POSIX");
    }
    else
    {
        int16_t LocaleLen;

        /* Lower case the lang portion. */
        for(p = correctedLocale; *p != 0 && *p != '_'; p++)
        {
            *p = uprv_tolower(*p);
        }

        /* Adjust for Euro.  After '_E' add 'URO'. */
        LocaleLen = uprv_strlen(correctedLocale);
        if (correctedLocale[LocaleLen - 2] == '_' &&
            correctedLocale[LocaleLen - 1] == 'E')
        {
            uprv_strcat(correctedLocale, "URO");
        }

        /* If using Lotus-based locale then convert to
         * equivalent non Lotus.
         */
        else if (correctedLocale[LocaleLen - 2] == '_' &&
            correctedLocale[LocaleLen - 1] == 'L')
        {
            correctedLocale[LocaleLen - 2] = 0;
        }

        /* There are separate simplified and traditional
         * locales called zh_HK_S and zh_HK_T.
         */
        else if (uprv_strncmp(correctedLocale, "zh_HK", 5) == 0)
        {
            uprv_strcpy(correctedLocale, "zh_HK");
        }

        /* A special zh_CN_GBK locale...
        */
        else if (uprv_strcmp(correctedLocale, "zh_CN_GBK") == 0)
        {
            uprv_strcpy(correctedLocale, "zh_CN");
        }

    }

    return correctedLocale;
#endif

}

#if !U_CHARSET_IS_UTF8
#if U_POSIX_LOCALE
/*
Due to various platform differences, one platform may specify a charset,
when they really mean a different charset. Remap the names so that they are
compatible with ICU. Only conflicting/ambiguous aliases should be resolved
here. Before adding anything to this function, please consider adding unique
names to the ICU alias table in the data directory.
*/
static const char*
remapPlatformDependentCodepage(const char *locale, const char *name) {
    if (locale != NULL && *locale == 0) {
        /* Make sure that an empty locale is handled the same way. */
        locale = NULL;
    }
    if (name == NULL) {
        return NULL;
    }
#if U_PLATFORM == U_PF_AIX
    if (uprv_strcmp(name, "IBM-943") == 0) {
        /* Use the ASCII compatible ibm-943 */
        name = "Shift-JIS";
    }
    else if (uprv_strcmp(name, "IBM-1252") == 0) {
        /* Use the windows-1252 that contains the Euro */
        name = "IBM-5348";
    }
#elif U_PLATFORM == U_PF_SOLARIS
    if (locale != NULL && uprv_strcmp(name, "EUC") == 0) {
        /* Solaris underspecifies the "EUC" name. */
        if (uprv_strcmp(locale, "zh_CN") == 0) {
            name = "EUC-CN";
        }
        else if (uprv_strcmp(locale, "zh_TW") == 0) {
            name = "EUC-TW";
        }
        else if (uprv_strcmp(locale, "ko_KR") == 0) {
            name = "EUC-KR";
        }
    }
    else if (uprv_strcmp(name, "eucJP") == 0) {
        /*
        ibm-954 is the best match.
        ibm-33722 is the default for eucJP (similar to Windows).
        */
        name = "eucjis";
    }
    else if (uprv_strcmp(name, "646") == 0) {
        /*
         * The default codepage given by Solaris is 646 but the C library routines treat it as if it was
         * ISO-8859-1 instead of US-ASCII(646).
         */
        name = "ISO-8859-1";
    }
#elif U_PLATFORM_IS_DARWIN_BASED
    if (locale == NULL && *name == 0) {
        /*
        No locale was specified, and an empty name was passed in.
        This usually indicates that nl_langinfo didn't return valid information.
        Mac OS X uses UTF-8 by default (especially the locale data and console).
        */
        name = "UTF-8";
    }
    else if (uprv_strcmp(name, "CP949") == 0) {
        /* Remap CP949 to a similar codepage to avoid issues with backslash and won symbol. */
        name = "EUC-KR";
    }
    else if (locale != NULL && uprv_strcmp(locale, "en_US_POSIX") != 0 && uprv_strcmp(name, "US-ASCII") == 0) {
        /*
         * For non C/POSIX locale, default the code page to UTF-8 instead of US-ASCII.
         */
        name = "UTF-8";
    }
#elif U_PLATFORM == U_PF_BSD
    if (uprv_strcmp(name, "CP949") == 0) {
        /* Remap CP949 to a similar codepage to avoid issues with backslash and won symbol. */
        name = "EUC-KR";
    }
#elif U_PLATFORM == U_PF_HPUX
    if (locale != NULL && uprv_strcmp(locale, "zh_HK") == 0 && uprv_strcmp(name, "big5") == 0) {
        /* HP decided to extend big5 as hkbig5 even though it's not compatible :-( */
        /* zh_TW.big5 is not the same charset as zh_HK.big5! */
        name = "hkbig5";
    }
    else if (uprv_strcmp(name, "eucJP") == 0) {
        /*
        ibm-1350 is the best match, but unavailable.
        ibm-954 is mostly a superset of ibm-1350.
        ibm-33722 is the default for eucJP (similar to Windows).
        */
        name = "eucjis";
    }
#elif U_PLATFORM == U_PF_LINUX
    if (locale != NULL && uprv_strcmp(name, "euc") == 0) {
        /* Linux underspecifies the "EUC" name. */
        if (uprv_strcmp(locale, "korean") == 0) {
            name = "EUC-KR";
        }
        else if (uprv_strcmp(locale, "japanese") == 0) {
            /* See comment below about eucJP */
            name = "eucjis";
        }
    }
    else if (uprv_strcmp(name, "eucjp") == 0) {
        /*
        ibm-1350 is the best match, but unavailable.
        ibm-954 is mostly a superset of ibm-1350.
        ibm-33722 is the default for eucJP (similar to Windows).
        */
        name = "eucjis";
    }
    else if (locale != NULL && uprv_strcmp(locale, "en_US_POSIX") != 0 &&
            (uprv_strcmp(name, "ANSI_X3.4-1968") == 0 || uprv_strcmp(name, "US-ASCII") == 0)) {
        /*
         * For non C/POSIX locale, default the code page to UTF-8 instead of US-ASCII.
         */
        name = "UTF-8";
    }
    /*
     * Linux returns ANSI_X3.4-1968 for C/POSIX, but the call site takes care of
     * it by falling back to 'US-ASCII' when NULL is returned from this
     * function. So, we don't have to worry about it here.
     */
#endif
    /* return NULL when "" is passed in */
    if (*name == 0) {
        name = NULL;
    }
    return name;
}

static const char*
getCodepageFromPOSIXID(const char *localeName, char * buffer, int32_t buffCapacity)
{
    char localeBuf[100];
    const char *name = NULL;
    char *variant = NULL;

    if (localeName != NULL && (name = (uprv_strchr(localeName, '.'))) != NULL) {
        size_t localeCapacity = uprv_min(sizeof(localeBuf), (name-localeName)+1);
        uprv_strncpy(localeBuf, localeName, localeCapacity);
        localeBuf[localeCapacity-1] = 0; /* ensure NULL termination */
        name = uprv_strncpy(buffer, name+1, buffCapacity);
        buffer[buffCapacity-1] = 0; /* ensure NULL termination */
        if ((variant = const_cast<char *>(uprv_strchr(name, '@'))) != NULL) {
            *variant = 0;
        }
        name = remapPlatformDependentCodepage(localeBuf, name);
    }
    return name;
}
#endif

static const char*
int_getDefaultCodepage()
{
#if U_PLATFORM == U_PF_OS400
    uint32_t ccsid = 37; /* Default to ibm-37 */
    static char codepage[64];
    Qwc_JOBI0400_t jobinfo;
    Qus_EC_t error = { sizeof(Qus_EC_t) }; /* SPI error code */

    EPT_CALL(QUSRJOBI)(&jobinfo, sizeof(jobinfo), "JOBI0400",
        "*                         ", "                ", &error);

    if (error.Bytes_Available == 0) {
        if (jobinfo.Coded_Char_Set_ID != 0xFFFF) {
            ccsid = (uint32_t)jobinfo.Coded_Char_Set_ID;
        }
        else if (jobinfo.Default_Coded_Char_Set_Id != 0xFFFF) {
            ccsid = (uint32_t)jobinfo.Default_Coded_Char_Set_Id;
        }
        /* else use the default */
    }
    sprintf(codepage,"ibm-%d", ccsid);
    return codepage;

#elif U_PLATFORM == U_PF_OS390
    static char codepage[64];

    strncpy(codepage, nl_langinfo(CODESET),63-strlen(UCNV_SWAP_LFNL_OPTION_STRING));
    strcat(codepage,UCNV_SWAP_LFNL_OPTION_STRING);
    codepage[63] = 0; /* NULL terminate */

    return codepage;

#elif U_PLATFORM_USES_ONLY_WIN32_API
    static char codepage[64];
    DWORD codepageNumber = 0;

#if U_PLATFORM_HAS_WINUWP_API > 0
    // UWP doesn't have a direct API to get the default ACP as Microsoft would rather
    // have folks use Unicode than a "system" code page, however this is the same
    // codepage as the system default locale codepage.  (FWIW, the system locale is
    // ONLY used for codepage, it should never be used for anything else)
    GetLocaleInfoEx(LOCALE_NAME_SYSTEM_DEFAULT, LOCALE_IDEFAULTANSICODEPAGE | LOCALE_RETURN_NUMBER,
        (LPWSTR)&codepageNumber, sizeof(codepageNumber) / sizeof(WCHAR));
#else
    // Win32 apps can call GetACP
    codepageNumber = GetACP();
#endif
    // Special case for UTF-8
    if (codepageNumber == 65001)
    { 
        return "UTF-8";
    }
    // Windows codepages can look like windows-1252, so format the found number
    // the numbers are eclectic, however all valid system code pages, besides UTF-8
    // are between 3 and 19999
    if (codepageNumber > 0 && codepageNumber < 20000)
    {
        sprintf(codepage, "windows-%ld", codepageNumber);
        return codepage;
    }
    // If the codepage number call failed then return UTF-8
    return "UTF-8";

#elif U_POSIX_LOCALE
    static char codesetName[100];
    const char *localeName = NULL;
    const char *name = NULL;

    localeName = uprv_getPOSIXIDForDefaultCodepage();
    uprv_memset(codesetName, 0, sizeof(codesetName));
    /* On Solaris nl_langinfo returns C locale values unless setlocale
     * was called earlier.
     */
#if (U_HAVE_NL_LANGINFO_CODESET && U_PLATFORM != U_PF_SOLARIS)
    /* When available, check nl_langinfo first because it usually gives more
       useful names. It depends on LC_CTYPE.
       nl_langinfo may use the same buffer as setlocale. */
    {
        const char *codeset = nl_langinfo(U_NL_LANGINFO_CODESET);
#if U_PLATFORM_IS_DARWIN_BASED || U_PLATFORM_IS_LINUX_BASED
        /*
         * On Linux and MacOSX, ensure that default codepage for non C/POSIX locale is UTF-8
         * instead of ASCII.
         */
        if (uprv_strcmp(localeName, "en_US_POSIX") != 0) {
            codeset = remapPlatformDependentCodepage(localeName, codeset);
        } else
#endif
        {
            codeset = remapPlatformDependentCodepage(NULL, codeset);
        }

        if (codeset != NULL) {
            uprv_strncpy(codesetName, codeset, sizeof(codesetName));
            codesetName[sizeof(codesetName)-1] = 0;
            return codesetName;
        }
    }
#endif

    /* Use setlocale in a nice way, and then check some environment variables.
       Maybe the application used setlocale already.
    */
    uprv_memset(codesetName, 0, sizeof(codesetName));
    name = getCodepageFromPOSIXID(localeName, codesetName, sizeof(codesetName));
    if (name) {
        /* if we can find the codeset name from setlocale, return that. */
        return name;
    }

    if (*codesetName == 0)
    {
        /* Everything failed. Return US ASCII (ISO 646). */
        (void)uprv_strcpy(codesetName, "US-ASCII");
    }
    return codesetName;
#else
    return "US-ASCII";
#endif
}


U_CAPI const char*  U_EXPORT2
uprv_getDefaultCodepage()
{
    static char const  *name = NULL;
    umtx_lock(NULL);
    if (name == NULL) {
        name = int_getDefaultCodepage();
    }
    umtx_unlock(NULL);
    return name;
}
#endif  /* !U_CHARSET_IS_UTF8 */


/* end of platform-specific implementation -------------- */

/* version handling --------------------------------------------------------- */

U_CAPI void U_EXPORT2
u_versionFromString(UVersionInfo versionArray, const char *versionString) {
    char *end;
    uint16_t part=0;

    if(versionArray==NULL) {
        return;
    }

    if(versionString!=NULL) {
        for(;;) {
            versionArray[part]=(uint8_t)uprv_strtoul(versionString, &end, 10);
            if(end==versionString || ++part==U_MAX_VERSION_LENGTH || *end!=U_VERSION_DELIMITER) {
                break;
            }
            versionString=end+1;
        }
    }

    while(part<U_MAX_VERSION_LENGTH) {
        versionArray[part++]=0;
    }
}

U_CAPI void U_EXPORT2
u_versionFromUString(UVersionInfo versionArray, const UChar *versionString) {
    if(versionArray!=NULL && versionString!=NULL) {
        char versionChars[U_MAX_VERSION_STRING_LENGTH+1];
        int32_t len = u_strlen(versionString);
        if(len>U_MAX_VERSION_STRING_LENGTH) {
            len = U_MAX_VERSION_STRING_LENGTH;
        }
        u_UCharsToChars(versionString, versionChars, len);
        versionChars[len]=0;
        u_versionFromString(versionArray, versionChars);
    }
}

U_CAPI void U_EXPORT2
u_versionToString(const UVersionInfo versionArray, char *versionString) {
    uint16_t count, part;
    uint8_t field;

    if(versionString==NULL) {
        return;
    }

    if(versionArray==NULL) {
        versionString[0]=0;
        return;
    }

    /* count how many fields need to be written */
    for(count=4; count>0 && versionArray[count-1]==0; --count) {
    }

    if(count <= 1) {
        count = 2;
    }

    /* write the first part */
    /* write the decimal field value */
    field=versionArray[0];
    if(field>=100) {
        *versionString++=(char)('0'+field/100);
        field%=100;
    }
    if(field>=10) {
        *versionString++=(char)('0'+field/10);
        field%=10;
    }
    *versionString++=(char)('0'+field);

    /* write the following parts */
    for(part=1; part<count; ++part) {
        /* write a dot first */
        *versionString++=U_VERSION_DELIMITER;

        /* write the decimal field value */
        field=versionArray[part];
        if(field>=100) {
            *versionString++=(char)('0'+field/100);
            field%=100;
        }
        if(field>=10) {
            *versionString++=(char)('0'+field/10);
            field%=10;
        }
        *versionString++=(char)('0'+field);
    }

    /* NUL-terminate */
    *versionString=0;
}

U_CAPI void U_EXPORT2
u_getVersion(UVersionInfo versionArray) {
    (void)copyright;   // Suppress unused variable warning from clang.
    u_versionFromString(versionArray, U_ICU_VERSION);
}

/**
 * icucfg.h dependent code 
 */

#if U_ENABLE_DYLOAD
 
#if HAVE_DLOPEN && !U_PLATFORM_USES_ONLY_WIN32_API

#if HAVE_DLFCN_H

#ifdef __MVS__
#ifndef __SUSV3
#define __SUSV3 1
#endif
#endif
#include <dlfcn.h>
#endif

U_INTERNAL void * U_EXPORT2
uprv_dl_open(const char *libName, UErrorCode *status) {
  void *ret = NULL;
  if(U_FAILURE(*status)) return ret;
  ret =  dlopen(libName, RTLD_NOW|RTLD_GLOBAL);
  if(ret==NULL) {
#ifdef U_TRACE_DYLOAD
    printf("dlerror on dlopen(%s): %s\n", libName, dlerror());
#endif
    *status = U_MISSING_RESOURCE_ERROR;
  }
  return ret;
}

U_INTERNAL void U_EXPORT2
uprv_dl_close(void *lib, UErrorCode *status) {
  if(U_FAILURE(*status)) return;
  dlclose(lib);
}

U_INTERNAL UVoidFunction* U_EXPORT2
uprv_dlsym_func(void *lib, const char* sym, UErrorCode *status) {
  union {
      UVoidFunction *fp;
      void *vp;
  } uret;
  uret.fp = NULL;
  if(U_FAILURE(*status)) return uret.fp;
  uret.vp = dlsym(lib, sym);
  if(uret.vp == NULL) {
#ifdef U_TRACE_DYLOAD
    printf("dlerror on dlsym(%p,%s): %s\n", lib,sym, dlerror());
#endif
    *status = U_MISSING_RESOURCE_ERROR;
  }
  return uret.fp;
}

#else

/* null (nonexistent) implementation. */

U_INTERNAL void * U_EXPORT2
uprv_dl_open(const char *libName, UErrorCode *status) {
  if(U_FAILURE(*status)) return NULL;
  *status = U_UNSUPPORTED_ERROR;
  return NULL;
}

U_INTERNAL void U_EXPORT2
uprv_dl_close(void *lib, UErrorCode *status) {
  if(U_FAILURE(*status)) return;
  *status = U_UNSUPPORTED_ERROR;
  return;
}


U_INTERNAL UVoidFunction* U_EXPORT2
uprv_dlsym_func(void *lib, const char* sym, UErrorCode *status) {
  if(U_SUCCESS(*status)) {
    *status = U_UNSUPPORTED_ERROR;
  }
  return (UVoidFunction*)NULL;
}



#endif

#elif U_PLATFORM_USES_ONLY_WIN32_API

U_INTERNAL void * U_EXPORT2
uprv_dl_open(const char *libName, UErrorCode *status) {
  HMODULE lib = NULL;
  
  if(U_FAILURE(*status)) return NULL;
  
  lib = LoadLibraryA(libName);
  
  if(lib==NULL) {
    *status = U_MISSING_RESOURCE_ERROR;
  }
  
  return (void*)lib;
}

U_INTERNAL void U_EXPORT2
uprv_dl_close(void *lib, UErrorCode *status) {
  HMODULE handle = (HMODULE)lib;
  if(U_FAILURE(*status)) return;
  
  FreeLibrary(handle);
  
  return;
}


U_INTERNAL UVoidFunction* U_EXPORT2
uprv_dlsym_func(void *lib, const char* sym, UErrorCode *status) {
  HMODULE handle = (HMODULE)lib;
  UVoidFunction* addr = NULL;
  
  if(U_FAILURE(*status) || lib==NULL) return NULL;
  
  addr = (UVoidFunction*)GetProcAddress(handle, sym);
  
  if(addr==NULL) {
    DWORD lastError = GetLastError();
    if(lastError == ERROR_PROC_NOT_FOUND) {
      *status = U_MISSING_RESOURCE_ERROR;
    } else {
      *status = U_UNSUPPORTED_ERROR; /* other unknown error. */
    }
  }
  
  return addr;
}


#else

/* No dynamic loading set. */

U_INTERNAL void * U_EXPORT2
uprv_dl_open(const char *libName, UErrorCode *status) {
    (void)libName;
    if(U_FAILURE(*status)) return NULL;
    *status = U_UNSUPPORTED_ERROR;
    return NULL;
}

U_INTERNAL void U_EXPORT2
uprv_dl_close(void *lib, UErrorCode *status) {
    (void)lib;
    if(U_FAILURE(*status)) return;
    *status = U_UNSUPPORTED_ERROR;
    return;
}


U_INTERNAL UVoidFunction* U_EXPORT2
uprv_dlsym_func(void *lib, const char* sym, UErrorCode *status) {
  (void)lib;
  (void)sym;
  if(U_SUCCESS(*status)) {
    *status = U_UNSUPPORTED_ERROR;
  }
  return (UVoidFunction*)NULL;
}

#endif /* U_ENABLE_DYLOAD */

/*
 * Hey, Emacs, please set the following:
 *
 * Local Variables:
 * indent-tabs-mode: nil
 * End:
 *
 */
