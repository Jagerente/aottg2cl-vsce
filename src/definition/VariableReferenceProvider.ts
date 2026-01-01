import * as vscode from 'vscode';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';
import {CodeContextUtils} from '../utils/CodeContextUtils';
import {IParameter, IVariable, IClass, IMethod, IField, IConstructor, IReference} from '../classes/IClass';

export class VariableReferenceProvider implements vscode.ReferenceProvider {
    constructor(private readonly documentTreeProvider: DocumentTreeProvider) {
    }

    public async provideReferences(
        document: vscode.TextDocument,
        position: vscode.Position,
        context: vscode.ReferenceContext,
        token: vscode.CancellationToken
    ): Promise<vscode.Location[] | null> {
        await this.documentTreeProvider.ensureDocumentParsed(document);

        const wordPattern = /[A-Za-z_]\w*/;

        const wordRange = document.getWordRangeAtPosition(position, wordPattern);
        if (!wordRange) {
            return null;
        }
        const word = document.getText(wordRange);

        const currentMethod = this.documentTreeProvider.getCurrentMethod(document, position);
        const currentDeclaringMethod = this.documentTreeProvider.getCurrentDeclaringMethod(document, position);
        const currentClass = this.documentTreeProvider.getCurrentClass(document, position);

        // Try to resolve what symbol we're looking at
        let resolved: IClass | IMethod | IField | IVariable | IParameter | IConstructor | undefined;

        // Handle chain calls (e.g., self.methodName, obj.field)
        const chainInfo = this.documentTreeProvider.findChainAtPosition(document, position);
        if (chainInfo && chainInfo.chain.length > 1) {
            // Update the last node in the chain with the current word
            const lastNode = chainInfo.chain[chainInfo.chain.length - 1];
            if (lastNode) {
                lastNode.text = word;
            }
            resolved = CodeContextUtils.resolveChainFinalPart(
                document,
                position,
                this.documentTreeProvider,
                chainInfo.chain,
                currentClass,
                currentMethod
            );
        }

        // Handle parameters in function declaration (when cursor is on parameter name in declaration)
        if (!resolved && currentDeclaringMethod) {
            const param = currentDeclaringMethod.parameters.find(p => p.name === word);
            if (param) {
                resolved = param;
            }
        }

        // Handle local variables and parameters in method body
        if (!resolved && currentMethod) {
            // First check parameters (they have higher priority than local variables due to shadowing)
            const param = currentMethod.parameters.find(p => p.name === word);
            if (param) {
                resolved = param;
            } else {
                const variable = this.documentTreeProvider.findAvailableLocalVariableByName(
                    currentMethod,
                    word,
                    true,
                    position,
                    position
                );
                if (variable) {
                    resolved = variable;
                }
            }
        }

        // Handle class names
        if (!resolved) {
            const allClasses = this.documentTreeProvider.getAllAvailableClasses(document);
            const matchedClass = allClasses.find(cls => cls.name === word);
            if (matchedClass) {
                resolved = matchedClass;
            }
        }

        // Handle methods and fields in current class
        if (!resolved && currentClass) {
            const method = currentClass.instanceMethods.find(m => m.label === word) ||
                currentClass.staticMethods.find(m => m.label === word);
            if (method) {
                resolved = method;
            } else {
                const field = currentClass.instanceFields.find(f => f.label === word) ||
                    currentClass.staticFields.find(f => f.label === word);
                if (field) {
                    resolved = field;
                }
            }
        }

        // Handle constructors
        if (!resolved && currentClass && currentClass.constructors) {
            // For constructors, we check if the word matches the class name
            // and we're in a context that could be a constructor call
            if (word === currentClass.name) {
                // This is a class name, which could be used as a constructor
                resolved = currentClass;
            }
        }

        if (!resolved) {
            return null;
        }

        // Collect all references
        const references: vscode.Location[] = [];

        // Add declaration as a reference if includeDeclaration is true
        if (context.includeDeclaration) {
            const nameRange = resolved.nameRange;
            const sourceUri = this.getSourceUri(resolved) || document.uri;
            if (nameRange) {
                references.push(new vscode.Location(sourceUri, nameRange));
            }
        }

        // Add all usage references from the current document
        const entityReferences = resolved.references;
        if (entityReferences) {
            for (const ref of entityReferences) {
                references.push(new vscode.Location(ref.uri, ref.range));
            }
        }

        return references.length > 0 ? references : null;
    }

    private getSourceUri(
        entity: IClass | IMethod | IField | IVariable | IParameter | IConstructor
    ): vscode.Uri | undefined {
        if ('sourceUri' in entity) {
            return entity.sourceUri;
        }
        return undefined;
    }
}

