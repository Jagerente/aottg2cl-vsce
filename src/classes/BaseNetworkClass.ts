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
            returnType: {name: 'void', typeArguments: []},
            description: 'Called upon the NetworkView changing ownership.',
            parameters: [
                { name: 'oldOwner', type: {name: 'Player', typeArguments: []}, description: 'The previous owner of the NetworkView.', isOptional: false, isVariadic: false },
                { name: 'newOwner', type: {name: 'Player', typeArguments: []}, description: 'The new owner of the NetworkView.', isOptional: false, isVariadic: false }
            ]
        },
        {
            parent: this,
            label: 'SendNetworkStream',
            returnType: {name: 'void', typeArguments: []},
            description: 'Called every frame for the owner. You can send a series of data using self.NetworkView.SendStream.',
            parameters: []
        },
        {
            parent: this,
            label: 'OnNetworkStream',
            returnType: {name: 'void', typeArguments: []},
            description: 'Called every frame for non-owner observers. You can receive data using self.NetworkView.ReceiveStream.',
            parameters: []
        },
        {
            parent: this,
            label: 'OnNetworkMessage',
            returnType: {name: 'void', typeArguments: []},
            description: 'Called upon receiving a self.NetworkView.SendMessage call.',
            parameters: [
                { name: 'sender', type: {name: 'Player', typeArguments: []}, description: 'The player who sent the message.', isOptional: false, isVariadic: false },
                { name: 'message', type: {name: 'string', typeArguments: []}, description: 'The message received.', isOptional: false, isVariadic: false }
            ]
        }
    ];
}

export const BaseNetworkClassInstance: BaseNetworkClass = new BaseNetworkClass();
