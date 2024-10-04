import * as vscode from 'vscode';
import { IClass, IMethod } from '../classes/IClass';
import { DiagnosticUtils } from './DiagnosticUtils';

export class ClassUsageValidator {
    private availableClasses: IClass[];

    constructor(availableClasses: IClass[]) {
        this.availableClasses = availableClasses;
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];
        const text = document.getText();
        const lines = text.split(/\r?\n/);

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            const methodPattern = /^([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)(?=\()/;
            const fieldPattern = /^([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\b/;

            const methodMatch = trimmedLine.match(methodPattern);
            const fieldMatch = trimmedLine.match(fieldPattern);

            if (methodMatch) {
                const className = methodMatch[1];
                const methodName = methodMatch[2];
                const methodStart = methodMatch.index!;
                const methodEnd = methodStart + methodMatch[0].length;

                this.validateStaticMethodUsage(document, diagnostics, className, methodName, index, methodStart, methodEnd);
            }

            if (fieldMatch && !methodMatch) {
                const className = fieldMatch[1];
                const fieldName = fieldMatch[2];
                const fieldStart = fieldMatch.index!;
                const fieldEnd = fieldStart + fieldMatch[0].length;

                this.validateStaticFieldUsage(document, diagnostics, className, fieldName, index, fieldStart, fieldEnd);
            }
        });

        return diagnostics;
    }

    private validateStaticMethodUsage(
        document: vscode.TextDocument,
        diagnostics: vscode.Diagnostic[],
        className: string,
        methodName: string,
        lineIndex: number,
        methodStart: number,
        methodEnd: number
    ) {
        const classDef = this.availableClasses.find(cls => cls.name === className);
        if (!classDef) {
            return;
        }

        const methodDef = classDef.staticMethods.find(method => method.label === methodName);
        if (!methodDef) {
            const line = document.lineAt(lineIndex).text;
            const startPosition = line.indexOf(className);
            const endPosition = line.indexOf(methodName) + methodName.length;

            const range = new vscode.Range(
                new vscode.Position(lineIndex, startPosition),
                new vscode.Position(lineIndex, endPosition)
            );
            DiagnosticUtils.addDiagnostic(diagnostics, document, range, `Unknown method: ${methodName} in class ${className}`);
        } else {
            this.validateMethodArguments(document, diagnostics, methodDef, lineIndex, methodStart, methodEnd);
        }
    }

    private validateMethodArguments(
        document: vscode.TextDocument,
        diagnostics: vscode.Diagnostic[],
        methodDef: IMethod,
        lineIndex: number,
        methodStart: number,
        methodEnd: number
    ) {
        const lineText = document.lineAt(lineIndex).text;
        const openParenIndex = lineText.indexOf('(', methodEnd);

        if (openParenIndex === -1) {
            return;
        }

        const closeParenIndex = this.findMatchingParenIndex(lineText, openParenIndex);

        if (closeParenIndex === -1) {
            return;
        }

        const argsString = lineText.substring(openParenIndex + 1, closeParenIndex).trim();
        const args = this.parseArguments(argsString);

        const requiredParamsCount = methodDef.parameters.filter(
            (param) => !param.isOptional && !param.isVariadic
        ).length;
        const hasVariadic = methodDef.parameters.some((param) => param.isVariadic);
        const optionalsCount = methodDef.parameters.filter((param) => param.isOptional).length;
        const maxParamsCount = hasVariadic ? Infinity : requiredParamsCount + optionalsCount;

        if (args.length < requiredParamsCount || args.length > maxParamsCount) {
            const range = new vscode.Range(
                new vscode.Position(lineIndex, openParenIndex),
                new vscode.Position(lineIndex, closeParenIndex + 1)
            );

            let expectedArgsDescription: string;

            if (hasVariadic) {
                expectedArgsDescription = `${requiredParamsCount}+`;
            } else if (optionalsCount > 0) {
                expectedArgsDescription = `${requiredParamsCount} to ${maxParamsCount}`;
            } else {
                expectedArgsDescription = `${requiredParamsCount}`;
            }

            DiagnosticUtils.addDiagnostic(
                diagnostics,
                document,
                range,
                `Incorrect number of arguments for method ${methodDef.label}. Expected ${expectedArgsDescription} arguments, found ${args.length}.`
            );
        }
    }

    private findMatchingParenIndex(lineText: string, openParenIndex: number): number {
        let depth = 1;
        let insideString = false;
        let stringChar = '';

        for (let i = openParenIndex + 1; i < lineText.length; i++) {
            const char = lineText[i];

            if (insideString) {
                if (char === stringChar && lineText[i - 1] !== '\\') {
                    insideString = false;
                }
            } else {
                if (char === '"' || char === "'") {
                    insideString = true;
                    stringChar = char;
                } else if (char === '(') {
                    depth++;
                } else if (char === ')') {
                    depth--;
                    if (depth === 0) {
                        return i;
                    }
                }
            }
        }
        return -1;
    }

    private parseArguments(argsString: string): string[] {
        const args: string[] = [];
        let currentArg = '';
        let insideString = false;
        let stringChar = '';
        let parenDepth = 0;

        for (let i = 0; i < argsString.length; i++) {
            const char = argsString[i];

            if (insideString) {
                currentArg += char;
                if (char === stringChar && argsString[i - 1] !== '\\') {
                    insideString = false;
                }
            } else {
                if (char === '"' || char === "'") {
                    insideString = true;
                    stringChar = char;
                    currentArg += char;
                } else if (char === '(') {
                    parenDepth++;
                    currentArg += char;
                } else if (char === ')') {
                    parenDepth--;
                    currentArg += char;
                } else if (char === ',' && parenDepth === 0) {
                    args.push(currentArg.trim());
                    currentArg = '';
                } else {
                    currentArg += char;
                }
            }
        }

        if (currentArg.trim().length > 0) {
            args.push(currentArg.trim());
        }

        return args;
    }

    private validateStaticFieldUsage(
        document: vscode.TextDocument,
        diagnostics: vscode.Diagnostic[],
        className: string,
        fieldName: string,
        lineIndex: number,
        fieldStart: number,
        fieldEnd: number
    ) {
        const classDef = this.availableClasses.find(cls => cls.name === className);
        if (!classDef) {
            return;
        }

        const fieldDef = classDef.staticFields.find(field => field.label === fieldName);
        if (!fieldDef) {
            const line = document.lineAt(lineIndex).text;
            const startPosition = line.indexOf(className);
            const endPosition = line.indexOf(fieldName) + fieldName.length;

            const range = new vscode.Range(
                new vscode.Position(lineIndex, startPosition),
                new vscode.Position(lineIndex, endPosition)
            );
            DiagnosticUtils.addDiagnostic(diagnostics, document, range, `Unknown field: ${fieldName} in class ${className}`);
        }
    }
}
