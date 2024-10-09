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
            label: 'LineCast',
            returnType: 'LineCastHitResult',
            description: 'Performs a linecast between start and end vectors, colliding with the given category (e.g., "Characters"). Returns the object if found, otherwise null.',
            parameters: [
                { name: 'start', type: 'Vector3', description: 'Starting point of the linecast.' },
                { name: 'end', type: 'Vector3', description: 'End point of the linecast.' },
                { name: 'collideWith', type: 'string', description: 'Category to collide with (e.g., "Characters").' }
            ]
        },
        {
            label: 'SphereCast',
            returnType: 'object',
            description: 'Performs a spherecast between start and end vectors with the given radius and category to collide with (e.g., "Characters"). Returns the object if found, otherwise null.',
            parameters: [
                { name: 'start', type: 'Vector3', description: 'Starting point of the spherecast.' },
                { name: 'end', type: 'Vector3', description: 'End point of the spherecast.' },
                { name: 'radius', type: 'float', description: 'Radius of the spherecast.' },
                { name: 'collideWith', type: 'string', description: 'Category to collide with (e.g., "Characters").' }
            ]
        }
    ];
}

export const PhysicsClassInstance: PhysicsClass = new PhysicsClass();
