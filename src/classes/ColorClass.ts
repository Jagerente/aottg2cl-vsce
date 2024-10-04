import { IClass, IField, IMethod } from './IClass';

export class ColorClass implements IClass {
    public name = 'Color';
    public description = 'Is a struct, meaning that assignments will create copies and comparisons will return true if all fields are equivalent.';

    public instanceFields: IField[] = [
        { label: 'R', type: 'int', description: 'Red' },
        { label: 'G', type: 'int', description: 'Green' },
        { label: 'B', type: 'int', description: 'Blue' },
        { label: 'A', type: 'int', description: 'Alpha' }
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'ToHexString',
            returnType: 'string',
            description: 'Converts the color to a hex string.',
            parameters: []
        },
        {
            label: 'Gradient',
            returnType: 'Color',
            description: 'Returns a gradient color between a and b using the fade value.',
            parameters: [
                { name: 'a', type: 'Color', description: 'First color' },
                { name: 'b', type: 'Color', description: 'Second color' },
                { name: 'fade', type: 'float', description: 'Fade value between 0 and 1' }
            ]
        }
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}
