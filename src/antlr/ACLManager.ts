import * as vscode from 'vscode';
import { IClass } from "../classes/IClass";
import { CharStream, CommonTokenStream } from 'antlr4ng';
import { ACLLexer } from './ACLLexer';
import { ACLParser } from './ACLParser';
import { ClassesParserVisitor, IChainNode, IConditionNode, ILoopNode } from './ClassesParserVisitor';
import { ACLErrorListener, ANTLRError as ANTLRError } from './ACLErrorListener';

export class ACLManager {
    private classes: Map<string, IClass> = new Map();
    private chains: IChainNode[][] = [];
    private loopNodes: ILoopNode[] = [];
    private conditionNodes: IConditionNode[] = [];
    private errors: ANTLRError[] = [];

    private lexerErrorListener = new ACLErrorListener();
    private parserErrorListener = new ACLErrorListener();

    public refetch(document: vscode.TextDocument): void {
        this.flush();

        const input = document.getText();
        const inputStream = CharStream.fromString(input);
        const lexer = new ACLLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new ACLParser(tokenStream);

        lexer.removeErrorListeners();
        parser.removeErrorListeners();


        lexer.addErrorListener(this.lexerErrorListener);
        parser.addErrorListener(this.parserErrorListener);

        const visitor = new ClassesParserVisitor();
        visitor.visit(parser.program());

        this.classes = visitor.getParsedClasses();
        this.chains = visitor.getParsedChains();
        this.loopNodes = visitor.getParsedLoopNodes();
        this.conditionNodes = visitor.getParsedConditionNodes();
        this.errors = this.lexerErrorListener.errors.concat(this.parserErrorListener.errors);
    }

    public flush(): void {
        this.classes = new Map();
        this.chains = [];
        this.loopNodes = [];
        this.conditionNodes = [];
        this.errors = [];
        this.lexerErrorListener.flush();
        this.parserErrorListener.flush();
    }

    public getClasses(): Map<string, IClass> {
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

    public getErrors(): ANTLRError[] {
        return this.errors;
    }

    public getDiagnostics(): vscode.Diagnostic[] {
        return this.errors.map(error => ACLManager.createDiagnostic(error));
    }

    private static createDiagnostic(error: ANTLRError): vscode.Diagnostic {
        const startLine = error.line - 1;
        const startCharacter = error.charPositionInLine;
        const endLine = startLine;
        const endCharacter = startCharacter + 1;

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