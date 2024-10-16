import * as vscode from 'vscode';
import { StringAwareParser as StringAwareParser } from './StringAwareParser';
import { CommentAwareTextProcessor } from '../diagnostic/CommentAwareTextProcessor';

export class CodeContextUtils {

    public static canSuggestElse(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openBracesCount = 0;
        let closeBracesCount = 0;
        let hasIf = false;
        let hasElse = false;

        for (let i = position.line - 1; i >= 0; i--) {
            const lineText = document.lineAt(i).text.trim();

            if (lineText === '' || lineText === '{' || lineText === '}') continue;

            if (lineText.startsWith('if') || lineText.startsWith('elif')) {
                hasIf = true;
                if (openBracesCount === closeBracesCount) {
                    return true;
                }
            }

            if (lineText.startsWith('else')) {
                hasElse = true;
                if (openBracesCount === closeBracesCount) {
                    return false;
                }
            }

            closeBracesCount += (lineText.match(/\}/g) || []).length;
            openBracesCount += (lineText.match(/\{/g) || []).length;

            if (lineText.startsWith('for') || lineText.startsWith('while') || lineText.startsWith('function') || lineText.startsWith('coroutine') || lineText.startsWith('cutscene') || lineText.startsWith('class') || lineText.startsWith('component') || lineText.startsWith('component')) {
                return false;
            }
        }

        return hasIf && !hasElse;
    }

    public static isInsideLoop(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openBracesCount = 0;
        let closeBracesCount = 0;

        const commentAwareTextProcessor = new CommentAwareTextProcessor(document);
        const stringAwareParser = new StringAwareParser();

        for (let i = position.line; i >= 0; i--) {
            let lineText = document.lineAt(i).text;

            if (i === position.line) {
                lineText = lineText.slice(0, position.character);
                const range = new vscode.Range(new vscode.Position(i, 0), position);
                lineText = commentAwareTextProcessor.removeCommentsFromRange(lineText, range);
            } else {
                lineText = commentAwareTextProcessor.removeCommentsFromRange(lineText, new vscode.Range(i, 0, i, lineText.length));
            }

            let resultLine = lineText.trim();
            resultLine = stringAwareParser.parseLine(resultLine);  // Обрабатываем строку без строковых литералов
            resultLine = resultLine.trim();

            if (resultLine.startsWith('for') || resultLine.startsWith('while')) {
                if (openBracesCount > closeBracesCount) {
                    return true;
                }
            }

            closeBracesCount += (resultLine.match(/\}/g) || []).length;
            openBracesCount += (resultLine.match(/\{/g) || []).length;

            if (closeBracesCount > openBracesCount) {
                return false;
            }

            if (resultLine.startsWith('function') || resultLine.startsWith('coroutine') || resultLine.startsWith('cutscene') || resultLine.startsWith('class') || resultLine.startsWith('component')) {
                return false;
            }
        }

        return false;
    }



    public static isInsideClass(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openBraces = 0;
        let closeBraces = 0;

        for (let i = position.line; i >= 0; i--) {
            const lineText = document.lineAt(i).text;

            closeBraces += (lineText.match(/\}/g) || []).length;
            openBraces += (lineText.match(/\{/g) || []).length;

            if (lineText.includes('class') && openBraces > closeBraces) {
                return true;
            }
        }
        return false;
    }

    public static isInsideComponent(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openBraces = 0;
        let closeBraces = 0;

        for (let i = position.line; i >= 0; i--) {
            const lineText = document.lineAt(i).text;

            closeBraces += (lineText.match(/\}/g) || []).length;
            openBraces += (lineText.match(/\{/g) || []).length;

            if (lineText.includes('component') && openBraces > closeBraces) {
                return true;
            }
        }
        return false;
    }

    public static isInsideExtension(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openBraces = 0;
        let closeBraces = 0;

        for (let i = position.line; i >= 0; i--) {
            const lineText = document.lineAt(i).text;

            closeBraces += (lineText.match(/\}/g) || []).length;
            openBraces += (lineText.match(/\{/g) || []).length;

            if (lineText.includes('extension') && openBraces > closeBraces) {
                return true;
            }
        }
        return false;
    }

    public static isInsideFunction(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openBraces = 0;
        let closeBraces = 0;

        for (let i = position.line; i >= 0; i--) {
            const lineText = document.lineAt(i).text;

            closeBraces += (lineText.match(/\}/g) || []).length;
            openBraces += (lineText.match(/\{/g) || []).length;

            if (lineText.includes('function') && openBraces > closeBraces) {
                return true;
            }
        }
        return false;
    }

    public static isInsideCoroutine(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openBraces = 0;
        let closeBraces = 0;

        for (let i = position.line; i >= 0; i--) {
            const lineText = document.lineAt(i).text;

            closeBraces += (lineText.match(/\}/g) || []).length;
            openBraces += (lineText.match(/\{/g) || []).length;

            if (lineText.includes('coroutine') && openBraces > closeBraces) {
                return true;
            }
        }
        return false;
    }

    public static isInsideCutscene(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openBraces = 0;
        let closeBraces = 0;

        for (let i = position.line; i >= 0; i--) {
            const lineText = document.lineAt(i).text;

            closeBraces += (lineText.match(/\}/g) || []).length;
            openBraces += (lineText.match(/\{/g) || []).length;

            if (lineText.includes('cutscene') && openBraces > closeBraces) {
                return true;
            }
        }
        return false;
    }

    public static isDeclaringFunction(document: vscode.TextDocument, position: vscode.Position): boolean {
        const line = document.lineAt(position).text;
        return line.match(/\bfunction\s+$/) !== null;
    }

    public static isInsideComment(document: vscode.TextDocument, position: vscode.Position): boolean {
        const lineNumber = position.line;
        const charIndex = position.character;

        const lineText = document.lineAt(lineNumber).text;
        const textBeforeCursor = lineText.substring(0, charIndex);

        const hashIndex = textBeforeCursor.indexOf('#');
        if (hashIndex !== -1) {
            const lineUpToHash = textBeforeCursor.substring(0, hashIndex);
            const doubleQuotes = (lineUpToHash.match(/"/g) || []).length;
            if (doubleQuotes % 2 === 0) {
                return true;
            }
        }

        const textUpToPosition = document.getText(new vscode.Range(new vscode.Position(0, 0), position));

        const textWithoutStrings = textUpToPosition.replace(/"(?:\\.|[^"\\])*"/g, '');

        const blockCommentStartRegex = /\/\*/g;
        const blockCommentEndRegex = /\*\//g;

        let blockCommentStarts = 0;
        let blockCommentEnds = 0;

        let match: RegExpExecArray | null;

        while ((match = blockCommentStartRegex.exec(textWithoutStrings)) !== null) {
            blockCommentStarts++;
        }

        while ((match = blockCommentEndRegex.exec(textWithoutStrings)) !== null) {
            blockCommentEnds++;
        }

        return blockCommentStarts > blockCommentEnds;
    }

    public static isInsideConditionDefinition(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openParensCount = 0;
        let closeParensCount = 0;
        let isInsideCondition = false;

        for (let i = position.line; i >= 0; i--) {
            const lineText = document.lineAt(i).text;

            if (lineText.includes('if') || lineText.includes('elif')) {
                isInsideCondition = true;
            }

            openParensCount += (lineText.match(/\(/g) || []).length;
            closeParensCount += (lineText.match(/\)/g) || []).length;

            if (isInsideCondition && openParensCount > closeParensCount) {
                return true;
            }

            if (lineText.includes('{') || lineText.includes('}')) {
                break;
            }
        }

        return false;
    }

    public static findCurrentClassName(document: vscode.TextDocument, position: vscode.Position): string | undefined {
        const text = document.getText();
        const lines = text.split(/\r?\n/);

        for (let lineIndex = position.line; lineIndex >= 0; lineIndex--) {
            const line = lines[lineIndex].trim();

            const classMatch = line.match(/^(class|component)\s+([A-Za-z_][A-Za-z0-9_]*)\s*(\{)?\s*$/);
            if (classMatch) {
                return classMatch[2];
            }
        }

        return undefined;
    }

    public static findContextStartLine(
        document: vscode.TextDocument,
        position: vscode.Position
    ): number | null {
        const text = document.getText();
        const lines = text.split(/\r?\n/);

        for (let lineIndex = position.line; lineIndex >= 0; lineIndex--) {
            const line = lines[lineIndex].trim();
            if (/^\s*(function|coroutine|cutscene)\s+\w+\s*\(.*?\)\s*$/.test(line)) {
                return lineIndex;
            }
        }

        return null;
    }

    public static splitCallChain(chain: string): string[] {
        const components: string[] = [];
        let currentComponent = '';
        let bracesDepth = 0;
        let inString = false;
        let stringChar: string | null = null;
        let escape = false;

        for (let i = 0; i < chain.length; i++) {
            const char = chain[i];

            if (inString) {
                currentComponent += char;
                if (escape) {
                    escape = false;
                } else if (char === '\\') {
                    escape = true;
                } else if (char === stringChar) {
                    inString = false;
                    stringChar = null;
                }
                continue;
            } else {
                if (char === '"' || char === "'" || char === '`') {
                    inString = true;
                    stringChar = char;
                    currentComponent += char;
                    continue;
                }
            }

            if (char === '(') {
                bracesDepth++;
            } else if (char === ')') {
                bracesDepth--;
            }

            if (char === '.' && bracesDepth === 0) {
                if (currentComponent.trim() !== '') {
                    components.push(currentComponent.trim());
                    currentComponent = '';
                }
            } else {
                currentComponent += char;
            }
        }

        if (currentComponent.trim() !== '') {
            components.push(currentComponent.trim());
        }

        return components;
    }

    public static parseCallChain(input: string): string {
        let methodChain = '';
        let bracesDepth = 0;
        let inString = false;
        let stringChar: string | null = null;
        let escape = false;

        let lastDot = input.lastIndexOf('.');
        if (lastDot === -1) {
            return '';
        }

        const afterDot = input.slice(lastDot + 1).trim();
        if (/\w/.test(afterDot)) {
            return '';
        }

        for (let i = lastDot - 1; i >= 0; i--) {
            const char = input[i];

            if (inString) {
                if (escape) {
                    escape = false;
                } else if (char === '\\') {
                    escape = true;
                } else if (char === stringChar) {
                    inString = false;
                    stringChar = null;
                }
                methodChain = char + methodChain;
                continue;
            } else {
                if (char === '"' || char === "'" || char === '`') {
                    inString = true;
                    stringChar = char;
                    methodChain = char + methodChain;
                    continue;
                }
            }

            if (char === ')') {
                bracesDepth++;
            } else if (char === '(') {
                bracesDepth--;
                if (bracesDepth < 0) {
                    break;
                }
            }

            if (char === '.' && bracesDepth === 0) {
            } else if (/\s/.test(char) && bracesDepth === 0) {
                break;
            }

            methodChain = char + methodChain;
        }

        if (!/^[A-Za-z_]\w*/.test(methodChain)) {
            return '';
        }

        if (!this.areParenthesesBalanced(methodChain)) {
            return '';
        }

        return methodChain;
    }

    public static areParenthesesBalanced(str: string): boolean {
        let balance = 0;
        let inString = false;
        let stringChar: string | null = null;
        let escape = false;

        for (let i = 0; i < str.length; i++) {
            const char = str[i];

            if (inString) {
                if (escape) {
                    escape = false;
                } else if (char === '\\') {
                    escape = true;
                } else if (char === stringChar) {
                    inString = false;
                    stringChar = null;
                }
                continue;
            } else {
                if (char === '"' || char === "'" || char === '`') {
                    inString = true;
                    stringChar = char;
                    continue;
                }
            }

            if (char === '(') {
                balance++;
            } else if (char === ')') {
                balance--;
                if (balance < 0) {
                    return false;
                }
            }
        }

        return balance === 0 && !inString;
    }
}
