import * as vscode from 'vscode';
import { IClass } from "../classes/IClass";
import { CharStream, CommonTokenStream } from 'antlr4ng';
import { ACLLexer } from './ACLLexer';
import { ACLParser } from './ACLParser';
import { ClassesParserVisitor } from './ClassesParserVisitor';
import { ACLErrorListener, ANTLRError as ANTLRError } from './ACLErrorListener';

export class ACLManager {
    private classes: IClass[] = [];
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

        this.classes = visitor.getParsedClasses()
        this.errors = this.lexerErrorListener.errors.concat(this.parserErrorListener.errors);
    }

    public flush(): void {
        this.classes = [];
        this.errors = [];
        this.lexerErrorListener.flush();
        this.parserErrorListener.flush();
    }

    public getClasses(): IClass[] {
        return this.classes;
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