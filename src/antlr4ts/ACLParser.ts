// Generated from ./src/antlr4ts/ACL.g4 by ANTLR 4.9.0-SNAPSHOT


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
	public static readonly NUMBER = 24;
	public static readonly FLOAT = 25;
	public static readonly STRING = 26;
	public static readonly BOOL = 27;
	public static readonly NULL = 28;
	public static readonly PLUS = 29;
	public static readonly MINUS = 30;
	public static readonly MULTIPLY = 31;
	public static readonly DIVIDE = 32;
	public static readonly PLUS_ASSIGN = 33;
	public static readonly MINUS_ASSIGN = 34;
	public static readonly MULTIPLY_ASSIGN = 35;
	public static readonly DIVIDE_ASSIGN = 36;
	public static readonly EQUALS = 37;
	public static readonly NOT_EQUALS = 38;
	public static readonly LESS = 39;
	public static readonly LESS_EQUAL = 40;
	public static readonly GREATER = 41;
	public static readonly GREATER_EQUAL = 42;
	public static readonly AND = 43;
	public static readonly OR = 44;
	public static readonly NOT = 45;
	public static readonly LBRACE = 46;
	public static readonly RBRACE = 47;
	public static readonly LPAREN = 48;
	public static readonly RPAREN = 49;
	public static readonly WS = 50;
	public static readonly ANNOTATION_COMMENT = 51;
	public static readonly ANNOTATION_BLOCK_COMMENT = 52;
	public static readonly COMMENT = 53;
	public static readonly BLOCK_COMMENT = 54;
	public static readonly RULE_program = 0;
	public static readonly RULE_classDecl = 1;
	public static readonly RULE_classBody = 2;
	public static readonly RULE_variableDecl = 3;
	public static readonly RULE_methodDecl = 4;
	public static readonly RULE_paramList = 5;
	public static readonly RULE_param = 6;
	public static readonly RULE_block = 7;
	public static readonly RULE_statement = 8;
	public static readonly RULE_whileLoop = 9;
	public static readonly RULE_forLoop = 10;
	public static readonly RULE_ifStatement = 11;
	public static readonly RULE_elifStatement = 12;
	public static readonly RULE_elseStatement = 13;
	public static readonly RULE_returnStatement = 14;
	public static readonly RULE_waitStatement = 15;
	public static readonly RULE_expression = 16;
	public static readonly RULE_assignmentExpression = 17;
	public static readonly RULE_logicalOrExpression = 18;
	public static readonly RULE_logicalAndExpression = 19;
	public static readonly RULE_equalityExpression = 20;
	public static readonly RULE_relationalExpression = 21;
	public static readonly RULE_additiveExpression = 22;
	public static readonly RULE_multiplicativeExpression = 23;
	public static readonly RULE_unaryExpression = 24;
	public static readonly RULE_postfixExpression = 25;
	public static readonly RULE_postfixOperator = 26;
	public static readonly RULE_methodCall = 27;
	public static readonly RULE_fieldAccess = 28;
	public static readonly RULE_incompleteFieldAccess = 29;
	public static readonly RULE_primaryExpression = 30;
	public static readonly RULE_literal = 31;
	public static readonly RULE_argumentList = 32;
	public static readonly RULE_annotation = 33;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "classDecl", "classBody", "variableDecl", "methodDecl", "paramList", 
		"param", "block", "statement", "whileLoop", "forLoop", "ifStatement", 
		"elifStatement", "elseStatement", "returnStatement", "waitStatement", 
		"expression", "assignmentExpression", "logicalOrExpression", "logicalAndExpression", 
		"equalityExpression", "relationalExpression", "additiveExpression", "multiplicativeExpression", 
		"unaryExpression", "postfixExpression", "postfixOperator", "methodCall", 
		"fieldAccess", "incompleteFieldAccess", "primaryExpression", "literal", 
		"argumentList", "annotation",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'class'", "'component'", "'extension'", "'cutscene'", "'function'", 
		"'coroutine'", "'while'", "'for'", "'in'", "'if'", "'elif'", "'else'", 
		"'wait'", "'return'", "'break'", "'continue'", undefined, "'_'", "'self'", 
		"'.'", "'='", "';'", "','", undefined, undefined, undefined, undefined, 
		"'null'", "'+'", "'-'", "'*'", "'/'", "'+='", "'-='", "'*='", "'/='", 
		"'=='", "'!='", "'<'", "'<='", "'>'", "'>='", "'&&'", "'||'", "'!'", "'{'", 
		"'}'", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "CLASS", "COMPONENT", "EXTENSION", "CUTSCENE", "FUNCTION", 
		"COROUTINE", "WHILE", "FOR", "IN", "IF", "ELIF", "ELSE", "WAIT", "RETURN", 
		"BREAK", "CONTINUE", "ID", "PRIVATE", "SELF", "DOT", "ASSIGN", "SEMI", 
		"COMMA", "NUMBER", "FLOAT", "STRING", "BOOL", "NULL", "PLUS", "MINUS", 
		"MULTIPLY", "DIVIDE", "PLUS_ASSIGN", "MINUS_ASSIGN", "MULTIPLY_ASSIGN", 
		"DIVIDE_ASSIGN", "EQUALS", "NOT_EQUALS", "LESS", "LESS_EQUAL", "GREATER", 
		"GREATER_EQUAL", "AND", "OR", "NOT", "LBRACE", "RBRACE", "LPAREN", "RPAREN", 
		"WS", "ANNOTATION_COMMENT", "ANNOTATION_BLOCK_COMMENT", "COMMENT", "BLOCK_COMMENT",
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
			this.state = 71;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ACLParser.CLASS) | (1 << ACLParser.COMPONENT) | (1 << ACLParser.EXTENSION) | (1 << ACLParser.CUTSCENE))) !== 0)) {
				{
				{
				this.state = 68;
				this.classDecl();
				}
				}
				this.state = 73;
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
	public classDecl(): ClassDeclContext {
		let _localctx: ClassDeclContext = new ClassDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ACLParser.RULE_classDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 74;
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
			this.state = 75;
			this.match(ACLParser.ID);
			this.state = 76;
			this.match(ACLParser.LBRACE);
			this.state = 77;
			this.classBody();
			this.state = 78;
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
		this.enterRule(_localctx, 4, ACLParser.RULE_classBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 84;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ACLParser.FUNCTION) | (1 << ACLParser.COROUTINE) | (1 << ACLParser.ID) | (1 << ACLParser.PRIVATE))) !== 0) || _la === ACLParser.ANNOTATION_COMMENT || _la === ACLParser.ANNOTATION_BLOCK_COMMENT) {
				{
				this.state = 82;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
				case 1:
					{
					this.state = 80;
					this.variableDecl();
					}
					break;

				case 2:
					{
					this.state = 81;
					this.methodDecl();
					}
					break;
				}
				}
				this.state = 86;
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
		this.enterRule(_localctx, 6, ACLParser.RULE_variableDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 90;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.ANNOTATION_COMMENT || _la === ACLParser.ANNOTATION_BLOCK_COMMENT) {
				{
				{
				this.state = 87;
				this.annotation();
				}
				}
				this.state = 92;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			{
			this.state = 94;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ACLParser.PRIVATE) {
				{
				this.state = 93;
				this.match(ACLParser.PRIVATE);
				}
			}

			this.state = 96;
			this.match(ACLParser.ID);
			this.state = 97;
			this.match(ACLParser.ASSIGN);
			this.state = 98;
			this.expression();
			}
			this.state = 100;
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
		this.enterRule(_localctx, 8, ACLParser.RULE_methodDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 105;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.ANNOTATION_COMMENT || _la === ACLParser.ANNOTATION_BLOCK_COMMENT) {
				{
				{
				this.state = 102;
				this.annotation();
				}
				}
				this.state = 107;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 108;
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
			this.state = 109;
			this.match(ACLParser.ID);
			this.state = 110;
			this.match(ACLParser.LPAREN);
			this.state = 112;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ACLParser.ID || _la === ACLParser.ANNOTATION_COMMENT || _la === ACLParser.ANNOTATION_BLOCK_COMMENT) {
				{
				this.state = 111;
				this.paramList();
				}
			}

			this.state = 114;
			this.match(ACLParser.RPAREN);
			this.state = 115;
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
		this.enterRule(_localctx, 10, ACLParser.RULE_paramList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 117;
			this.param();
			this.state = 122;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.COMMA) {
				{
				{
				this.state = 118;
				this.match(ACLParser.COMMA);
				this.state = 119;
				this.param();
				}
				}
				this.state = 124;
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
	public param(): ParamContext {
		let _localctx: ParamContext = new ParamContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ACLParser.RULE_param);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 128;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.ANNOTATION_COMMENT || _la === ACLParser.ANNOTATION_BLOCK_COMMENT) {
				{
				{
				this.state = 125;
				this.annotation();
				}
				}
				this.state = 130;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 131;
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
	public block(): BlockContext {
		let _localctx: BlockContext = new BlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ACLParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 133;
			this.match(ACLParser.LBRACE);
			this.state = 137;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ACLParser.WHILE) | (1 << ACLParser.FOR) | (1 << ACLParser.IF) | (1 << ACLParser.WAIT) | (1 << ACLParser.RETURN) | (1 << ACLParser.BREAK) | (1 << ACLParser.CONTINUE) | (1 << ACLParser.ID) | (1 << ACLParser.PRIVATE) | (1 << ACLParser.SELF) | (1 << ACLParser.NUMBER) | (1 << ACLParser.FLOAT) | (1 << ACLParser.STRING) | (1 << ACLParser.BOOL) | (1 << ACLParser.NULL) | (1 << ACLParser.MINUS))) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & ((1 << (ACLParser.NOT - 45)) | (1 << (ACLParser.LBRACE - 45)) | (1 << (ACLParser.LPAREN - 45)) | (1 << (ACLParser.ANNOTATION_COMMENT - 45)) | (1 << (ACLParser.ANNOTATION_BLOCK_COMMENT - 45)))) !== 0)) {
				{
				{
				this.state = 134;
				this.statement();
				}
				}
				this.state = 139;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 140;
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
			this.state = 156;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 142;
				this.variableDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 143;
				this.expression();
				this.state = 144;
				this.match(ACLParser.SEMI);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 146;
				this.ifStatement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 147;
				this.whileLoop();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 148;
				this.forLoop();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 149;
				this.waitStatement();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 150;
				this.block();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 151;
				this.returnStatement();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 152;
				this.match(ACLParser.BREAK);
				this.state = 153;
				this.match(ACLParser.SEMI);
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 154;
				this.match(ACLParser.CONTINUE);
				this.state = 155;
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
			this.state = 158;
			this.match(ACLParser.WHILE);
			this.state = 159;
			this.match(ACLParser.LPAREN);
			this.state = 160;
			this.expression();
			this.state = 161;
			this.match(ACLParser.RPAREN);
			this.state = 162;
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
			this.state = 164;
			this.match(ACLParser.FOR);
			this.state = 165;
			this.match(ACLParser.LPAREN);
			this.state = 166;
			this.match(ACLParser.ID);
			this.state = 167;
			this.match(ACLParser.IN);
			this.state = 168;
			this.expression();
			this.state = 169;
			this.match(ACLParser.RPAREN);
			this.state = 170;
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
			this.state = 172;
			this.match(ACLParser.IF);
			this.state = 173;
			this.match(ACLParser.LPAREN);
			this.state = 174;
			this.expression();
			this.state = 175;
			this.match(ACLParser.RPAREN);
			this.state = 176;
			this.block();
			this.state = 180;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.ELIF) {
				{
				{
				this.state = 177;
				this.elifStatement();
				}
				}
				this.state = 182;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 184;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ACLParser.ELSE) {
				{
				this.state = 183;
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
		this.enterRule(_localctx, 24, ACLParser.RULE_elifStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 186;
			this.match(ACLParser.ELIF);
			this.state = 187;
			this.match(ACLParser.LPAREN);
			this.state = 188;
			this.expression();
			this.state = 189;
			this.match(ACLParser.RPAREN);
			this.state = 190;
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
		this.enterRule(_localctx, 26, ACLParser.RULE_elseStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 192;
			this.match(ACLParser.ELSE);
			this.state = 193;
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
		this.enterRule(_localctx, 28, ACLParser.RULE_returnStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 195;
			this.match(ACLParser.RETURN);
			this.state = 197;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 17)) & ~0x1F) === 0 && ((1 << (_la - 17)) & ((1 << (ACLParser.ID - 17)) | (1 << (ACLParser.SELF - 17)) | (1 << (ACLParser.NUMBER - 17)) | (1 << (ACLParser.FLOAT - 17)) | (1 << (ACLParser.STRING - 17)) | (1 << (ACLParser.BOOL - 17)) | (1 << (ACLParser.NULL - 17)) | (1 << (ACLParser.MINUS - 17)) | (1 << (ACLParser.NOT - 17)) | (1 << (ACLParser.LPAREN - 17)))) !== 0)) {
				{
				this.state = 196;
				this.expression();
				}
			}

			this.state = 199;
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
		this.enterRule(_localctx, 30, ACLParser.RULE_waitStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 201;
			this.match(ACLParser.WAIT);
			this.state = 202;
			this.expression();
			this.state = 203;
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
		this.enterRule(_localctx, 32, ACLParser.RULE_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 205;
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
		this.enterRule(_localctx, 34, ACLParser.RULE_assignmentExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 207;
			this.logicalOrExpression();
			this.state = 210;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & ((1 << (ACLParser.ASSIGN - 21)) | (1 << (ACLParser.PLUS_ASSIGN - 21)) | (1 << (ACLParser.MINUS_ASSIGN - 21)) | (1 << (ACLParser.MULTIPLY_ASSIGN - 21)) | (1 << (ACLParser.DIVIDE_ASSIGN - 21)))) !== 0)) {
				{
				this.state = 208;
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
				this.state = 209;
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
		this.enterRule(_localctx, 36, ACLParser.RULE_logicalOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 212;
			this.logicalAndExpression();
			this.state = 217;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.OR) {
				{
				{
				this.state = 213;
				this.match(ACLParser.OR);
				this.state = 214;
				this.logicalAndExpression();
				}
				}
				this.state = 219;
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
		this.enterRule(_localctx, 38, ACLParser.RULE_logicalAndExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 220;
			this.equalityExpression();
			this.state = 225;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.AND) {
				{
				{
				this.state = 221;
				this.match(ACLParser.AND);
				this.state = 222;
				this.equalityExpression();
				}
				}
				this.state = 227;
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
		this.enterRule(_localctx, 40, ACLParser.RULE_equalityExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 228;
			this.relationalExpression();
			this.state = 233;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.EQUALS || _la === ACLParser.NOT_EQUALS) {
				{
				{
				this.state = 229;
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
				this.state = 230;
				this.relationalExpression();
				}
				}
				this.state = 235;
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
		this.enterRule(_localctx, 42, ACLParser.RULE_relationalExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 236;
			this.additiveExpression();
			this.state = 241;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & ((1 << (ACLParser.LESS - 39)) | (1 << (ACLParser.LESS_EQUAL - 39)) | (1 << (ACLParser.GREATER - 39)) | (1 << (ACLParser.GREATER_EQUAL - 39)))) !== 0)) {
				{
				{
				this.state = 237;
				_la = this._input.LA(1);
				if (!(((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & ((1 << (ACLParser.LESS - 39)) | (1 << (ACLParser.LESS_EQUAL - 39)) | (1 << (ACLParser.GREATER - 39)) | (1 << (ACLParser.GREATER_EQUAL - 39)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 238;
				this.additiveExpression();
				}
				}
				this.state = 243;
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
		this.enterRule(_localctx, 44, ACLParser.RULE_additiveExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 244;
			this.multiplicativeExpression();
			this.state = 249;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.PLUS || _la === ACLParser.MINUS) {
				{
				{
				this.state = 245;
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
				this.state = 246;
				this.multiplicativeExpression();
				}
				}
				this.state = 251;
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
		this.enterRule(_localctx, 46, ACLParser.RULE_multiplicativeExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 252;
			this.unaryExpression();
			this.state = 257;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.MULTIPLY || _la === ACLParser.DIVIDE) {
				{
				{
				this.state = 253;
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
				this.state = 254;
				this.unaryExpression();
				}
				}
				this.state = 259;
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
		this.enterRule(_localctx, 48, ACLParser.RULE_unaryExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 261;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ACLParser.MINUS || _la === ACLParser.NOT) {
				{
				this.state = 260;
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

			this.state = 263;
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
		this.enterRule(_localctx, 50, ACLParser.RULE_postfixExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 265;
			this.primaryExpression();
			this.state = 269;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.DOT || _la === ACLParser.LPAREN) {
				{
				{
				this.state = 266;
				this.postfixOperator();
				}
				}
				this.state = 271;
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
		this.enterRule(_localctx, 52, ACLParser.RULE_postfixOperator);
		try {
			this.state = 275;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 272;
				this.methodCall();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 273;
				this.fieldAccess();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 274;
				this.incompleteFieldAccess();
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
		this.enterRule(_localctx, 54, ACLParser.RULE_methodCall);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 277;
			this.match(ACLParser.LPAREN);
			this.state = 279;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 17)) & ~0x1F) === 0 && ((1 << (_la - 17)) & ((1 << (ACLParser.ID - 17)) | (1 << (ACLParser.SELF - 17)) | (1 << (ACLParser.NUMBER - 17)) | (1 << (ACLParser.FLOAT - 17)) | (1 << (ACLParser.STRING - 17)) | (1 << (ACLParser.BOOL - 17)) | (1 << (ACLParser.NULL - 17)) | (1 << (ACLParser.MINUS - 17)) | (1 << (ACLParser.NOT - 17)) | (1 << (ACLParser.LPAREN - 17)))) !== 0)) {
				{
				this.state = 278;
				this.argumentList();
				}
			}

			this.state = 281;
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
		this.enterRule(_localctx, 56, ACLParser.RULE_fieldAccess);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 283;
			this.match(ACLParser.DOT);
			this.state = 284;
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
	public incompleteFieldAccess(): IncompleteFieldAccessContext {
		let _localctx: IncompleteFieldAccessContext = new IncompleteFieldAccessContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, ACLParser.RULE_incompleteFieldAccess);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 286;
			this.match(ACLParser.DOT);
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
			this.state = 295;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ACLParser.NUMBER:
			case ACLParser.FLOAT:
			case ACLParser.STRING:
			case ACLParser.BOOL:
			case ACLParser.NULL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 288;
				this.literal();
				}
				break;
			case ACLParser.SELF:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 289;
				this.match(ACLParser.SELF);
				}
				break;
			case ACLParser.ID:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 290;
				this.match(ACLParser.ID);
				}
				break;
			case ACLParser.LPAREN:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 291;
				this.match(ACLParser.LPAREN);
				this.state = 292;
				this.expression();
				this.state = 293;
				this.match(ACLParser.RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
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
			this.state = 297;
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
			this.state = 299;
			this.expression();
			this.state = 304;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ACLParser.COMMA) {
				{
				{
				this.state = 300;
				this.match(ACLParser.COMMA);
				this.state = 301;
				this.expression();
				}
				}
				this.state = 306;
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
	public annotation(): AnnotationContext {
		let _localctx: AnnotationContext = new AnnotationContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, ACLParser.RULE_annotation);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 307;
			_la = this._input.LA(1);
			if (!(_la === ACLParser.ANNOTATION_COMMENT || _la === ACLParser.ANNOTATION_BLOCK_COMMENT)) {
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

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x038\u0138\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x03\x02\x07\x02H\n\x02\f\x02\x0E\x02K\v\x02\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04\x07\x04U\n\x04\f\x04\x0E\x04" +
		"X\v\x04\x03\x05\x07\x05[\n\x05\f\x05\x0E\x05^\v\x05\x03\x05\x05\x05a\n" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x07\x06j" +
		"\n\x06\f\x06\x0E\x06m\v\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06s\n" +
		"\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x07\x07{\n\x07\f" +
		"\x07\x0E\x07~\v\x07\x03\b\x07\b\x81\n\b\f\b\x0E\b\x84\v\b\x03\b\x03\b" +
		"\x03\t\x03\t\x07\t\x8A\n\t\f\t\x0E\t\x8D\v\t\x03\t\x03\t\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05" +
		"\n\x9F\n\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f" +
		"\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x07\r\xB5" +
		"\n\r\f\r\x0E\r\xB8\v\r\x03\r\x05\r\xBB\n\r\x03\x0E\x03\x0E\x03\x0E\x03" +
		"\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x05\x10\xC8" +
		"\n\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12" +
		"\x03\x13\x03\x13\x03\x13\x05\x13\xD5\n\x13\x03\x14\x03\x14\x03\x14\x07" +
		"\x14\xDA\n\x14\f\x14\x0E\x14\xDD\v\x14\x03\x15\x03\x15\x03\x15\x07\x15" +
		"\xE2\n\x15\f\x15\x0E\x15\xE5\v\x15\x03\x16\x03\x16\x03\x16\x07\x16\xEA" +
		"\n\x16\f\x16\x0E\x16\xED\v\x16\x03\x17\x03\x17\x03\x17\x07\x17\xF2\n\x17" +
		"\f\x17\x0E\x17\xF5\v\x17\x03\x18\x03\x18\x03\x18\x07\x18\xFA\n\x18\f\x18" +
		"\x0E\x18\xFD\v\x18\x03\x19\x03\x19\x03\x19\x07\x19\u0102\n\x19\f\x19\x0E" +
		"\x19\u0105\v\x19\x03\x1A\x05\x1A\u0108\n\x1A\x03\x1A\x03\x1A\x03\x1B\x03" +
		"\x1B\x07\x1B\u010E\n\x1B\f\x1B\x0E\x1B\u0111\v\x1B\x03\x1C\x03\x1C\x03" +
		"\x1C\x05\x1C\u0116\n\x1C\x03\x1D\x03\x1D\x05\x1D\u011A\n\x1D\x03\x1D\x03" +
		"\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03 \x03 \x03 \x03 \x03 " +
		"\x03 \x03 \x05 \u012A\n \x03!\x03!\x03\"\x03\"\x03\"\x07\"\u0131\n\"\f" +
		"\"\x0E\"\u0134\v\"\x03#\x03#\x03#\x02\x02\x02$\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A" +
		"\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x02" +
		"4\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02\x02\f\x03\x02\x03\x06\x03" +
		"\x02\x07\b\x04\x02\x17\x17#&\x03\x02\'(\x03\x02),\x03\x02\x1F \x03\x02" +
		"!\"\x04\x02  //\x03\x02\x1A\x1E\x03\x0256\x02\u013B\x02I\x03\x02\x02\x02" +
		"\x04L\x03\x02\x02\x02\x06V\x03\x02\x02\x02\b\\\x03\x02\x02\x02\nk\x03" +
		"\x02\x02\x02\fw\x03\x02\x02\x02\x0E\x82\x03\x02\x02\x02\x10\x87\x03\x02" +
		"\x02\x02\x12\x9E\x03\x02\x02\x02\x14\xA0\x03\x02\x02\x02\x16\xA6\x03\x02" +
		"\x02\x02\x18\xAE\x03\x02\x02\x02\x1A\xBC\x03\x02\x02\x02\x1C\xC2\x03\x02" +
		"\x02\x02\x1E\xC5\x03\x02\x02\x02 \xCB\x03\x02\x02\x02\"\xCF\x03\x02\x02" +
		"\x02$\xD1\x03\x02\x02\x02&\xD6\x03\x02\x02\x02(\xDE\x03\x02\x02\x02*\xE6" +
		"\x03\x02\x02\x02,\xEE\x03\x02\x02\x02.\xF6\x03\x02\x02\x020\xFE\x03\x02" +
		"\x02\x022\u0107\x03\x02\x02\x024\u010B\x03\x02\x02\x026\u0115\x03\x02" +
		"\x02\x028\u0117\x03\x02\x02\x02:\u011D\x03\x02\x02\x02<\u0120\x03\x02" +
		"\x02\x02>\u0129\x03\x02\x02\x02@\u012B\x03\x02\x02\x02B\u012D\x03\x02" +
		"\x02\x02D\u0135\x03\x02\x02\x02FH\x05\x04\x03\x02GF\x03\x02\x02\x02HK" +
		"\x03\x02\x02\x02IG\x03\x02\x02\x02IJ\x03\x02\x02\x02J\x03\x03\x02\x02" +
		"\x02KI\x03\x02\x02\x02LM\t\x02\x02\x02MN\x07\x13\x02\x02NO\x070\x02\x02" +
		"OP\x05\x06\x04\x02PQ\x071\x02\x02Q\x05\x03\x02\x02\x02RU\x05\b\x05\x02" +
		"SU\x05\n\x06\x02TR\x03\x02\x02\x02TS\x03\x02\x02\x02UX\x03\x02\x02\x02" +
		"VT\x03\x02\x02\x02VW\x03\x02\x02\x02W\x07\x03\x02\x02\x02XV\x03\x02\x02" +
		"\x02Y[\x05D#\x02ZY\x03\x02\x02\x02[^\x03\x02\x02\x02\\Z\x03\x02\x02\x02" +
		"\\]\x03\x02\x02\x02]`\x03\x02\x02\x02^\\\x03\x02\x02\x02_a\x07\x14\x02" +
		"\x02`_\x03\x02\x02\x02`a\x03\x02\x02\x02ab\x03\x02\x02\x02bc\x07\x13\x02" +
		"\x02cd\x07\x17\x02\x02de\x05\"\x12\x02ef\x03\x02\x02\x02fg\x07\x18\x02" +
		"\x02g\t\x03\x02\x02\x02hj\x05D#\x02ih\x03\x02\x02\x02jm\x03\x02\x02\x02" +
		"ki\x03\x02\x02\x02kl\x03\x02\x02\x02ln\x03\x02\x02\x02mk\x03\x02\x02\x02" +
		"no\t\x03\x02\x02op\x07\x13\x02\x02pr\x072\x02\x02qs\x05\f\x07\x02rq\x03" +
		"\x02\x02\x02rs\x03\x02\x02\x02st\x03\x02\x02\x02tu\x073\x02\x02uv\x05" +
		"\x10\t\x02v\v\x03\x02\x02\x02w|\x05\x0E\b\x02xy\x07\x19\x02\x02y{\x05" +
		"\x0E\b\x02zx\x03\x02\x02\x02{~\x03\x02\x02\x02|z\x03\x02\x02\x02|}\x03" +
		"\x02\x02\x02}\r\x03\x02\x02\x02~|\x03\x02\x02\x02\x7F\x81\x05D#\x02\x80" +
		"\x7F\x03\x02\x02\x02\x81\x84\x03\x02\x02\x02\x82\x80\x03\x02\x02\x02\x82" +
		"\x83\x03\x02\x02\x02\x83\x85\x03\x02\x02\x02\x84\x82\x03\x02\x02\x02\x85" +
		"\x86\x07\x13\x02\x02\x86\x0F\x03\x02\x02\x02\x87\x8B\x070\x02\x02\x88" +
		"\x8A\x05\x12\n\x02\x89\x88\x03\x02\x02\x02\x8A\x8D\x03\x02\x02\x02\x8B" +
		"\x89\x03\x02\x02\x02\x8B\x8C\x03\x02\x02\x02\x8C\x8E\x03\x02\x02\x02\x8D" +
		"\x8B\x03\x02\x02\x02\x8E\x8F\x071\x02\x02\x8F\x11\x03\x02\x02\x02\x90" +
		"\x9F\x05\b\x05\x02\x91\x92\x05\"\x12\x02\x92\x93\x07\x18\x02\x02\x93\x9F" +
		"\x03\x02\x02\x02\x94\x9F\x05\x18\r\x02\x95\x9F\x05\x14\v\x02\x96\x9F\x05" +
		"\x16\f\x02\x97\x9F\x05 \x11\x02\x98\x9F\x05\x10\t\x02\x99\x9F\x05\x1E" +
		"\x10\x02\x9A\x9B\x07\x11\x02\x02\x9B\x9F\x07\x18\x02\x02\x9C\x9D\x07\x12" +
		"\x02\x02\x9D\x9F\x07\x18\x02\x02\x9E\x90\x03\x02\x02\x02\x9E\x91\x03\x02" +
		"\x02\x02\x9E\x94\x03\x02\x02\x02\x9E\x95\x03\x02\x02\x02\x9E\x96\x03\x02" +
		"\x02\x02\x9E\x97\x03\x02\x02\x02\x9E\x98\x03\x02\x02\x02\x9E\x99\x03\x02" +
		"\x02\x02\x9E\x9A\x03\x02\x02\x02\x9E\x9C\x03\x02\x02\x02\x9F\x13\x03\x02" +
		"\x02\x02\xA0\xA1\x07\t\x02\x02\xA1\xA2\x072\x02\x02\xA2\xA3\x05\"\x12" +
		"\x02\xA3\xA4\x073\x02\x02\xA4\xA5\x05\x10\t\x02\xA5\x15\x03\x02\x02\x02" +
		"\xA6\xA7\x07\n\x02\x02\xA7\xA8\x072\x02\x02\xA8\xA9\x07\x13\x02\x02\xA9" +
		"\xAA\x07\v\x02\x02\xAA\xAB\x05\"\x12\x02\xAB\xAC\x073\x02\x02\xAC\xAD" +
		"\x05\x10\t\x02\xAD\x17\x03\x02\x02\x02\xAE\xAF\x07\f\x02\x02\xAF\xB0\x07" +
		"2\x02\x02\xB0\xB1\x05\"\x12\x02\xB1\xB2\x073\x02\x02\xB2\xB6\x05\x10\t" +
		"\x02\xB3\xB5\x05\x1A\x0E\x02\xB4\xB3\x03\x02\x02\x02\xB5\xB8\x03\x02\x02" +
		"\x02\xB6\xB4\x03\x02\x02\x02\xB6\xB7\x03\x02\x02\x02\xB7\xBA\x03\x02\x02" +
		"\x02\xB8\xB6\x03\x02\x02\x02\xB9\xBB\x05\x1C\x0F\x02\xBA\xB9\x03\x02\x02" +
		"\x02\xBA\xBB\x03\x02\x02\x02\xBB\x19\x03\x02\x02\x02\xBC\xBD\x07\r\x02" +
		"\x02\xBD\xBE\x072\x02\x02\xBE\xBF\x05\"\x12\x02\xBF\xC0\x073\x02\x02\xC0" +
		"\xC1\x05\x10\t\x02\xC1\x1B\x03\x02\x02\x02\xC2\xC3\x07\x0E\x02\x02\xC3" +
		"\xC4\x05\x10\t\x02\xC4\x1D\x03\x02\x02\x02\xC5\xC7\x07\x10\x02\x02\xC6" +
		"\xC8\x05\"\x12\x02\xC7\xC6\x03\x02\x02\x02\xC7\xC8\x03\x02\x02\x02\xC8" +
		"\xC9\x03\x02\x02\x02\xC9\xCA\x07\x18\x02\x02\xCA\x1F\x03\x02\x02\x02\xCB" +
		"\xCC\x07\x0F\x02\x02\xCC\xCD\x05\"\x12\x02\xCD\xCE\x07\x18\x02\x02\xCE" +
		"!\x03\x02\x02\x02\xCF\xD0\x05$\x13\x02\xD0#\x03\x02\x02\x02\xD1\xD4\x05" +
		"&\x14\x02\xD2\xD3\t\x04\x02\x02\xD3\xD5\x05$\x13\x02\xD4\xD2\x03\x02\x02" +
		"\x02\xD4\xD5\x03\x02\x02\x02\xD5%\x03\x02\x02\x02\xD6\xDB\x05(\x15\x02" +
		"\xD7\xD8\x07.\x02\x02\xD8\xDA\x05(\x15\x02\xD9\xD7\x03\x02\x02\x02\xDA" +
		"\xDD\x03\x02\x02\x02\xDB\xD9\x03\x02\x02\x02\xDB\xDC\x03\x02\x02\x02\xDC" +
		"\'\x03\x02\x02\x02\xDD\xDB\x03\x02\x02\x02\xDE\xE3\x05*\x16\x02\xDF\xE0" +
		"\x07-\x02\x02\xE0\xE2\x05*\x16\x02\xE1\xDF\x03\x02\x02\x02\xE2\xE5\x03" +
		"\x02\x02\x02\xE3\xE1\x03\x02\x02\x02\xE3\xE4\x03\x02\x02\x02\xE4)\x03" +
		"\x02\x02\x02\xE5\xE3\x03\x02\x02\x02\xE6\xEB\x05,\x17\x02\xE7\xE8\t\x05" +
		"\x02\x02\xE8\xEA\x05,\x17\x02\xE9\xE7\x03\x02\x02\x02\xEA\xED\x03\x02" +
		"\x02\x02\xEB\xE9\x03\x02\x02\x02\xEB\xEC\x03\x02\x02\x02\xEC+\x03\x02" +
		"\x02\x02\xED\xEB\x03\x02\x02\x02\xEE\xF3\x05.\x18\x02\xEF\xF0\t\x06\x02" +
		"\x02\xF0\xF2\x05.\x18\x02\xF1\xEF\x03\x02\x02\x02\xF2\xF5\x03\x02\x02" +
		"\x02\xF3\xF1\x03\x02\x02\x02\xF3\xF4\x03\x02\x02\x02\xF4-\x03\x02\x02" +
		"\x02\xF5\xF3\x03\x02\x02\x02\xF6\xFB\x050\x19\x02\xF7\xF8\t\x07\x02\x02" +
		"\xF8\xFA\x050\x19\x02\xF9\xF7\x03\x02\x02\x02\xFA\xFD\x03\x02\x02\x02" +
		"\xFB\xF9\x03\x02\x02\x02\xFB\xFC\x03\x02\x02\x02\xFC/\x03\x02\x02\x02" +
		"\xFD\xFB\x03\x02\x02\x02\xFE\u0103\x052\x1A\x02\xFF\u0100\t\b\x02\x02" +
		"\u0100\u0102\x052\x1A\x02\u0101\xFF\x03\x02\x02\x02\u0102\u0105\x03\x02" +
		"\x02\x02\u0103\u0101\x03\x02\x02\x02\u0103\u0104\x03\x02\x02\x02\u0104" +
		"1\x03\x02\x02\x02\u0105\u0103\x03\x02\x02\x02\u0106\u0108\t\t\x02\x02" +
		"\u0107\u0106\x03\x02\x02\x02\u0107\u0108\x03\x02\x02\x02\u0108\u0109\x03" +
		"\x02\x02\x02\u0109\u010A\x054\x1B\x02\u010A3\x03\x02\x02\x02\u010B\u010F" +
		"\x05> \x02\u010C\u010E\x056\x1C\x02\u010D\u010C\x03\x02\x02\x02\u010E" +
		"\u0111\x03\x02\x02\x02\u010F\u010D\x03\x02\x02\x02\u010F\u0110\x03\x02" +
		"\x02\x02\u01105\x03\x02\x02\x02\u0111\u010F\x03\x02\x02\x02\u0112\u0116" +
		"\x058\x1D\x02\u0113\u0116\x05:\x1E\x02\u0114\u0116\x05<\x1F\x02\u0115" +
		"\u0112\x03\x02\x02\x02\u0115\u0113\x03\x02\x02\x02\u0115\u0114\x03\x02" +
		"\x02\x02\u01167\x03\x02\x02\x02\u0117\u0119\x072\x02\x02\u0118\u011A\x05" +
		"B\"\x02\u0119\u0118\x03\x02\x02\x02\u0119\u011A\x03\x02\x02\x02\u011A" +
		"\u011B\x03\x02\x02\x02\u011B\u011C\x073\x02\x02\u011C9\x03\x02\x02\x02" +
		"\u011D\u011E\x07\x16\x02\x02\u011E\u011F\x07\x13\x02\x02\u011F;\x03\x02" +
		"\x02\x02\u0120\u0121\x07\x16\x02\x02\u0121=\x03\x02\x02\x02\u0122\u012A" +
		"\x05@!\x02\u0123\u012A\x07\x15\x02\x02\u0124\u012A\x07\x13\x02\x02\u0125" +
		"\u0126\x072\x02\x02\u0126\u0127\x05\"\x12\x02\u0127\u0128\x073\x02\x02" +
		"\u0128\u012A\x03\x02\x02\x02\u0129\u0122\x03\x02\x02\x02\u0129\u0123\x03" +
		"\x02\x02\x02\u0129\u0124\x03\x02\x02\x02\u0129\u0125\x03\x02\x02\x02\u012A" +
		"?\x03\x02\x02\x02\u012B\u012C\t\n\x02\x02\u012CA\x03\x02\x02\x02\u012D" +
		"\u0132\x05\"\x12\x02\u012E\u012F\x07\x19\x02\x02\u012F\u0131\x05\"\x12" +
		"\x02\u0130\u012E\x03\x02\x02\x02\u0131\u0134\x03\x02\x02\x02\u0132\u0130" +
		"\x03\x02\x02\x02\u0132\u0133\x03\x02\x02\x02\u0133C\x03\x02\x02\x02\u0134" +
		"\u0132\x03\x02\x02\x02\u0135\u0136\t\v\x02\x02\u0136E\x03\x02\x02\x02" +
		"\x1DITV\\`kr|\x82\x8B\x9E\xB6\xBA\xC7\xD4\xDB\xE3\xEB\xF3\xFB\u0103\u0107" +
		"\u010F\u0115\u0119\u0129\u0132";
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
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
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
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
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
	public param(): ParamContext[];
	public param(i: number): ParamContext;
	public param(i?: number): ParamContext | ParamContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamContext);
		} else {
			return this.getRuleContext(i, ParamContext);
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


export class ParamContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ACLParser.ID, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_param; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterParam) {
			listener.enterParam(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitParam) {
			listener.exitParam(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitParam) {
			return visitor.visitParam(this);
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
	public incompleteFieldAccess(): IncompleteFieldAccessContext | undefined {
		return this.tryGetRuleContext(0, IncompleteFieldAccessContext);
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


export class IncompleteFieldAccessContext extends ParserRuleContext {
	public DOT(): TerminalNode { return this.getToken(ACLParser.DOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_incompleteFieldAccess; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterIncompleteFieldAccess) {
			listener.enterIncompleteFieldAccess(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitIncompleteFieldAccess) {
			listener.exitIncompleteFieldAccess(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitIncompleteFieldAccess) {
			return visitor.visitIncompleteFieldAccess(this);
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
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ACLParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ACLParser.RPAREN, 0); }
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


export class AnnotationContext extends ParserRuleContext {
	public ANNOTATION_COMMENT(): TerminalNode | undefined { return this.tryGetToken(ACLParser.ANNOTATION_COMMENT, 0); }
	public ANNOTATION_BLOCK_COMMENT(): TerminalNode | undefined { return this.tryGetToken(ACLParser.ANNOTATION_BLOCK_COMMENT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ACLParser.RULE_annotation; }
	// @Override
	public enterRule(listener: ACLListener): void {
		if (listener.enterAnnotation) {
			listener.enterAnnotation(this);
		}
	}
	// @Override
	public exitRule(listener: ACLListener): void {
		if (listener.exitAnnotation) {
			listener.exitAnnotation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ACLVisitor<Result>): Result {
		if (visitor.visitAnnotation) {
			return visitor.visitAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


