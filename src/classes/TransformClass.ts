import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class TransformClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Transform';
    public description = 'Represents an internal Unity transform on the MapObject\'s GameObject.';

    public instanceFields: IField[] = [
        { label: 'Position', type: 'Vector3', description: 'Position of the transform.' },
        { label: 'LocalPosition', type: 'Vector3', description: 'Local rotation of the transform. Same as Position if there is no parent.' },
        { label: 'Rotation', type: 'Vector3', description: 'Rotation of the transform.' },
        { label: 'LocalRotation', type: 'Vector3', description: 'Local rotation of the transform. Same as Rotation if there is no parent.' },
        { label: 'Scale', type: 'Vector3', description: 'Scale of the transform.' },
        { label: 'Forward', type: 'Vector3', description: 'Forward vector of the transform.' },
        { label: 'Up', type: 'Vector3', description: 'Up vector of the transform.' },
        { label: 'Right', type: 'Vector3', description: 'Right vector of the transform.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'GetTransform',
            returnType: 'Transform',
            description: 'Gets the child transform with the given name.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the transform to get.' }
            ]
        },
        {
            label: 'GetTransforms',
            returnType: 'List(Transform)',
            description: 'Returns a list of direct child transforms.',
            parameters: []
        },
        {
            label: 'PlayAnimation',
            returnType: 'null',
            description: 'Plays the animation by name. If fade is provided, it will fade the animation by this timestep.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the animation to play.' },
                { name: 'fade', type: 'float', description: 'Optional fade time.', isOptional: true }
            ]
        },
        {
            label: 'GetAnimationLength',
            returnType: 'float',
            description: 'Gets the length of the specified animation.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the animation.' }
            ]
        },
        {
            label: 'PlaySound',
            returnType: 'null',
            description: 'Plays the sound attached to this transform.',
            parameters: []
        },
        {
            label: 'StopSound',
            returnType: 'null',
            description: 'Stops the sound attached to this transform.',
            parameters: []
        },
        {
            label: 'ToggleParticle',
            returnType: 'null',
            description: 'Enables or disables the particle system attached to this transform.',
            parameters: [
                { name: 'toggle', type: 'bool', description: 'Enable or disable the particle system.' }
            ]
        },
        {
            label: 'Rotate',
            returnType: 'null',
            description: 'Applies a rotation to the transform using the provided Euler angles.',
            parameters: [
                { name: 'eulers', type: 'Vector3', description: 'The Euler angles to rotate the transform by.' }
            ]
        },
        {
            label: 'InverseTransformPoint',
            returnType: 'Vector3',
            description: 'Transforms a position from world space to local space.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The position to transform.' }
            ]
        },
        {
            label: 'InverseTransformDirection',
            returnType: 'Vector3',
            description: 'Transforms a direction from world space to local space.',
            parameters: [
                { name: 'direction', type: 'Vector3', description: 'The direction to transform.' }
            ]
        },
        {
            label: 'TransformPoint',
            returnType: 'Vector3',
            description: 'Transforms a position from local space to world space.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The position to transform.' }
            ]
        },
        {
            label: 'TransformDirection',
            returnType: 'Vector3',
            description: 'Transforms a direction from local space to world space.',
            parameters: [
                { name: 'direction', type: 'Vector3', description: 'The direction to transform.' }
            ]
        }
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const TransformClassInstance: TransformClass = new TransformClass();
