import * as vscode from 'vscode';
import {DiagnosticCodes} from '../diagnostic/DiagnosticCodes';
import {IDiagnosticCodeActionProvider} from './IDiagnosticCodeActionProvider';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';

export class AddCutsceneStartFixProvider implements IDiagnosticCodeActionProvider {
    constructor(private readonly documentTreeProvider: DocumentTreeProvider) {
    }

    public provideCodeActions(
        document: vscode.TextDocument,
        diagnostic: vscode.Diagnostic,
        code: string | number
    ): vscode.CodeAction[] | undefined {
        if (code !== DiagnosticCodes.CUTSCENE_MISSING_START) {
            return undefined;
        }

        const action = this.createAddStartMethodFix(document, diagnostic);
        return action ? [action] : undefined;
    }

    private createAddStartMethodFix(
        document: vscode.TextDocument,
        diagnostic: vscode.Diagnostic
    ): vscode.CodeAction | undefined {
        const position = diagnostic.range.start;
        const currentClass = this.documentTreeProvider.getCurrentClassByDeclaration(document, position);

        if (!currentClass || !currentClass.bodyRange) {
            return undefined;
        }

        const action = new vscode.CodeAction(
            "Add coroutine Start() method",
            vscode.CodeActionKind.QuickFix
        );
        action.diagnostics = [diagnostic];
        action.isPreferred = true;

        const bodyRange = currentClass.bodyRange;
        const edit = new vscode.WorkspaceEdit();

        const declLine = document.lineAt(currentClass.declarationRange?.start.line ?? bodyRange.start.line);
        const baseIndent = declLine.text.substring(0, declLine.firstNonWhitespaceCharacterIndex);
        const methodIndent = baseIndent + '\t';

        const methodBody = `coroutine Start()\n${methodIndent}{\n${methodIndent}\t\n${methodIndent}}`;

        const startLine = document.lineAt(bodyRange.start.line);
        const textBeforeBrace = startLine.text.substring(0, bodyRange.start.character);

        if (textBeforeBrace.trim().length > 0) {
            edit.insert(document.uri, bodyRange.start, `\n${baseIndent}`);
        }

        if (bodyRange.isSingleLine) {
            const insertPos = bodyRange.start.translate(0, 1);
            const textToInsert = `\n${methodIndent}${methodBody}\n${baseIndent}`;
            edit.insert(document.uri, insertPos, textToInsert);
        } else {
            const allMethods = [
                ...(currentClass.constructors || []),
                ...(currentClass.instanceMethods || []),
                ...(currentClass.staticMethods || [])
            ];

            let firstMember = undefined;
            for (const member of allMethods) {
                if (!member.declarationRange) {
                    continue;
                }

                if (member.declarationRange.start.line > bodyRange.start.line &&
                    member.declarationRange.end.line < bodyRange.end.line) {

                    if (
                        !firstMember ||
                        !firstMember.declarationRange ||
                        member.declarationRange.start.line < firstMember.declarationRange.start.line
                    ) {
                        firstMember = member;
                    }
                }
            }

            if (firstMember && firstMember.declarationRange) {
                const insertPos = new vscode.Position(firstMember.declarationRange.start.line, 0);

                const textToInsert = `${methodIndent}${methodBody}\n\n`;
                edit.insert(document.uri, insertPos, textToInsert);
            } else {
                const closingBraceOffset = document.offsetAt(bodyRange.end) - 1;
                const insertPos = document.positionAt(closingBraceOffset);

                let prefixNewLine = "";

                if (closingBraceOffset > 0) {
                    const prevCharRange = new vscode.Range(
                        document.positionAt(closingBraceOffset - 1),
                        insertPos
                    );
                    const prevChar = document.getText(prevCharRange);

                    if (!/\s/.test(prevChar) || prevChar === ' ' || prevChar === '\t') {
                        prefixNewLine = "\n";
                    }

                    if (insertPos.line > bodyRange.start.line) {
                        const lineAbove = document.lineAt(insertPos.line - 1);
                        if (!lineAbove.isEmptyOrWhitespace && !lineAbove.text.trim().endsWith('{')) {
                            prefixNewLine = "\n";
                        }
                    }
                }

                const textToInsert = `${prefixNewLine}${methodIndent}${methodBody}\n`;
                edit.insert(document.uri, insertPos, textToInsert);
            }
        }

        action.edit = edit;
        return action;
    }
}
