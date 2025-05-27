import { DocumentTreeProvider } from './DocumentTreeProvider';
import * as vscode from 'vscode';
import {
    IClass,
    IMethod,
    IConstructor,
    IField,
    IVariable,
    IParameter,
    FindFieldInClassHierarchy,
    FindMethodInClassHierarchy,
    TypeReference
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
        document: vscode.TextDocument | string,
        position: vscode.Position,
        documentTreeProvider: DocumentTreeProvider,
        identifierChain: string[],
        currentClassDef?: IClass,
        currentMethod?: IMethod | IConstructor
    ): TypeReference | undefined {
        if (identifierChain.length === 0) {
            return undefined;
        }
        let currentTypeRef: TypeReference | undefined;
        for (let i = 0; i < identifierChain.length; i++) {
            const id = identifierChain[i];
            if (i === 0) {
                if (id === 'self') {
                    if (!currentClassDef) {
                        return undefined;
                    }
                    currentTypeRef = { name: currentClassDef.name, typeArguments: [] };
                } else {
                    const param = currentMethod?.parameters.find(p => p.name === id);
                    let local: IVariable | undefined = undefined;
                    if (!param && currentMethod) {
                        local = documentTreeProvider.findAvailableLocalVariableByName(currentMethod, id, true, position);
                    }

                    if (param) {
                        currentTypeRef = param.type;
                    } else if (local) {
                        currentTypeRef = local.type;
                    } else {
                        const tr = CodeContextUtils.parseTypeReference(id);
                        const cls = documentTreeProvider.findClassByName(document, id);
                        if (!cls) {
                            return undefined;
                        }
                        currentTypeRef = tr;
                    }
                }
            } else {
                if (!currentTypeRef) {
                    return undefined;
                }
                const raw = this.typeRefToString(currentTypeRef);
                const cls = documentTreeProvider.findClassByName(document, raw);
                if (!cls) {
                    return undefined;
                }
                const field = FindFieldInClassHierarchy(cls, id, true, true, true, true);
                if (field) {
                    currentTypeRef = field.type;
                    continue;
                }
                const callMatch = id.match(/^(\w+)\s*\(/);
                if (callMatch) {
                    const method = FindMethodInClassHierarchy(cls, callMatch[1], -1, true, true);
                    if (method) {
                        currentTypeRef = method.returnType;
                        continue;
                    }
                }
                return undefined;
            }
        }
        return currentTypeRef;
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
        let currentTypeRef: TypeReference | undefined;
        let currentPart: IClass | IMethod | IField | IVariable | IParameter | undefined;
        for (let i = 0; i < identifierChain.length; i++) {
            const id = identifierChain[i];
            if (i === 0) {
                if (id === 'self') {
                    if (!currentClassDef) {
                        return undefined;
                    }
                    currentTypeRef = { name: currentClassDef.name, typeArguments: [] };
                    currentPart = currentClassDef;
                } else {
                    let local: IVariable | undefined;
                    let param: IParameter | undefined;
                    if (currentMethod) {
                        local = documentTreeProvider.findAvailableLocalVariableByName(currentMethod, id, true, position);
                        if (!local) {
                            param = currentMethod?.parameters.find(p => p.name === id);
                        }
                    }

                    if (param) {
                        currentTypeRef = param.type;
                        currentPart = param;
                    } else if (local) {
                        currentTypeRef = local.type;
                        currentPart = local;
                    } else {
                        const tr = CodeContextUtils.parseTypeReference(id);
                        const cls = documentTreeProvider.findClassByName(document, id);
                        if (!cls) {
                            return undefined;
                        }
                        currentTypeRef = tr;
                        currentPart = cls;
                    }
                }
            } else {
                if (!currentTypeRef) {
                    return undefined;
                }

                let cls: IClass | undefined;
                if (currentPart && 'kind' in currentPart && 'name' in currentPart) {
                    cls = currentPart;
                } else {
                    cls = documentTreeProvider.findClassByReference(document, currentTypeRef);
                }

                if (!cls) {
                    return undefined;
                }

                const field = FindFieldInClassHierarchy(cls, id, true, true, true, true);
                if (field) {
                    currentTypeRef = field.type;
                    currentPart = field;
                    continue;
                }
                
                let methodName = id;
                const callMatch = methodName.match(/^(\w+)\s*\(/);
                if (callMatch) {
                    methodName = callMatch[1];
                }

                const method = FindMethodInClassHierarchy(cls, methodName, -1, true, true);
                if (method) {
                    currentTypeRef = method.returnType;
                    currentPart = method;
                    continue;
                }
                
                return undefined;
            }
        }
        return currentPart;
    }

    public static parseTypeReference(typeStr: string): TypeReference {
        const s = typeStr.trim();
        // Generic Foo<Bar,Baz>
        const lt = s.indexOf('<');
        if (lt >= 0 && s.endsWith('>')) {
            const name = s.substring(0, lt).trim();
            const inner = s.substring(lt + 1, s.length - 1);
            const args: TypeReference[] = [];
            let depth = 0, start = 0;
            for (let i = 0; i < inner.length; i++) {
                const c = inner[i];
                if (c === '<') {
                    depth++;
                } else if (c === '>') {
                    depth--;
                } else if (c === ',' && depth === 0) {
                    args.push(this.parseTypeReference(inner.substring(start, i).trim()));
                    start = i + 1;
                }
            }
            args.push(this.parseTypeReference(inner.substring(start).trim()));
            return { name, typeArguments: args };
        }
        // String literal
        if (/^".*"$/.test(s)) {
            return { name: 'string', typeArguments: [] };
        }
        // Float
        if (/^\d+\.\d+$/.test(s)) {
            return { name: 'float', typeArguments: [] };
        }
        // Int
        if (/^\d+$/.test(s)) {
            return { name: 'int', typeArguments: [] };
        }
        // Bool
        if (s === 'true' || s === 'false') {
            return { name: 'bool', typeArguments: [] };
        }

        if (s === 'List' || s === 'List()') {
            return { name: 'List', typeArguments: [{ name: 'Object', typeArguments: [] }] };
        }

        if (s === 'Dict' || s === 'Dict()') {
            return { name: 'Dict', typeArguments: [{ name: 'Object', typeArguments: [] }, { name: 'Object', typeArguments: [] }] };
        }

        // Simple call: Foo(...) but not a field access Foo.Bar(...)
        const callMatch = s.match(/^([A-Za-z_]\w*)\s*\(/);
        if (callMatch && !/^[A-Za-z_]\w*\.[A-Za-z_]\w*/.test(s)) {
            let name = callMatch[1];
            if (name === 'List') {
                return { name: 'List', typeArguments: [{ name: 'Object', typeArguments: [] }] };
            }

            if (name === 'Dict') {
                return { name: 'Dict', typeArguments: [{ name: 'Object', typeArguments: [] }, { name: 'Object', typeArguments: [] }] };
            }

            return { name: name, typeArguments: [] };
        }

        return { name: s, typeArguments: [] };
    }

    public static parseTypeReferenceFallback(typeStr: string, fallback: string): TypeReference {
        const s = typeStr.trim();
        // Generic Foo<Bar,Baz>
        const lt = s.indexOf('<');
        if (lt >= 0 && s.endsWith('>')) {
            const name = s.substring(0, lt).trim();
            const inner = s.substring(lt + 1, s.length - 1);
            const args: TypeReference[] = [];
            let depth = 0, start = 0;
            for (let i = 0; i < inner.length; i++) {
                const c = inner[i];
                if (c === '<') {
                    depth++;
                } else if (c === '>') {
                    depth--;
                } else if (c === ',' && depth === 0) {
                    args.push(this.parseTypeReference(inner.substring(start, i).trim()));
                    start = i + 1;
                }
            }
            args.push(this.parseTypeReference(inner.substring(start).trim()));
            return { name, typeArguments: args };
        }
        // String literal
        if (/^".*"$/.test(s)) {
            return { name: 'string', typeArguments: [] };
        }
        // Float
        if (/^\d+\.\d+$/.test(s)) {
            return { name: 'float', typeArguments: [] };
        }
        // Int
        if (/^\d+$/.test(s)) {
            return { name: 'int', typeArguments: [] };
        }
        // Bool
        if (s === 'true' || s === 'false') {
            return { name: 'bool', typeArguments: [] };
        }

        if (s === 'List' || s === 'List()') {
            return { name: 'List', typeArguments: [{ name: 'Object', typeArguments: [] }] };
        }

        if (s === 'Dict' || s === 'Dict()') {
            return { name: 'Dict', typeArguments: [{ name: 'Object', typeArguments: [] }, { name: 'Object', typeArguments: [] }] };
        }

        // Simple call: Foo(...) but not a field access Foo.Bar(...)
        const callMatch = s.match(/^([A-Za-z_]\w*)\s*\(/);
        if (callMatch && !/^[A-Za-z_]\w*\.[A-Za-z_]\w*/.test(s)) {
            let name = callMatch[1];
            if (name === 'List') {
                return { name: 'List', typeArguments: [{ name: 'Object', typeArguments: [] }] };
            }

            if (name === 'Dict') {
                return { name: 'Dict', typeArguments: [{ name: 'Object', typeArguments: [] }, { name: 'Object', typeArguments: [] }] };
            }

            return { name: name, typeArguments: [] };
        }
        return { name: fallback, typeArguments: [] };
    }

    public static typeRefToString(tr: TypeReference): string {
        if (tr.typeArguments.length === 0) {
            return tr.name;
        }
        return `${tr.name}<${tr.typeArguments.map(a => this.typeRefToString(a)).join(',')}>`;
    }
}
