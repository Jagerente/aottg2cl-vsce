import * as vscode from 'vscode';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';
import { CodeContextUtils } from '../utils/CodeContextUtils';
import { VariableCompletionProvider } from './VariableCompletionProvider';
import { KeywordCompletionProvider } from './KeywordCompletionProvider';
import { MainFunctionsCompletionProvider } from './MainFunctionsCompletionProvider';
import { CompletionContext } from './CompletionContext';

export class CompletionOrchestrator implements vscode.CompletionItemProvider {
    constructor(
        private documentTreeProvider: DocumentTreeProvider,
        private variableProvider: VariableCompletionProvider,
        private keywordProvider: KeywordCompletionProvider,
        private mainFunctionsProvider: MainFunctionsCompletionProvider
    ) {}

    public provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): vscode.ProviderResult<vscode.CompletionItem[]> {
        const context = this.parseContext(document, position);

        if (context.isInsideString || context.isInsideComment) {
            return [];
        }

        const items: vscode.CompletionItem[] = [];

        if (context.currentClass && !context.currentMethod && context.isDeclaringFunction && !context.isInsideMethodDeclaration) {
            items.push(...this.mainFunctionsProvider.provideCompletions(context));
            return items;
        }

        if (context.isInsideClassDeclaration || context.isInsideMethodDeclaration) {
            items.push(...this.keywordProvider.provideCompletions(context));
            return items;
        }

        if (context.currentMethod || (context.currentClass && context.isDeclaringVariable)) {
            const variableCompletions = this.variableProvider.provideCompletions(context);
            items.push(...variableCompletions);
        }

        if (context.isInsideChainNode || context.callChainString.endsWith('.') || context.callChainString.endsWith('(') || context.callChainString.endsWith(')')) {
            return items;
        }

        if (!context.isDeclaringVariable)
        {
            const keywordCompletions = this.keywordProvider.provideCompletions(context);
            items.push(...keywordCompletions);
        }

        return items;
    }

    private parseContext(document: vscode.TextDocument, position: vscode.Position): CompletionContext {
        const lineText = document.lineAt(position).text;
        const textBeforeCursor = lineText.substring(0, position.character);
        const textAfterCursor = lineText.substring(position.character);
        const wordRange = document.getWordRangeAtPosition(position, /[\w$]+/);
        const nextIsParen = /^\s*\(/.test(textAfterCursor);

        const callChainString = CodeContextUtils.parseCallChain(textBeforeCursor);
        const callChainArray = CodeContextUtils.splitCallChain(callChainString);

        return {
            document,
            position,
            lineText,
            textBeforeCursor,
            textAfterCursor,
            wordRange,
            isInsideClassDeclaration: this.documentTreeProvider.isInsideClassDeclaration(document, position),
            isInsideMethodDeclaration: this.documentTreeProvider.isInsideMethodDeclaration(document, position),
            isDeclaringFunction: CodeContextUtils.isDeclaringFunction(document, position),
            isDeclaringVariable: CodeContextUtils.isDeclaringVariable(document, position),
            isInsideChainNode: this.documentTreeProvider.isInsideChainNode(document, position),
            isInsideString: this.documentTreeProvider.isInsideString(document, position),
            isInsideComment: this.documentTreeProvider.isInsideComment(document, position),
            currentClass: this.documentTreeProvider.getCurrentClass(document, position),
            currentMethod: this.documentTreeProvider.getCurrentMethod(document, position),
            currentDeclaringMethod: this.documentTreeProvider.getCurrentDeclaringMethod(document, position),
            callChainString,
            callChainArray,
            nextIsParen,
            documentTreeProvider: this.documentTreeProvider
        };
    }
}

