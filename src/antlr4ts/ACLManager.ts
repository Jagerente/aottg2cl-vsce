import * as vscode from 'vscode';
import { IChainNode, IClass, IConditionNode, ILoopNode } from "../classes/IClass";
import { ACLLexer } from './ACLLexer';
import { ACLParser } from './ACLParser';
import { LexerErrorListener, ParserErrorListener } from './ACLErrorListener';
import { IError as IError } from '../classes/IClass';
import { CharStreams, CommonTokenStream, Token } from 'antlr4ts';
import { ClassesParserVisitor } from './ClassesParserVisitor';

export class ACLManager {
    private classes: IClass[] = [];
    private chains: IChainNode[][] = [];
    private loopNodes: ILoopNode[] = [];
    private conditionNodes: IConditionNode[] = [];
    private errors: IError[] = [];

    private lexerErrorListener = new LexerErrorListener();
    private parserErrorListener = new ParserErrorListener();

    public refetch(document: vscode.TextDocument): void {
        this.flush();

        const input = document.getText();
        const inputStream = CharStreams.fromString(input);
        const lexer = new ACLLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new ACLParser(tokenStream);

        lexer.removeErrorListeners();
        parser.removeErrorListeners();

        lexer.addErrorListener(this.lexerErrorListener);
        parser.addErrorListener(this.parserErrorListener);

        const visitor = new ClassesParserVisitor();
        try {
            visitor.visit(parser.program());
        } catch (e) {
            console.log(e);
        }

        this.classes = visitor.getParsedClasses();
        this.chains = visitor.getParsedChains();
        this.loopNodes = visitor.getParsedLoopNodes();
        this.conditionNodes = visitor.getParsedConditionNodes();
        this.errors = this.lexerErrorListener.errors.concat(this.parserErrorListener.errors);
    }

    public flush(): void {
        this.classes = [];
        this.chains = [];
        this.loopNodes = [];
        this.conditionNodes = [];
        this.errors = [];
        this.lexerErrorListener.flush();
        this.parserErrorListener.flush();
    }

    public getClasses(): IClass[] {
        return this.classes;
    }

    public getChains(): IChainNode[][] {
        return this.chains;
    }

    public getLoopNodes(): ILoopNode[] {
        return this.loopNodes;
    }

    public getConditionNodes(): IConditionNode[] {
        return this.conditionNodes;
    }

    public getErrors(): IError[] {
        return this.errors;
    }

    public getDiagnostics(): vscode.Diagnostic[] {
        return this.errors.map(error => ACLManager.createDiagnostic(error));
    }

    private static createDiagnostic(error: IError): vscode.Diagnostic {
        const startLine = error.line - 1;
        const startCharacter = error.charPositionInLine;
        const endLine = startLine;
        let endCharacter = startCharacter + 1;
        if (error.offendingSymbol) {
            endCharacter = startCharacter + error.offendingSymbol.length;
        }

        const range = new vscode.Range(startLine, startCharacter, endLine, endCharacter);

        const diagnostic = new vscode.Diagnostic(
            range,
            error.msg,
            vscode.DiagnosticSeverity.Error
        );

        diagnostic.source = 'ANTLR Parser';

        return diagnostic;
    }
}