import * as vscode from 'vscode';

export class CommentAwareTextProcessor {
    private document: vscode.TextDocument;
    private commentRanges: vscode.Range[] = [];
    private stringRanges: vscode.Range[] = [];

    constructor(document: vscode.TextDocument) {
        this.document = document;
        this.processDocument();
    }

    private processDocument(): void {
        const commentRanges: vscode.Range[] = [];
        const stringRanges: vscode.Range[] = [];

        let isInBlockComment = false;
        let isInString = false;
        let stringChar = '';

        let commentStartPosition: vscode.Position | null = null;
        let stringStartPosition: vscode.Position | null = null;

        for (let line = 0; line < this.document.lineCount; line++) {
            const lineText = this.document.lineAt(line).text;
            let i = 0;

            while (i < lineText.length) {
                const char = lineText[i];
                const position = new vscode.Position(line, i);

                if (isInString) {
                    const prevChar = i > 0 ? lineText[i - 1] : '';
                    if (char === stringChar && prevChar !== '\\') {
                        isInString = false;
                        if (stringStartPosition) {
                            stringRanges.push(new vscode.Range(stringStartPosition, position.translate(0, 1)));
                        }
                        stringStartPosition = null;
                    }
                    i++;
                } else if (isInBlockComment) {
                    if (char === '*' && i + 1 < lineText.length && lineText[i + 1] === '/') {
                        isInBlockComment = false;
                        if (commentStartPosition) {
                            const endPosition = position.translate(0, 2);
                            commentRanges.push(new vscode.Range(commentStartPosition, endPosition));
                        }
                        commentStartPosition = null;
                        i += 2;
                    } else {
                        i++;
                    }
                } else {
                    if (char === '#') {
                        const commentStart = position;
                        const commentEnd = new vscode.Position(line, lineText.length);
                        commentRanges.push(new vscode.Range(commentStart, commentEnd));
                        break;
                    } else if (char === '/' && i + 1 < lineText.length && lineText[i + 1] === '*') {
                        isInBlockComment = true;
                        commentStartPosition = position;
                        i += 2;
                    } else if (char === '"' || char === "'") {
                        isInString = true;
                        stringChar = char;
                        stringStartPosition = position;
                        i++;
                    } else {
                        i++;
                    }
                }
            }

            if (isInBlockComment && commentStartPosition && line === this.document.lineCount - 1) {
                const endPosition = new vscode.Position(line, lineText.length);
                commentRanges.push(new vscode.Range(commentStartPosition, endPosition));
            }
        }

        this.commentRanges = commentRanges;
        this.stringRanges = stringRanges;
    }

    public isInComment(position: vscode.Position): boolean {
        return this.isPositionInRanges(position, this.commentRanges);
    }

    public isInString(position: vscode.Position): boolean {
        return this.isPositionInRanges(position, this.stringRanges);
    }

    public removeCommentsFromRange(line: string, range: vscode.Range): string {
        let resultLine = line;
        let currentOffset = 0;

        for (const commentRange of this.commentRanges) {
            if (commentRange.end.isBefore(range.start) || commentRange.start.isAfter(range.end)) {
                continue;
            }

            const commentStart = Math.max(commentRange.start.line === range.start.line ? commentRange.start.character : 0, range.start.character);
            const commentEnd = Math.min(commentRange.end.line === range.end.line ? commentRange.end.character : line.length, range.end.character);

            const lLine = resultLine.slice(0, commentStart - currentOffset);
            const rLine = resultLine.slice(commentEnd - currentOffset);

            resultLine = lLine + rLine;

            currentOffset += (commentEnd - commentStart);
        }

        return resultLine;
    }

    private isPositionInRanges(position: vscode.Position, ranges: vscode.Range[]): boolean {
        for (const range of ranges) {
            if (range.contains(position)) {
                return true;
            }
        }
        return false;
    }
}
