import * as vscode from 'vscode';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';
import {CodeContextUtils} from '../utils/CodeContextUtils';
import {IParameter, IVariable, IClass, IMethod, IField, IConstructor} from '../classes/IClass';

export class VariableRenameProvider implements vscode.RenameProvider {
    constructor(private readonly documentTreeProvider: DocumentTreeProvider) {
    }

    public async provideRenameEdits(
        document: vscode.TextDocument,
        position: vscode.Position,
        newName: string,
        token: vscode.CancellationToken
    ): Promise<vscode.WorkspaceEdit | null> {
        await this.documentTreeProvider.ensureDocumentParsed(document);

        // Validate new name
        const namePattern = /^[A-Za-z_]\w*$/;
        if (!namePattern.test(newName)) {
            throw new Error('Invalid identifier name');
        }

        // Check if inside string or comment
        if (this.documentTreeProvider.isInsideString(document, position) ||
            this.documentTreeProvider.isInsideComment(document, position)) {
            return null;
        }

        // Resolve the symbol at position
        const resolved = this.resolveSymbol(document, position);
        if (!resolved) {
            return null;
        }

        // Get the old name
        const oldName = this.getSymbolName(resolved);
        if (!oldName) {
            return null;
        }

        // If new name is the same as old name, return empty edit
        if (oldName === newName) {
            return new vscode.WorkspaceEdit();
        }

        // Create workspace edit
        const edit = new vscode.WorkspaceEdit();

        // Add edit for the declaration/definition
        const nameRange = resolved.nameRange;
        const sourceUri = this.getSourceUri(resolved) || document.uri;
        if (nameRange) {
            edit.replace(sourceUri, nameRange, newName);
        }

        // Add edits for all references
        const entityReferences = resolved.references;
        if (entityReferences) {
            for (const ref of entityReferences) {
                // Support multi-file rename by processing all references
                // VS Code will handle invalid URIs gracefully
                edit.replace(ref.uri, ref.range, newName);
            }
        }

        return edit;
    }

    public async prepareRename(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Range | { range: vscode.Range; placeholder: string } | null> {
        await this.documentTreeProvider.ensureDocumentParsed(document);

        // Check if inside string or comment
        if (this.documentTreeProvider.isInsideString(document, position) ||
            this.documentTreeProvider.isInsideComment(document, position)) {
            return null;
        }

        // Resolve the symbol at position
        const resolved = this.resolveSymbol(document, position);
        if (!resolved) {
            return null;
        }

        // Return the range that can be renamed
        const nameRange = resolved.nameRange;
        if (!nameRange) {
            return null;
        }

        const oldName = this.getSymbolName(resolved);
        return {
            range: nameRange,
            placeholder: oldName || ''
        };
    }

    private resolveSymbol(
        document: vscode.TextDocument,
        position: vscode.Position
    ): IClass | IMethod | IField | IVariable | IParameter | IConstructor | undefined {
        const wordPattern = /[A-Za-z_]\w*/;

        const wordRange = document.getWordRangeAtPosition(position, wordPattern);
        if (!wordRange) {
            return undefined;
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

        return resolved;
    }

    private getSymbolName(
        entity: IClass | IMethod | IField | IVariable | IParameter | IConstructor
    ): string | undefined {
        // IClass has 'name'
        if ('name' in entity && !('parent' in entity)) {
            return entity.name;
        }
        // IMethod and IField have 'label'
        if ('label' in entity) {
            return entity.label;
        }
        // IVariable and IParameter have 'name'
        if ('name' in entity) {
            return entity.name;
        }
        // IConstructor doesn't have a name, it uses the class name
        if ('parent' in entity && 'name' in entity.parent) {
            return entity.parent.name;
        }
        return undefined;
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

