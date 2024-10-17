import * as vscode from 'vscode';
import { DiagnosticUtils } from './DiagnosticUtils';
import { CommentAwareTextProcessor } from './CommentAwareTextProcessor';
import { IValidator } from './DiagnosticManager';

export class IncompleteMemberAccessValidator implements IValidator {
    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];
        const processor = new CommentAwareTextProcessor(document);

        for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
            const line = document.lineAt(lineIndex).text;

            const regex = /\b\w+\.\s*(;|$)/g;
            let match: RegExpExecArray | null;

            while ((match = regex.exec(line)) !== null) {
                const matchIndex = match.index;
                const dotIndex = line.indexOf('.', matchIndex);

                const startPos = new vscode.Position(lineIndex, dotIndex + 1);

                if (processor.isInComment(startPos) || processor.isInString(startPos)) {
                    continue;
                }

                let endPosIndex = dotIndex + 1;
                while (endPosIndex < line.length) {
                    const currentPosition = new vscode.Position(lineIndex, endPosIndex);
                    if (processor.isInComment(currentPosition) || processor.isInString(currentPosition)) {
                        break;
                    }
                    const char = line.charAt(endPosIndex);
                    if (char === ';' || /\s/.test(char)) {
                        break;
                    }
                    endPosIndex++;
                }

                const endPos = new vscode.Position(lineIndex, endPosIndex);

                const range = new vscode.Range(startPos, endPos);

                DiagnosticUtils.addDiagnostic(
                    diagnostics,
                    document,
                    range,
                    "Incomplete member access. You must specify a field or method after the dot."
                );
            }
        }

        return diagnostics;
    }
}
