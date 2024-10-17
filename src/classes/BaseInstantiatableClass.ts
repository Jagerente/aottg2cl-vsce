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
            parameters: [],
            description: 'Default constructor.'
        }
    ];

    constructor(initReturnType: string) {
        this.instanceMethods = [
            {
                label: 'Init',
                returnType: initReturnType,
                description: 'Called upon class creation.',
                parameters: []
            },
        ];
    }
}
