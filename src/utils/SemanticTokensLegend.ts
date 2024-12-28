import * as vscode from 'vscode';

export enum SemanticTokenTypes {
    STATIC = 'static',
    CLASS = 'class',
    CONSTRUCTOR = 'constructor',
    METHOD = 'method',
    Function = 'function',
    FIELD = 'field',
    Property = 'property',
    VARIABLE = 'variable',
    PARAMETER = 'parameter',
}

export enum SemanticTokenModifiers {
    READONLY = 'readonly',
    STATIC = 'static',
    DECLARATION = 'declaration',
    MODIFICATION = 'modification',
}

export const SemanticTokensLegend = new vscode.SemanticTokensLegend([
    SemanticTokenTypes.CLASS,
    SemanticTokenTypes.METHOD,
    SemanticTokenTypes.Function,
    SemanticTokenTypes.FIELD,
    SemanticTokenTypes.Property,
    SemanticTokenTypes.VARIABLE,
    SemanticTokenTypes.CONSTRUCTOR,
    SemanticTokenTypes.STATIC,
    SemanticTokenTypes.PARAMETER,
], [SemanticTokenModifiers.READONLY, SemanticTokenModifiers.STATIC, SemanticTokenModifiers.DECLARATION, SemanticTokenModifiers.MODIFICATION]);