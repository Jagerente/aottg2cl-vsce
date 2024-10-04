export interface IParameter {
    name: string;
    type: string;
    description: string;
    isOptional?: boolean;
    isVariadic?: boolean;
}

export interface IMethod {
    label: string;
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
    name: string;
    description: string;
    staticFields: IField[];
    staticMethods: IMethod[];
    instanceFields: IField[];
    instanceMethods: IMethod[];
}
