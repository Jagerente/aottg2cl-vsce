import * as vscode from 'vscode';
import { DiagnosticUtils } from './DiagnosticUtils';
import { CommentAwareTextProcessor } from './CommentAwareTextProcessor';

export class MissingSemicolonValidator {
    public static validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];
        const processor = new CommentAwareTextProcessor(document);

        for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
            const line = document.lineAt(lineIndex).text;

            let i = 0;
            while (i < line.length) {
                const position = new vscode.Position(lineIndex, i);
                const char = line[i];

                if (/\s/.test(char)) {
                    i++;
                } else if (processor.isInComment(position)) {
                    i++;
                    while (i < line.length && processor.isInComment(new vscode.Position(lineIndex, i))) {
                        i++;
                    }
                } else {
                    break;
                }
            }

            if (i >= line.length) {
                continue;
            }

            const codeStartIndex = i;
            let code = line.substring(codeStartIndex);

            let codeWithoutComments = '';
            for (let j = 0; j < code.length; j++) {
                const position = new vscode.Position(lineIndex, codeStartIndex + j);
                if (processor.isInComment(position)) {
                    break;
                }
                codeWithoutComments += code[j];
            }

            code = codeWithoutComments.trim();

            if (code.length === 0) {
                continue;
            }

            if (
                code.match(/^(class|component|extension|function|coroutine|cutscene|if|for|while|else|elif|return)/) ||
                code.endsWith('{') ||
                code.endsWith('}')
            ) {
                continue;
            }

            if (!code.endsWith(';')) {
                const semicolonPosition = new vscode.Position(lineIndex, codeStartIndex + code.length);
                const range = new vscode.Range(semicolonPosition, semicolonPosition);

                DiagnosticUtils.addDiagnostic(
                    diagnostics,
                    document,
                    range,
                    "Missing semicolon."
                );
            }
        }

        return diagnostics;
    }
}
