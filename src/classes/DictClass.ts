import {BaseInstantiatableClass} from './BaseInstantiatableClass';
import {ClassKinds, IClass, IField, IMethod, TypeReference} from './IClass';
import {ObjectClassInstance} from './ObjectClass';

export class DictClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Dict';
    public description = 'Dict (dictionary) allows you to add and reference objects by key and value.';
    public typeParameters = ['K', 'V'];

    public extends?: IClass[] = [ObjectClassInstance, new BaseInstantiatableClass()];


    public instanceFields: IField[] = [
        {
            parent: this,
            label: 'Keys',
            type: {name: 'List', typeArguments: [{name: 'K', typeArguments: []}]},
            description: 'List of keys in the dictionary.'
        },
        {
            parent: this,
            label: 'Values',
            type: {name: 'List', typeArguments: [{name: 'V', typeArguments: []}]},
            description: 'List of values in the dictionary.'
        },
        {
            parent: this,
            label: 'Count',
            type: {name: 'int', typeArguments: []},
            description: 'Number of entries in the dictionary.'
        }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'Clear',
            returnType: {name: 'void', typeArguments: []},
            description: 'Clears the dictionary.',
            parameters: []
        },
        {
            parent: this,
            label: 'Get',
            returnType: {name: 'V', typeArguments: []},
            description: 'Returns the value at given key. If the optional parameter default is provided, will return default if no key is found.',
            parameters: [
                {name: 'key', type: {name: 'K', typeArguments: []}, description: 'Key to retrieve the value for.'},
                {
                    name: 'default',
                    type: {name: 'V', typeArguments: []},
                    description: 'Optional default value if key is not found.',
                    isOptional: true
                }
            ]
        },
        {
            parent: this,
            label: 'Set',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the value at the given key.',
            parameters: [
                {name: 'key', type: {name: 'K', typeArguments: []}, description: 'Key to set the value for.'},
                {name: 'value', type: {name: 'V', typeArguments: []}, description: 'Value to set at the given key.'}
            ]
        },
        {
            parent: this,
            label: 'Remove',
            returnType: {name: 'void', typeArguments: []},
            description: 'Removes the entry at the given key.',
            parameters: [
                {name: 'key', type: {name: 'K', typeArguments: []}, description: 'Key to remove the value for.'}
            ]
        },
        {
            parent: this,
            label: 'Contains',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Checks if the dictionary contains the given key.',
            parameters: [
                {name: 'key', type: {name: 'K', typeArguments: []}, description: 'Key to check for.'}
            ]
        }
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];

    public instantiate(typeArgs: TypeReference[]): IClass {
        const [K, V] = typeArgs;
        const inst = new DictClass();
        inst.name = `Dict<${K.name},${V.name}>`;

        const subs = {K, V};
        inst.instanceFields = this.instanceFields.map(f => ({
            ...f,
            parent: inst,
            type: this.substituteType(f.type, subs),
        }));

        inst.instanceMethods = this.instanceMethods.map(m => ({
            ...m,
            parent: inst,
            returnType: this.substituteType(m.returnType, subs),
            parameters: m.parameters.map(p => ({
                ...p,
                type: this.substituteType(p.type, subs),
            })),
        }));

        return inst;
    }


    private substituteType(
        typeRef: TypeReference,
        subs: { K: TypeReference; V: TypeReference }
    ): TypeReference {
        if (typeRef.name === 'K') {
            return subs.K;
        }
        if (typeRef.name === 'V') {
            return subs.V;
        }

        return {
            ...typeRef,
            typeArguments: typeRef.typeArguments.map(arg => this.substituteType(arg, subs))
        };
    }
}

export const DictClassInstance: DictClass = new DictClass();
