import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class MapTargetableClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'MapTargetable';
    public description = 'MapTargetable object returned from MapObject.AddTarget method. Acts as a targetable collider for AI, like titans.';

    public instanceFields: IField[] = [
        { parent: this, label: 'Team', type: {name: 'string', typeArguments: []}, description: 'Team the map targetable belongs to.' },
        { parent: this, label: 'Enabled', type: { name: 'bool', typeArguments: [] }, description: 'Whether the map targetable is enabled or not.' },
        { parent: this, label: 'Position', type: { name: 'Vector3', typeArguments: [] }, description: 'World position of the map targetable.', readonly: true }
    ];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [];
    public staticMethods: IMethod[] = [];
}

export const MapTargetableClassInstance: MapTargetableClass = new MapTargetableClass();
