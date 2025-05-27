import { ClassKinds, IClass, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class TransformClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Transform';
    public description = 'Represents an internal Unity transform on the MapObject\'s GameObject.';

    public extends?: IClass[] = [ObjectClassInstance];

    public instanceFields: IField[] = [
        { parent: this, label: 'Position', type: { name: 'Vector3', typeArguments: [] }, description: 'Position of the transform.' },
        { parent: this, label: 'LocalPosition', type: { name: 'Vector3', typeArguments: [] }, description: 'Local rotation of the transform. Same as Position if there is no parent.' },
        { parent: this, label: 'Rotation', type: { name: 'Vector3', typeArguments: [] }, description: 'Rotation of the transform.' },
        { parent: this, label: 'LocalRotation', type: { name: 'Vector3', typeArguments: [] }, description: 'Local rotation of the transform. Same as Rotation if there is no parent.' },
        { parent: this, label: 'Scale', type: { name: 'Vector3', typeArguments: [] }, description: 'Scale of the transform.' },
        { parent: this, label: 'Forward', type: { name: 'Vector3', typeArguments: [] }, description: 'Forward vector of the transform.' },
        { parent: this, label: 'Up', type: { name: 'Vector3', typeArguments: [] }, description: 'Up vector of the transform.' },
        { parent: this, label: 'Right', type: { name: 'Vector3', typeArguments: [] }, description: 'Right vector of the transform.' },
        { parent: this, label: 'QuaternionRotation', type: {name: 'Quaternion', typeArguments: []}, description: 'Quaternion rotation of the transform.' },
        { parent: this, label: 'QuaternionLocalRotation', type: {name: 'Quaternion', typeArguments: []}, description: 'Local quaternion rotation of the transform.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'GetTransform',
            returnType: {name: 'Transform', typeArguments: []},
            description: 'Gets the child transform with the given name.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the transform to get.' }
            ]
        },
        {
            parent: this,
            label: 'GetTransforms',
            returnType: {name: 'List', typeArguments: [{name: 'Transform', typeArguments: []}]},
            description: 'Returns a list of direct child transforms.',
            parameters: []
        },
        {
            parent: this,
            label: 'PlayAnimation',
            returnType: {name: 'void', typeArguments: []},
            description: 'Plays the animation by name. If fade is provided, it will fade the animation by this timestep.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the animation to play.' },
                { name: 'fade', type: {name: 'float', typeArguments: []}, description: 'Optional fade time.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'GetAnimationLength',
            returnType: {name: 'float', typeArguments: []},
            description: 'Gets the length of the specified animation.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the animation.' }
            ]
        },
        {
            parent: this,
            label: 'PlaySound',
            returnType: {name: 'void', typeArguments: []},
            description: 'Plays the sound attached to this transform.',
            parameters: []
        },
        {
            parent: this,
            label: 'StopSound',
            returnType: {name: 'void', typeArguments: []},
            description: 'Stops the sound attached to this transform.',
            parameters: []
        },
        {
            parent: this,
            label: 'ToggleParticle',
            returnType: {name: 'void', typeArguments: []},
            description: 'Enables or disables the particle system attached to this transform.',
            parameters: [
                { name: 'toggle', type: { name: 'bool', typeArguments: [] }, description: 'Enable or disable the particle system.' }
            ]
        },
        {
            parent: this,
            label: 'Rotate',
            returnType: {name: 'void', typeArguments: []},
            description: 'Applies a rotation to the transform using the provided Euler angles.',
            parameters: [
                { name: 'eulers', type: { name: 'Vector3', typeArguments: [] }, description: 'The Euler angles to rotate the transform by.' }
            ]
        },
        {
            parent: this,
            label: 'InverseTransformPoint',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Transforms a position from world space to local space.',
            parameters: [
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to transform.' }
            ]
        },
        {
            parent: this,
            label: 'InverseTransformDirection',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Transforms a direction from world space to local space.',
            parameters: [
                { name: 'direction', type: { name: 'Vector3', typeArguments: [] }, description: 'The direction to transform.' }
            ]
        },
        {
            parent: this,
            label: 'TransformPoint',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Transforms a position from local space to world space.',
            parameters: [
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to transform.' }
            ]
        },
        {
            parent: this,
            label: 'TransformDirection',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Transforms a direction from local space to world space.',
            parameters: [
                { name: 'direction', type: { name: 'Vector3', typeArguments: [] }, description: 'The direction to transform.' }
            ]
        },
        {
            parent: this,
            label: 'RotateAround',
            returnType: {name: 'void', typeArguments: []},
            description: 'Rotates the transform around a point, given axis and angle.',
            parameters: [
                { name: 'point', type: { name: 'Vector3', typeArguments: [] }, description: 'The point around which to rotate.' },
                { name: 'axis', type: { name: 'Vector3', typeArguments: [] }, description: 'The axis to rotate around.' },
                { name: 'angle', type: {name: 'float', typeArguments: []}, description: 'The angle in degrees to rotate.' }
            ]
        },
        {
            parent: this,
            label: 'LookAt',
            returnType: {name: 'void', typeArguments: []},
            description: 'Rotates the transform such that it is facing the specified point.',
            parameters: [
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to look at.' }
            ]
        },
        {
            parent: this,
            label: 'SetRenderersEnabled',
            returnType: {name: 'void', typeArguments: []},
            description: 'Toggles the renderers attached to the transform and its children.',
            parameters: [
                { name: 'enabled', type: { name: 'bool', typeArguments: [] }, description: 'True to enable, false to disable renderers.' }
            ]
        }
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const TransformClassInstance: TransformClass = new TransformClass();
