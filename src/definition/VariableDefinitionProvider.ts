import * as vscode from 'vscode';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';
import { VariableCollector } from '../utils/VariableCollector';
import { CodeContextUtils } from '../utils/CodeContextUtils';
import { FindFieldInClassHierarchy, FindMethodInClassHierarchy, IClass, IField, IMethod, IVariable } from '../classes/IClass';

export class VariableDefinitionProvider implements vscode.DefinitionProvider {
    private documentTreeProvider: DocumentTreeProvider;
    private variableCollector: VariableCollector;
    private declaredVariables: Map<string, IVariable>;

    constructor(documentTreeProvider: DocumentTreeProvider, variableCollector: VariableCollector) {
        this.documentTreeProvider = documentTreeProvider;
        this.variableCollector = variableCollector;
        this.declaredVariables = new Map();
    }

    public provideDefinition(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.Definition | null {
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return null;
        }
        const word = document.getText(wordRange);
        this.declaredVariables = this.variableCollector.collectAvailableVariables(document, position);

        const lineText = document.lineAt(position).text;
        const textBeforeCursor = lineText.substring(0, position.character);
        const callChainString = CodeContextUtils.parseCallChain(textBeforeCursor);
        const callChainArray = CodeContextUtils.splitCallChain(callChainString);
        if (callChainArray.length > 0) {
            callChainArray[callChainArray.length - 1] = word;
            const currentClass = this.documentTreeProvider.getCurrentClass(position);
            const resolved = this.resolveChainFinalPart(callChainArray, currentClass);
            if (resolved && (resolved as any).declarationRange) {
                const targetUri = (resolved as any).sourceUri || document.uri;
                return new vscode.Location(targetUri, (resolved as any).declarationRange);
            }
        }

        if (this.declaredVariables.has(word)) {
            const variable = this.declaredVariables.get(word)!;
            if (variable.declarationRange) {
                return new vscode.Location(document.uri, variable.declarationRange);
            }
        }

        const allClasses = this.documentTreeProvider.getAllAvailableClasses();
        const matchedClass = allClasses.find(cls => cls.name === word);
        if (matchedClass && matchedClass.declarationRange) {
            const targetUri = matchedClass.sourceUri || document.uri;
            return new vscode.Location(targetUri, matchedClass.declarationRange);
        }

        const currentClass = this.documentTreeProvider.getCurrentClass(position);
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

    private resolveChainFinalPart(identifierChain: string[], currentClassDef?: IClass | undefined): IClass | IMethod | IField | IVariable | undefined {
        if (identifierChain.length === 0) {
            return undefined;
        }

        const currentClassName = currentClassDef?.name;
        let currentTypeName: string | undefined;
        let currentPart: IClass | IMethod | IField | IVariable | undefined;

        for (let i = 0; i < identifierChain.length; i++) {
            const identifier = identifierChain[i];

            if (i === 0) {
                if (identifier === 'self') {
                    if (!currentClassName) {
                        return undefined;
                    }
                    currentTypeName = currentClassName;
                    currentPart = currentClassDef;
                    continue;
                } else {
                    const variable = this.declaredVariables.get(identifier);
                    if (variable) {
                        currentTypeName = variable.type;
                        currentPart = variable;
                    } else {
                        const classDef = this.findClassByName(identifier.split('(')[0]);
                        if (classDef) {
                            currentTypeName = identifier.split('(')[0];
                            currentPart = classDef;
                        } else {
                            return undefined;
                        }
                    }
                }
            } else {
                if (!currentTypeName) {
                    return undefined;
                }

                const classDef = this.findClassByName(currentTypeName);
                if (!classDef) {
                    return undefined;
                }

                const field = FindFieldInClassHierarchy(classDef, identifier, true, true, true, true);
                if (field) {
                    currentTypeName = field.type;
                    currentPart = field;
                    continue;
                }

                const name = identifier.split('(')[0].trim();
                const method = FindMethodInClassHierarchy(classDef, name, -1, true, true);
                if (method) {
                    currentTypeName = method.returnType;
                    currentPart = method;
                    continue;
                }

                return undefined;
            }
        }

        return currentPart;
    }

    private findClassByName(className: string): IClass | undefined {
        return this.documentTreeProvider.getAllAvailableClasses().find((cls) => cls.name === className);
    }
}
