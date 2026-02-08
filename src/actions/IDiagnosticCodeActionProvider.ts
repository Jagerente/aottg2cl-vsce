import * as vscode from 'vscode';

export interface IDiagnosticCodeActionProvider {
    provideCodeActions(
        document: vscode.TextDocument,
        diagnostic: vscode.Diagnostic,
        code: string | number
    ): vscode.CodeAction[] | undefined;
}
