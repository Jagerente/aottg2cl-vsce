import * as vscode from 'vscode';
import {
    IChainNode,
    IClass,
    IConstructor,
    IField,
    ILoopNode,
    IMethod,
    IConditionNode
} from "../classes/IClass";
import {ACLManager} from '../antlr4ts/ACLManager';

type ParsedDocumentData = {
    userDefinedClasses: IClass[];
    importedClasses: Map<string, IClass>;
    allAvailableClasses: IClass[];
    chains: IChainNode[][];
    loopNodes: ILoopNode[];
    conditionNodes: IConditionNode[];
};

export class DocumentTreeProvider {
    private aclManager: ACLManager;
    private readonly globalClasses: Map<string, IClass>;
    private parsedDocuments = new Map<string, ParsedDocumentData>();

    constructor(aclManager: ACLManager, globalClasses: Map<string, IClass>) {
        this.globalClasses = globalClasses;
        this.aclManager = aclManager;
    }

    public async refetchUserDefinedClasses(document: vscode.TextDocument): Promise<void> {
        const uri = document.uri.toString();

        await this.aclManager.refetchWithImports(document);
        const userDefinedClasses = this.aclManager.getClasses();
        const importedClasses = this.aclManager.getImportedClasses();
        const chains = this.aclManager.getChains();
        const loopNodes = this.aclManager.getLoopNodes();
        const conditionNodes = this.aclManager.getConditionNodes();

        const allAvailableClasses = [
            ...Array.from(this.globalClasses.values()),
            ...userDefinedClasses,
            ...Array.from(importedClasses.values())
        ];

        this.parsedDocuments.set(uri, {
            userDefinedClasses,
            importedClasses,
            allAvailableClasses,
            chains,
            loopNodes,
            conditionNodes
        });
    }

    public clearDocument(document: vscode.TextDocument): void {
        this.parsedDocuments.delete(document.uri.toString());
    }

    private getParsedData(document: vscode.TextDocument): ParsedDocumentData | undefined {
        return this.parsedDocuments.get(document.uri.toString());
    }

    public getGlobalClassesMap(): Map<string, IClass> {
        return this.globalClasses;
    }

    public getUserDefinedClasses(document: vscode.TextDocument): IClass[] {
        return this.getParsedData(document)?.userDefinedClasses ?? [];
    }

    public getAllAvailableClasses(document: vscode.TextDocument): IClass[] {
        return this.getParsedData(document)?.allAvailableClasses ?? Array.from(this.globalClasses.values());
    }

    public getCurrentClass(document: vscode.TextDocument, position: vscode.Position): IClass | undefined {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.bodyRange?.contains(position)) {
                return classDef;
            }
        }
        return undefined;
    }

    public getCurrentDeclaringMethod(document: vscode.TextDocument, position: vscode.Position): IMethod | IConstructor | undefined {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.bodyRange?.contains(position)) {
                for (const method of classDef.instanceMethods) {
                    if (method.declarationRange?.contains(position)) {
                        return method;
                    }
                }
                for (const method of classDef.staticMethods) {
                    if (method.declarationRange?.contains(position)) {
                        return method;
                    }
                }
                for (const ctor of classDef.constructors ?? []) {
                    if (ctor.declarationRange?.contains(position)) {
                        return ctor;
                    }
                }
            }
        }
        return undefined;
    }

    public getCurrentMethod(document: vscode.TextDocument, position: vscode.Position): IMethod | IConstructor | undefined {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.bodyRange?.contains(position)) {
                for (const method of classDef.instanceMethods) {
                    if (method.bodyRange?.contains(position)) {
                        return method;
                    }
                }
                for (const method of classDef.staticMethods) {
                    if (method.bodyRange?.contains(position)) {
                        return method;
                    }
                }
                for (const ctor of classDef.constructors ?? []) {
                    if (ctor.bodyRange?.contains(position)) {
                        return ctor;
                    }
                }
            }
        }
        return undefined;
    }

    public getCurrentFieldDeclaration(document: vscode.TextDocument, position: vscode.Position): IField | undefined {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.bodyRange?.contains(position)) {
                for (const field of classDef.instanceFields) {
                    if (field.declarationRange?.contains(position)) {
                        return field;
                    }
                }
                for (const field of classDef.staticFields) {
                    if (field.declarationRange?.contains(position)) {
                        return field;
                    }
                }
            }
        }
        return undefined;
    }

    public isInsideAnyMethodBody(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.getCurrentMethod(document, position) !== undefined;
    }

    public getChains(document: vscode.TextDocument): IChainNode[][] {
        return this.getParsedData(document)?.chains ?? [];
    }

    public getLoopNodes(document: vscode.TextDocument): ILoopNode[] {
        return this.getParsedData(document)?.loopNodes ?? [];
    }

    public isInsideLoopBody(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.getLoopNodes(document).some(node => node.bodyRange.contains(position));
    }

    public isInsideLoopCondition(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.getLoopNodes(document).some(node => node.conditionsRange.contains(position));
    }

    public isInsideConditionBlock(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.getParsedData(document)?.conditionNodes.some(node => node.bodyRange.contains(position)) ?? false;
    }

    public isInsideConditionCondition(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.getParsedData(document)?.conditionNodes.some(node => node.conditionRange?.contains(position) ?? false) ?? false;
    }

    public canSuggestElif(document: vscode.TextDocument, position: vscode.Position): boolean {
        const nodes = this.getParsedData(document)?.conditionNodes ?? [];
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];
            if (node.afterBlockRange.contains(position)) {
                if (node.type === 'if' || node.type === 'elif') {
                    return true;
                }
                break;
            }
        }
        return false;
    }

    public canSuggestElse(document: vscode.TextDocument, position: vscode.Position): boolean {
        const nodes = this.getParsedData(document)?.conditionNodes ?? [];
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];
            if (node.afterBlockRange.contains(position)) {
                if (node.type === 'if' || node.type === 'elif') {
                    return true;
                }
                if (node.type === 'else') {
                    return false;
                }
                break;
            }
        }
        return false;
    }
}
