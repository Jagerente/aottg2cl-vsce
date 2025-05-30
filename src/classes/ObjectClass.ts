import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class ObjectClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Object';
    public description = 'Base class for all objects in custom logic.';

    public extends?: IClass[] = [];

    public instanceFields: IField[] = [
        {
            parent: this,
            label: 'Type',
            type: {name: 'string', typeArguments: []},
            description: 'The type of the object (such as "Human").',
        },
        {
            parent: this,
            label: 'IsCharacter',
            type: { name: 'bool', typeArguments: [] },
            description: 'Whether or not the object is a Character type or any of its inheritors.',
        },
    ];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const ObjectClassInstance: ObjectClass = new ObjectClass();
