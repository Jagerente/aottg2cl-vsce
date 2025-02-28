import { CharacterClassInstance } from './CharacterClass';
import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class HumanClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Human';
    public description = 'Human inherits from Character. Only character owner can modify fields and call functions unless otherwise specified.';
    
    public extends?: IClass[] = [CharacterClassInstance];

    public instanceFields: IField[] = [
        { label: 'Weapon', type: 'string', description: 'Human\'s current weapon ("Blade", "AHSS", "ThunderSpear", "APG").', readonly: true },
        { label: 'CurrentGas', type: 'float', description: 'Current gas. Cannot be set higher than max gas.' },
        { label: 'MaxGas', type: 'float', description: 'Max gas.' },
        { label: 'CurrentBlade', type: 'int', description: 'Current number of blades left. Cannot be set higher than max blades.' },
        { label: 'MaxBlade', type: 'int', description: 'Max number of blades.' },
        { label: 'CurrentBladeDurability', type: 'float', description: 'Current blade durability. Cannot be set higher than max durability.' },
        { label: 'MaxBladeDurability', type: 'float', description: 'Maximum blade durability.' },
        { label: 'CurrentAmmoRound', type: 'int', description: 'Current ammo in current round.' },
        { label: 'MaxAmmoRound', type: 'int', description: 'Max ammo per round.' },
        { label: 'CurrentAmmoLeft', type: 'int', description: 'Current ammo left.' },
        { label: 'MaxAmmoTotal', type: 'int', description: 'Maximum total ammo.' },
        { label: 'Acceleration', type: 'int', description: 'Acceleration stat.' },
        { label: 'Speed', type: 'int', description: 'Run speed stat.' },
        { label: 'HorseSpeed', type: 'float', description: 'Horse run speed.' },
        { label: 'IsCarried', type: 'bool', description: 'Is the human carried by other player.', readonly: true },
        { label: 'IsMounted', type: 'bool', description: 'Is the human mounted to an object (does not count horses).', readonly: true },
        { label: 'MountedMapObject', type: 'MapObject', description: 'Returns the current mounted map object.', readonly: true },
        { label: 'MountedTransform', type: 'Transform', description: 'Returns the current mounted transform.', readonly: true },
        { label: 'CurrentSpecial', type: 'string', description: 'Returns the current special.', readonly: true },
        { label: 'AutoRefillGas', type: 'bool', description: 'If the human has the input setting AutoRefillGas enabled. Character owner only.', readonly: true },
        { label: 'State', type: 'string', description: 'Animation state of the human. Valid states are: Idle, Attack, GroundDodge, AirDodge, Reload, Refill, Die, Grab, EmoteAction, SpecialAttack, SpecialAction, Slide, Run, Land, MountingHorse, Stun, WallSlide.', readonly: true },
        { label: 'CanDodge', type: 'bool', description: 'Disables/Enables dodging.' },
        { label: 'LeftHookEnabled', type: 'bool', description: 'Disables/Enables the left hook.' },
        { label: 'RightHookEnabled', type: 'bool', description: 'Disables/Enables the right hook.' },
        { label: 'IsInvincible', type: 'bool', description: 'Disables/Enables whether human is invincible.' },
        { label: 'InvincibleTimeLeft', type: 'float', description: 'Amount of time before IsInvincible is set to false.' },
        { label: 'SpecialCooldown', type: 'float', description: 'Maximum cooldown on special ability.' },
        { label: 'ShifterLiveTime', type: 'float', description: 'If shifter special is equipped, how much live time for transforming.' },
        { label: 'SpecialCooldownRatio', type: 'float', description: 'Ratio of CurrentCooldown / SpecialCooldown. 1.0 means ability is ready.', readonly: true }
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'Refill',
            returnType: 'bool',
            description: 'Causes the human to enter refill animation and refreshes all gas/ammo at the end. Returns true if the human actually needed refill.',
            parameters: []
        },
        {
            label: 'RefillImmediate',
            returnType: 'null',
            description: 'Immediately refreshes all gas/ammo without animation.',
            parameters: []
        },
        {
            label: 'ClearHooks',
            returnType: 'null',
            description: 'Causes the human to disable both hooks if any are active.',
            parameters: []
        },
        {
            label: 'ClearLeftHook',
            returnType: 'null',
            description: 'Causes the human to disable the left hook if it is active.',
            parameters: []
        },
        {
            label: 'ClearRightHook',
            returnType: 'null',
            description: 'Causes the human to disable the right hook if it is active.',
            parameters: []
        },
        {
            label: 'MountMapObject',
            returnType: 'null',
            description: 'Mounts the human to the given MapObject.',
            parameters: [
                { name: 'obj', type: 'MapObject', description: 'The object to mount to.' },
                { name: 'positionOffset', type: 'Vector3', description: 'The position offset for mounting.' },
                { name: 'rotationOffset', type: 'Vector3', description: 'The rotation offset for mounting.' }
            ]
        },
        {
            label: 'MountTransform',
            returnType: 'null',
            description: 'Mounts the human to the given Transform.',
            parameters: [
                { name: 'obj', type: 'Transform', description: 'The transform to mount to.' },
                { name: 'positionOffset', type: 'Vector3', description: 'The position offset for mounting.' },
                { name: 'rotationOffset', type: 'Vector3', description: 'The rotation offset for mounting.' }
            ]
        },
        {
            label: 'Unmount',
            returnType: 'null',
            description: 'Unmounts the human from an object.',
            parameters: []
        },
        {
            label: 'SetSpecial',
            returnType: 'null',
            description: 'Sets the human special.',
            parameters: [
                { name: 'special', type: 'string', description: 'The special to set.' }
            ]
        },
        {
            label: 'ActivateSpecial',
            returnType: 'null',
            description: 'Triggers the special to activate..',
            parameters: []
        },
        {
            label: 'SetWeapon',
            returnType: 'null',
            description: 'Sets the human weapon.',
            parameters: [
                { name: 'weapon', type: 'string', description: 'The weapon to set.' }
            ]
        },
        {
            label: 'DisablePerks',
            returnType: 'null',
            description: 'Disables all perks.',
            parameters: []
        }
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const HumanClassInstance: HumanClass = new HumanClass();
