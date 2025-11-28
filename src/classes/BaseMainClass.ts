import { BaseInstantiatableClass } from './BaseInstantiatableClass';
import { IClass, IMethod, ClassKinds, IField, MethodKinds } from './IClass';

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
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon game start.',
                parameters: []
            },
            {
                parent: this,
                label: 'OnTick',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called every fixed update frame (0.02 seconds).',
                parameters: []
            },
            {
                parent: this,
                label: 'OnFrame',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called every update frame.',
                parameters: []
            },
            {
                parent: this,
                label: 'OnLateFrame',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called after every update frame.',
                parameters: []
            },
            {
                parent: this,
                label: 'OnSecond',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called every second.',
                parameters: []
            },
            {
                parent: this,
                label: 'OnChatInput',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon chat input from the player.',
                parameters: [
                    { name: 'message', type: {name: 'string', typeArguments: []}, description: 'The chat message entered by the player.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnPlayerSpawn',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon any player spawning. Return false to skip printing to chat.',
                parameters: [
                    { name: 'player', type: {name: 'Player', typeArguments: []}, description: 'The player that has spawned.', isOptional: false, isVariadic: false },
                    { name: 'character', type: {name: 'Character', typeArguments: []}, description: 'The character associated with the player.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnCharacterSpawn',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon any character spawning.',
                parameters: [
                    { name: 'character', type: {name: 'Character', typeArguments: []}, description: 'The character that has spawned.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnCharacterReloaded',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon any character being reloaded (changing weapon/character model at gas).',
                parameters: [
                    { name: 'character', type: {name: 'Character', typeArguments: []}, description: 'The character that are being reloaded.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnCharacterDie',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon a character dying. Killer may be null.',
                parameters: [
                    { name: 'victim', type: {name: 'Character', typeArguments: []}, description: 'The character that died.', isOptional: false, isVariadic: false },
                    { name: 'killer', type: {name: 'Character', typeArguments: []}, description: 'The killer character, may be null.', isOptional: false, isVariadic: false },
                    { name: 'killerName', type: {name: 'string', typeArguments: []}, description: 'The name of the killer.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnCharacterDamaged',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon a character being damaged. Killer may be null.',
                parameters: [
                    { name: 'victim', type: {name: 'Character', typeArguments: []}, description: 'The character that was damaged.', isOptional: false, isVariadic: false },
                    { name: 'killer', type: {name: 'Character', typeArguments: []}, description: 'The character causing the damage.', isOptional: false, isVariadic: false },
                    { name: 'killerName', type: {name: 'string', typeArguments: []}, description: 'The name of the killer.', isOptional: false, isVariadic: false },
                    { name: 'damage', type: {name: 'int', typeArguments: []}, description: 'Amount of damage dealt.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnPlayerJoin',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon a player joining the room.',
                parameters: [
                    { name: 'player', type: {name: 'Player', typeArguments: []}, description: 'The player that has joined.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnPlayerLeave',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon a player leaving the room.',
                parameters: [
                    { name: 'player', type: {name: 'Player', typeArguments: []}, description: 'The player that has left.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnNetworkMessage',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon receiving a network message.',
                parameters: [
                    { name: 'sender', type: {name: 'Player', typeArguments: []}, description: 'The player who sent the message.', isOptional: false, isVariadic: false },
                    { name: 'message', type: {name: 'string', typeArguments: []}, description: 'The content of the network message.', isOptional: false, isVariadic: false }
                ]
            },
            {
                parent: this,
                label: 'OnButtonClick',
                kind: MethodKinds.FUNCTION,
                returnType: {name: 'void', typeArguments: []},
                description: 'Called upon a UI button being pressed.',
                parameters: [
                    { name: 'buttonName', type: {name: 'string', typeArguments: []}, description: 'The name of the button pressed.', isOptional: false, isVariadic: false }
                ]
            }
        ];
    }
}
