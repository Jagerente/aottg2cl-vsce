import { CharacterClassInstance } from './CharacterClass';
import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class HumanClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Human';
    public description = 'Human inherits from Character. Only character owner can modify fields and call functions unless otherwise specified.';
    
    public extends?: IClass[] = [CharacterClassInstance];

    public instanceFields: IField[] = [
        { parent: this, label: 'Weapon', type: {name: 'string', typeArguments: []}, description: 'Human\'s current weapon ("Blade", "AHSS", "ThunderSpear", "APG").', readonly: true },
        { parent: this, label: 'CurrentGas', type: {name: 'float', typeArguments: []}, description: 'Current gas. Cannot be set higher than max gas.' },
        { parent: this, label: 'MaxGas', type: {name: 'float', typeArguments: []}, description: 'Max gas.' },
        { parent: this, label: 'CurrentBlade', type: {name: 'int', typeArguments: []}, description: 'Current number of blades left. Cannot be set higher than max blades.' },
        { parent: this, label: 'MaxBlade', type: {name: 'int', typeArguments: []}, description: 'Max number of blades.' },
        { parent: this, label: 'CurrentBladeDurability', type: {name: 'float', typeArguments: []}, description: 'Current blade durability. Cannot be set higher than max durability.' },
        { parent: this, label: 'MaxBladeDurability', type: {name: 'float', typeArguments: []}, description: 'Maximum blade durability.' },
        { parent: this, label: 'CurrentAmmoRound', type: {name: 'int', typeArguments: []}, description: 'Current ammo in current round.' },
        { parent: this, label: 'MaxAmmoRound', type: {name: 'int', typeArguments: []}, description: 'Max ammo per round.' },
        { parent: this, label: 'CurrentAmmoLeft', type: {name: 'int', typeArguments: []}, description: 'Current ammo left.' },
        { parent: this, label: 'MaxAmmoTotal', type: {name: 'int', typeArguments: []}, description: 'Maximum total ammo.' },
        { parent: this, label: 'Acceleration', type: {name: 'int', typeArguments: []}, description: 'Acceleration stat.' },
        { parent: this, label: 'Speed', type: {name: 'int', typeArguments: []}, description: 'Run speed stat.' },
        { parent: this, label: 'HorseSpeed', type: {name: 'float', typeArguments: []}, description: 'Horse run speed.' },
        { parent: this, label: 'IsCarried', type: { name: 'bool', typeArguments: [] }, description: 'Is the human carried by other player.', readonly: true },
        { parent: this, label: 'IsMounted', type: { name: 'bool', typeArguments: [] }, description: 'Is the human mounted to an object (does not count horses).', readonly: true },
        { parent: this, label: 'MountedMapObject', type: {name: 'MapObject', typeArguments: []}, description: 'Returns the current mounted map object.', readonly: true },
        { parent: this, label: 'MountedTransform', type: {name: 'Transform', typeArguments: []}, description: 'Returns the current mounted transform.', readonly: true },
        { parent: this, label: 'CurrentSpecial', type: {name: 'string', typeArguments: []}, description: 'Returns the current special.', readonly: true },
        { parent: this, label: 'AutoRefillGas', type: { name: 'bool', typeArguments: [] }, description: 'If the human has the input setting AutoRefillGas enabled. Character owner only.', readonly: true },
        { parent: this, label: 'State', type: {name: 'string', typeArguments: []}, description: 'Animation state of the human. Valid states are: Idle, Attack, GroundDodge, AirDodge, Reload, Refill, Die, Grab, EmoteAction, SpecialAttack, SpecialAction, Slide, Run, Land, MountingHorse, Stun, WallSlide.', readonly: true },
        { parent: this, label: 'CanDodge', type: { name: 'bool', typeArguments: [] }, description: 'Disables/Enables dodging.' },
        { parent: this, label: 'LeftHookEnabled', type: { name: 'bool', typeArguments: [] }, description: 'Disables/Enables the left hook.' },
        { parent: this, label: 'RightHookEnabled', type: { name: 'bool', typeArguments: [] }, description: 'Disables/Enables the right hook.' },
        { parent: this, label: 'IsInvincible', type: { name: 'bool', typeArguments: [] }, description: 'Disables/Enables whether human is invincible.' },
        { parent: this, label: 'InvincibleTimeLeft', type: {name: 'float', typeArguments: []}, description: 'Amount of time before IsInvincible is set to false.' },
        { parent: this, label: 'SpecialCooldown', type: {name: 'float', typeArguments: []}, description: 'Maximum cooldown on special ability.' },
        { parent: this, label: 'ShifterLiveTime', type: {name: 'float', typeArguments: []}, description: 'If shifter special is equipped, how much live time for transforming.' },
        { parent: this, label: 'SpecialCooldownRatio', type: {name: 'float', typeArguments: []}, description: 'Ratio of CurrentCooldown / SpecialCooldown. 1.0 means ability is ready.', readonly: true }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'Refill',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Causes the human to enter refill animation and refreshes all gas/ammo at the end. Returns true if the human actually needed refill.',
            parameters: []
        },
        {
            parent: this,
            label: 'RefillImmediate',
            returnType: {name: 'void', typeArguments: []},
            description: 'Immediately refreshes all gas/ammo without animation.',
            parameters: []
        },
        {
            parent: this,
            label: 'ClearHooks',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the human to disable both hooks if any are active.',
            parameters: []
        },
        {
            parent: this,
            label: 'ClearLeftHook',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the human to disable the left hook if it is active.',
            parameters: []
        },
        {
            parent: this,
            label: 'ClearRightHook',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the human to disable the right hook if it is active.',
            parameters: []
        },
        {
            parent: this,
            label: 'MountMapObject',
            returnType: {name: 'void', typeArguments: []},
            description: 'Mounts the human to the given MapObject.',
            parameters: [
                { name: 'obj', type: {name: 'MapObject', typeArguments: []}, description: 'The object to mount to.' },
                { name: 'positionOffset', type: { name: 'Vector3', typeArguments: [] }, description: 'The position offset for mounting.' },
                { name: 'rotationOffset', type: { name: 'Vector3', typeArguments: [] }, description: 'The rotation offset for mounting.' }
            ]
        },
        {
            parent: this,
            label: 'MountTransform',
            returnType: {name: 'void', typeArguments: []},
            description: 'Mounts the human to the given Transform.',
            parameters: [
                { name: 'obj', type: {name: 'Transform', typeArguments: []}, description: 'The transform to mount to.' },
                { name: 'positionOffset', type: { name: 'Vector3', typeArguments: [] }, description: 'The position offset for mounting.' },
                { name: 'rotationOffset', type: { name: 'Vector3', typeArguments: [] }, description: 'The rotation offset for mounting.' }
            ]
        },
        {
            parent: this,
            label: 'Unmount',
            returnType: {name: 'void', typeArguments: []},
            description: 'Unmounts the human from an object.',
            parameters: []
        },
        {
            parent: this,
            label: 'SetSpecial',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the human special.',
            parameters: [
                { name: 'special', type: {name: 'string', typeArguments: []}, description: 'The special to set.' }
            ]
        },
        {
            parent: this,
            label: 'ActivateSpecial',
            returnType: {name: 'void', typeArguments: []},
            description: 'Triggers the special to activate..',
            parameters: []
        },
        {
            parent: this,
            label: 'SetWeapon',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the human weapon.',
            parameters: [
                { name: 'weapon', type: {name: 'string', typeArguments: []}, description: 'The weapon to set.' }
            ]
        },
        {
            parent: this,
            label: 'DisablePerks',
            returnType: {name: 'void', typeArguments: []},
            description: 'Disables all perks.',
            parameters: []
        }
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const HumanClassInstance: HumanClass = new HumanClass();
