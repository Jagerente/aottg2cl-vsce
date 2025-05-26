import * as vscode from 'vscode';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';
import { CodeContextUtils } from '../utils/CodeContextUtils';
import { IParameter, IVariable } from '../classes/IClass';

export class VariableDefinitionProvider implements vscode.DefinitionProvider {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    public provideDefinition(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.Definition | null {
        const wordPattern = /[A-Za-z_]\w*/;

        const wordRange = document.getWordRangeAtPosition(position,  wordPattern);
        if (!wordRange) {
            return null;
        }
        const word = document.getText(wordRange);

        const lineText = document.lineAt(position).text;
        const textBeforeCursor = lineText.substring(0, position.character);
        const callChainString = CodeContextUtils.parseCallChain(textBeforeCursor);
        const callChainArray = CodeContextUtils.splitCallChain(callChainString);
        const currentMethod = this.documentTreeProvider.getCurrentMethod(document, position);

        if (callChainArray.length > 1) {
            callChainArray[callChainArray.length - 1] = word;
            const currentClass = this.documentTreeProvider.getCurrentClass(document, position);
            const resolved = CodeContextUtils.resolveChainFinalPart(document, position, this.documentTreeProvider, callChainArray, currentClass, currentMethod);
            if (resolved && (resolved as any).declarationRange) {
                const targetUri = (resolved as any).sourceUri || document.uri;
                return new vscode.Location(targetUri, (resolved as any).declarationRange);
            }
        }

        let variable: IVariable | IParameter | undefined;
        if (currentMethod) {
            variable = this.documentTreeProvider.findAvailableLocalVariableByName(currentMethod, word, true, position, position) ?? currentMethod.parameters.find(v => v.name === word);
        }

        if (variable?.declarationRange) {
            const targetUri = currentMethod!.sourceUri || document.uri;
            return new vscode.Location(targetUri, variable.declarationRange);
        }

        const allClasses = this.documentTreeProvider.getAllAvailableClasses(document);
        const matchedClass = allClasses.find(cls => cls.name === word);
        if (matchedClass && matchedClass.declarationRange) {
            const targetUri = matchedClass.sourceUri || document.uri;
            return new vscode.Location(targetUri, matchedClass.declarationRange);
        }

        const currentClass = this.documentTreeProvider.getCurrentClass(document, position);
        if (currentClass) {
            const method = currentClass.instanceMethods.find(m => m.label === word);
            if (method && method.declarationRange) {
                const targetUri = currentClass.sourceUri || document.uri;
                return new vscode.Location(targetUri, method.declarationRange);
            }
            const field = currentClass.instanceFields.find(f => f.label === word);
            if (field && field.declarationRange) {
                const targetUri = currentClass.sourceUri || document.uri;
                return new vscode.Location(targetUri, field.declarationRange);
            }
            const staticMethod = currentClass.staticMethods.find(m => m.label === word);
            if (staticMethod && staticMethod.declarationRange) {
                const targetUri = currentClass.sourceUri || document.uri;
                return new vscode.Location(targetUri, staticMethod.declarationRange);
            }
            const staticField = currentClass.staticFields.find(f => f.label === word);
            if (staticField && staticField.declarationRange) {
                const targetUri = currentClass.sourceUri || document.uri;
                return new vscode.Location(targetUri, staticField.declarationRange);
            }
        }

        return null;
    }
}
