import * as vscode from 'vscode';
import { DiagnosticUtils } from './DiagnosticUtils';
import { CommentAwareTextProcessor } from './CommentAwareTextProcessor';

export class BracketValidator {
    public static validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];
        const processor = new CommentAwareTextProcessor(document);

        let openBraces = 0;
        let closeBraces = 0;

        for (let line = 0; line < document.lineCount; line++) {
            const lineText = document.lineAt(line).text;
            for (let charIndex = 0; charIndex < lineText.length; charIndex++) {
                const position = new vscode.Position(line, charIndex);
                const char = lineText[charIndex];

                if (processor.isInComment(position) || processor.isInString(position)) {
                    continue;
                }

                if (char === '{') openBraces++;
                if (char === '}') closeBraces++;
            }
        }

        if (openBraces !== closeBraces) {
            const lastLine = document.lineCount - 1;
            const range = new vscode.Range(new vscode.Position(lastLine, 0), new vscode.Position(lastLine, 0));
            DiagnosticUtils.addDiagnostic(diagnostics, document, range, "Mismatched brackets: missing opening or closing braces.");
        }

        return diagnostics;
    }
}
