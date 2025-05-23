import * as vscode from 'vscode';
import { KeywordCompletionProvider } from './completions/KeywordCompletionProvider';
import { VariableCompletionProvider } from './completions/VariableCompletionProvider';
import { MainFunctionsCompletionProvider } from './completions/MainFunctionsCompletionProvider';
import { SymbolProvider } from './completions/SymbolProvider';
import { VariableDefinitionProvider } from './definition/VariableDefinitionProvider';
import { AvailableClassesMap } from './classes/AvailableClasses';
import { ACLManager } from './antlr4ts/ACLManager';
import { DiagnosticManager } from './diagnostic/DiagnosticManager';
import { DocumentTreeProvider } from './utils/DocumentTreeProvider';
import { VariableCollector } from './utils/VariableCollector';
import { buildFinalFile } from './commands/BuildFinalFile';

export async function activate(context: vscode.ExtensionContext) {
	const aclManager = new ACLManager();
	const documentTreeProvider = new DocumentTreeProvider(aclManager, AvailableClassesMap);
	const variableCollector = new VariableCollector(documentTreeProvider);
	const keywordsProvider = new KeywordCompletionProvider(documentTreeProvider);
	const variablesProvider = new VariableCompletionProvider(documentTreeProvider, variableCollector);
	const callbacksProvider = new MainFunctionsCompletionProvider(documentTreeProvider);
	const variableDefinitionProvider = new VariableDefinitionProvider(documentTreeProvider, variableCollector);
	const diagnosticCollection = vscode.languages.createDiagnosticCollection('acl');
	const diagnosticManager = new DiagnosticManager(diagnosticCollection, aclManager, documentTreeProvider);
	const symbolProvider = new SymbolProvider(documentTreeProvider);

	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, variablesProvider, ' ', '.'),
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, keywordsProvider, ' '),
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, callbacksProvider, ' '),
		vscode.languages.registerHoverProvider({ language: 'acl' }, variablesProvider),
		vscode.languages.registerHoverProvider({ language: 'acl' }, keywordsProvider),
		vscode.languages.registerSignatureHelpProvider({ language: 'acl' }, variablesProvider, '(', ',', ' '),
		vscode.languages.registerDefinitionProvider({ language: 'acl' }, variableDefinitionProvider),
		diagnosticCollection,
		vscode.commands.registerCommand('extension.buildScript', buildFinalFile),
		vscode.languages.registerDocumentSymbolProvider({ language: 'acl', scheme: 'file' }, symbolProvider),
	);

	const refetchDocumentData = async (document: vscode.TextDocument) => {
		await documentTreeProvider.refetchUserDefinedClasses(document);
		diagnosticManager.validateDocument(document);
	};

	await Promise.all(
      vscode.workspace.textDocuments
        .filter(doc => doc.languageId === 'acl')
        .map(doc => refetchDocumentData(doc))
    );

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
}

export function deactivate() { }
