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
        { label: 'MyPlayer', type: 'Player', description: 'The player object representing yourself.' }
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
        }
    ];
}

export const NetworkClassInstance: NetworkClass = new NetworkClass();
