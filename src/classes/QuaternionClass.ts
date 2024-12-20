import { ClassKinds, IClass, IConstructor, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class QuaternionClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Quaternion';
    public description = 'Quaternion is a struct representing a rotation in 3D space using four floats (X, Y, Z, W).';

    public extends?: IClass[] = [ObjectClassInstance];

    public constructors: IConstructor[] = [
        {
            description: "Initialize a Quaternion with four float values for X, Y, Z, and W",
            parameters: [
                { name: "x", type: "float", description: "X-component of the quaternion" },
                { name: "y", type: "float", description: "Y-component of the quaternion" },
                { name: "z", type: "float", description: "Z-component of the quaternion" },
                { name: "w", type: "float", description: "W-component of the quaternion" }
            ]
        }
    ];

    public instanceFields: IField[] = [
        { label: 'X', type: 'float', description: 'X value of the quaternion.' },
        { label: 'Y', type: 'float', description: 'Y value of the quaternion.' },
        { label: 'Z', type: 'float', description: 'Z value of the quaternion.' },
        { label: 'W', type: 'float', description: 'W value of the quaternion.' },
        { label: 'Euler', type: 'Vector3', description: 'Returns the Euler angles of the quaternion as a Vector3.' }
    ];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [
        { label: 'Identity', type: 'Quaternion', description: 'Returns the identity quaternion (0,0,0,0).' }
    ];

    public staticMethods: IMethod[] = [
        {
            label: 'Lerp',
            returnType: 'Quaternion',
            description: 'Returns a Quaternion lerped between a and b using scale t. T must be between 0 and 1.',
            parameters: [
                { name: 'a', type: 'Quaternion', description: 'Starting quaternion.' },
                { name: 'b', type: 'Quaternion', description: 'Ending quaternion.' },
                { name: 't', type: 'float', description: 'Interpolation factor (0-1).' }
            ]
        },
        {
            label: 'LerpUnclamped',
            returnType: 'Quaternion',
            description: 'Returns a Quaternion lerped between a and b using scale t. T can be outside 0 and 1.',
            parameters: [
                { name: 'a', type: 'Quaternion', description: 'Starting quaternion.' },
                { name: 'b', type: 'Quaternion', description: 'Ending quaternion.' },
                { name: 't', type: 'float', description: 'Interpolation factor (can be outside 0-1).' }
            ]
        },
        {
            label: 'Slerp',
            returnType: 'Quaternion',
            description: 'Returns a Quaternion spherical lerped between a and b using scale t. T must be between 0 and 1.',
            parameters: [
                { name: 'a', type: 'Quaternion', description: 'Starting quaternion.' },
                { name: 'b', type: 'Quaternion', description: 'Ending quaternion.' },
                { name: 't', type: 'float', description: 'Interpolation factor (0-1).' }
            ]
        },
        {
            label: 'SlerpUnclamped',
            returnType: 'Quaternion',
            description: 'Returns a Quaternion spherical lerped between a and b using scale t. T can be outside 0 and 1.',
            parameters: [
                { name: 'a', type: 'Quaternion', description: 'Starting quaternion.' },
                { name: 'b', type: 'Quaternion', description: 'Ending quaternion.' },
                { name: 't', type: 'float', description: 'Interpolation factor (can be outside 0-1).' }
            ]
        },
        {
            label: 'FromEuler',
            returnType: 'Quaternion',
            description: 'Returns the Quaternion rotation from the given Euler angles.',
            parameters: [
                { name: 'v', type: 'Vector3', description: 'Euler angles as a Vector3.' }
            ]
        },
        {
            label: 'LookRotation',
            returnType: 'Quaternion',
            description: 'Returns the Quaternion rotation with the specified forward and (optional) up Vector.',
            parameters: [
                { name: 'forward', type: 'Vector3', description: 'Forward vector.' },
                { name: 'up', type: 'Vector3', description: 'Forward vector.', isOptional: true }
            ]
        },
        {
            label: 'FromToRotation',
            returnType: 'Quaternion',
            description: 'Returns the Quaternion rotation with the specified forward and (optional) up Vector.',
            parameters: [
                { name: 'from', type: 'Vector3', description: 'From vector.' },
                { name: 'to', type: 'Vector3', description: 'To vector.', isOptional: true }
            ]
        },
        {
            label: 'Inverse',
            returnType: 'Quaternion',
            description: 'Returns the inverse of the given Quaternion.',
            parameters: [
                { name: 'a', type: 'Quaternion', description: 'Quaternion to inverse.' }
            ]
        },
        {
            label: 'RotateTowards',
            returnType: 'Quaternion',
            description: 'Returns the inverse of the given Quaternion.',
            parameters: [
                { name: 'from', type: 'Quaternion', description: 'From Quaternion.' },
                { name: 'to', type: 'Quaternion', description: 'To Quaternion.' },
                { name: 'maxDegrees', type: 'float', description: 'Maximum degrees.' }
            ]
        }
    ];
}

export const QuaternionClassInstance: QuaternionClass = new QuaternionClass();
