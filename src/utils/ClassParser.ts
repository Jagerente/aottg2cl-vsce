import * as vscode from 'vscode';
import { ClassKinds, IClass, IParameter, MethodKinds } from '../classes/IClass';
import { BaseMainClass } from '../classes/BaseMainClass';
import { BaseComponentsClass } from '../classes/BaseComponentsClass';

export class ClassParser {
    public static parseClasses(
        document: vscode.TextDocument,
        availableClasses: Map<string, IClass>
    ): Map<string, IClass> {
        const text = document.getText();
        const lines = text.split(/\r?\n/);

        const classes = new Map<string, IClass>();
        let lineIndex = 0;

        while (lineIndex < lines.length) {
            lineIndex = this.parseClass(lines, lineIndex, classes, availableClasses);
        }

        return classes;
    }

    private static parseClass(
        lines: string[],
        startIndex: number,
        classes: Map<string, IClass>,
        availableClasses: Map<string, IClass>
    ): number {
        let braceDepth = 0;
        let currentClass: IClass | null = null;
        let className: string | null = null;
        let isInsideFunction = false;

        for (let lineIndex = startIndex; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex].trim();

            const classMatch = line.match(/^(class|component|extension|cutscene)\s+([A-Za-z_][A-Za-z0-9_]*)\s*(\{)?\s*$/);
            if (classMatch) {
                if (currentClass && className) {
                    classes.set(className, currentClass);
                }

                className = classMatch[2];
                let classType: ClassKinds;
                let extendsList: IClass[] = [];
                let classDescription = '';

                switch (classMatch[1]) {
                    case 'class':
                        classType = ClassKinds.CLASS;
                        if (className === 'Main') {
                            extendsList = [new BaseMainClass(className)];
                        }
                        break;
                    case 'component':
                        classType = ClassKinds.COMPONENT;
                        extendsList = [new BaseComponentsClass(className)];
                        classDescription = 'Represents a component script attached to a MapObject.';
                        break;
                    case 'extension':
                        classType = ClassKinds.EXTENSION;
                        break;
                    case 'cutscene':
                        classType = ClassKinds.CUTSCENE;
                        break;
                    default:
                        classType = ClassKinds.CLASS;
                        break;
                }

                currentClass = {
                    kind: classType,
                    name: className,
                    description: classDescription,
                    extends: extendsList,
                    staticFields: [],
                    staticMethods: [],
                    instanceFields: [],
                    instanceMethods: []
                };
                braceDepth = classMatch[3] ? 1 : 0;
                continue;
            }

            if (currentClass) {
                braceDepth += (line.match(/\{/g) || []).length;
                braceDepth -= (line.match(/\}/g) || []).length;

                if (braceDepth === 0) {
                    classes.set(className!, currentClass);
                    return lineIndex + 1;
                }

                if (isInsideFunction) {
                    if (braceDepth === 1) {
                        isInsideFunction = false;
                    }
                    continue;
                }

                const functionMatch = line.match(/^\s*(function|coroutine)\s+\w+\s*\(.*?\)\s*(\{)?\s*$/);
                if (functionMatch) {
                    isInsideFunction = true;
                    this.parseMethod(line, currentClass);
                    continue;
                }

                this.parseField(line, currentClass, availableClasses);
            }
        }

        return lines.length;
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

            const field = {
                label: fieldName,
                type: inferredType,
                description: '',
                private: isPrivate
            };

            if (currentClass.kind === ClassKinds.EXTENSION) {
                currentClass.staticFields.push(field);
            } else {
                currentClass.instanceFields.push(field);
            }
        }
    }

    private static parseMethod(
        line: string,
        currentClass: IClass
    ): void {
        const methodMatch = line.match(/^\s*(function|coroutine)\s+(\w+)\s*\((.*?)\)\s*(\{)?\s*$/);

        if (methodMatch) {
            const methodKind = methodMatch[1] === 'coroutine' ? MethodKinds.COROUTINE : MethodKinds.FUNCTION;
            const methodName = methodMatch[2];
            const methodParameters = this.parseParameters(methodMatch[3]);
            const methodExistsInParent = currentClass.extends?.some(parentClass =>
                parentClass.instanceMethods.some(m => m.label === methodName && m.parameters.length === methodParameters.length)
            );

            if (methodExistsInParent) {
                return;
            }

            const method = {
                label: methodName,
                type: methodKind,
                returnType: 'void',
                description: '',
                parameters: this.parseParameters(methodMatch[3])
            };

            if (methodName === 'Init' && (currentClass.kind === ClassKinds.CLASS || currentClass.kind === ClassKinds.COMPONENT)) {
                currentClass.constructors = currentClass.constructors || [];
                method.returnType = currentClass.name;
                currentClass.constructors.push(method);
            } else {
                if (currentClass.kind === ClassKinds.EXTENSION) {
                    currentClass.staticMethods.push(method);
                } else {
                    currentClass.instanceMethods.push(method);
                }
            }
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
