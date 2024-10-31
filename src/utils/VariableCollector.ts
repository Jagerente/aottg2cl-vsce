import * as vscode from 'vscode';
import { IClass, IVariable } from '../classes/IClass';
import { CodeContextUtils } from './CodeContextUtils';
import { DocumentTreeProvider } from './DocumentTreeProvider';

interface Scope {
    variables: Map<string, IVariable>;
    parent: Scope | null;
}

export class VariableCollector {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    public collectAvailableVariables(
        document: vscode.TextDocument,
        position: vscode.Position,
    ): Map<string, IVariable> {
        const availableClasses = this.documentTreeProvider.getAllAvailableClasses();
        const text = document.getText();
        const lines = text.split(/\r?\n/);

        let contextStartLine = CodeContextUtils.findContextStartLine(document, position);
        const currentClassName = CodeContextUtils.findCurrentClassName(document, position);
        const currentClass = currentClassName ? availableClasses.get(currentClassName) : null;

        if (contextStartLine === null || !currentClass) {
            return new Map<string, IVariable>();
        }

        interface Scope {
            variables: Map<string, IVariable>;
            parent: Scope | null;
        }

        let currentScope: Scope = { variables: new Map<string, IVariable>(), parent: null };
        const scopeStack: Scope[] = [currentScope];
        let pendingControlStructure: boolean = false;

        for (let lineIndex = contextStartLine; lineIndex <= position.line; lineIndex++) {
            const line = lines[lineIndex];

            const forLoopMatch = line.match(/^\s*for\s*\(\s*(\w+)\s+in\s+(.+)\s*\)/);
            if (forLoopMatch) {
                const variableName = forLoopMatch[1];
                const iterableExpression = forLoopMatch[2].trim();

                const iterableType = this.inferType(iterableExpression, availableClasses, currentClass, currentScope.variables);

                const elementType = this.inferElementType(iterableType);

                currentScope = { variables: new Map<string, IVariable>(), parent: currentScope };
                scopeStack.push(currentScope);

                currentScope.variables.set(variableName, { name: variableName, type: elementType, value: 'iterable element' });

                pendingControlStructure = true;
                continue;
            }

            const openBraceMatch = line.match(/\{/g);
            if (openBraceMatch) {
                for (let i = 0; i < openBraceMatch.length; i++) {
                    if (pendingControlStructure) {
                        pendingControlStructure = false;
                    } else {
                        currentScope = { variables: new Map<string, IVariable>(), parent: currentScope };
                        scopeStack.push(currentScope);
                    }
                }
            }

            this.collectVariablesFromLine(line.trim(), currentScope.variables, availableClasses, currentClass);

            const closeBraceMatch = line.match(/\}/g);
            if (closeBraceMatch) {
                for (let i = 0; i < closeBraceMatch.length; i++) {
                    if (currentScope.parent) {
                        scopeStack.pop();
                        currentScope = currentScope.parent;
                    }
                }
            }

            if (pendingControlStructure && !openBraceMatch) {
                currentScope = { variables: new Map<string, IVariable>(), parent: currentScope };
                scopeStack.push(currentScope);
                pendingControlStructure = false;
            }
        }

        const currentMethod = this.documentTreeProvider.getCurrentMethod(position);
        if (currentMethod) {
            currentMethod.parameters.forEach(param => {
                currentScope.variables.set(param.name, { name: param.name, type: param.type, value: 'unknown' });
            });
        }

        return this.getAllVariables(currentScope);
    }

    private getAllVariables(scope: Scope): Map<string, IVariable> {
        const variables = new Map<string, IVariable>();
        let current: Scope | null = scope;
        while (current) {
            current.variables.forEach((value, key) => {
                if (!variables.has(key)) {
                    variables.set(key, value);
                }
            });
            current = current.parent;
        }
        return variables;
    }

    private collectVariablesFromLine(
        line: string,
        variables: Map<string, IVariable>,
        availableClasses: Map<string, IClass>,
        currentClass: IClass
    ): void {
        const variableMatch = line.match(/^\s*(\w+)\s*=\s*(.+);?/);
        if (variableMatch) {
            const variableName = variableMatch[1];
            const variableValue = variableMatch[2].trim().replace(/;$/, '');

            const inferredType = this.inferType(variableValue, availableClasses, currentClass, variables);
            variables.set(variableName, { name: variableName, type: inferredType, value: variableValue });
        }
    }

    private inferElementType(iterableType: string): string {
        const listTypeMatch = iterableType.match(/^List\((.+)\)$/);
        const rangeMatch = iterableType.match(/^Range/);
        if (listTypeMatch) {
            return listTypeMatch[1];
        } else if (rangeMatch) {
            return 'int';
        } else {
            return 'any';
        }
    }

    private inferType(
        value: string,
        availableClasses: Map<string, IClass>,
        currentClass?: IClass,
        currentScopeVars?: Map<string, IVariable>
    ): string {
        value = value.trim();

        if (/^".*"$/.test(value)) {
            return 'string';
        }

        if (/^\d+\.\d+$/.test(value)) {
            return 'float';
        }

        if (/^\d+$/.test(value)) {
            return 'int';
        }

        if (value === 'true' || value === 'false') {
            return 'bool';
        }

        if (currentScopeVars?.has(value)) {
            return currentScopeVars.get(value)!.type;
        }

        if (currentClass && value.startsWith('self.')) {
            const fieldName = value.replace('self.', '');
            const field = currentClass.instanceFields.find(f => f.label === fieldName);
            if (field) {
                return field.type;
            }
        }

        const identifierChain = value.split(/\.(?![^\(]*\))/).filter(id => id.length > 0);
        if (identifierChain.length > 1) {
            return this.resolveChainType(identifierChain, availableClasses, currentScopeVars);
        }

        if (/^\s*\w+\s*\(.*\)\s*$/.test(value)) {
            const methodName = value.split('(')[0].trim();
            if (availableClasses.has(methodName)) {
                return methodName;
            }
        }

        return 'any';
    }

    private resolveChainType(
        identifierChain: string[],
        availableClasses: Map<string, IClass>,
        currentScopeVars?: Map<string, IVariable>
    ): string {
        let currentType: string | undefined;

        for (const identifier of identifierChain) {
            if (!currentType) {
                if (availableClasses.has(identifier)) {
                    currentType = identifier;
                } else if (currentScopeVars && currentScopeVars.has(identifier)) {
                    currentType = currentScopeVars.get(identifier)!.type;

                } else {
                    return 'any';
                }
            } else {
                const classDef = availableClasses.get(currentType);
                if (!classDef) {
                    return 'any';
                }
                const field = classDef.instanceFields.find(f => f.label === identifier) ||
                    classDef.staticFields.find(f => f.label === identifier);

                if (field) {
                    currentType = field.type;
                    continue;
                }

                if (/^\s*\w+\s*\(.*\)\s*$/.test(identifier)) {
                    const name = identifier.split('(')[0].trim();
                    const method = classDef.instanceMethods.find(m => m.label === name) || classDef.staticMethods.find(m => m.label === name);
                    if (method) {
                        currentType = method.returnType;
                        continue;
                    }
                }

                return 'any';
            }
        }

        return currentType || 'any';
    }
}
