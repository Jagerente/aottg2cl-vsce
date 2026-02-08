import * as vscode from 'vscode';
import * as markdown from '../utils/MarkdownHelper';
import {CompletionContext} from './CompletionContext';

export class KeywordCompletionProvider {

    private keywords = [
        {
            parent: this,
            label: 'class',
            snippet: 'class $1\n{\n\t$0\n}',
            description: 'Classes allow you to create modular pieces of code.'
        },
        {
            parent: this,
            label: 'component',
            snippet: 'component $1\n{\n\t$0\n}',
            description: 'Components are a type of class that can be added to map objects.'
        },
        {
            parent: this,
            label: 'extension',
            snippet: 'extension $1\n{\n\t$0\n}',
            description: 'Extensions allow you to create static classes for utility functions.'
        },
        {
            parent: this,
            label: 'function',
            snippet: 'function $1()\n{\n\t$0\n}',
            description: 'Functions are blocks of code that can be called.'
        },
        {
            parent: this,
            label: 'coroutine',
            snippet: 'coroutine $1()\n{\n\t$0\n}',
            description: 'Coroutines are like functions except run in the background.'
        },
        {
            parent: this,
            label: 'cutscene',
            snippet: 'cutscene $1\n{\n\tcoroutine Start()\n\t{\n\t\t$0\n\t}\n}',
            description: 'Cutscenes are a type of class.'
        },
        {parent: this, label: 'if', snippet: 'if ($1)\n{\n\t$2\n}\n$0', description: 'If statement.'},
        {parent: this, label: 'else', snippet: 'else\n{\n\t$0\n}', description: 'Else statement.'},
        {parent: this, label: 'elif', snippet: 'elif ($1)\n{\n\t$2\n}\n$0', description: 'Else if statement.'},
        {parent: this, label: 'for', snippet: 'for ($1 in $2)\n{\n\t$0\n}', description: 'For loop.'},
        {parent: this, label: 'while', snippet: 'while ($1)\n{\n\t$0\n}', description: 'While loop.'},
        {parent: this, label: 'break', snippet: 'break;$0', description: 'Breaks the current loop.'},
        {parent: this, label: 'continue', snippet: 'continue;$0', description: 'Continues to next iteration.'},
        {parent: this, label: 'return', snippet: 'return$0;', description: 'Return statement.'},
    ];

    public provideCompletions(context: CompletionContext): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];

        const {
            isInsideClassDeclaration,
            isInsideMethodDeclaration,
            textBeforeCursor,
            textAfterCursor,
            wordRange,
            documentTreeProvider,
            position
        } = context;

        const hasRightText = /\S/.test(textAfterCursor);
        const preferSnippet = !hasRightText;
        const declMatch = textBeforeCursor.match(/\b(class|component|extension|cutscene|function|coroutine)\s*$/);
        const skipLabel = declMatch ? declMatch[1] : undefined;

        const makePlain = (label: string) => {
            const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Keyword);
            item.insertText = label;
            item.sortText = (preferSnippet ? '1_' : '0_') + label;
            if (wordRange) {
                item.range = wordRange;
            }
            return item;
        };

        const makeSnippet = (kw: { label: string; snippet: string; description: string }) => {
            const item = new vscode.CompletionItem(kw.label, vscode.CompletionItemKind.Snippet);
            item.insertText = new vscode.SnippetString(kw.snippet);
            item.documentation = new vscode.MarkdownString(kw.description);
            item.sortText = (preferSnippet ? '0_' : '1_') + kw.label;
            if (wordRange) {
                item.range = wordRange;
            }
            return item;
        };

        if (!isInsideClassDeclaration && skipLabel !== 'class' && skipLabel !== 'component' && skipLabel !== 'extension' && skipLabel !== 'cutscene') {
            const currentClass = context.currentClass;
            if (!currentClass) {
                ['class', 'component', 'extension', 'cutscene'].forEach(label => {
                    items.push(makePlain(label));
                    const kw = this.keywords.find(k => k.label === label);
                    if (kw) {
                        items.push(makeSnippet(kw));
                    }
                });
                return items;
            }

            if (!isInsideMethodDeclaration && skipLabel !== 'function' && skipLabel !== 'coroutine') {
                const currentMethod = context.currentMethod;
                if (!currentMethod) {
                    ['function', 'coroutine'].forEach(label => {
                        items.push(makePlain(label));
                        const kw = this.keywords.find(k => k.label === label);
                        if (kw) {
                            items.push(makeSnippet(kw));
                        }
                    });
                    return items;
                }

                const isInsideLoopCondition = documentTreeProvider.isInsideLoopCondition(context.document, position);
                if (!isInsideLoopCondition) {
                    items.push(makePlain('self'));
                    ['if', 'for', 'while', 'return'].forEach(label => {
                        items.push(makePlain(label));
                        const kw = this.keywords.find(k => k.label === label);
                        if (kw) {
                            items.push(makeSnippet(kw));
                        }
                    });
                    const canSuggestElif = documentTreeProvider.canSuggestElif(context.document, position);
                    if (canSuggestElif) {
                        ['else', 'elif'].forEach(label => {
                            items.push(makePlain(label));
                            const kw = this.keywords.find(k => k.label === label);
                            if (kw) {
                                items.push(makeSnippet(kw));
                            }
                        });
                    }
                }

                const isInsideLoop = documentTreeProvider.isInsideLoopBody(context.document, position);
                if (isInsideLoop && !isInsideLoopCondition) {
                    [/*'break',*/ 'continue'].forEach(label => {
                        items.push(makePlain(label));
                        const kw = this.keywords.find(k => k.label === label);
                        if (kw) {
                            items.push(makeSnippet(kw));
                        }
                    });
                }
            }
        }

        return items;
    }
}
