import * as vscode from 'vscode';
import {
    ACLParser,
    MethodCallContext,
    BlockContext,
    ClassDeclContext,
    ClassBodyContext,
    MethodDeclContext,
    VariableDeclContext,
    AnnotationContext,
    ForLoopContext,
    WhileLoopContext,
    IfStatementContext,
    ElifStatementContext,
    ElseStatementContext,
    StatementContext,
    ProgramContext
} from '../antlr4ts/ACLParser';
import { ACLLexer } from '../antlr4ts/ACLLexer';
import { CharStreams, CommonTokenStream, Token } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { ACLListener } from '../antlr4ts/ACLListener';
import { Settings } from '../config/settings';

// DEBUG: Remove this when it's finished
class IndentationTracker {
    private indentMap = new Map<number, number>();
    private history = new Map<number, Array<{ value: number, caller: string }>>();

    set(line: number, level: number) {
        const stack = new Error().stack;
        const caller = stack ? stack.split('\n')[2] : 'unknown';

        if (!this.history.has(line)) {
            this.history.set(line, []);
        }
        this.history.get(line)!.push({ value: level, caller });

        this.indentMap.set(line, level);

        console.log(`Line ${line} indent set to ${level} by ${caller}`);
    }

    get(line: number): number | undefined {
        return this.indentMap.get(line);
    }

    has(line: number): boolean {
        return this.indentMap.has(line);
    }

    getHistory(line: number): Array<{ value: number, caller: string }> {
        return this.history.get(line) || [];
    }
}

class IndentationListener implements ACLListener {
    public indentLevels = new IndentationTracker();
    private currentLevel = 0;
    private braceStack: number[] = [];
    private inClassBody = false;
    private ifLevels = new Map<number, number>();

    constructor(private tokens: CommonTokenStream, private document: vscode.TextDocument) {
        const allTokens = tokens.getTokens();
        for (const token of allTokens) {
            if (token.channel === Token.HIDDEN_CHANNEL &&
                (token.type === ACLLexer.LINE_COMMENT || token.type === ACLLexer.BLOCK_COMMENT)) {
                const line = token.line;
                const lineText = document.lineAt(line - 1).text;

                let spaceCount = 0;
                for (let i = 0; i < lineText.length && (lineText[i] === ' ' || lineText[i] === '\t'); i++) {
                    if (lineText[i] === '\t') {
                        spaceCount += Settings.tabSize;
                    } else {
                        spaceCount++;
                    }
                }

                const indentLevel = ACLFormatter.convertSpacesToIndentationLevel(spaceCount);

                if (indentLevel > 0) {
                    this.indentLevels.set(line, indentLevel);
                }
            }
        }
    }

    enterProgram = (ctx: ProgramContext) => {
        this.currentLevel = 0;
        this.braceStack = [];
        this.ifLevels.clear();
        this.inClassBody = false;
    };

    exitProgram = (ctx: ProgramContext) => {
        this.currentLevel = 0;
        this.braceStack = [];
        this.ifLevels.clear();
        this.inClassBody = false;
    };

    enterClassDecl = (ctx: ClassDeclContext) => {
        this.currentLevel = 0;
        this.braceStack = [];
        this.inClassBody = false;

        const classKeywordLine = (
            ctx.CLASS()?.symbol.line ||
            ctx.COMPONENT()?.symbol.line ||
            ctx.EXTENSION()?.symbol.line ||
            ctx.CUTSCENE()?.symbol.line
        );
        const classNameLine = ctx.ID()?.symbol.line;

        if (this.braceStack.length === 0) {
            if (classKeywordLine) {
                this.indentLevels.set(classKeywordLine, 0);
            }
            if (classNameLine) {
                this.indentLevels.set(classNameLine, 0);
            }

            const openBraceLine = ctx.LBRACE()?.symbol.line;
            if (openBraceLine) {
                this.indentLevels.set(openBraceLine, 0);
                this.braceStack.push(0);
                this.currentLevel = 1;
            }
        } else {
            const line = ctx?.start?.line || 0;
            this.indentLevels.set(line, this.currentLevel);
            const openBraceLine = ctx.start?.line;
            if (openBraceLine) {
                this.indentLevels.set(openBraceLine, this.currentLevel);
                this.braceStack.push(this.currentLevel);
                this.currentLevel++;
            }
        }
    };

    exitClassDecl = (ctx: ClassDeclContext) => {
        if (this.braceStack.length > 0) {
            const prevLevel = this.braceStack.pop()!;
            this.currentLevel = prevLevel;
            const closeBraceLine = ctx.stop?.line;
            if (closeBraceLine) {
                this.indentLevels.set(closeBraceLine, prevLevel);
            }
        }

        this.currentLevel = 0;
        this.inClassBody = false;
    };

    enterClassBody = (ctx: ClassBodyContext) => {
        this.inClassBody = true;
        this.currentLevel = 1;
    };

    exitClassBody = (ctx: ClassBodyContext) => {
        this.inClassBody = false;
        this.currentLevel = this.braceStack.length > 0 ? this.braceStack[this.braceStack.length - 1] : 0;
    };

    enterBlock = (ctx: BlockContext) => {
        const openBrace = ctx.LBRACE();
        const closeBrace = ctx.RBRACE();

        if (!openBrace || !closeBrace) { return; }

        const openBraceLine = openBrace.symbol.line;
        const closeBraceLine = closeBrace.symbol.line;

        const parent = ctx.parent;
        let braceLevel = this.currentLevel;

        if (parent instanceof MethodDeclContext) {
            braceLevel = 1;
            this.currentLevel = 2;
        } else {
            this.indentLevels.set(openBraceLine, this.currentLevel);
            this.indentLevels.set(closeBraceLine, this.currentLevel);
            this.braceStack.push(this.currentLevel);
            this.currentLevel++;
        }
    };

    exitBlock = (ctx: BlockContext) => {
        if (this.braceStack.length > 0) {
            this.currentLevel = this.braceStack.pop()!;
        }
    };

    enterVariableDecl = (ctx: VariableDeclContext) => {
        const line = ctx?.start?.line || 0;

        let parent = ctx.parent;
        let foundContext = false;
        let indentLevel = this.currentLevel;

        while (parent) {
            if (parent instanceof ClassBodyContext) {
                indentLevel = 1;
                foundContext = true;
                break;
            } else if (parent instanceof BlockContext) {
                indentLevel = this.currentLevel;
                foundContext = true;
                break;
            }
            parent = parent.parent;
        }

        if (!foundContext) {
            indentLevel = this.currentLevel;
        }

        this.indentLevels.set(line, indentLevel);

        const annotations = ctx.annotation();
        if (annotations) {
            for (const annotation of annotations) {
                const annotationLine = annotation?.start?.line || 0;
                this.indentLevels.set(annotationLine, indentLevel);
            }
        }

        const variableIdentifier = ctx.ID();
        const variableLine = variableIdentifier?.symbol.line;
        if (variableLine && variableLine !== line) {
            this.indentLevels.set(variableLine, indentLevel);
        }
    };

    enterMethodDecl = (ctx: MethodDeclContext) => {
        const startLine = ctx?.start?.line || 0;

        const functionKeywordLine = ctx.FUNCTION()?.symbol.line || ctx.COROUTINE()?.symbol.line;

        this.indentLevels.set(startLine, 1);
        if (functionKeywordLine && functionKeywordLine !== startLine) {
            this.indentLevels.set(functionKeywordLine, 1);
        }

        const annotations = ctx.annotation();
        if (annotations) {
            for (const annotation of annotations) {
                const annotationLine = annotation?.start?.line || 0;
                this.indentLevels.set(annotationLine, 1);
            }
        }

        const lparen = ctx.LPAREN();
        const rparen = ctx.RPAREN();

        if (lparen && rparen) {
            const openParenLine = lparen.symbol.line;
            const closeParenLine = rparen.symbol.line;

            if (openParenLine !== closeParenLine) {
                this.indentLevels.set(closeParenLine, 1);

                const paramList = ctx.paramList();
                if (paramList) {
                    const params = paramList.param();
                    for (const param of params) {
                        const paramLine = param?.start?.line || 0;
                        if (paramLine > openParenLine && paramLine < closeParenLine) {
                            this.indentLevels.set(paramLine, 2);
                        }
                    }
                }
            }
        }

        const block = ctx.block();
        if (block) {
            const openBrace = block.LBRACE();
            const closeBrace = block.RBRACE();
            if (openBrace && closeBrace) {
                const openBraceLine = openBrace.symbol.line;
                const closeBraceLine = closeBrace.symbol.line;

                this.indentLevels.set(openBraceLine, 1);
                this.indentLevels.set(closeBraceLine, 1);

                this.braceStack.push(1);
                this.currentLevel = 2;
            }
        }
    };

    exitMethodDecl = (ctx: MethodDeclContext) => {
        if (this.braceStack.length > 0) {
            this.currentLevel = this.braceStack.pop()!;
        }
    };

    enterAnnotation = (ctx: AnnotationContext) => {
        const line = ctx?.start?.line || 0;

        let parent = ctx.parent;
        let foundContext = false;

        while (parent) {
            if (parent instanceof ProgramContext) {
                // Program-level annotations should have no indentation
                this.indentLevels.set(line, 0);
                foundContext = true;
                break;
            } else if (parent instanceof BlockContext) {
                // Annotations in method blocks should use current level
                this.indentLevels.set(line, this.currentLevel);
                foundContext = true;
                break;
            } else if (parent instanceof ClassBodyContext) {
                // Annotations in class body should be at level 1
                this.indentLevels.set(line, 1);
                foundContext = true;
                break;
            } else if (parent instanceof MethodDeclContext) {
                // Annotations for methods should be at the same level as the method
                this.indentLevels.set(line, 1);
                foundContext = true;
                break;
            } else if (parent instanceof VariableDeclContext) {
                // For variable declarations, we'll let enterVariableDecl handle it
                foundContext = true;
                break;
            }
            parent = parent.parent;
        }

        if (!foundContext) {
            this.indentLevels.set(line, this.currentLevel);
        }
    };

    enterForLoop = (ctx: ForLoopContext) => {
        const line = ctx?.start?.line || 0;
        this.indentLevels.set(line, this.currentLevel);

        const lparen = ctx.LPAREN();
        const rparen = ctx.RPAREN();

        if (lparen && rparen) {
            const openParenLine = lparen.symbol.line;
            const closeParenLine = rparen.symbol.line;

            if (openParenLine !== closeParenLine) {
                this.indentLevels.set(closeParenLine, this.currentLevel);

                this.setIndentationForLinesInRange(openParenLine, closeParenLine, this.currentLevel + 1);
            }
        }
    };

    enterWhileLoop = (ctx: WhileLoopContext) => {
        const line = ctx?.start?.line || 0;
        this.indentLevels.set(line, this.currentLevel);

        const lparen = ctx.LPAREN();
        const rparen = ctx.RPAREN();

        if (lparen && rparen) {
            const openParenLine = lparen.symbol.line;
            const closeParenLine = rparen.symbol.line;

            if (openParenLine !== closeParenLine) {
                this.indentLevels.set(closeParenLine, this.currentLevel);

                this.setIndentationForLinesInRange(openParenLine, closeParenLine, this.currentLevel + 1);
            }
        }
    };

    enterIfStatement = (ctx: IfStatementContext) => {
        const line = ctx?.start?.line || 0;
        this.indentLevels.set(line, this.currentLevel);
        this.ifLevels.set(line, this.currentLevel);

        const lparen = ctx.LPAREN();
        const rparen = ctx.RPAREN();

        if (lparen && rparen) {
            const openParenLine = lparen.symbol.line;
            const closeParenLine = rparen.symbol.line;

            if (openParenLine !== closeParenLine) {
                this.indentLevels.set(closeParenLine, this.currentLevel);

                this.setIndentationForLinesInRange(openParenLine, closeParenLine, this.currentLevel + 1);
            }
        }
    };

    exitIfStatement = (ctx: IfStatementContext) => {
        const line = ctx?.start?.line || 0;
        this.ifLevels.delete(line);
    };

    enterElifStatement = (ctx: ElifStatementContext) => {
        const line = ctx?.start?.line || 0;
        this.indentLevels.set(line, this.currentLevel);

        const lparen = ctx.LPAREN();
        const rparen = ctx.RPAREN();

        if (lparen && rparen) {
            const openParenLine = lparen.symbol.line;
            const closeParenLine = rparen.symbol.line;

            if (openParenLine !== closeParenLine) {
                this.indentLevels.set(closeParenLine, this.currentLevel);

                this.setIndentationForLinesInRange(openParenLine, closeParenLine, this.currentLevel + 1);
            }
        }
    };

    private setIndentationForLinesInRange(startLine: number, endLine: number, indentLevel: number) {
        const allTokens = this.tokens.getTokens();
        const tokensInRange = allTokens.filter(token =>
            token.line > startLine &&
            token.line < endLine &&
            token.channel === Token.DEFAULT_CHANNEL
        );

        const lineSet = new Set<number>();
        for (const token of tokensInRange) {
            lineSet.add(token.line);
        }

        for (const lineNumber of lineSet) {
            this.indentLevels.set(lineNumber, indentLevel);
        }
    }

    enterElseStatement = (ctx: ElseStatementContext) => {
        const line = ctx?.start?.line || 0;
        const parentCtx = ctx.parent;
        if (parentCtx instanceof IfStatementContext) {
            const ifLine = parentCtx?.start?.line || 0;
            const ifLevel = this.ifLevels.get(ifLine);
            if (ifLevel !== undefined) {
                this.indentLevels.set(line, ifLevel);
            }
        }
    };

    exitElseStatement = (ctx: ElseStatementContext) => {
        const parentCtx = ctx.parent;
        if (parentCtx instanceof IfStatementContext) {
            const ifLine = parentCtx?.start?.line || 0;
            this.ifLevels.delete(ifLine);
        }
    };

    enterStatement = (ctx: StatementContext) => {
        if (!(ctx.getChild(0) instanceof IfStatementContext)) {
            const line = ctx?.start?.line || 0;
            this.indentLevels.set(line, this.currentLevel);
        }
    };

    enterMethodCall = (ctx: MethodCallContext) => {
        const methodLine = ctx?.start?.line || 0;
        const methodIndent = this.currentLevel;

        if (!this.indentLevels.has(methodLine)) {
            this.indentLevels.set(methodLine, methodIndent);
        }

        const lparen = ctx.LPAREN();
        const rparen = ctx.RPAREN();

        if (!lparen || !rparen) { return; }

        const openParenLine = lparen.symbol.line;
        const closeParenLine = rparen.symbol.line;

        if (openParenLine !== closeParenLine) {
            this.indentLevels.set(closeParenLine, methodIndent);

            const argList = ctx.argumentList();
            if (argList) {
                const expressions = argList.expression();
                for (const expr of expressions) {
                    const line = expr?.start?.line || 0;
                    if (line > openParenLine && line < closeParenLine) {
                        this.indentLevels.set(line, methodIndent + 1);
                    }
                }
            }
        }
    };

    exitVariableDecl = () => { };
    exitStatement = () => { };
    exitWhileLoop = () => { };
    exitForLoop = () => { };
    enterReturnStatement = () => { };
    exitReturnStatement = () => { };
    enterWaitStatement = () => { };
    exitWaitStatement = () => { };
    enterExpression = () => { };
    exitExpression = () => { };
    enterAssignmentExpression = () => { };
    exitAssignmentExpression = () => { };
    enterLogicalOrExpression = () => { };
    exitLogicalOrExpression = () => { };
    enterLogicalAndExpression = () => { };
    exitLogicalAndExpression = () => { };
    enterEqualityExpression = () => { };
    exitEqualityExpression = () => { };
    enterRelationalExpression = () => { };
    exitRelationalExpression = () => { };
    enterAdditiveExpression = () => { };
    exitAdditiveExpression = () => { };
    enterMultiplicativeExpression = () => { };
    exitMultiplicativeExpression = () => { };
    enterUnaryExpression = () => { };
    exitUnaryExpression = () => { };
    enterPostfixExpression = () => { };
    exitPostfixExpression = () => { };
    enterPostfixOperator = () => { };
    exitPostfixOperator = () => { };
    enterPrimaryExpression = () => { };
    exitPrimaryExpression = () => { };
    enterArgumentList = () => { };
    exitArgumentList = () => { };
    exitAnnotation = () => { };
}

export class ACLFormatter implements vscode.DocumentFormattingEditProvider {
    public static getIndentString(level: number): string {
        if (!Settings.insertSpaces) {
            return '\t'.repeat(level);
        } else {
            return ' '.repeat(level * Settings.tabSize);
        }
    }

    public static convertSpacesToIndentationLevel(spaces: number): number {
        return Math.round(spaces / Settings.tabSize);
    }

    public provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): vscode.TextEdit[] {
        if (!Settings.enableFormatter) {
            return [];
        }

        const edits: vscode.TextEdit[] = [];
        const fullRange = new vscode.Range(
            0,
            0,
            document.lineCount - 1,
            document.lineAt(document.lineCount - 1).text.length
        );

        const text = document.getText();
        const documentLines = text.split(/\r?\n/);

        try {
            const inputStream = CharStreams.fromString(text);
            const lexer = new ACLLexer(inputStream);
            const tokenStream = new CommonTokenStream(lexer);
            const parser = new ACLParser(tokenStream);
            const tree = parser.program();

            const listener = new IndentationListener(tokenStream, document);
            ParseTreeWalker.DEFAULT.walk(listener as ACLListener, tree);

            const formattedLines = documentLines.map((line, index) => {
                line = line.trimEnd();

                if (line.trim().length === 0) {
                    return '';
                }

                const lineNumber = index + 1; // ANTLR uses 1-based line numbers
                const level = listener.indentLevels.get(lineNumber) || 0;

                return ACLFormatter.getIndentString(level) + line.trim();
            });

            // Remove multiple consecutive empty lines
            const cleanedLines: string[] = [];
            let lastLineWasEmpty = false;

            for (const line of formattedLines) {
                const isEmptyLine = line.trim().length === 0;

                if (isEmptyLine && lastLineWasEmpty) {
                    continue;
                }

                cleanedLines.push(line);
                lastLineWasEmpty = isEmptyLine;
            }

            // Ensure file ends with exactly one empty line
            if (cleanedLines[cleanedLines.length - 1] !== '') {
                cleanedLines.push('');
            }

            const formattedText = cleanedLines.join('\n');

            edits.push(vscode.TextEdit.replace(fullRange, formattedText));
        } catch (error) {
            console.error('ACL parsing failed, falling back to basic formatting:', error);

            const cleanedLines = documentLines.filter((line: string, index: number, array: string[]) => {
                const isEmptyLine = line.trim().length === 0;
                const prevIsEmptyLine = index > 0 && array[index - 1].trim().length === 0;
                return !(isEmptyLine && prevIsEmptyLine);
            });

            if (cleanedLines[cleanedLines.length - 1]?.trim() !== '') {
                cleanedLines.push('');
            }

            const formattedText = cleanedLines.join('\n');
            edits.push(vscode.TextEdit.replace(fullRange, formattedText));
        }

        return edits;
    }
} 
