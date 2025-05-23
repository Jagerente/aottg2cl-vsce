import { ClassKinds, IClass, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class NetworkViewClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'NetworkView';
    public description = 'Represents a network view on a map object that has the "networked" flag.';

    public extends?: IClass[] = [ObjectClassInstance];
    
    public instanceFields: IField[] = [
        { label: 'Owner', type: 'Player', description: 'The network view\'s owner.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'Transfer',
            returnType: 'null',
            description: 'Transfer ownership of this NetworkView to another player. Owner only.',
            parameters: [
                { name: 'target', type: 'Player', description: 'The player to transfer ownership to.' }
            ]
        },
        {
            label: 'SendMessage',
            returnType: 'null',
            description: 'Send a message to a target player. This will be received in any of the attached components through the OnNetworkMessage callback.',
            parameters: [
                { name: 'target', type: 'Player', description: 'The target player to send the message to.' },
                { name: 'message', type: 'string', description: 'The message to send.' }
            ]
        },
        {
            label: 'SendMessageAll',
            returnType: 'null',
            description: 'Send a message to all players including myself.',
            parameters: [
                { name: 'message', type: 'string', description: 'The message to send to all players.' }
            ]
        },
        {
            label: 'SendMessageOthers',
            returnType: 'null',
            description: 'Send a message to players excluding myself.',
            parameters: [
                { name: 'message', type: 'string', description: 'The message to send to other players.' }
            ]
        },
        {
            label: 'SendStream',
            returnType: 'null',
            description: 'Send an object to the network sync stream. This represents sending data from the object owner to all non-owner observers, and should only be called in the SendNetworkStream callback in the attached component. It only works with some object types: primitives and Vector3.',
            parameters: [
                { name: 'item', type: 'Object', description: 'The object to send through the network stream.' }
            ]
        },
        {
            label: 'ReceiveStream',
            returnType: 'Object',
            description: 'Receive an object through the network sync stream. This represents receiving data from the object owner as a non-owner observer, and should only be called in the OnNetworkStream callback.',
            parameters: []
        }
    ];

    public staticFields: IField[] = [];
    
    public staticMethods: IMethod[] = [];
}

export const NetworkViewClassInstance: NetworkViewClass = new NetworkViewClass();
