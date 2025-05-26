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

export interface IChainNode {
    text: string;
    startLine: number;
    startColumn: number;
    isMethodCall: boolean;
    methodArguments?: string[];
}

export interface ILoopNode {
    conditionsRange: vscode.Range;
    bodyRange: vscode.Range;
}

export interface IConditionNode {
    type: string;
    conditionRange?: vscode.Range;
    bodyRange: vscode.Range;
    afterBlockRange: vscode.Range;
}

export interface IReassignment {
    range: vscode.Range;
    value: string;
}

export interface IVariable {
    name: string;
    value: string;
    type: string;
    declarationRange?: vscode.Range;
    scopeRange?: vscode.Range;
    reassignments?: IReassignment[];
}

export interface IParameter {
    name: string;
    type: string;
    description: string;
    declarationRange?: vscode.Range;
    isOptional?: boolean;
    isVariadic?: boolean;
    reassignments?: IReassignment[];
}

export interface IConstructor {
    parent: IClass;
    parameters: IParameter[];
    description: string;
    declarationRange?: vscode.Range;
    bodyRange?: vscode.Range;
    sourceUri?: vscode.Uri;
    localVariables?: IVariable[];
}

export interface IMethod {
    parent: IClass;
    label: string;
    kind?: MethodKinds;
    returnType: string;
    description: string;
    parameters: IParameter[];
    declarationRange?: vscode.Range;
    bodyRange?: vscode.Range;
    sourceUri?: vscode.Uri;
    localVariables?: IVariable[];
}

export interface IField {
    parent: IClass;
    label: string;
    type: string;
    description: string;
    readonly?: boolean;
    private?: boolean
    declarationRange?: vscode.Range;
    sourceUri?: vscode.Uri;
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
    sourceUri?: vscode.Uri;
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
    const method = methods.find(m => {
        if (m.label !== methodName) {
            return false;
        }

        if (argCount === -1) {
            return true;
        }

        const requiredParams = m.parameters.filter(
            param => !param.isOptional && !param.isVariadic
        ).length;

        const maxParams = m.parameters.filter(
            param => !param.isVariadic
        ).length;

        const hasVariadic = m.parameters.some(param => param.isVariadic);

        if (argCount < requiredParams) {
            return false;
        }

        if (hasVariadic) {
            return true;
        }

        return argCount <= maxParams;
    });

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

export interface IError {
    line: number;
    charPositionInLine: number;
    msg: string;
    offendingSymbol?: string;
}
