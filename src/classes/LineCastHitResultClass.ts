import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class LineCastHitResultClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'LineCastHitResult';
    public description = 'Line cast hit result from Physics.LineCast.';

    public instanceFields: IField[] = [
        { parent: this, label: 'IsCharacter', type: { name: 'bool', typeArguments: [] }, description: 'Whether or not the LineCast hit a player.' },
        { parent: this, label: 'IsMapObject', type: { name: 'bool', typeArguments: [] }, description: 'Whether or not the LineCast hit a MapObject.' },
        { parent: this, label: 'Point', type: { name: 'Vector3', typeArguments: [] }, description: 'The hit point.' },
        { parent: this, label: 'Normal', type: { name: 'Vector3', typeArguments: [] }, description: 'The normal vector of the face that was hit by the LineCast.' },
        { parent: this, label: 'Distance', type: {name: 'float', typeArguments: []}, description: 'The distance between the LineCast origin and the hit point.' },
        { parent: this, label: 'Collider', type: {name: 'Object', typeArguments: []}, description: 'The collider hit by the LineCast.' }
    ];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];
}

export const LineCastHitResultClassInstance: LineCastHitResultClass = new LineCastHitResultClass();
