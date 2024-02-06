// © 2016 and later: Unicode, Inc. and others.
// License & terms of use: http://www.unicode.org/copyright.html
/*
*******************************************************************************
*
*   Copyright (C) 1997-2016, International Business Machines
*   Corporation and others.  All Rights Reserved.
*
*******************************************************************************
*   file name:  loclikely.cpp
*   encoding:   UTF-8
*   tab size:   8 (not used)
*   indentation:4
*
*   created on: 2010feb25
*   created by: Markus W. Scherer
*
*   Code for likely and minimized locale subtags, separated out from other .cpp files
*   that then do not depend on resource bundle code and likely-subtags data.
*/

#include <utility>

#include "unicode/bytestream.h"
#include "unicode/utypes.h"
#include "unicode/locid.h"
#include "unicode/putil.h"
#include "unicode/uchar.h"
#include "unicode/uloc.h"
#include "unicode/ures.h"
#include "unicode/uscript.h"
#include "bytesinkutil.h"
#include "charstr.h"
#include "cmemory.h"
#include "cstring.h"
#include "loclikelysubtags.h"
#include "ulocimp.h"
#include "ustr_imp.h"

/**
 * Create a tag string from the supplied parameters.  The lang, script and region
 * parameters may be nullptr pointers. If they are, their corresponding length parameters
 * must be less than or equal to 0.
 *
 * If the length of the new string exceeds the capacity of the output buffer,
 * the function copies as many bytes to the output buffer as it can, and returns
 * the error U_BUFFER_OVERFLOW_ERROR.
 *
 * If an illegal argument is provided, the function returns the error
 * U_ILLEGAL_ARGUMENT_ERROR.
 *
 * Note that this function can return the warning U_STRING_NOT_TERMINATED_WARNING if
 * the tag string fits in the output buffer, but the null terminator doesn't.
 *
 * @param lang The language tag to use.
 * @param langLength The length of the language tag.
 * @param script The script tag to use.
 * @param scriptLength The length of the script tag.
 * @param region The region tag to use.
 * @param regionLength The length of the region tag.
 * @param trailing Any trailing data to append to the new tag.
 * @param trailingLength The length of the trailing data.
 * @param sink The output sink receiving the tag string.
 * @param err A pointer to a UErrorCode for error reporting.
 **/
static void U_CALLCONV
createTagStringWithAlternates(
    const char* lang,
    int32_t langLength,
    const char* script,
    int32_t scriptLength,
    const char* region,
    int32_t regionLength,
    const char* trailing,
    int32_t trailingLength,
    icu::ByteSink& sink,
    UErrorCode* err) {

    if (U_FAILURE(*err)) {
        goto error;
    }
    else if (langLength >= ULOC_LANG_CAPACITY ||
             scriptLength >= ULOC_SCRIPT_CAPACITY ||
             regionLength >= ULOC_COUNTRY_CAPACITY) {
        goto error;
    }
    else {
        UBool regionAppended = false;

        if (langLength > 0) {
            sink.Append(lang, langLength);
        }

        if (scriptLength > 0) {
            sink.Append("_", 1);
            sink.Append(script, scriptLength);
        }

        if (regionLength > 0) {
            sink.Append("_", 1);
            sink.Append(region, regionLength);

            regionAppended = true;
        }

        if (trailingLength > 0) {
            if (*trailing != '@') {
                sink.Append("_", 1);
                if (!regionAppended) {
                    /* extra separator is required */
                    sink.Append("_", 1);
                }
            }

            /*
             * Copy the trailing data into the supplied buffer.
             */
            sink.Append(trailing, trailingLength);
        }

        return;
    }

error:

    /**
     * An overflow indicates the locale ID passed in
     * is ill-formed.  If we got here, and there was
     * no previous error, it's an implicit overflow.
     **/
    if (*err ==  U_BUFFER_OVERFLOW_ERROR ||
        U_SUCCESS(*err)) {
        *err = U_ILLEGAL_ARGUMENT_ERROR;
    }
}

/**
 * Parse the language, script, and region subtags from a tag string, and copy the
 * results into the corresponding output parameters.
 *
 * If an illegal argument is provided, the function returns the error
 * U_ILLEGAL_ARGUMENT_ERROR.
 *
 * @param localeID The locale ID to parse.
 * @param lang The language tag buffer.
 * @param script The script tag buffer.
 * @param region The region tag buffer.
 * @param err A pointer to a UErrorCode for error reporting.
 * @return The number of chars of the localeID parameter consumed.
 **/
static int32_t U_CALLCONV
parseTagString(
    const char* localeID,
    icu::CharString& lang,
    icu::CharString& script,
    icu::CharString& region,
    UErrorCode* err)
{
    icu::CharString variant;
    const char* position = localeID;

    if (U_FAILURE(*err) || localeID == nullptr) {
        goto error;
    }

    ulocimp_getSubtags(localeID, &lang, &script, &region, &variant, &position, *err);

    if(U_FAILURE(*err)) {
        goto error;
    }

    if (!variant.isEmpty()) {
        position -= 1 + variant.length();
    }

    if (_isIDSeparator(*position)) {
        ++position;
    }

    if (region.isEmpty() && *position != 0 && *position != '@') {
        /* back up over consumed trailing separator */
        --position;
    }

exit:

    return (int32_t)(position - localeID);

error:

    /**
     * If we get here, we have no explicit error, it's the result of an
     * illegal argument.
     **/
    if (!U_FAILURE(*err)) {
        *err = U_ILLEGAL_ARGUMENT_ERROR;
    }

    goto exit;
}

#define CHECK_TRAILING_VARIANT_SIZE(trailing, trailingLength) UPRV_BLOCK_MACRO_BEGIN { \
    int32_t count = 0; \
    int32_t i; \
    for (i = 0; i < trailingLength; i++) { \
        if (trailing[i] == '-' || trailing[i] == '_') { \
            count = 0; \
            if (count > 8) { \
                goto error; \
            } \
        } else if (trailing[i] == '@') { \
            break; \
        } else if (count > 8) { \
            goto error; \
        } else { \
            count++; \
        } \
    } \
} UPRV_BLOCK_MACRO_END

static UBool
_uloc_addLikelySubtags(const char* localeID,
                       icu::ByteSink& sink,
                       UErrorCode* err) {
    icu::CharString lang;
    icu::CharString script;
    icu::CharString region;
    const char* trailing = "";
    int32_t trailingLength = 0;
    int32_t trailingIndex = 0;

    if(U_FAILURE(*err)) {
        goto error;
    }
    if (localeID == nullptr) {
        goto error;
    }

    trailingIndex = parseTagString(
        localeID,
        lang,
        script,
        region,
        err);
    if(U_FAILURE(*err)) {
        /* Overflow indicates an illegal argument error */
        if (*err == U_BUFFER_OVERFLOW_ERROR) {
            *err = U_ILLEGAL_ARGUMENT_ERROR;
        }

        goto error;
    }
    if (lang.length() > 3) {
        if (lang.length() == 4 && script.isEmpty()) {
            script = std::move(lang);
            lang.clear();
        } else {
            goto error;
        }
    }

    /* Find the length of the trailing portion. */
    while (_isIDSeparator(localeID[trailingIndex])) {
        trailingIndex++;
    }
    trailing = &localeID[trailingIndex];
    trailingLength = (int32_t)uprv_strlen(trailing);

    CHECK_TRAILING_VARIANT_SIZE(trailing, trailingLength);
    {
        const icu::LikelySubtags* likelySubtags = icu::LikelySubtags::getSingleton(*err);
        if(U_FAILURE(*err)) {
            goto error;
        }
        // We need to keep l on the stack because lsr may point into internal
        // memory of l.
        icu::Locale l = icu::Locale::createFromName(localeID);
        if (l.isBogus()) {
            goto error;
        }
        icu::LSR lsr = likelySubtags->makeMaximizedLsrFrom(l, true, *err);
        if(U_FAILURE(*err)) {
            goto error;
        }
        const char* language = lsr.language;
        if (uprv_strcmp(language, "und") == 0) {
            language = "";
        }
        createTagStringWithAlternates(
            language,
            (int32_t)uprv_strlen(language),
            lsr.script,
            (int32_t)uprv_strlen(lsr.script),
            lsr.region,
            (int32_t)uprv_strlen(lsr.region),
            trailing,
            trailingLength,
            sink,
            err);
        if(U_FAILURE(*err)) {
            goto error;
        }
    }
    return true;

error:

    if (!U_FAILURE(*err)) {
        *err = U_ILLEGAL_ARGUMENT_ERROR;
    }
    return false;
}

// Add likely subtags to the sink
// return true if the value in the sink is produced by a match during the lookup
// return false if the value in the sink is the same as input because there are
// no match after the lookup.
static UBool _ulocimp_addLikelySubtags(const char*, icu::ByteSink&, UErrorCode*);

static void
_uloc_minimizeSubtags(const char* localeID,
                      icu::ByteSink& sink,
                      bool favorScript,
                      UErrorCode* err) {
    icu::CharString maximizedTagBuffer;

    icu::CharString lang;
    icu::CharString script;
    icu::CharString region;
    const char* trailing = "";
    int32_t trailingLength = 0;
    int32_t trailingIndex = 0;

    if(U_FAILURE(*err)) {
        goto error;
    }
    else if (localeID == nullptr) {
        goto error;
    }

    trailingIndex =
        parseTagString(
            localeID,
            lang,
            script,
            region,
            err);
    if(U_FAILURE(*err)) {

        /* Overflow indicates an illegal argument error */
        if (*err == U_BUFFER_OVERFLOW_ERROR) {
            *err = U_ILLEGAL_ARGUMENT_ERROR;
        }

        goto error;
    }

    /* Find the spot where the variants or the keywords begin, if any. */
    while (_isIDSeparator(localeID[trailingIndex])) {
        trailingIndex++;
    }
    trailing = &localeID[trailingIndex];
    trailingLength = (int32_t)uprv_strlen(trailing);

    CHECK_TRAILING_VARIANT_SIZE(trailing, trailingLength);

    {
        const icu::LikelySubtags* likelySubtags = icu::LikelySubtags::getSingleton(*err);
        if(U_FAILURE(*err)) {
            goto error;
        }
        icu::LSR lsr = likelySubtags->minimizeSubtags(
            lang.toStringPiece(),
            script.toStringPiece(),
            region.toStringPiece(),
            favorScript,
            *err);
        if(U_FAILURE(*err)) {
            goto error;
        }
        const char* language = lsr.language;
        if (uprv_strcmp(language, "und") == 0) {
            language = "";
        }
        createTagStringWithAlternates(
            language,
            (int32_t)uprv_strlen(language),
            lsr.script,
            (int32_t)uprv_strlen(lsr.script),
            lsr.region,
            (int32_t)uprv_strlen(lsr.region),
            trailing,
            trailingLength,
            sink,
            err);
        if(U_FAILURE(*err)) {
            goto error;
        }
        return;
    }

error:

    if (!U_FAILURE(*err)) {
        *err = U_ILLEGAL_ARGUMENT_ERROR;
    }
}

U_CAPI int32_t U_EXPORT2
uloc_addLikelySubtags(const char* localeID,
                      char* maximizedLocaleID,
                      int32_t maximizedLocaleIDCapacity,
                      UErrorCode* status) {
    if (U_FAILURE(*status)) {
        return 0;
    }

    icu::CheckedArrayByteSink sink(
            maximizedLocaleID, maximizedLocaleIDCapacity);

    ulocimp_addLikelySubtags(localeID, sink, status);
    int32_t reslen = sink.NumberOfBytesAppended();

    if (U_FAILURE(*status)) {
        return sink.Overflowed() ? reslen : -1;
    }

    if (sink.Overflowed()) {
        *status = U_BUFFER_OVERFLOW_ERROR;
    } else {
        u_terminateChars(
                maximizedLocaleID, maximizedLocaleIDCapacity, reslen, status);
    }

    return reslen;
}

static UBool
_ulocimp_addLikelySubtags(const char* localeID,
                          icu::ByteSink& sink,
                          UErrorCode* status) {
    icu::CharString localeBuffer;
    {
        icu::CharStringByteSink localeSink(&localeBuffer);
        ulocimp_canonicalize(localeID, localeSink, status);
    }
    if (U_SUCCESS(*status)) {
        return _uloc_addLikelySubtags(localeBuffer.data(), sink, status);
    } else {
        return false;
    }
}

U_CAPI void U_EXPORT2
ulocimp_addLikelySubtags(const char* localeID,
                         icu::ByteSink& sink,
                         UErrorCode* status) {
    _ulocimp_addLikelySubtags(localeID, sink, status);
}

U_CAPI int32_t U_EXPORT2
uloc_minimizeSubtags(const char* localeID,
                     char* minimizedLocaleID,
                     int32_t minimizedLocaleIDCapacity,
                     UErrorCode* status) {
    if (U_FAILURE(*status)) {
        return 0;
    }

    icu::CheckedArrayByteSink sink(
            minimizedLocaleID, minimizedLocaleIDCapacity);

    ulocimp_minimizeSubtags(localeID, sink, false, status);
    int32_t reslen = sink.NumberOfBytesAppended();

    if (U_FAILURE(*status)) {
        return sink.Overflowed() ? reslen : -1;
    }

    if (sink.Overflowed()) {
        *status = U_BUFFER_OVERFLOW_ERROR;
    } else {
        u_terminateChars(
                minimizedLocaleID, minimizedLocaleIDCapacity, reslen, status);
    }

    return reslen;
}

U_CAPI void U_EXPORT2
ulocimp_minimizeSubtags(const char* localeID,
                        icu::ByteSink& sink,
                        bool favorScript,
                        UErrorCode* status) {
    icu::CharString localeBuffer;
    {
        icu::CharStringByteSink localeSink(&localeBuffer);
        ulocimp_canonicalize(localeID, localeSink, status);
    }
    _uloc_minimizeSubtags(localeBuffer.data(), sink, favorScript, status);
}

// Pairs of (language subtag, + or -) for finding out fast if common languages
// are LTR (minus) or RTL (plus).
static const char LANG_DIR_STRING[] =
        "root-en-es-pt-zh-ja-ko-de-fr-it-ar+he+fa+ru-nl-pl-th-tr-";

// Implemented here because this calls ulocimp_addLikelySubtags().
U_CAPI UBool U_EXPORT2
uloc_isRightToLeft(const char *locale) {
    UErrorCode errorCode = U_ZERO_ERROR;
    icu::CharString lang;
    icu::CharString script;
    ulocimp_getSubtags(locale, &lang, &script, nullptr, nullptr, nullptr, errorCode);
    if (U_FAILURE(errorCode) || script.isEmpty()) {
        // Fastpath: We know the likely scripts and their writing direction
        // for some common languages.
        if (!lang.isEmpty()) {
            const char* langPtr = uprv_strstr(LANG_DIR_STRING, lang.data());
            if (langPtr != nullptr) {
                switch (langPtr[lang.length()]) {
                case '-': return false;
                case '+': return true;
                default: break;  // partial match of a longer code
                }
            }
        }
        // Otherwise, find the likely script.
        errorCode = U_ZERO_ERROR;
        icu::CharString likely;
        {
            icu::CharStringByteSink sink(&likely);
            ulocimp_addLikelySubtags(locale, sink, &errorCode);
        }
        if (U_FAILURE(errorCode)) {
            return false;
        }
        ulocimp_getSubtags(likely.data(), nullptr, &script, nullptr, nullptr, nullptr, errorCode);
        if (U_FAILURE(errorCode) || script.isEmpty()) {
            return false;
        }
    }
    UScriptCode scriptCode = (UScriptCode)u_getPropertyValueEnum(UCHAR_SCRIPT, script.data());
    return uscript_isRightToLeft(scriptCode);
}

U_NAMESPACE_BEGIN

UBool
Locale::isRightToLeft() const {
    return uloc_isRightToLeft(getBaseName());
}

U_NAMESPACE_END

namespace {
icu::CharString
GetRegionFromKey(const char* localeID, const char* key, UErrorCode& status) {
    icu::CharString result;

    // First check for keyword value
    icu::CharString kw;
    {
        icu::CharStringByteSink sink(&kw);
        ulocimp_getKeywordValue(localeID, key, sink, &status);
    }
    int32_t len = kw.length();
    if (U_SUCCESS(status) && len >= 3 && len <= 7) {
        // chop off the subdivision code (which will generally be "zzzz" anyway)
        const char* const data = kw.data();
        if (uprv_isASCIILetter(data[0])) {
            result.append(uprv_toupper(data[0]), status);
            result.append(uprv_toupper(data[1]), status);
        } else {
            // assume three-digit region code
            result.append(data, 3, status);
        }
    }
    return result;
}
}  // namespace

U_CAPI int32_t U_EXPORT2
ulocimp_getRegionForSupplementalData(const char *localeID, UBool inferRegion,
                                     char *region, int32_t regionCapacity, UErrorCode* status) {
    if (U_FAILURE(*status)) {
        return 0;
    }
    icu::CharString rgBuf = GetRegionFromKey(localeID, "rg", *status);
    if (U_SUCCESS(*status) && rgBuf.isEmpty()) {
        // No valid rg keyword value, try for unicode_region_subtag
        rgBuf = ulocimp_getRegion(localeID, *status);
        if (U_SUCCESS(*status) && rgBuf.isEmpty() && inferRegion) {
            // Second check for sd keyword value
            rgBuf = GetRegionFromKey(localeID, "sd", *status);
            if (U_SUCCESS(*status) && rgBuf.isEmpty()) {
                // no unicode_region_subtag but inferRegion true, try likely subtags
                UErrorCode rgStatus = U_ZERO_ERROR;
                icu::CharString locBuf;
                {
                    icu::CharStringByteSink sink(&locBuf);
                    ulocimp_addLikelySubtags(localeID, sink, &rgStatus);
                }
                if (U_SUCCESS(rgStatus)) {
                    rgBuf = ulocimp_getRegion(locBuf.data(), *status);
                }
            }
        }
    }

    return rgBuf.extract(region, regionCapacity, *status);
}
