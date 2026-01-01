import * as vscode from 'vscode';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';
import {CodeContextUtils} from '../utils/CodeContextUtils';
import {VariableCompletionProvider} from './VariableCompletionProvider';
import {KeywordCompletionProvider} from './KeywordCompletionProvider';
import {MainFunctionsCompletionProvider} from './MainFunctionsCompletionProvider';
import {CompletionContext} from './CompletionContext';
import {ClassKinds} from '../classes/IClass';

export class CompletionOrchestrator implements vscode.CompletionItemProvider {
    private readonly variableCompletionProvider: VariableCompletionProvider;
    private readonly keywordCompletionProvider: KeywordCompletionProvider;
    private readonly mainFunctionsCompletionProvider: MainFunctionsCompletionProvider;

    constructor(
        private documentTreeProvider: DocumentTreeProvider,
    ) {
        this.variableCompletionProvider = new VariableCompletionProvider();
        this.keywordCompletionProvider = new KeywordCompletionProvider();
        this.mainFunctionsCompletionProvider = new MainFunctionsCompletionProvider();
    }

    public async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.CompletionItem[]> {
        await this.documentTreeProvider.ensureDocumentParsed(document);

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
                        items.push(...this.mainFunctionsCompletionProvider.provideClassCompletions(context.currentClass, extendSnippet, preferSnippet, context.wordRange));
                        break;
                    case ClassKinds.EXTENSION:
                        if (context.currentClass.name === 'Main') {
                            items.push(...this.mainFunctionsCompletionProvider.provideMainClassCompletions(context.currentClass, extendSnippet, preferSnippet, context.wordRange));
                            break;
                        }
                        break;
                    case ClassKinds.COMPONENT:
                        items.push(...this.mainFunctionsCompletionProvider.provideComponentClassCompletions(context.currentClass, extendSnippet, preferSnippet, context.wordRange));
                        break;
                    case ClassKinds.CUTSCENE:
                        items.push(...this.mainFunctionsCompletionProvider.provideCutsceneCompletions(context.currentClass, extendSnippet, preferSnippet, context.wordRange));
                        break;
                }
            }

            const keywordCompletions = this.keywordCompletionProvider.provideCompletions(context);
            items.push(...keywordCompletions);

            return items;
        }

        if (context.isInsideClassDeclaration || context.isInsideMethodDeclaration) {
            items.push(...this.keywordCompletionProvider.provideCompletions(context));
            return items;
        }

        if (context.currentMethod || (context.currentClass && context.isDeclaringVariable)) {
            const variableCompletions = this.variableCompletionProvider.provideCompletions(context);
            items.push(...variableCompletions);
        }

        if (
            context.isInsideChainNode
            || context.textBeforeCursor.endsWith('.')
            || context.textBeforeCursor.endsWith('(')
            || context.textBeforeCursor.endsWith(')')
            || context.textAfterCursor.startsWith(';')
        ) {
            return items;
        }

        if (!context.isDeclaringVariable) {
            const keywordCompletions = this.keywordCompletionProvider.provideCompletions(context);
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
            callChainInfo: this.documentTreeProvider.findChainAtPosition(document, position),
            nextIsParen,
            documentTreeProvider: this.documentTreeProvider
        };
    }
}
