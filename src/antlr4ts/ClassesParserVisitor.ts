import * as vscode from 'vscode';
import {
    ClassDeclContext,
    MethodDeclContext,
    VariableDeclContext,
    PostfixExpressionContext,
    MethodCallContext,
    FieldAccessContext,
    WhileLoopContext,
    ForLoopContext,
    IfStatementContext,
    ElifStatementContext,
    ElseStatementContext
} from './ACLParser';
import {
    IClass,
    IMethod,
    IField,
    IParameter,
    ClassKinds,
    MethodKinds,
    FindMethodInClassParentsHierarchy,
    IChainNode,
    ILoopNode,
    IConditionNode
} from '../classes/IClass';
import { BaseMainClass } from '../classes/BaseMainClass';
import { BaseComponentsClass } from '../classes/BaseComponentsClass';
import { BaseInstantiatableClass } from '../classes/BaseInstantiatableClass';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';

export class ClassesParserVisitor extends AbstractParseTreeVisitor<void> {
    public classes: Map<string, IClass> = new Map();
    private currentClass: IClass | null = null;
    private currentMethod: IMethod | null = null;
    private currentChain: IChainNode[] = [];
    private chainStack: IChainNode[][] = [];
    public chains: IChainNode[][] = [];
    public loopNodes: ILoopNode[] = [];
    public conditionNodes: IConditionNode[] = [];

    public visitClassDecl = (ctx: ClassDeclContext): void => {
        this.currentMethod = null;

        const className = ctx.ID().text;
        let classKind = ClassKinds.CLASS;
        let extendsList: IClass[] = [];
        let classDescription = '';

        if (className === 'Main') {
            classKind = ClassKinds.EXTENSION;
            extendsList = [new BaseMainClass(className)];
        } else if (ctx.CLASS()) {
            classKind = ClassKinds.CLASS;
            extendsList = [new BaseMainClass(className)];
        } else if (ctx.COMPONENT()) {
            classKind = ClassKinds.COMPONENT;
            extendsList = [new BaseComponentsClass(className)];
            classDescription = 'Represents a component script attached to a MapObject.';
        } else if (ctx.EXTENSION()) {
            classKind = ClassKinds.EXTENSION;
            extendsList = [new BaseInstantiatableClass(className)];
        } else if (ctx.CUTSCENE()) {
            classKind = ClassKinds.CUTSCENE;
            extendsList = [new BaseInstantiatableClass(className)];
        }

        const declarationRange: vscode.Range = this.getClassDeclarationRange(ctx);
        const bodyRange = this.getClassBodyRange(ctx);

        this.currentClass = {
            kind: classKind,
            name: className,
            description: classDescription,
            extends: extendsList,
            staticFields: [],
            staticMethods: [],
            instanceFields: [],
            instanceMethods: [],
            declarationRange: declarationRange,
            bodyRange: bodyRange,
        };

        this.classes.set(this.currentClass.name, this.currentClass);
        this.visitChildren(ctx);
    };

    public defaultResult() {
        return;
    }

    public visitMethodDecl = (ctx: MethodDeclContext): void => {
        const methodName = ctx.ID().text;

        const declarationRange: vscode.Range = this.getMethodDeclarationRange(ctx);
        const bodyRange = this.getMethodBodyRange(ctx);

        let methodKind: MethodKinds = MethodKinds.FUNCTION;
        if (ctx.COROUTINE()) {
            methodKind = MethodKinds.COROUTINE;
        }

        if (this.currentClass) {
            const isStatic = this.currentClass.kind === ClassKinds.EXTENSION;
            const parametersList: string[] = ctx.paramList()?.ID().map(id => id.text) || [];
            let parameters: IParameter[] = parametersList.map(param => ({
                name: param,
                type: 'any',
                description: ''
            }));
            let returnType = 'void';
            let description = '';
            const parentMethod = FindMethodInClassParentsHierarchy(this.currentClass, methodName, parameters.length, true, true);
            if (parentMethod) {
                returnType = parentMethod.returnType;
                description = parentMethod.description;
                parameters = parentMethod.parameters;
            }

            const method: IMethod = {
                label: methodName,
                kind: methodKind,
                returnType: returnType,
                description: description,
                parameters: parameters,
                declarationRange: declarationRange,
                bodyRange: bodyRange
            };
            this.currentMethod = method;

            if (methodName === 'Init' && (this.currentClass.kind === ClassKinds.CLASS || this.currentClass.kind === ClassKinds.COMPONENT)) {
                this.currentClass.constructors = this.currentClass.constructors || [];
                method.returnType = this.currentClass.name;
                this.currentClass.constructors.push(method);
            } else {
                if (isStatic) {
                    this.currentClass.staticMethods.push(method);
                } else {
                    this.currentClass.instanceMethods.push(method);
                }
            }
        }

        this.visitChildren(ctx);

        this.currentMethod = null;
    };

    public visitVariableDecl = (ctx: VariableDeclContext): void => {
        if (this.currentMethod) {
            this.visitChildren(ctx);
            return;
        }

        if (this.currentClass) {
            const fieldName = ctx.ID()?.text;
            if (!fieldName) {
                this.visitChildren(ctx);
                return;
            }

            let fieldType = 'any';
            if (ctx.ASSIGN()) {
                const value = ctx.expression()!.text.trim();

                if (/^".*"$/.test(value)) {
                    fieldType = 'string';
                }

                if (/^\d+\.\d+$/.test(value)) {
                    fieldType = 'float';
                }

                if (/^\d+$/.test(value)) {
                    fieldType = 'int';
                }

                if (value === 'true' || value === 'false') {
                    fieldType = 'bool';
                }

                const constructorMatch = value.match(/^(.*?)\(/);
                if (constructorMatch) {
                    fieldType = constructorMatch[1];
                }
            }
            const description = '';

            const field: IField = {
                label: fieldName,
                type: fieldType,
                description: description,
                private: ctx.PRIVATE() !== undefined,
            };

            const isStatic = this.currentClass.kind === ClassKinds.EXTENSION;
            if (isStatic) {
                this.currentClass.staticFields.push(field);
            } else {
                this.currentClass.instanceFields.push(field);
            }
        }

        this.visitChildren(ctx);
    };

    public visitPostfixExpression = (ctx: PostfixExpressionContext): void => {
        this.chainStack.push([...this.currentChain]);
        this.currentChain = [];

        if (!ctx.primaryExpression().methodCall()) {
            const primaryExpr = ctx.primaryExpression().text;
            const startToken = ctx.primaryExpression().start;
            const startLine = startToken!.line;
            const startColumn = startToken!.charPositionInLine;

            this.currentChain.push({
                text: primaryExpr,
                startLine,
                startColumn,
                isMethodCall: false,
            });
        }

        this.visitChildren(ctx);

        if (this.currentChain.length > 1 || this.currentChain.length === 1 && this.currentChain[0].isMethodCall) {
            this.chains.push(this.currentChain);
        }

        this.currentChain = this.chainStack.pop() || [];
    };

    public visitMethodCall = (ctx: MethodCallContext): void => {
        const methodName = ctx.ID()!.text;
        const argumentList = ctx.argumentList()?.expression().map(expr => expr.text) || [];
        const startToken = ctx.start;
        const startLine = startToken!.line;
        const startColumn = startToken!.charPositionInLine + (ctx.DOT() ? 1 : 0);

        this.currentChain.push({
            text: `${methodName}(${argumentList.join(', ')})`,
            startLine,
            startColumn,
            isMethodCall: true,
            methodArguments: argumentList,
        });

        this.visitChildren(ctx);
    };

    public visitFieldAccess = (ctx: FieldAccessContext): void => {
        const fieldName = ctx.ID().text;
        const startToken = ctx.start;
        const startLine = startToken!.line;
        const startColumn = startToken!.charPositionInLine + 1;

        this.currentChain.push({
            text: fieldName,
            startLine,
            startColumn,
            isMethodCall: false,
        });

        this.visitChildren(ctx);
    };

    public visitWhileLoop = (ctx: WhileLoopContext): void => {
        let conditionRange: vscode.Range = this.getWhileConditionRange(ctx);
        let bodyRange: vscode.Range = this.getWhileBodyRange(ctx);
        this.loopNodes.push({
            conditionsRange: conditionRange,
            bodyRange: bodyRange,
        });

        this.visitChildren(ctx);
    };

    public visitForLoop = (ctx: ForLoopContext): void => {
        let conditionRange: vscode.Range = this.getForConditionRange(ctx);
        let bodyRange: vscode.Range = this.getForBodyRange(ctx);
        this.loopNodes.push({
            conditionsRange: conditionRange,
            bodyRange: bodyRange,
        });

        this.visitChildren(ctx);
    };

    public visitIfStatement = (ctx: IfStatementContext): void => {
        const afterBlockRange = this.getRangeAfterConditionBlock(ctx);
        this.conditionNodes.push({
            type: 'if',
            conditionRange: this.getConditionRange(ctx),
            bodyRange: this.getConditionBodyRange(ctx),
            afterBlockRange: afterBlockRange,
        });

        this.visitChildren(ctx);
    };

    public visitElifStatement = (ctx: ElifStatementContext): void => {
        const afterBlockRange = this.getRangeAfterConditionBlock(ctx);
        this.conditionNodes.push({
            type: 'elif',
            conditionRange: this.getConditionRange(ctx),
            bodyRange: this.getConditionBodyRange(ctx),
            afterBlockRange: afterBlockRange,
        });

        this.visitChildren(ctx);
    };

    public visitElseStatement = (ctx: ElseStatementContext): void => {
        const afterBlockRange = this.getRangeAfterConditionBlock(ctx);
        this.conditionNodes.push({
            type: 'else',
            bodyRange: this.getConditionBodyRange(ctx),
            afterBlockRange: afterBlockRange,
        });

        this.visitChildren(ctx);
    };

    public getParsedClasses(): Map<string, IClass> {
        return this.classes;
    }

    public getParsedChains(): IChainNode[][] {
        return this.chains;
    }

    public getParsedLoopNodes(): ILoopNode[] {
        return this.loopNodes;
    }

    public getParsedConditionNodes(): IConditionNode[] {
        return this.conditionNodes;
    }

    private getClassDeclarationRange(ctx: ClassDeclContext): vscode.Range {
        const startLine = ctx.start!.line - 1;
        const startChar = ctx.start!.charPositionInLine;
        const endLine = ctx.ID().symbol.line - 1;
        const endChar = ctx.ID().symbol.charPositionInLine + ctx.ID().symbol.text!.length;
        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getClassBodyRange(ctx: ClassDeclContext): vscode.Range {
        const startLine = ctx.LBRACE().symbol.line;
        const startChar = ctx.LBRACE().symbol.charPositionInLine;
        const endLine = ctx.RBRACE().symbol.line;
        const endChar = ctx.RBRACE().symbol.charPositionInLine;
        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getMethodDeclarationRange(ctx: MethodDeclContext): vscode.Range {
        const startLine = ctx.start!.line - 1;
        const startChar = ctx.start!.charPositionInLine;
        const endLine = ctx.RPAREN().symbol.line - 1;
        const endChar = ctx.RPAREN().symbol.charPositionInLine;
        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getMethodBodyRange(ctx: MethodDeclContext): vscode.Range {
        const startLine = ctx.block().start!.line - 1;
        const startChar = ctx.block().start!.charPositionInLine;
        const endLine = ctx.block().stop!.line - 1;
        const endChar = ctx.block().stop!.charPositionInLine;
        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getWhileConditionRange(ctx: WhileLoopContext): vscode.Range {
        const startLine = ctx.LPAREN().symbol.line - 1;
        const startChar = ctx.LPAREN().symbol.charPositionInLine;
        const endLine = ctx.RPAREN().symbol.line - 1;
        const endChar = ctx.RPAREN().symbol.charPositionInLine;

        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getWhileBodyRange(ctx: WhileLoopContext): vscode.Range {
        const startLine = ctx.block().start!.line - 1;
        const startChar = ctx.block().start!.charPositionInLine;
        const endLine = ctx.block().stop!.line - 1;
        const endChar = ctx.block().stop!.charPositionInLine;
        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getForConditionRange(ctx: ForLoopContext): vscode.Range {
        const startLine = ctx.LPAREN().symbol.line - 1;
        const startChar = ctx.LPAREN().symbol.charPositionInLine;
        const endLine = ctx.RPAREN().symbol.line - 1;
        const endChar = ctx.RPAREN().symbol.charPositionInLine;
        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getForBodyRange(ctx: ForLoopContext): vscode.Range {
        const startLine = ctx.block().start!.line - 1;
        const startChar = ctx.block().start!.charPositionInLine;
        const endLine = ctx.block().stop!.line - 1;
        const endChar = ctx.block().stop!.charPositionInLine;
        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getConditionRange(ctx: IfStatementContext | ElifStatementContext): vscode.Range {
        const startLine = ctx.LPAREN().symbol.line - 1;
        const startChar = ctx.LPAREN().symbol.charPositionInLine;
        const endLine = ctx.RPAREN().symbol.line - 1;
        const endChar = ctx.RPAREN().symbol.charPositionInLine;

        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getConditionBodyRange(ctx: IfStatementContext | ElifStatementContext | ElseStatementContext): vscode.Range {
        const startLine = ctx.block().start!.line - 1;
        const startChar = ctx.block().start!.charPositionInLine;
        const endLine = ctx.block().stop!.line - 1;
        const endChar = ctx.block().stop!.charPositionInLine;
        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getRangeAfterConditionBlock(ctx: IfStatementContext | ElifStatementContext | ElseStatementContext): vscode.Range {
        const blockEndLine = ctx.block().stop!.line - 1;
        const blockEndChar = ctx.block().stop!.charPositionInLine;

        const nextStatementStartLine = blockEndLine + 1;
        const nextStatementStartChar = blockEndChar + 1;

        return new vscode.Range(
            new vscode.Position(blockEndLine, blockEndChar),
            new vscode.Position(nextStatementStartLine, nextStatementStartChar)
        );
    }
}
