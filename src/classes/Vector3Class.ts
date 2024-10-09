import { ClassKinds, IClass, IConstructor, IField, IMethod } from './IClass';

export class Vector3Class implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Vector3';
    public description = 'Vector3 is a struct representing a vector in 3D space.';

    public constructors: IConstructor[] = [
        {
            description: "Create an empty 0,0,0 vector",
            parameters: []
        },
        {
            description: "Create a vector with specified x, y, z values",
            parameters: [
                { name: "x", type: "float", description: "X-coordinate" },
                { name: "y", type: "float", description: "Y-coordinate" },
                { name: "z", type: "float", description: "Z-coordinate" }
            ]
        },
        {
            description: "Create a vector with the same x, y, z value",
            parameters: [
                { name: "value", type: "float", description: "The value for x, y, and z coordinates" }
            ]
        },
        {
            description: "Create a vector with x and y values, z set to 0",
            parameters: [
                { name: "x", type: "float", description: "X-coordinate" },
                { name: "y", type: "float", description: "Y-coordinate" }
            ]
        }
    ];

    public instanceFields: IField[] = [
        { label: 'X', type: 'float', description: 'X axis of the vector.' },
        { label: 'Y', type: 'float', description: 'Y axis of the vector.' },
        { label: 'Z', type: 'float', description: 'Z axis of the vector.' },
        { label: 'Normalized', type: 'Vector3', description: 'Normalized version of the vector.' },
        { label: 'Magnitude', type: 'float', description: 'Returns the magnitude of the vector.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'Scale',
            returnType: 'Vector3',
            description: 'Returns the Vector3 multiplied by the scale value.',
            parameters: [
                { name: 'scale', type: 'float', description: 'The scale factor.' }
            ]
        }
    ];

    public staticFields: IField[] = [
        { label: 'Up', type: 'Vector3', description: 'Represents the upward direction.' },
        { label: 'Down', type: 'Vector3', description: 'Represents the downward direction.' },
        { label: 'Left', type: 'Vector3', description: 'Represents the left direction.' },
        { label: 'Right', type: 'Vector3', description: 'Represents the right direction.' },
        { label: 'Forward', type: 'Vector3', description: 'Represents the forward direction.' },
        { label: 'Back', type: 'Vector3', description: 'Represents the backward direction.' },
        { label: 'Zero', type: 'Vector3', description: 'Represents a vector with all components set to zero.' }
    ];

    public staticMethods: IMethod[] = [
        {
            label: 'Lerp',
            returnType: 'Vector3',
            description: 'Returns a Vector3 interpolated between a and b using t.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'Starting vector.' },
                { name: 'b', type: 'Vector3', description: 'Ending vector.' },
                { name: 't', type: 'float', description: 'Interpolation factor (0-1).' }
            ]
        },
        {
            label: 'LerpUnclamped',
            returnType: 'Vector3',
            description: 'Returns a Vector3 interpolated between a and b using t. The t factor is not clamped between 0 and 1.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'Starting vector.' },
                { name: 'b', type: 'Vector3', description: 'Ending vector.' },
                { name: 't', type: 'float', description: 'Interpolation factor (can be outside 0-1).' }
            ]
        },
        {
            label: 'Slerp',
            returnType: 'Vector3',
            description: 'Returns a Vector3 spherical interpolated between a and b using t.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'Starting vector.' },
                { name: 'b', type: 'Vector3', description: 'Ending vector.' },
                { name: 't', type: 'float', description: 'Interpolation factor (0-1).' }
            ]
        },
        {
            label: 'SlerpUnclamped',
            returnType: 'Vector3',
            description: 'Returns a Vector3 spherical interpolated between a and b using t. The t factor is not clamped between 0 and 1.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'Starting vector.' },
                { name: 'b', type: 'Vector3', description: 'Ending vector.' },
                { name: 't', type: 'float', description: 'Interpolation factor (can be outside 0-1).' }
            ]
        },
        {
            label: 'GetRotationDirection',
            returnType: 'Vector3',
            description: 'Gets the relational Vector3 b using a as a reference.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'Reference vector.' },
                { name: 'b', type: 'Vector3', description: 'Target vector.' }
            ]
        },
        {
            label: 'Distance',
            returnType: 'float',
            description: 'Returns the distance between two Vector3s.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'First vector.' },
                { name: 'b', type: 'Vector3', description: 'Second vector.' }
            ]
        },
        {
            label: 'Project',
            returnType: 'Vector3',
            description: 'Projects a onto b.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'Vector to project.' },
                { name: 'b', type: 'Vector3', description: 'Vector to project onto.' }
            ]
        },
        {
            label: 'Multiply',
            returnType: 'Vector3',
            description: 'Returns a Vector3 where each element in a is multiplied by each element of b.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'First vector.' },
                { name: 'b', type: 'Vector3', description: 'Second vector.' }
            ]
        },
        {
            label: 'Divide',
            returnType: 'Vector3',
            description: 'Returns a Vector3 where each element in a is divided by each element of b.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'First vector.' },
                { name: 'b', type: 'Vector3', description: 'Second vector.' }
            ]
        },
        {
            label: 'Angle',
            returnType: 'float',
            description: 'Returns the angle between a and b.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'First vector.' },
                { name: 'b', type: 'Vector3', description: 'Second vector.' }
            ]
        },
        {
            label: 'SignedAngle',
            returnType: 'float',
            description: 'Returns the signed angle between a and b using the given axis.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'First vector.' },
                { name: 'b', type: 'Vector3', description: 'Second vector.' },
                { name: 'axis', type: 'Vector3', description: 'Axis of rotation.' }
            ]
        },
        {
            label: 'Cross',
            returnType: 'Vector3',
            description: 'Returns the cross product of a and b.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'First vector.' },
                { name: 'b', type: 'Vector3', description: 'Second vector.' }
            ]
        },
        {
            label: 'Dot',
            returnType: 'float',
            description: 'Returns the dot product of a and b.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'First vector.' },
                { name: 'b', type: 'Vector3', description: 'Second vector.' }
            ]
        },
        {
            label: 'RotateTowards',
            returnType: 'Vector3',
            description: 'Returns the Vector3 that is rotated from a to b using maxAngle degrees and changing magnitude by at most maxMagnitude.',
            parameters: [
                { name: 'a', type: 'Vector3', description: 'Starting vector.' },
                { name: 'b', type: 'Vector3', description: 'Target vector.' },
                { name: 'maxAngle', type: 'float', description: 'Maximum angle to rotate.' },
                { name: 'maxMagnitude', type: 'float', description: 'Maximum change in magnitude.' }
            ]
        }
    ];
}

export const Vector3ClassInstance: Vector3Class = new Vector3Class();
