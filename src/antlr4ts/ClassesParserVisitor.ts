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
    ElseStatementContext,
    PrimaryExpressionContext,
    PostfixOperatorContext,
    ParamContext,
    LiteralContext
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
    IConditionNode, TypeReference
} from '../classes/IClass';
import {BaseMainClass} from '../classes/BaseMainClass';
import {BaseComponentsClass} from '../classes/BaseComponentsClass';
import {BaseInstantiatableClass} from '../classes/BaseInstantiatableClass';
import {AbstractParseTreeVisitor} from 'antlr4ts/tree/AbstractParseTreeVisitor';
import {CodeContextUtils} from "../utils/CodeContextUtils";

export class ClassesParserVisitor extends AbstractParseTreeVisitor<void> {
    public classes: IClass[] = [];
    private currentClass: IClass | null = null;
    private currentMethod: IMethod | null = null;
    private currentChain: IChainNode[] = [];
    private chainStack: IChainNode[][] = [];
    public chains: IChainNode[][] = [];
    public loopNodes: ILoopNode[] = [];
    public conditionNodes: IConditionNode[] = [];
    public stringRanges: vscode.Range[] = [];

    public visitClassDecl = (ctx: ClassDeclContext): void => {
        this.currentMethod = null;

        const className = ctx.ID().text;
        let classKind = ClassKinds.CLASS;
        let extendsList: IClass[] = [];
        let classDescription = '';

        if (className === 'Main') {
            classKind = ClassKinds.EXTENSION;
            extendsList = [new BaseMainClass()];
        } else if (ctx.CLASS()) {
            classKind = ClassKinds.CLASS;
            extendsList = [new BaseInstantiatableClass()];
        } else if (ctx.COMPONENT()) {
            classKind = ClassKinds.COMPONENT;
            extendsList = [new BaseComponentsClass()];
            classDescription = 'Base class for components, providing callback functions specific to components. Components also inherit all callbacks from Main."';
        } else if (ctx.EXTENSION()) {
            classKind = ClassKinds.EXTENSION;
            extendsList = [new BaseInstantiatableClass()];
        } else if (ctx.CUTSCENE()) {
            classKind = ClassKinds.CUTSCENE;
            extendsList = [new BaseInstantiatableClass()];
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

        this.classes.push(this.currentClass);
        this.visitChildren(ctx);
    };

    public defaultResult() {
        return;
    }

    public visitMethodDecl = (ctx: MethodDeclContext): void => {
        const methodName = ctx.ID().text;
        const declarationRange = this.getMethodDeclarationRange(ctx);
        const bodyRange = this.getMethodBodyRange(ctx);

        if (this.currentClass) {
            let methodKind: MethodKinds = ctx.COROUTINE() ? MethodKinds.COROUTINE : MethodKinds.FUNCTION;
            const isStatic = this.currentClass.kind === ClassKinds.EXTENSION;

            let description = '';
            let returnType: TypeReference = {name: 'void', typeArguments: []};
            const parameters: IParameter[] = [];

            if (ctx.paramList()) {
                for (const paramCtx of ctx.paramList()!.param()) {
                    const paramName = paramCtx.ID().text;
                    const paramDeclarationRange = this.getParameterDeclarationRange(paramCtx);
                    let paramType: TypeReference = {name: 'any', typeArguments: []};
                    let paramDescription = '';

                    if (paramCtx.annotation()?.length) {
                        for (const annotationCtx of paramCtx.annotation()!) {
                            const lines = this.getAnnotationLines(annotationCtx);
                            for (const line of lines) {
                                const m = line.match(/@type\s+(.+)/);
                                if (m) {
                                    const typeStr = this.extractTypeFromAnnotation(m[1]);
                                    if (typeStr) {
                                        paramType = CodeContextUtils.parseTypeReference(typeStr);
                                        break;
                                    }
                                }
                            }
                            if (paramType.name !== 'any') {
                                break;
                            }
                        }
                    } else if (ctx.annotation()?.length) {
                        for (const annotationCtx of ctx.annotation()!) {
                            const lines = this.getAnnotationLines(annotationCtx);
                            for (const line of lines) {
                                const paramMatch = line.match(new RegExp(`@param\\s+${paramName}\\s+(.+)`));
                                if (paramMatch) {
                                    const rest = paramMatch[1];
                                    const typeStr = this.extractTypeFromAnnotation(rest);
                                    if (typeStr) {
                                        paramType = CodeContextUtils.parseTypeReference(typeStr);
                                        const escapedType = typeStr.replace(/[<>\[\](){}.*+?^$|\\]/g, '\\$&');
                                        const descMatch = rest.match(new RegExp(`^${escapedType}\\s+(.+)$`));
                                        if (descMatch) {
                                            paramDescription = descMatch[1].trim();
                                        }
                                        break;
                                    }
                                }
                            }
                            if (paramType.name !== 'any') {
                                break;
                            }
                        }
                    } else {
                        const parentMethod = FindMethodInClassParentsHierarchy(this.currentClass, methodName, ctx.paramList()!.param().length, true, true);
                        if (parentMethod) {
                            const inherited = parentMethod.parameters[parameters.length];
                            if (inherited) {
                                paramType = inherited.type as TypeReference;
                                paramDescription = inherited.description;
                            }
                        }
                    }

                    parameters.push({
                        name: paramName,
                        type: paramType,
                        description: paramDescription,
                        declarationRange: paramDeclarationRange,
                        reassignments: [],
                        isOptional: false,
                        isVariadic: false
                    });
                }
            }

            if (ctx.annotation()?.length) {
                for (const annotationCtx of ctx.annotation()!) {
                    const lines = this.getAnnotationLines(annotationCtx);
                    for (const line of lines) {
                        const returnMatch = line.match(/@return\s+(.+)/);
                        if (returnMatch) {
                            const rest = returnMatch[1];
                            const typeStr = this.extractTypeFromAnnotation(rest);
                            if (typeStr) {
                                returnType = CodeContextUtils.parseTypeReference(typeStr);
                                const escapedType = typeStr.replace(/[<>\[\](){}.*+?^$|\\]/g, '\\$&');
                                const descMatch = rest.match(new RegExp(`^${escapedType}\\s+(.+)$`));
                                if (descMatch) {
                                    description = descMatch[1].trim();
                                }
                                break;
                            }
                        }
                    }
                    if (returnType.name !== 'void') {
                        break;
                    }
                }
            } else {
                const parentMethod = FindMethodInClassParentsHierarchy(this.currentClass, methodName, parameters.length, true, true);
                if (parentMethod) {
                    description = parentMethod.description;
                    returnType = parentMethod.returnType as TypeReference;
                }
            }

            const method: IMethod = {
                parent: this.currentClass,
                label: methodName,
                kind: methodKind,
                returnType,
                description,
                parameters,
                declarationRange,
                bodyRange,
                localVariables: []
            };
            this.currentMethod = method;

            if (methodName === 'Init' && (this.currentClass.kind === ClassKinds.CLASS || this.currentClass.kind === ClassKinds.COMPONENT)) {
                this.currentClass.constructors = this.currentClass.constructors || [];
                method.returnType = {name: this.currentClass.name, typeArguments: []};
                this.currentClass.constructors.push(method);
            } else if (isStatic) {
                this.currentClass.staticMethods.push(method);
            } else {
                this.currentClass.instanceMethods.push(method);
            }
        }

        this.visitChildren(ctx);
        this.currentMethod = null;
    };

    public visitVariableDecl = (ctx: VariableDeclContext): void => {
        if (this.currentMethod) {
            const name = ctx.ID()?.text;
            if (name) {
                const valueText = ctx.expression()?.text.trim() ?? '';
                const startToken = ctx.start;
                const startPos = new vscode.Position(startToken.line - 1, startToken.charPositionInLine);
                const endPos = startPos.translate(0, name.length);
                const declRange = new vscode.Range(startPos, endPos);

                const param = this.currentMethod.parameters.find(p => p.name === name);
                if (param) {
                    param.reassignments?.push({range: declRange, value: valueText});
                } else {
                    let local = this.currentMethod.localVariables?.find(v => v.name === name);
                    if (!local) {
                        let varType: TypeReference = {name: 'any', typeArguments: []};
                        const annotations = ctx.annotation();
                        if (annotations?.length) {
                            for (const ann of annotations) {
                                const lines = this.getAnnotationLines(ann);
                                for (const line of lines) {
                                    const m = line.match(/@type\s+(.+)/);
                                    if (m) {
                                        const typeStr = this.extractTypeFromAnnotation(m[1]);
                                        if (typeStr) {
                                            varType = CodeContextUtils.parseTypeReference(typeStr);
                                            break;
                                        }
                                    }
                                }
                                if (varType.name !== 'any') {
                                    break;
                                }
                            }
                        } else {
                            varType = CodeContextUtils.parseTypeReferenceFallback(valueText, 'any');
                        }

                        local = {
                            name,
                            value: valueText,
                            type: varType,
                            declarationRange: declRange,
                            scopeRange: new vscode.Range(startPos, this.currentMethod.bodyRange?.end ?? endPos),
                            reassignments: []
                        };
                        this.currentMethod.localVariables?.push(local);
                    } else {
                        local.reassignments?.push({range: declRange, value: valueText});
                    }
                }
            }
            this.visitChildren(ctx);
            return;
        }

        if (this.currentClass) {
            const fieldName = ctx.ID()?.text;
            if (!fieldName) {
                this.visitChildren(ctx);
                return;
            }

            const valueText = ctx.expression()?.text.trim() ?? '';
            let fieldType: TypeReference = {name: 'any', typeArguments: []};
            let fieldDescription = '';
            const annotations = ctx.annotation();
                    if (annotations?.length) {
                        for (const ann of annotations) {
                            const lines = this.getAnnotationLines(ann);
                            for (const line of lines) {
                                const m = line.match(/@type\s+(.+)/);
                                if (m) {
                                    const rest = m[1];
                                    const typeStr = this.extractTypeFromAnnotation(rest);
                                    if (typeStr) {
                                        fieldType = CodeContextUtils.parseTypeReference(typeStr);
                                        const escapedType = typeStr.replace(/[<>\[\](){}.*+?^$|\\]/g, '\\$&');
                                        const descMatch = rest.match(new RegExp(`^${escapedType}\\s+(.+)$`));
                                        if (descMatch) {
                                            fieldDescription = descMatch[1].trim();
                                        }
                                        break;
                                    }
                                }
                            }
                            if (fieldType.name !== 'any') {
                                break;
                            }
                        }
                    } else {
                fieldType = CodeContextUtils.parseTypeReferenceFallback(valueText, 'any');
            }

            const declarationRange = this.getFieldDeclarationRange(ctx);
            const field: IField = {
                parent: this.currentClass,
                label: fieldName,
                type: fieldType,
                description: fieldDescription,
                private: ctx.PRIVATE() !== undefined,
                declarationRange,
                readonly: false
            };

            if (this.currentClass.kind === ClassKinds.EXTENSION) {
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

        this.visit(ctx.primaryExpression());

        for (const postfixOp of ctx.postfixOperator()) {
            this.visit(postfixOp);
        }

        if (this.currentChain.length > 1 || (this.currentChain.length === 1 && this.currentChain[0].isMethodCall)) {
            this.chains.push(this.currentChain);
        }

        this.currentChain = this.chainStack.pop() || [];
    };

    public visitPrimaryExpression = (ctx: PrimaryExpressionContext): void => {
        if (ctx.ID()) {
            const text = ctx.ID()!.text;
            const startToken = ctx.start;
            const startLine = startToken.line - 1;
            const startColumn = startToken.charPositionInLine;

            this.currentChain.push({
                text,
                startLine,
                startColumn,
                isMethodCall: false,
            });
        } else if (ctx.SELF()) {
            const text = ctx.SELF()!.text;
            const startToken = ctx.start;
            const startLine = startToken.line - 1;
            const startColumn = startToken.charPositionInLine;

            this.currentChain.push({
                text,
                startLine,
                startColumn,
                isMethodCall: false,
            });
        } else if (ctx.literal()) {
            this.visit(ctx.literal()!);
        } else if (ctx.LPAREN() && ctx.expression()) {
            this.visit(ctx.expression()!);
        }
    };

    public visitPostfixOperator = (ctx: PostfixOperatorContext): void => {
        if (ctx.fieldAccess()) {
            this.visit(ctx.fieldAccess()!);
        } else if (ctx.methodCall()) {
            this.visit(ctx.methodCall()!);
        }
    };


    public visitMethodCall = (ctx: MethodCallContext): void => {
        const prevItem = this.currentChain[this.currentChain.length - 1];
        if (!prevItem) {
            return;
        }

        const argumentList = ctx.argumentList()?.expression().map(expr => expr.text) || [];
        const startToken = ctx.start;
        const startLine = startToken.line;
        const startColumn = startToken.charPositionInLine;

        prevItem.text += `(${argumentList.join(', ')})`;
        prevItem.isMethodCall = true;
        prevItem.methodArguments = argumentList;

        this.visitChildren(ctx);
    };


    public visitFieldAccess = (ctx: FieldAccessContext): void => {
        const fieldName = ctx.ID().text;
        const startToken = ctx.start;
        const startLine = startToken!.line - 1;
        const startColumn = startToken!.charPositionInLine + 1;

        this.currentChain.push({
            text: fieldName,
            startLine,
            startColumn,
            isMethodCall: false,
        });
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
        const conditionRange = this.getForConditionRange(ctx);
        const bodyRange = this.getForBodyRange(ctx);

        this.loopNodes.push({
            conditionsRange: conditionRange,
            bodyRange: bodyRange,
        });

        const name = ctx.ID().text;
        const exprText = ctx.expression().text.trim();

        const idToken = ctx.ID().symbol;
        const startPos = new vscode.Position(idToken.line - 1, idToken.charPositionInLine);
        const endPos = startPos.translate(0, name.length);
        const declRange = new vscode.Range(startPos, endPos);

        const typeRef = CodeContextUtils.parseTypeReferenceFallback(exprText, 'any');

        if (this.currentMethod) {
            this.currentMethod.localVariables = this.currentMethod.localVariables || [];
            this.currentMethod.localVariables.push({
                name: name,
                value: exprText,
                type: typeRef,
                declarationRange: declRange,
                scopeRange: new vscode.Range(
                    new vscode.Position(ctx.LPAREN().symbol.line - 1, ctx.LPAREN().symbol.charPositionInLine),
                    this.currentMethod.bodyRange?.end
                    ?? new vscode.Position(ctx.RPAREN().symbol.line - 1, ctx.RPAREN().symbol.charPositionInLine)
                ),
                reassignments: [],
                inLoop: true
            });
        }

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

    public getParsedClasses(): IClass[] {
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

    public visitLiteral = (ctx: LiteralContext): void => {
        if (ctx.STRING()) {
            const stringToken = ctx.STRING()!;
            const startLine = stringToken.symbol.line - 1;
            const startColumn = stringToken.symbol.charPositionInLine;
            
            const stopToken = ctx.stop!;
            const endLine = stopToken.line - 1;
            const endColumn = stopToken.charPositionInLine + (stopToken.text?.length ?? 0);
            
            this.stringRanges.push(
                new vscode.Range(
                    new vscode.Position(startLine, startColumn),
                    new vscode.Position(endLine, endColumn)
                )
            );
        }
        this.visitChildren(ctx);
    };

    public getParsedStringRanges(): vscode.Range[] {
        return this.stringRanges;
    }

    private getClassDeclarationRange(ctx: ClassDeclContext): vscode.Range {
        const startLine = ctx.start!.line - 1;
        const startChar = ctx.start!.charPositionInLine;
        const lbraceSymbol = ctx.LBRACE().symbol;
        const endLine = lbraceSymbol.line - 1;
        const endChar = lbraceSymbol.charPositionInLine;
        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getClassBodyRange(ctx: ClassDeclContext): vscode.Range {
        const startLine = ctx.LBRACE().symbol.line - 1;
        const startChar = ctx.LBRACE().symbol.charPositionInLine;
        const rbraceSymbol = ctx.RBRACE().symbol;
        const endLine = rbraceSymbol.line - 1;
        const endChar = rbraceSymbol.charPositionInLine;
        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getFieldDeclarationRange(ctx: VariableDeclContext): vscode.Range {
        const startToken = ctx.PRIVATE()
            ? ctx.PRIVATE()!.symbol
            : ctx.ID()!.symbol;

        const semiToken = ctx.SEMI().symbol;

        const startLine = startToken.line - 1;
        const startChar = startToken.charPositionInLine;
        const endLine = semiToken.line - 1;
        const endChar = semiToken.charPositionInLine + 1;

        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getMethodDeclarationRange(ctx: MethodDeclContext): vscode.Range {
        const keywordToken = ctx.FUNCTION()
            ? ctx.FUNCTION()!.symbol
            : ctx.COROUTINE()!.symbol;

        const startLine = keywordToken.line - 1;
        const startChar = keywordToken.charPositionInLine;

        const blockStartSymbol = ctx.block().start!;
        const endLine = blockStartSymbol.line - 1;
        const endChar = blockStartSymbol.charPositionInLine;

        return new vscode.Range(
            new vscode.Position(startLine, startChar),
            new vscode.Position(endLine, endChar)
        );
    }

    private getParameterDeclarationRange(ctx: ParamContext): vscode.Range {
        const token = ctx.ID().symbol;

        const startLine = token.line - 1;
        const startChar = token.charPositionInLine;

        const endLine = token.line - 1;
        const endChar = token.charPositionInLine + token.text!.length;

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

    private getAnnotationLines(annotationCtx: any): string[] {
        let rawText = '';
        
        if (annotationCtx.ANNOTATION_COMMENT()) {
            rawText = annotationCtx.ANNOTATION_COMMENT()!.text.replace(/^#\s*/, '');
            return [rawText.trim()];
        } 
        else if (annotationCtx.ANNOTATION_BLOCK_COMMENT()) {
            rawText = annotationCtx.ANNOTATION_BLOCK_COMMENT()!.text;
            return rawText
                .replace(/^\/\*|\*\/$/g, '') 
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(line => line.length > 0);
        }
        
        return [];
    }

    private extractTypeFromAnnotation(text: string): string | null {
        text = text.trim();
        if (!text) {
            return null;
        }

        const identifierMatch = text.match(/^(\w+)/);
        if (!identifierMatch) {
            return null;
        }

        let result = identifierMatch[1];
        let pos = identifierMatch[0].length;

        while (pos < text.length && /\s/.test(text[pos])) {
            pos++;
        }

        if (pos < text.length && text[pos] === '<') {
            let depth = 0;
            let start = pos;

            while (pos < text.length) {
                const char = text[pos];
                if (char === '<') {
                    depth++;
                } else if (char === '>') {
                    depth--;
                    if (depth === 0) {
                        result += text.substring(start, pos + 1);
                        pos++;
                        break;
                    }
                }
                pos++;
            }

            if (depth > 0) {
                result += text.substring(start);
            }
        }

        return result.trim();
    }
}
