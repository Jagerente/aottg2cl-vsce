import * as vscode from 'vscode';
import { KeywordCompletionProvider } from './completions/KeywordCompletionProvider';
import { VariableCompletionProvider } from './completions/VariableCompletionProvider';
import { MainFunctionsCompletionProvider } from './completions/MainFunctionsCompletionProvider';
import { ClassUsageValidator } from './diagnostic/ClassUsageValidator';
import { CustomClassValidator } from './diagnostic/CustomClassValidator';
import { VariableDefinitionProvider } from './definition/VariableDefinitionProvider';
import { IncompleteMemberAccessValidator } from './diagnostic/IncompleteMemberAccessValidator';
import { AvailableClasses, AvailableClassesMap } from './classes/AvailableClasses';
import { ACLManager } from './antlr/ACLManager';

export function activate(context: vscode.ExtensionContext) {
	const keywordsProvider = new KeywordCompletionProvider();
	const variablesProvider = new VariableCompletionProvider(AvailableClassesMap);
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, variablesProvider, ' ', '.'),
		vscode.languages.registerHoverProvider({ language: 'acl' }, variablesProvider),
		vscode.languages.registerSignatureHelpProvider({ language: 'acl' }, variablesProvider, '(', ',', ' '),
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, keywordsProvider, ' '),
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, new MainFunctionsCompletionProvider(), ' '),
		vscode.languages.registerHoverProvider({ language: 'acl' }, keywordsProvider)
	);

	const diagnosticCollection = vscode.languages.createDiagnosticCollection('acl');
	context.subscriptions.push(diagnosticCollection);

	const antlrManager = new ACLManager();

	vscode.workspace.onDidOpenTextDocument(doc => antlrManager.refetch(doc));
	vscode.workspace.onDidChangeTextDocument(event => antlrManager.refetch(event.document));
	vscode.workspace.onDidOpenTextDocument(doc => validateDocument(doc, diagnosticCollection, AvailableClasses));
	vscode.workspace.onDidChangeTextDocument(event => validateDocument(event.document, diagnosticCollection, AvailableClasses));

	vscode.languages.registerDefinitionProvider({ language: 'acl' }, new VariableDefinitionProvider());

	function validateDocument(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection, availableClasses: any[]) {
		if (document.languageId !== 'acl') return;

		let diagnostics: vscode.Diagnostic[] = [];

		diagnostics = diagnostics.concat(antlrManager.getDiagnostics());
		diagnostics = diagnostics.concat(new ClassUsageValidator(availableClasses).validate(document));
		diagnostics = diagnostics.concat(new CustomClassValidator().validate(document));
		diagnostics = diagnostics.concat(IncompleteMemberAccessValidator.validate(document));

		diagnosticCollection.set(document.uri, diagnostics);
	}
}

export function deactivate() { }
