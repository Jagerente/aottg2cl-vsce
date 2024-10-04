import { IClass, IField, IMethod } from './IClass';

export class LineCastHitResultClass implements IClass {
    public name = 'LineCastHitResult';
    public description = 'Line cast hit result from Physics.LineCast.';

    public instanceFields: IField[] = [
        { label: 'IsCharacter', type: 'bool', description: 'Whether or not the LineCast hit a player.' },
        { label: 'IsMapObject', type: 'bool', description: 'Whether or not the LineCast hit a MapObject.' },
        { label: 'Point', type: 'Vector3', description: 'The hit point.' },
        { label: 'Normal', type: 'Vector3', description: 'The normal vector of the face that was hit by the LineCast.' },
        { label: 'Distance', type: 'float', description: 'The distance between the LineCast origin and the hit point.' },
        { label: 'Collider', type: 'object', description: 'The collider hit by the LineCast.' }
    ];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}
