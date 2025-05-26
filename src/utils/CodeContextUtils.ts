import {DocumentTreeProvider} from './DocumentTreeProvider';
import * as vscode from 'vscode';
import {
    IClass,
    IMethod,
    IConstructor,
    IField,
    IVariable,
    IParameter,
    FindFieldInClassHierarchy,
    FindMethodInClassHierarchy
} from '../classes/IClass';

export class CodeContextUtils {
    public static isDeclaringFunction(document: vscode.TextDocument, position: vscode.Position): boolean {
        const line = document.lineAt(position).text;
        return line.trim().startsWith('function');
    }

    public static isDeclaringCoroutine(document: vscode.TextDocument, position: vscode.Position): boolean {
        const line = document.lineAt(position).text;
        return line.trim().startsWith('coroutine');
    }

    public static findContextStartLine(
        document: vscode.TextDocument,
        position: vscode.Position
    ): number | null {
        const text = document.getText();
        const lines = text.split(/\r?\n/);

        for (let lineIndex = position.line; lineIndex >= 0; lineIndex--) {
            const line = lines[lineIndex].trim();
            if (/^\s*(function|coroutine)\s+\w+\s*\(.*?\)\s*(\{)?\s*$/.test(line)) {
                return lineIndex;
            }
        }

        return null;
    }

    public static parseCallChain(input: string): string {
        let methodChain = '';
        let bracesDepth = 0;
        let inString = false;
        let stringChar: string | null = null;
        let escape = false;

        for (let i = input.length - 1; i >= 0; i--) {
            const char = input[i];

            if (inString) {
                if (escape) {
                    escape = false;
                } else if (char === '\\') {
                    escape = true;
                } else if (char === stringChar) {
                    inString = false;
                    stringChar = null;
                }
                methodChain = char + methodChain;
                continue;
            } else {
                if (char === '"' || char === "'" || char === '`') {
                    inString = true;
                    stringChar = char;
                    methodChain = char + methodChain;
                    continue;
                }
            }

            if (char === ')') {
                bracesDepth++;
            } else if (char === '(') {
                bracesDepth--;
                if (bracesDepth < 0) {
                    break;
                }
            }

            if (
                bracesDepth === 0 &&
                (char === '=' || char === '&' || char === '|' || char === '>' || char === '<' || /\s/.test(char) || char === ';' || char === ',' || char === '!')
            ) {
                break;
            }

            methodChain = char + methodChain;
        }

        if (!/^[A-Za-z_]\w*/.test(methodChain)) {
            return '';
        }

        if (!this.areParenthesesBalanced(methodChain)) {
            return '';
        }

        return methodChain.trim();
    }

    public static splitCallChain(chain: string): string[] {
        const components: string[] = [];
        let currentComponent = '';
        let bracesDepth = 0;
        let inString = false;
        let stringChar: string | null = null;
        let escape = false;

        for (let i = 0; i < chain.length; i++) {
            const char = chain[i];

            if (inString) {
                currentComponent += char;
                if (escape) {
                    escape = false;
                } else if (char === '\\') {
                    escape = true;
                } else if (char === stringChar) {
                    inString = false;
                    stringChar = null;
                }
                continue;
            } else {
                if (char === '"' || char === "'" || char === '`') {
                    inString = true;
                    stringChar = char;
                    currentComponent += char;
                    continue;
                }
            }

            if (char === '(') {
                bracesDepth++;
            } else if (char === ')') {
                bracesDepth--;
            }

            if (char === '.' && bracesDepth === 0) {
                if (currentComponent.trim() !== '') {
                    components.push(currentComponent.trim());
                    currentComponent = '';
                }
            } else {
                currentComponent += char;
            }
        }

        if (currentComponent.trim() !== '') {
            components.push(currentComponent.trim());
        }

        return components;
    }

    public static areParenthesesBalanced(str: string): boolean {
        let balance = 0;
        let inString = false;
        let stringChar: string | null = null;
        let escape = false;

        for (let i = 0; i < str.length; i++) {
            const char = str[i];

            if (inString) {
                if (escape) {
                    escape = false;
                } else if (char === '\\') {
                    escape = true;
                } else if (char === stringChar) {
                    inString = false;
                    stringChar = null;
                }
                continue;
            } else {
                if (char === '"' || char === "'" || char === '`') {
                    inString = true;
                    stringChar = char;
                    continue;
                }
            }

            if (char === '(') {
                balance++;
            } else if (char === ')') {
                balance--;
                if (balance < 0) {
                    return false;
                }
            }
        }

        return balance === 0 && !inString;
    }

    public static resolveChainType(
        document: vscode.TextDocument,
        position: vscode.Position,
        documentTreeProvider: DocumentTreeProvider,
        identifierChain: string[],
        currentClassDef?: IClass,
        currentMethod?: IMethod | IConstructor
    ): string | undefined {
        if (identifierChain.length === 0) {
            return undefined;
        }

        const currentClassName = currentClassDef?.name;
        let currentTypeName: string | undefined;

        for (let i = 0; i < identifierChain.length; i++) {
            const identifier = identifierChain[i];

            if (i === 0) {
                if (identifier === 'self') {
                    if (!currentClassName) {
                        return undefined;
                    }
                    currentTypeName = currentClassName;
                    continue;
                } else {
                    const variable = currentMethod?.parameters.find(v => v.name === identifier)
                        ?? currentMethod?.localVariables?.find(v => {
                            return v.name === identifier && v.scopeRange?.contains(position);
                        })
                        ?? undefined;
                    if (variable) {
                        currentTypeName = variable.type;
                    } else {
                        if (this.findClassByName(document, documentTreeProvider, identifier.split('(')[0])) {
                            currentTypeName = identifier.split('(')[0];
                        } else {
                            return undefined;
                        }
                    }
                }
            } else {
                if (!currentTypeName) {
                    return undefined;
                }

                const classDef = this.findClassByName(document, documentTreeProvider, currentTypeName);
                if (!classDef) {
                    return undefined;
                }

                const field = FindFieldInClassHierarchy(classDef, identifier, true, true, true, true);
                if (field) {
                    currentTypeName = field.type;
                    continue;
                }

                if (/^\s*\w+\s*\(.*\)\s*$/.test(identifier)) {
                    const name = identifier.split('(')[0].trim();
                    const method = FindMethodInClassHierarchy(classDef, name, -1, true, true);
                    if (method) {
                        currentTypeName = method.returnType;
                        continue;
                    }
                }

                return undefined;
            }
        }

        return currentTypeName;
    }

    public static resolveChainFinalPart(
        document: vscode.TextDocument,
        position: vscode.Position,
        documentTreeProvider: DocumentTreeProvider,
        identifierChain: string[],
        currentClassDef?: IClass,
        currentMethod?: IMethod | IConstructor
    ): IClass | IMethod | IField | IVariable | IParameter | undefined {
        if (identifierChain.length === 0) {
            return undefined;
        }

        const currentClassName = currentClassDef?.name;
        let currentTypeName: string | undefined;
        let currentPart: IClass | IMethod | IField | IVariable | IParameter | undefined;

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
                    const variable = currentMethod?.parameters.find(v => v.name === identifier)
                        ?? currentMethod?.localVariables?.find(v => {
                            return v.name === identifier && v.scopeRange?.contains(position);
                        })
                        ?? undefined;
                    if (variable) {
                        currentTypeName = variable.type;
                        currentPart = variable;
                    } else {
                        const classDef = this.findClassByName(document, documentTreeProvider, identifier.split('(')[0]);
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

                const classDef = this.findClassByName(document, documentTreeProvider, currentTypeName);
                if (!classDef) {
                    return undefined;
                }

                const field = FindFieldInClassHierarchy(classDef, identifier, true, true, true, true);
                if (field) {
                    currentTypeName = field.type.split('(')[0].trim();
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

    public static findClassByName(
        document: vscode.TextDocument,
        documentTreeProvider: DocumentTreeProvider,
        className: string
    ): IClass | undefined {
        return documentTreeProvider.getAllAvailableClasses(document).find((cls) => cls.name === className.split('(')[0]);
    }
}
