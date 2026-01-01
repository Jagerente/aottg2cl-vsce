import * as vscode from 'vscode';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';
import {VariableHoverProvider} from './VariableHoverProvider';
import {KeywordHoverProvider} from './KeywordHoverProvider';

export class HoverOrchestrator implements vscode.HoverProvider {
    private readonly variableHoverProvider: VariableHoverProvider;
    private readonly keywordHoverProvider: KeywordHoverProvider;

    constructor(
        private documentTreeProvider: DocumentTreeProvider,
    ) {
        this.variableHoverProvider = new VariableHoverProvider(documentTreeProvider);
        this.keywordHoverProvider = new KeywordHoverProvider();
    }

    public async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.Hover | undefined> {
        await this.documentTreeProvider.ensureDocumentParsed(document);

        if (this.documentTreeProvider.isInsideString(document, position) || this.documentTreeProvider.isInsideComment(document, position)) {
            return undefined;
        }

        const keywordHover = this.keywordHoverProvider.provideHover(document, position);
        if (keywordHover) {
            return keywordHover;
        }

        const variableHover = this.variableHoverProvider.provideHover(document, position);
        if (variableHover) {
            return variableHover;
        }

        return undefined;
    }
}
