import { IClass, IField, IMethod } from './IClass';

export class CameraClass implements IClass {
    public name = 'Camera';
    public description = 'Camera functions for controlling and retrieving camera information.';

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [
        { label: 'IsManual', type: 'bool', description: 'Indicates if the camera is in manual mode.', readonly: true },
        { label: 'Position', type: 'Vector3', description: 'Current camera position.', readonly: true },
        { label: 'Rotation', type: 'Vector3', description: 'Current camera rotation.', readonly: true },
        { label: 'Velocity', type: 'Vector3', description: 'Current camera velocity if set using SetVelocity().', readonly: true },
        { label: 'FOV', type: 'float', description: 'Current camera field of view if set using SetFOV().', readonly: true },
        { label: 'FollowDistance', type: 'float', description: 'Current camera follow distance from target character.', readonly: false },
        { label: 'Forward', type: 'Vector3', description: 'The forward direction of the camera.', readonly: false },
    ];

    public staticMethods: IMethod[] = [
        {
            label: 'SetManual',
            returnType: 'null',
            description: 'Sets the camera manual mode. If true, camera will only be controlled by custom logic. If false, camera will follow the spawned or spectated player and read input.',
            parameters: [
                { name: 'isManual', type: 'bool', description: 'Whether to enable manual mode.' }
            ]
        },
        {
            label: 'SetPosition',
            returnType: 'null',
            description: 'Sets camera position.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'New position of the camera.' }
            ]
        },
        {
            label: 'SetRotation',
            returnType: 'null',
            description: 'Sets camera rotation.',
            parameters: [
                { name: 'rotation', type: 'Vector3', description: 'New rotation of the camera.' }
            ]
        },
        {
            label: 'SetVelocity',
            returnType: 'null',
            description: 'Sets camera velocity.',
            parameters: [
                { name: 'velocity', type: 'Vector3', description: 'New velocity of the camera.' }
            ]
        },
        {
            label: 'LookAt',
            returnType: 'null',
            description: 'Sets the camera forward direction such that it is looking at a world position.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The position the camera will look at.' }
            ]
        },
        {
            label: 'SetFOV',
            returnType: 'null',
            description: 'Sets the camera field of view. Use 0 to use the default field of view.',
            parameters: [
                { name: 'fov', type: 'float', description: 'The new field of view.' }
            ]
        }
    ];
}
