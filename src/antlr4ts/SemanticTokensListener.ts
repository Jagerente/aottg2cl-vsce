import * as vscode from 'vscode';
import { ClassDeclContext, MethodDeclContext, ParamListContext, PrimaryExpressionContext, VariableDeclContext } from "./ACLParser";
import { ISemanticToken } from "./ISemanticToken";
import { IClass, IMethod } from "../classes/IClass";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { SemanticTokenModifiers, SemanticTokenTypes } from '../utils/SemanticTokensLegend';
import { ACLListener } from './ACLListener';
import { AvailableClassesMap } from '../classes/AvailableClasses';

export class SemanticTokensListener implements ACLListener {
    private classes: Map<string, IClass>;
    private currentClass: IClass | undefined;
    private currentMethod: IMethod | undefined;

    public semanticTokens: ISemanticToken[] = [];
    public documentSymbols: vscode.DocumentSymbol[] = [];

    constructor(classes: IClass[]) {
        this.classes = new Map(classes.map(c => [c.name, c]));
    }

    public enterClassDecl = (ctx: ClassDeclContext) => {
        this.currentClass = this.classes.get(ctx.ID()!.text)!;
        const token: ISemanticToken = {
            range: this.getTerminalNodeRange(ctx.ID()),
            tokenType: SemanticTokenTypes.CLASS,
            tokenModifiers: [SemanticTokenModifiers.DECLARATION],
        }
        this.semanticTokens.push(token);
    };

    public exitClassDecl = (ctx: ClassDeclContext) => {
        this.currentClass = undefined;
    };

    public enterVariableDecl = (ctx: VariableDeclContext) => {
        const token: ISemanticToken = {
            range: this.getTerminalNodeRange(ctx.ID()!),
            tokenType: SemanticTokenTypes.FIELD,
            tokenModifiers: [SemanticTokenModifiers.DECLARATION],
        }
        this.semanticTokens.push(token);
    };

    public enterMethodDecl = (ctx: MethodDeclContext) => {
        this.currentMethod = this.currentClass?.instanceMethods.find(m => m.label === ctx.ID()!.text)
            ?? this.currentClass?.staticMethods.find(m => m.label === ctx.ID()!.text);

        const token: ISemanticToken = {
            range: this.getTerminalNodeRange(ctx.ID()!),
            tokenType: SemanticTokenTypes.METHOD,
            tokenModifiers: [SemanticTokenModifiers.DECLARATION],
        }
        this.semanticTokens.push(token);
    };

    public exitMethodDecl = (ctx: MethodDeclContext) => {
        this.currentMethod = undefined;
    };

    public enterParamList = (ctx: ParamListContext) => {
        ctx.param().forEach(id => {
            const token: ISemanticToken = {
                range: this.getTerminalNodeRange(id.ID()),
                tokenType: SemanticTokenTypes.PARAMETER,
                tokenModifiers: [SemanticTokenModifiers.DECLARATION],
            }
            this.semanticTokens.push(token);
        });
    };

    public enterPrimaryExpression = (ctx: PrimaryExpressionContext) => {
        if (ctx.ID()) {
            let tokenType: string | undefined = undefined;
            if (this.currentMethod?.parameters.findIndex(p => p.name === ctx.ID()!.text) !== -1) {
                tokenType = SemanticTokenTypes.PARAMETER;
            }
            else if (this.hasMethod(ctx.ID()!.text)) {
                tokenType = SemanticTokenTypes.METHOD;
            }
            else if (this.hasField(ctx.ID()!.text)) {
                tokenType = SemanticTokenTypes.FIELD;
            }
            else if (this.classes.has(ctx.ID()!.text) || AvailableClassesMap.has(ctx.ID()!.text)) {
                tokenType = SemanticTokenTypes.CLASS;
            }
            else if (ctx.ID()!.text !== 'self') {
                tokenType = SemanticTokenTypes.VARIABLE;
            }

            if (tokenType) {
                const token: ISemanticToken = {
                    range: this.getTerminalNodeRange(ctx.ID()!),
                    tokenType: tokenType,
                }
                this.semanticTokens.push(token);
            }
        }
    };

    visitTerminal?: (/*@NotNull*/ node: TerminalNode) => void;

    private getTerminalNodeRange(node: TerminalNode): vscode.Range {
        const line = node.symbol.line - 1;
        const startChar = node.symbol.charPositionInLine;
        const endChar = node.symbol.charPositionInLine + node.text.length;
        return new vscode.Range(new vscode.Position(line, startChar), new vscode.Position(line, endChar));
    }

    private hasMethod(name: string): boolean {
        if (this.currentClass) {
            return this.currentClass.instanceMethods.findIndex(m => m.label === name) !== -1
                || this.currentClass.staticMethods.findIndex(m => m.label === name) !== -1;
        }
        return false;
    }

    private hasField(name: string): boolean {
        if (this.currentClass) {
            return this.currentClass.instanceFields.findIndex(f => f.label === name) !== -1
                || this.currentClass.staticFields.findIndex(f => f.label === name) !== -1;
        }
        return false;
    }
}