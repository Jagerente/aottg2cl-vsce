import { IClass, IField, IMethod } from './IClass';

export class StringClass implements IClass {
    public name = 'String';
    public description = 'String manipulation functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [
        { label: 'Newline', type: 'string', description: 'Returns the newline character.' }
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
            label: 'Split',
            returnType: 'List(string)',
            description: 'Split the string into a list.',
            parameters: [
                { name: 'value', type: 'string', description: 'The string to split.' },
                { name: 'separator', type: 'string', description: 'The separator used to split the string.' }
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
        }
    ];
}
