import * as vscode from 'vscode';
import * as markdown from '../utils/MarkdownHelper';
import { CompletionContext } from './CompletionContext';

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
        
        const { isInsideClassDeclaration, isInsideMethodDeclaration, lineText, textBeforeCursor, textAfterCursor, wordRange, documentTreeProvider, position } = context;

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
