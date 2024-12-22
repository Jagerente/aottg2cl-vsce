import { ClassKinds, IClass, IConstructor, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class LineRendererClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'LineRenderer';
    public description = 'LineRenderer is a component that renders a line in 3D space.';

    public extends?: IClass[] = [ObjectClassInstance];

    public constructors: IConstructor[] = [
        {
            description: 'Creates a LineRenderer with default settings.',
            parameters: []
        }
    ];

    public instanceFields: IField[] = [
        { label: 'StartWidth', type: 'float', description: 'Width of the line at the start point.' },
        { label: 'EndWidth', type: 'float', description: 'Width of the line at the end point.' },
        { label: 'LineColor', type: 'Color', description: 'Color of the line.' },
        { label: 'PositionCount', type: 'int', description: 'Number of positions that make up the line.' },
        { label: 'Enabled', type: 'bool', description: 'Whether the LineRenderer is enabled.' },
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'SetPosition',
            returnType: 'null',
            description: 'Sets the position of a point in the line.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index of the position to set.' },
                { name: 'position', type: 'Vector3', description: 'Position value to set.' }
            ]
        },
        {
            label: 'GetPosition',
            returnType: 'Vector3',
            description: 'Gets the position of a point in the line.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index of the position to retrieve.' }
            ]
        },
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            label: 'CreateLineRenderer',
            returnType: 'LineRenderer',
            description: 'Creates a default LineRenderer instance.',
            parameters: []
        }
    ];
}

export const LineRendererClassInstance: LineRendererClass = new LineRendererClass();
