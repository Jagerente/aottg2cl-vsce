import { ClassKinds, IClass, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class CharacterClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Character';
    public description = 'Character is the base class that Human, Titan, and Shifter inherit from.';

    public extends?: IClass[] = [ObjectClassInstance];

    public instanceFields: IField[] = [
        { parent: this, label: 'Player', type: {name: 'Player', typeArguments: []}, description: 'The player who owns this character.', readonly: true },
        { parent: this, label: 'IsMine', type: { name: 'bool', typeArguments: [] }, description: 'Character belongs to my player.', readonly: true },
        { parent: this, label: 'IsMainCharacter', type: { name: 'bool', typeArguments: [] }, description: 'Character belongs to my player and is the main character.', readonly: true },
        { parent: this, label: 'IsAI', type: { name: 'bool', typeArguments: [] }, description: 'If the character is AI.', readonly: true },
        { parent: this, label: 'ViewID', type: {name: 'int', typeArguments: []}, description: 'The network view ID of the character. This is synced with the room.', readonly: true },
        { parent: this, label: 'Transform', type: {name: 'Transform', typeArguments: []}, description: 'The Unity transform of the character.', readonly: true },
        { parent: this, label: 'Position', type: { name: 'Vector3', typeArguments: [] }, description: 'Position of the character.' },
        { parent: this, label: 'Rotation', type: { name: 'Vector3', typeArguments: [] }, description: 'Rotation of the character.' },
        { parent: this, label: 'QuaternionRotation', type: {name: 'Quaternion', typeArguments: []}, description: 'Quaternion rotation of the character.' },
        { parent: this, label: 'Velocity', type: { name: 'Vector3', typeArguments: [] }, description: 'Velocity of the character.' },
        { parent: this, label: 'Forward', type: { name: 'Vector3', typeArguments: [] }, description: 'Forward direction of the character.' },
        { parent: this, label: 'Right', type: { name: 'Vector3', typeArguments: [] }, description: 'Right direction of the character.' },
        { parent: this, label: 'Up', type: { name: 'Vector3', typeArguments: [] }, description: 'Up direction of the character.' },
        { parent: this, label: 'HasTargetDirection', type: { name: 'bool', typeArguments: [] }, description: 'If the character has a target direction it is turning towards.', readonly: true },
        { parent: this, label: 'TargetDirection', type: { name: 'Vector3', typeArguments: [] }, description: 'The character\'s target direction.', readonly: true },
        { parent: this, label: 'Team', type: {name: 'string', typeArguments: []}, description: 'Team the character belongs to ("None", "Blue", "Red", "Titan", "Human"). This can be set to any string, so any combination of teams is allowed.' },
        { parent: this, label: 'Name', type: {name: 'string', typeArguments: []}, description: 'The display name of the character. If modified, it will affect world name (if human) and feed name. All changes are local, and can be modified by non-owners.' },
        { parent: this, label: 'Guild', type: {name: 'string', typeArguments: []}, description: 'The guild name of the character. Same restrictions as Name.' },
        { parent: this, label: 'Health', type: {name: 'float', typeArguments: []}, description: 'Character\'s current health. Cannot be set higher than MaxHealth.' },
        { parent: this, label: 'MaxHealth', type: {name: 'float', typeArguments: []}, description: 'Character\'s maximum health.' },
        { parent: this, label: 'CustomDamageEnabled', type: { name: 'bool', typeArguments: [] }, description: 'Is custom damage dealing enabled.' },
        { parent: this, label: 'CustomDamage', type: {name: 'int', typeArguments: []}, description: 'Amount of custom damage to deal per attack.' },
        { parent: this, label: 'CurrentAnimation', type: {name: 'string', typeArguments: []}, description: 'The character\'s current playing animation.', readonly: true },
        { parent: this, label: 'Grounded', type: { name: 'bool', typeArguments: [] }, description: 'Read whether the character is currently grounded - updated every fixed update.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'GetKilled',
            returnType: {name: 'void', typeArguments: []},
            description: 'Kills the character. Callable by non-owners.',
            parameters: [
                { name: 'killer', type: {name: 'string', typeArguments: []}, description: 'Name of the killer.' }
            ]
        },
        {
            parent: this,
            label: 'GetDamaged',
            returnType: {name: 'void', typeArguments: []},
            description: 'Damages the character and kills it if health reaches 0. Callable by non-owners.',
            parameters: [
                { name: 'killer', type: {name: 'string', typeArguments: []}, description: 'Name of the killer.' },
                { name: 'damage', type: {name: 'int', typeArguments: []}, description: 'Amount of damage dealt.' }
            ]
        },
        {
            parent: this,
            label: 'Emote',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the character to perform an emote.',
            parameters: [
                { name: 'emote', type: {name: 'string', typeArguments: []}, description: 'The emote to perform.' }
            ]
        },
        {
            parent: this,
            label: 'PlayAnimation',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the character to play an animation.',
            parameters: [
                { name: 'animation', type: {name: 'string', typeArguments: []}, description: 'The name of the animation.' },
                { name: 'fade', type: {name: 'float', typeArguments: []}, description: 'Optional fade time.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'ForceAnimation',
            returnType: {name: 'void', typeArguments: []},
            description: 'Will put character into Emote state to play the entire animation',
            parameters: [
                { name: 'animation', type: {name: 'string', typeArguments: []}, description: 'The name of the animation.' },
                { name: 'fade', type: {name: 'float', typeArguments: []}, description: 'Optional fade time.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'GetAnimationLength',
            returnType: {name: 'float', typeArguments: []},
            description: 'Gets the length of the animation.',
            parameters: [
                { name: 'animation', type: {name: 'string', typeArguments: []}, description: 'The name of the animation.' }
            ]
        },
        {
            parent: this,
            label: 'PlaySound',
            returnType: {name: 'void', typeArguments: []},
            description: 'Plays a sound if present in the character.',
            parameters: [
                { name: 'sound', type: {name: 'string', typeArguments: []}, description: 'The sound to play.' }
            ]
        },
        {
            parent: this,
            label: 'StopSound',
            returnType: {name: 'void', typeArguments: []},
            description: 'Stops the sound.',
            parameters: [
                { name: 'sound', type: {name: 'string', typeArguments: []}, description: 'The sound to stop.' }
            ]
        },
        {
            parent: this,
            label: 'LookAt',
            returnType: {name: 'void', typeArguments: []},
            description: 'Rotates the character to look at a world position.',
            parameters: [
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to look at.' }
            ]
        },
        {
            parent: this,
            label: 'AddForce',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds force to the character.',
            parameters: [
                { name: 'force', type: { name: 'Vector3', typeArguments: [] }, description: 'The force to add.' },
                { name: 'mode', type: {name: 'string', typeArguments: []}, description: 'The optional mode.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'Reveal',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds a white outline visible through walls for a duration.',
            parameters: [
                { name: 'duration', type: {name: 'float', typeArguments: []}, description: 'The duration of the outline.' }
            ]
        },
        {
            parent: this,
            label: 'AddOutline',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds an outline effect to the character.',
            parameters: [
                { name: 'color', type: {name: 'Color', typeArguments: []}, description: 'The outline color.' },
                { name: 'mode', type: {name: 'string', typeArguments: []}, description: 'The outline mode.' }
            ]
        },
        {
            parent: this,
            label: 'RemoveOutline',
            returnType: {name: 'void', typeArguments: []},
            description: 'Removes the outline effect from the character.',
            parameters: []
        },
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const CharacterClassInstance: CharacterClass = new CharacterClass();
