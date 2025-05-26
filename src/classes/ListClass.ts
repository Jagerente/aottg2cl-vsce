import { BaseInstantiatableClass } from './BaseInstantiatableClass';
import { ClassKinds, IClass, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class ListClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'List';
    public description = 'Lists allow you to keep an ordered array of objects.';

    public extends?: IClass[] = [ObjectClassInstance, new BaseInstantiatableClass()];

    public instanceFields: IField[] = [
        { parent: this, label: 'Count', type: 'int', description: 'Number of items in the list.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'Clear',
            returnType: 'null',
            description: 'Clears the list.',
            parameters: []
        },
        {
            parent: this,
            label: 'Get',
            returnType: 'Object',
            description: 'Returns the item at the given index.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index of the item to retrieve.' }
            ]
        },
        {
            parent: this,
            label: 'Set',
            returnType: 'null',
            description: 'Sets the item at the given index.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index where the item should be set.' },
                { name: 'item', type: 'Object', description: 'Item to set at the index.' }
            ]
        },
        {
            parent: this,
            label: 'Add',
            returnType: 'null',
            description: 'Adds an item to the end of the list.',
            parameters: [
                { name: 'item', type: 'Object', description: 'Item to add to the list.' }
            ]
        },
        {
            parent: this,
            label: 'InsertAt',
            returnType: 'null',
            description: 'Inserts an item at the given index.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index where the item should be inserted.' },
                { name: 'item', type: 'Object', description: 'Item to insert.' }
            ]
        },
        {
            parent: this,
            label: 'RemoveAt',
            returnType: 'null',
            description: 'Removes the item at the given index.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index of the item to remove.' }
            ]
        },
        {
            parent: this,
            label: 'Remove',
            returnType: 'null',
            description: 'Removes the item from the list.',
            parameters: [
                { name: 'item', type: 'Object', description: 'Item to remove from the list.' }
            ]
        },
        {
            parent: this,
            label: 'Contains',
            returnType: 'bool',
            description: 'Returns true if the item is contained in the list.',
            parameters: [
                { name: 'item', type: 'Object', description: 'Item to check for in the list.' }
            ]
        },
        {
            parent: this,
            label: 'Sort',
            returnType: 'null',
            description: 'Sorts the items in the list in place if the items are comparable (int, float, string).',
            parameters: []
        },
        {
            parent: this,
            label: 'Randomize',
            returnType: 'null',
            description: 'Randomizes the list order.',
            parameters: []
        }
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const ListClassInstance: ListClass = new ListClass();
