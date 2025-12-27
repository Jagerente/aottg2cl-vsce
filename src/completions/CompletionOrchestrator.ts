import * as vscode from 'vscode';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';
import { CodeContextUtils } from '../utils/CodeContextUtils';
import { VariableCompletionProvider } from './VariableCompletionProvider';
import { KeywordCompletionProvider } from './KeywordCompletionProvider';
import { MainFunctionsCompletionProvider } from './MainFunctionsCompletionProvider';
import { CompletionContext } from './CompletionContext';
import { ClassKinds } from '../classes/IClass';

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

        if (context.currentClass && !context.currentMethod && !context.isDeclaringVariable) {
            const hasRightText = /\S/.test(context.textAfterCursor);
            const preferSnippet = !hasRightText;
            const isEmptyLine = context.textBeforeCursor.trim() === '' && context.textAfterCursor.trim() === '';
            const textBeforeCursor = context.textBeforeCursor.trimStart();
            const extendSnippet = isEmptyLine || !(textBeforeCursor.endsWith('function ') || textBeforeCursor.endsWith('coroutine '));
    
            if (!context.isDeclaringVariable && (!context.isInsideMethodDeclaration || textBeforeCursor.endsWith('function ') || textBeforeCursor.endsWith('coroutine ') || isEmptyLine)) {
                switch (context.currentClass?.kind) {
                    case ClassKinds.CLASS:
                        items.push(...this.mainFunctionsProvider.provideClassCompletions(context.currentClass, extendSnippet, preferSnippet, context.wordRange));
                        break;
                    case ClassKinds.EXTENSION:
                        if (context.currentClass.name === 'Main') {
                            items.push(...this.mainFunctionsProvider.provideMainClassCompletions(context.currentClass, extendSnippet, preferSnippet, context.wordRange));
                            break;
                        }
                        break;
                    case ClassKinds.COMPONENT:
                        items.push(...this.mainFunctionsProvider.provideComponentClassCompletions(context.currentClass, extendSnippet, preferSnippet, context.wordRange));
                        break;
                    case ClassKinds.CUTSCENE:
                        items.push(...this.mainFunctionsProvider.provideCutsceneCompletions(context.currentClass, extendSnippet, preferSnippet, context.wordRange));
                        break;
                }
            }

            const keywordCompletions = this.keywordProvider.provideCompletions(context);
            items.push(...keywordCompletions);

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

