import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class DictClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Dict';
    public description = 'Dict (dictionary) allows you to add and reference objects by key and value.';

    public instanceFields: IField[] = [
        { label: 'Keys', type: 'List(Object)', description: 'List of keys in the dictionary.' },
        { label: 'Values', type: 'List(Object)', description: 'List of values in the dictionary.' },
        { label: 'Count', type: 'int', description: 'Number of entries in the dictionary.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'Clear',
            returnType: 'null',
            description: 'Clears the dictionary.',
            parameters: []
        },
        {
            label: 'Get',
            returnType: 'Object',
            description: 'Returns the value at given key. If the optional parameter default is provided, will return default if no key is found.',
            parameters: [
                { name: 'key', type: 'Object', description: 'Key to retrieve the value for.' },
                { name: 'default', type: 'Object', description: 'Optional default value if key is not found.', isOptional: true }
            ]
        },
        {
            label: 'Set',
            returnType: 'null',
            description: 'Sets the value at the given key.',
            parameters: [
                { name: 'key', type: 'Object', description: 'Key to set the value for.' },
                { name: 'value', type: 'Object', description: 'Value to set at the given key.' }
            ]
        },
        {
            label: 'Remove',
            returnType: 'null',
            description: 'Removes the entry at the given key.',
            parameters: [
                { name: 'key', type: 'Object', description: 'Key to remove the value for.' }
            ]
        },
        {
            label: 'Contains',
            returnType: 'bool',
            description: 'Checks if the dictionary contains the given key.',
            parameters: [
                { name: 'key', type: 'Object', description: 'Key to check for.' }
            ]
        }
    ];

    public staticFields: IField[] = [];
    
    public staticMethods: IMethod[] = [];
}

export const DictClassInstance: DictClass = new DictClass();
