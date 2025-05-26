import { ClassKinds, IClass, IConstructor, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class Vector3Class implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Vector3';
    public description = 'Vector3 is a struct representing a vector in 3D space.';

    public extends?: IClass[] = [ObjectClassInstance];

    public constructors: IConstructor[] = [
        {
            parent: this,
            description: "Create an empty 0,0,0 vector",
            parameters: []
        },
        {
            parent: this,
            description: "Create a vector with specified x, y, z values",
            parameters: [
                { name: "x", type: {name: 'float', typeArguments: []}, description: "X-coordinate" },
                { name: "y", type: {name: 'float', typeArguments: []}, description: "Y-coordinate" },
                { name: "z", type: {name: 'float', typeArguments: []}, description: "Z-coordinate" }
            ]
        },
        {
            parent: this,
            description: "Create a vector with the same x, y, z value",
            parameters: [
                { name: "value", type: {name: 'float', typeArguments: []}, description: "The value for x, y, and z coordinates" }
            ]
        },
        {
            parent: this,
            description: "Create a vector with x and y values, z set to 0",
            parameters: [
                { name: "x", type: {name: 'float', typeArguments: []}, description: "X-coordinate" },
                { name: "y", type: {name: 'float', typeArguments: []}, description: "Y-coordinate" }
            ]
        }
    ];

    public instanceFields: IField[] = [
        { parent: this, label: 'X', type: {name: 'float', typeArguments: []}, description: 'X axis of the vector.' },
        { parent: this, label: 'Y', type: {name: 'float', typeArguments: []}, description: 'Y axis of the vector.' },
        { parent: this, label: 'Z', type: {name: 'float', typeArguments: []}, description: 'Z axis of the vector.' },
        { parent: this, label: 'Normalized', type: { name: 'Vector3', typeArguments: [] }, description: 'Normalized version of the vector.', readonly: true },
        { parent: this, label: 'Magnitude', type: {name: 'float', typeArguments: []}, description: 'Returns the magnitude of the vector.', readonly: true }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'Scale',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns the Vector3 multiplied by the scale value.',
            parameters: [
                { name: 'scale', type: {name: 'float', typeArguments: []}, description: 'The scale factor.' }
            ]
        }
    ];

    public staticFields: IField[] = [
        { parent: this, label: 'Up', type: { name: 'Vector3', typeArguments: [] }, description: 'Represents the upward direction.', readonly: true },
        { parent: this, label: 'Down', type: { name: 'Vector3', typeArguments: [] }, description: 'Represents the downward direction.', readonly: true },
        { parent: this, label: 'Left', type: { name: 'Vector3', typeArguments: [] }, description: 'Represents the left direction.', readonly: true },
        { parent: this, label: 'Right', type: { name: 'Vector3', typeArguments: [] }, description: 'Represents the right direction.', readonly: true },
        { parent: this, label: 'Forward', type: { name: 'Vector3', typeArguments: [] }, description: 'Represents the forward direction.', readonly: true },
        { parent: this, label: 'Back', type: { name: 'Vector3', typeArguments: [] }, description: 'Represents the backward direction.', readonly: true },
        { parent: this, label: 'One', type: { name: 'Vector3', typeArguments: [] }, description: 'Represents a unit vector with all components set to 1.', readonly: true },
        { parent: this, label: 'Zero', type: { name: 'Vector3', typeArguments: [] }, description: 'Represents a vector with all components set to zero.', readonly: true }
    ];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'Lerp',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns a Vector3 interpolated between a and b using t.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'Starting vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Ending vector.' },
                { name: 't', type: {name: 'float', typeArguments: []}, description: 'Interpolation factor (0-1).' }
            ]
        },
        {
            parent: this,
            label: 'LerpUnclamped',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns a Vector3 interpolated between a and b using t. The t factor is not clamped between 0 and 1.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'Starting vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Ending vector.' },
                { name: 't', type: {name: 'float', typeArguments: []}, description: 'Interpolation factor (can be outside 0-1).' }
            ]
        },
        {
            parent: this,
            label: 'Slerp',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns a Vector3 spherical interpolated between a and b using t.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'Starting vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Ending vector.' },
                { name: 't', type: {name: 'float', typeArguments: []}, description: 'Interpolation factor (0-1).' }
            ]
        },
        {
            parent: this,
            label: 'SlerpUnclamped',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns a Vector3 spherical interpolated between a and b using t. The t factor is not clamped between 0 and 1.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'Starting vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Ending vector.' },
                { name: 't', type: {name: 'float', typeArguments: []}, description: 'Interpolation factor (can be outside 0-1).' }
            ]
        },
        {
            parent: this,
            label: 'GetRotationDirection',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the relational Vector3 b using a as a reference.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'Reference vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Target vector.' }
            ]
        },
        {
            parent: this,
            label: 'Distance',
            returnType: {name: 'float', typeArguments: []},
            description: 'Returns the distance between two Vector3s.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'First vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Second vector.' }
            ]
        },
        {
            parent: this,
            label: 'Project',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Projects a onto b.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'Vector to project.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Vector to project onto.' }
            ]
        },
        {
            parent: this,
            label: 'Multiply',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns a Vector3 where each element in a is multiplied by each element of b.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'First vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Second vector.' }
            ]
        },
        {
            parent: this,
            label: 'Divide',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns a Vector3 where each element in a is divided by each element of b.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'First vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Second vector.' }
            ]
        },
        {
            parent: this,
            label: 'Angle',
            returnType: {name: 'float', typeArguments: []},
            description: 'Returns the angle between a and b.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'First vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Second vector.' }
            ]
        },
        {
            parent: this,
            label: 'SignedAngle',
            returnType: {name: 'float', typeArguments: []},
            description: 'Returns the signed angle between a and b using the given axis.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'First vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Second vector.' },
                { name: 'axis', type: { name: 'Vector3', typeArguments: [] }, description: 'Axis of rotation.' }
            ]
        },
        {
            parent: this,
            label: 'Cross',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns the cross product of a and b.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'First vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Second vector.' }
            ]
        },
        {
            parent: this,
            label: 'Dot',
            returnType: {name: 'float', typeArguments: []},
            description: 'Returns the dot product of a and b.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'First vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Second vector.' }
            ]
        },
        {
            parent: this,
            label: 'RotateTowards',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Returns the Vector3 that is rotated from a to b using maxAngle degrees and changing magnitude by at most maxMagnitude.',
            parameters: [
                { name: 'a', type: { name: 'Vector3', typeArguments: [] }, description: 'Starting vector.' },
                { name: 'b', type: { name: 'Vector3', typeArguments: [] }, description: 'Target vector.' },
                { name: 'maxAngle', type: {name: 'float', typeArguments: []}, description: 'Maximum angle to rotate.' },
                { name: 'maxMagnitude', type: {name: 'float', typeArguments: []}, description: 'Maximum change in magnitude.' }
            ]
        }
    ];
}

export const Vector3ClassInstance: Vector3Class = new Vector3Class();
