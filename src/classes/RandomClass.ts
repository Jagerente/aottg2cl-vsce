import { ClassKinds, IClass, IConstructor, IField, IMethod } from './IClass';

export class RandomClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Random';
    public description = 'Randomization functions.';

    public constructors: IConstructor[] = [
        {
            parent: this,
            description: "Create an instance of Random with a seed value",
            parameters: [
                { name: "seed", type: "int", description: "Seed value to initialize the random generator" }
            ]
        }
    ];

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'RandomInt',
            returnType: 'int',
            description: 'Returns random integer between min and max (exclusive).',
            parameters: [
                { name: 'min', type: 'int', description: 'Minimum value.' },
                { name: 'max', type: 'int', description: 'Maximum value (exclusive).' }
            ]
        },
        {
            parent: this,
            label: 'RandomFloat',
            returnType: 'float',
            description: 'Returns random float between min and max.',
            parameters: [
                { name: 'min', type: 'float', description: 'Minimum value.' },
                { name: 'max', type: 'float', description: 'Maximum value.' }
            ]
        },
        {
            parent: this,
            label: 'RandomBool',
            returnType: 'bool',
            description: 'Returns random boolean.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomDirection',
            returnType: 'Vector3',
            description: 'Returns random normalized Vector3.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomSign',
            returnType: 'int',
            description: 'Returns either -1 or 1.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomVector3',
            returnType: 'Vector3',
            description: 'Returns a random Vector3 between min and max.',
            parameters: [
                { name: 'min', type: 'Vector3', description: 'Minimum Vector3 value.' },
                { name: 'max', type: 'Vector3', description: 'Maximum Vector3 value.' }
            ]
        },
        {
            parent: this,
            label: 'PerlinNoise',
            returnType: 'float',
            description: 'Returns a point sampled from generated 2D Perlin noise.',
            parameters: [
                { name: 'x', type: 'float', description: 'The x coordinate.' },
                { name: 'y', type: 'float', description: 'The y coordinate.' }
            ]
        }
    ];
    
    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'RandomInt',
            returnType: 'int',
            description: 'Returns random integer between min and max (exclusive).',
            parameters: [
                { name: 'min', type: 'int', description: 'Minimum value.' },
                { name: 'max', type: 'int', description: 'Maximum value (exclusive).' }
            ]
        },
        {
            parent: this,
            label: 'RandomFloat',
            returnType: 'float',
            description: 'Returns random float between min and max.',
            parameters: [
                { name: 'min', type: 'float', description: 'Minimum value.' },
                { name: 'max', type: 'float', description: 'Maximum value.' }
            ]
        },
        {
            parent: this,
            label: 'RandomBool',
            returnType: 'bool',
            description: 'Returns random boolean.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomDirection',
            returnType: 'Vector3',
            description: 'Returns random normalized Vector3.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomSign',
            returnType: 'int',
            description: 'Returns either -1 or 1.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomVector3',
            returnType: 'Vector3',
            description: 'Returns a random Vector3 between min and max.',
            parameters: [
                { name: 'min', type: 'Vector3', description: 'Minimum Vector3 value.' },
                { name: 'max', type: 'Vector3', description: 'Maximum Vector3 value.' }
            ]
        },
        {
            parent: this,
            label: 'PerlinNoise',
            returnType: 'float',
            description: 'Returns a point sampled from generated 2D Perlin noise.',
            parameters: [
                { name: 'x', type: 'float', description: 'The x coordinate.' },
                { name: 'y', type: 'float', description: 'The y coordinate.' }
            ]
        }
    ];
}

export const RandomClassInstance: RandomClass = new RandomClass();
