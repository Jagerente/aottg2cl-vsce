import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class StringClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'String';
    public description = 'String manipulation functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [
        { parent: this, label: 'Newline', type: {name: 'string', typeArguments: []}, description: 'Returns the newline character.' },
    ];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'FormatFloat',
            returnType: {name: 'string', typeArguments: []},
            description: 'Format the float to a specific number of decimal places.',
            parameters: [
                { name: 'num', type: {name: 'float', typeArguments: []}, description: 'The float number to format.' },
                { name: 'decimals', type: {name: 'int', typeArguments: []}, description: 'The number of decimal places to format to.' }
            ]
        },
        {
            parent: this,
            label: 'FormatFromList',
            returnType: {name: 'string', typeArguments: []},
            description: 'Equivalent to C# string.format(string, List<string>).',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to format.' },
                { name: 'formatter', type: {name: 'List', typeArguments: [{name: 'string', typeArguments: []}]}, description: 'The list of formatting values.' }
            ]
        },
        {
            parent: this,
            label: 'Split',
            returnType: {name: 'List', typeArguments: [{name: 'string', typeArguments: []}]},
            description: 'Split the string into a list. Can pass in either a string to split on or a list of strings to split on, the last optional param can remove all empty entries.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to split.' },
                { name: 'splitter', type: {name: 'string | List<string>', typeArguments: []}, description: 'The string or list of strings to split on.' },
                { name: 'removeEmpty', type: { name: 'bool', typeArguments: [] }, description: 'If true, removes empty entries.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'Join',
            returnType: {name: 'string', typeArguments: []},
            description: 'Join the list into a string.',
            parameters: [
                { name: 'value', type: {name: 'List', typeArguments: [{name: 'string', typeArguments: []}]}, description: 'The list of strings to join.' },
                { name: 'separator', type: {name: 'string', typeArguments: []}, description: 'The separator used to join the strings.' }
            ]
        },
        {
            parent: this,
            label: 'Substring',
            returnType: {name: 'string', typeArguments: []},
            description: 'Get a substring from the given startIndex.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to get the substring from.' },
                { name: 'startIndex', type: {name: 'int', typeArguments: []}, description: 'The starting index of the substring.' }
            ]
        },
        {
            parent: this,
            label: 'SubstringWithLength',
            returnType: {name: 'string', typeArguments: []},
            description: 'Get a substring from the given startIndex with the specified length.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to get the substring from.' },
                { name: 'startIndex', type: {name: 'int', typeArguments: []}, description: 'The starting index of the substring.' },
                { name: 'length', type: {name: 'int', typeArguments: []}, description: 'The length of the substring.' }
            ]
        },
        {
            parent: this,
            label: 'Length',
            returnType: {name: 'int', typeArguments: []},
            description: 'Get the length of the string.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to get the length of.' }
            ]
        },
        {
            parent: this,
            label: 'Replace',
            returnType: {name: 'string', typeArguments: []},
            description: 'Replace all matches in the string with the replacement.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to perform the replacement on.' },
                { name: 'match', type: {name: 'string', typeArguments: []}, description: 'The string to match and replace.' },
                { name: 'with', type: {name: 'string', typeArguments: []}, description: 'The replacement string.' }
            ]
        },
        {
            parent: this,
            label: 'Contains',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Check if the string contains the match.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to check.' },
                { name: 'match', type: {name: 'string', typeArguments: []}, description: 'The string to find.' }
            ]
        },
        {
            parent: this,
            label: 'StartsWith',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Check if the string starts with the match.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to check.' },
                { name: 'match', type: {name: 'string', typeArguments: []}, description: 'The string to check the start against.' }
            ]
        },
        {
            parent: this,
            label: 'EndsWith',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Check if the string ends with the match.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to check.' },
                { name: 'match', type: {name: 'string', typeArguments: []}, description: 'The string to check the end against.' }
            ]
        },
        {
            parent: this,
            label: 'Trim',
            returnType: {name: 'string', typeArguments: []},
            description: 'Trim all whitespace from the start and end of the string.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to trim.' }
            ]
        },
        {
            parent: this,
            label: 'Insert',
            returnType: {name: 'string', typeArguments: []},
            description: 'Insert a string at a given index.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The original string.' },
                { name: 'insert', type: {name: 'string', typeArguments: []}, description: 'The string to insert.' },
                { name: 'index', type: {name: 'int', typeArguments: []}, description: 'The index to insert at.' }
            ]
        },
        {
            parent: this,
            label: 'Capitalize',
            returnType: {name: 'string', typeArguments: []},
            description: 'Capitalizes the first letter of the string.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to capitalize.' }
            ]
        },
        {
            parent: this,
            label: 'ToUpper',
            returnType: {name: 'string', typeArguments: []},
            description: 'Converts the string to upper case.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to convert.' }
            ]
        },
        {
            parent: this,
            label: 'ToLower',
            returnType: {name: 'string', typeArguments: []},
            description: 'Converts the string to lower case.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to convert.' }
            ]
        },
        {
            parent: this,
            label: 'IndexOf',
            returnType: {name: 'int', typeArguments: []},
            description: 'Returns the index of the given string.',
            parameters: [
                { name: 'value', type: {name: 'string', typeArguments: []}, description: 'The string to search.' },
                { name: 'item', type: {name: 'string', typeArguments: []}, description: 'The substring to find.' }
            ]
        }
    ];
}

export const StringClassInstance: StringClass = new StringClass();
