import * as vscode from 'vscode';
import { ClassKinds, IClass } from '../classes/IClass';
import { IValidator } from './DiagnosticManager';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';

export class CtorValidator implements IValidator {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];

        this.documentTreeProvider.getUserDefinedClassesMap().forEach((classDef: IClass) => {
            if (classDef.kind !== ClassKinds.EXTENSION) {
                const constructors = classDef.constructors;

                if (!constructors || constructors.length <= 1) {
                    return;
                }

                constructors.forEach(ctor => {
                    if (ctor.declarationRange) {
                        const diagnostic = new vscode.Diagnostic(
                            ctor.declarationRange,
                            `Class '${classDef.name}' has multiple constructors, which is not allowed.`,
                            vscode.DiagnosticSeverity.Warning
                        );
                        diagnostics.push(diagnostic);
                    }
                });
            }
        });

        return diagnostics;
    }
}
