import * as vscode from 'vscode';

export enum ClassKinds {
    CLASS = 'class',
    COMPONENT = 'component',
    EXTENSION = 'extension',
    CUTSCENE = 'cutscene'
}

export enum MethodKinds {
    FUNCTION = 'function',
    COROUTINE = 'coroutine'
}

export interface IVariable {
    name: string;
    value: string;
    type: string;
}

export interface IParameter {
    name: string;
    type: string;
    description: string;
    isOptional?: boolean;
    isVariadic?: boolean;
}

export interface IConstructor {
    parameters: IParameter[];
    description: string;
    declarationRange?: vscode.Range;
    bodyRange?: vscode.Range;
}

export interface IMethod {
    label: string;
    kind?: MethodKinds;
    returnType: string;
    description: string;
    parameters: IParameter[];
    declarationRange?: vscode.Range;
    bodyRange?: vscode.Range;
}

export interface IField {
    label: string;
    type: string;
    description: string;
    readonly?: boolean;
    private?: boolean
}

export interface IClass {
    kind: ClassKinds;
    name: string;
    description: string;
    extends?: IClass[]
    constructors?: IConstructor[];
    staticFields: IField[];
    staticMethods: IMethod[];
    instanceFields: IField[];
    instanceMethods: IMethod[];
    declarationRange?: vscode.Range;
    bodyRange?: vscode.Range;
}

export function FindFieldInClassHierarchy(
    classDef: IClass,
    fieldName: string,
    includeInstance: boolean,
    includeStatic: boolean,
    includePublic: boolean,
    includePrivate: boolean
): IField | null {
    const instanceFields = includeInstance
        ? classDef.instanceFields.filter(f => (includePrivate || !f.private))
        : [];
    const staticFields = includeStatic
        ? classDef.staticFields.filter(f => (includePrivate || !f.private))
        : [];

    const fields = [...instanceFields, ...staticFields];
    const field = fields.find(f => f.label === fieldName);
    if (field) {
        return field;
    }

    if (classDef.extends) {
        for (const parent of classDef.extends) {
            const foundField = FindFieldInClassHierarchy(parent, fieldName, includeInstance, includeStatic, includePublic, includePrivate);
            if (foundField) {
                return foundField;
            }
        }
    }
    return null;
}

export function FindMethodInClassHierarchy(
    classDef: IClass,
    methodName: string,
    argCount: number,
    includeInstance: boolean,
    includeStatic: boolean,
): IMethod | null {
    const instanceMethods = includeInstance
        ? classDef.instanceMethods
        : [];
    const staticMethods = includeStatic
        ? classDef.staticMethods
        : [];

    const methods = [...instanceMethods, ...staticMethods];
    const method = methods.find(m => m.label === methodName && (argCount === -1 || m.parameters.length === argCount));
    if (method) {
        return method;
    }

    if (classDef.extends) {
        for (const parent of classDef.extends) {
            const foundMethod = FindMethodInClassHierarchy(parent, methodName, argCount, includeInstance, includeStatic);
            if (foundMethod) {
                return foundMethod;
            }
        }
    }
    return null;
}

export function FindMethodInClassParentsHierarchy(
    classDef: IClass,
    methodName: string,
    argCount: number,
    includeInstance: boolean,
    includeStatic: boolean,
): IMethod | null {
    if (classDef.extends) {
        for (const parent of classDef.extends) {
            const foundMethod = FindMethodInClassHierarchy(parent, methodName, argCount, includeInstance, includeStatic);
            if (foundMethod) {
                return foundMethod;
            }
        }
    }
    return null;
}

export function FindFieldInClassParentsHierarchy(
    classDef: IClass,
    fieldName: string,
    includeInstance: boolean,
    includeStatic: boolean,
    includePublic: boolean,
    includePrivate: boolean
): IField | null {
    if (classDef.extends) {
        for (const parent of classDef.extends) {
            const foundField = FindFieldInClassHierarchy(parent, fieldName, includeInstance, includeStatic, includePublic, includePrivate);
            if (foundField) {
                return foundField;
            }
        }
    }
    return null;
}

export function FindConstructorInClassHierarchy(classDef: IClass, argCount: number): IConstructor | null {
    const ctor = classDef.constructors?.find(m => m.parameters.length === argCount);
    if (ctor) {
        return ctor;
    }

    if (classDef.extends) {
        for (const parent of classDef.extends) {
            const foundCtor = FindConstructorInClassHierarchy(parent, argCount);
            if (foundCtor) {
                return foundCtor;
            }
        }
    }
    return null;
}