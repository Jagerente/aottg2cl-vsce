import { ClassKinds, IClass, IConstructor, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class ColorClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Color';
    public description = 'Is a struct, meaning that assignments will create copies and comparisons will return true if all fields are equivalent.';

    public extends?: IClass[] = [ObjectClassInstance];
    
    public constructors: IConstructor[] = [
        {
            parent: this,
            description: "Create a default 255,255,255,255 color",
            parameters: []
        },
        {
            parent: this,
            description: "Create a color with specified RGB values and default alpha (255)",
            parameters: [
                { name: "r", type: {name: 'int', typeArguments: []}, description: "Red value (0-255)" },
                { name: "g", type: {name: 'int', typeArguments: []}, description: "Green value (0-255)" },
                { name: "b", type: {name: 'int', typeArguments: []}, description: "Blue value (0-255)" }
            ]
        },
        {
            parent: this,
            description: "Create a color with specified RGBA values",
            parameters: [
                { name: "r", type: {name: 'int', typeArguments: []}, description: "Red value (0-255)" },
                { name: "g", type: {name: 'int', typeArguments: []}, description: "Green value (0-255)" },
                { name: "b", type: {name: 'int', typeArguments: []}, description: "Blue value (0-255)" },
                { name: "a", type: {name: 'int', typeArguments: []}, description: "Alpha value (0-255)" }
            ]
        },
        {
            parent: this,
            description: "Create a color from a hexadecimal string",
            parameters: [
                { name: "hex", type: {name: 'string', typeArguments: []}, description: "Hexadecimal color value (e.g. '#FF0000')" }
            ]
        }
    ];

    public instanceFields: IField[] = [
        { parent: this, label: 'R', type: {name: 'int', typeArguments: []}, description: 'Red' },
        { parent: this, label: 'G', type: {name: 'int', typeArguments: []}, description: 'Green' },
        { parent: this, label: 'B', type: {name: 'int', typeArguments: []}, description: 'Blue' },
        { parent: this, label: 'A', type: {name: 'int', typeArguments: []}, description: 'Alpha' }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'ToHexString',
            returnType: {name: 'string', typeArguments: []},
            description: 'Converts the color to a hex string.',
            parameters: []
        },
        {
            parent: this,
            label: 'Gradient',
            returnType: {name: 'Color', typeArguments: []},
            description: 'Returns a gradient color between a and b using the fade value.',
            parameters: [
                { name: 'a', type: {name: 'Color', typeArguments: []}, description: 'First color' },
                { name: 'b', type: {name: 'Color', typeArguments: []}, description: 'Second color' },
                { name: 'fade', type: {name: 'float', typeArguments: []}, description: 'Fade value between 0 and 1' }
            ]
        }
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const ColorClassInstance: ColorClass = new ColorClass();
