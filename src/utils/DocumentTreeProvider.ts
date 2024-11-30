import * as vscode from 'vscode';
import { ClassKinds, IChainNode, IClass, IConstructor, ILoopNode, IMethod } from "../classes/IClass";
import { ACLManager } from '../antlr4ts/ACLManager';

export class DocumentTreeProvider {
    private aclManager: ACLManager;
    private globalClasses: Map<string, IClass>;
    private userDefinedClasses: IClass[];
    private allAvailableClasses: IClass[];

    constructor(aclManager: ACLManager, globalClasses: Map<string, IClass>) {
        this.globalClasses = globalClasses;
        this.userDefinedClasses = [];
        this.allAvailableClasses = Array.from(this.globalClasses.values());
        this.aclManager = aclManager;
    }

    public refetchUserDefinedClasses(document: vscode.TextDocument): void {
        this.aclManager.refetch(document);
        this.userDefinedClasses = this.aclManager.getClasses();
        this.allAvailableClasses = [...Array.from(this.globalClasses.values()), ...this.userDefinedClasses];
    }

    public getGlobalClassesMap(): Map<string, IClass> {
        return this.globalClasses;
    }

    public getUserDefinedClassesMap(): IClass[] {
        return this.userDefinedClasses;
    }

    public getAllAvailableClasses(): IClass[] {
        return this.allAvailableClasses;
    }

    public getChains(): IChainNode[][] {
        return this.aclManager.getChains();
    }

    public getLoopNodes(): ILoopNode[] {
        return this.aclManager.getLoopNodes();
    }

    public getCurrentClass(position: vscode.Position): IClass | undefined {
        for (const classDef of this.userDefinedClasses.values()) {
            if (classDef.bodyRange?.contains(position)) {
                return classDef;
            }
        }
        return undefined;
    }

    public getCurrentMethod(position: vscode.Position): IMethod | IConstructor | undefined {
        for (const classDef of this.userDefinedClasses.values()) {
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

                if (classDef.constructors) {
                    for (const ctor of classDef.constructors) {
                        if (ctor.bodyRange?.contains(position)) {
                            return ctor;
                        }
                    }
                }
            }
        }

        return undefined;
    }

    public getCurrentDeclarationMethod(position: vscode.Position): IMethod | IConstructor | undefined {
        for (const classDef of this.userDefinedClasses.values()) {
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

                if (classDef.constructors) {
                    for (const ctor of classDef.constructors) {
                        if (ctor.declarationRange?.contains(position)) {
                            return ctor;
                        }
                    }
                }
            }
        }
        return undefined;
    }

    public isInsideClassBody(position: vscode.Position): boolean {
        for (const classDef of this.userDefinedClasses.values()) {
            if (classDef.bodyRange?.contains(position)) {
                return true;
            }
        }
        return false;
    }

    public isInsideClassKindBody(position: vscode.Position, kind: ClassKinds): boolean {
        for (const classDef of this.userDefinedClasses.values()) {
            if (classDef.kind === kind && classDef.bodyRange?.contains(position)) {
                return true;
            }
        }
        return false;
    }

    public isInsideAnyMethodDeclaration(position: vscode.Position): boolean {
        for (const classDef of this.userDefinedClasses.values()) {
            if (classDef.bodyRange?.contains(position)) {
                for (const method of classDef.instanceMethods) {
                    if (method.declarationRange?.contains(position)) {
                        return true;
                    }
                }

                for (const method of classDef.staticMethods) {
                    if (method.declarationRange?.contains(position)) {
                        return true;
                    }
                }

                if (classDef.constructors) {
                    for (const ctor of classDef.constructors) {
                        if (ctor.declarationRange?.contains(position)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public isInsideAnyMethodBody(position: vscode.Position): boolean {
        for (const classDef of this.userDefinedClasses.values()) {
            if (classDef.bodyRange?.contains(position)) {
                for (const method of classDef.instanceMethods) {
                    if (method.bodyRange?.contains(position)) {
                        return true;
                    }
                }

                for (const method of classDef.staticMethods) {
                    if (method.bodyRange?.contains(position)) {
                        return true;
                    }
                }

                if (classDef.constructors) {
                    for (const ctor of classDef.constructors) {
                        if (ctor.bodyRange?.contains(position)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public isInsideLoopBody(position: vscode.Position): boolean {
        return this.aclManager.getLoopNodes().some(node => node.bodyRange.contains(position));
    }

    public isInsideLoopCondition(position: vscode.Position): boolean {
        return this.aclManager.getLoopNodes().some(node => node.conditionsRange.contains(position));
    }

    public isInsideConditionBlock(position: vscode.Position): boolean {
        return this.aclManager.getConditionNodes().some(node => node.bodyRange.contains(position));
    }

    public isInsideConditionCondition(position: vscode.Position): boolean {
        return this.aclManager.getConditionNodes().some(node => node.conditionRange?.contains(position) ?? false);
    }

    public canSuggestElif(position: vscode.Position): boolean {
        const conditionNodes = this.aclManager.getConditionNodes();

        for (let i = conditionNodes.length - 1; i >= 0; i--) {
            const node = conditionNodes[i];
            if (node.afterBlockRange.contains(position)) {
                if (node.type === 'if' || node.type === 'elif') {
                    return true;
                }
                break;
            }
        }

        return false;
    }

    public canSuggestElse(position: vscode.Position): boolean {
        const conditionNodes = this.aclManager.getConditionNodes();

        for (let i = conditionNodes.length - 1; i >= 0; i--) {
            const node = conditionNodes[i];
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