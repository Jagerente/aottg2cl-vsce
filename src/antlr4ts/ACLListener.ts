// Generated from ./src/antlr4ts/ACL.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `ACLParser`.
 */
export interface ACLListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ACLParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.entryPointDecl`.
	 * @param ctx the parse tree
	 */
	enterEntryPointDecl?: (ctx: EntryPointDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.entryPointDecl`.
	 * @param ctx the parse tree
	 */
	exitEntryPointDecl?: (ctx: EntryPointDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.classDecl`.
	 * @param ctx the parse tree
	 */
	enterClassDecl?: (ctx: ClassDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.classDecl`.
	 * @param ctx the parse tree
	 */
	exitClassDecl?: (ctx: ClassDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.classBody`.
	 * @param ctx the parse tree
	 */
	enterClassBody?: (ctx: ClassBodyContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.classBody`.
	 * @param ctx the parse tree
	 */
	exitClassBody?: (ctx: ClassBodyContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.variableDecl`.
	 * @param ctx the parse tree
	 */
	enterVariableDecl?: (ctx: VariableDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.variableDecl`.
	 * @param ctx the parse tree
	 */
	exitVariableDecl?: (ctx: VariableDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.methodDecl`.
	 * @param ctx the parse tree
	 */
	enterMethodDecl?: (ctx: MethodDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.methodDecl`.
	 * @param ctx the parse tree
	 */
	exitMethodDecl?: (ctx: MethodDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.paramList`.
	 * @param ctx the parse tree
	 */
	enterParamList?: (ctx: ParamListContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.paramList`.
	 * @param ctx the parse tree
	 */
	exitParamList?: (ctx: ParamListContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.whileLoop`.
	 * @param ctx the parse tree
	 */
	enterWhileLoop?: (ctx: WhileLoopContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.whileLoop`.
	 * @param ctx the parse tree
	 */
	exitWhileLoop?: (ctx: WhileLoopContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.forLoop`.
	 * @param ctx the parse tree
	 */
	enterForLoop?: (ctx: ForLoopContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.forLoop`.
	 * @param ctx the parse tree
	 */
	exitForLoop?: (ctx: ForLoopContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.ifStatement`.
	 * @param ctx the parse tree
	 */
	enterIfStatement?: (ctx: IfStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.ifStatement`.
	 * @param ctx the parse tree
	 */
	exitIfStatement?: (ctx: IfStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.elifBlock`.
	 * @param ctx the parse tree
	 */
	enterElifBlock?: (ctx: ElifBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.elifBlock`.
	 * @param ctx the parse tree
	 */
	exitElifBlock?: (ctx: ElifBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.elifStatement`.
	 * @param ctx the parse tree
	 */
	enterElifStatement?: (ctx: ElifStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.elifStatement`.
	 * @param ctx the parse tree
	 */
	exitElifStatement?: (ctx: ElifStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.elseStatement`.
	 * @param ctx the parse tree
	 */
	enterElseStatement?: (ctx: ElseStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.elseStatement`.
	 * @param ctx the parse tree
	 */
	exitElseStatement?: (ctx: ElseStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.returnStatement`.
	 * @param ctx the parse tree
	 */
	enterReturnStatement?: (ctx: ReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.returnStatement`.
	 * @param ctx the parse tree
	 */
	exitReturnStatement?: (ctx: ReturnStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.waitStatement`.
	 * @param ctx the parse tree
	 */
	enterWaitStatement?: (ctx: WaitStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.waitStatement`.
	 * @param ctx the parse tree
	 */
	exitWaitStatement?: (ctx: WaitStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.assignmentExpression`.
	 * @param ctx the parse tree
	 */
	enterAssignmentExpression?: (ctx: AssignmentExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.assignmentExpression`.
	 * @param ctx the parse tree
	 */
	exitAssignmentExpression?: (ctx: AssignmentExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.logicalOrExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.logicalOrExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.logicalAndExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.logicalAndExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.equalityExpression`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.equalityExpression`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.relationalExpression`.
	 * @param ctx the parse tree
	 */
	enterRelationalExpression?: (ctx: RelationalExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.relationalExpression`.
	 * @param ctx the parse tree
	 */
	exitRelationalExpression?: (ctx: RelationalExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.additiveExpression`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.additiveExpression`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.multiplicativeExpression`.
	 * @param ctx the parse tree
	 */
	enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.multiplicativeExpression`.
	 * @param ctx the parse tree
	 */
	exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.unaryExpression`.
	 * @param ctx the parse tree
	 */
	enterUnaryExpression?: (ctx: UnaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.unaryExpression`.
	 * @param ctx the parse tree
	 */
	exitUnaryExpression?: (ctx: UnaryExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.postfixExpression`.
	 * @param ctx the parse tree
	 */
	enterPostfixExpression?: (ctx: PostfixExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.postfixExpression`.
	 * @param ctx the parse tree
	 */
	exitPostfixExpression?: (ctx: PostfixExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.postfixOperator`.
	 * @param ctx the parse tree
	 */
	enterPostfixOperator?: (ctx: PostfixOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.postfixOperator`.
	 * @param ctx the parse tree
	 */
	exitPostfixOperator?: (ctx: PostfixOperatorContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.methodCall`.
	 * @param ctx the parse tree
	 */
	enterMethodCall?: (ctx: MethodCallContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.methodCall`.
	 * @param ctx the parse tree
	 */
	exitMethodCall?: (ctx: MethodCallContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.fieldAccess`.
	 * @param ctx the parse tree
	 */
	enterFieldAccess?: (ctx: FieldAccessContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.fieldAccess`.
	 * @param ctx the parse tree
	 */
	exitFieldAccess?: (ctx: FieldAccessContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.primaryExpression`.
	 * @param ctx the parse tree
	 */
	enterPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.primaryExpression`.
	 * @param ctx the parse tree
	 */
	exitPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;

	/**
	 * Enter a parse tree produced by `ACLParser.argumentList`.
	 * @param ctx the parse tree
	 */
	enterArgumentList?: (ctx: ArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by `ACLParser.argumentList`.
	 * @param ctx the parse tree
	 */
	exitArgumentList?: (ctx: ArgumentListContext) => void;
}

