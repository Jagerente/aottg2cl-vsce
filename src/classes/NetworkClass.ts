import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class NetworkClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Network';
    public description = 'Networking functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [
        { label: 'IsMasterClient', type: 'bool', description: 'Indicates if the current player is the master client.' },
        { label: 'Players', type: 'List(Player)', description: 'List of all players in the room.' },
        { label: 'MasterClient', type: 'Player', description: 'The current master client.' },
        { label: 'MyPlayer', type: 'Player', description: 'The player object representing yourself.' },
        { label: 'NetworkTime', type: 'float', description: 'The current photon network time. This will probably be different from the Game time.' }
    ];

    public staticMethods: IMethod[] = [
        {
            label: 'SendMessage',
            returnType: 'null',
            description: 'Send a network message to the target player. This will be received in the OnNetworkMessage callback in Main.',
            parameters: [
                { name: 'target', type: 'Player', description: 'The target player to send the message to.' },
                { name: 'message', type: 'string', description: 'The message to send.' }
            ]
        },
        {
            label: 'SendMessageAll',
            returnType: 'null',
            description: 'Send a network message to all players including yourself.',
            parameters: [
                { name: 'message', type: 'string', description: 'The message to send.' }
            ]
        },
        {
            label: 'SendMessageOthers',
            returnType: 'null',
            description: 'Send a network message to all players excluding yourself.',
            parameters: [
                { name: 'message', type: 'string', description: 'The message to send.' }
            ]
        },
        {
            label: 'GetTimestampDifference',
            returnType: 'float',
            description: 'Compute the wrapped timestamp difference from photon events. Used to determine delay.',
            parameters: [
                { name: 't1', type: 'float', description: 'The first timestamp.' },
                { name: 't2', type: 'float', description: 'The second timestamp.' }
            ]
        },
        {
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
