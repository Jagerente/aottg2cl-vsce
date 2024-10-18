// Generated from ./src/antlr/ACL.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ProgramContext } from "./ACLParser";
import { EntryPointDeclContext } from "./ACLParser";
import { ClassDeclContext } from "./ACLParser";
import { ClassBodyContext } from "./ACLParser";
import { VariableDeclContext } from "./ACLParser";
import { MethodDeclContext } from "./ACLParser";
import { ParamListContext } from "./ACLParser";
import { BlockContext } from "./ACLParser";
import { StatementContext } from "./ACLParser";
import { WhileLoopContext } from "./ACLParser";
import { ForLoopContext } from "./ACLParser";
import { IfStatementContext } from "./ACLParser";
import { ElifBlockContext } from "./ACLParser";
import { ElifStatementContext } from "./ACLParser";
import { ElseStatementContext } from "./ACLParser";
import { ReturnStatementContext } from "./ACLParser";
import { WaitStatementContext } from "./ACLParser";
import { ExpressionContext } from "./ACLParser";
import { AssignmentExpressionContext } from "./ACLParser";
import { LogicalOrExpressionContext } from "./ACLParser";
import { LogicalAndExpressionContext } from "./ACLParser";
import { EqualityExpressionContext } from "./ACLParser";
import { RelationalExpressionContext } from "./ACLParser";
import { AdditiveExpressionContext } from "./ACLParser";
import { MultiplicativeExpressionContext } from "./ACLParser";
import { UnaryExpressionContext } from "./ACLParser";
import { PostfixExpressionContext } from "./ACLParser";
import { PostfixOperatorContext } from "./ACLParser";
import { MethodCallContext } from "./ACLParser";
import { FieldAccessContext } from "./ACLParser";
import { PrimaryExpressionContext } from "./ACLParser";
import { LiteralContext } from "./ACLParser";
import { ArgumentListContext } from "./ACLParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ACLParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ACLVisitor<Result> extends ParseTreeVisitor<Result> {
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

