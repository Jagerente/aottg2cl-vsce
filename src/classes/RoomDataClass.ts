import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class RoomDataClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'RoomData';
    public description = 'Store and retrieve room variables. Room data is cleared upon joining or creating a new lobby and does not reset between game rounds. Supports float, string, bool, and int types.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'SetProperty',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the property with given name to the object value. Valid value types are float, string, bool, and int.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the property.' },
                { name: 'value', type: {name: 'Object', typeArguments: []}, description: 'The value to set. Can be float, string, bool, or int.' }
            ]
        },
        {
            parent: this,
            label: 'GetProperty',
            returnType: {name: 'Object', typeArguments: []},
            description: 'Gets the property with given name. If the property does not exist, returns the defaultValue.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the property.' },
                { name: 'defaultValue', type: {name: 'Object', typeArguments: []}, description: 'The default value to return if the property does not exist.' }
            ]
        },
        {
            parent: this,
            label: 'Clear',
            returnType: {name: 'void', typeArguments: []},
            description: 'Clears all room data.',
            parameters: []
        }
    ];
}

export const RoomDataClassInstance: RoomDataClass = new RoomDataClass();
