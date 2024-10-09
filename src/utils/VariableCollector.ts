import * as vscode from 'vscode';
import { IClass } from '../classes/IClass';
import { CodeContextUtils } from './CodeContextUtils';

export class VariableCollector {
    public static collectAvailableVariables(
        document: vscode.TextDocument,
        position: vscode.Position,
        availableClasses: Map<string, IClass>
    ): Map<string, { type: string, value: string }> {
        const text = document.getText();
        const lines = text.split(/\r?\n/);

        const variables = new Map<string, { type: string, value: string }>();
        const scopeStack: Array<Map<string, { type: string, value: string }>> = [];
        let currentScopeVars = new Map<string, { type: string, value: string }>();

        let braceDepth = 0;
        let contextStartLine = CodeContextUtils.findContextStartLine(document, position);
        const currentClassName = CodeContextUtils.findCurrentClassName(document, position);
        const currentClass = currentClassName ? availableClasses.get(currentClassName) : null;

        if (contextStartLine === null || !currentClass) {
            return variables;
        }

        for (let lineIndex = contextStartLine; lineIndex <= position.line; lineIndex++) {
            const line = lines[lineIndex].trim();

            const openBraces = (line.match(/\{/g) || []).length;
            const closeBraces = (line.match(/\}/g) || []).length;
            braceDepth += openBraces;
            braceDepth -= closeBraces;

            if (openBraces > 0) {
                scopeStack.push(currentScopeVars);
                currentScopeVars = new Map<string, { type: string, value: string }>();
            }

            this.collectVariablesFromLine(line, currentScopeVars, availableClasses, currentClass);

            if (closeBraces > 0) {
                const previousScope = scopeStack.pop();
                if (previousScope) {
                    previousScope.forEach((value, key) => currentScopeVars.set(key, value));
                    currentScopeVars = previousScope;
                }
            }
        }

        return currentScopeVars;
    }

    private static collectVariablesFromLine(
        line: string,
        variables: Map<string, { type: string, value: string }>,
        availableClasses: Map<string, IClass>,
        currentClass: IClass
    ): void {
        const variableMatch = line.match(/^\s*(\w+)\s*=\s*(.+);?/);
        if (variableMatch) {
            const variableName = variableMatch[1];
            const variableValue = variableMatch[2].trim().replace(/;$/, '');

            const inferredType = this.inferType(variableValue, availableClasses, currentClass, variables);
            variables.set(variableName, { type: inferredType, value: variableValue });
        }
    }

    private static inferType(
        value: string,
        availableClasses: Map<string, IClass>,
        currentClass?: IClass,
        currentScopeVars?: Map<string, { type: string, value: string }>
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

    private static resolveChainType(
        identifierChain: string[],
        availableClasses: Map<string, IClass>,
        currentScopeVars?: Map<string, { type: string, value: string }>
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
                    continue
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
