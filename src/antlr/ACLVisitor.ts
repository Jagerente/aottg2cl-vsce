// Generated from ./src/antlr/ACL.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


import { ProgramContext } from "./ACLParser.js";
import { EntryPointDeclContext } from "./ACLParser.js";
import { ClassDeclContext } from "./ACLParser.js";
import { ClassBodyContext } from "./ACLParser.js";
import { VariableDeclContext } from "./ACLParser.js";
import { MethodDeclContext } from "./ACLParser.js";
import { ParamListContext } from "./ACLParser.js";
import { BlockContext } from "./ACLParser.js";
import { StatementContext } from "./ACLParser.js";
import { WhileLoopContext } from "./ACLParser.js";
import { ForLoopContext } from "./ACLParser.js";
import { IfStatementContext } from "./ACLParser.js";
import { ElifBlockContext } from "./ACLParser.js";
import { ElifStatementContext } from "./ACLParser.js";
import { ElseStatementContext } from "./ACLParser.js";
import { ReturnStatementContext } from "./ACLParser.js";
import { WaitStatementContext } from "./ACLParser.js";
import { ExpressionContext } from "./ACLParser.js";
import { AssignmentExpressionContext } from "./ACLParser.js";
import { LogicalOrExpressionContext } from "./ACLParser.js";
import { LogicalAndExpressionContext } from "./ACLParser.js";
import { EqualityExpressionContext } from "./ACLParser.js";
import { RelationalExpressionContext } from "./ACLParser.js";
import { AdditiveExpressionContext } from "./ACLParser.js";
import { MultiplicativeExpressionContext } from "./ACLParser.js";
import { UnaryExpressionContext } from "./ACLParser.js";
import { PostfixExpressionContext } from "./ACLParser.js";
import { PostfixOperatorContext } from "./ACLParser.js";
import { MethodCallContext } from "./ACLParser.js";
import { FieldAccessContext } from "./ACLParser.js";
import { PrimaryExpressionContext } from "./ACLParser.js";
import { LiteralContext } from "./ACLParser.js";
import { ArgumentListContext } from "./ACLParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ACLParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class ACLVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `ACLParser.program`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProgram?: (ctx: ProgramContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.entryPointDecl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEntryPointDecl?: (ctx: EntryPointDeclContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.classDecl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitClassDecl?: (ctx: ClassDeclContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.classBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitClassBody?: (ctx: ClassBodyContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.variableDecl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableDecl?: (ctx: VariableDeclContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.methodDecl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMethodDecl?: (ctx: MethodDeclContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.paramList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParamList?: (ctx: ParamListContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock?: (ctx: BlockContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStatement?: (ctx: StatementContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.whileLoop`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWhileLoop?: (ctx: WhileLoopContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.forLoop`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitForLoop?: (ctx: ForLoopContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.ifStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfStatement?: (ctx: IfStatementContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.elifBlock`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElifBlock?: (ctx: ElifBlockContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.elifStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElifStatement?: (ctx: ElifStatementContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.elseStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElseStatement?: (ctx: ElseStatementContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.returnStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturnStatement?: (ctx: ReturnStatementContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.waitStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWaitStatement?: (ctx: WaitStatementContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.assignmentExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssignmentExpression?: (ctx: AssignmentExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.logicalOrExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.logicalAndExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.equalityExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEqualityExpression?: (ctx: EqualityExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.relationalExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationalExpression?: (ctx: RelationalExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.additiveExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAdditiveExpression?: (ctx: AdditiveExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.multiplicativeExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.unaryExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnaryExpression?: (ctx: UnaryExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.postfixExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPostfixExpression?: (ctx: PostfixExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.postfixOperator`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPostfixOperator?: (ctx: PostfixOperatorContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.methodCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMethodCall?: (ctx: MethodCallContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.fieldAccess`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFieldAccess?: (ctx: FieldAccessContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.primaryExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimaryExpression?: (ctx: PrimaryExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLiteral?: (ctx: LiteralContext) => Result;
    /**
     * Visit a parse tree produced by `ACLParser.argumentList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArgumentList?: (ctx: ArgumentListContext) => Result;
}

