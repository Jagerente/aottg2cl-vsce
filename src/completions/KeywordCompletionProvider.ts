import * as vscode from 'vscode';
import { CodeContextUtils } from '../utils/CodeContextUtils';

export class KeywordCompletionProvider implements vscode.CompletionItemProvider, vscode.HoverProvider {

    private keywords = [
        { label: 'class', snippet: 'class $1 \n{\n\t$0\n}', description: 'Classes allow you to create modular pieces of code.' },
        { label: 'component', snippet: 'component $1 \n{\n\t$0\n}', description: 'Components are a type of class that can be added to map objects.' },
        { label: 'extension', snippet: 'extension $1 \n{\n\t$0\n}', description: 'Extensions allow you to create static classes for utility functions.' },
        { label: 'function', snippet: 'function $1() \n{\n\t$0\n}', description: 'Functions are blocks of code that can be called.' },
        { label: 'coroutine', snippet: 'coroutine $1() \n{\n\t$0\n}', description: 'Coroutines are like functions except run in the background, while normal functions will interrupt the game until the function is completed.' },
        { label: 'cutscene', snippet: 'cutscene $1() \n{\n\t$0\n}', description: 'Cutscenes are a type of class that can be conveniently referenced using the Cutscene static class.' },
        { label: 'if', snippet: 'if ($1) \n{\n\t$0\n}', description: 'If statement to execute code if a condition is true.' },
        { label: 'else', snippet: 'else \n{\n\t$0\n}', description: 'Else statement to execute code if the "if" condition is false.' },
        { label: 'elif', snippet: 'elif ($1) \n{\n\t$0\n}', description: 'Else if statement to execute code if the "if" condition is false.' },
        { label: 'for', snippet: 'for ($1)\n{\n\t$0\n}', description: 'For loop to iterate a block of code.' },
        { label: 'while', snippet: 'while ($1) \n{\n\t$0\n}', description: 'While loop to execute code as long as a condition is true.' },
        { label: 'return', snippet: 'return$0;', description: 'Return statement to exit a function and return a value.' },
        { label: 'Range', snippet: 'Range($1, $2, $0)', description: 'Inherits from List. Allows you to create lists of integers for convenient iteration, particularly in for loops.' }
    ];

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];

        const isInsideClass = CodeContextUtils.isInsideClass(document, position);
        const isInsideFunction = CodeContextUtils.isInsideFunction(document, position);
        const isInsideCoroutine = CodeContextUtils.isInsideCoroutine(document, position);
        const isInsideCutscene = CodeContextUtils.isInsideCutscene(document, position);
        const isInsideAnyFunction = isInsideFunction || isInsideCoroutine || isInsideCutscene;
        const canSuggestElse = CodeContextUtils.canSuggestElse(document, position);

        if (!isInsideClass) {
            items.push(this.createCompletionItem('class'));
            items.push(this.createCompletionItem('component'));
            items.push(this.createCompletionItem('extension'));
        }

        if (isInsideClass && !isInsideAnyFunction) {
            items.push(this.createCompletionItem('function'));
            items.push(this.createCompletionItem('coroutine'));
            items.push(this.createCompletionItem('cutscene'));
        }

        if (isInsideAnyFunction) {
            items.push(this.createCompletionItem('self'));
            items.push(this.createCompletionItem('if'));
            if (canSuggestElse) {
                items.push(this.createCompletionItem('else'));
                items.push(this.createCompletionItem('elif'));
            }
            items.push(this.createCompletionItem('for'));
            items.push(this.createCompletionItem('while'));
            items.push(this.createCompletionItem('return'));
            items.push(this.createCompletionItem('Range'));
        }

        return items;
    }

    public provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.Hover | undefined {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);

        const keyword = this.keywords.find(k => k.label === word);
        if (keyword) {
            return new vscode.Hover(new vscode.MarkdownString(`**${keyword.label}**: ${keyword.description}`));
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
