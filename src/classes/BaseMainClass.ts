import { BaseInstantiatableClass } from './BaseInstantiatableClass';
import { IClass, IMethod, ClassKinds, IField } from './IClass';

export class BaseMainClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'BaseMain';
    public description = 'Base class providing core callback functions available to both Main class and component classes.';

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    public extends?: IClass[] = [];

    constructor() {
        this.extends = [new BaseInstantiatableClass()];
        this.instanceMethods = [
            {
                parent: this,
                label: 'OnGameStart',
                returnType: 'void',
                description: 'Called upon game start.',
                parameters: []
            },
            {
                parent: this,
                label: 'OnTick',
                returnType: 'void',
                description: 'Called every fixed update frame (0.02 seconds).',
                parameters: []
            },
            {
                parent: this,
                label: 'OnFrame',
                returnType: 'void',
                description: 'Called every update frame.',
                parameters: []
            },
            {
                parent: this,
                label: 'OnLateFrame',
                returnType: 'void',
                description: 'Called after every update frame.',
                parameters: []
            },
            {
                parent: this,
                label: 'OnSecond',
                returnType: 'void',
                description: 'Called every second.',
                parameters: []
            },
            {
                parent: this,
                label: 'OnChatInput',
                returnType: 'void',
                description: 'Called upon chat input from the player.',
                parameters: [
                    { name: 'message', type: 'string', description: 'The chat message entered by the player.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnPlayerSpawn',
                returnType: 'void',
                description: 'Called upon any player spawning. Return false to skip printing to chat.',
                parameters: [
                    { name: 'player', type: 'Player', description: 'The player that has spawned.', isOptional: false, isVariadic: false },
                    { name: 'character', type: 'Character', description: 'The character associated with the player.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnCharacterSpawn',
                returnType: 'void',
                description: 'Called upon any character spawning.',
                parameters: [
                    { name: 'character', type: 'Character', description: 'The character that has spawned.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnCharacterDie',
                returnType: 'void',
                description: 'Called upon a character dying. Killer may be null.',
                parameters: [
                    { name: 'victim', type: 'Character', description: 'The character that died.', isOptional: false, isVariadic: false },
                    { name: 'killer', type: 'Character', description: 'The killer character, may be null.', isOptional: false, isVariadic: false },
                    { name: 'killerName', type: 'string', description: 'The name of the killer.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnCharacterDamaged',
                returnType: 'void',
                description: 'Called upon a character being damaged. Killer may be null.',
                parameters: [
                    { name: 'victim', type: 'Character', description: 'The character that was damaged.', isOptional: false, isVariadic: false },
                    { name: 'killer', type: 'Character', description: 'The character causing the damage.', isOptional: false, isVariadic: false },
                    { name: 'killerName', type: 'string', description: 'The name of the killer.', isOptional: false, isVariadic: false },
                    { name: 'damage', type: 'Int', description: 'Amount of damage dealt.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnPlayerJoin',
                returnType: 'void',
                description: 'Called upon a player joining the room.',
                parameters: [
                    { name: 'player', type: 'Player', description: 'The player that has joined.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnPlayerLeave',
                returnType: 'void',
                description: 'Called upon a player leaving the room.',
                parameters: [
                    { name: 'player', type: 'Player', description: 'The player that has left.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnNetworkMessage',
                returnType: 'void',
                description: 'Called upon receiving a network message.',
                parameters: [
                    { name: 'sender', type: 'Player', description: 'The player who sent the message.', isOptional: false, isVariadic: false },
                    { name: 'message', type: 'string', description: 'The content of the network message.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnButtonClick',
                returnType: 'void',
                description: 'Called upon a UI button being pressed.',
                parameters: [
                    { name: 'buttonName', type: 'string', description: 'The name of the button pressed.', isOptional: false, isVariadic: false }
                ]
            }
        ];
    }
}
