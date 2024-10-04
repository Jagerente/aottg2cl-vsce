import { IClass, IField, IMethod } from './IClass';

export class JsonClass implements IClass {
    public name = 'Json';
    public description = 'Serializes and deserializes primitive and struct values from and to JSON strings. Supports float, int, string, bool, Vector3, Quaternion, Color, Dict, and List.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            label: 'LoadFromString',
            returnType: 'object',
            description: 'Deserializes the object from a JSON string.',
            parameters: [
                { name: 'value', type: 'string', description: 'The JSON string to deserialize.' }
            ]
        },
        {
            label: 'SaveToString',
            returnType: 'string',
            description: 'Serializes the object to a JSON string.',
            parameters: [
                { name: 'value', type: 'object', description: 'The object to serialize.' }
            ]
        }
    ];
}
