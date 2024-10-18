import * as vscode from 'vscode';
import { IClass } from '../classes/IClass';
import { IValidator } from './DiagnosticManager';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';

export class TestRangeHighliterValidator implements IValidator {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        let diagnostics: vscode.Diagnostic[] = [];

        diagnostics = this.loopsHighlight().concat(diagnostics);
        diagnostics = this.classHighlight().concat(diagnostics);

        return diagnostics;
    }

    private loopsHighlight(): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];

        this.documentTreeProvider.getLoopNodes().forEach((loopNode) => {
            diagnostics.push(new vscode.Diagnostic(
                loopNode.conditionsRange,
                'Loop conditions.',
                vscode.DiagnosticSeverity.Information
            ));

            diagnostics.push(new vscode.Diagnostic(
                loopNode.bodyRange,
                'Loop body.',
                vscode.DiagnosticSeverity.Information
            ));
        });

        return diagnostics;
    }

    private classHighlight(): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];

        this.documentTreeProvider.getUserDefinedClassesMap().forEach((classDef: IClass) => {
            diagnostics.push(new vscode.Diagnostic(
                classDef.bodyRange!,
                `${classDef.kind} ${classDef.name} body.`,
                vscode.DiagnosticSeverity.Information
            ));
            diagnostics.push(new vscode.Diagnostic(
                classDef.declarationRange!,
                `${classDef.kind} ${classDef.name} declaration.`,
                vscode.DiagnosticSeverity.Information
            ));

            classDef.instanceMethods.forEach((method) => {
                if (method.declarationRange) {
                    diagnostics.push(new vscode.Diagnostic(
                        method.declarationRange!,
                        `${classDef.name} ${method.kind} ${method.label} declaration.`,
                        vscode.DiagnosticSeverity.Information
                    ));
                }

                if (method.bodyRange) {
                    diagnostics.push(new vscode.Diagnostic(
                        method.bodyRange!,
                        `${classDef.name} ${method.kind} ${method.label} body.`,
                        vscode.DiagnosticSeverity.Information
                    ));
                }
            });

            classDef.staticMethods.forEach((method) => {
                if (method.declarationRange) {
                    diagnostics.push(new vscode.Diagnostic(
                        method.declarationRange!,
                        `${classDef.name}.${method.kind} ${method.label} declaration.`,
                        vscode.DiagnosticSeverity.Information
                    ));
                }

                if (method.bodyRange) {
                    diagnostics.push(new vscode.Diagnostic(
                        method.bodyRange!,
                        `${classDef.name} ${method.kind} ${method.label} body.`,
                        vscode.DiagnosticSeverity.Information
                    ));
                }
            });
        });

        return diagnostics;
    }
}
