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

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.providers.push(new DiagnosticCodeActionOrchestrator(documentTreeProvider));
        this.providers.push(new FormatClassBracesProvider(documentTreeProvider));
        this.providers.push(new FormatMethodBracesProvider(documentTreeProvider));
    }

    public provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range | vscode.Selection,
        context: vscode.CodeActionContext,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {
        if (token.isCancellationRequested) {
            return [];
        }

        const actions: (vscode.CodeAction | vscode.Command)[] = [];

        for (const provider of this.providers) {
            if (token.isCancellationRequested) {
                break;
            }

            const providerActions = provider.provideCodeActions(document, range, context, token);

            if (token.isCancellationRequested) {
                break;
            }

            if (providerActions) {
                if (Array.isArray(providerActions)) {
                    actions.push(...providerActions);
                }
            }
        }

        return actions;
    }
}
