import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class StringClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'String';
    public description = 'String manipulation functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [
        { label: 'Newline', type: 'string', description: 'Returns the newline character.' },
    ];

    public staticMethods: IMethod[] = [
        {
            label: 'FormatFloat',
            returnType: 'string',
            description: 'Format the float to a specific number of decimal places.',
            parameters: [
                { name: 'num', type: 'float', description: 'The float number to format.' },
                { name: 'decimals', type: 'int', description: 'The number of decimal places to format to.' }
            ]
        },
        {
            label: 'FormatFromList',
            returnType: 'string',
            description: 'Equivalent to C# string.format(string, List<string>).',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to format.' },
                { name: 'formatter', type: 'list', description: 'The list of formatting values.' }
            ]
        },
        {
            label: 'Split',
            returnType: 'List(string)',
            description: 'Split the string into a list. Can pass in either a string to split on or a list of strings to split on, the last optional param can remove all empty entries.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to split.' },
                { name: 'splitter', type: 'string | List(string)', description: 'The string or list of strings to split on.' },
                { name: 'removeEmpty', type: 'bool', description: 'If true, removes empty entries.', isOptional: true }
            ]
        },
        {
            label: 'Join',
            returnType: 'string',
            description: 'Join the list into a string.',
            parameters: [
                { name: 'value', type: 'List(string)', description: 'The list of strings to join.' },
                { name: 'separator', type: 'string', description: 'The separator used to join the strings.' }
            ]
        },
        {
            label: 'Substring',
            returnType: 'string',
            description: 'Get a substring from the given startIndex.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to get the substring from.' },
                { name: 'startIndex', type: 'int', description: 'The starting index of the substring.' }
            ]
        },
        {
            label: 'SubstringWithLength',
            returnType: 'string',
            description: 'Get a substring from the given startIndex with the specified length.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to get the substring from.' },
                { name: 'startIndex', type: 'int', description: 'The starting index of the substring.' },
                { name: 'length', type: 'int', description: 'The length of the substring.' }
            ]
        },
        {
            label: 'Length',
            returnType: 'int',
            description: 'Get the length of the string.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to get the length of.' }
            ]
        },
        {
            label: 'Replace',
            returnType: 'string',
            description: 'Replace all matches in the string with the replacement.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to perform the replacement on.' },
                { name: 'match', type: 'string', description: 'The string to match and replace.' },
                { name: 'with', type: 'string', description: 'The replacement string.' }
            ]
        },
        {
            label: 'Contains',
            returnType: 'bool',
            description: 'Check if the string contains the match.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to check.' },
                { name: 'match', type: 'string', description: 'The string to find.' }
            ]
        },
        {
            label: 'StartsWith',
            returnType: 'bool',
            description: 'Check if the string starts with the match.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to check.' },
                { name: 'match', type: 'string', description: 'The string to check the start against.' }
            ]
        },
        {
            label: 'EndsWith',
            returnType: 'bool',
            description: 'Check if the string ends with the match.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to check.' },
                { name: 'match', type: 'string', description: 'The string to check the end against.' }
            ]
        },
        {
            label: 'Trim',
            returnType: 'string',
            description: 'Trim all whitespace from the start and end of the string.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to trim.' }
            ]
        },
        {
            label: 'Insert',
            returnType: 'string',
            description: 'Insert a string at a given index.',
            parameters: [
                { name: 'value', type: 'string', description: 'The original string.' },
                { name: 'insert', type: 'string', description: 'The string to insert.' },
                { name: 'index', type: 'int', description: 'The index to insert at.' }
            ]
        },
        {
            label: 'Capitalize',
            returnType: 'string',
            description: 'Capitalizes the first letter of the string.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to capitalize.' }
            ]
        },
        {
            label: 'ToUpper',
            returnType: 'string',
            description: 'Converts the string to upper case.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to convert.' }
            ]
        },
        {
            label: 'ToLower',
            returnType: 'string',
            description: 'Converts the string to lower case.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to convert.' }
            ]
        },
        {
            label: 'IndexOf',
            returnType: 'int',
            description: 'Returns the index of the given string.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to search.' },
                { name: 'item', type: 'string', description: 'The substring to find.' }
            ]
        }
    ];
}

export const StringClassInstance: StringClass = new StringClass();
