// © 2023 and later: Unicode, Inc. and others.
// License & terms of use: http://www.unicode.org/copyright.html
package com.ibm.icu.dev.test.format;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import com.ibm.icu.text.PersonName;
import com.ibm.icu.text.PersonNameFormatter;
import com.ibm.icu.text.SimplePersonName;

/**
 * This is a test designed to parse the files generated by GeneratePersonNameTestData.java in
 * the CLDR project.  It takes one command-line parameter-- the path to the directory that
 * contains the test files (common/testData/personNameTest in the CLDR source tree).
 * This isn't set up as a unit test because of the dependency on the CLDR files (I didn't
 * want to copy all of those over into the ICU tree) and because I thought the test would
 * take too long to run.
 */
public class ExhaustivePersonNameFormatterTest {
    public static void main(String[] args) throws IOException {
        if (args.length < 1) {
            throw new IllegalArgumentException("No data file directory specified!");
        }

        String dataFilePath = args[0];
        File dataFileDir = new File(dataFilePath);

        if (!dataFileDir.isDirectory()) {
            throw new IllegalArgumentException(dataFilePath + " is not a directory!");
        }

        int filesWithErrors = 0;
        int filesWithoutErrors = 0;
        int skippedFiles = 0;
        int totalErrors = 0;

        for (String filename : dataFileDir.list()) {
            File dataFile = new File(dataFileDir, filename);
            if (dataFile.isDirectory() || !filename.endsWith(".txt")) {
                System.out.println("Skipping " + filename + "...");
                continue;
            }
            String[] FILENAMES_TO_SKIP = {"gaa.txt", "dsb.txt", "syr.txt", "hsb.txt", "lij.txt"};
            if (Arrays.asList(FILENAMES_TO_SKIP).contains(filename)) {
                // extra check to narrow down the files for debugging
                System.out.println("Skipping " + filename + "...");
                ++skippedFiles;
                continue;
            }
            int testErrors = runTest(dataFile);
            if (testErrors == 0) {
                ++filesWithoutErrors;
            } else {
                ++filesWithErrors;
                totalErrors += testErrors;
            }
        }

        System.out.println();
        System.out.println("Files without errors: " + filesWithoutErrors);
        System.out.println("Files with errors: " + filesWithErrors);
        if (skippedFiles > 0) {
            System.out.println("Skipped files: " + skippedFiles);
        }
        System.out.println("Total number of errors: " + totalErrors);
    }

    private static int runTest(File testFile) throws IOException {
        LineNumberReader in = new LineNumberReader(new InputStreamReader(new FileInputStream(testFile)));
        String line = null;
        PersonNameTester tester = new PersonNameTester(testFile.getName());

        do {
            line = in.readLine();
            tester.processLine(line, in.getLineNumber());
        } while (line != null);

        System.out.println(testFile.getAbsolutePath() + " had " + tester.getErrorCount() + " errors");
        return tester.getErrorCount();
    }

    private static class PersonNameTester {
        SimplePersonName name = null;
        SimplePersonName.Builder nameBuilder = null;
        String expectedResult = null;
        Locale formatterLocale = null;
        int errorCount = 0;

        public PersonNameTester(String testFileName) {
            formatterLocale = Locale.forLanguageTag(testFileName.substring(0, testFileName.length() - ".txt".length()).replace('_', '-'));
        }

        public void processLine(String line, int lineNumber) {
            if (line == null || line.isEmpty() || line.startsWith("#")) {
                return;
            }

            String[] lineFields = line.split(";");
            String opcode = lineFields[0].trim();
            String[] parameters = Arrays.copyOfRange(lineFields,1, lineFields.length);

            processCommand(opcode, parameters, lineNumber);
        }

        public int getErrorCount() {
            return errorCount;
        }

        private void processCommand(String opcode, String[] parameters, int lineNumber) {
            if (opcode.equals("enum")) {
                processEnumLine();
            } else if (opcode.equals("name")) {
                processNameLine(parameters, lineNumber);
            } else if (opcode.equals("expectedResult")) {
                processExpectedResultLine(parameters, lineNumber);
            } else if (opcode.equals("parameters")) {
                processParametersLine(parameters, lineNumber);
            } else if (opcode.equals("endName")) {
                processEndNameLine();
            } else {
                System.err.println("Unknown command '" + opcode + "' at line " + lineNumber);
            }
        }

        private void processEnumLine() {
            // this test isn't actually going to do anything with "enum" lines
        }

        private void processNameLine(String[] parameters, int lineNumber) {
            if (checkState(name == null, "name", lineNumber)
                    && checkNumParams(parameters, 2, "name", lineNumber)) {
                if (nameBuilder == null) {
                    nameBuilder = SimplePersonName.builder();
                }

                String fieldName = parameters[0].trim();
                String fieldValue = parameters[1].trim();

                if (fieldName.equals("locale")) {
                    nameBuilder.setLocale(Locale.forLanguageTag(fieldValue.replace("_", "-")));
                } else {
                    String[] fieldNamePieces = fieldName.split("-");
                    PersonName.NameField nameField = PersonName.NameField.forString(fieldNamePieces[0]);
                    List<PersonName.FieldModifier> fieldModifiers = new ArrayList<>();
                    for (int i = 1; i < fieldNamePieces.length; i++) {
                        fieldModifiers.add(PersonName.FieldModifier.forString(fieldNamePieces[i]));
                    }
                    nameBuilder.addField(nameField, fieldModifiers, fieldValue);
                }
            }
        }

        private void processExpectedResultLine(String[] parameters, int lineNumber) {
            if (checkState(name != null || nameBuilder != null, "expectedResult", lineNumber)
                    && checkNumParams(parameters, 1, "expectedResult", lineNumber)) {
                if (name == null) {
                    name = nameBuilder.build();
                    nameBuilder = null;
                }
                expectedResult = parameters[0].trim();
            }
        }

        private void processParametersLine(String[] parameters, int lineNumber) {
            if (checkState(name != null && expectedResult != null, "parameters", lineNumber)
                    && checkNumParams(parameters, 4, "parameters", lineNumber)) {
                String optionsStr = parameters[0].trim();
                String lengthStr = parameters[1].trim();
                String usageStr = parameters[2].trim();
                String formalityStr = parameters[3].trim();

                PersonNameFormatter.Builder builder = PersonNameFormatter.builder();
                builder.setLocale(formatterLocale);
                if (optionsStr.equals("sorting")) {
                    builder.setDisplayOrder(PersonNameFormatter.DisplayOrder.SORTING);
                }
                builder.setLength(PersonNameFormatter.Length.valueOf(lengthStr.toUpperCase()));
                builder.setUsage(PersonNameFormatter.Usage.valueOf(usageStr.toUpperCase()));
                builder.setFormality(PersonNameFormatter.Formality.valueOf(formalityStr.toUpperCase()));

                PersonNameFormatter formatter = builder.build();
                String actualResult = formatter.formatToString(name);

                checkResult(actualResult, lineNumber);
            }
        }

        private void processEndNameLine() {
            name = null;
            expectedResult = null;
            nameBuilder = null;
        }

        private boolean checkNumParams(String[] parameters, int expectedLength, String opcode, int lineNumber) {
            boolean result = parameters.length == expectedLength;
            if (!result) {
                reportError("'" + opcode + "' line doesn't have " + expectedLength + " parameters", lineNumber);
            }
            return result;
        }

        private boolean checkState(boolean state, String opcode, int lineNumber) {
            if (!state) {
                reportError("Misplaced '" + opcode + "' line", lineNumber);
            }
            return state;
        }

        private boolean checkResult(String actualResult, int lineNumber) {
            boolean result = expectedResult.equals(actualResult);
            if (!result) {
                reportError("Expected '" + expectedResult + "', got '" + actualResult + "'", lineNumber);
            }
            return result;
        }

        private void reportError(String error, int lineNumber) {
            System.out.println("    " + error + " at line " + lineNumber);
            ++errorCount;
        }
    }
}
