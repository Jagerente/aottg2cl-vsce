import * as vscode from 'vscode';
import {DiagnosticCodeActionOrchestrator} from './DiagnosticCodeActionOrchestrator';
import {FormatClassBracesProvider} from './FormatClassBracesProvider';
import {FormatMethodBracesProvider} from './FormatMethodBracesProvider';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';

export class CodeActionProviderOrchestrator implements vscode.CodeActionProvider {
    public static readonly providedCodeActionKinds = Array.from(
        new Set([
            ...DiagnosticCodeActionOrchestrator.providedCodeActionKinds,
            ...FormatClassBracesProvider.providedCodeActionKinds,
            ...FormatMethodBracesProvider.providedCodeActionKinds
        ])
    );

    private readonly providers: vscode.CodeActionProvider[] = [];

    constructor(private readonly documentTreeProvider: DocumentTreeProvider) {
        this.providers.push(new DiagnosticCodeActionOrchestrator(this.documentTreeProvider));
        this.providers.push(new FormatClassBracesProvider(this.documentTreeProvider));
        this.providers.push(new FormatMethodBracesProvider(this.documentTreeProvider));
    }

    public async provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range | vscode.Selection,
        context: vscode.CodeActionContext,
        token: vscode.CancellationToken
    ): Promise<(vscode.CodeAction | vscode.Command)[] | undefined | null> {
        if (token.isCancellationRequested) {
            return [];
        }

        await this.documentTreeProvider.ensureDocumentParsed(document);

        const actions: (vscode.CodeAction | vscode.Command)[] = [];

        for (const provider of this.providers) {
            if (token.isCancellationRequested) {
                break;
            }

            const providerActionsResult = provider.provideCodeActions(document, range, context, token);
            const providerActions = await Promise.resolve(providerActionsResult);

            if (token.isCancellationRequested) {
                break;
            }

            if (providerActions && Array.isArray(providerActions)) {
                actions.push(...providerActions);
            }
        }

        return actions;
    }
}
