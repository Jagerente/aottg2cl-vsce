import { IClass, IField, IMethod } from './IClass';

export class ListClass implements IClass {
    public name = 'List';
    public description = 'Lists allow you to keep an ordered array of objects.';

    public instanceFields: IField[] = [
        { label: 'Count', type: 'int', description: 'Number of items in the list.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'Clear',
            returnType: 'null',
            description: 'Clears the list.',
            parameters: []
        },
        {
            label: 'Get',
            returnType: 'Object',
            description: 'Returns the item at the given index.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index of the item to retrieve.' }
            ]
        },
        {
            label: 'Set',
            returnType: 'null',
            description: 'Sets the item at the given index.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index where the item should be set.' },
                { name: 'item', type: 'Object', description: 'Item to set at the index.' }
            ]
        },
        {
            label: 'Add',
            returnType: 'null',
            description: 'Adds an item to the end of the list.',
            parameters: [
                { name: 'item', type: 'Object', description: 'Item to add to the list.' }
            ]
        },
        {
            label: 'InsertAt',
            returnType: 'null',
            description: 'Inserts an item at the given index.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index where the item should be inserted.' },
                { name: 'item', type: 'Object', description: 'Item to insert.' }
            ]
        },
        {
            label: 'RemoveAt',
            returnType: 'null',
            description: 'Removes the item at the given index.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index of the item to remove.' }
            ]
        },
        {
            label: 'Remove',
            returnType: 'null',
            description: 'Removes the item from the list.',
            parameters: [
                { name: 'item', type: 'Object', description: 'Item to remove from the list.' }
            ]
        },
        {
            label: 'Contains',
            returnType: 'bool',
            description: 'Returns true if the item is contained in the list.',
            parameters: [
                { name: 'item', type: 'Object', description: 'Item to check for in the list.' }
            ]
        },
        {
            label: 'Sort',
            returnType: 'null',
            description: 'Sorts the items in the list in place if the items are comparable (int, float, string).',
            parameters: []
        }
    ];

    public staticFields: IField[] = [];
    
    public staticMethods: IMethod[] = [];
}
