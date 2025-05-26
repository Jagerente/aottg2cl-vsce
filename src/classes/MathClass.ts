import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class MathClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Math';
    public description = 'Math functions. Note that parameter types can be either int or float unless otherwise specified. Functions may return int or float depending on the parameter types given.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [
        { parent: this, label: 'PI', type: {name: 'float', typeArguments: []}, description: 'Mathf.PI' },
        { parent: this, label: 'Infinity', type: {name: 'float', typeArguments: []}, description: 'Mathf.Infinity' },
        { parent: this, label: 'Rad2DegConstant', type: {name: 'float', typeArguments: []}, description: 'Mathf.Rad2Deg' },
        { parent: this, label: 'Deg2RadConstant', type: {name: 'float', typeArguments: []}, description: 'Mathf.Deg2Rad' }
    ];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'Clamp',
            returnType: {name: 'int | float', typeArguments: []},
            description: 'Clamps the value between min and max.',
            parameters: [
                { name: 'value', type: {name: 'int | float', typeArguments: []}, description: 'The value to clamp.' },
                { name: 'min', type: {name: 'int | float', typeArguments: []}, description: 'The minimum value.' },
                { name: 'max', type: {name: 'int | float', typeArguments: []}, description: 'The maximum value.' }
            ]
        },
        {
            parent: this,
            label: 'Max',
            returnType: {name: 'int | float', typeArguments: []},
            description: 'Maximum of a and b.',
            parameters: [
                { name: 'a', type: {name: 'int | float', typeArguments: []}, description: 'The first value.' },
                { name: 'b', type: {name: 'int | float', typeArguments: []}, description: 'The second value.' }
            ]
        },
        {
            parent: this,
            label: 'Min',
            returnType: {name: 'int | float', typeArguments: []},
            description: 'Minimum of a and b.',
            parameters: [
                { name: 'a', type: {name: 'int | float', typeArguments: []}, description: 'The first value.' },
                { name: 'b', type: {name: 'int | float', typeArguments: []}, description: 'The second value.' }
            ]
        },
        {
            parent: this,
            label: 'Pow',
            returnType: {name: 'float', typeArguments: []},
            description: 'a to the power of b.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'Base value.' },
                { name: 'b', type: {name: 'float', typeArguments: []}, description: 'Exponent.' }
            ]
        },
        {
            parent: this,
            label: 'Abs',
            returnType: {name: 'int | float', typeArguments: []},
            description: 'Absolute value of a.',
            parameters: [
                { name: 'a', type: {name: 'int | float', typeArguments: []}, description: 'The value to get absolute.' }
            ]
        },
        {
            parent: this,
            label: 'Sqrt',
            returnType: {name: 'float', typeArguments: []},
            description: 'Square root of a.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value to get square root.' }
            ]
        },
        {
            parent: this,
            label: 'Mod',
            returnType: {name: 'int', typeArguments: []},
            description: 'Modulo of a % b.',
            parameters: [
                { name: 'a', type: {name: 'int', typeArguments: []}, description: 'Dividend.' },
                { name: 'b', type: {name: 'int', typeArguments: []}, description: 'Divisor.' }
            ]
        },
        {
            parent: this,
            label: 'Ceil',
            returnType: {name: 'int', typeArguments: []},
            description: 'Rounds to higher int.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value to round.' }
            ]
        },
        {
            parent: this,
            label: 'Floor',
            returnType: {name: 'int', typeArguments: []},
            description: 'Rounds to lower int.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value to round.' }
            ]
        },
        {
            parent: this,
            label: 'Round',
            returnType: {name: 'int', typeArguments: []},
            description: 'Rounds to nearest int.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value to round.' }
            ]
        },
        {
            parent: this,
            label: 'Sin',
            returnType: {name: 'float', typeArguments: []},
            description: 'Sin of a, in degrees.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value in degrees.' }
            ]
        },
        {
            parent: this,
            label: 'Cos',
            returnType: {name: 'float', typeArguments: []},
            description: 'Cosine of a.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value in degrees.' }
            ]
        },
        {
            parent: this,
            label: 'Tan',
            returnType: {name: 'float', typeArguments: []},
            description: 'Tan of a.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value in degrees.' }
            ]
        },
        {
            parent: this,
            label: 'Asin',
            returnType: {name: 'float', typeArguments: []},
            description: 'Arcsin of a, in degrees.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value in degrees.' }
            ]
        },
        {
            parent: this,
            label: 'Acos',
            returnType: {name: 'float', typeArguments: []},
            description: 'Arccos of a.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value in degrees.' }
            ]
        },
        {
            parent: this,
            label: 'Atan',
            returnType: {name: 'float', typeArguments: []},
            description: 'Arctan of a.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value in degrees.' }
            ]
        },
        {
            parent: this,
            label: 'Deg2Rad',
            returnType: {name: 'float', typeArguments: []},
            description: 'Converts a degrees to radians.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'Degrees to convert.' }
            ]
        },
        {
            parent: this,
            label: 'Rad2Deg',
            returnType: {name: 'float', typeArguments: []},
            description: 'Converts a radians to degrees.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'Radians to convert.' }
            ]
        },
        {
            parent: this,
            label: 'Lerp',
            returnType: {name: 'float', typeArguments: []},
            description: 'Linearly interpolates between a and b by t where t is limited from 0 to 1.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'Start value.' },
                { name: 'b', type: {name: 'float', typeArguments: []}, description: 'End value.' },
                { name: 't', type: {name: 'float', typeArguments: []}, description: 'Interpolation factor.' }
            ]
        },
        {
            parent: this,
            label: 'LerpUnclamped',
            returnType: {name: 'float', typeArguments: []},
            description: 'Linearly interpolates between a and b by t with no limit to t.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'Start value.' },
                { name: 'b', type: {name: 'float', typeArguments: []}, description: 'End value.' },
                { name: 't', type: {name: 'float', typeArguments: []}, description: 'Interpolation factor.' }
            ]
        },
        {
            parent: this,
            label: 'Sign',
            returnType: {name: 'float', typeArguments: []},
            description: 'Returns a value of 1 when a is 0 or greater. Returns a value of -1 when a is negative.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The value to get sign.' }
            ]
        },
        {
            parent: this,
            label: 'Atan2',
            returnType: {name: 'float', typeArguments: []},
            description: 'Atan2 of a and b.',
            parameters: [
                { name: 'a', type: {name: 'float', typeArguments: []}, description: 'The first value.' },
                { name: 'b', type: {name: 'float', typeArguments: []}, description: 'The second value.' }
            ]
        }        
    ];
}

export const MathClassInstance: MathClass = new MathClass();
