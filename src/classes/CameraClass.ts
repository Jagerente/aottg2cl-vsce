import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class CameraClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Camera';
    public description = 'Camera functions for controlling and retrieving camera information.';

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [
        { parent: this, label: 'IsManual', type: 'bool', description: 'Indicates if the camera is in manual mode.', readonly: true },
        { parent: this, label: 'Position', type: 'Vector3', description: 'Current camera position.', readonly: true },
        { parent: this, label: 'Rotation', type: 'Vector3', description: 'Current camera rotation.', readonly: true },
        { parent: this, label: 'Velocity', type: 'Vector3', description: 'Current camera velocity if set using SetVelocity().', readonly: true },
        { parent: this, label: 'FOV', type: 'float', description: 'Current camera field of view if set using SetFOV().', readonly: true },
        { parent: this, label: 'FollowDistance', type: 'float', description: 'Current camera follow distance from target character.', readonly: false },
        { parent: this, label: 'Forward', type: 'Vector3', description: 'The forward direction of the camera.', readonly: false },
        { parent: this, label: 'Right', type: 'Vector3', description: 'The right direction of the camera.', readonly: false },
        { parent: this, label: 'Up', type: 'Vector3', description: 'The up direction of the camera.', readonly: false }
    ];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'SetManual',
            returnType: 'null',
            description: 'Sets the camera manual mode. If true, camera will only be controlled by custom logic. If false, camera will follow the spawned or spectated player and read input.',
            parameters: [
                { name: 'isManual', type: 'bool', description: 'Whether to enable manual mode.' }
            ]
        },
        {
            parent: this,
            label: 'SetPosition',
            returnType: 'null',
            description: 'Sets camera position.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'New position of the camera.' }
            ]
        },
        {
            parent: this,
            label: 'SetRotation',
            returnType: 'null',
            description: 'Sets camera rotation.',
            parameters: [
                { name: 'rotation', type: 'Vector3', description: 'New rotation of the camera.' }
            ]
        },
        {
            parent: this,
            label: 'SetVelocity',
            returnType: 'null',
            description: 'Sets camera velocity.',
            parameters: [
                { name: 'velocity', type: 'Vector3', description: 'New velocity of the camera.' }
            ]
        },
        {
            parent: this,
            label: 'LookAt',
            returnType: 'null',
            description: 'Sets the camera forward direction such that it is looking at a world position.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The position the camera will look at.' }
            ]
        },
        {
            parent: this,
            label: 'SetFOV',
            returnType: 'null',
            description: 'Sets the camera field of view. Use 0 to use the default field of view.',
            parameters: [
                { name: 'fov', type: 'float', description: 'The new field of view.' }
            ]
        },
        {
            parent: this,
            label: 'SetCameraMode',
            returnType: 'null',
            description: 'Forces the player to use a certain camera mode, taking priority over their camera setting. Accepted values are TPS, Original, FPS.',
            parameters: [
                { name: 'mode', type: 'string', description: 'The camera mode to set.' }
            ]
        },
        {
            parent: this,
            label: 'ResetDistance',
            returnType: 'null',
            description: 'Resets the follow distance to player\'s settings.',
            parameters: []
        },
        {
            parent: this,
            label: 'ResetCameraMode',
            returnType: 'null',
            description: 'Resets the camera mode to player\'s settings.',
            parameters: []
        }        
    ];
}

export const CameraClassInstance: CameraClass = new CameraClass();
