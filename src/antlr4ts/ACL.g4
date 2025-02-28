grammar ACL;

CLASS: 'class';
COMPONENT: 'component';
EXTENSION: 'extension';
CUTSCENE: 'cutscene';

FUNCTION: 'function';
COROUTINE: 'coroutine';

WHILE: 'while';
FOR: 'for';
IN: 'in';

IF: 'if';
ELIF: 'elif';
ELSE: 'else';

WAIT: 'wait';

RETURN: 'return';
BREAK: 'break';
CONTINUE: 'continue';

ID: [a-zA-Z_][a-zA-Z0-9_]*;
PRIVATE: '_';
SELF: 'self';

DOT: '.';
ASSIGN: '=';
SEMI: ';';
COMMA: ',';

NUMBER: [0-9]+;
FLOAT: [0-9]+'.'[0-9]+;
STRING: '"' (~["\\] | '\\' .)* '"';
BOOL: 'true' | 'false';
NULL: 'null';

PLUS: '+';
MINUS: '-';
MULTIPLY: '*';
DIVIDE: '/';

PLUS_ASSIGN: '+=';
MINUS_ASSIGN: '-=';
MULTIPLY_ASSIGN: '*=';
DIVIDE_ASSIGN: '/=';

EQUALS: '==';
NOT_EQUALS: '!=';
LESS: '<';
LESS_EQUAL: '<=';
GREATER: '>';
GREATER_EQUAL: '>=';

AND: '&&';
OR: '||';
NOT: '!';

LBRACE: '{';
RBRACE: '}';
LPAREN: '(';
RPAREN: ')';

WS: [ \t\r\n]+ -> skip;

ANNOTATION_COMMENT: '#' WS* '@' ~[\r\n]*;

ANNOTATION_BLOCK_COMMENT: '/*' .*? '@' .*? '*/';

COMMENT: '#' ~[\r\n]* -> skip;

BLOCK_COMMENT: '/*' .*? '*/' -> skip;

program: annotation* classDecl*;

classDecl: (CLASS | COMPONENT | EXTENSION | CUTSCENE) ID LBRACE classBody RBRACE;

classBody: (variableDecl | methodDecl)*;

variableDecl: annotation* (PRIVATE? ID ASSIGN expression) SEMI;

methodDecl: annotation* (FUNCTION | COROUTINE) ID LPAREN paramList? RPAREN block;

paramList: param (COMMA param)*;

param: annotation* ID;

block: LBRACE statement* RBRACE;

statement
    : variableDecl
    | expression SEMI
    | ifStatement
    | whileLoop
    | forLoop
    | waitStatement
    | block
    | returnStatement
    | BREAK SEMI
    | CONTINUE SEMI
    ;

whileLoop: WHILE LPAREN expression RPAREN block;

forLoop: FOR LPAREN ID IN expression RPAREN block;

ifStatement: IF LPAREN expression RPAREN block (elifStatement)* elseStatement?;

elifStatement: ELIF LPAREN expression RPAREN block;

elseStatement: ELSE block;

returnStatement: RETURN expression? SEMI;

waitStatement: WAIT expression SEMI;

expression
    : assignmentExpression
    ;

assignmentExpression
    : logicalOrExpression ((ASSIGN | PLUS_ASSIGN | MINUS_ASSIGN | MULTIPLY_ASSIGN | DIVIDE_ASSIGN) assignmentExpression)?
    ;

logicalOrExpression
    : logicalAndExpression (OR logicalAndExpression)*
    ;

logicalAndExpression
    : equalityExpression (AND equalityExpression)*
    ;

equalityExpression
    : relationalExpression ((EQUALS | NOT_EQUALS) relationalExpression)*
    ;

relationalExpression
    : additiveExpression ((LESS | LESS_EQUAL | GREATER | GREATER_EQUAL) additiveExpression)*
    ;

additiveExpression
    : multiplicativeExpression ((PLUS | MINUS) multiplicativeExpression)*
    ;

multiplicativeExpression
    : unaryExpression ((MULTIPLY | DIVIDE) unaryExpression)*
    ;

unaryExpression
    : (NOT | MINUS)? postfixExpression
    ;

postfixExpression
    : primaryExpression (postfixOperator)*
    ;

postfixOperator
    : methodCall
    | fieldAccess
    | incompleteFieldAccess
    ;

methodCall
    : LPAREN argumentList? RPAREN
    ;

fieldAccess
    : DOT ID
    ;

incompleteFieldAccess
    : DOT
    ;

primaryExpression
    : literal
    | SELF
    | ID
    | LPAREN expression RPAREN
    ;

literal
    : NUMBER
    | FLOAT
    | STRING
    | BOOL
    | NULL
    ;

argumentList
    : expression (COMMA expression)*
    ;

annotation
    : ANNOTATION_COMMENT
    | ANNOTATION_BLOCK_COMMENT
    ;
