import { IClass, IMethod, ClassKinds, IField, IConstructor } from './IClass';

export class BaseInstantiatableClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'BaseInstantiatableClass';
    public description = 'Base instantiatable class providing default constructor.';

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    public constructors?: IConstructor[] = [
        {
            parent: this,
            parameters: [],
            description: 'Default constructor.'
        }
    ];
}
