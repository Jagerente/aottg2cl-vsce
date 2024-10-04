import * as vscode from 'vscode';

export class DiagnosticUtils {
    public static addDiagnostic(
        diagnostics: vscode.Diagnostic[],
        document: vscode.TextDocument,
        range: vscode.Range,
        message: string,
        severity: vscode.DiagnosticSeverity = vscode.DiagnosticSeverity.Error
    ): void {
        const diagnostic = new vscode.Diagnostic(range, message, severity);
        diagnostics.push(diagnostic);
    }
}
