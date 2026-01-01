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
    FindMethodInClassHierarchy,
    TypeReference,
    IChainNode,
    ClassKinds
} from '../classes/IClass';

export class CodeContextUtils {
    /**
     * Checks if the specified position is in a function declaration.
     *
     * @param document - Text document to check
     * @param position - Position in the document to check
     * @returns true if the line at the specified position starts with the 'function' keyword, otherwise false
     */
    public static isDeclaringFunction(document: vscode.TextDocument, position: vscode.Position): boolean {
        const line = document.lineAt(position).text;
        return line.trim().startsWith('function');
    }

    /**
     * Checks if the specified position is in a coroutine declaration.
     *
     * @param document - Text document to check
     * @param position - Position in the document to check
     * @returns true if the line at the specified position starts with the 'coroutine' keyword, otherwise false
     */
    public static isDeclaringCoroutine(document: vscode.TextDocument, position: vscode.Position): boolean {
        const line = document.lineAt(position).text;
        return line.trim().startsWith('coroutine');
    }

    /**
     * Checks if the specified position is in a variable declaration.
     * Identifies variable declarations by pattern: variable name followed by an equals sign.
     *
     * @param document - Text document to check
     * @param position - Position in the document to check
     * @returns true if the text before the position matches the variable declaration pattern (name = value), otherwise false
     */
    public static isDeclaringVariable(document: vscode.TextDocument, position: vscode.Position): boolean {
        const line = document.lineAt(position).text;
        const textBeforePosition = line.substring(0, position.character);

        const pattern = /^[\s]*([A-Za-z_]\w*)[\s]*=.*$/;
        return pattern.test(textBeforePosition);
    }

    /**
     * Internal method that resolves a chain of identifiers and returns both the type reference and the resolved part.
     * This is the common algorithm used by both resolveChainType and resolveChainFinalPart.
     *
     * @param document - Text document or string with document name
     * @param position - Position in the document for contextual analysis
     * @param documentTreeProvider - Document tree provider for finding classes and variables
     * @param identifierChain - Array of chain nodes (IChainNode) containing information about each identifier
     * @param currentClassDef - Optional current class definition for resolving 'self'
     * @param currentMethod - Optional current method or constructor for finding parameters and local variables
     * @param maxIndex - Optional maximum index in the chain to process (defaults to processing the entire chain)
     * @returns Object containing both the type reference and the resolved part, or undefined if resolution fails
     */
    private static resolveChainInternal(
        document: vscode.TextDocument | string,
        position: vscode.Position,
        documentTreeProvider: DocumentTreeProvider,
        identifierChain: IChainNode[],
        currentClassDef?: IClass,
        currentMethod?: IMethod | IConstructor,
        maxIndex?: number
    ): { typeRef: TypeReference; part: IClass | IMethod | IField | IVariable | IParameter } | undefined {
        const chainLength = maxIndex !== undefined ? Math.min(maxIndex + 1, identifierChain.length) : identifierChain.length;
        if (chainLength === 0) {
            return undefined;
        }

        let currentTypeRef: TypeReference | undefined;
        let currentPart: IClass | IMethod | IField | IVariable | IParameter | undefined;

        for (let i = 0; i < chainLength; i++) {
            const id = identifierChain[i];
            if (i === 0) {
                if (id.text === 'self') {
                    if (!currentClassDef) {
                        return undefined;
                    }
                    currentTypeRef = {name: currentClassDef.name, typeArguments: []};
                    currentPart = currentClassDef;
                } else {
                    // First check parameter, then local variable (consistent order)
                    const param = currentMethod?.parameters.find(p => p.name === id.text);
                    let local: IVariable | undefined = undefined;
                    if (!param && currentMethod) {
                        local = documentTreeProvider.findAvailableLocalVariableByName(currentMethod, id.text, true, position);
                    }

                    if (param) {
                        currentTypeRef = param.type;
                        currentPart = param;
                    } else if (local) {
                        currentTypeRef = local.type;
                        currentPart = local;
                    } else {
                        const tr = CodeContextUtils.parseTypeReference(id.text);
                        const cls = documentTreeProvider.findClassByName(document, id.text);
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

                // Optimize: if currentPart is already a class, use it directly
                // Otherwise, resolve class from type reference
                let cls: IClass | undefined;
                if (currentPart && 'kind' in currentPart && 'name' in currentPart && !('label' in currentPart)) {
                    cls = currentPart as IClass;
                } else {
                    // Use findClassByReference for more universal resolution
                    cls = documentTreeProvider.findClassByReference(document, currentTypeRef);
                }

                if (!cls) {
                    return undefined;
                }

                if (id.isMethodCall) {
                    const methodName = id.text.split('(')[0];
                    const method = FindMethodInClassHierarchy(cls, methodName, id.methodArguments?.length ?? -1, true, true);
                    if (method) {
                        // Special handling for MapObject.AddComponent and MapObject.GetComponent
                        // These methods take a string argument that represents the component type name
                        if (cls.name === 'MapObject' && (methodName === 'AddComponent' || methodName === 'GetComponent')) {
                            const firstArg = id.methodArguments?.[0];
                            if (firstArg && firstArg.trim().length > 0) {
                                // Extract string value from argument (remove quotes if present)
                                let componentTypeName = firstArg.trim();
                                if ((componentTypeName.startsWith('"') && componentTypeName.endsWith('"'))) {
                                    componentTypeName = componentTypeName.slice(1, -1);
                                }

                                if (componentTypeName.length > 0) {
                                    // Check if such component exists among definitions
                                    const componentClass = documentTreeProvider.findClassByName(document, componentTypeName);
                                    if (componentClass && componentClass.kind === ClassKinds.COMPONENT) {
                                        // Use the component type name from the argument as the type
                                        currentTypeRef = CodeContextUtils.parseTypeReference(componentTypeName);
                                        // Create a copy of the method with the new return type
                                        currentPart = {
                                            ...method,
                                            returnType: currentTypeRef
                                        };
                                        continue;
                                    }
                                }
                            }
                        }

                        currentTypeRef = method.returnType;
                        currentPart = method;
                        continue;
                    }
                }

                const field = FindFieldInClassHierarchy(cls, id.text, true, true, true, true);
                if (field) {
                    currentTypeRef = field.type;
                    currentPart = field;
                    continue;
                }

                return undefined;
            }
        }

        if (!currentTypeRef || !currentPart) {
            return undefined;
        }

        return {typeRef: currentTypeRef, part: currentPart};
    }

    /**
     * Resolves the type for a chain of identifiers using structured chain nodes.
     *
     * @param document - Text document or string with document name
     * @param position - Position in the document for contextual analysis
     * @param documentTreeProvider - Document tree provider for finding classes and variables
     * @param identifierChain - Array of chain nodes (IChainNode) containing information about each identifier
     * @param currentClassDef - Optional current class definition for resolving 'self'
     * @param currentMethod - Optional current method or constructor for finding parameters and local variables
     * @returns TypeReference for the last element in the chain, or undefined if the type cannot be resolved
     */
    public static resolveChainType(
        document: vscode.TextDocument | string,
        position: vscode.Position,
        documentTreeProvider: DocumentTreeProvider,
        identifierChain: IChainNode[],
        currentClassDef?: IClass,
        currentMethod?: IMethod | IConstructor
    ): TypeReference | undefined {
        const result = this.resolveChainInternal(
            document,
            position,
            documentTreeProvider,
            identifierChain,
            currentClassDef,
            currentMethod
        );
        return result?.typeRef;
    }

    /**
     * Resolves the final part of an identifier chain and returns the corresponding definition object.
     * Unlike resolveChainType, returns the actual object (class, method, field, variable, or parameter),
     * not just its type.
     *
     * @param document - Text document for analysis
     * @param position - Position in the document for contextual analysis
     * @param documentTreeProvider - Document tree provider for finding classes and variables
     * @param identifierChain - Array of chain nodes (IChainNode) containing information about each identifier
     * @param currentClassDef - Optional current class definition for resolving 'self'
     * @param currentMethod - Optional current method or constructor for finding parameters and local variables
     * @param maxIndex - Optional maximum index in the chain to process (defaults to processing the entire chain)
     * @returns Definition object (IClass, IMethod, IField, IVariable, or IParameter) for the final part of the chain,
     *          or undefined if the object cannot be found
     */
    public static resolveChainFinalPart(
        document: vscode.TextDocument,
        position: vscode.Position,
        documentTreeProvider: DocumentTreeProvider,
        identifierChain: IChainNode[],
        currentClassDef?: IClass,
        currentMethod?: IMethod | IConstructor,
        maxIndex?: number
    ): IClass | IMethod | IField | IVariable | IParameter | undefined {
        const result = this.resolveChainInternal(
            document,
            position,
            documentTreeProvider,
            identifierChain,
            currentClassDef,
            currentMethod,
            maxIndex
        );
        return result?.part;
    }

    /**
     * Parses a string representation of a type into a TypeReference object.
     * Supports various formats: simple types, generics (Foo<Bar,Baz>), literals (strings, numbers, booleans),
     * as well as special types List, Dict, and Set.
     *
     * @param typeStr - String representing the type (e.g., "Foo<Bar,Baz>", "string", "List", "int")
     * @param fallback - Optional fallback type name used if the type cannot be recognized. If not provided, the original string is used.
     * @returns TypeReference object representing the parsed type
     */
    public static parseTypeReference(typeStr: string, fallback?: string): TypeReference {
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
                    args.push(this.parseTypeReference(inner.substring(start, i).trim(), fallback));
                    start = i + 1;
                }
            }
            args.push(this.parseTypeReference(inner.substring(start).trim(), fallback));
            return {name, typeArguments: args};
        }
        // String literal
        if (/^".*"$/.test(s)) {
            return {name: 'string', typeArguments: []};
        }
        // Float
        if (/^\d+\.\d+$/.test(s)) {
            return {name: 'float', typeArguments: []};
        }
        // Int
        if (/^\d+$/.test(s)) {
            return {name: 'int', typeArguments: []};
        }
        // Bool
        if (s === 'true' || s === 'false') {
            return {name: 'bool', typeArguments: []};
        }

        if (s === 'List' || s === 'List()') {
            return {name: 'List', typeArguments: [{name: 'Object', typeArguments: []}]};
        }

        if (s === 'Dict' || s === 'Dict()') {
            return {
                name: 'Dict',
                typeArguments: [{name: 'Object', typeArguments: []}, {name: 'Object', typeArguments: []}]
            };
        }

        if (s === 'Set' || s === 'Set()') {
            return {name: 'Set', typeArguments: [{name: 'Object', typeArguments: []}]};
        }

        // Simple call: Foo(...) but not a field access Foo.Bar(...)
        const callMatch = s.match(/^([A-Za-z_]\w*)\s*\(/);
        if (callMatch && !/^[A-Za-z_]\w*\.[A-Za-z_]\w*/.test(s)) {
            let name = callMatch[1];
            if (name === 'List') {
                return {name: 'List', typeArguments: [{name: 'Object', typeArguments: []}]};
            }

            if (name === 'Dict') {
                return {
                    name: 'Dict',
                    typeArguments: [{name: 'Object', typeArguments: []}, {name: 'Object', typeArguments: []}]
                };
            }

            if (name === 'Set') {
                return {name: 'Set', typeArguments: [{name: 'Object', typeArguments: []}]};
            }

            return {name: name, typeArguments: []};
        }

        return {name: fallback ?? s, typeArguments: []};
    }

    /**
     * Converts a TypeReference object to its string representation.
     * Recursively processes generics, creating a string like "Foo<Bar,Baz>".
     *
     * @param tr - TypeReference object to convert
     * @returns String representation of the type (e.g., "Foo" or "List<Object>")
     */
    public static typeRefToString(tr: TypeReference): string {
        if (tr.typeArguments.length === 0) {
            return tr.name;
        }
        return `${tr.name}<${tr.typeArguments.map(a => this.typeRefToString(a)).join(',')}>`;
    }
}
