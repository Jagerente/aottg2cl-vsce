import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class ObjectClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Object';
    public description = 'Base class for all objects in custom logic.';

    public instanceFields: IField[] = [
        {
            label: 'Type',
            type: 'string',
            description: 'The type of the object (such as "Human").',
        },
        {
            label: 'IsCharacter',
            type: 'bool',
            description: 'Whether or not the object is a Character type or any of its inheritors.',
        },
    ];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const ObjectClassInstance: ObjectClass = new ObjectClass();
