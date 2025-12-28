import * as vscode from 'vscode';
import {DiagnosticCodes} from '../diagnostic/DiagnosticCodes';
import {IDiagnosticCodeActionProvider} from './IDiagnosticCodeActionProvider';

export class AddSelfFixProvider implements IDiagnosticCodeActionProvider {
    public provideCodeActions(
        document: vscode.TextDocument,
        diagnostic: vscode.Diagnostic,
        code: string | number
    ): vscode.CodeAction[] | undefined {
        if (code !== DiagnosticCodes.FIELD_FORGOT_SELF && code !== DiagnosticCodes.METHOD_FORGOT_SELF) {
            return undefined;
        }

        const memberType = code === DiagnosticCodes.FIELD_FORGOT_SELF ? 'field' : 'method';
        const action = this.createAddSelfFix(document, diagnostic, memberType);
        return [action];
    }

    private createAddSelfFix(
        document: vscode.TextDocument,
        diagnostic: vscode.Diagnostic,
        memberType: 'field' | 'method'
    ): vscode.CodeAction {
        const action = new vscode.CodeAction(
            `Add 'self.' before ${memberType}`,
            vscode.CodeActionKind.QuickFix
        );
        action.diagnostics = [diagnostic];
        action.isPreferred = true;

        const edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, diagnostic.range.start, 'self.');

        action.edit = edit;
        return action;
    }
}
