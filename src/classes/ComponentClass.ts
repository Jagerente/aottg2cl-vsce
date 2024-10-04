import { IClass, IField, IMethod } from './IClass';

export class ComponentClass implements IClass {
    public name = 'Component';
    public description = 'Represents a component script attached to a MapObject.';

    public instanceFields: IField[] = [
        {
            label: 'MapObject',
            type: 'MapObject',
            description: 'The MapObject the component is attached to.',
        },
        {
            label: 'NetworkView',
            type: 'NetworkView',
            description: 'The NetworkView attached to the MapObject, if Networked is enabled.',
        },
    ];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}
