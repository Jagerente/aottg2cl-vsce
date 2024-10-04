import { IClass, IField, IMethod } from './IClass';

export class RandomClass implements IClass {
    public name = 'Random';
    public description = 'Randomization functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            label: 'RandomInt',
            returnType: 'int',
            description: 'Returns random integer between min and max (exclusive).',
            parameters: [
                { name: 'min', type: 'int', description: 'Minimum value.' },
                { name: 'max', type: 'int', description: 'Maximum value (exclusive).' }
            ]
        },
        {
            label: 'RandomFloat',
            returnType: 'float',
            description: 'Returns random float between min and max.',
            parameters: [
                { name: 'min', type: 'float', description: 'Minimum value.' },
                { name: 'max', type: 'float', description: 'Maximum value.' }
            ]
        },
        {
            label: 'RandomBool',
            returnType: 'bool',
            description: 'Returns random boolean.',
            parameters: []
        },
        {
            label: 'RandomDirection',
            returnType: 'Vector3',
            description: 'Returns random normalized Vector3.',
            parameters: []
        },
        {
            label: 'RandomSign',
            returnType: 'int',
            description: 'Returns either -1 or 1.',
            parameters: []
        },
        {
            label: 'RandomVector3',
            returnType: 'Vector3',
            description: 'Returns a random Vector3 between min and max.',
            parameters: [
                { name: 'min', type: 'Vector3', description: 'Minimum Vector3 value.' },
                { name: 'max', type: 'Vector3', description: 'Maximum Vector3 value.' }
            ]
        },
        {
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
