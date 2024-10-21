import * as vscode from 'vscode';
import { StringAwareParser as StringAwareParser } from './StringAwareParser';
import { CommentAwareTextProcessor } from '../diagnostic/CommentAwareTextProcessor';

/**
 * Matches any class definition (class, component, extension, cutscene).
 * 
 * @example
 * 'class MyClass' -> ['class MyClass', 'class', 'MyClass']
 * 'component MyComponent' -> ['component MyComponent', 'component', 'MyComponent']
 * 
 * @returns
 *  - [0]: the full match (e.g., 'class MyClass')
 *  - [1]: the type of class (e.g., 'class', 'component', 'extension', or 'cutscene')
 *  - [2]: the name of the class (e.g., 'MyClass', 'MyComponent')
 */
export const REGEX_ANY_CLASS = /\b(class|component|extension|cutscene)\s+(\w+)/;

/**
 * Matches class definitions.
 * 
 * @example
 * 'class MyClass' -> ['class MyClass', 'MyClass']
 * 
 * @returns
 *  - [0]: the full match (e.g., 'class MyClass')
 *  - [1]: the name of the class (e.g., 'MyClass')
 */
export const REGEX_CLASS = /\bclass\s+(\w+)/;

/**
 * Matches component definitions.
 * 
 * @example
 * 'component MyComponent' -> ['component MyComponent', 'MyComponent']
 * 
 * @returns
 *  - [0]: the full match (e.g., 'component MyComponent')
 *  - [1]: the name of the component (e.g., 'MyComponent')
 */
export const REGEX_COMPONENT = /\bcomponent\s+(\w+)/;

/**
 * Matches extension definitions.
 * 
 * @example
 * 'extension MyExtension' -> ['extension MyExtension', 'MyExtension']
 * 
 * @returns
 *  - [0]: the full match (e.g., 'extension MyExtension')
 *  - [1]: the name of the extension (e.g., 'MyExtension')
 */
export const REGEX_EXTENSION = /\bextension\s+(\w+)/;

/**
 * Matches cutscene definitions.
 * 
 * @example
 * 'cutscene MyCutscene' -> ['cutscene MyCutscene', 'MyCutscene']
 * 
 * @returns
 *  - [0]: the full match (e.g., 'cutscene MyCutscene')
 *  - [1]: the name of the cutscene (e.g., 'MyCutscene')
 */
export const REGEX_CUTSCENE = /\bcutscene\s+(\w+)/;


export class CodeContextUtils {
    public static canSuggestElse(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openBracesCount = 0;
        let closeBracesCount = 0;
        let hasIf = false;
        let hasElse = false;

        for (let i = position.line - 1; i >= 0; i--) {
            const lineText = document.lineAt(i).text.trim();

            if (lineText === '' || lineText === '{' || lineText === '}') {
                continue;
            }

            if (lineText.startsWith('if ') || lineText.startsWith('elif ')) {
                hasIf = true;
                if (openBracesCount === closeBracesCount) {
                    return true;
                }
            }

            if (lineText.startsWith('else ')) {
                hasElse = true;
                if (openBracesCount === closeBracesCount) {
                    return false;
                }
            }

            closeBracesCount += (lineText.match(/\}/g) || []).length;
            openBracesCount += (lineText.match(/\{/g) || []).length;

            if (lineText.startsWith('for ')
                || lineText.startsWith('while ')
                || lineText.startsWith('function ')
                || lineText.startsWith('coroutine ')
                || lineText.startsWith('cutscene ')
                || lineText.startsWith('class ')
                || lineText.startsWith('component ')
                || lineText.startsWith('extensions ')) {
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
            resultLine = stringAwareParser.parseLine(resultLine);
            resultLine = resultLine.trim();

            if (resultLine.startsWith('for ') || resultLine.startsWith('while ')) {
                if (openBracesCount > closeBracesCount) {
                    return true;
                }
            }

            closeBracesCount += (resultLine.match(/\}/g) || []).length;
            openBracesCount += (resultLine.match(/\{/g) || []).length;

            if (closeBracesCount > openBracesCount) {
                return false;
            }

            if (resultLine.startsWith('function ')
                || resultLine.startsWith('coroutine ')
                || resultLine.startsWith('cutscene ')
                || resultLine.startsWith('class ')
                || resultLine.startsWith('component ')
                || resultLine.startsWith('extensions ')
                || resultLine.startsWith('cutscene ')
            ) {
                return false;
            }
        }

        return false;
    }



    public static isInsideClass(document: vscode.TextDocument, position: vscode.Position): boolean {
        return CodeContextUtils.isInside(document, position, 'class');
    }

    public static isInsideComponent(document: vscode.TextDocument, position: vscode.Position): boolean {
        return CodeContextUtils.isInside(document, position, 'component');
    }

    public static isInsideExtension(document: vscode.TextDocument, position: vscode.Position): boolean {
        return CodeContextUtils.isInside(document, position, 'extension');
    }

    public static isInsideCutscene(document: vscode.TextDocument, position: vscode.Position): boolean {
        return CodeContextUtils.isInside(document, position, 'cutscene');
    }

    public static isInsideFunction(document: vscode.TextDocument, position: vscode.Position): boolean {
        return CodeContextUtils.isInside(document, position, 'function');
    }

    public static isInsideCoroutine(document: vscode.TextDocument, position: vscode.Position): boolean {
        return CodeContextUtils.isInside(document, position, 'coroutine');
    }

    public static isDeclaringFunction(document: vscode.TextDocument, position: vscode.Position): boolean {
        const line = document.lineAt(position).text;
        return line.trim().startsWith('function');
    }

    public static isDeclaringCoroutine(document: vscode.TextDocument, position: vscode.Position): boolean {
        const line = document.lineAt(position).text;
        return line.trim().startsWith('coroutine');
    }

    private static isInside(document: vscode.TextDocument, position: vscode.Position, keyword: string): boolean {
        let openBraces = 0;
        let closeBraces = 0;

        for (let i = position.line; i >= 0; i--) {
            const lineText = document.lineAt(i).text;

            closeBraces += (lineText.match(/\}/g) || []).length;
            openBraces += (lineText.match(/\{/g) || []).length;

            if (lineText.includes(keyword) && openBraces > closeBraces) {
                return true;
            }
        }
        return false;
    }

    public static isInsideConditionDefinition(document: vscode.TextDocument, position: vscode.Position): boolean {
        let openParensCount = 0;
        let closeParensCount = 0;
        let isInsideCondition = false;

        for (let i = position.line; i >= 0; i--) {
            const lineText = document.lineAt(i).text;

            if (lineText.includes('if ') || lineText.includes('elif ')) {
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

            const classMatch = line.match(REGEX_ANY_CLASS);
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
            if (/^\s*(function|coroutine)\s+\w+\s*\(.*?\)\s*(\{)?\s*$/.test(line)) {
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

        for (let i = input.length - 1; i >= 0; i--) {
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
            } else if ((/\s/.test(char) || char === '!') && bracesDepth === 0) {
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
