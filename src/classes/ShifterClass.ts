import { CharacterClassInstance } from './CharacterClass';
import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class ShifterClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Shifter';
    public description = 'Shifter inherits from Character. Only character owner can modify fields and call functions unless otherwise specified.';

    public extends?: IClass[] = [CharacterClassInstance];

    public instanceFields: IField[] = [
        { label: 'Size', type: 'float', description: 'Shifter\'s size.' },
        { label: 'DetectRange', type: 'float', description: '(AI) shifter\'s detect range.' },
        { label: 'FocusRange', type: 'float', description: '(AI) shifter\'s focus range.' },
        { label: 'NapePosition', type: 'Vector3', description: 'The shifter\'s nape position.' },
        { label: 'DeathAnimLength', type: 'float', description: 'The length of the death animation.' },
        { label: 'FocusTime', type: 'float', description: '(AI) shifter\'s focus time before switching targets.' },
        { label: 'RunSpeedBase', type: 'float', description: 'Shifter\'s base run speed. Final run speed is RunSpeedBase + Size * RunSpeedPerLevel.' },
        { label: 'WalkSpeedBase', type: 'float', description: 'Shifter\'s base walk speed. Final walk speed is WalkSpeedBase + Size * WalkSpeedPerLevel.' },
        { label: 'RunSpeedPerLevel', type: 'float', description: 'Shifter\'s run speed added per level.' },
        { label: 'WalkSpeedPerLevel', type: 'float', description: 'Shifter\'s walk speed added per level.' },
        { label: 'TurnSpeed', type: 'float', description: 'Shifter\'s turn speed when running turn animation.' },
        { label: 'RotateSpeed', type: 'float', description: 'Shifter\'s rotate speed when rotating body.' },
        { label: 'JumpForce', type: 'float', description: 'Shifter\'s jump force when jumping.' },
        { label: 'ActionPause', type: 'float', description: 'Shifter\'s pause delay after performing an action.' },
        { label: 'AttackPause', type: 'float', description: 'Shifter\'s pause delay after performing an attack.' },
        { label: 'TurnPause', type: 'float', description: 'Shifter\'s pause delay after performing a turn.' },
        { label: 'FarAttackCooldown', type: 'float', description: '(AI) Shifter\'s cooldown after performing a ranged attack.' },
        { label: 'AttackWait', type: 'float', description: '(AI) Shifter\'s wait time between being in range to attack and performing the attack.' },
        { label: 'AttackSpeedMultiplier', type: 'float', description: 'Shifter\'s attack animation speed.' },
        { label: 'UsePathfinding', type: 'bool', description: '(AI) Shifter uses pathfinding.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'Blind',
            returnType: 'null',
            description: 'Causes the shifter to enter the blind state.',
            parameters: []
        },
        {
            label: 'Cripple',
            returnType: 'null',
            description: 'Causes the shifter to enter the cripple state.',
            parameters: []
        },
        {
            label: 'MoveTo',
            returnType: 'null',
            description: 'Causes the (AI) shifter to move towards a position. If ignoreEnemies is true, will not engage enemies along the way.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The target position to move to.' },
                { name: 'ignoreEnemies', type: 'bool', description: 'If true, the shifter will ignore enemies along the way.' }
            ]
        },
        {
            label: 'Target',
            returnType: 'null',
            description: 'Causes the (AI) shifter to target an enemy for focusTime seconds. If focusTime is 0, it will use the default focus time.',
            parameters: [
                { name: 'enemy', type: 'Character', description: 'The enemy to target.' },
                { name: 'focusTime', type: 'float', description: 'The duration to focus on the enemy. Use 0 for default time.' }
            ]
        },
        {
            label: 'Idle',
            returnType: 'null',
            description: 'Causes the (AI) shifter to idle for time seconds before beginning to wander. During idle, the shifter will not react or move at all.',
            parameters: [
                { name: 'time', type: 'float', description: 'The idle time in seconds.' }
            ]
        },
        {
            label: 'Wander',
            returnType: 'null',
            description: 'Causes the (AI) shifter to cancel any move commands and begin wandering randomly.',
            parameters: []
        },
        {
            label: 'Emote',
            returnType: 'null',
            description: 'Causes the shifter to emote.',
            parameters: [
                { name: 'emote', type: 'string', description: 'The emote to play.' }
            ]
        }
    ];

    public staticFields: IField[] = [];
    
    public staticMethods: IMethod[] = [];
}

export const ShifterClassInstance: ShifterClass = new ShifterClass();
