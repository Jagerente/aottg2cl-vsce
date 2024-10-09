import { IClass, IMethod, ClassKinds, IField } from './IClass';

export class BaseMainClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'BaseMain';
    public description = 'Base class providing core callback functions available to both Main class and component classes.';

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    constructor(initReturnType: string) {
        this.instanceMethods = [
            {
                label: 'Init',
                returnType: initReturnType,
                description: 'Called upon class creation.',
                parameters: []
            },
            {
                label: 'OnGameStart',
                returnType: 'void',
                description: 'Called upon game start.',
                parameters: []
            },
            {
                label: 'OnTick',
                returnType: 'void',
                description: 'Called every fixed update frame (0.02 seconds).',
                parameters: []
            },
            {
                label: 'OnFrame',
                returnType: 'void',
                description: 'Called every update frame.',
                parameters: []
            },
            {
                label: 'OnLateFrame',
                returnType: 'void',
                description: 'Called after every update frame.',
                parameters: []
            },
            {
                label: 'OnSecond',
                returnType: 'void',
                description: 'Called every second.',
                parameters: []
            },
            {
                label: 'OnChatInput',
                returnType: 'void',
                description: 'Called upon chat input from the player.',
                parameters: [
                    { name: 'message', type: 'string', description: 'The chat message entered by the player.', isOptional: false, isVariadic: false }
                ]
            },
            {
                label: 'OnPlayerSpawn',
                returnType: 'void',
                description: 'Called upon any player spawning.',
                parameters: [
                    { name: 'player', type: 'Player', description: 'The player that has spawned.', isOptional: false, isVariadic: false },
                    { name: 'character', type: 'Character', description: 'The character associated with the player.', isOptional: false, isVariadic: false }
                ]
            },
            {
                label: 'OnCharacterSpawn',
                returnType: 'void',
                description: 'Called upon any character spawning.',
                parameters: [
                    { name: 'character', type: 'Character', description: 'The character that has spawned.', isOptional: false, isVariadic: false }
                ]
            },
            {
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
                label: 'OnPlayerJoin',
                returnType: 'void',
                description: 'Called upon a player joining the room.',
                parameters: [
                    { name: 'player', type: 'Player', description: 'The player that has joined.', isOptional: false, isVariadic: false }
                ]
            },
            {
                label: 'OnPlayerLeave',
                returnType: 'void',
                description: 'Called upon a player leaving the room.',
                parameters: [
                    { name: 'player', type: 'Player', description: 'The player that has left.', isOptional: false, isVariadic: false }
                ]
            },
            {
                label: 'OnNetworkMessage',
                returnType: 'void',
                description: 'Called upon receiving a network message.',
                parameters: [
                    { name: 'sender', type: 'Player', description: 'The player who sent the message.', isOptional: false, isVariadic: false },
                    { name: 'message', type: 'string', description: 'The content of the network message.', isOptional: false, isVariadic: false }
                ]
            },
            {
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
