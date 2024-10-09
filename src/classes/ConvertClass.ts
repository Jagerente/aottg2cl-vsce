import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class ConvertClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Convert';
    public description = 'Converting objects to different types.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            label: 'ToFloat',
            returnType: 'float',
            description: 'Convert the value to floating type.',
            parameters: [
                { name: 'value', type: 'object', description: 'The value to convert.' }
            ]
        },
        {
            label: 'ToInt',
            returnType: 'int',
            description: 'Convert the value to integer type.',
            parameters: [
                { name: 'value', type: 'object', description: 'The value to convert.' }
            ]
        },
        {
            label: 'ToBool',
            returnType: 'bool',
            description: 'Convert the value to boolean type.',
            parameters: [
                { name: 'value', type: 'object', description: 'The value to convert.' }
            ]
        },
        {
            label: 'ToString',
            returnType: 'string',
            description: 'Convert the value to string type.',
            parameters: [
                { name: 'value', type: 'object', description: 'The value to convert.' }
            ]
        },
        {
            label: 'IsFloat',
            returnType: 'bool',
            description: 'Returns true if the object is a float.',
            parameters: [
                { name: 'value', type: 'object', description: 'The value to check.' }
            ]
        },
        {
            label: 'IsInt',
            returnType: 'bool',
            description: 'Returns true if the object is an int.',
            parameters: [
                { name: 'value', type: 'object', description: 'The value to check.' }
            ]
        },
        {
            label: 'IsBool',
            returnType: 'bool',
            description: 'Returns true if the object is a bool.',
            parameters: [
                { name: 'value', type: 'object', description: 'The value to check.' }
            ]
        },
        {
            label: 'IsString',
            returnType: 'bool',
            description: 'Returns true if the object is a string.',
            parameters: [
                { name: 'value', type: 'object', description: 'The value to check.' }
            ]
        },
        {
            label: 'IsObject',
            returnType: 'bool',
            description: 'Returns true if the object is an Object. You can use value.Type for further type checking.',
            parameters: [
                { name: 'value', type: 'object', description: 'The value to check.' }
            ]
        }
    ];
}

export const ConvertClassInstance: ConvertClass = new ConvertClass();
