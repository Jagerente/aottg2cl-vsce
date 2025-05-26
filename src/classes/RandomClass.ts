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
                { name: "seed", type: {name: 'int', typeArguments: []}, description: "Seed value to initialize the random generator" }
            ]
        }
    ];

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'RandomInt',
            returnType: {name: 'int', typeArguments: []},
            description: 'Returns random integer between min and max (exclusive).',
            parameters: [
                { name: 'min', type: {name: 'int', typeArguments: []}, description: 'Minimum value.' },
                { name: 'max', type: {name: 'int', typeArguments: []}, description: 'Maximum value (exclusive).' }
            ]
        },
        {
            parent: this,
            label: 'RandomFloat',
            returnType: {name: 'float', typeArguments: []},
            description: 'Returns random float between min and max.',
            parameters: [
                { name: 'min', type: {name: 'float', typeArguments: []}, description: 'Minimum value.' },
                { name: 'max', type: {name: 'float', typeArguments: []}, description: 'Maximum value.' }
            ]
        },
        {
            parent: this,
            label: 'RandomBool',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Returns random boolean.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomDirection',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns random normalized Vector3.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomSign',
            returnType: {name: 'int', typeArguments: []},
            description: 'Returns either -1 or 1.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomVector3',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns a random Vector3 between min and max.',
            parameters: [
                { name: 'min', type: { name: 'Vector3', typeArguments: [] }, description: 'Minimum Vector3 value.' },
                { name: 'max', type: { name: 'Vector3', typeArguments: [] }, description: 'Maximum Vector3 value.' }
            ]
        },
        {
            parent: this,
            label: 'PerlinNoise',
            returnType: {name: 'float', typeArguments: []},
            description: 'Returns a point sampled from generated 2D Perlin noise.',
            parameters: [
                { name: 'x', type: {name: 'float', typeArguments: []}, description: 'The x coordinate.' },
                { name: 'y', type: {name: 'float', typeArguments: []}, description: 'The y coordinate.' }
            ]
        }
    ];
    
    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'RandomInt',
            returnType: {name: 'int', typeArguments: []},
            description: 'Returns random integer between min and max (exclusive).',
            parameters: [
                { name: 'min', type: {name: 'int', typeArguments: []}, description: 'Minimum value.' },
                { name: 'max', type: {name: 'int', typeArguments: []}, description: 'Maximum value (exclusive).' }
            ]
        },
        {
            parent: this,
            label: 'RandomFloat',
            returnType: {name: 'float', typeArguments: []},
            description: 'Returns random float between min and max.',
            parameters: [
                { name: 'min', type: {name: 'float', typeArguments: []}, description: 'Minimum value.' },
                { name: 'max', type: {name: 'float', typeArguments: []}, description: 'Maximum value.' }
            ]
        },
        {
            parent: this,
            label: 'RandomBool',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Returns random boolean.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomDirection',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns random normalized Vector3.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomSign',
            returnType: {name: 'int', typeArguments: []},
            description: 'Returns either -1 or 1.',
            parameters: []
        },
        {
            parent: this,
            label: 'RandomVector3',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns a random Vector3 between min and max.',
            parameters: [
                { name: 'min', type: { name: 'Vector3', typeArguments: [] }, description: 'Minimum Vector3 value.' },
                { name: 'max', type: { name: 'Vector3', typeArguments: [] }, description: 'Maximum Vector3 value.' }
            ]
        },
        {
            parent: this,
            label: 'PerlinNoise',
            returnType: {name: 'float', typeArguments: []},
            description: 'Returns a point sampled from generated 2D Perlin noise.',
            parameters: [
                { name: 'x', type: {name: 'float', typeArguments: []}, description: 'The x coordinate.' },
                { name: 'y', type: {name: 'float', typeArguments: []}, description: 'The y coordinate.' }
            ]
        }
    ];
}

export const RandomClassInstance: RandomClass = new RandomClass();
