import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class NetworkClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Network';
    public description = 'Networking functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [
        { parent: this, label: 'IsMasterClient', type: { name: 'bool', typeArguments: [] }, description: 'Indicates if the current player is the master client.' },
        { parent: this, label: 'Players', type: {name: 'List', typeArguments: [{name: 'Player', typeArguments: []}]}, description: 'List of all players in the room.' },
        { parent: this, label: 'MasterClient', type: {name: 'Player', typeArguments: []}, description: 'The current master client.' },
        { parent: this, label: 'MyPlayer', type: {name: 'Player', typeArguments: []}, description: 'The player object representing yourself.' },
        { parent: this, label: 'NetworkTime', type: {name: 'float', typeArguments: []}, description: 'The current photon network time. This will probably be different from the Game time.' }
    ];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'SendMessage',
            returnType: {name: 'void', typeArguments: []},
            description: 'Send a network message to the target player. This will be received in the OnNetworkMessage callback in Main.',
            parameters: [
                { name: 'target', type: {name: 'Player', typeArguments: []}, description: 'The target player to send the message to.' },
                { name: 'message', type: {name: 'string', typeArguments: []}, description: 'The message to send.' }
            ]
        },
        {
            parent: this,
            label: 'SendMessageAll',
            returnType: {name: 'void', typeArguments: []},
            description: 'Send a network message to all players including yourself.',
            parameters: [
                { name: 'message', type: {name: 'string', typeArguments: []}, description: 'The message to send.' }
            ]
        },
        {
            parent: this,
            label: 'SendMessageOthers',
            returnType: {name: 'void', typeArguments: []},
            description: 'Send a network message to all players excluding yourself.',
            parameters: [
                { name: 'message', type: {name: 'string', typeArguments: []}, description: 'The message to send.' }
            ]
        },
        {
            parent: this,
            label: 'GetTimestampDifference',
            returnType: {name: 'float', typeArguments: []},
            description: 'Compute the wrapped timestamp difference from photon events. Used to determine delay.',
            parameters: [
                { name: 't1', type: {name: 'float', typeArguments: []}, description: 'The first timestamp.' },
                { name: 't2', type: {name: 'float', typeArguments: []}, description: 'The second timestamp.' }
            ]
        },
        {
            parent: this,
            label: 'KickPlayer',
            returnType: {name: 'void', typeArguments: []},
            description: 'Kick the player via ID or Player object from the room, only callable by the host.',
            parameters: [
                { name: 'player', type: {name: 'Player | int', typeArguments: []}, description: 'The player object or ID to kick.' },
                { name: 'reason', type: {name: 'string', typeArguments: []}, description: 'Optional reason for kicking the player.', isOptional: true }
            ]
        }        
    ];
}

export const NetworkClassInstance: NetworkClass = new NetworkClass();
