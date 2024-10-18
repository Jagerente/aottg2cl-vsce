// Generated from ./src/antlr/ACL.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ACLListener } from "./ACLListener";
import { ACLVisitor } from "./ACLVisitor";


export class ACLParser extends Parser {
	public static readonly CLASS = 1;
	public static readonly COMPONENT = 2;
	public static readonly EXTENSION = 3;
	public static readonly CUTSCENE = 4;
	public static readonly FUNCTION = 5;
	public static readonly COROUTINE = 6;
	public static readonly WHILE = 7;
	public static readonly FOR = 8;
	public static readonly IN = 9;
	public static readonly IF = 10;
	public static readonly ELIF = 11;
	public static readonly ELSE = 12;
	public static readonly WAIT = 13;
	public static readonly RETURN = 14;
	public static readonly BREAK = 15;
	public static readonly CONTINUE = 16;
	public static readonly ID = 17;
	public static readonly PRIVATE = 18;
	public static readonly SELF = 19;
	public static readonly DOT = 20;
	public static readonly ASSIGN = 21;
	public static readonly SEMI = 22;
	public static readonly COMMA = 23;
	public static readonly MAIN = 24;
	public static readonly NUMBER = 25;
	public static readonly FLOAT = 26;
	public static readonly STRING = 27;
	public static readonly BOOL = 28;
	public static readonly NULL = 29;
	public static readonly PLUS = 30;
	public static readonly MINUS = 31;
	public static readonly MULTIPLY = 32;
	public static readonly DIVIDE = 33;
	public static readonly PLUS_ASSIGN = 34;
	public static readonly MINUS_ASSIGN = 35;
	public static readonly MULTIPLY_ASSIGN = 36;
	public static readonly DIVIDE_ASSIGN = 37;
	public static readonly EQUALS = 38;
	public static readonly NOT_EQUALS = 39;
	public static readonly LESS = 40;
	public static readonly LESS_EQUAL = 41;
	public static readonly GREATER = 42;
	public static readonly GREATER_EQUAL = 43;
	public static readonly AND = 44;
	public static readonly OR = 45;
	public static readonly NOT = 46;
	public static readonly LBRACE = 47;
	public static readonly RBRACE = 48;
	public static readonly LPAREN = 49;
	public static readonly RPAREN = 50;
	public static readonly WS = 51;
	public static readonly COMMENT = 52;
	public static readonly BLOCK_COMMENT = 53;
	public static readonly RULE_program = 0;
	public static readonly RULE_entryPointDecl = 1;
	public static readonly RULE_classDecl = 2;
	public static readonly RULE_classBody = 3;
	public static readonly RULE_variableDecl = 4;
	public static readonly RULE_methodDecl = 5;
	public static readonly RULE_paramList = 6;
	public static readonly RULE_block = 7;
	public static readonly RULE_statement = 8;
	public static readonly RULE_whileLoop = 9;
	public static readonly RULE_forLoop = 10;
	public static readonly RULE_ifStatement = 11;
	public static readonly RULE_elifBlock = 12;
	public static readonly RULE_elifStatement = 13;
	public static readonly RULE_elseStatement = 14;
	public static readonly RULE_returnStatement = 15;
	public static readonly RULE_waitStatement = 16;
	public static readonly RULE_expression = 17;
	public static readonly RULE_assignmentExpression = 18;
	public static readonly RULE_logicalOrExpression = 19;
	public static readonly RULE_logicalAndExpression = 20;
	public static readonly RULE_equalityExpression = 21;
	public static readonly RULE_relationalExpression = 22;
	public static readonly RULE_additiveExpression = 23;
	public static readonly RULE_multiplicativeExpression = 24;
	public static readonly RULE_unaryExpression = 25;
	public static readonly RULE_postfixExpression = 26;
	public static readonly RULE_postfixOperator = 27;
	public static readonly RULE_methodCall = 28;
	public static readonly RULE_fieldAccess = 29;
	public static readonly RULE_primaryExpression = 30;
	public static readonly RULE_literal = 31;
	public static readonly RULE_argumentList = 32;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "entryPointDecl", "classDecl", "classBody", "variableDecl", 
		"methodDecl", "paramList", "block", "statement", "whileLoop", "forLoop", 
		"ifStatement", "elifBlock", "elifStatement", "elseStatement", "returnStatement", 
		"waitStatement", "expression", "assignmentExpression", "logicalOrExpression", 
		"logicalAndExpression", "equalityExpression", "relationalExpression", 
		"additiveExpression", "multiplicativeExpression", "unaryExpression", "postfixExpression", 
		"postfixOperator", "methodCall", "fieldAccess", "primaryExpression", "literal", 
		"argumentList",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'class'", "'component'", "'extension'", "'cutscene'", "'function'", 
		"'coroutine'", "'while'", "'for'", "'in'", "'if'", "'elif'", "'else'", 
		"'wait'", "'return'", "'break'", "'continue'", undefined, "'_'", "'self'", 
		"'.'", "'='", "';'", "','", "'Main'", undefined, undefined, undefined, 
		undefined, "'null'", "'+'", "'-'", "'*'", "'/'", "'+='", "'-='", "'*='", 
		"'/='", "'=='", "'!='", "'<'", "'<='", "'>'", "'>='", "'&&'", "'||'", 
		"'!'", "'{'", "'}'", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "CLASS", "COMPONENT", "EXTENSION", "CUTSCENE", "FUNCTION", 
		"COROUTINE", "WHILE", "FOR", "IN", "IF", "ELIF", "ELSE", "WAIT", "RETURN", 
		"BREAK", "CONTINUE", "ID", "PRIVATE", "SELF", "DOT", "ASSIGN", "SEMI", 
		"COMMA", "MAIN", "NUMBER", "FLOAT", "STRING", "BOOL", "NULL", "PLUS", 
		"MINUS", "MULTIPLY", "DIVIDE", "PLUS_ASSIGN", "MINUS_ASSIGN", "MULTIPLY_ASSIGN", 
		"DIVIDE_ASSIGN", "EQUALS", "NOT_EQUALS", "LESS", "LESS_EQUAL", "GREATER", 
		"GREATER_EQUAL", "AND", "OR", "NOT", "LBRACE", "RBRACE", "LPAREN", "RPAREN", 
		"WS", "COMMENT", "BLOCK_COMMENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ACLParser._LITERAL_NAMES, ACLParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ACLParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ACL.g4"; }

	// @Override
	public get ruleNames(): string[] { return ACLParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ACLParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ACLParser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ACLParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ACLParser.CLASS) | (1 << ACLParser.COMPONENT) | (1 << ACLParser.EXTENSION) | (1 << ACLParser.CUTSCENE))) !== 0)) {
				{
				{
				this.state = 66;
				this.classDecl();
				}
				}
				this.state = 71;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entryPointDecl(): EntryPointDeclContext {
		let _localctx: EntryPointDeclContext = new EntryPointDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ACLParser.RULE_entryPointDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 72;
			this.match(ACLParser.CLASS);
			this.state = 73;
			this.match(ACLParser.MAIN);
			this.state = 74;
			this.match(ACLParser.LBRACE);
			this.state = 75;
			this.classBody();
			this.state = 76;
			this.match(ACLParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classDecl(): ClassDeclContext {
		let _localctx: ClassDeclContext = new ClassDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ACLParser.RULE_classDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 78;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ACLParser.CLASS) | (1 << ACLParser.COMPONENT) | (1 << ACLParser.EXTENSION) | (1 << ACLParser.CUTSCENE))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 79;
			this.match(ACLParser.ID);
			this.state = 80;
			this.match(ACLParser.LBRACE);
			this.state = 81;
			this.classBody();
			this.state = 82;
			this.match(ACLParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classBody(): ClassBodyContext {
		let _localctx: ClassBodyContext = new ClassBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ACLParser.RULE_classBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 88;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ACLParser.FUNCTION) | (1 << ACLParser.COROUTINE) | (1 << ACLParser.ID) | (1 << ACLParser.PRIVATE))) !== 0)) {
				{
				this.state = 86;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ACLParser.ID:
				case ACLParser.PRIVATE:
					{
					this.state = 84;
					this.variableDecl();
					}
					break;
				case ACLParser.FUNCTION:
				case ACLParser.COROUTINE:
					{
					this.state = 85;
					this.methodDecl();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 90;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDecl(): VariableDeclContext {
		let _localctx: VariableDeclContext = new VariableDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ACLParser.RULE_variableDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 92;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ACLParser.PRIVATE) {
				{
				this.state = 91;
				this.match(ACLParser.PRIVATE);
				}
			}

			this.state = 94;
			this.match(ACLParser.ID);
			this.state = 95;
			this.match(ACLParser.ASSIGN);
			this.state = 96;
			this.expression();
			}
			this.state = 98;
			this.match(ACLParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodDecl(): MethodDeclContext {
		let _localctx: MethodDeclContext = new MethodDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ACLParser.RULE_methodDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 100;
			_la = this._input.LA(1);
			if (!(_la === ACLParser.FUNCTION || _la === ACLParser.COROUTINE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 101;
			this.match(ACLParser.ID);
			this.state = 102;
			this.match(ACLParser.LPAREN);
			this.state = 104;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ACLParser.ID) {
				{
				this.state = 103;
				this.paramList();
				}
			}

			this.state = 106;
			this.match(ACLParser.RPAREN);
			this.state = 107;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paramList(): ParamListContext {
		let _localctx: ParamListContext = new ParamListContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ACLParser.RULE_paramList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 109;
			this.match(ACLParser.ID);
			this.state = 114;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.COMMA) {
				{
				{
				this.state = 110;
				this.match(ACLParser.COMMA);
				this.state = 111;
				this.match(ACLParser.ID);
				}
				}
				this.state = 116;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let _localctx: BlockContext = new BlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ACLParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 117;
			this.match(ACLParser.LBRACE);
			this.state = 121;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ACLParser.WHILE) | (1 << ACLParser.FOR) | (1 << ACLParser.IF) | (1 << ACLParser.WAIT) | (1 << ACLParser.RETURN) | (1 << ACLParser.BREAK) | (1 << ACLParser.CONTINUE) | (1 << ACLParser.ID) | (1 << ACLParser.PRIVATE) | (1 << ACLParser.SELF) | (1 << ACLParser.DOT) | (1 << ACLParser.NUMBER) | (1 << ACLParser.FLOAT) | (1 << ACLParser.STRING) | (1 << ACLParser.BOOL) | (1 << ACLParser.NULL) | (1 << ACLParser.MINUS))) !== 0) || _la === ACLParser.NOT || _la === ACLParser.LBRACE) {
				{
				{
				this.state = 118;
				this.statement();
				}
				}
				this.state = 123;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 124;
			this.match(ACLParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ACLParser.RULE_statement);
		try {
			this.state = 140;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 126;
				this.variableDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 127;
				this.expression();
				this.state = 128;
				this.match(ACLParser.SEMI);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 130;
				this.ifStatement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 131;
				this.whileLoop();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 132;
				this.forLoop();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 133;
				this.waitStatement();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 134;
				this.block();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 135;
				this.returnStatement();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 136;
				this.match(ACLParser.BREAK);
				this.state = 137;
				this.match(ACLParser.SEMI);
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 138;
				this.match(ACLParser.CONTINUE);
				this.state = 139;
				this.match(ACLParser.SEMI);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whileLoop(): WhileLoopContext {
		let _localctx: WhileLoopContext = new WhileLoopContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ACLParser.RULE_whileLoop);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 142;
			this.match(ACLParser.WHILE);
			this.state = 143;
			this.match(ACLParser.LPAREN);
			this.state = 144;
			this.expression();
			this.state = 145;
			this.match(ACLParser.RPAREN);
			this.state = 146;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forLoop(): ForLoopContext {
		let _localctx: ForLoopContext = new ForLoopContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ACLParser.RULE_forLoop);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 148;
			this.match(ACLParser.FOR);
			this.state = 149;
			this.match(ACLParser.LPAREN);
			this.state = 150;
			this.match(ACLParser.ID);
			this.state = 151;
			this.match(ACLParser.IN);
			this.state = 152;
			this.expression();
			this.state = 153;
			this.match(ACLParser.RPAREN);
			this.state = 154;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifStatement(): IfStatementContext {
		let _localctx: IfStatementContext = new IfStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ACLParser.RULE_ifStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 156;
			this.match(ACLParser.IF);
			this.state = 157;
			this.match(ACLParser.LPAREN);
			this.state = 158;
			this.expression();
			this.state = 159;
			this.match(ACLParser.RPAREN);
			this.state = 160;
			this.block();
			this.state = 164;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.ELIF) {
				{
				{
				this.state = 161;
				this.elifStatement();
				}
				}
				this.state = 166;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 168;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ACLParser.ELSE) {
				{
				this.state = 167;
				this.elseStatement();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elifBlock(): ElifBlockContext {
		let _localctx: ElifBlockContext = new ElifBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ACLParser.RULE_elifBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 173;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.ELIF) {
				{
				{
				this.state = 170;
				this.elifStatement();
				}
				}
				this.state = 175;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 177;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ACLParser.ELSE) {
				{
				this.state = 176;
				this.elseStatement();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elifStatement(): ElifStatementContext {
		let _localctx: ElifStatementContext = new ElifStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ACLParser.RULE_elifStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 179;
			this.match(ACLParser.ELIF);
			this.state = 180;
			this.match(ACLParser.LPAREN);
			this.state = 181;
			this.expression();
			this.state = 182;
			this.match(ACLParser.RPAREN);
			this.state = 183;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elseStatement(): ElseStatementContext {
		let _localctx: ElseStatementContext = new ElseStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ACLParser.RULE_elseStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 185;
			this.match(ACLParser.ELSE);
			this.state = 186;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public returnStatement(): ReturnStatementContext {
		let _localctx: ReturnStatementContext = new ReturnStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ACLParser.RULE_returnStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 188;
			this.match(ACLParser.RETURN);
			this.state = 190;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 17)) & ~0x1F) === 0 && ((1 << (_la - 17)) & ((1 << (ACLParser.ID - 17)) | (1 << (ACLParser.SELF - 17)) | (1 << (ACLParser.DOT - 17)) | (1 << (ACLParser.NUMBER - 17)) | (1 << (ACLParser.FLOAT - 17)) | (1 << (ACLParser.STRING - 17)) | (1 << (ACLParser.BOOL - 17)) | (1 << (ACLParser.NULL - 17)) | (1 << (ACLParser.MINUS - 17)) | (1 << (ACLParser.NOT - 17)))) !== 0)) {
				{
				this.state = 189;
				this.expression();
				}
			}

			this.state = 192;
			this.match(ACLParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public waitStatement(): WaitStatementContext {
		let _localctx: WaitStatementContext = new WaitStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, ACLParser.RULE_waitStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 194;
			this.match(ACLParser.WAIT);
			this.state = 195;
			this.expression();
			this.state = 196;
			this.match(ACLParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, ACLParser.RULE_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 198;
			this.assignmentExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignmentExpression(): AssignmentExpressionContext {
		let _localctx: AssignmentExpressionContext = new AssignmentExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, ACLParser.RULE_assignmentExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 200;
			this.logicalOrExpression();
			this.state = 203;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (ACLParser.ASSIGN - 21)) | (1 << (ACLParser.PLUS_ASSIGN - 21)) | (1 << (ACLParser.MINUS_ASSIGN - 21)) | (1 << (ACLParser.MULTIPLY_ASSIGN - 21)) | (1 << (ACLParser.DIVIDE_ASSIGN - 21)))) !== 0)) {
				{
				this.state = 201;
				_la = this._input.LA(1);
				if (!(((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (ACLParser.ASSIGN - 21)) | (1 << (ACLParser.PLUS_ASSIGN - 21)) | (1 << (ACLParser.MINUS_ASSIGN - 21)) | (1 << (ACLParser.MULTIPLY_ASSIGN - 21)) | (1 << (ACLParser.DIVIDE_ASSIGN - 21)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 202;
				this.assignmentExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public logicalOrExpression(): LogicalOrExpressionContext {
		let _localctx: LogicalOrExpressionContext = new LogicalOrExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ACLParser.RULE_logicalOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 205;
			this.logicalAndExpression();
			this.state = 210;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.OR) {
				{
				{
				this.state = 206;
				this.match(ACLParser.OR);
				this.state = 207;
				this.logicalAndExpression();
				}
				}
				this.state = 212;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public logicalAndExpression(): LogicalAndExpressionContext {
		let _localctx: LogicalAndExpressionContext = new LogicalAndExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, ACLParser.RULE_logicalAndExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 213;
			this.equalityExpression();
			this.state = 218;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.AND) {
				{
				{
				this.state = 214;
				this.match(ACLParser.AND);
				this.state = 215;
				this.equalityExpression();
				}
				}
				this.state = 220;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public equalityExpression(): EqualityExpressionContext {
		let _localctx: EqualityExpressionContext = new EqualityExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, ACLParser.RULE_equalityExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 221;
			this.relationalExpression();
			this.state = 226;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.EQUALS || _la === ACLParser.NOT_EQUALS) {
				{
				{
				this.state = 222;
				_la = this._input.LA(1);
				if (!(_la === ACLParser.EQUALS || _la === ACLParser.NOT_EQUALS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 223;
				this.relationalExpression();
				}
				}
				this.state = 228;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relationalExpression(): RelationalExpressionContext {
		let _localctx: RelationalExpressionContext = new RelationalExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, ACLParser.RULE_relationalExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 229;
			this.additiveExpression();
			this.state = 234;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (ACLParser.LESS - 40)) | (1 << (ACLParser.LESS_EQUAL - 40)) | (1 << (ACLParser.GREATER - 40)) | (1 << (ACLParser.GREATER_EQUAL - 40)))) !== 0)) {
				{
				{
				this.state = 230;
				_la = this._input.LA(1);
				if (!(((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (ACLParser.LESS - 40)) | (1 << (ACLParser.LESS_EQUAL - 40)) | (1 << (ACLParser.GREATER - 40)) | (1 << (ACLParser.GREATER_EQUAL - 40)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 231;
				this.additiveExpression();
				}
				}
				this.state = 236;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public additiveExpression(): AdditiveExpressionContext {
		let _localctx: AdditiveExpressionContext = new AdditiveExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, ACLParser.RULE_additiveExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 237;
			this.multiplicativeExpression();
			this.state = 242;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.PLUS || _la === ACLParser.MINUS) {
				{
				{
				this.state = 238;
				_la = this._input.LA(1);
				if (!(_la === ACLParser.PLUS || _la === ACLParser.MINUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 239;
				this.multiplicativeExpression();
				}
				}
				this.state = 244;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multiplicativeExpression(): MultiplicativeExpressionContext {
		let _localctx: MultiplicativeExpressionContext = new MultiplicativeExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, ACLParser.RULE_multiplicativeExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 245;
			this.unaryExpression();
			this.state = 250;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.MULTIPLY || _la === ACLParser.DIVIDE) {
				{
				{
				this.state = 246;
				_la = this._input.LA(1);
				if (!(_la === ACLParser.MULTIPLY || _la === ACLParser.DIVIDE)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 247;
				this.unaryExpression();
				}
				}
				this.state = 252;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unaryExpression(): UnaryExpressionContext {
		let _localctx: UnaryExpressionContext = new UnaryExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, ACLParser.RULE_unaryExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 254;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ACLParser.MINUS || _la === ACLParser.NOT) {
				{
				this.state = 253;
				_la = this._input.LA(1);
				if (!(_la === ACLParser.MINUS || _la === ACLParser.NOT)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 256;
			this.postfixExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public postfixExpression(): PostfixExpressionContext {
		let _localctx: PostfixExpressionContext = new PostfixExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, ACLParser.RULE_postfixExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 258;
			this.primaryExpression();
			this.state = 262;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.ID || _la === ACLParser.DOT) {
				{
				{
				this.state = 259;
				this.postfixOperator();
				}
				}
				this.state = 264;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public postfixOperator(): PostfixOperatorContext {
		let _localctx: PostfixOperatorContext = new PostfixOperatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, ACLParser.RULE_postfixOperator);
		try {
			this.state = 267;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 265;
				this.methodCall();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 266;
				this.fieldAccess();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodCall(): MethodCallContext {
		let _localctx: MethodCallContext = new MethodCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, ACLParser.RULE_methodCall);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 272;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ACLParser.DOT:
				{
				this.state = 269;
				this.match(ACLParser.DOT);
				this.state = 270;
				this.match(ACLParser.ID);
				}
				break;
			case ACLParser.ID:
				{
				this.state = 271;
				this.match(ACLParser.ID);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 274;
			this.match(ACLParser.LPAREN);
			this.state = 276;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 17)) & ~0x1F) === 0 && ((1 << (_la - 17)) & ((1 << (ACLParser.ID - 17)) | (1 << (ACLParser.SELF - 17)) | (1 << (ACLParser.DOT - 17)) | (1 << (ACLParser.NUMBER - 17)) | (1 << (ACLParser.FLOAT - 17)) | (1 << (ACLParser.STRING - 17)) | (1 << (ACLParser.BOOL - 17)) | (1 << (ACLParser.NULL - 17)) | (1 << (ACLParser.MINUS - 17)) | (1 << (ACLParser.NOT - 17)))) !== 0)) {
				{
				this.state = 275;
				this.argumentList();
				}
			}

			this.state = 278;
			this.match(ACLParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldAccess(): FieldAccessContext {
		let _localctx: FieldAccessContext = new FieldAccessContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, ACLParser.RULE_fieldAccess);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 280;
			this.match(ACLParser.DOT);
			this.state = 281;
			this.match(ACLParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primaryExpression(): PrimaryExpressionContext {
		let _localctx: PrimaryExpressionContext = new PrimaryExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, ACLParser.RULE_primaryExpression);
		try {
			this.state = 287;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 283;
				this.literal();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 284;
				this.match(ACLParser.SELF);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 285;
				this.match(ACLParser.ID);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 286;
				this.methodCall();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, ACLParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 289;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ACLParser.NUMBER) | (1 << ACLParser.FLOAT) | (1 << ACLParser.STRING) | (1 << ACLParser.BOOL) | (1 << ACLParser.NULL))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public argumentList(): ArgumentListContext {
		let _localctx: ArgumentListContext = new ArgumentListContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, ACLParser.RULE_argumentList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 291;
			this.expression();
			this.state = 296;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.COMMA) {
				{
				{
				this.state = 292;
				this.match(ACLParser.COMMA);
				this.state = 293;
				this.expression();
				}
				}
				this.state = 298;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x037\u012E\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x03\x02" +
		"\x07\x02F\n\x02\f\x02\x0E\x02I\v\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03" +
		"\x05\x07\x05Y\n\x05\f\x05\x0E\x05\\\v\x05\x03\x06\x05\x06_\n\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07" +
		"\x05\x07k\n\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x07\bs\n\b\f" +
		"\b\x0E\bv\v\b\x03\t\x03\t\x07\tz\n\t\f\t\x0E\t}\v\t\x03\t\x03\t\x03\n" +
		"\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x05\n\x8F\n\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f" +
		"\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
		"\r\x07\r\xA5\n\r\f\r\x0E\r\xA8\v\r\x03\r\x05\r\xAB\n\r\x03\x0E\x07\x0E" +
		"\xAE\n\x0E\f\x0E\x0E\x0E\xB1\v\x0E\x03\x0E\x05\x0E\xB4\n\x0E\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x11\x03" +
		"\x11\x05\x11\xC1\n\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x05\x14\xCE\n\x14\x03\x15\x03" +
		"\x15\x03\x15\x07\x15\xD3\n\x15\f\x15\x0E\x15\xD6\v\x15\x03\x16\x03\x16" +
		"\x03\x16\x07\x16\xDB\n\x16\f\x16\x0E\x16\xDE\v\x16\x03\x17\x03\x17\x03" +
		"\x17\x07\x17\xE3\n\x17\f\x17\x0E\x17\xE6\v\x17\x03\x18\x03\x18\x03\x18" +
		"\x07\x18\xEB\n\x18\f\x18\x0E\x18\xEE\v\x18\x03\x19\x03\x19\x03\x19\x07" +
		"\x19\xF3\n\x19\f\x19\x0E\x19\xF6\v\x19\x03\x1A\x03\x1A\x03\x1A\x07\x1A" +
		"\xFB\n\x1A\f\x1A\x0E\x1A\xFE\v\x1A\x03\x1B\x05\x1B\u0101\n\x1B\x03\x1B" +
		"\x03\x1B\x03\x1C\x03\x1C\x07\x1C\u0107\n\x1C\f\x1C\x0E\x1C\u010A\v\x1C" +
		"\x03\x1D\x03\x1D\x05\x1D\u010E\n\x1D\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u0113" +
		"\n\x1E\x03\x1E\x03\x1E\x05\x1E\u0117\n\x1E\x03\x1E\x03\x1E\x03\x1F\x03" +
		"\x1F\x03\x1F\x03 \x03 \x03 \x03 \x05 \u0122\n \x03!\x03!\x03\"\x03\"\x03" +
		"\"\x07\"\u0129\n\"\f\"\x0E\"\u012C\v\"\x03\"\x02\x02\x02#\x02\x02\x04" +
		"\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02" +
		"\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02." +
		"\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02\x02\v\x03\x02\x03" +
		"\x06\x03\x02\x07\b\x04\x02\x17\x17$\'\x03\x02()\x03\x02*-\x03\x02 !\x03" +
		"\x02\"#\x04\x02!!00\x03\x02\x1B\x1F\x02\u0131\x02G\x03\x02\x02\x02\x04" +
		"J\x03\x02\x02\x02\x06P\x03\x02\x02\x02\bZ\x03\x02\x02\x02\n^\x03\x02\x02" +
		"\x02\ff\x03\x02\x02\x02\x0Eo\x03\x02\x02\x02\x10w\x03\x02\x02\x02\x12" +
		"\x8E\x03\x02\x02\x02\x14\x90\x03\x02\x02\x02\x16\x96\x03\x02\x02\x02\x18" +
		"\x9E\x03\x02\x02\x02\x1A\xAF\x03\x02\x02\x02\x1C\xB5\x03\x02\x02\x02\x1E" +
		"\xBB\x03\x02\x02\x02 \xBE\x03\x02\x02\x02\"\xC4\x03\x02\x02\x02$\xC8\x03" +
		"\x02\x02\x02&\xCA\x03\x02\x02\x02(\xCF\x03\x02\x02\x02*\xD7\x03\x02\x02" +
		"\x02,\xDF\x03\x02\x02\x02.\xE7\x03\x02\x02\x020\xEF\x03\x02\x02\x022\xF7" +
		"\x03\x02\x02\x024\u0100\x03\x02\x02\x026\u0104\x03\x02\x02\x028\u010D" +
		"\x03\x02\x02\x02:\u0112\x03\x02\x02\x02<\u011A\x03\x02\x02\x02>\u0121" +
		"\x03\x02\x02\x02@\u0123\x03\x02\x02\x02B\u0125\x03\x02\x02\x02DF\x05\x06" +
		"\x04\x02ED\x03\x02\x02\x02FI\x03\x02\x02\x02GE\x03\x02\x02\x02GH\x03\x02" +
		"\x02\x02H\x03\x03\x02\x02\x02IG\x03\x02\x02\x02JK\x07\x03\x02\x02KL\x07" +
		"\x1A\x02\x02LM\x071\x02\x02MN\x05\b\x05\x02NO\x072\x02\x02O\x05\x03\x02" +
		"\x02\x02PQ\t\x02\x02\x02QR\x07\x13\x02\x02RS\x071\x02\x02ST\x05\b\x05" +
		"\x02TU\x072\x02\x02U\x07\x03\x02\x02\x02VY\x05\n\x06\x02WY\x05\f\x07\x02" +
		"XV\x03\x02\x02\x02XW\x03\x02\x02\x02Y\\\x03\x02\x02\x02ZX\x03\x02\x02" +
		"\x02Z[\x03\x02\x02\x02[\t\x03\x02\x02\x02\\Z\x03\x02\x02\x02]_\x07\x14" +
		"\x02\x02^]\x03\x02\x02\x02^_\x03\x02\x02\x02_`\x03\x02\x02\x02`a\x07\x13" +
		"\x02\x02ab\x07\x17\x02\x02bc\x05$\x13\x02cd\x03\x02\x02\x02de\x07\x18" +
		"\x02\x02e\v\x03\x02\x02\x02fg\t\x03\x02\x02gh\x07\x13\x02\x02hj\x073\x02" +
		"\x02ik\x05\x0E\b\x02ji\x03\x02\x02\x02jk\x03\x02\x02\x02kl\x03\x02\x02" +
		"\x02lm\x074\x02\x02mn\x05\x10\t\x02n\r\x03\x02\x02\x02ot\x07\x13\x02\x02" +
		"pq\x07\x19\x02\x02qs\x07\x13\x02\x02rp\x03\x02\x02\x02sv\x03\x02\x02\x02" +
		"tr\x03\x02\x02\x02tu\x03\x02\x02\x02u\x0F\x03\x02\x02\x02vt\x03\x02\x02" +
		"\x02w{\x071\x02\x02xz\x05\x12\n\x02yx\x03\x02\x02\x02z}\x03\x02\x02\x02" +
		"{y\x03\x02\x02\x02{|\x03\x02\x02\x02|~\x03\x02\x02\x02}{\x03\x02\x02\x02" +
		"~\x7F\x072\x02\x02\x7F\x11\x03\x02\x02\x02\x80\x8F\x05\n\x06\x02\x81\x82" +
		"\x05$\x13\x02\x82\x83\x07\x18\x02\x02\x83\x8F\x03\x02\x02\x02\x84\x8F" +
		"\x05\x18\r\x02\x85\x8F\x05\x14\v\x02\x86\x8F\x05\x16\f\x02\x87\x8F\x05" +
		"\"\x12\x02\x88\x8F\x05\x10\t\x02\x89\x8F\x05 \x11\x02\x8A\x8B\x07\x11" +
		"\x02\x02\x8B\x8F\x07\x18\x02\x02\x8C\x8D\x07\x12\x02\x02\x8D\x8F\x07\x18" +
		"\x02\x02\x8E\x80\x03\x02\x02\x02\x8E\x81\x03\x02\x02\x02\x8E\x84\x03\x02" +
		"\x02\x02\x8E\x85\x03\x02\x02\x02\x8E\x86\x03\x02\x02\x02\x8E\x87\x03\x02" +
		"\x02\x02\x8E\x88\x03\x02\x02\x02\x8E\x89\x03\x02\x02\x02\x8E\x8A\x03\x02" +
		"\x02\x02\x8E\x8C\x03\x02\x02\x02\x8F\x13\x03\x02\x02\x02\x90\x91\x07\t" +
		"\x02\x02\x91\x92\x073\x02\x02\x92\x93\x05$\x13\x02\x93\x94\x074\x02\x02" +
		"\x94\x95\x05\x10\t\x02\x95\x15\x03\x02\x02\x02\x96\x97\x07\n\x02\x02\x97" +
		"\x98\x073\x02\x02\x98\x99\x07\x13\x02\x02\x99\x9A\x07\v\x02\x02\x9A\x9B" +
		"\x05$\x13\x02\x9B\x9C\x074\x02\x02\x9C\x9D\x05\x10\t\x02\x9D\x17\x03\x02" +
		"\x02\x02\x9E\x9F\x07\f\x02\x02\x9F\xA0\x073\x02\x02\xA0\xA1\x05$\x13\x02" +
		"\xA1\xA2\x074\x02\x02\xA2\xA6\x05\x10\t\x02\xA3\xA5\x05\x1C\x0F\x02\xA4" +
		"\xA3\x03\x02\x02\x02\xA5\xA8\x03\x02\x02\x02\xA6\xA4\x03\x02\x02\x02\xA6" +
		"\xA7\x03\x02\x02\x02\xA7\xAA\x03\x02\x02\x02\xA8\xA6\x03\x02\x02\x02\xA9" +
		"\xAB\x05\x1E\x10\x02\xAA\xA9\x03\x02\x02\x02\xAA\xAB\x03\x02\x02\x02\xAB" +
		"\x19\x03\x02\x02\x02\xAC\xAE\x05\x1C\x0F\x02\xAD\xAC\x03\x02\x02\x02\xAE" +
		"\xB1\x03\x02\x02\x02\xAF\xAD\x03\x02\x02\x02\xAF\xB0\x03\x02\x02\x02\xB0" +
		"\xB3\x03\x02\x02\x02\xB1\xAF\x03\x02\x02\x02\xB2\xB4\x05\x1E\x10\x02\xB3" +
		"\xB2\x03\x02\x02\x02\xB3\xB4\x03\x02\x02\x02\xB4\x1B\x03\x02\x02\x02\xB5" +
		"\xB6\x07\r\x02\x02\xB6\xB7\x073\x02\x02\xB7\xB8\x05$\x13\x02\xB8\xB9\x07" +
		"4\x02\x02\xB9\xBA\x05\x10\t\x02\xBA\x1D\x03\x02\x02\x02\xBB\xBC\x07\x0E" +
		"\x02\x02\xBC\xBD\x05\x10\t\x02\xBD\x1F\x03\x02\x02\x02\xBE\xC0\x07\x10" +
		"\x02\x02\xBF\xC1\x05$\x13\x02\xC0\xBF\x03\x02\x02\x02\xC0\xC1\x03\x02" +
		"\x02\x02\xC1\xC2\x03\x02\x02\x02\xC2\xC3\x07\x18\x02\x02\xC3!\x03\x02" +
		"\x02\x02\xC4\xC5\x07\x0F\x02\x02\xC5\xC6\x05$\x13\x02\xC6\xC7\x07\x18" +
		"\x02\x02\xC7#\x03\x02\x02\x02\xC8\xC9\x05&\x14\x02\xC9%\x03\x02\x02\x02" +
		"\xCA\xCD\x05(\x15\x02\xCB\xCC\t\x04\x02\x02\xCC\xCE\x05&\x14\x02\xCD\xCB" +
		"\x03\x02\x02\x02\xCD\xCE\x03\x02\x02\x02\xCE\'\x03\x02\x02\x02\xCF\xD4" +
		"\x05*\x16\x02\xD0\xD1\x07/\x02\x02\xD1\xD3\x05*\x16\x02\xD2\xD0\x03\x02" +
		"\x02\x02\xD3\xD6\x03\x02\x02\x02\xD4\xD2\x03\x02\x02\x02\xD4\xD5\x03\x02" +
		"\x02\x02\xD5)\x03\x02\x02\x02\xD6\xD4\x03\x02\x02\x02\xD7\xDC\x05,\x17" +
		"\x02\xD8\xD9\x07.\x02\x02\xD9\xDB\x05,\x17\x02\xDA\xD8\x03\x02\x02\x02" +
		"\xDB\xDE\x03\x02\x02\x02\xDC\xDA\x03\x02\x02\x02\xDC\xDD\x03\x02\x02\x02" +
		"\xDD+\x03\x02\x02\x02\xDE\xDC\x03\x02\x02\x02\xDF\xE4\x05.\x18\x02\xE0" +
		"\xE1\t\x05\x02\x02\xE1\xE3\x05.\x18\x02\xE2\xE0\x03\x02\x02\x02\xE3\xE6" +
		"\x03\x02\x02\x02\xE4\xE2\x03\x02\x02\x02\xE4\xE5\x03\x02\x02\x02\xE5-" +
		"\x03\x02\x02\x02\xE6\xE4\x03\x02\x02\x02\xE7\xEC\x050\x19\x02\xE8\xE9" +
		"\t\x06\x02\x02\xE9\xEB\x050\x19\x02\xEA\xE8\x03\x02\x02\x02\xEB\xEE\x03" +
		"\x02\x02\x02\xEC\xEA\x03\x02\x02\x02\xEC\xED\x03\x02\x02\x02\xED/\x03" +
		"\x02\x02\x02\xEE\xEC\x03\x02\x02\x02\xEF\xF4\x052\x1A\x02\xF0\xF1\t\x07" +
		"\x02\x02\xF1\xF3\x052\x1A\x02\xF2\xF0\x03\x02\x02\x02\xF3\xF6\x03\x02" +
		"\x02\x02\xF4\xF2\x03\x02\x02\x02\xF4\xF5\x03\x02\x02\x02\xF51\x03\x02" +
		"\x02\x02\xF6\xF4\x03\x02\x02\x02\xF7\xFC\x054\x1B\x02\xF8\xF9\t\b\x02" +
		"\x02\xF9\xFB\x054\x1B\x02\xFA\xF8\x03\x02\x02\x02\xFB\xFE\x03\x02\x02" +
		"\x02\xFC\xFA\x03\x02\x02\x02\xFC\xFD\x03\x02\x02\x02\xFD3\x03\x02\x02" +
		"\x02\xFE\xFC\x03\x02\x02\x02\xFF\u0101\t\t\x02\x02\u0100\xFF\x03\x02\x02" +
		"\x02\u0100\u0101\x03\x02\x02\x02\u0101\u0102\x03\x02\x02\x02\u0102\u0103" +
		"\x056\x1C\x02\u01035\x03\x02\x02\x02\u0104\u0108\x05> \x02\u0105\u0107" +
		"\x058\x1D\x02\u0106\u0105\x03\x02\x02\x02\u0107\u010A\x03\x02\x02\x02" +
		"\u0108\u0106\x03\x02\x02\x02\u0108\u0109\x03\x02\x02\x02\u01097\x03\x02" +
		"\x02\x02\u010A\u0108\x03\x02\x02\x02\u010B\u010E\x05:\x1E\x02\u010C\u010E" +
		"\x05<\x1F\x02\u010D\u010B\x03\x02\x02\x02\u010D\u010C\x03\x02\x02\x02" +
		"\u010E9\x03\x02\x02\x02\u010F\u0110\x07\x16\x02\x02\u0110\u0113\x07\x13" +
		"\x02\x02\u0111\u0113\x07\x13\x02\x02\u0112\u010F\x03\x02\x02\x02\u0112" +
		"\u0111\x03\x02\x02\x02\u0113\u0114\x03\x02\x02\x02\u0114\u0116\x073\x02" +
		"\x02\u0115\u0117\x05B\"\x02\u0116\u0115\x03\x02\x02\x02\u0116\u0117\x03" +
		"\x02\x02\x02\u0117\u0118\x03\x02\x02\x02\u0118\u0119\x074\x02\x02\u0119" +
		";\x03\x02\x02\x02\u011A\u011B\x07\x16\x02\x02\u011B\u011C\x07\x13\x02" +
		"\x02\u011C=\x03\x02\x02\x02\u011D\u0122\x05@!\x02\u011E\u0122\x07\x15" +
		"\x02\x02\u011F\u0122\x07\x13\x02\x02\u0120\u0122\x05:\x1E\x02\u0121\u011D" +
		"\x03\x02\x02\x02\u0121\u011E\x03\x02\x02\x02\u0121\u011F\x03\x02\x02\x02" +
		"\u0121\u0120\x03\x02\x02\x02\u0122?\x03\x02\x02\x02\u0123\u0124\t\n\x02" +
		"\x02\u0124A\x03\x02\x02\x02\u0125\u012A\x05$\x13\x02\u0126\u0127\x07\x19" +
		"\x02\x02\u0127\u0129\x05$\x13\x02\u0128\u0126\x03\x02\x02\x02\u0129\u012C" +
		"\x03\x02\x02\x02\u012A\u0128\x03\x02\x02\x02\u012A\u012B\x03\x02\x02\x02" +
		"\u012BC\x03\x02\x02\x02\u012C\u012A\x03\x02\x02\x02\x1DGXZ^jt{\x8E\xA6" +
		"\xAA\xAF\xB3\xC0\xCD\xD4\xDC\xE4\xEC\xF4\xFC\u0100\u0108\u010D\u0112\u0116" +
		"\u0121\u012A";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ACLParser.__ATN) {
			ACLParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ACLParser._serializedATN));
		}

		return ACLParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public classDecl(): ClassDeclContext[];
	public classDecl(i: number): ClassDeclContext;
	public classDecl(i?: number): ClassDeclContext | ClassDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassDeclContext);
		} else {
			return this.getRuleContext(i, ClassDeclContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_program; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EntryPointDeclContext extends ParserRuleContext {
	public CLASS(): TerminalNode { return this.getToken(ACLParser.CLASS, 0); }
	public MAIN(): TerminalNode { return this.getToken(ACLParser.MAIN, 0); }
	public LBRACE(): TerminalNode { return this.getToken(ACLParser.LBRACE, 0); }
	public classBody(): ClassBodyContext {
		return this.getRuleContext(0, ClassBodyContext);
	}
	public RBRACE(): TerminalNode { return this.getToken(ACLParser.RBRACE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_entryPointDecl; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterEntryPointDecl) {
			listener.enterEntryPointDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitEntryPointDecl) {
			listener.exitEntryPointDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitEntryPointDecl) {
			return visitor.visitEntryPointDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassDeclContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ACLParser.ID, 0); }
	public LBRACE(): TerminalNode { return this.getToken(ACLParser.LBRACE, 0); }
	public classBody(): ClassBodyContext {
		return this.getRuleContext(0, ClassBodyContext);
	}
	public RBRACE(): TerminalNode { return this.getToken(ACLParser.RBRACE, 0); }
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(ACLParser.CLASS, 0); }
	public COMPONENT(): TerminalNode | undefined { return this.tryGetToken(ACLParser.COMPONENT, 0); }
	public EXTENSION(): TerminalNode | undefined { return this.tryGetToken(ACLParser.EXTENSION, 0); }
	public CUTSCENE(): TerminalNode | undefined { return this.tryGetToken(ACLParser.CUTSCENE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_classDecl; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterClassDecl) {
			listener.enterClassDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitClassDecl) {
			listener.exitClassDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitClassDecl) {
			return visitor.visitClassDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassBodyContext extends ParserRuleContext {
	public variableDecl(): VariableDeclContext[];
	public variableDecl(i: number): VariableDeclContext;
	public variableDecl(i?: number): VariableDeclContext | VariableDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableDeclContext);
		} else {
			return this.getRuleContext(i, VariableDeclContext);
		}
	}
	public methodDecl(): MethodDeclContext[];
	public methodDecl(i: number): MethodDeclContext;
	public methodDecl(i?: number): MethodDeclContext | MethodDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MethodDeclContext);
		} else {
			return this.getRuleContext(i, MethodDeclContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_classBody; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterClassBody) {
			listener.enterClassBody(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitClassBody) {
			listener.exitClassBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitClassBody) {
			return visitor.visitClassBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableDeclContext extends ParserRuleContext {
	public SEMI(): TerminalNode { return this.getToken(ACLParser.SEMI, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(ACLParser.ID, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ACLParser.ASSIGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public PRIVATE(): TerminalNode | undefined { return this.tryGetToken(ACLParser.PRIVATE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_variableDecl; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterVariableDecl) {
			listener.enterVariableDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitVariableDecl) {
			listener.exitVariableDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitVariableDecl) {
			return visitor.visitVariableDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodDeclContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ACLParser.ID, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ACLParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ACLParser.RPAREN, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public FUNCTION(): TerminalNode | undefined { return this.tryGetToken(ACLParser.FUNCTION, 0); }
	public COROUTINE(): TerminalNode | undefined { return this.tryGetToken(ACLParser.COROUTINE, 0); }
	public paramList(): ParamListContext | undefined {
		return this.tryGetRuleContext(0, ParamListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_methodDecl; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterMethodDecl) {
			listener.enterMethodDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitMethodDecl) {
			listener.exitMethodDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitMethodDecl) {
			return visitor.visitMethodDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamListContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.ID);
		} else {
			return this.getToken(ACLParser.ID, i);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.COMMA);
		} else {
			return this.getToken(ACLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_paramList; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterParamList) {
			listener.enterParamList(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitParamList) {
			listener.exitParamList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitParamList) {
			return visitor.visitParamList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ACLParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ACLParser.RBRACE, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_block; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterBlock) {
			listener.enterBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitBlock) {
			listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public variableDecl(): VariableDeclContext | undefined {
		return this.tryGetRuleContext(0, VariableDeclContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ACLParser.SEMI, 0); }
	public ifStatement(): IfStatementContext | undefined {
		return this.tryGetRuleContext(0, IfStatementContext);
	}
	public whileLoop(): WhileLoopContext | undefined {
		return this.tryGetRuleContext(0, WhileLoopContext);
	}
	public forLoop(): ForLoopContext | undefined {
		return this.tryGetRuleContext(0, ForLoopContext);
	}
	public waitStatement(): WaitStatementContext | undefined {
		return this.tryGetRuleContext(0, WaitStatementContext);
	}
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public returnStatement(): ReturnStatementContext | undefined {
		return this.tryGetRuleContext(0, ReturnStatementContext);
	}
	public BREAK(): TerminalNode | undefined { return this.tryGetToken(ACLParser.BREAK, 0); }
	public CONTINUE(): TerminalNode | undefined { return this.tryGetToken(ACLParser.CONTINUE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_statement; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhileLoopContext extends ParserRuleContext {
	public WHILE(): TerminalNode { return this.getToken(ACLParser.WHILE, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ACLParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ACLParser.RPAREN, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_whileLoop; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterWhileLoop) {
			listener.enterWhileLoop(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitWhileLoop) {
			listener.exitWhileLoop(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitWhileLoop) {
			return visitor.visitWhileLoop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForLoopContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(ACLParser.FOR, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ACLParser.LPAREN, 0); }
	public ID(): TerminalNode { return this.getToken(ACLParser.ID, 0); }
	public IN(): TerminalNode { return this.getToken(ACLParser.IN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ACLParser.RPAREN, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_forLoop; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterForLoop) {
			listener.enterForLoop(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitForLoop) {
			listener.exitForLoop(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitForLoop) {
			return visitor.visitForLoop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfStatementContext extends ParserRuleContext {
	public IF(): TerminalNode { return this.getToken(ACLParser.IF, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ACLParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ACLParser.RPAREN, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public elifStatement(): ElifStatementContext[];
	public elifStatement(i: number): ElifStatementContext;
	public elifStatement(i?: number): ElifStatementContext | ElifStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ElifStatementContext);
		} else {
			return this.getRuleContext(i, ElifStatementContext);
		}
	}
	public elseStatement(): ElseStatementContext | undefined {
		return this.tryGetRuleContext(0, ElseStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_ifStatement; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterIfStatement) {
			listener.enterIfStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitIfStatement) {
			listener.exitIfStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitIfStatement) {
			return visitor.visitIfStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElifBlockContext extends ParserRuleContext {
	public elifStatement(): ElifStatementContext[];
	public elifStatement(i: number): ElifStatementContext;
	public elifStatement(i?: number): ElifStatementContext | ElifStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ElifStatementContext);
		} else {
			return this.getRuleContext(i, ElifStatementContext);
		}
	}
	public elseStatement(): ElseStatementContext | undefined {
		return this.tryGetRuleContext(0, ElseStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_elifBlock; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterElifBlock) {
			listener.enterElifBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitElifBlock) {
			listener.exitElifBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitElifBlock) {
			return visitor.visitElifBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElifStatementContext extends ParserRuleContext {
	public ELIF(): TerminalNode { return this.getToken(ACLParser.ELIF, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ACLParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ACLParser.RPAREN, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_elifStatement; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterElifStatement) {
			listener.enterElifStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitElifStatement) {
			listener.exitElifStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitElifStatement) {
			return visitor.visitElifStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElseStatementContext extends ParserRuleContext {
	public ELSE(): TerminalNode { return this.getToken(ACLParser.ELSE, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_elseStatement; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterElseStatement) {
			listener.enterElseStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitElseStatement) {
			listener.exitElseStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitElseStatement) {
			return visitor.visitElseStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnStatementContext extends ParserRuleContext {
	public RETURN(): TerminalNode { return this.getToken(ACLParser.RETURN, 0); }
	public SEMI(): TerminalNode { return this.getToken(ACLParser.SEMI, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_returnStatement; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterReturnStatement) {
			listener.enterReturnStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitReturnStatement) {
			listener.exitReturnStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitReturnStatement) {
			return visitor.visitReturnStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WaitStatementContext extends ParserRuleContext {
	public WAIT(): TerminalNode { return this.getToken(ACLParser.WAIT, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public SEMI(): TerminalNode { return this.getToken(ACLParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_waitStatement; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterWaitStatement) {
			listener.enterWaitStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitWaitStatement) {
			listener.exitWaitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitWaitStatement) {
			return visitor.visitWaitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getRuleContext(0, AssignmentExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_expression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentExpressionContext extends ParserRuleContext {
	public logicalOrExpression(): LogicalOrExpressionContext {
		return this.getRuleContext(0, LogicalOrExpressionContext);
	}
	public assignmentExpression(): AssignmentExpressionContext | undefined {
		return this.tryGetRuleContext(0, AssignmentExpressionContext);
	}
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ACLParser.ASSIGN, 0); }
	public PLUS_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ACLParser.PLUS_ASSIGN, 0); }
	public MINUS_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ACLParser.MINUS_ASSIGN, 0); }
	public MULTIPLY_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ACLParser.MULTIPLY_ASSIGN, 0); }
	public DIVIDE_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ACLParser.DIVIDE_ASSIGN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_assignmentExpression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterAssignmentExpression) {
			listener.enterAssignmentExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitAssignmentExpression) {
			listener.exitAssignmentExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitAssignmentExpression) {
			return visitor.visitAssignmentExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogicalOrExpressionContext extends ParserRuleContext {
	public logicalAndExpression(): LogicalAndExpressionContext[];
	public logicalAndExpression(i: number): LogicalAndExpressionContext;
	public logicalAndExpression(i?: number): LogicalAndExpressionContext | LogicalAndExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LogicalAndExpressionContext);
		} else {
			return this.getRuleContext(i, LogicalAndExpressionContext);
		}
	}
	public OR(): TerminalNode[];
	public OR(i: number): TerminalNode;
	public OR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.OR);
		} else {
			return this.getToken(ACLParser.OR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_logicalOrExpression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterLogicalOrExpression) {
			listener.enterLogicalOrExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitLogicalOrExpression) {
			listener.exitLogicalOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitLogicalOrExpression) {
			return visitor.visitLogicalOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogicalAndExpressionContext extends ParserRuleContext {
	public equalityExpression(): EqualityExpressionContext[];
	public equalityExpression(i: number): EqualityExpressionContext;
	public equalityExpression(i?: number): EqualityExpressionContext | EqualityExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EqualityExpressionContext);
		} else {
			return this.getRuleContext(i, EqualityExpressionContext);
		}
	}
	public AND(): TerminalNode[];
	public AND(i: number): TerminalNode;
	public AND(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.AND);
		} else {
			return this.getToken(ACLParser.AND, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_logicalAndExpression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterLogicalAndExpression) {
			listener.enterLogicalAndExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitLogicalAndExpression) {
			listener.exitLogicalAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitLogicalAndExpression) {
			return visitor.visitLogicalAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EqualityExpressionContext extends ParserRuleContext {
	public relationalExpression(): RelationalExpressionContext[];
	public relationalExpression(i: number): RelationalExpressionContext;
	public relationalExpression(i?: number): RelationalExpressionContext | RelationalExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RelationalExpressionContext);
		} else {
			return this.getRuleContext(i, RelationalExpressionContext);
		}
	}
	public EQUALS(): TerminalNode[];
	public EQUALS(i: number): TerminalNode;
	public EQUALS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.EQUALS);
		} else {
			return this.getToken(ACLParser.EQUALS, i);
		}
	}
	public NOT_EQUALS(): TerminalNode[];
	public NOT_EQUALS(i: number): TerminalNode;
	public NOT_EQUALS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.NOT_EQUALS);
		} else {
			return this.getToken(ACLParser.NOT_EQUALS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_equalityExpression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterEqualityExpression) {
			listener.enterEqualityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitEqualityExpression) {
			listener.exitEqualityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitEqualityExpression) {
			return visitor.visitEqualityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelationalExpressionContext extends ParserRuleContext {
	public additiveExpression(): AdditiveExpressionContext[];
	public additiveExpression(i: number): AdditiveExpressionContext;
	public additiveExpression(i?: number): AdditiveExpressionContext | AdditiveExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AdditiveExpressionContext);
		} else {
			return this.getRuleContext(i, AdditiveExpressionContext);
		}
	}
	public LESS(): TerminalNode[];
	public LESS(i: number): TerminalNode;
	public LESS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.LESS);
		} else {
			return this.getToken(ACLParser.LESS, i);
		}
	}
	public LESS_EQUAL(): TerminalNode[];
	public LESS_EQUAL(i: number): TerminalNode;
	public LESS_EQUAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.LESS_EQUAL);
		} else {
			return this.getToken(ACLParser.LESS_EQUAL, i);
		}
	}
	public GREATER(): TerminalNode[];
	public GREATER(i: number): TerminalNode;
	public GREATER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.GREATER);
		} else {
			return this.getToken(ACLParser.GREATER, i);
		}
	}
	public GREATER_EQUAL(): TerminalNode[];
	public GREATER_EQUAL(i: number): TerminalNode;
	public GREATER_EQUAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.GREATER_EQUAL);
		} else {
			return this.getToken(ACLParser.GREATER_EQUAL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_relationalExpression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterRelationalExpression) {
			listener.enterRelationalExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitRelationalExpression) {
			listener.exitRelationalExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitRelationalExpression) {
			return visitor.visitRelationalExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AdditiveExpressionContext extends ParserRuleContext {
	public multiplicativeExpression(): MultiplicativeExpressionContext[];
	public multiplicativeExpression(i: number): MultiplicativeExpressionContext;
	public multiplicativeExpression(i?: number): MultiplicativeExpressionContext | MultiplicativeExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MultiplicativeExpressionContext);
		} else {
			return this.getRuleContext(i, MultiplicativeExpressionContext);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.PLUS);
		} else {
			return this.getToken(ACLParser.PLUS, i);
		}
	}
	public MINUS(): TerminalNode[];
	public MINUS(i: number): TerminalNode;
	public MINUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.MINUS);
		} else {
			return this.getToken(ACLParser.MINUS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_additiveExpression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterAdditiveExpression) {
			listener.enterAdditiveExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitAdditiveExpression) {
			listener.exitAdditiveExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitAdditiveExpression) {
			return visitor.visitAdditiveExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultiplicativeExpressionContext extends ParserRuleContext {
	public unaryExpression(): UnaryExpressionContext[];
	public unaryExpression(i: number): UnaryExpressionContext;
	public unaryExpression(i?: number): UnaryExpressionContext | UnaryExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(UnaryExpressionContext);
		} else {
			return this.getRuleContext(i, UnaryExpressionContext);
		}
	}
	public MULTIPLY(): TerminalNode[];
	public MULTIPLY(i: number): TerminalNode;
	public MULTIPLY(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.MULTIPLY);
		} else {
			return this.getToken(ACLParser.MULTIPLY, i);
		}
	}
	public DIVIDE(): TerminalNode[];
	public DIVIDE(i: number): TerminalNode;
	public DIVIDE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.DIVIDE);
		} else {
			return this.getToken(ACLParser.DIVIDE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_multiplicativeExpression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterMultiplicativeExpression) {
			listener.enterMultiplicativeExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitMultiplicativeExpression) {
			listener.exitMultiplicativeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpression) {
			return visitor.visitMultiplicativeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnaryExpressionContext extends ParserRuleContext {
	public postfixExpression(): PostfixExpressionContext {
		return this.getRuleContext(0, PostfixExpressionContext);
	}
	public NOT(): TerminalNode | undefined { return this.tryGetToken(ACLParser.NOT, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(ACLParser.MINUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_unaryExpression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterUnaryExpression) {
			listener.enterUnaryExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitUnaryExpression) {
			listener.exitUnaryExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitUnaryExpression) {
			return visitor.visitUnaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PostfixExpressionContext extends ParserRuleContext {
	public primaryExpression(): PrimaryExpressionContext {
		return this.getRuleContext(0, PrimaryExpressionContext);
	}
	public postfixOperator(): PostfixOperatorContext[];
	public postfixOperator(i: number): PostfixOperatorContext;
	public postfixOperator(i?: number): PostfixOperatorContext | PostfixOperatorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PostfixOperatorContext);
		} else {
			return this.getRuleContext(i, PostfixOperatorContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_postfixExpression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterPostfixExpression) {
			listener.enterPostfixExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitPostfixExpression) {
			listener.exitPostfixExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitPostfixExpression) {
			return visitor.visitPostfixExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PostfixOperatorContext extends ParserRuleContext {
	public methodCall(): MethodCallContext | undefined {
		return this.tryGetRuleContext(0, MethodCallContext);
	}
	public fieldAccess(): FieldAccessContext | undefined {
		return this.tryGetRuleContext(0, FieldAccessContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_postfixOperator; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterPostfixOperator) {
			listener.enterPostfixOperator(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitPostfixOperator) {
			listener.exitPostfixOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitPostfixOperator) {
			return visitor.visitPostfixOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodCallContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ACLParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ACLParser.RPAREN, 0); }
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ACLParser.DOT, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(ACLParser.ID, 0); }
	public argumentList(): ArgumentListContext | undefined {
		return this.tryGetRuleContext(0, ArgumentListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_methodCall; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterMethodCall) {
			listener.enterMethodCall(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitMethodCall) {
			listener.exitMethodCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitMethodCall) {
			return visitor.visitMethodCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldAccessContext extends ParserRuleContext {
	public DOT(): TerminalNode { return this.getToken(ACLParser.DOT, 0); }
	public ID(): TerminalNode { return this.getToken(ACLParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_fieldAccess; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterFieldAccess) {
			listener.enterFieldAccess(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitFieldAccess) {
			listener.exitFieldAccess(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitFieldAccess) {
			return visitor.visitFieldAccess(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryExpressionContext extends ParserRuleContext {
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public SELF(): TerminalNode | undefined { return this.tryGetToken(ACLParser.SELF, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(ACLParser.ID, 0); }
	public methodCall(): MethodCallContext | undefined {
		return this.tryGetRuleContext(0, MethodCallContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_primaryExpression; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterPrimaryExpression) {
			listener.enterPrimaryExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitPrimaryExpression) {
			listener.exitPrimaryExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitPrimaryExpression) {
			return visitor.visitPrimaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public NUMBER(): TerminalNode | undefined { return this.tryGetToken(ACLParser.NUMBER, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(ACLParser.FLOAT, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(ACLParser.STRING, 0); }
	public BOOL(): TerminalNode | undefined { return this.tryGetToken(ACLParser.BOOL, 0); }
	public NULL(): TerminalNode | undefined { return this.tryGetToken(ACLParser.NULL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_literal; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentListContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ACLParser.COMMA);
		} else {
			return this.getToken(ACLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_argumentList; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterArgumentList) {
			listener.enterArgumentList(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitArgumentList) {
			listener.exitArgumentList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitArgumentList) {
			return visitor.visitArgumentList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


