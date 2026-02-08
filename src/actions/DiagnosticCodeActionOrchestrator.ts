import * as vscode from 'vscode';
import {IDiagnosticCodeActionProvider} from './IDiagnosticCodeActionProvider';
import {AddSelfFixProvider} from './AddSelfFixProvider';
import {AddCutsceneStartFixProvider} from './AddCutsceneStartFixProvider';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';

export class DiagnosticCodeActionOrchestrator implements vscode.CodeActionProvider {
    public static readonly providedCodeActionKinds = [
        vscode.CodeActionKind.QuickFix
    ];

    private readonly providers: IDiagnosticCodeActionProvider[] = [];

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.providers.push(new AddSelfFixProvider());
        this.providers.push(new AddCutsceneStartFixProvider(documentTreeProvider));
    }

    public provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range | vscode.Selection,
        context: vscode.CodeActionContext,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.CodeAction[]> {
        if (token.isCancellationRequested) {
            return [];
        }

        const actions: vscode.CodeAction[] = [];

        for (const diagnostic of context.diagnostics) {
            if (token.isCancellationRequested) {
                break;
            }

            if (!diagnostic.code) {
                continue;
            }

            let code: string | number | undefined;
            if (typeof diagnostic.code === 'string' || typeof diagnostic.code === 'number') {
                code = diagnostic.code;
            } else if (diagnostic.code && typeof diagnostic.code === 'object' && 'value' in diagnostic.code) {
                code = diagnostic.code.value;
            }

            if (!code) {
                continue;
            }

            for (const provider of this.providers) {
                if (token.isCancellationRequested) {
                    break;
                }

                const providerActions = provider.provideCodeActions(document, diagnostic, code);

                if (token.isCancellationRequested) {
                    break;
                }

                if (providerActions) {
                    actions.push(...providerActions);
                }
            }
        }

        return actions;
    }
}

