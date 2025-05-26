import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class NetworkClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Network';
    public description = 'Networking functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [
        { parent: this, label: 'IsMasterClient', type: 'bool', description: 'Indicates if the current player is the master client.' },
        { parent: this, label: 'Players', type: 'List(Player)', description: 'List of all players in the room.' },
        { parent: this, label: 'MasterClient', type: 'Player', description: 'The current master client.' },
        { parent: this, label: 'MyPlayer', type: 'Player', description: 'The player object representing yourself.' },
        { parent: this, label: 'NetworkTime', type: 'float', description: 'The current photon network time. This will probably be different from the Game time.' }
    ];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'SendMessage',
            returnType: 'null',
            description: 'Send a network message to the target player. This will be received in the OnNetworkMessage callback in Main.',
            parameters: [
                { name: 'target', type: 'Player', description: 'The target player to send the message to.' },
                { name: 'message', type: 'string', description: 'The message to send.' }
            ]
        },
        {
            parent: this,
            label: 'SendMessageAll',
            returnType: 'null',
            description: 'Send a network message to all players including yourself.',
            parameters: [
                { name: 'message', type: 'string', description: 'The message to send.' }
            ]
        },
        {
            parent: this,
            label: 'SendMessageOthers',
            returnType: 'null',
            description: 'Send a network message to all players excluding yourself.',
            parameters: [
                { name: 'message', type: 'string', description: 'The message to send.' }
            ]
        },
        {
            parent: this,
            label: 'GetTimestampDifference',
            returnType: 'float',
            description: 'Compute the wrapped timestamp difference from photon events. Used to determine delay.',
            parameters: [
                { name: 't1', type: 'float', description: 'The first timestamp.' },
                { name: 't2', type: 'float', description: 'The second timestamp.' }
            ]
        },
        {
            parent: this,
            label: 'KickPlayer',
            returnType: 'null',
            description: 'Kick the player via ID or Player object from the room, only callable by the host.',
            parameters: [
                { name: 'player', type: 'Player | int', description: 'The player object or ID to kick.' },
                { name: 'reason', type: 'string', description: 'Optional reason for kicking the player.', isOptional: true }
            ]
        }        
    ];
}

export const NetworkClassInstance: NetworkClass = new NetworkClass();
