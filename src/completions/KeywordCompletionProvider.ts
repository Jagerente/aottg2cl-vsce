import * as vscode from 'vscode';
import * as markdown from '../utils/MarkdownHelper';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';
import { ClassKinds } from '../classes/IClass';

export class KeywordCompletionProvider implements vscode.CompletionItemProvider, vscode.HoverProvider {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    private keywords = [
        { label: 'class', snippet: 'class $1\n{\n\t$0\n}', description: 'Classes allow you to create modular pieces of code.' },
        { label: 'component', snippet: 'component $1\n{\n\t$0\n}', description: 'Components are a type of class that can be added to map objects.' },
        { label: 'extension', snippet: 'extension $1\n{\n\t$0\n}', description: 'Extensions allow you to create static classes for utility functions.' },
        { label: 'function', snippet: 'function $1()\n{\n\t$0\n}', description: 'Functions are blocks of code that can be called.' },
        { label: 'coroutine', snippet: 'coroutine $1()\n{\n\t$0\n}', description: 'Coroutines are like functions except run in the background, while normal functions will interrupt the game until the function is completed.' },
        { label: 'cutscene', snippet: 'cutscene $1\n{\n\tcoroutine Start()\n\t{\n\t\t$0\n\t}\n}', description: 'Cutscenes are a type of class that can be conveniently referenced using the Cutscene static class.' },
        { label: 'if', snippet: 'if ($1)\n{\n\t$2\n}\n$0', description: 'If statement to execute code if a condition is true.' },
        { label: 'else', snippet: 'else\n{\n\t$0\n}', description: 'Else statement to execute code if the "if" condition is false.' },
        { label: 'elif', snippet: 'elif ($1)\n{\n\t$2\n}\n$0', description: 'Else if statement to execute code if the "if" condition is false.' },
        { label: 'for', snippet: 'for ($1 in $2)\n{\n\t$0\n}', description: 'For loop to iterate a block of code.' },
        { label: 'while', snippet: 'while ($1)\n{\n\t$0\n}', description: 'While loop to execute code as long as a condition is true.' },
        { label: 'break', snippet: 'break;$0', description: 'Breaks the current loop' },
        { label: 'continue', snippet: 'continue;$0', description: 'Skips to the next iteration of the loop' },
        { label: 'return', snippet: 'return$0;', description: 'Return statement to exit a function and return a value.' },
    ];

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];

        const isInsideClass = this.documentTreeProvider.isInsideClassBody(position);
        const isInsideComponent = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.COMPONENT);
        const isInsideExtension = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.EXTENSION);
        const isInsideCutscene = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.CUTSCENE);
        const isInsideAnyClass = isInsideClass || isInsideComponent || isInsideExtension || isInsideCutscene;

        const isInsideAnyFunction = this.documentTreeProvider.isInsideAnyMethodBody(position);

        const isInsideLoop = this.documentTreeProvider.isInsideLoopBody(position);
        const canSuggestElif = this.documentTreeProvider.canSuggestElif(position);

        if (!isInsideAnyClass) {
            items.push(this.createCompletionItem('class'));
            items.push(this.createCompletionItem('component'));
            items.push(this.createCompletionItem('extension'));
            items.push(this.createCompletionItem('cutscene'));
        }

        if (isInsideAnyClass && !isInsideAnyFunction) {
            items.push(this.createCompletionItem('function'));
            items.push(this.createCompletionItem('coroutine'));
        }

        if (isInsideAnyFunction) {
            items.push(this.createCompletionItem('self'));
            items.push(this.createCompletionItem('if'));
            if (canSuggestElif) {
                items.push(this.createCompletionItem('else'));
                items.push(this.createCompletionItem('elif'));
            }
            items.push(this.createCompletionItem('for'));
            items.push(this.createCompletionItem('while'));
            items.push(this.createCompletionItem('return'));
        }

        if (isInsideLoop) {
            items.push(this.createCompletionItem('break'));
            items.push(this.createCompletionItem('continue'));
        }

        return items;
    }

    public provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.Hover | undefined {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);

        const keyword = this.keywords.find(k => k.label === word);
        if (keyword) {
            return new vscode.Hover(markdown.createKeywordMarkdown(keyword));
        }

        return undefined;
    }

    private createCompletionItem(label: string): vscode.CompletionItem {
        const keyword = this.keywords.find(k => k.label === label);

        if (keyword) {
            const item = new vscode.CompletionItem(keyword.label, vscode.CompletionItemKind.Keyword);
            item.insertText = new vscode.SnippetString(keyword.snippet);
            item.documentation = new vscode.MarkdownString(keyword.description);
            return item;
        }

        return new vscode.CompletionItem(label);
    }
}
