import { IClass, IField, IMethod } from './IClass';

export class PersistentDataClass implements IClass {
    public name = 'PersistentData';
    public description = 'Store and retrieve persistent data. Persistent data can be saved and loaded from file. Supports float, int, string, and bool types.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            label: 'SetProperty',
            returnType: 'null',
            description: 'Sets the property with given name to the object value. Valid value types are float, string, bool, and int.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the property.' },
                { name: 'value', type: 'object', description: 'The value to set. Can be float, string, bool, or int.' }
            ]
        },
        {
            label: 'GetProperty',
            returnType: 'object',
            description: 'Gets the property with given name. If the property does not exist, returns the defaultValue.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the property.' },
                { name: 'defaultValue', type: 'object', description: 'The default value to return if the property does not exist.' }
            ]
        },
        {
            label: 'Clear',
            returnType: 'null',
            description: 'Clears current persistent data.',
            parameters: []
        },
        {
            label: 'SaveToFile',
            returnType: 'null',
            description: 'Saves current persistent data to the given file name. If encrypted is true, will also encrypt the file instead of using plaintext.',
            parameters: [
                { name: 'fileName', type: 'string', description: 'The file name to save the data to.' },
                { name: 'encrypted', type: 'bool', description: 'Whether to encrypt the file.' }
            ]
        },
        {
            label: 'LoadFromFile',
            returnType: 'null',
            description: 'Loads persistent data from the given file name. If encrypted is true, will treat the file as having been saved as encrypted.',
            parameters: [
                { name: 'fileName', type: 'string', description: 'The file name to load the data from.' },
                { name: 'encrypted', type: 'bool', description: 'Whether the file is encrypted.' }
            ]
        },
        {
            label: 'IsValidFileName',
            returnType: 'bool',
            description: 'Determines whether or not the given fileName is valid for use when saving/loading a file.',
            parameters: [
                { name: 'fileName', type: 'string', description: 'The file name to validate.' }
            ]
        },
        {
            label: 'FileExists',
            returnType: 'bool',
            description: 'Determines whether the file already exists. Throws an error if given an invalid file name.',
            parameters: [
                { name: 'fileName', type: 'string', description: 'The file name to check.' }
            ]
        }
    ];
}
