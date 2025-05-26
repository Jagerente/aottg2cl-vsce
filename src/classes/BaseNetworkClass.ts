import { IClass, IMethod, ClassKinds, IField } from './IClass';

export class BaseNetworkClass implements IClass {
    public kind = ClassKinds.COMPONENT;
    public name = 'BaseNetwork';
    public description = 'Base class for network-related callbacks, only available if the attached MapObject has the "Networked" option enabled in the map editor.';

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'OnNetworkTransfer',
            returnType: 'void',
            description: 'Called upon the NetworkView changing ownership.',
            parameters: [
                { name: 'oldOwner', type: 'Player', description: 'The previous owner of the NetworkView.', isOptional: false, isVariadic: false },
                { name: 'newOwner', type: 'Player', description: 'The new owner of the NetworkView.', isOptional: false, isVariadic: false }
            ]
        },
        {
            parent: this,
            label: 'SendNetworkStream',
            returnType: 'void',
            description: 'Called every frame for the owner. You can send a series of data using self.NetworkView.SendStream.',
            parameters: []
        },
        {
            parent: this,
            label: 'OnNetworkStream',
            returnType: 'void',
            description: 'Called every frame for non-owner observers. You can receive data using self.NetworkView.ReceiveStream.',
            parameters: []
        },
        {
            parent: this,
            label: 'OnNetworkMessage',
            returnType: 'void',
            description: 'Called upon receiving a self.NetworkView.SendMessage call.',
            parameters: [
                { name: 'sender', type: 'Player', description: 'The player who sent the message.', isOptional: false, isVariadic: false },
                { name: 'message', type: 'string', description: 'The message received.', isOptional: false, isVariadic: false }
            ]
        }
    ];
}

export const BaseNetworkClassInstance: BaseNetworkClass = new BaseNetworkClass();
