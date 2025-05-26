import { CharacterClassInstance } from './CharacterClass';
import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class TitanClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Titan';
    public description = 'Titan inherits from Character. Only character owner can modify fields and call functions unless otherwise specified.';

    public extends?: IClass[] = [CharacterClassInstance];
    
    public instanceFields: IField[] = [
        { parent: this, label: 'Size', type: {name: 'float', typeArguments: []}, description: 'Titan\'s size.' },
        { parent: this, label: 'DetectRange', type: {name: 'float', typeArguments: []}, description: '(AI) titan\'s detect range.' },
        { parent: this, label: 'FocusRange', type: {name: 'float', typeArguments: []}, description: '(AI) titan\'s focus range.' },
        { parent: this, label: 'NapePosition', type: { name: 'Vector3', typeArguments: [] }, description: 'The titan\'s nape position.' },
        { parent: this, label: 'IsCrawler', type: { name: 'bool', typeArguments: [] }, description: 'Is titan a crawler.' },
        { parent: this, label: 'UsePathfinding', type: { name: 'bool', typeArguments: [] }, description: 'Determines whether the (AI) titan uses pathfinding (Smart Movement in titan settings).' },
        { parent: this, label: 'FocusTime', type: {name: 'float', typeArguments: []}, description: '(AI) titan\'s focus time.' },
        { parent: this, label: 'RunSpeedBase', type: {name: 'float', typeArguments: []}, description: 'Titan\'s base run speed. Final run speed is RunSpeedBase + Size * RunSpeedPerLevel.' },
        { parent: this, label: 'WalkSpeedBase', type: {name: 'float', typeArguments: []}, description: 'Titan\'s base walk speed. Final walk speed is WalkSpeedBase + Size * WalkSpeedPerLevel.' },
        { parent: this, label: 'RunSpeedPerLevel', type: {name: 'float', typeArguments: []}, description: 'Titan\'s run speed added per size.' },
        { parent: this, label: 'WalkSpeedPerLevel', type: {name: 'float', typeArguments: []}, description: 'Titan\'s walk speed added per size.' },
        { parent: this, label: 'TurnSpeed', type: {name: 'float', typeArguments: []}, description: 'Titan\'s turn animation speed.' },
        { parent: this, label: 'RotateSpeed', type: {name: 'float', typeArguments: []}, description: 'Titan\'s rotate speed.' },
        { parent: this, label: 'JumpForce', type: {name: 'float', typeArguments: []}, description: 'Titan\'s jump force.' },
        { parent: this, label: 'ActionPause', type: {name: 'float', typeArguments: []}, description: 'Titan\'s pause delay after performing an action.' },
        { parent: this, label: 'AttackPause', type: {name: 'float', typeArguments: []}, description: 'Titan\'s pause delay after performing an attack.' },
        { parent: this, label: 'TurnPause', type: {name: 'float', typeArguments: []}, description: 'Titan\'s pause delay after performing a turn.' },
        { parent: this, label: 'FarAttackCooldown', type: {name: 'float', typeArguments: []}, description: '(AI) Titan\'s cooldown after performing a ranged attack.' },
        { parent: this, label: 'AttackWait', type: {name: 'float', typeArguments: []}, description: '(AI) Titan\'s wait time between being in range and performing an attack.' },
        { parent: this, label: 'CanRun', type: { name: 'bool', typeArguments: [] }, description: '(AI) Titan can run or only walk.' },
        { parent: this, label: 'AttackSpeedMultiplier', type: {name: 'float', typeArguments: []}, description: 'Titan\'s attack animation speed.' },
        { parent: this, label: 'HeadMount', type: {name: 'Transform', typeArguments: []}, description: 'Titan\'s head transform.' },
        { parent: this, label: 'NeckMount', type: {name: 'Transform', typeArguments: []}, description: 'Titan\'s neck transform.' },
        { parent: this, label: 'Stamina', type: {name: 'float', typeArguments: []}, description: 'PT Stamina.' },
        { parent: this, label: 'MaxStamina', type: {name: 'float', typeArguments: []}, description: 'PT Max Stamina.' },

    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'Blind',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the titan to enter the blind state.',
            parameters: []
        },
        {
            parent: this,
            label: 'Cripple',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the titan to enter the cripple state for time seconds. Using 0 will use the default cripple time.',
            parameters: [
                { name: 'time', type: {name: 'float', typeArguments: []}, description: 'Duration of the cripple state. Use 0 for default time.' }
            ]
        },
        {
            parent: this,
            label: 'MoveTo',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the (AI) titan to move towards a position and stop when within a specified range. If ignoreEnemies is true, the titan will not engage enemies along the way.',
            parameters: [
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The target position to move to.' },
                { name: 'range', type: {name: 'float', typeArguments: []}, description: 'The range within which the titan will stop.' },
                { name: 'ignoreEnemies', type: { name: 'bool', typeArguments: [] }, description: 'If true, the titan will ignore enemies along the way.' }
            ]
        },
        {
            parent: this,
            label: 'Target',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the (AI) titan to target an enemy for focusTime seconds. If focusTime is 0, it will use the default focus time.',
            parameters: [
                { name: 'enemy', type: {name: 'Character', typeArguments: []}, description: 'The enemy to target.' },
                { name: 'focusTime', type: {name: 'float', typeArguments: []}, description: 'The duration to focus on the enemy. Use 0 for default time.' }
            ]
        },
        {
            parent: this,
            label: 'Idle',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the (AI) titan to idle for time seconds before beginning to wander. During idle, the titan will not react or move at all.',
            parameters: [
                { name: 'time', type: {name: 'float', typeArguments: []}, description: 'The idle time in seconds.' }
            ]
        },
        {
            parent: this,
            label: 'Wander',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the (AI) titan to cancel any move commands and begin wandering randomly.',
            parameters: []
        },
        {
            parent: this,
            label: 'Emote',
            returnType: {name: 'void', typeArguments: []},
            description: 'Causes the titan to emote.',
            parameters: [
                { name: 'emote', type: {name: 'string', typeArguments: []}, description: 'The emote to play.' }
            ]
        }
    ];

    public staticFields: IField[] = [];
    
    public staticMethods: IMethod[] = [];
}

export const TitanClassInstance: TitanClass = new TitanClass();
