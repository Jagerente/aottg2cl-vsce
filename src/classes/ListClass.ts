import {BaseInstantiatableClass} from './BaseInstantiatableClass';
import {ClassKinds, IClass, IField, IMethod, TypeReference} from './IClass';
import {ObjectClassInstance} from './ObjectClass';

export class ListClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'List';
    public description = 'Lists allow you to keep an ordered array of objects.';

    public extends?: IClass[] = [ObjectClassInstance, new BaseInstantiatableClass()];

    public instanceFields: IField[] = [
        {
            parent: this,
            label: 'Count',
            type: {name: 'int', typeArguments: []},
            description: 'Number of items in the list.'
        }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'Clear',
            returnType: {name: 'void', typeArguments: []},
            description: 'Clears the list.',
            parameters: []
        },
        {
            parent: this,
            label: 'Get',
            returnType: {name: 'T', typeArguments: []},
            description: 'Returns the item at the given index.',
            parameters: [
                {name: 'index', type: {name: 'int', typeArguments: []}, description: 'Index of the item to retrieve.'}
            ]
        },
        {
            parent: this,
            label: 'Set',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the item at the given index.',
            parameters: [
                {
                    name: 'index',
                    type: {name: 'int', typeArguments: []},
                    description: 'Index where the item should be set.'
                },
                {name: 'item', type: {name: 'T', typeArguments: []}, description: 'Item to set at the index.'}
            ]
        },
        {
            parent: this,
            label: 'Add',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds an item to the end of the list.',
            parameters: [
                {name: 'item', type: {name: 'T', typeArguments: []}, description: 'Item to add to the list.'}
            ]
        },
        {
            parent: this,
            label: 'InsertAt',
            returnType: {name: 'void', typeArguments: []},
            description: 'Inserts an item at the given index.',
            parameters: [
                {
                    name: 'index',
                    type: {name: 'int', typeArguments: []},
                    description: 'Index where the item should be inserted.'
                },
                {name: 'item', type: {name: 'T', typeArguments: []}, description: 'Item to insert.'}
            ]
        },
        {
            parent: this,
            label: 'RemoveAt',
            returnType: {name: 'void', typeArguments: []},
            description: 'Removes the item at the given index.',
            parameters: [
                {name: 'index', type: {name: 'int', typeArguments: []}, description: 'Index of the item to remove.'}
            ]
        },
        {
            parent: this,
            label: 'Remove',
            returnType: {name: 'void', typeArguments: []},
            description: 'Removes the item from the list.',
            parameters: [
                {name: 'item', type: {name: 'T', typeArguments: []}, description: 'Item to remove from the list.'}
            ]
        },
        {
            parent: this,
            label: 'Contains',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Returns true if the item is contained in the list.',
            parameters: [
                {name: 'item', type: {name: 'T', typeArguments: []}, description: 'Item to check for in the list.'}
            ]
        },
        {
            parent: this,
            label: 'Sort',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sorts the items in the list in place if the items are comparable (int, float, string).',
            parameters: []
        },
        {
            parent: this,
            label: 'Randomize',
            returnType: {name: 'void', typeArguments: []},
            description: 'Randomizes the list order.',
            parameters: []
        }
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];

    public instantiate(typeArgs: TypeReference[]): IClass {
        const [T] = typeArgs;
        const inst = new ListClass();
        inst.name = `List<${T.name}>`;
        inst.instanceFields = this.instanceFields.map(f => ({
            ...f,
            parent: inst,
            type: f.type.name === 'T' ? T : f.type
        }));
        inst.instanceMethods = this.instanceMethods.map(m => ({
            ...m,
            parent: inst,
            returnType: m.returnType.name === 'T' ? T : m.returnType,
            parameters: m.parameters.map(p => ({
                ...p,
                type: p.type.name === 'T' ? T : p.type
            }))
        }));
        return inst;
    }
}

export const ListClassInstance: ListClass = new ListClass();
