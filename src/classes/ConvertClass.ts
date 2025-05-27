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
            parent: this,
            label: 'ToFloat',
            returnType: {name: 'float', typeArguments: []},
            description: 'Convert the value to floating type.',
            parameters: [
                { name: 'value', type: {name: 'Object', typeArguments: []}, description: 'The value to convert.' }
            ]
        },
        {
            parent: this,
            label: 'ToInt',
            returnType: {name: 'int', typeArguments: []},
            description: 'Convert the value to integer type.',
            parameters: [
                { name: 'value', type: {name: 'Object', typeArguments: []}, description: 'The value to convert.' }
            ]
        },
        {
            parent: this,
            label: 'ToBool',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Convert the value to boolean type.',
            parameters: [
                { name: 'value', type: {name: 'Object', typeArguments: []}, description: 'The value to convert.' }
            ]
        },
        {
            parent: this,
            label: 'ToString',
            returnType: {name: 'string', typeArguments: []},
            description: 'Convert the value to string type.',
            parameters: [
                { name: 'value', type: {name: 'Object', typeArguments: []}, description: 'The value to convert.' }
            ]
        },
        {
            parent: this,
            label: 'IsFloat',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Returns true if the object is a float.',
            parameters: [
                { name: 'value', type: {name: 'Object', typeArguments: []}, description: 'The value to check.' }
            ]
        },
        {
            parent: this,
            label: 'IsInt',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Returns true if the object is an int.',
            parameters: [
                { name: 'value', type: {name: 'Object', typeArguments: []}, description: 'The value to check.' }
            ]
        },
        {
            parent: this,
            label: 'IsBool',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Returns true if the object is a bool.',
            parameters: [
                { name: 'value', type: {name: 'Object', typeArguments: []}, description: 'The value to check.' }
            ]
        },
        {
            parent: this,
            label: 'IsString',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Returns true if the object is a string.',
            parameters: [
                { name: 'value', type: {name: 'Object', typeArguments: []}, description: 'The value to check.' }
            ]
        },
        {
            parent: this,
            label: 'IsObject',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Returns true if the object is an Object. You can use value.Type for further type checking.',
            parameters: [
                { name: 'value', type: {name: 'Object', typeArguments: []}, description: 'The value to check.' }
            ]
        }
    ];
}

export const ConvertClassInstance: ConvertClass = new ConvertClass();
