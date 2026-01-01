import * as vscode from 'vscode';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';
import {VariableSignatureHelpProvider} from './VariableSignatureHelpProvider';

export class SignatureHelpOrchestrator implements vscode.SignatureHelpProvider {
    private readonly variableSignatureHelpProvider: VariableSignatureHelpProvider;

    constructor(
        private documentTreeProvider: DocumentTreeProvider,
    ) {
        this.variableSignatureHelpProvider = new VariableSignatureHelpProvider(documentTreeProvider);
    }

    public async provideSignatureHelp(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.SignatureHelp | undefined> {
        await this.documentTreeProvider.ensureDocumentParsed(document);

        if (this.documentTreeProvider.isInsideString(document, position) || this.documentTreeProvider.isInsideComment(document, position)) {
            return undefined;
        }
        return this.variableSignatureHelpProvider.provideSignatureHelp(document, position);
    }
}
