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
        { parent: this, label: 'StartWidth', type: {name: 'float', typeArguments: []}, description: 'Width of the line at the start point.' },
        { parent: this, label: 'EndWidth', type: {name: 'float', typeArguments: []}, description: 'Width of the line at the end point.' },
        { parent: this, label: 'LineColor', type: {name: 'Color', typeArguments: []}, description: 'Color of the line.' },
        { parent: this, label: 'PositionCount', type: {name: 'int', typeArguments: []}, description: 'Number of positions that make up the line.' },
        { parent: this, label: 'Enabled', type: { name: 'bool', typeArguments: [] }, description: 'Whether the LineRenderer is enabled.' },
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'SetPosition',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the position of a point in the line.',
            parameters: [
                { name: 'index', type: {name: 'int', typeArguments: []}, description: 'Index of the position to set.' },
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'Position value to set.' }
            ]
        },
        {
            parent: this,
            label: 'GetPosition',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the position of a point in the line.',
            parameters: [
                { name: 'index', type: {name: 'int', typeArguments: []}, description: 'Index of the position to retrieve.' }
            ]
        },
    ];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'CreateLineRenderer',
            returnType: {name: 'LineRenderer', typeArguments: []},
            description: 'Creates a default LineRenderer instance.',
            parameters: []
        }
    ];
}

export const LineRendererClassInstance: LineRendererClass = new LineRendererClass();
