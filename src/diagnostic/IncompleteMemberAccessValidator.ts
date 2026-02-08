import * as vscode from 'vscode';
import {IValidator} from './DiagnosticManager';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';
import {DiagnosticCodes} from './DiagnosticCodes';

export class IncompleteMemberAccessValidator implements IValidator {
    private static readonly INCOMPLETE_ACCESS_REGEX = /\.\s*(?=;|$)/g;

    constructor(private readonly documentTreeProvider: DocumentTreeProvider) {
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];

        for (let i = 0; i < document.lineCount; i++) {
            this.validateLine(document, i, diagnostics);
        }

        return diagnostics;
    }

    private validateLine(document: vscode.TextDocument, lineIndex: number, diagnostics: vscode.Diagnostic[]): void {
        const line = document.lineAt(lineIndex);
        const text = line.text;

        if (!text.includes('.')) {
            return;
        }

        const regex = new RegExp(IncompleteMemberAccessValidator.INCOMPLETE_ACCESS_REGEX);
        let match: RegExpExecArray | null;

        while ((match = regex.exec(text)) !== null) {
            const matchIndex = match.index;
            const matchText = match[0];

            const dotPosition = new vscode.Position(lineIndex, matchIndex);

            if (this.isIgnoredContext(document, dotPosition)) {
                continue;
            }

            const startPos = dotPosition;
            const endPos = new vscode.Position(lineIndex, matchIndex + matchText.length);

            diagnostics.push(this.createDiagnostic(new vscode.Range(startPos, endPos)));
        }
    }

    private isIgnoredContext(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.documentTreeProvider.isInsideComment(document, position) ||
            this.documentTreeProvider.isInsideString(document, position);
    }

    private createDiagnostic(range: vscode.Range): vscode.Diagnostic {
        const diagnostic = new vscode.Diagnostic(
            range,
            "Incomplete member access. You must specify a field or method after the dot.",
            vscode.DiagnosticSeverity.Error
        );
        diagnostic.code = DiagnosticCodes.INCOMPLETE_MEMBER_ACCESS;
        return diagnostic;
    }
}
