import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class CameraClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Camera';
    public description = 'Camera functions for controlling and retrieving camera information.';

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [
        { parent: this, label: 'IsManual', type: { name: 'bool', typeArguments: [] }, description: 'Indicates if the camera is in manual mode.', readonly: true },
        { parent: this, label: 'Position', type: { name: 'Vector3', typeArguments: [] }, description: 'Current camera position.', readonly: true },
        { parent: this, label: 'Rotation', type: { name: 'Vector3', typeArguments: [] }, description: 'Current camera rotation.', readonly: true },
        { parent: this, label: 'Velocity', type: { name: 'Vector3', typeArguments: [] }, description: 'Current camera velocity if set using SetVelocity().', readonly: true },
        { parent: this, label: 'FOV', type: {name: 'float', typeArguments: []}, description: 'Current camera field of view if set using SetFOV().', readonly: true },
        { parent: this, label: 'FollowDistance', type: {name: 'float', typeArguments: []}, description: 'Current camera follow distance from target character.', readonly: false },
        { parent: this, label: 'Forward', type: { name: 'Vector3', typeArguments: [] }, description: 'The forward direction of the camera.', readonly: false },
        { parent: this, label: 'Right', type: { name: 'Vector3', typeArguments: [] }, description: 'The right direction of the camera.', readonly: false },
        { parent: this, label: 'Up', type: { name: 'Vector3', typeArguments: [] }, description: 'The up direction of the camera.', readonly: false }
    ];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'SetManual',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the camera manual mode. If true, camera will only be controlled by custom logic. If false, camera will follow the spawned or spectated player and read input.',
            parameters: [
                { name: 'isManual', type: { name: 'bool', typeArguments: [] }, description: 'Whether to enable manual mode.' }
            ]
        },
        {
            parent: this,
            label: 'SetPosition',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets camera position.',
            parameters: [
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'New position of the camera.' }
            ]
        },
        {
            parent: this,
            label: 'SetRotation',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets camera rotation.',
            parameters: [
                { name: 'rotation', type: { name: 'Vector3', typeArguments: [] }, description: 'New rotation of the camera.' }
            ]
        },
        {
            parent: this,
            label: 'SetVelocity',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets camera velocity.',
            parameters: [
                { name: 'velocity', type: { name: 'Vector3', typeArguments: [] }, description: 'New velocity of the camera.' }
            ]
        },
        {
            parent: this,
            label: 'LookAt',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the camera forward direction such that it is looking at a world position.',
            parameters: [
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position the camera will look at.' }
            ]
        },
        {
            parent: this,
            label: 'SetFOV',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the camera field of view. Use 0 to use the default field of view.',
            parameters: [
                { name: 'fov', type: {name: 'float', typeArguments: []}, description: 'The new field of view.' }
            ]
        },
        {
            parent: this,
            label: 'SetCameraMode',
            returnType: {name: 'void', typeArguments: []},
            description: 'Forces the player to use a certain camera mode, taking priority over their camera setting. Accepted values are TPS, Original, FPS.',
            parameters: [
                { name: 'mode', type: {name: 'string', typeArguments: []}, description: 'The camera mode to set.' }
            ]
        },
        {
            parent: this,
            label: 'ResetDistance',
            returnType: {name: 'void', typeArguments: []},
            description: 'Resets the follow distance to player\'s settings.',
            parameters: []
        },
        {
            parent: this,
            label: 'ResetCameraMode',
            returnType: {name: 'void', typeArguments: []},
            description: 'Resets the camera mode to player\'s settings.',
            parameters: []
        }        
    ];
}

export const CameraClassInstance: CameraClass = new CameraClass();
