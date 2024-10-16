// Generated from ./src/antlr/ACL.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { ACLListener } from "./ACLListener.js";
import { ACLVisitor } from "./ACLVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class ACLParser extends antlr.Parser {
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

    public static readonly literalNames = [
        null, "'class'", "'component'", "'extension'", "'cutscene'", "'function'", 
        "'coroutine'", "'while'", "'for'", "'in'", "'if'", "'elif'", "'else'", 
        "'wait'", "'return'", "'break'", "'continue'", null, "'_'", "'self'", 
        "'.'", "'='", "';'", "','", "'Main'", null, null, null, null, "'null'", 
        "'+'", "'-'", "'*'", "'/'", "'+='", "'-='", "'*='", "'/='", "'=='", 
        "'!='", "'<'", "'<='", "'>'", "'>='", "'&&'", "'||'", "'!'", "'{'", 
        "'}'", "'('", "')'"
    ];

    public static readonly symbolicNames = [
        null, "CLASS", "COMPONENT", "EXTENSION", "CUTSCENE", "FUNCTION", 
        "COROUTINE", "WHILE", "FOR", "IN", "IF", "ELIF", "ELSE", "WAIT", 
        "RETURN", "BREAK", "CONTINUE", "ID", "PRIVATE", "SELF", "DOT", "ASSIGN", 
        "SEMI", "COMMA", "MAIN", "NUMBER", "FLOAT", "STRING", "BOOL", "NULL", 
        "PLUS", "MINUS", "MULTIPLY", "DIVIDE", "PLUS_ASSIGN", "MINUS_ASSIGN", 
        "MULTIPLY_ASSIGN", "DIVIDE_ASSIGN", "EQUALS", "NOT_EQUALS", "LESS", 
        "LESS_EQUAL", "GREATER", "GREATER_EQUAL", "AND", "OR", "NOT", "LBRACE", 
        "RBRACE", "LPAREN", "RPAREN", "WS", "COMMENT", "BLOCK_COMMENT"
    ];
    public static readonly ruleNames = [
        "program", "entryPointDecl", "classDecl", "classBody", "variableDecl", 
        "methodDecl", "paramList", "block", "statement", "whileLoop", "forLoop", 
        "ifStatement", "elifBlock", "elifStatement", "elseStatement", "returnStatement", 
        "waitStatement", "expression", "assignmentExpression", "logicalOrExpression", 
        "logicalAndExpression", "equalityExpression", "relationalExpression", 
        "additiveExpression", "multiplicativeExpression", "unaryExpression", 
        "postfixExpression", "postfixOperator", "methodCall", "fieldAccess", 
        "primaryExpression", "literal", "argumentList",
    ];

    public get grammarFileName(): string { return "ACL.g4"; }
    public get literalNames(): (string | null)[] { return ACLParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return ACLParser.symbolicNames; }
    public get ruleNames(): string[] { return ACLParser.ruleNames; }
    public get serializedATN(): number[] { return ACLParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, ACLParser._ATN, ACLParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, ACLParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 69;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 30) !== 0)) {
                {
                {
                this.state = 66;
                this.classDecl();
                }
                }
                this.state = 71;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public entryPointDecl(): EntryPointDeclContext {
        let localContext = new EntryPointDeclContext(this.context, this.state);
        this.enterRule(localContext, 2, ACLParser.RULE_entryPointDecl);
        try {
            this.enterOuterAlt(localContext, 1);
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classDecl(): ClassDeclContext {
        let localContext = new ClassDeclContext(this.context, this.state);
        this.enterRule(localContext, 4, ACLParser.RULE_classDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 78;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 30) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classBody(): ClassBodyContext {
        let localContext = new ClassBodyContext(this.context, this.state);
        this.enterRule(localContext, 6, ACLParser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 88;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 393312) !== 0)) {
                {
                this.state = 86;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
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
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 90;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableDecl(): VariableDeclContext {
        let localContext = new VariableDeclContext(this.context, this.state);
        this.enterRule(localContext, 8, ACLParser.RULE_variableDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 92;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 18) {
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodDecl(): MethodDeclContext {
        let localContext = new MethodDeclContext(this.context, this.state);
        this.enterRule(localContext, 10, ACLParser.RULE_methodDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 100;
            _la = this.tokenStream.LA(1);
            if(!(_la === 5 || _la === 6)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 101;
            this.match(ACLParser.ID);
            this.state = 102;
            this.match(ACLParser.LPAREN);
            this.state = 104;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 17) {
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public paramList(): ParamListContext {
        let localContext = new ParamListContext(this.context, this.state);
        this.enterRule(localContext, 12, ACLParser.RULE_paramList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 109;
            this.match(ACLParser.ID);
            this.state = 114;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 23) {
                {
                {
                this.state = 110;
                this.match(ACLParser.COMMA);
                this.state = 111;
                this.match(ACLParser.ID);
                }
                }
                this.state = 116;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 14, ACLParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 117;
            this.match(ACLParser.LBRACE);
            this.state = 121;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3188712832) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 11) !== 0)) {
                {
                {
                this.state = 118;
                this.statement();
                }
                }
                this.state = 123;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 124;
            this.match(ACLParser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 16, ACLParser.RULE_statement);
        try {
            this.state = 140;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 126;
                this.variableDecl();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 127;
                this.expression();
                this.state = 128;
                this.match(ACLParser.SEMI);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 130;
                this.ifStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 131;
                this.whileLoop();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 132;
                this.forLoop();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 133;
                this.waitStatement();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 134;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 135;
                this.returnStatement();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 136;
                this.match(ACLParser.BREAK);
                this.state = 137;
                this.match(ACLParser.SEMI);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public whileLoop(): WhileLoopContext {
        let localContext = new WhileLoopContext(this.context, this.state);
        this.enterRule(localContext, 18, ACLParser.RULE_whileLoop);
        try {
            this.enterOuterAlt(localContext, 1);
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forLoop(): ForLoopContext {
        let localContext = new ForLoopContext(this.context, this.state);
        this.enterRule(localContext, 20, ACLParser.RULE_forLoop);
        try {
            this.enterOuterAlt(localContext, 1);
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ifStatement(): IfStatementContext {
        let localContext = new IfStatementContext(this.context, this.state);
        this.enterRule(localContext, 22, ACLParser.RULE_ifStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
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
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 11) {
                {
                {
                this.state = 161;
                this.elifStatement();
                }
                }
                this.state = 166;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 168;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 12) {
                {
                this.state = 167;
                this.elseStatement();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elifBlock(): ElifBlockContext {
        let localContext = new ElifBlockContext(this.context, this.state);
        this.enterRule(localContext, 24, ACLParser.RULE_elifBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 173;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 11) {
                {
                {
                this.state = 170;
                this.elifStatement();
                }
                }
                this.state = 175;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 177;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 12) {
                {
                this.state = 176;
                this.elseStatement();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elifStatement(): ElifStatementContext {
        let localContext = new ElifStatementContext(this.context, this.state);
        this.enterRule(localContext, 26, ACLParser.RULE_elifStatement);
        try {
            this.enterOuterAlt(localContext, 1);
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public elseStatement(): ElseStatementContext {
        let localContext = new ElseStatementContext(this.context, this.state);
        this.enterRule(localContext, 28, ACLParser.RULE_elseStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 185;
            this.match(ACLParser.ELSE);
            this.state = 186;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public returnStatement(): ReturnStatementContext {
        let localContext = new ReturnStatementContext(this.context, this.state);
        this.enterRule(localContext, 30, ACLParser.RULE_returnStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 188;
            this.match(ACLParser.RETURN);
            this.state = 190;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3188326400) !== 0) || _la === 46 || _la === 49) {
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public waitStatement(): WaitStatementContext {
        let localContext = new WaitStatementContext(this.context, this.state);
        this.enterRule(localContext, 32, ACLParser.RULE_waitStatement);
        try {
            this.enterOuterAlt(localContext, 1);
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 34, ACLParser.RULE_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 198;
            this.assignmentExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assignmentExpression(): AssignmentExpressionContext {
        let localContext = new AssignmentExpressionContext(this.context, this.state);
        this.enterRule(localContext, 36, ACLParser.RULE_assignmentExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 200;
            this.logicalOrExpression();
            this.state = 203;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & 122881) !== 0)) {
                {
                this.state = 201;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & 122881) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 202;
                this.assignmentExpression();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public logicalOrExpression(): LogicalOrExpressionContext {
        let localContext = new LogicalOrExpressionContext(this.context, this.state);
        this.enterRule(localContext, 38, ACLParser.RULE_logicalOrExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 205;
            this.logicalAndExpression();
            this.state = 210;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 45) {
                {
                {
                this.state = 206;
                this.match(ACLParser.OR);
                this.state = 207;
                this.logicalAndExpression();
                }
                }
                this.state = 212;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public logicalAndExpression(): LogicalAndExpressionContext {
        let localContext = new LogicalAndExpressionContext(this.context, this.state);
        this.enterRule(localContext, 40, ACLParser.RULE_logicalAndExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
            this.equalityExpression();
            this.state = 218;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 44) {
                {
                {
                this.state = 214;
                this.match(ACLParser.AND);
                this.state = 215;
                this.equalityExpression();
                }
                }
                this.state = 220;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public equalityExpression(): EqualityExpressionContext {
        let localContext = new EqualityExpressionContext(this.context, this.state);
        this.enterRule(localContext, 42, ACLParser.RULE_equalityExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 221;
            this.relationalExpression();
            this.state = 226;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 38 || _la === 39) {
                {
                {
                this.state = 222;
                _la = this.tokenStream.LA(1);
                if(!(_la === 38 || _la === 39)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 223;
                this.relationalExpression();
                }
                }
                this.state = 228;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public relationalExpression(): RelationalExpressionContext {
        let localContext = new RelationalExpressionContext(this.context, this.state);
        this.enterRule(localContext, 44, ACLParser.RULE_relationalExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 229;
            this.additiveExpression();
            this.state = 234;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 15) !== 0)) {
                {
                {
                this.state = 230;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 15) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 231;
                this.additiveExpression();
                }
                }
                this.state = 236;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public additiveExpression(): AdditiveExpressionContext {
        let localContext = new AdditiveExpressionContext(this.context, this.state);
        this.enterRule(localContext, 46, ACLParser.RULE_additiveExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 237;
            this.multiplicativeExpression();
            this.state = 242;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 30 || _la === 31) {
                {
                {
                this.state = 238;
                _la = this.tokenStream.LA(1);
                if(!(_la === 30 || _la === 31)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 239;
                this.multiplicativeExpression();
                }
                }
                this.state = 244;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public multiplicativeExpression(): MultiplicativeExpressionContext {
        let localContext = new MultiplicativeExpressionContext(this.context, this.state);
        this.enterRule(localContext, 48, ACLParser.RULE_multiplicativeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 245;
            this.unaryExpression();
            this.state = 250;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32 || _la === 33) {
                {
                {
                this.state = 246;
                _la = this.tokenStream.LA(1);
                if(!(_la === 32 || _la === 33)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 247;
                this.unaryExpression();
                }
                }
                this.state = 252;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unaryExpression(): UnaryExpressionContext {
        let localContext = new UnaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 50, ACLParser.RULE_unaryExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 254;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 31 || _la === 46) {
                {
                this.state = 253;
                _la = this.tokenStream.LA(1);
                if(!(_la === 31 || _la === 46)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
            }

            this.state = 256;
            this.postfixExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public postfixExpression(): PostfixExpressionContext {
        let localContext = new PostfixExpressionContext(this.context, this.state);
        this.enterRule(localContext, 52, ACLParser.RULE_postfixExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 258;
            this.primaryExpression();
            this.state = 262;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 20 || _la === 49) {
                {
                {
                this.state = 259;
                this.postfixOperator();
                }
                }
                this.state = 264;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public postfixOperator(): PostfixOperatorContext {
        let localContext = new PostfixOperatorContext(this.context, this.state);
        this.enterRule(localContext, 54, ACLParser.RULE_postfixOperator);
        try {
            this.state = 267;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ACLParser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 265;
                this.methodCall();
                }
                break;
            case ACLParser.DOT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 266;
                this.fieldAccess();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodCall(): MethodCallContext {
        let localContext = new MethodCallContext(this.context, this.state);
        this.enterRule(localContext, 56, ACLParser.RULE_methodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 269;
            this.match(ACLParser.LPAREN);
            this.state = 271;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3188326400) !== 0) || _la === 46 || _la === 49) {
                {
                this.state = 270;
                this.argumentList();
                }
            }

            this.state = 273;
            this.match(ACLParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fieldAccess(): FieldAccessContext {
        let localContext = new FieldAccessContext(this.context, this.state);
        this.enterRule(localContext, 58, ACLParser.RULE_fieldAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 275;
            this.match(ACLParser.DOT);
            this.state = 276;
            this.match(ACLParser.ID);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public primaryExpression(): PrimaryExpressionContext {
        let localContext = new PrimaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 60, ACLParser.RULE_primaryExpression);
        try {
            this.state = 285;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ACLParser.NUMBER:
            case ACLParser.FLOAT:
            case ACLParser.STRING:
            case ACLParser.BOOL:
            case ACLParser.NULL:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 278;
                this.literal();
                }
                break;
            case ACLParser.SELF:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 279;
                this.match(ACLParser.SELF);
                }
                break;
            case ACLParser.ID:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 280;
                this.match(ACLParser.ID);
                }
                break;
            case ACLParser.LPAREN:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 281;
                this.match(ACLParser.LPAREN);
                this.state = 282;
                this.expression();
                this.state = 283;
                this.match(ACLParser.RPAREN);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 62, ACLParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 287;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1040187392) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public argumentList(): ArgumentListContext {
        let localContext = new ArgumentListContext(this.context, this.state);
        this.enterRule(localContext, 64, ACLParser.RULE_argumentList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 289;
            this.expression();
            this.state = 294;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 23) {
                {
                {
                this.state = 290;
                this.match(ACLParser.COMMA);
                this.state = 291;
                this.expression();
                }
                }
                this.state = 296;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,53,298,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,1,0,
        5,0,68,8,0,10,0,12,0,71,9,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,
        1,2,1,2,1,2,1,3,1,3,5,3,87,8,3,10,3,12,3,90,9,3,1,4,3,4,93,8,4,1,
        4,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,3,5,105,8,5,1,5,1,5,1,5,1,
        6,1,6,1,6,5,6,113,8,6,10,6,12,6,116,9,6,1,7,1,7,5,7,120,8,7,10,7,
        12,7,123,9,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,
        1,8,1,8,1,8,3,8,141,8,8,1,9,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,
        10,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,5,11,163,8,
        11,10,11,12,11,166,9,11,1,11,3,11,169,8,11,1,12,5,12,172,8,12,10,
        12,12,12,175,9,12,1,12,3,12,178,8,12,1,13,1,13,1,13,1,13,1,13,1,
        13,1,14,1,14,1,14,1,15,1,15,3,15,191,8,15,1,15,1,15,1,16,1,16,1,
        16,1,16,1,17,1,17,1,18,1,18,1,18,3,18,204,8,18,1,19,1,19,1,19,5,
        19,209,8,19,10,19,12,19,212,9,19,1,20,1,20,1,20,5,20,217,8,20,10,
        20,12,20,220,9,20,1,21,1,21,1,21,5,21,225,8,21,10,21,12,21,228,9,
        21,1,22,1,22,1,22,5,22,233,8,22,10,22,12,22,236,9,22,1,23,1,23,1,
        23,5,23,241,8,23,10,23,12,23,244,9,23,1,24,1,24,1,24,5,24,249,8,
        24,10,24,12,24,252,9,24,1,25,3,25,255,8,25,1,25,1,25,1,26,1,26,5,
        26,261,8,26,10,26,12,26,264,9,26,1,27,1,27,3,27,268,8,27,1,28,1,
        28,3,28,272,8,28,1,28,1,28,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,
        30,1,30,1,30,3,30,286,8,30,1,31,1,31,1,32,1,32,1,32,5,32,293,8,32,
        10,32,12,32,296,9,32,1,32,0,0,33,0,2,4,6,8,10,12,14,16,18,20,22,
        24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,0,
        9,1,0,1,4,1,0,5,6,2,0,21,21,34,37,1,0,38,39,1,0,40,43,1,0,30,31,
        1,0,32,33,2,0,31,31,46,46,1,0,25,29,300,0,69,1,0,0,0,2,72,1,0,0,
        0,4,78,1,0,0,0,6,88,1,0,0,0,8,92,1,0,0,0,10,100,1,0,0,0,12,109,1,
        0,0,0,14,117,1,0,0,0,16,140,1,0,0,0,18,142,1,0,0,0,20,148,1,0,0,
        0,22,156,1,0,0,0,24,173,1,0,0,0,26,179,1,0,0,0,28,185,1,0,0,0,30,
        188,1,0,0,0,32,194,1,0,0,0,34,198,1,0,0,0,36,200,1,0,0,0,38,205,
        1,0,0,0,40,213,1,0,0,0,42,221,1,0,0,0,44,229,1,0,0,0,46,237,1,0,
        0,0,48,245,1,0,0,0,50,254,1,0,0,0,52,258,1,0,0,0,54,267,1,0,0,0,
        56,269,1,0,0,0,58,275,1,0,0,0,60,285,1,0,0,0,62,287,1,0,0,0,64,289,
        1,0,0,0,66,68,3,4,2,0,67,66,1,0,0,0,68,71,1,0,0,0,69,67,1,0,0,0,
        69,70,1,0,0,0,70,1,1,0,0,0,71,69,1,0,0,0,72,73,5,1,0,0,73,74,5,24,
        0,0,74,75,5,47,0,0,75,76,3,6,3,0,76,77,5,48,0,0,77,3,1,0,0,0,78,
        79,7,0,0,0,79,80,5,17,0,0,80,81,5,47,0,0,81,82,3,6,3,0,82,83,5,48,
        0,0,83,5,1,0,0,0,84,87,3,8,4,0,85,87,3,10,5,0,86,84,1,0,0,0,86,85,
        1,0,0,0,87,90,1,0,0,0,88,86,1,0,0,0,88,89,1,0,0,0,89,7,1,0,0,0,90,
        88,1,0,0,0,91,93,5,18,0,0,92,91,1,0,0,0,92,93,1,0,0,0,93,94,1,0,
        0,0,94,95,5,17,0,0,95,96,5,21,0,0,96,97,3,34,17,0,97,98,1,0,0,0,
        98,99,5,22,0,0,99,9,1,0,0,0,100,101,7,1,0,0,101,102,5,17,0,0,102,
        104,5,49,0,0,103,105,3,12,6,0,104,103,1,0,0,0,104,105,1,0,0,0,105,
        106,1,0,0,0,106,107,5,50,0,0,107,108,3,14,7,0,108,11,1,0,0,0,109,
        114,5,17,0,0,110,111,5,23,0,0,111,113,5,17,0,0,112,110,1,0,0,0,113,
        116,1,0,0,0,114,112,1,0,0,0,114,115,1,0,0,0,115,13,1,0,0,0,116,114,
        1,0,0,0,117,121,5,47,0,0,118,120,3,16,8,0,119,118,1,0,0,0,120,123,
        1,0,0,0,121,119,1,0,0,0,121,122,1,0,0,0,122,124,1,0,0,0,123,121,
        1,0,0,0,124,125,5,48,0,0,125,15,1,0,0,0,126,141,3,8,4,0,127,128,
        3,34,17,0,128,129,5,22,0,0,129,141,1,0,0,0,130,141,3,22,11,0,131,
        141,3,18,9,0,132,141,3,20,10,0,133,141,3,32,16,0,134,141,3,14,7,
        0,135,141,3,30,15,0,136,137,5,15,0,0,137,141,5,22,0,0,138,139,5,
        16,0,0,139,141,5,22,0,0,140,126,1,0,0,0,140,127,1,0,0,0,140,130,
        1,0,0,0,140,131,1,0,0,0,140,132,1,0,0,0,140,133,1,0,0,0,140,134,
        1,0,0,0,140,135,1,0,0,0,140,136,1,0,0,0,140,138,1,0,0,0,141,17,1,
        0,0,0,142,143,5,7,0,0,143,144,5,49,0,0,144,145,3,34,17,0,145,146,
        5,50,0,0,146,147,3,14,7,0,147,19,1,0,0,0,148,149,5,8,0,0,149,150,
        5,49,0,0,150,151,5,17,0,0,151,152,5,9,0,0,152,153,3,34,17,0,153,
        154,5,50,0,0,154,155,3,14,7,0,155,21,1,0,0,0,156,157,5,10,0,0,157,
        158,5,49,0,0,158,159,3,34,17,0,159,160,5,50,0,0,160,164,3,14,7,0,
        161,163,3,26,13,0,162,161,1,0,0,0,163,166,1,0,0,0,164,162,1,0,0,
        0,164,165,1,0,0,0,165,168,1,0,0,0,166,164,1,0,0,0,167,169,3,28,14,
        0,168,167,1,0,0,0,168,169,1,0,0,0,169,23,1,0,0,0,170,172,3,26,13,
        0,171,170,1,0,0,0,172,175,1,0,0,0,173,171,1,0,0,0,173,174,1,0,0,
        0,174,177,1,0,0,0,175,173,1,0,0,0,176,178,3,28,14,0,177,176,1,0,
        0,0,177,178,1,0,0,0,178,25,1,0,0,0,179,180,5,11,0,0,180,181,5,49,
        0,0,181,182,3,34,17,0,182,183,5,50,0,0,183,184,3,14,7,0,184,27,1,
        0,0,0,185,186,5,12,0,0,186,187,3,14,7,0,187,29,1,0,0,0,188,190,5,
        14,0,0,189,191,3,34,17,0,190,189,1,0,0,0,190,191,1,0,0,0,191,192,
        1,0,0,0,192,193,5,22,0,0,193,31,1,0,0,0,194,195,5,13,0,0,195,196,
        3,34,17,0,196,197,5,22,0,0,197,33,1,0,0,0,198,199,3,36,18,0,199,
        35,1,0,0,0,200,203,3,38,19,0,201,202,7,2,0,0,202,204,3,36,18,0,203,
        201,1,0,0,0,203,204,1,0,0,0,204,37,1,0,0,0,205,210,3,40,20,0,206,
        207,5,45,0,0,207,209,3,40,20,0,208,206,1,0,0,0,209,212,1,0,0,0,210,
        208,1,0,0,0,210,211,1,0,0,0,211,39,1,0,0,0,212,210,1,0,0,0,213,218,
        3,42,21,0,214,215,5,44,0,0,215,217,3,42,21,0,216,214,1,0,0,0,217,
        220,1,0,0,0,218,216,1,0,0,0,218,219,1,0,0,0,219,41,1,0,0,0,220,218,
        1,0,0,0,221,226,3,44,22,0,222,223,7,3,0,0,223,225,3,44,22,0,224,
        222,1,0,0,0,225,228,1,0,0,0,226,224,1,0,0,0,226,227,1,0,0,0,227,
        43,1,0,0,0,228,226,1,0,0,0,229,234,3,46,23,0,230,231,7,4,0,0,231,
        233,3,46,23,0,232,230,1,0,0,0,233,236,1,0,0,0,234,232,1,0,0,0,234,
        235,1,0,0,0,235,45,1,0,0,0,236,234,1,0,0,0,237,242,3,48,24,0,238,
        239,7,5,0,0,239,241,3,48,24,0,240,238,1,0,0,0,241,244,1,0,0,0,242,
        240,1,0,0,0,242,243,1,0,0,0,243,47,1,0,0,0,244,242,1,0,0,0,245,250,
        3,50,25,0,246,247,7,6,0,0,247,249,3,50,25,0,248,246,1,0,0,0,249,
        252,1,0,0,0,250,248,1,0,0,0,250,251,1,0,0,0,251,49,1,0,0,0,252,250,
        1,0,0,0,253,255,7,7,0,0,254,253,1,0,0,0,254,255,1,0,0,0,255,256,
        1,0,0,0,256,257,3,52,26,0,257,51,1,0,0,0,258,262,3,60,30,0,259,261,
        3,54,27,0,260,259,1,0,0,0,261,264,1,0,0,0,262,260,1,0,0,0,262,263,
        1,0,0,0,263,53,1,0,0,0,264,262,1,0,0,0,265,268,3,56,28,0,266,268,
        3,58,29,0,267,265,1,0,0,0,267,266,1,0,0,0,268,55,1,0,0,0,269,271,
        5,49,0,0,270,272,3,64,32,0,271,270,1,0,0,0,271,272,1,0,0,0,272,273,
        1,0,0,0,273,274,5,50,0,0,274,57,1,0,0,0,275,276,5,20,0,0,276,277,
        5,17,0,0,277,59,1,0,0,0,278,286,3,62,31,0,279,286,5,19,0,0,280,286,
        5,17,0,0,281,282,5,49,0,0,282,283,3,34,17,0,283,284,5,50,0,0,284,
        286,1,0,0,0,285,278,1,0,0,0,285,279,1,0,0,0,285,280,1,0,0,0,285,
        281,1,0,0,0,286,61,1,0,0,0,287,288,7,8,0,0,288,63,1,0,0,0,289,294,
        3,34,17,0,290,291,5,23,0,0,291,293,3,34,17,0,292,290,1,0,0,0,293,
        296,1,0,0,0,294,292,1,0,0,0,294,295,1,0,0,0,295,65,1,0,0,0,296,294,
        1,0,0,0,26,69,86,88,92,104,114,121,140,164,168,173,177,190,203,210,
        218,226,234,242,250,254,262,267,271,285,294
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!ACLParser.__ATN) {
            ACLParser.__ATN = new antlr.ATNDeserializer().deserialize(ACLParser._serializedATN);
        }

        return ACLParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(ACLParser.literalNames, ACLParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return ACLParser.vocabulary;
    }

    private static readonly decisionsToDFA = ACLParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public classDecl(): ClassDeclContext[];
    public classDecl(i: number): ClassDeclContext | null;
    public classDecl(i?: number): ClassDeclContext[] | ClassDeclContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassDeclContext);
        }

        return this.getRuleContext(i, ClassDeclContext);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_program;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class EntryPointDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(ACLParser.CLASS, 0)!;
    }
    public MAIN(): antlr.TerminalNode {
        return this.getToken(ACLParser.MAIN, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(ACLParser.LBRACE, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(ACLParser.RBRACE, 0)!;
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_entryPointDecl;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterEntryPointDecl) {
             listener.enterEntryPointDecl(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitEntryPointDecl) {
             listener.exitEntryPointDecl(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitEntryPointDecl) {
            return visitor.visitEntryPointDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ClassDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(ACLParser.ID, 0)!;
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(ACLParser.LBRACE, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(ACLParser.RBRACE, 0)!;
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.CLASS, 0);
    }
    public COMPONENT(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.COMPONENT, 0);
    }
    public EXTENSION(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.EXTENSION, 0);
    }
    public CUTSCENE(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.CUTSCENE, 0);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_classDecl;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterClassDecl) {
             listener.enterClassDecl(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitClassDecl) {
             listener.exitClassDecl(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitClassDecl) {
            return visitor.visitClassDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ClassBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableDecl(): VariableDeclContext[];
    public variableDecl(i: number): VariableDeclContext | null;
    public variableDecl(i?: number): VariableDeclContext[] | VariableDeclContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableDeclContext);
        }

        return this.getRuleContext(i, VariableDeclContext);
    }
    public methodDecl(): MethodDeclContext[];
    public methodDecl(i: number): MethodDeclContext | null;
    public methodDecl(i?: number): MethodDeclContext[] | MethodDeclContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MethodDeclContext);
        }

        return this.getRuleContext(i, MethodDeclContext);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_classBody;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitClassBody) {
             listener.exitClassBody(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitClassBody) {
            return visitor.visitClassBody(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VariableDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ACLParser.SEMI, 0)!;
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.ID, 0);
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.ASSIGN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.PRIVATE, 0);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_variableDecl;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterVariableDecl) {
             listener.enterVariableDecl(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitVariableDecl) {
             listener.exitVariableDecl(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitVariableDecl) {
            return visitor.visitVariableDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MethodDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(ACLParser.ID, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.RPAREN, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public FUNCTION(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.FUNCTION, 0);
    }
    public COROUTINE(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.COROUTINE, 0);
    }
    public paramList(): ParamListContext | null {
        return this.getRuleContext(0, ParamListContext);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_methodDecl;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterMethodDecl) {
             listener.enterMethodDecl(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitMethodDecl) {
             listener.exitMethodDecl(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitMethodDecl) {
            return visitor.visitMethodDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParamListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode[];
    public ID(i: number): antlr.TerminalNode | null;
    public ID(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.ID);
    	} else {
    		return this.getToken(ACLParser.ID, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.COMMA);
    	} else {
    		return this.getToken(ACLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_paramList;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterParamList) {
             listener.enterParamList(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitParamList) {
             listener.exitParamList(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitParamList) {
            return visitor.visitParamList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(ACLParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(ACLParser.RBRACE, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_block;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableDecl(): VariableDeclContext | null {
        return this.getRuleContext(0, VariableDeclContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.SEMI, 0);
    }
    public ifStatement(): IfStatementContext | null {
        return this.getRuleContext(0, IfStatementContext);
    }
    public whileLoop(): WhileLoopContext | null {
        return this.getRuleContext(0, WhileLoopContext);
    }
    public forLoop(): ForLoopContext | null {
        return this.getRuleContext(0, ForLoopContext);
    }
    public waitStatement(): WaitStatementContext | null {
        return this.getRuleContext(0, WaitStatementContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public returnStatement(): ReturnStatementContext | null {
        return this.getRuleContext(0, ReturnStatementContext);
    }
    public BREAK(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.BREAK, 0);
    }
    public CONTINUE(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.CONTINUE, 0);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_statement;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class WhileLoopContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(ACLParser.WHILE, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.RPAREN, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_whileLoop;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterWhileLoop) {
             listener.enterWhileLoop(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitWhileLoop) {
             listener.exitWhileLoop(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitWhileLoop) {
            return visitor.visitWhileLoop(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ForLoopContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(ACLParser.FOR, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.LPAREN, 0)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(ACLParser.ID, 0)!;
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(ACLParser.IN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.RPAREN, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_forLoop;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterForLoop) {
             listener.enterForLoop(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitForLoop) {
             listener.exitForLoop(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitForLoop) {
            return visitor.visitForLoop(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IfStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(ACLParser.IF, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.RPAREN, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public elifStatement(): ElifStatementContext[];
    public elifStatement(i: number): ElifStatementContext | null;
    public elifStatement(i?: number): ElifStatementContext[] | ElifStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ElifStatementContext);
        }

        return this.getRuleContext(i, ElifStatementContext);
    }
    public elseStatement(): ElseStatementContext | null {
        return this.getRuleContext(0, ElseStatementContext);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_ifStatement;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterIfStatement) {
             listener.enterIfStatement(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitIfStatement) {
             listener.exitIfStatement(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitIfStatement) {
            return visitor.visitIfStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ElifBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public elifStatement(): ElifStatementContext[];
    public elifStatement(i: number): ElifStatementContext | null;
    public elifStatement(i?: number): ElifStatementContext[] | ElifStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ElifStatementContext);
        }

        return this.getRuleContext(i, ElifStatementContext);
    }
    public elseStatement(): ElseStatementContext | null {
        return this.getRuleContext(0, ElseStatementContext);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_elifBlock;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterElifBlock) {
             listener.enterElifBlock(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitElifBlock) {
             listener.exitElifBlock(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitElifBlock) {
            return visitor.visitElifBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ElifStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ELIF(): antlr.TerminalNode {
        return this.getToken(ACLParser.ELIF, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.RPAREN, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_elifStatement;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterElifStatement) {
             listener.enterElifStatement(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitElifStatement) {
             listener.exitElifStatement(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitElifStatement) {
            return visitor.visitElifStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ElseStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(ACLParser.ELSE, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_elseStatement;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterElseStatement) {
             listener.enterElseStatement(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitElseStatement) {
             listener.exitElseStatement(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitElseStatement) {
            return visitor.visitElseStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ReturnStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(ACLParser.RETURN, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ACLParser.SEMI, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_returnStatement;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterReturnStatement) {
             listener.enterReturnStatement(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitReturnStatement) {
             listener.exitReturnStatement(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitReturnStatement) {
            return visitor.visitReturnStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class WaitStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WAIT(): antlr.TerminalNode {
        return this.getToken(ACLParser.WAIT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ACLParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_waitStatement;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterWaitStatement) {
             listener.enterWaitStatement(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitWaitStatement) {
             listener.exitWaitStatement(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitWaitStatement) {
            return visitor.visitWaitStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public assignmentExpression(): AssignmentExpressionContext {
        return this.getRuleContext(0, AssignmentExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_expression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AssignmentExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public logicalOrExpression(): LogicalOrExpressionContext {
        return this.getRuleContext(0, LogicalOrExpressionContext)!;
    }
    public assignmentExpression(): AssignmentExpressionContext | null {
        return this.getRuleContext(0, AssignmentExpressionContext);
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.ASSIGN, 0);
    }
    public PLUS_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.PLUS_ASSIGN, 0);
    }
    public MINUS_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.MINUS_ASSIGN, 0);
    }
    public MULTIPLY_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.MULTIPLY_ASSIGN, 0);
    }
    public DIVIDE_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.DIVIDE_ASSIGN, 0);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_assignmentExpression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterAssignmentExpression) {
             listener.enterAssignmentExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitAssignmentExpression) {
             listener.exitAssignmentExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitAssignmentExpression) {
            return visitor.visitAssignmentExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LogicalOrExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public logicalAndExpression(): LogicalAndExpressionContext[];
    public logicalAndExpression(i: number): LogicalAndExpressionContext | null;
    public logicalAndExpression(i?: number): LogicalAndExpressionContext[] | LogicalAndExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LogicalAndExpressionContext);
        }

        return this.getRuleContext(i, LogicalAndExpressionContext);
    }
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.OR);
    	} else {
    		return this.getToken(ACLParser.OR, i);
    	}
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_logicalOrExpression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterLogicalOrExpression) {
             listener.enterLogicalOrExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitLogicalOrExpression) {
             listener.exitLogicalOrExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitLogicalOrExpression) {
            return visitor.visitLogicalOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LogicalAndExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public equalityExpression(): EqualityExpressionContext[];
    public equalityExpression(i: number): EqualityExpressionContext | null;
    public equalityExpression(i?: number): EqualityExpressionContext[] | EqualityExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(EqualityExpressionContext);
        }

        return this.getRuleContext(i, EqualityExpressionContext);
    }
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.AND);
    	} else {
    		return this.getToken(ACLParser.AND, i);
    	}
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_logicalAndExpression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterLogicalAndExpression) {
             listener.enterLogicalAndExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitLogicalAndExpression) {
             listener.exitLogicalAndExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitLogicalAndExpression) {
            return visitor.visitLogicalAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class EqualityExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public relationalExpression(): RelationalExpressionContext[];
    public relationalExpression(i: number): RelationalExpressionContext | null;
    public relationalExpression(i?: number): RelationalExpressionContext[] | RelationalExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RelationalExpressionContext);
        }

        return this.getRuleContext(i, RelationalExpressionContext);
    }
    public EQUALS(): antlr.TerminalNode[];
    public EQUALS(i: number): antlr.TerminalNode | null;
    public EQUALS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.EQUALS);
    	} else {
    		return this.getToken(ACLParser.EQUALS, i);
    	}
    }
    public NOT_EQUALS(): antlr.TerminalNode[];
    public NOT_EQUALS(i: number): antlr.TerminalNode | null;
    public NOT_EQUALS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.NOT_EQUALS);
    	} else {
    		return this.getToken(ACLParser.NOT_EQUALS, i);
    	}
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_equalityExpression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterEqualityExpression) {
             listener.enterEqualityExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitEqualityExpression) {
             listener.exitEqualityExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitEqualityExpression) {
            return visitor.visitEqualityExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RelationalExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public additiveExpression(): AdditiveExpressionContext[];
    public additiveExpression(i: number): AdditiveExpressionContext | null;
    public additiveExpression(i?: number): AdditiveExpressionContext[] | AdditiveExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AdditiveExpressionContext);
        }

        return this.getRuleContext(i, AdditiveExpressionContext);
    }
    public LESS(): antlr.TerminalNode[];
    public LESS(i: number): antlr.TerminalNode | null;
    public LESS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.LESS);
    	} else {
    		return this.getToken(ACLParser.LESS, i);
    	}
    }
    public LESS_EQUAL(): antlr.TerminalNode[];
    public LESS_EQUAL(i: number): antlr.TerminalNode | null;
    public LESS_EQUAL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.LESS_EQUAL);
    	} else {
    		return this.getToken(ACLParser.LESS_EQUAL, i);
    	}
    }
    public GREATER(): antlr.TerminalNode[];
    public GREATER(i: number): antlr.TerminalNode | null;
    public GREATER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.GREATER);
    	} else {
    		return this.getToken(ACLParser.GREATER, i);
    	}
    }
    public GREATER_EQUAL(): antlr.TerminalNode[];
    public GREATER_EQUAL(i: number): antlr.TerminalNode | null;
    public GREATER_EQUAL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.GREATER_EQUAL);
    	} else {
    		return this.getToken(ACLParser.GREATER_EQUAL, i);
    	}
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_relationalExpression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterRelationalExpression) {
             listener.enterRelationalExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitRelationalExpression) {
             listener.exitRelationalExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitRelationalExpression) {
            return visitor.visitRelationalExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AdditiveExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public multiplicativeExpression(): MultiplicativeExpressionContext[];
    public multiplicativeExpression(i: number): MultiplicativeExpressionContext | null;
    public multiplicativeExpression(i?: number): MultiplicativeExpressionContext[] | MultiplicativeExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MultiplicativeExpressionContext);
        }

        return this.getRuleContext(i, MultiplicativeExpressionContext);
    }
    public PLUS(): antlr.TerminalNode[];
    public PLUS(i: number): antlr.TerminalNode | null;
    public PLUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.PLUS);
    	} else {
    		return this.getToken(ACLParser.PLUS, i);
    	}
    }
    public MINUS(): antlr.TerminalNode[];
    public MINUS(i: number): antlr.TerminalNode | null;
    public MINUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.MINUS);
    	} else {
    		return this.getToken(ACLParser.MINUS, i);
    	}
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_additiveExpression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterAdditiveExpression) {
             listener.enterAdditiveExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitAdditiveExpression) {
             listener.exitAdditiveExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitAdditiveExpression) {
            return visitor.visitAdditiveExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MultiplicativeExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unaryExpression(): UnaryExpressionContext[];
    public unaryExpression(i: number): UnaryExpressionContext | null;
    public unaryExpression(i?: number): UnaryExpressionContext[] | UnaryExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnaryExpressionContext);
        }

        return this.getRuleContext(i, UnaryExpressionContext);
    }
    public MULTIPLY(): antlr.TerminalNode[];
    public MULTIPLY(i: number): antlr.TerminalNode | null;
    public MULTIPLY(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.MULTIPLY);
    	} else {
    		return this.getToken(ACLParser.MULTIPLY, i);
    	}
    }
    public DIVIDE(): antlr.TerminalNode[];
    public DIVIDE(i: number): antlr.TerminalNode | null;
    public DIVIDE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.DIVIDE);
    	} else {
    		return this.getToken(ACLParser.DIVIDE, i);
    	}
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_multiplicativeExpression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterMultiplicativeExpression) {
             listener.enterMultiplicativeExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitMultiplicativeExpression) {
             listener.exitMultiplicativeExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitMultiplicativeExpression) {
            return visitor.visitMultiplicativeExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UnaryExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public postfixExpression(): PostfixExpressionContext {
        return this.getRuleContext(0, PostfixExpressionContext)!;
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.NOT, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.MINUS, 0);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_unaryExpression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterUnaryExpression) {
             listener.enterUnaryExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitUnaryExpression) {
             listener.exitUnaryExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitUnaryExpression) {
            return visitor.visitUnaryExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PostfixExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primaryExpression(): PrimaryExpressionContext {
        return this.getRuleContext(0, PrimaryExpressionContext)!;
    }
    public postfixOperator(): PostfixOperatorContext[];
    public postfixOperator(i: number): PostfixOperatorContext | null;
    public postfixOperator(i?: number): PostfixOperatorContext[] | PostfixOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PostfixOperatorContext);
        }

        return this.getRuleContext(i, PostfixOperatorContext);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_postfixExpression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterPostfixExpression) {
             listener.enterPostfixExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitPostfixExpression) {
             listener.exitPostfixExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitPostfixExpression) {
            return visitor.visitPostfixExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PostfixOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public methodCall(): MethodCallContext | null {
        return this.getRuleContext(0, MethodCallContext);
    }
    public fieldAccess(): FieldAccessContext | null {
        return this.getRuleContext(0, FieldAccessContext);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_postfixOperator;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterPostfixOperator) {
             listener.enterPostfixOperator(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitPostfixOperator) {
             listener.exitPostfixOperator(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitPostfixOperator) {
            return visitor.visitPostfixOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MethodCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(ACLParser.RPAREN, 0)!;
    }
    public argumentList(): ArgumentListContext | null {
        return this.getRuleContext(0, ArgumentListContext);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_methodCall;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterMethodCall) {
             listener.enterMethodCall(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitMethodCall) {
             listener.exitMethodCall(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitMethodCall) {
            return visitor.visitMethodCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FieldAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(ACLParser.DOT, 0)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(ACLParser.ID, 0)!;
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_fieldAccess;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterFieldAccess) {
             listener.enterFieldAccess(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitFieldAccess) {
             listener.exitFieldAccess(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitFieldAccess) {
            return visitor.visitFieldAccess(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrimaryExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public SELF(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.SELF, 0);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.ID, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.LPAREN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_primaryExpression;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterPrimaryExpression) {
             listener.enterPrimaryExpression(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitPrimaryExpression) {
             listener.exitPrimaryExpression(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitPrimaryExpression) {
            return visitor.visitPrimaryExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.NUMBER, 0);
    }
    public FLOAT(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.FLOAT, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.STRING, 0);
    }
    public BOOL(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.BOOL, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(ACLParser.NULL, 0);
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_literal;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitLiteral) {
            return visitor.visitLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArgumentListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ACLParser.COMMA);
    	} else {
    		return this.getToken(ACLParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return ACLParser.RULE_argumentList;
    }
    public override enterRule(listener: ACLListener): void {
        if(listener.enterArgumentList) {
             listener.enterArgumentList(this);
        }
    }
    public override exitRule(listener: ACLListener): void {
        if(listener.exitArgumentList) {
             listener.exitArgumentList(this);
        }
    }
    public override accept<Result>(visitor: ACLVisitor<Result>): Result | null {
        if (visitor.visitArgumentList) {
            return visitor.visitArgumentList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
