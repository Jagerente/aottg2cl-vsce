import * as vscode from 'vscode';
import {KeywordCompletionProvider} from './completions/KeywordCompletionProvider';
import {VariableCompletionProvider} from './completions/VariableCompletionProvider';
import {MainFunctionsCompletionProvider} from './completions/MainFunctionsCompletionProvider';
import {CompletionOrchestrator} from './completions/CompletionOrchestrator';
import {HoverOrchestrator} from './completions/HoverOrchestrator';
import {SignatureHelpOrchestrator} from './completions/SignatureHelpOrchestrator';
import {SymbolProvider} from './completions/SymbolProvider';
import {VariableDefinitionProvider} from './definition/VariableDefinitionProvider';
import {buildAvailableClasses} from './classes/AvailableClasses';
import {ACLManager} from './antlr4ts/ACLManager';
import {DiagnosticManager} from './diagnostic/DiagnosticManager';
import {DocumentTreeProvider} from './utils/DocumentTreeProvider';
import {buildFinalFile} from './commands/BuildFinalFile';
import {buildFinalFileIntoMap} from './commands/BuildFinalFileIntoMap';
import {BuildFinalFileTaskProvider} from './tasks/BuildFinalFileTaskProvider';
import {BuildFinalFileIntoMapTaskProvider} from './tasks/BuildFinalFileIntoMapTaskProvider';
import {ACLFormatter} from './formatting/ACLFormatter';
import {DebugAdapterDescriptorFactory, DebugConfigurationProvider} from './debugger/adapter';
import {Settings} from './config/settings';
import {CodeActionProviderOrchestrator} from './actions/CodeActionProviderOrchestrator';

export let extensionContext: vscode.ExtensionContext;

export async function activate(context: vscode.ExtensionContext) {
    extensionContext = context;

    const {classes, genericClasses} = buildAvailableClasses(context);

    const aclManager = new ACLManager();
    const documentTreeProvider = new DocumentTreeProvider(aclManager, classes, genericClasses);

    const keywordsProvider = new KeywordCompletionProvider();
    const variablesProvider = new VariableCompletionProvider();
    const callbacksProvider = new MainFunctionsCompletionProvider();

    const completionOrchestrator = new CompletionOrchestrator(
        documentTreeProvider,
        variablesProvider,
        keywordsProvider,
        callbacksProvider
    );
    const hoverOrchestrator = new HoverOrchestrator(
        documentTreeProvider,
        variablesProvider,
        keywordsProvider
    );
    const signatureHelpOrchestrator = new SignatureHelpOrchestrator(
        documentTreeProvider,
        variablesProvider
    );

    const formatter = new ACLFormatter();
    const variableDefinitionProvider = new VariableDefinitionProvider(documentTreeProvider);
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('acl');
    const diagnosticManager = new DiagnosticManager(diagnosticCollection, aclManager, documentTreeProvider);
    const symbolProvider = new SymbolProvider(documentTreeProvider);
    const codeActionOrchestrator = new CodeActionProviderOrchestrator(documentTreeProvider);

    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider({language: 'acl'}, completionOrchestrator, ' ', '.'),
        vscode.languages.registerHoverProvider({language: 'acl'}, hoverOrchestrator),
        vscode.languages.registerSignatureHelpProvider({language: 'acl'}, signatureHelpOrchestrator, '(', ',', ' '),
        vscode.languages.registerDefinitionProvider({language: 'acl'}, variableDefinitionProvider),
        vscode.languages.registerDocumentFormattingEditProvider({language: 'acl'}, formatter),
        vscode.languages.registerCodeActionsProvider({language: 'acl'}, codeActionOrchestrator, {
            providedCodeActionKinds: CodeActionProviderOrchestrator.providedCodeActionKinds
        }),
        diagnosticCollection,
        vscode.commands.registerCommand('extension.buildScript', buildFinalFile),
        vscode.commands.registerCommand('extension.buildScriptIntoMap', buildFinalFileIntoMap),
        vscode.languages.registerDocumentSymbolProvider({language: 'acl', scheme: 'file'}, symbolProvider),
        vscode.tasks.registerTaskProvider(BuildFinalFileTaskProvider.type, new BuildFinalFileTaskProvider()),
        vscode.tasks.registerTaskProvider(BuildFinalFileIntoMapTaskProvider.type, new BuildFinalFileIntoMapTaskProvider()),
        vscode.debug.registerDebugAdapterDescriptorFactory('cl', new DebugAdapterDescriptorFactory()),
        vscode.debug.registerDebugConfigurationProvider('cl', new DebugConfigurationProvider()),
    );

    const refetchDocumentData = async (document: vscode.TextDocument) => {
        if (document.languageId !== 'acl') {
            return;
        }
        await documentTreeProvider.refetchUserDefinedClasses(document);
        diagnosticManager.validateDocument(document);
    };

    for (const document of vscode.workspace.textDocuments) {
        if (document.languageId === 'acl') {
            await refetchDocumentData(document);
        }
    }

    let parseTimeout: NodeJS.Timeout | null = null;
    const useLegacyMode = Settings.useLegacyParsingMode;

    vscode.workspace.onDidOpenTextDocument(async document => {
        await refetchDocumentData(document);
    });

    // TODO: Remove legacy mode after some feedback
    if (useLegacyMode) {
        vscode.workspace.onDidChangeTextDocument(event => {
            if (event.document.languageId !== 'acl') {
                return;
            }

            if (parseTimeout) {
                clearTimeout(parseTimeout);
            }
            parseTimeout = setTimeout(async () => {
                await refetchDocumentData(event.document);
            }, 300);
        });
    } else {
        vscode.workspace.onDidChangeTextDocument(event => {
            if (event.document.languageId !== 'acl') {
                return;
            }

            refetchDocumentData(event.document).catch(err => {
                console.error('Error parsing document:', err);
            });
        });
    }

    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('aottg2cl.parsing.useLegacyMode')) {
                vscode.window.showInformationMessage(
                    'Parsing mode setting changed. Extension reload required for changes to take effect.',
                    'Reload Window'
                ).then(selection => {
                    if (selection === 'Reload Window') {
                        vscode.commands.executeCommand('workbench.action.reloadWindow');
                    }
                });
            }
        })
    );

    vscode.window.onDidChangeActiveTextEditor(async editor => {
        if (editor && editor.document.languageId === 'acl') {
            await refetchDocumentData(editor.document);
        }
    });
    vscode.window.onDidChangeWindowState(async event => {
        if (event.focused) {
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor && activeEditor.document.languageId === 'acl') {
                await refetchDocumentData(activeEditor.document);
            }
            for (const document of vscode.workspace.textDocuments) {
                if (document.languageId === 'acl' && document !== activeEditor?.document) {
                    await refetchDocumentData(document);
                }
            }
        }
    });
    vscode.workspace.onDidCloseTextDocument(doc => {
        if (doc.languageId === 'acl') {
            // TODO: Remove legacy mode after some feedback
            if (parseTimeout) {
                clearTimeout(parseTimeout);
                parseTimeout = null;
            }
            documentTreeProvider.clearDocument(doc);
            diagnosticCollection.delete(doc.uri);
        }
    });
}

export function deactivate() {
}
