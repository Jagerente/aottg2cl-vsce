import { ClassKinds, IClass, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class CharacterClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Character';
    public description = 'Character is the base class that Human, Titan, and Shifter inherit from.';

    public extends?: IClass[] = [ObjectClassInstance];

    public instanceFields: IField[] = [
        { parent: this, label: 'Player', type: 'Player', description: 'The player who owns this character.', readonly: true },
        { parent: this, label: 'IsMine', type: 'bool', description: 'Character belongs to my player.', readonly: true },
        { parent: this, label: 'IsMainCharacter', type: 'bool', description: 'Character belongs to my player and is the main character.', readonly: true },
        { parent: this, label: 'IsAI', type: 'bool', description: 'If the character is AI.', readonly: true },
        { parent: this, label: 'ViewID', type: 'int', description: 'The network view ID of the character. This is synced with the room.', readonly: true },
        { parent: this, label: 'Transform', type: 'Transform', description: 'The Unity transform of the character.', readonly: true },
        { parent: this, label: 'Position', type: 'Vector3', description: 'Position of the character.' },
        { parent: this, label: 'Rotation', type: 'Vector3', description: 'Rotation of the character.' },
        { parent: this, label: 'QuaternionRotation', type: 'Quaternion', description: 'Quaternion rotation of the character.' },
        { parent: this, label: 'Velocity', type: 'Vector3', description: 'Velocity of the character.' },
        { parent: this, label: 'Forward', type: 'Vector3', description: 'Forward direction of the character.' },
        { parent: this, label: 'Right', type: 'Vector3', description: 'Right direction of the character.' },
        { parent: this, label: 'Up', type: 'Vector3', description: 'Up direction of the character.' },
        { parent: this, label: 'HasTargetDirection', type: 'bool', description: 'If the character has a target direction it is turning towards.', readonly: true },
        { parent: this, label: 'TargetDirection', type: 'Vector3', description: 'The character\'s target direction.', readonly: true },
        { parent: this, label: 'Team', type: 'string', description: 'Team the character belongs to ("None", "Blue", "Red", "Titan", "Human"). This can be set to any string, so any combination of teams is allowed.' },
        { parent: this, label: 'Name', type: 'string', description: 'The display name of the character. If modified, it will affect world name (if human) and feed name. All changes are local, and can be modified by non-owners.' },
        { parent: this, label: 'Guild', type: 'string', description: 'The guild name of the character. Same restrictions as Name.' },
        { parent: this, label: 'Health', type: 'float', description: 'Character\'s current health. Cannot be set higher than MaxHealth.' },
        { parent: this, label: 'MaxHealth', type: 'float', description: 'Character\'s maximum health.' },
        { parent: this, label: 'CustomDamageEnabled', type: 'bool', description: 'Is custom damage dealing enabled.' },
        { parent: this, label: 'CustomDamage', type: 'int', description: 'Amount of custom damage to deal per attack.' },
        { parent: this, label: 'CurrentAnimation', type: 'string', description: 'The character\'s current playing animation.', readonly: true },
        { parent: this, label: 'Grounded', type: 'bool', description: 'Read whether the character is currently grounded - updated every fixed update.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'GetKilled',
            returnType: 'null',
            description: 'Kills the character. Callable by non-owners.',
            parameters: [
                { name: 'killer', type: 'string', description: 'Name of the killer.' }
            ]
        },
        {
            parent: this,
            label: 'GetDamaged',
            returnType: 'null',
            description: 'Damages the character and kills it if health reaches 0. Callable by non-owners.',
            parameters: [
                { name: 'killer', type: 'string', description: 'Name of the killer.' },
                { name: 'damage', type: 'int', description: 'Amount of damage dealt.' }
            ]
        },
        {
            parent: this,
            label: 'Emote',
            returnType: 'null',
            description: 'Causes the character to perform an emote.',
            parameters: [
                { name: 'emote', type: 'string', description: 'The emote to perform.' }
            ]
        },
        {
            parent: this,
            label: 'PlayAnimation',
            returnType: 'null',
            description: 'Causes the character to play an animation.',
            parameters: [
                { name: 'animation', type: 'string', description: 'The name of the animation.' },
                { name: 'fade', type: 'float', description: 'Optional fade time.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'ForceAnimation',
            returnType: 'null',
            description: 'Will put character into Emote state to play the entire animation',
            parameters: [
                { name: 'animation', type: 'string', description: 'The name of the animation.' },
                { name: 'fade', type: 'float', description: 'Optional fade time.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'GetAnimationLength',
            returnType: 'float',
            description: 'Gets the length of the animation.',
            parameters: [
                { name: 'animation', type: 'string', description: 'The name of the animation.' }
            ]
        },
        {
            parent: this,
            label: 'PlaySound',
            returnType: 'null',
            description: 'Plays a sound if present in the character.',
            parameters: [
                { name: 'sound', type: 'string', description: 'The sound to play.' }
            ]
        },
        {
            parent: this,
            label: 'StopSound',
            returnType: 'null',
            description: 'Stops the sound.',
            parameters: [
                { name: 'sound', type: 'string', description: 'The sound to stop.' }
            ]
        },
        {
            parent: this,
            label: 'LookAt',
            returnType: 'null',
            description: 'Rotates the character to look at a world position.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The position to look at.' }
            ]
        },
        {
            parent: this,
            label: 'AddForce',
            returnType: 'null',
            description: 'Adds force to the character.',
            parameters: [
                { name: 'force', type: 'Vector3', description: 'The force to add.' },
                { name: 'mode', type: 'string', description: 'The optional mode.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'Reveal',
            returnType: 'null',
            description: 'Adds a white outline visible through walls for a duration.',
            parameters: [
                { name: 'duration', type: 'float', description: 'The duration of the outline.' }
            ]
        },
        {
            parent: this,
            label: 'AddOutline',
            returnType: 'null',
            description: 'Adds an outline effect to the character.',
            parameters: [
                { name: 'color', type: 'Color', description: 'The outline color.' },
                { name: 'mode', type: 'string', description: 'The outline mode.' }
            ]
        },
        {
            parent: this,
            label: 'RemoveOutline',
            returnType: 'null',
            description: 'Removes the outline effect from the character.',
            parameters: []
        },
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const CharacterClassInstance: CharacterClass = new CharacterClass();
