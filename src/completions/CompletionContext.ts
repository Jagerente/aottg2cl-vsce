import * as vscode from 'vscode';
import { IClass, IMethod, IConstructor, IChainNode } from '../classes/IClass';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';

export interface CompletionContext {
    document: vscode.TextDocument;
    position: vscode.Position;
    lineText: string;
    textBeforeCursor: string;
    textAfterCursor: string;
    wordRange: vscode.Range | undefined;
    isInsideClassDeclaration: boolean;
    isInsideMethodDeclaration: boolean;
    isDeclaringFunction: boolean;
    isDeclaringVariable: boolean;
    isInsideChainNode: boolean;
    isInsideString: boolean;
    isInsideComment: boolean;
    currentClass: IClass | undefined;
    currentMethod: IMethod | IConstructor | undefined;
    currentDeclaringMethod: IMethod | IConstructor | undefined;
    callChainInfo: CallChainInfo | undefined;
    nextIsParen: boolean;
    documentTreeProvider: DocumentTreeProvider;
}

export interface CallChainInfo {
    chain: IChainNode[];
    nodeIndex: number | undefined;
    identifierChain: string[];
}
