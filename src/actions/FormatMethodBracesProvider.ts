import * as vscode from 'vscode';
import {IMethod, IConstructor} from '../classes/IClass';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';

export class FormatMethodBracesProvider implements vscode.CodeActionProvider {
    public static readonly providedCodeActionKinds = [
        vscode.CodeActionKind.QuickFix
    ];

    constructor(private readonly documentTreeProvider: DocumentTreeProvider) {
    }

    public provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range | vscode.Selection,
        context: vscode.CodeActionContext,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.CodeAction[]> {
        if (token.isCancellationRequested) {
            return [];
        }

        const actions: vscode.CodeAction[] = [];

        const position = range.start;

        let targetMethod = this.documentTreeProvider.getCurrentMethod(document, position);

        if (!targetMethod) {
            targetMethod = this.documentTreeProvider.getCurrentDeclaringMethod(document, position);
        }

        if (!targetMethod || !targetMethod.declarationRange || !targetMethod.bodyRange) {
            return actions;
        }

        if (token.isCancellationRequested) {
            return [];
        }

        const edits = this.getFormattingEdits(document, targetMethod);

        if (token.isCancellationRequested) {
            return [];
        }

        if (edits.length === 0) {
            return actions;
        }

        const methodName = 'label' in targetMethod ? targetMethod.label : 'Init';
        const methodType = 'label' in targetMethod
            ? (targetMethod.kind === 'coroutine' ? 'coroutine' : 'function')
            : 'constructor';

        const action = new vscode.CodeAction(
            `Format ${methodType} ${methodName} braces (Allman style)`,
            vscode.CodeActionKind.QuickFix
        );

        const workspaceEdit = new vscode.WorkspaceEdit();
        workspaceEdit.set(document.uri, edits);
        action.edit = workspaceEdit;

        actions.push(action);

        return actions;
    }

    private getFormattingEdits(document: vscode.TextDocument, methodDef: IMethod | IConstructor): vscode.TextEdit[] {
        const edits: vscode.TextEdit[] = [];

        if (!methodDef.declarationRange || !methodDef.bodyRange) {
            return edits;
        }

        const declarationLine = document.lineAt(methodDef.declarationRange.start.line);
        const baseIndent = declarationLine.text.substring(0, declarationLine.firstNonWhitespaceCharacterIndex);
        const contentIndent = baseIndent + '\t';

        const bodyRange = methodDef.bodyRange;
        const bodyStartLine = document.lineAt(bodyRange.start.line);
        const bodyEndLine = document.lineAt(bodyRange.end.line);

        const textBeforeOpeningBrace = bodyStartLine.text.substring(0, bodyRange.start.character);
        if (textBeforeOpeningBrace.trim().length > 0) {
            edits.push(
                vscode.TextEdit.insert(bodyRange.start, `\n${baseIndent}`)
            );
        }

        const textAfterOpeningBrace = bodyStartLine.text.substring(bodyRange.start.character + 1);
        if (textAfterOpeningBrace.trim().length > 0) {
            const insertPos = bodyRange.start.translate(0, 1);
            edits.push(
                vscode.TextEdit.insert(insertPos, `\n${contentIndent}`)
            );
        }

        const textBeforeClosingBrace = bodyEndLine.text.substring(0, bodyRange.end.character);
        const trimmedBeforeClosing = textBeforeClosingBrace.trim();

        if (trimmedBeforeClosing.length > 0) {
            edits.push(
                vscode.TextEdit.insert(bodyRange.end, `\n${baseIndent}`)
            );
        }

        return edits;
    }
}

