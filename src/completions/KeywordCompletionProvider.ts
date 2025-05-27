import * as vscode from 'vscode';
import * as markdown from '../utils/MarkdownHelper';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';

export class KeywordCompletionProvider implements vscode.CompletionItemProvider, vscode.HoverProvider {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

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

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];
        const currentClass = this.documentTreeProvider.getCurrentClass(document, position);
        const currentMethod = this.documentTreeProvider.getCurrentMethod(document, position);

        const isInsideLoop = this.documentTreeProvider.isInsideLoopBody(document, position);
        const isInsideLoopCondition = this.documentTreeProvider.isInsideLoopCondition(document, position);
        const canSuggestElif = this.documentTreeProvider.canSuggestElif(document, position);

        const line = document.lineAt(position).text;
        const textBefore = line.slice(0, position.character);
        const textAfter = line.slice(position.character);
        const hasRightText = /\S/.test(textAfter);
        const preferSnippet = !hasRightText;

        const declMatch = textBefore.match(/\b(class|component|extension|cutscene|function|coroutine)\s*$/);
        const skipLabel = declMatch ? declMatch[1] : undefined;

        const wordRange = document.getWordRangeAtPosition(position, /[A-Za-z_]\w*/);

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

        if (!currentClass && skipLabel !== 'class' && skipLabel !== 'component' && skipLabel !== 'extension' && skipLabel !== 'cutscene') {
            ['class', 'component', 'extension', 'cutscene'].forEach(label => {
                items.push(makePlain(label));
                const kw = this.keywords.find(k => k.label === label);
                if (kw) {
                    items.push(makeSnippet(kw));
                }
            });
        } else if (currentClass && !currentMethod && skipLabel !== 'function' && skipLabel !== 'coroutine') {
            ['function', 'coroutine'].forEach(label => {
                items.push(makePlain(label));
                const kw = this.keywords.find(k => k.label === label);
                if (kw) {
                    items.push(makeSnippet(kw));
                }
            });
        } else if (currentMethod && !isInsideLoopCondition) {
            items.push(makePlain('self'));
            ['if', 'for', 'while', 'return'].forEach(label => {
                items.push(makePlain(label));
                const kw = this.keywords.find(k => k.label === label);
                if (kw) {
                    items.push(makeSnippet(kw));
                }
            });
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

        if (isInsideLoop && !isInsideLoopCondition) {
            [/*'break',*/ 'continue'].forEach(label => {
                items.push(makePlain(label));
                const kw = this.keywords.find(k => k.label === label);
                if (kw) {
                    items.push(makeSnippet(kw));
                }
            });
        }

        return items;
    }

    public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
        const range = document.getWordRangeAtPosition(position);
        const word = range && document.getText(range);
        const keyword = this.keywords.find(k => k.label === word);
        if (keyword) {
            return new vscode.Hover(markdown.createKeywordMarkdown(keyword));
        }
        return undefined;
    }
}
