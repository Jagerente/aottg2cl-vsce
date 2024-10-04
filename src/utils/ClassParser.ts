import * as vscode from 'vscode';
import { IClass, IField, IMethod, IParameter } from '../classes/IClass';

export class ClassParser {
    public static parseClasses(
        document: vscode.TextDocument,
        availableClasses: Map<string, IClass>
    ): Map<string, IClass> {
        const text = document.getText();
        const lines = text.split(/\r?\n/);

        const classes = new Map<string, IClass>();
        let currentClass: IClass | null = null;
        let className: string | null = null;
        let insideClass = false;
        let braceDepth = 0;
        let isInsideFunction = false;

        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex].trim();

            const classMatch = line.match(/^(class|component)\s+([A-Za-z_][A-Za-z0-9_]*)\s*(\{)?\s*$/);
            if (classMatch) {
                if (currentClass && className) {
                    classes.set(className, currentClass);
                }
                className = classMatch[2];
                currentClass = {
                    name: className,
                    description: '',
                    staticFields: [],
                    staticMethods: [],
                    instanceFields: [],
                    instanceMethods: []
                };
                insideClass = true;
                braceDepth = classMatch[3] ? 1 : 0;
                continue;
            }

            if (insideClass && currentClass) {
                braceDepth += (line.match(/\{/g) || []).length;
                braceDepth -= (line.match(/\}/g) || []).length;

                if (braceDepth === 0) {
                    classes.set(className!, currentClass);
                    currentClass = null;
                    className = null;
                    insideClass = false;
                    continue;
                }

                if (isInsideFunction) {
                    if (braceDepth === 1) {
                        isInsideFunction = false;
                    }
                    continue;
                }

                const functionMatch = line.match(/^\s*(function|coroutine|cutscene)\s+\w+\s*\(.*?\)\s*$/);
                if (functionMatch) {
                    isInsideFunction = true;
                    this.parseMethod(line, currentClass);
                    continue;
                }

                this.parseField(line, currentClass, availableClasses);
            }
        }

        if (currentClass && className) {
            classes.set(className, currentClass);
        }

        return classes;
    }

    private static parseField(
        line: string,
        currentClass: IClass,
        availableClasses: Map<string, IClass>
    ): void {
        const fieldMatch = line.match(/^\s*(\w+)\s*=\s*(.+);?/);
        if (fieldMatch) {
            const fieldName = fieldMatch[1];
            const fieldValue = fieldMatch[2].trim().replace(/;$/, '');

            const inferredType = this.inferFieldType(fieldValue, availableClasses);
            const isPrivate = fieldName.startsWith('_');

            currentClass.instanceFields.push({
                label: fieldName,
                type: inferredType,
                description: '',
                private: isPrivate
            });
            return;
        }
    }

    private static parseMethod(
        line: string,
        currentClass: IClass,
    ): void {
        const methodMatch = line.match(/^\s*(function|coroutine|cutscene)\s+(\w+)\s*\((.*?)\)\s*(\{)?\s*$/);
        if (methodMatch) {
            currentClass.instanceMethods.push({
                label: methodMatch[2],
                returnType: 'void',
                description: '',
                parameters: this.parseParameters(methodMatch[3])
            });
            return;
        }
    }



    private static inferFieldType(
        value: string,
        availableClasses: Map<string, IClass>
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

        const constructorMatch = value.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(\s*\)$/);
        if (constructorMatch) {
            const className = constructorMatch[1];
            if (availableClasses.has(className)) {
                return className;
            }
        }

        if (value.startsWith('self.')) {
            const fieldName = value.replace('self.', '');
            return this.resolveChainType(fieldName.split('.'), 'self', availableClasses);
        }

        const identifierChain = value.split('.').filter(id => id.length > 0);
        if (identifierChain.length > 1) {
            return this.resolveChainType(identifierChain, undefined, availableClasses);
        }

        const methodName = value.split('(')[0].trim();
        if (availableClasses.has(methodName)) {
            return methodName;
        }

        return 'any';
    }

    private static resolveChainType(
        identifierChain: string[],
        initialType: string | undefined,
        availableClasses: Map<string, IClass>
    ): string {
        let currentType = initialType || identifierChain[0];

        if (initialType === 'self') {
            const currentClass = availableClasses.get(initialType!);
            if (currentClass) {
                const field = currentClass.instanceFields.find(f => f.label === identifierChain[0]);
                currentType = field ? field.type : 'any';
                identifierChain = identifierChain.slice(1);
            }
        }

        for (const identifier of identifierChain) {
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

        return currentType || 'any';
    }

    private static parseParameters(parametersString: string): IParameter[] {
        const parameters: IParameter[] = [];
        const params = parametersString.split(',').map(p => p.trim()).filter(p => p.length > 0);

        for (const param of params) {
            parameters.push({
                name: param,
                type: 'any',
                description: ''
            });
        }

        return parameters;
    }
}
