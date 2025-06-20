import * as vscode from 'vscode';
import {KeywordCompletionProvider} from './completions/KeywordCompletionProvider';
import {VariableCompletionProvider} from './completions/VariableCompletionProvider';
import {MainFunctionsCompletionProvider} from './completions/MainFunctionsCompletionProvider';
import {SymbolProvider} from './completions/SymbolProvider';
import {VariableDefinitionProvider} from './definition/VariableDefinitionProvider';
import {AvailableClassesMap, AvailableGenericClassesMap} from './classes/AvailableClasses';
import {ACLManager} from './antlr4ts/ACLManager';
import {DiagnosticManager} from './diagnostic/DiagnosticManager';
import {DocumentTreeProvider} from './utils/DocumentTreeProvider';
import {buildFinalFile} from './commands/BuildFinalFile';
import {ACLFormatter} from './formatting/ACLFormatter';

export async function activate(context: vscode.ExtensionContext) {
    const aclManager = new ACLManager();
    const documentTreeProvider = new DocumentTreeProvider(aclManager, AvailableClassesMap, AvailableGenericClassesMap);
    const keywordsProvider = new KeywordCompletionProvider(documentTreeProvider);
    const variablesProvider = new VariableCompletionProvider(documentTreeProvider);
    const formatter = new ACLFormatter();

    const callbacksProvider = new MainFunctionsCompletionProvider(documentTreeProvider);
    const variableDefinitionProvider = new VariableDefinitionProvider(documentTreeProvider);
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('acl');
    const diagnosticManager = new DiagnosticManager(diagnosticCollection, aclManager, documentTreeProvider);
    const symbolProvider = new SymbolProvider(documentTreeProvider);
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider({language: 'acl'}, variablesProvider, ' ', '.'),
        vscode.languages.registerCompletionItemProvider({language: 'acl'}, keywordsProvider, ' '),
        vscode.languages.registerCompletionItemProvider({language: 'acl'}, callbacksProvider, ' '),
        vscode.languages.registerHoverProvider({language: 'acl'}, variablesProvider),
        vscode.languages.registerHoverProvider({language: 'acl'}, keywordsProvider),
        vscode.languages.registerSignatureHelpProvider({language: 'acl'}, variablesProvider, '(', ',', ' '),
        vscode.languages.registerDefinitionProvider({language: 'acl'}, variableDefinitionProvider),
        vscode.languages.registerDocumentFormattingEditProvider({language: 'acl'}, formatter),
        diagnosticCollection,
        vscode.commands.registerCommand('extension.buildScript', buildFinalFile),
        vscode.languages.registerDocumentSymbolProvider({language: 'acl', scheme: 'file'}, symbolProvider),
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

    vscode.workspace.onDidOpenTextDocument(async document => {
        await refetchDocumentData(document);
    });
    vscode.workspace.onDidChangeTextDocument(event => {
        if (parseTimeout) {
            clearTimeout(parseTimeout);
        }
        parseTimeout = setTimeout(async () => {
            await refetchDocumentData(event.document);
        }, 300);
    });
    vscode.window.onDidChangeActiveTextEditor(async editor => {
        if (editor && editor.document.languageId === 'acl') {
            await refetchDocumentData(editor.document);
        }
    });
    vscode.window.onDidChangeWindowState(event => {
        if (event.focused) {
            vscode.workspace.textDocuments.forEach(async document => {
                if (document.languageId === 'acl') {
                    await refetchDocumentData(document);
                }
            });
        }
    });
    vscode.workspace.onDidCloseTextDocument(doc => {
        if (doc.languageId === 'acl') {
            documentTreeProvider.clearDocument(doc);
        }
    });
}

export function deactivate() {
}
