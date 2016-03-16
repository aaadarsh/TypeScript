﻿/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\compiler\commandLineParser.ts" />

namespace ts {
    describe('parseCommandLine', () => {

        function assertParseResult(commandLine: string[], expectedParsedCommandLine: ts.ParsedCommandLine) {
            const parsed = ts.parseCommandLine(commandLine);
            const parsedCompilerOptions = JSON.stringify(parsed.options);
            const expectedCompilerOptions = JSON.stringify(expectedParsedCommandLine.options);
            assert.equal(parsedCompilerOptions, expectedCompilerOptions);

            const parsedErrors = parsed.errors;
            const expectedErrors = expectedParsedCommandLine.errors;
            assert.isTrue(parsedErrors.length === expectedErrors.length, `Expected error: ${JSON.stringify(expectedErrors)}. Actual error: ${JSON.stringify(parsedErrors)}.`);
            for (let i = 0; i < parsedErrors.length; ++i) {
                const parsedError = parsedErrors[i];
                const expectedError = expectedErrors[i]; 
                assert.equal(parsedError.code, expectedError.code);
                assert.equal(parsedError.category, expectedError.category);
                assert.equal(parsedError.messageText, expectedError.messageText);
            }

            const parsedFileNames = parsed.fileNames;
            const expectedFileNames = expectedParsedCommandLine.fileNames;
            assert.isTrue(parsedFileNames.length === expectedFileNames.length, `Expected fileNames: [${JSON.stringify(expectedFileNames)}]. Actual fileNames: [${JSON.stringify(parsedFileNames)}].`);
            for (let i = 0; i < parsedFileNames.length; ++i) {
                const parsedFileName = parsedFileNames[i];
                const expectedFileName = expectedFileNames[i]; 
                assert.equal(parsedFileName, expectedFileName);
            }
        }

        it("Parse single option of library flag ", () => {
            // --lib es6 0.ts
            assertParseResult(["--lib", "es6", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es6.d.ts"]
                    }
                });
        });

        it("Parse multiple options of library flags ", () => {
            // --lib es5,es6.symbol.wellknown 0.ts
            assertParseResult(["--lib", "es5,es6.symbol.wellknown", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts", "lib.es6.symbol.wellknown.d.ts"]
                    }
                });
        });

        it("Parse unavailable options of library flags ", () => {
            // --lib es5,es7 0.ts
            assertParseResult(["--lib", "es5,es8", "0.ts"],
                {
                    errors: [{
                        messageText: "Argument for '--lib' option must be:  'es5', 'es6', 'es7', 'dom', 'webworker', 'scripthost', 'es6.array', 'es6.collection', 'es6.function', 'es6.iterable', 'es6.math', 'es6.number', 'es6.object', 'es6.promise', 'es6.proxy', 'es6.reflect', 'es6.regexp', 'es6.symbol', 'es6.symbol.wellknown', 'es7.array.include'",
                        category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                        code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts"]
                    }
                });
        });

        it("Parse empty options of --jsx ", () => {
            // 0.ts --lib
            assertParseResult(["0.ts", "--jsx"],
                {
                    errors: [{
                        messageText: "Compiler option 'jsx' expects an argument.",
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--jsx' option must be:  'preserve', 'react'",
                            category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse empty options of --module ", () => {
            // 0.ts --lib
            assertParseResult(["0.ts", "--module"],
                {
                    errors: [{
                        messageText: "Compiler option 'module' expects an argument.",
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--module' option must be:  'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015'", 
                            category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse empty options of --newLine ", () => {
            // 0.ts --lib
            assertParseResult(["0.ts", "--newLine"],
                {
                    errors: [{
                        messageText: "Compiler option 'newLine' expects an argument.",
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--newLine' option must be:  'crlf', 'lf'",
                            category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse empty options of --target ", () => {
            // 0.ts --lib
            assertParseResult(["0.ts", "--target"],
                {
                    errors: [{
                        messageText: "Compiler option 'target' expects an argument.",
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--target' option must be:  'es3', 'es5', 'es6', 'es2015'",
                            category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse empty options of --moduleResolution ", () => {
            // 0.ts --lib
            assertParseResult(["0.ts", "--moduleResolution"],
                {
                    errors: [{
                        messageText: "Compiler option 'moduleResolution' expects an argument.",
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                            messageText: "Argument for '--moduleResolution' option must be:  'node', 'classic'",
                            category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                            code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                            file: undefined,
                            start: undefined,
                            length: undefined,
                        }],
                    fileNames: ["0.ts"],
                    options: {}
                });
        });

        it("Parse empty options of --lib ", () => {
            // 0.ts --lib
            assertParseResult(["0.ts", "--lib"],
                {
                    errors: [{
                        messageText: "Compiler option 'lib' expects an argument.",
                        category: ts.Diagnostics.Compiler_option_0_expects_an_argument.category,
                        code: ts.Diagnostics.Compiler_option_0_expects_an_argument.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }, {
                        messageText: "Argument for '--lib' option must be:  'es5', 'es6', 'es7', 'dom', 'webworker', 'scripthost', 'es6.array', 'es6.collection', 'es6.function', 'es6.iterable', 'es6.math', 'es6.number', 'es6.object', 'es6.promise', 'es6.proxy', 'es6.reflect', 'es6.regexp', 'es6.symbol', 'es6.symbol.wellknown', 'es7.array.include'",
                        category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                        code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["0.ts"],
                    options: {
                        lib: []
                    }
                });
        });

        it("Parse --lib option with extra comma ", () => {
            // --lib es5, es7 0.ts
            assertParseResult(["--lib", "es5,", "es7", "0.ts"],
                {
                    errors: [{
                        messageText: "Argument for '--lib' option must be:  'es5', 'es6', 'es7', 'dom', 'webworker', 'scripthost', 'es6.array', 'es6.collection', 'es6.function', 'es6.iterable', 'es6.math', 'es6.number', 'es6.object', 'es6.promise', 'es6.proxy', 'es6.reflect', 'es6.regexp', 'es6.symbol', 'es6.symbol.wellknown', 'es7.array.include'",
                        category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                        code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["es7", "0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts"]
                    }
                });
        });

        it("Parse --lib option with trailing white-space ", () => {
            // --lib es5, es7 0.ts
            assertParseResult(["--lib", "es5, ", "es7", "0.ts"],
                {
                    errors: [{
                        messageText: "Argument for '--lib' option must be:  'es5', 'es6', 'es7', 'dom', 'webworker', 'scripthost', 'es6.array', 'es6.collection', 'es6.function', 'es6.iterable', 'es6.math', 'es6.number', 'es6.object', 'es6.promise', 'es6.proxy', 'es6.reflect', 'es6.regexp', 'es6.symbol', 'es6.symbol.wellknown', 'es7.array.include'",
                        category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                        code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["es7", "0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts"]
                    }
                });
        });

        it("Parse multiple compiler flags with input files at the end", () => {
            // --lib es5,es6.symbol.wellknown --target es5 0.ts
            assertParseResult(["--lib", "es5,es6.symbol.wellknown", "--target", "es5", "0.ts"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        lib: ["lib.es5.d.ts", "lib.es6.symbol.wellknown.d.ts"],
                        target: ts.ScriptTarget.ES5,
                    }
                });
        });

        it("Parse multiple compiler flags with input files in the middle", () => {
            // --module commonjs --target es5 0.ts --lib es5,es6.symbol.wellknown
            assertParseResult(["--module", "commonjs", "--target", "es5", "0.ts", "--lib", "es5,es6.symbol.wellknown"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        module: ts.ModuleKind.CommonJS,
                        target: ts.ScriptTarget.ES5,
                        lib: ["lib.es5.d.ts", "lib.es6.symbol.wellknown.d.ts"],
                    }
                });
        });

        it("Parse --lib as the last arguments", () => {
            // --module commonjs --target es5 0.ts --lib es5, es6.symbol.wellknown
            assertParseResult(["--module", "commonjs", "--target", "es5", "0.ts", "--lib", "es5,", "es6.symbol.wellknown"],
                {
                    errors: [{
                        messageText: "Argument for '--lib' option must be:  'es5', 'es6', 'es7', 'dom', 'webworker', 'scripthost', 'es6.array', 'es6.collection', 'es6.function', 'es6.iterable', 'es6.math', 'es6.number', 'es6.object', 'es6.promise', 'es6.proxy', 'es6.reflect', 'es6.regexp', 'es6.symbol', 'es6.symbol.wellknown', 'es7.array.include'",
                        category: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.category,
                        code: ts.Diagnostics.Argument_for_0_option_must_be_Colon_1.code,

                        file: undefined,
                        start: undefined,
                        length: undefined,
                    }],
                    fileNames: ["0.ts", "es6.symbol.wellknown"],
                    options: {
                        module: ts.ModuleKind.CommonJS,
                        target: ts.ScriptTarget.ES5,
                        lib: ["lib.es5.d.ts"],
                    }
                });
        });

        it("Parse multiple library compiler flags ", () => {
            // --module commonjs --target es5 --lib es5 0.ts --library es6.array,es6.symbol.wellknown
            assertParseResult(["--module", "commonjs", "--target", "es5", "--lib", "es5", "0.ts", "--lib", "es6.array,es6.symbol.wellknown"],
                {
                    errors: [],
                    fileNames: ["0.ts"],
                    options: {
                        module: ts.ModuleKind.CommonJS,
                        target: ts.ScriptTarget.ES5,
                        lib: ["lib.es6.array.d.ts", "lib.es6.symbol.wellknown.d.ts"],
                    }
                });
        });
    });
}
