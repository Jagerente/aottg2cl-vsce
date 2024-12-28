import * as vscode from 'vscode';
import { IChainNode, IClass, IConditionNode, ILoopNode } from "../classes/IClass";
import { ACLLexer } from './ACLLexer';
import { ACLParser } from './ACLParser';
import { LexerErrorListener, ParserErrorListener } from './ACLErrorListener';
import { IError as IError } from '../classes/IClass';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ClassesParserVisitor } from './ClassesParserVisitor';
import * as fs from 'fs/promises';
import { buildImportChain } from '../utils/DependencyChain';
import { SemanticTokensListener } from './SemanticTokensListener';
import { ISemanticToken } from './ISemanticToken';
import { ParseTreeWalker } from 'antlr4ts/tree';

export class ACLManager {
    private classes: IClass[] = [];
    private importedClasses: Map<string, IClass> = new Map();
    private chains: IChainNode[][] = [];
    private loopNodes: ILoopNode[] = [];
    private conditionNodes: IConditionNode[] = [];
    private errors: IError[] = [];
    private semanticTokens: ISemanticToken[] = [];

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

            parser.reset();
            const semanticTokensListener = new SemanticTokensListener(visitor.getParsedClasses());
            ParseTreeWalker.DEFAULT.walk(semanticTokensListener, parser.program());
            this.semanticTokens = semanticTokensListener.semanticTokens;
        } catch (e) {
            console.log(e);
        }

        this.classes = visitor.getParsedClasses().map(cls => {
            cls.sourceUri = document.uri;
            cls.staticFields = cls.staticFields.map(f => {
                f.sourceUri = document.uri;
                return f;
            });
            cls.instanceFields = cls.instanceFields.map(f => {
                f.sourceUri = document.uri;
                return f;
            });
            cls.staticMethods = cls.staticMethods.map(m => {
                m.sourceUri = document.uri;
                return m;
            });
            cls.instanceMethods = cls.instanceMethods.map(m => {
                m.sourceUri = document.uri;
                return m;
            });
            cls.constructors = cls.constructors?.map(c => {
                c.sourceUri = document.uri;
                return c;
            });
            return cls;
        });
        this.chains = visitor.getParsedChains();
        this.loopNodes = visitor.getParsedLoopNodes();
        this.conditionNodes = visitor.getParsedConditionNodes();
        this.errors = this.lexerErrorListener.errors.concat(this.parserErrorListener.errors);
    }

    public async refetchWithImports(document: vscode.TextDocument): Promise<void> {
        this.refetch(document);
        try {
            const importedFilePaths = await buildImportChain(document.uri);
            for (const filePath of importedFilePaths) {
                try {
                    const content = await fs.readFile(filePath, 'utf-8');
                    const importedClasses = this.parseContent(content, vscode.Uri.file(filePath));
                    for (const cls of importedClasses) {
                        this.importedClasses.set(cls.name, cls);
                    }
                } catch (err) {
                    console.error(`Error reading imported file ${filePath}:`, err);
                }
            }
        } catch (err) {
            console.error('Error building import chain:', err);
        }
    }

    public parseContent(content: string, sourceUri?: vscode.Uri): IClass[] {
        const inputStream = CharStreams.fromString(content);
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
            console.error(e);
        }
        return visitor.getParsedClasses().map(cls => {
            if (sourceUri) {
                cls.sourceUri = sourceUri;
            }
            cls.staticFields = cls.staticFields.map(f => {
                f.sourceUri = sourceUri;
                return f;
            });
            cls.instanceFields = cls.instanceFields.map(f => {
                f.sourceUri = sourceUri;
                return f;
            });
            cls.staticMethods = cls.staticMethods.map(m => {
                m.sourceUri = sourceUri;
                return m;
            });
            cls.instanceMethods = cls.instanceMethods.map(m => {
                m.sourceUri = sourceUri;
                return m;
            });
            cls.constructors = cls.constructors?.map(c => {
                c.sourceUri = sourceUri;
                return c;
            });
            return cls;
        });
    }


    public flush(): void {
        this.classes = [];
        this.importedClasses.clear();
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

    public getImportedClasses(): Map<string, IClass> {
        return this.importedClasses;
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

    public getSemanticTokens(): ISemanticToken[] {
        return this.semanticTokens;
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
