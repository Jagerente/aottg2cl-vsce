import * as vscode from 'vscode';
import {ClassKinds, MethodKinds} from '../classes/IClass';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';

export class CutsceneValidator {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];

        this.documentTreeProvider.getUserDefinedClasses(document).forEach((classDef) => {
            if (classDef.kind === ClassKinds.CUTSCENE) {
                if (!classDef.instanceMethods.some(method => method.label === 'Start' && method.kind === MethodKinds.COROUTINE && method.parameters.length === 0)) {
                    const diagnostic = new vscode.Diagnostic(
                        classDef.declarationRange!,
                        `Cutscene '${classDef.name}' must contain a coroutine 'Start()'.`,
                        vscode.DiagnosticSeverity.Warning
                    );
                    diagnostics.push(diagnostic);
                }
            }
        });

        return diagnostics;
    }
}
