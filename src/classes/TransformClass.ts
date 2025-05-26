import { ClassKinds, IClass, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class TransformClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Transform';
    public description = 'Represents an internal Unity transform on the MapObject\'s GameObject.';

    public extends?: IClass[] = [ObjectClassInstance];

    public instanceFields: IField[] = [
        { parent: this, label: 'Position', type: 'Vector3', description: 'Position of the transform.' },
        { parent: this, label: 'LocalPosition', type: 'Vector3', description: 'Local rotation of the transform. Same as Position if there is no parent.' },
        { parent: this, label: 'Rotation', type: 'Vector3', description: 'Rotation of the transform.' },
        { parent: this, label: 'LocalRotation', type: 'Vector3', description: 'Local rotation of the transform. Same as Rotation if there is no parent.' },
        { parent: this, label: 'Scale', type: 'Vector3', description: 'Scale of the transform.' },
        { parent: this, label: 'Forward', type: 'Vector3', description: 'Forward vector of the transform.' },
        { parent: this, label: 'Up', type: 'Vector3', description: 'Up vector of the transform.' },
        { parent: this, label: 'Right', type: 'Vector3', description: 'Right vector of the transform.' },
        { parent: this, label: 'QuaternionRotation', type: 'Quaternion', description: 'Quaternion rotation of the transform.' },
        { parent: this, label: 'QuaternionLocalRotation', type: 'Quaternion', description: 'Local quaternion rotation of the transform.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'GetTransform',
            returnType: 'Transform',
            description: 'Gets the child transform with the given name.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the transform to get.' }
            ]
        },
        {
            parent: this,
            label: 'GetTransforms',
            returnType: 'List(Transform)',
            description: 'Returns a list of direct child transforms.',
            parameters: []
        },
        {
            parent: this,
            label: 'PlayAnimation',
            returnType: 'null',
            description: 'Plays the animation by name. If fade is provided, it will fade the animation by this timestep.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the animation to play.' },
                { name: 'fade', type: 'float', description: 'Optional fade time.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'GetAnimationLength',
            returnType: 'float',
            description: 'Gets the length of the specified animation.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the animation.' }
            ]
        },
        {
            parent: this,
            label: 'PlaySound',
            returnType: 'null',
            description: 'Plays the sound attached to this transform.',
            parameters: []
        },
        {
            parent: this,
            label: 'StopSound',
            returnType: 'null',
            description: 'Stops the sound attached to this transform.',
            parameters: []
        },
        {
            parent: this,
            label: 'ToggleParticle',
            returnType: 'null',
            description: 'Enables or disables the particle system attached to this transform.',
            parameters: [
                { name: 'toggle', type: 'bool', description: 'Enable or disable the particle system.' }
            ]
        },
        {
            parent: this,
            label: 'Rotate',
            returnType: 'null',
            description: 'Applies a rotation to the transform using the provided Euler angles.',
            parameters: [
                { name: 'eulers', type: 'Vector3', description: 'The Euler angles to rotate the transform by.' }
            ]
        },
        {
            parent: this,
            label: 'InverseTransformPoint',
            returnType: 'Vector3',
            description: 'Transforms a position from world space to local space.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The position to transform.' }
            ]
        },
        {
            parent: this,
            label: 'InverseTransformDirection',
            returnType: 'Vector3',
            description: 'Transforms a direction from world space to local space.',
            parameters: [
                { name: 'direction', type: 'Vector3', description: 'The direction to transform.' }
            ]
        },
        {
            parent: this,
            label: 'TransformPoint',
            returnType: 'Vector3',
            description: 'Transforms a position from local space to world space.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The position to transform.' }
            ]
        },
        {
            parent: this,
            label: 'TransformDirection',
            returnType: 'Vector3',
            description: 'Transforms a direction from local space to world space.',
            parameters: [
                { name: 'direction', type: 'Vector3', description: 'The direction to transform.' }
            ]
        },
        {
            parent: this,
            label: 'RotateAround',
            returnType: 'null',
            description: 'Rotates the transform around a point, given axis and angle.',
            parameters: [
                { name: 'point', type: 'Vector3', description: 'The point around which to rotate.' },
                { name: 'axis', type: 'Vector3', description: 'The axis to rotate around.' },
                { name: 'angle', type: 'float', description: 'The angle in degrees to rotate.' }
            ]
        },
        {
            parent: this,
            label: 'LookAt',
            returnType: 'null',
            description: 'Rotates the transform such that it is facing the specified point.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The position to look at.' }
            ]
        },
        {
            parent: this,
            label: 'SetRenderersEnabled',
            returnType: 'null',
            description: 'Toggles the renderers attached to the transform and its children.',
            parameters: [
                { name: 'enabled', type: 'bool', description: 'True to enable, false to disable renderers.' }
            ]
        }
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const TransformClassInstance: TransformClass = new TransformClass();
