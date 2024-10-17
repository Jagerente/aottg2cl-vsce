import * as vscode from 'vscode';
import { KeywordCompletionProvider } from './completions/KeywordCompletionProvider';
import { VariableCompletionProvider } from './completions/VariableCompletionProvider';
import { MainFunctionsCompletionProvider } from './completions/MainFunctionsCompletionProvider';
import { VariableDefinitionProvider } from './definition/VariableDefinitionProvider';
import { AvailableClassesMap } from './classes/AvailableClasses';
import { ACLManager } from './antlr/ACLManager';
import { DiagnosticManager } from './diagnostic/DiagnosticManager';
import { DocumentTreeProvider } from './utils/DocumentTreeProvider';
import { VariableCollector } from './utils/VariableCollector';

export function activate(context: vscode.ExtensionContext) {
	const aclManager = new ACLManager();
	const documentTreeProvider = new DocumentTreeProvider(aclManager, AvailableClassesMap);
	const variableCollector = new VariableCollector(documentTreeProvider);
	const keywordsProvider = new KeywordCompletionProvider(documentTreeProvider);
	const variablesProvider = new VariableCompletionProvider(documentTreeProvider, variableCollector);
	const callbacksProvider = new MainFunctionsCompletionProvider(documentTreeProvider);
	const variableDefinitionProvider = new VariableDefinitionProvider();
	const diagnosticCollection = vscode.languages.createDiagnosticCollection('acl');
	const diagnosticManager = new DiagnosticManager(diagnosticCollection, aclManager, documentTreeProvider);

	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, variablesProvider, ' ', '.'),
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, keywordsProvider, ' '),
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, callbacksProvider, ' '),
		vscode.languages.registerHoverProvider({ language: 'acl' }, variablesProvider),
		vscode.languages.registerHoverProvider({ language: 'acl' }, keywordsProvider),
		vscode.languages.registerSignatureHelpProvider({ language: 'acl' }, variablesProvider, '(', ',', ' '),
		vscode.languages.registerDefinitionProvider({ language: 'acl' }, variableDefinitionProvider),
		diagnosticCollection,
	);

	const refetchDocumentData = (document: vscode.TextDocument) => {
		documentTreeProvider.refetchUserDefinedClasses(document);
		diagnosticManager.validateDocument(document);
	};

	vscode.workspace.onDidOpenTextDocument(document => {
		refetchDocumentData(document);
	});
	vscode.workspace.onDidChangeTextDocument(event => {
		const document = event.document;
		refetchDocumentData(document);
	});
	vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor && editor.document.languageId === 'acl') {
			refetchDocumentData(editor.document);
		}
	});
	vscode.window.onDidChangeWindowState(event => {
		if (event.focused) {
			vscode.workspace.textDocuments.forEach(document => {
				if (document.languageId === 'acl') {
					refetchDocumentData(document);
				}
			});
		}
	});
}

export function deactivate() { }
