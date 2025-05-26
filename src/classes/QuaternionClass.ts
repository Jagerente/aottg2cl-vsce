import { ClassKinds, IClass, IConstructor, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class QuaternionClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Quaternion';
    public description = 'Quaternion is a struct representing a rotation in 3D space using four floats (X, Y, Z, W).';

    public extends?: IClass[] = [ObjectClassInstance];

    public constructors: IConstructor[] = [
        {
            parent: this,
            description: "Initialize a Quaternion with four float values for X, Y, Z, and W",
            parameters: [
                { name: "x", type: {name: 'float', typeArguments: []}, description: "X-component of the quaternion" },
                { name: "y", type: {name: 'float', typeArguments: []}, description: "Y-component of the quaternion" },
                { name: "z", type: {name: 'float', typeArguments: []}, description: "Z-component of the quaternion" },
                { name: "w", type: {name: 'float', typeArguments: []}, description: "W-component of the quaternion" }
            ]
        }
    ];

    public instanceFields: IField[] = [
        { parent: this, label: 'X', type: {name: 'float', typeArguments: []}, description: 'X value of the quaternion.' },
        { parent: this, label: 'Y', type: {name: 'float', typeArguments: []}, description: 'Y value of the quaternion.' },
        { parent: this, label: 'Z', type: {name: 'float', typeArguments: []}, description: 'Z value of the quaternion.' },
        { parent: this, label: 'W', type: {name: 'float', typeArguments: []}, description: 'W value of the quaternion.' },
        { parent: this, label: 'Euler', type: { name: 'Vector3', typeArguments: [] }, description: 'Returns the Euler angles of the quaternion as a Vector3.' }
    ];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [
        { parent: this, label: 'Identity', type: {name: 'Quaternion', typeArguments: []}, description: 'Returns the identity quaternion (0,0,0,0).' }
    ];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'Lerp',
            returnType: {name: 'Quaternion', typeArguments: []},
            description: 'Returns a Quaternion lerped between a and b using scale t. T must be between 0 and 1.',
            parameters: [
                { name: 'a', type: {name: 'Quaternion', typeArguments: []}, description: 'Starting quaternion.' },
                { name: 'b', type: {name: 'Quaternion', typeArguments: []}, description: 'Ending quaternion.' },
                { name: 't', type: {name: 'float', typeArguments: []}, description: 'Interpolation factor (0-1).' }
            ]
        },
        {
            parent: this,
            label: 'LerpUnclamped',
            returnType: {name: 'Quaternion', typeArguments: []},
            description: 'Returns a Quaternion lerped between a and b using scale t. T can be outside 0 and 1.',
            parameters: [
                { name: 'a', type: {name: 'Quaternion', typeArguments: []}, description: 'Starting quaternion.' },
                { name: 'b', type: {name: 'Quaternion', typeArguments: []}, description: 'Ending quaternion.' },
                { name: 't', type: {name: 'float', typeArguments: []}, description: 'Interpolation factor (can be outside 0-1).' }
            ]
        },
        {
            parent: this,
            label: 'Slerp',
            returnType: {name: 'Quaternion', typeArguments: []},
            description: 'Returns a Quaternion spherical lerped between a and b using scale t. T must be between 0 and 1.',
            parameters: [
                { name: 'a', type: {name: 'Quaternion', typeArguments: []}, description: 'Starting quaternion.' },
                { name: 'b', type: {name: 'Quaternion', typeArguments: []}, description: 'Ending quaternion.' },
                { name: 't', type: {name: 'float', typeArguments: []}, description: 'Interpolation factor (0-1).' }
            ]
        },
        {
            parent: this,
            label: 'SlerpUnclamped',
            returnType: {name: 'Quaternion', typeArguments: []},
            description: 'Returns a Quaternion spherical lerped between a and b using scale t. T can be outside 0 and 1.',
            parameters: [
                { name: 'a', type: {name: 'Quaternion', typeArguments: []}, description: 'Starting quaternion.' },
                { name: 'b', type: {name: 'Quaternion', typeArguments: []}, description: 'Ending quaternion.' },
                { name: 't', type: {name: 'float', typeArguments: []}, description: 'Interpolation factor (can be outside 0-1).' }
            ]
        },
        {
            parent: this,
            label: 'FromEuler',
            returnType: {name: 'Quaternion', typeArguments: []},
            description: 'Returns the Quaternion rotation from the given Euler angles.',
            parameters: [
                { name: 'v', type: { name: 'Vector3', typeArguments: [] }, description: 'Euler angles as a Vector3.' }
            ]
        },
        {
            parent: this,
            label: 'LookRotation',
            returnType: {name: 'Quaternion', typeArguments: []},
            description: 'Returns the Quaternion rotation with the specified forward and (optional) up Vector.',
            parameters: [
                { name: 'forward', type: { name: 'Vector3', typeArguments: [] }, description: 'Forward vector.' },
                { name: 'up', type: { name: 'Vector3', typeArguments: [] }, description: 'Forward vector.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'FromToRotation',
            returnType: {name: 'Quaternion', typeArguments: []},
            description: 'Returns the Quaternion rotation with the specified forward and (optional) up Vector.',
            parameters: [
                { name: 'from', type: { name: 'Vector3', typeArguments: [] }, description: 'From vector.' },
                { name: 'to', type: { name: 'Vector3', typeArguments: [] }, description: 'To vector.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'Inverse',
            returnType: {name: 'Quaternion', typeArguments: []},
            description: 'Returns the inverse of the given Quaternion.',
            parameters: [
                { name: 'a', type: {name: 'Quaternion', typeArguments: []}, description: 'Quaternion to inverse.' }
            ]
        },
        {
            parent: this,
            label: 'RotateTowards',
            returnType: {name: 'Quaternion', typeArguments: []},
            description: 'Returns the inverse of the given Quaternion.',
            parameters: [
                { name: 'from', type: {name: 'Quaternion', typeArguments: []}, description: 'From Quaternion.' },
                { name: 'to', type: {name: 'Quaternion', typeArguments: []}, description: 'To Quaternion.' },
                { name: 'maxDegrees', type: {name: 'float', typeArguments: []}, description: 'Maximum degrees.' }
            ]
        }
    ];
}

export const QuaternionClassInstance: QuaternionClass = new QuaternionClass();
