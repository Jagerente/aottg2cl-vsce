import * as vscode from 'vscode';
import * as markdown from '../utils/MarkdownHelper';

interface Keyword {
    parent: any;
    label: string;
    description: string;
}

export class KeywordHoverProvider {
    private keywords: Keyword[] = [
        {
            parent: this,
            label: 'class',
            description: 'Classes allow you to create modular pieces of code.'
        },
        {
            parent: this,
            label: 'component',
            description: 'Components are a type of class that can be added to map objects.'
        },
        {
            parent: this,
            label: 'extension',
            description: 'Extensions allow you to create static classes for utility functions.'
        },
        {
            parent: this,
            label: 'function',
            description: 'Functions are blocks of code that can be called.'
        },
        {
            parent: this,
            label: 'coroutine',
            description: 'Coroutines are like functions except run in the background.'
        },
        {
            parent: this,
            label: 'cutscene',
            description: 'Cutscenes are a type of class.'
        },
        {parent: this, label: 'if', description: 'If statement.'},
        {parent: this, label: 'else', description: 'Else statement.'},
        {parent: this, label: 'elif', description: 'Else if statement.'},
        {parent: this, label: 'for', description: 'For loop.'},
        {parent: this, label: 'while', description: 'While loop.'},
        {parent: this, label: 'break', description: 'Breaks the current loop.'},
        {parent: this, label: 'continue', description: 'Continues to next iteration.'},
        {parent: this, label: 'return', description: 'Return statement.'},
    ];

    public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
        const range = document.getWordRangeAtPosition(position);
        const word = range && document.getText(range);

        const line = document.lineAt(position.line);
        const lineText = line.text;
        const charIndex = position.character;

        const annotationMatch = lineText.match(/@(type|param|return)\b/);
        if (annotationMatch) {
            const annotationStart = lineText.indexOf(annotationMatch[0]);
            const annotationEnd = annotationStart + annotationMatch[0].length;

            if (charIndex >= annotationStart && charIndex <= annotationEnd) {
                const annotationType = annotationMatch[1];
                return new vscode.Hover(this.createAnnotationMarkdown(annotationType));
            }
        }

        const keyword = this.keywords.find(k => k.label === word);
        if (keyword) {
            return new vscode.Hover(markdown.createKeywordMarkdown(keyword));
        }

        return undefined;
    }

    private getSupportedTypesSection(): string {
        return '\n\n**Supported types:**\n' +
            '- Built-in types: `int`, `float`, `string`, `bool`, `function`, `any`\n' +
            '- Generic types: `List<T>`, `Dict<K, V>`\n' +
            '- Custom class types: `ClassName`\n' +
            '- Nested generics: `List<List<int>>`, `Dict<string, List<int>>`';
    }

    private createAnnotationMarkdown(annotationType: string): vscode.MarkdownString {
        let description = '';
        const supportedTypes = this.getSupportedTypesSection();

        switch (annotationType) {
            case 'type':
                description = '**@type** - Type annotation for local variables.\n\n' +
                    'Specifies the type of a class field or a local variable.\n\n' +
                    '**Syntax:**\n' +
                    '```acl\n' +
                    '# @type type description\n' +
                    'variableName = value;\n' +
                    '```\n\n' +
                    '**Example:**\n' +
                    '```acl\n' +
                    '# @type List<int> A list of numbers\n' +
                    'numbers = List();\n' +
                    '```' +
                    supportedTypes;
                break;

            case 'param':
                description = '**@param** - Parameter annotation for function and coroutine parameters.\n\n' +
                    'Documents the type and optionally the description of a function or coroutine parameter.\n\n' +
                    '**Syntax:**\n' +
                    '```acl\n' +
                    '# @param parameterName type description\n' +
                    'function MyFunction(param1, param2)\n' +
                    '```\n\n' +
                    '**Example:**\n' +
                    '```acl\n' +
                    '# @param delay float Execution delay in seconds\n' +
                    '# @param count int Number of executions\n' +
                    'coroutine Execute(delay, count)\n' +
                    '```' +
                    supportedTypes;
                break;

            case 'return':
                description = '**@return** - Return type annotation for functions and coroutines.\n\n' +
                    'Specifies the return type and optionally a description of what the function or coroutine does.\n\n' +
                    '**Syntax:**\n' +
                    '```acl\n' +
                    '# @return type description\n' +
                    'function MyFunction()\n' +
                    '```\n\n' +
                    '**Examples:**\n' +
                    '```acl\n' +
                    '# @return int Returns the value 83\n' +
                    'function GetValue()\n' +
                    '{\n' +
                    '    return 83;\n' +
                    '}\n' +
                    '```' +
                    supportedTypes;
                break;
        }

        return new vscode.MarkdownString(description);
    }
}
