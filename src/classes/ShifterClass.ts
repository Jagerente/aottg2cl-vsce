import { CharacterClassInstance } from './CharacterClass';
import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class ShifterClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Shifter';
    public description = 'Shifter inherits from Character. Only character owner can modify fields and call functions unless otherwise specified.';

    public extends?: IClass[] = [CharacterClassInstance];

    public instanceFields: IField[] = [
        { parent: this, label: 'Size', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s size.' },
        { parent: this, label: 'DetectRange', type: {name: 'float', typeArguments: []}, description: '(AI) shifter\'s detect range.' },
        { parent: this, label: 'FocusRange', type: {name: 'float', typeArguments: []}, description: '(AI) shifter\'s focus range.' },
        { parent: this, label: 'NapePosition', type: { name: 'Vector3', typeArguments: [] }, description: 'The shifter\'s nape position.' },
        { parent: this, label: 'DeathAnimLength', type: {name: 'float', typeArguments: []}, description: 'The length of the death animation.' },
        { parent: this, label: 'FocusTime', type: {name: 'float', typeArguments: []}, description: '(AI) shifter\'s focus time before switching targets.' },
        { parent: this, label: 'RunSpeedBase', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s base run speed. Final run speed is RunSpeedBase + Size * RunSpeedPerLevel.' },
        { parent: this, label: 'WalkSpeedBase', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s base walk speed. Final walk speed is WalkSpeedBase + Size * WalkSpeedPerLevel.' },
        { parent: this, label: 'RunSpeedPerLevel', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s run speed added per level.' },
        { parent: this, label: 'WalkSpeedPerLevel', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s walk speed added per level.' },
        { parent: this, label: 'TurnSpeed', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s turn speed when running turn animation.' },
        { parent: this, label: 'RotateSpeed', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s rotate speed when rotating body.' },
        { parent: this, label: 'JumpForce', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s jump force when jumping.' },
        { parent: this, label: 'ActionPause', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s pause delay after performing an action.' },
        { parent: this, label: 'AttackPause', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s pause delay after performing an attack.' },
        { parent: this, label: 'TurnPause', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s pause delay after performing a turn.' },
        { parent: this, label: 'FarAttackCooldown', type: {name: 'float', typeArguments: []}, description: '(AI) Shifter\'s cooldown after performing a ranged attack.' },
        { parent: this, label: 'AttackWait', type: {name: 'float', typeArguments: []}, description: '(AI) Shifter\'s wait time between being in range to attack and performing the attack.' },
        { parent: this, label: 'AttackSpeedMultiplier', type: {name: 'float', typeArguments: []}, description: 'Shifter\'s attack animation speed.' },
        { parent: this, label: 'UsePathfinding', type: { name: 'bool', typeArguments: [] }, description: '(AI) Shifter uses pathfinding.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'Blind',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the shifter to enter the blind state.',
            parameters: []
        },
        {
            parent: this,
            label: 'Cripple',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the shifter to enter the cripple state.',
            parameters: []
        },
        {
            parent: this,
            label: 'MoveTo',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the (AI) shifter to move towards a position. If ignoreEnemies is true, will not engage enemies along the way.',
            parameters: [
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The target position to move to.' },
                { name: 'ignoreEnemies', type: { name: 'bool', typeArguments: [] }, description: 'If true, the shifter will ignore enemies along the way.' }
            ]
        },
        {
            parent: this,
            label: 'Target',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the (AI) shifter to target an enemy for focusTime seconds. If focusTime is 0, it will use the default focus time.',
            parameters: [
                { name: 'enemy', type: {name: 'Character', typeArguments: []}, description: 'The enemy to target.' },
                { name: 'focusTime', type: {name: 'float', typeArguments: []}, description: 'The duration to focus on the enemy. Use 0 for default time.' }
            ]
        },
        {
            parent: this,
            label: 'Idle',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the (AI) shifter to idle for time seconds before beginning to wander. During idle, the shifter will not react or move at all.',
            parameters: [
                { name: 'time', type: {name: 'float', typeArguments: []}, description: 'The idle time in seconds.' }
            ]
        },
        {
            parent: this,
            label: 'Wander',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the (AI) shifter to cancel any move commands and begin wandering randomly.',
            parameters: []
        },
        {
            parent: this,
            label: 'Emote',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the shifter to emote.',
            parameters: [
                { name: 'emote', type: {name: 'string', typeArguments: []}, description: 'The emote to play.' }
            ]
        }
    ];

    public staticFields: IField[] = [];
    
    public staticMethods: IMethod[] = [];
}

export const ShifterClassInstance: ShifterClass = new ShifterClass();
