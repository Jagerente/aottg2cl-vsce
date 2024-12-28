import * as vscode from 'vscode';

export interface ISemanticToken {
    range: vscode.Range;
    tokenType: string;
    tokenModifiers?: string[];
}