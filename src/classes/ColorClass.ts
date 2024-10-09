import { ClassKinds, IClass, IConstructor, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class ColorClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Color';
    public description = 'Is a struct, meaning that assignments will create copies and comparisons will return true if all fields are equivalent.';

    public extends?: IClass[] = [ObjectClassInstance];
    
    public constructors: IConstructor[] = [
        {
            description: "Create a default 255,255,255,255 color",
            parameters: []
        },
        {
            description: "Create a color with specified RGB values and default alpha (255)",
            parameters: [
                { name: "r", type: "int", description: "Red value (0-255)" },
                { name: "g", type: "int", description: "Green value (0-255)" },
                { name: "b", type: "int", description: "Blue value (0-255)" }
            ]
        },
        {
            description: "Create a color with specified RGBA values",
            parameters: [
                { name: "r", type: "int", description: "Red value (0-255)" },
                { name: "g", type: "int", description: "Green value (0-255)" },
                { name: "b", type: "int", description: "Blue value (0-255)" },
                { name: "a", type: "int", description: "Alpha value (0-255)" }
            ]
        },
        {
            description: "Create a color from a hexadecimal string",
            parameters: [
                { name: "hex", type: "string", description: "Hexadecimal color value (e.g. '#FF0000')" }
            ]
        }
    ];

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

export const ColorClassInstance: ColorClass = new ColorClass();
