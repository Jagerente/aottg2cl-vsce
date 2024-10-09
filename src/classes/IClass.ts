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
}

export interface IMethod {
    label: string;
    kind?: MethodKinds;
    returnType: string;
    description: string;
    parameters: IParameter[];
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
}
