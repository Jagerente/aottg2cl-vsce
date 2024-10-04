import { IClass, IField, IMethod } from './IClass';

export class MathClass implements IClass {
    public name = 'Math';
    public description = 'Math functions. Note that parameter types can be either int or float unless otherwise specified. Functions may return int or float depending on the parameter types given.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [
        { label: 'PI', type: 'float', description: 'Mathf.PI' },
        { label: 'Infinity', type: 'float', description: 'Mathf.Infinity' },
        { label: 'Rad2DegConstant', type: 'float', description: 'Mathf.Rad2Deg' },
        { label: 'Deg2RadConstant', type: 'float', description: 'Mathf.Deg2Rad' }
    ];

    public staticMethods: IMethod[] = [
        {
            label: 'Clamp',
            returnType: 'int/float',
            description: 'Clamps the value between min and max.',
            parameters: [
                { name: 'value', type: 'int/float', description: 'The value to clamp.' },
                { name: 'min', type: 'int/float', description: 'The minimum value.' },
                { name: 'max', type: 'int/float', description: 'The maximum value.' }
            ]
        },
        {
            label: 'Max',
            returnType: 'int/float',
            description: 'Maximum of a and b.',
            parameters: [
                { name: 'a', type: 'int/float', description: 'The first value.' },
                { name: 'b', type: 'int/float', description: 'The second value.' }
            ]
        },
        {
            label: 'Min',
            returnType: 'int/float',
            description: 'Minimum of a and b.',
            parameters: [
                { name: 'a', type: 'int/float', description: 'The first value.' },
                { name: 'b', type: 'int/float', description: 'The second value.' }
            ]
        },
        {
            label: 'Pow',
            returnType: 'float',
            description: 'a to the power of b.',
            parameters: [
                { name: 'a', type: 'float', description: 'Base value.' },
                { name: 'b', type: 'float', description: 'Exponent.' }
            ]
        },
        {
            label: 'Abs',
            returnType: 'int/float',
            description: 'Absolute value of a.',
            parameters: [
                { name: 'a', type: 'int/float', description: 'The value to get absolute.' }
            ]
        },
        {
            label: 'Sqrt',
            returnType: 'float',
            description: 'Square root of a.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value to get square root.' }
            ]
        },
        {
            label: 'Mod',
            returnType: 'int',
            description: 'Modulo of a % b.',
            parameters: [
                { name: 'a', type: 'int', description: 'Dividend.' },
                { name: 'b', type: 'int', description: 'Divisor.' }
            ]
        },
        {
            label: 'Ceil',
            returnType: 'int',
            description: 'Rounds to higher int.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value to round.' }
            ]
        },
        {
            label: 'Floor',
            returnType: 'int',
            description: 'Rounds to lower int.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value to round.' }
            ]
        },
        {
            label: 'Round',
            returnType: 'int',
            description: 'Rounds to nearest int.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value to round.' }
            ]
        },
        {
            label: 'Sin',
            returnType: 'float',
            description: 'Sin of a, in degrees.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value in degrees.' }
            ]
        },
        {
            label: 'Cos',
            returnType: 'float',
            description: 'Cosine of a.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value in degrees.' }
            ]
        },
        {
            label: 'Tan',
            returnType: 'float',
            description: 'Tan of a.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value in degrees.' }
            ]
        },
        {
            label: 'Asin',
            returnType: 'float',
            description: 'Arcsin of a, in degrees.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value in degrees.' }
            ]
        },
        {
            label: 'Acos',
            returnType: 'float',
            description: 'Arccos of a.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value in degrees.' }
            ]
        },
        {
            label: 'Atan',
            returnType: 'float',
            description: 'Arctan of a.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value in degrees.' }
            ]
        },
        {
            label: 'Deg2Rad',
            returnType: 'float',
            description: 'Converts a degrees to radians.',
            parameters: [
                { name: 'a', type: 'float', description: 'Degrees to convert.' }
            ]
        },
        {
            label: 'Rad2Deg',
            returnType: 'float',
            description: 'Converts a radians to degrees.',
            parameters: [
                { name: 'a', type: 'float', description: 'Radians to convert.' }
            ]
        },
        {
            label: 'Lerp',
            returnType: 'float',
            description: 'Linearly interpolates between a and b by t where t is limited from 0 to 1.',
            parameters: [
                { name: 'a', type: 'float', description: 'Start value.' },
                { name: 'b', type: 'float', description: 'End value.' },
                { name: 't', type: 'float', description: 'Interpolation factor.' }
            ]
        },
        {
            label: 'LerpUnclamped',
            returnType: 'float',
            description: 'Linearly interpolates between a and b by t with no limit to t.',
            parameters: [
                { name: 'a', type: 'float', description: 'Start value.' },
                { name: 'b', type: 'float', description: 'End value.' },
                { name: 't', type: 'float', description: 'Interpolation factor.' }
            ]
        },
        {
            label: 'Sign',
            returnType: 'float',
            description: 'Returns a value of 1 when a is 0 or greater. Returns a value of -1 when a is negative.',
            parameters: [
                { name: 'a', type: 'float', description: 'The value to get sign.' }
            ]
        }
    ];
}
