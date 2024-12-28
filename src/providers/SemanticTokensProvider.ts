import * as vscode from 'vscode';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';
import { SemanticTokensLegend } from '../utils/SemanticTokensLegend';

export class SemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    provideDocumentSemanticTokens(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SemanticTokens> {
        var builder = new vscode.SemanticTokensBuilder(SemanticTokensLegend);
        this.documentTreeProvider.getSemanticTokens().forEach(token => {
            builder.push(token.range, token.tokenType, token.tokenModifiers ?? []);
        });
        return builder.build();
    }
}