import * as vscode from 'vscode';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';
import { VariableCompletionProvider } from './VariableCompletionProvider';
import { KeywordCompletionProvider } from './KeywordCompletionProvider';

export class HoverOrchestrator implements vscode.HoverProvider {
    constructor(
        private documentTreeProvider: DocumentTreeProvider,
        private variableProvider: VariableCompletionProvider,
        private keywordProvider: KeywordCompletionProvider
    ) {}

    public provideHover(
        document: vscode.TextDocument,
        position: vscode.Position
    ): vscode.ProviderResult<vscode.Hover> {
        if (this.documentTreeProvider.isInsideString(document, position) || this.documentTreeProvider.isInsideComment(document, position)) {
            return undefined;
        }

        const keywordHover = this.keywordProvider.provideHover(document, position);
        if (keywordHover) {
            return keywordHover;
        }

        const variableHover = this.variableProvider.provideHover(document, position, this.documentTreeProvider);
        if (variableHover) {
            return variableHover;
        }

        return undefined;
    }
}

