import * as vscode from 'vscode';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';
import { VariableCompletionProvider } from './VariableCompletionProvider';

export class SignatureHelpOrchestrator implements vscode.SignatureHelpProvider {
    constructor(
        private documentTreeProvider: DocumentTreeProvider,
        private variableProvider: VariableCompletionProvider
    ) {}

    public provideSignatureHelp(
        document: vscode.TextDocument,
        position: vscode.Position
    ): vscode.ProviderResult<vscode.SignatureHelp> {
        return this.variableProvider.provideSignatureHelp(document, position, this.documentTreeProvider);
    }
}

