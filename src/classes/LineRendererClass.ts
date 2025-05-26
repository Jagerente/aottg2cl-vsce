import { ClassKinds, IClass, IConstructor, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class LineRendererClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'LineRenderer';
    public description = 'LineRenderer is a component that renders a line in 3D space.';

    public extends?: IClass[] = [ObjectClassInstance];

    public constructors: IConstructor[] = [
        {
            parent: this,
            description: 'Creates a LineRenderer with default settings.',
            parameters: []
        }
    ];

    public instanceFields: IField[] = [
        { parent: this, label: 'StartWidth', type: 'float', description: 'Width of the line at the start point.' },
        { parent: this, label: 'EndWidth', type: 'float', description: 'Width of the line at the end point.' },
        { parent: this, label: 'LineColor', type: 'Color', description: 'Color of the line.' },
        { parent: this, label: 'PositionCount', type: 'int', description: 'Number of positions that make up the line.' },
        { parent: this, label: 'Enabled', type: 'bool', description: 'Whether the LineRenderer is enabled.' },
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'SetPosition',
            returnType: 'null',
            description: 'Sets the position of a point in the line.',
            parameters: [
                { name: 'index', type: 'int', description: 'Index of the position to set.' },
                { name: 'position', type: 'Vector3', description: 'Position value to set.' }
            ]
        },
        {
            parent: this,
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
            parent: this,
            label: 'CreateLineRenderer',
            returnType: 'LineRenderer',
            description: 'Creates a default LineRenderer instance.',
            parameters: []
        }
    ];
}

export const LineRendererClassInstance: LineRendererClass = new LineRendererClass();
