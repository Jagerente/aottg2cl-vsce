import * as vscode from 'vscode';

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

            if (lineText.startsWith('for') || lineText.startsWith('while') || lineText.startsWith('function')) {
                return false;
            }
        }

        return hasIf && !hasElse;
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
}
