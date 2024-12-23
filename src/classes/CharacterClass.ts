import { ClassKinds, IClass, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class CharacterClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Character';
    public description = 'Character is the base class that Human, Titan, and Shifter inherit from.';

    public extends?: IClass[] = [ObjectClassInstance];

    public instanceFields: IField[] = [
        { label: 'Player', type: 'Player', description: 'The player who owns this character.', readonly: true },
        { label: 'IsMine', type: 'bool', description: 'Character belongs to my player.', readonly: true },
        { label: 'IsMainCharacter', type: 'bool', description: 'Character belongs to my player and is the main character.', readonly: true },
        { label: 'IsAI', type: 'bool', description: 'If the character is AI.', readonly: true },
        { label: 'ViewID', type: 'int', description: 'The network view ID of the character. This is synced with the room.', readonly: true },
        { label: 'Transform', type: 'Transform', description: 'The Unity transform of the character.', readonly: true },
        { label: 'Position', type: 'Vector3', description: 'Position of the character.' },
        { label: 'Rotation', type: 'Vector3', description: 'Rotation of the character.' },
        { label: 'QuaternionRotation', type: 'Quaternion', description: 'Quaternion rotation of the character.' },
        { label: 'Velocity', type: 'Vector3', description: 'Velocity of the character.' },
        { label: 'Forward', type: 'Vector3', description: 'Forward direction of the character.' },
        { label: 'Right', type: 'Vector3', description: 'Right direction of the character.' },
        { label: 'Up', type: 'Vector3', description: 'Up direction of the character.' },
        { label: 'HasTargetDirection', type: 'bool', description: 'If the character has a target direction it is turning towards.', readonly: true },
        { label: 'TargetDirection', type: 'Vector3', description: 'The character\'s target direction.', readonly: true },
        { label: 'Team', type: 'string', description: 'Team the character belongs to ("None", "Blue", "Red", "Titan", "Human"). This can be set to any string, so any combination of teams is allowed.' },
        { label: 'Name', type: 'string', description: 'The display name of the character. If modified, it will affect world name (if human) and feed name. All changes are local, and can be modified by non-owners.' },
        { label: 'Guild', type: 'string', description: 'The guild name of the character. Same restrictions as Name.' },
        { label: 'Health', type: 'float', description: 'Character\'s current health. Cannot be set higher than MaxHealth.' },
        { label: 'MaxHealth', type: 'float', description: 'Character\'s maximum health.' },
        { label: 'CustomDamageEnabled', type: 'bool', description: 'Is custom damage dealing enabled.' },
        { label: 'CustomDamage', type: 'int', description: 'Amount of custom damage to deal per attack.' },
        { label: 'CurrentAnimation', type: 'string', description: 'The character\'s current playing animation.', readonly: true },
        { label: 'Grounded', type: 'bool', description: 'Read whether the character is currently grounded - updated every fixed update.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'GetKilled',
            returnType: 'null',
            description: 'Kills the character. Callable by non-owners.',
            parameters: [
                { name: 'killer', type: 'string', description: 'Name of the killer.' }
            ]
        },
        {
            label: 'GetDamaged',
            returnType: 'null',
            description: 'Damages the character and kills it if health reaches 0. Callable by non-owners.',
            parameters: [
                { name: 'killer', type: 'string', description: 'Name of the killer.' },
                { name: 'damage', type: 'int', description: 'Amount of damage dealt.' }
            ]
        },
        {
            label: 'Emote',
            returnType: 'null',
            description: 'Causes the character to perform an emote.',
            parameters: [
                { name: 'emote', type: 'string', description: 'The emote to perform.' }
            ]
        },
        {
            label: 'PlayAnimation',
            returnType: 'null',
            description: 'Causes the character to play an animation.',
            parameters: [
                { name: 'animation', type: 'string', description: 'The name of the animation.' },
                { name: 'fade', type: 'float', description: 'Optional fade time.', isOptional: true }
            ]
        },
        {
            label: 'GetAnimationLength',
            returnType: 'float',
            description: 'Gets the length of the animation.',
            parameters: [
                { name: 'animation', type: 'string', description: 'The name of the animation.' }
            ]
        },
        {
            label: 'PlaySound',
            returnType: 'null',
            description: 'Plays a sound if present in the character.',
            parameters: [
                { name: 'sound', type: 'string', description: 'The sound to play.' }
            ]
        },
        {
            label: 'StopSound',
            returnType: 'null',
            description: 'Stops the sound.',
            parameters: [
                { name: 'sound', type: 'string', description: 'The sound to stop.' }
            ]
        },
        {
            label: 'LookAt',
            returnType: 'null',
            description: 'Rotates the character to look at a world position.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The position to look at.' }
            ]
        },
        {
            label: 'AddForce',
            returnType: 'null',
            description: 'Adds force to the character.',
            parameters: [
                { name: 'force', type: 'Vector3', description: 'The force to add.' },
                { name: 'mode', type: 'string', description: 'The optional mode.', isOptional: true }
            ]
        },
        {
            label: 'Reveal',
            returnType: 'null',
            description: 'Adds a white outline visible through walls for a duration.',
            parameters: [
                { name: 'duration', type: 'float', description: 'The duration of the outline.' }
            ]
        },
        {
            label: 'AddOutline',
            returnType: 'null',
            description: 'Adds an outline effect to the character.',
            parameters: [
                { name: 'color', type: 'Color', description: 'The outline color.' },
                { name: 'mode', type: 'string', description: 'The outline mode.' }
            ]
        },
        {
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