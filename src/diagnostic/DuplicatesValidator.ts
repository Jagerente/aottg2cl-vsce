import * as vscode from 'vscode';
import { IClass, IMethod, IField } from '../classes/IClass';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';

export class DuplicatesValidator {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];
        const classes = this.documentTreeProvider.getAllAvailableClasses(document);

        const classNames = new Map<string, IClass[]>();
        classes.forEach((classDef) => {
            if (!classNames.has(classDef.name)) {
                classNames.set(classDef.name, []);
            }
            classNames.get(classDef.name)!.push(classDef);
        });

        classNames.forEach((classDefs, className) => {
            if (classDefs.length > 1) {
                const currentClasses = classDefs.filter(cls => cls.sourceUri?.fsPath === document.uri.fsPath);
                if (currentClasses.length > 0) {
                    currentClasses.forEach((classDef) => {
                        const diagnostic = new vscode.Diagnostic(
                            classDef.declarationRange!,
                            `Duplicate class declaration '${className}' detected (exists in ${classDefs.length} definitions).`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    });
                }
            }
        });

        classes.forEach((classDef) => {
            const methodSignatures = new Map<string, IMethod[]>();
            const fieldNames = new Map<string, IField[]>();

            const allMethods = [...classDef.instanceMethods, ...classDef.staticMethods];

            allMethods.forEach((method) => {
                const signature = `${method.label}(${method.parameters.length})`;
                if (!methodSignatures.has(signature)) {
                    methodSignatures.set(signature, []);
                }
                methodSignatures.get(signature)!.push(method);
            });

            methodSignatures.forEach((methods, signature) => {
                if (methods.length > 1) {
                    methods.forEach((method) => {
                        if (method.declarationRange) {
                            const diagnostic = new vscode.Diagnostic(
                                method.declarationRange!,
                                `Duplicate method '${method.label}' with the same parameter count in class '${classDef.name}'.`,
                                vscode.DiagnosticSeverity.Error
                            );
                            diagnostics.push(diagnostic);
                        }
                    });
                }
            });

            const allFields = [...classDef.instanceFields, ...classDef.staticFields];

            allFields.forEach((field) => {
                const fieldName = field.label;
                if (!fieldNames.has(fieldName)) {
                    fieldNames.set(fieldName, []);
                }
                fieldNames.get(fieldName)!.push(field);
            });

            fieldNames.forEach((fields, fieldName) => {
                if (fields.length > 1) {
                    fields.forEach((field) => {
                        const diagnostic = new vscode.Diagnostic(
                            field.declarationRange!,
                            `Duplicate field '${fieldName}' in class '${classDef.name}'.`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    });
                }
            });

            const methodNamesMap = new Map<string, IMethod[]>();
            allMethods.forEach((method) => {
                if (!methodNamesMap.has(method.label)) {
                    methodNamesMap.set(method.label, []);
                }
                methodNamesMap.get(method.label)!.push(method);
            });

            const fieldNamesMap = new Map<string, IField[]>();
            allFields.forEach((field) => {
                if (!fieldNamesMap.has(field.label)) {
                    fieldNamesMap.set(field.label, []);
                }
                fieldNamesMap.get(field.label)!.push(field);
            });

            const overlappingNames = new Set<string>();
            methodNamesMap.forEach((_, name) => {
                if (fieldNamesMap.has(name)) {
                    overlappingNames.add(name);
                }
            });

            overlappingNames.forEach((name) => {
                const methodsWithName = methodNamesMap.get(name)!;
                const fieldsWithName = fieldNamesMap.get(name)!;

                methodsWithName.forEach((method) => {
                    const diagnostic = new vscode.Diagnostic(
                        method.declarationRange!,
                        `Method '${method.label}' has the same name as a field in class '${classDef.name}'.`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                });

                fieldsWithName.forEach((field) => {
                    const diagnostic = new vscode.Diagnostic(
                        field.declarationRange!,
                        `Field '${field.label}' has the same name as a method in class '${classDef.name}'.`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                });
            });
        });

        return diagnostics;
    }
}
