import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class PhysicsClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Physics';
    public description = 'Some commonly used physics functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'LineCast',
            returnType: {name: 'LineCastHitResult', typeArguments: []},
            description: 'Performs a linecast between start and end vectors, colliding with the given category (e.g., "Characters"). Returns the object if found, otherwise null.',
            parameters: [
                { name: 'start', type: { name: 'Vector3', typeArguments: [] }, description: 'Starting point of the linecast.' },
                { name: 'end', type: { name: 'Vector3', typeArguments: [] }, description: 'End point of the linecast.' },
                { name: 'collideWith', type: {name: 'string', typeArguments: []}, description: 'Category to collide with (e.g., "Characters").' }
            ]
        },
        {
            parent: this,
            label: 'SphereCast',
            returnType: {name: 'Object', typeArguments: []},
            description: 'Performs a spherecast between start and end vectors with the given radius and category to collide with (e.g., "Characters"). Returns the object if found, otherwise null.',
            parameters: [
                { name: 'start', type: { name: 'Vector3', typeArguments: [] }, description: 'Starting point of the spherecast.' },
                { name: 'end', type: { name: 'Vector3', typeArguments: [] }, description: 'End point of the spherecast.' },
                { name: 'radius', type: {name: 'float', typeArguments: []}, description: 'Radius of the spherecast.' },
                { name: 'collideWith', type: {name: 'string', typeArguments: []}, description: 'Category to collide with (e.g., "Characters").' }
            ]
        }
    ];
}

export const PhysicsClassInstance: PhysicsClass = new PhysicsClass();
