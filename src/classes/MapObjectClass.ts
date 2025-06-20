import { ClassKinds, IClass, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class MapObjectClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'MapObject';
    public description = 'Represents a map object created in the editor.';

    public extends?: IClass[] = [ObjectClassInstance];

    public instanceFields: IField[] = [
        { parent: this, label: 'Name', type: {name: 'string', typeArguments: []}, description: 'Name of the map object.' },
        { parent: this, label: 'Position', type: { name: 'Vector3', typeArguments: [] }, description: 'Position of the map object.' },
        { parent: this, label: 'LocalPosition', type: { name: 'Vector3', typeArguments: [] }, description: 'Local position of the map object. Same as Position if there is no parent.' },
        { parent: this, label: 'Rotation', type: { name: 'Vector3', typeArguments: [] }, description: 'Rotation of the map object.' },
        { parent: this, label: 'LocalRotation', type: { name: 'Vector3', typeArguments: [] }, description: 'Local rotation of the map object. Same as Rotation if there is no parent.' },
        { parent: this, label: 'Forward', type: { name: 'Vector3', typeArguments: [] }, description: 'Forward vector of the map object.' },
        { parent: this, label: 'Up', type: { name: 'Vector3', typeArguments: [] }, description: 'Up vector of the map object.' },
        { parent: this, label: 'Right', type: { name: 'Vector3', typeArguments: [] }, description: 'Right vector of the map object.' },
        { parent: this, label: 'Scale', type: { name: 'Vector3', typeArguments: [] }, description: 'Scale of the map object.' },
        { parent: this, label: 'Parent', type: {name: 'MapObject | Transform', typeArguments: []}, description: 'Parent of the map object. Returns null if there is no parent.' },
        { parent: this, label: 'Active', type: { name: 'bool', typeArguments: [] }, description: 'Whether or not the map object is active.' },
        { parent: this, label: 'Static', type: { name: 'bool', typeArguments: [] }, description: 'Whether or not the map object is static.' },
        { parent: this, label: 'Transform', type: {name: 'Transform', typeArguments: []}, description: 'Gets the transform component of the map object.' },
        { parent: this, label: 'Color', type: {name: 'Color', typeArguments: []}, description: 'The main color of the map object.' },
        { parent: this, label: 'ID', type: {name: 'int', typeArguments: []}, description: 'The ID of the map object.' },
        { parent: this, label: 'HasRenderer', type: { name: 'bool', typeArguments: [] }, description: 'Whether the MapObject has a renderer attached.' },
        { parent: this, label: 'TextureTilingX', type: {name: 'float', typeArguments: []}, description: 'Sets the texture tiling x of the first renderer.' },
        { parent: this, label: 'TextureTilingY', type: {name: 'float', typeArguments: []}, description: 'Sets the texture tiling y of the first renderer.' },
        { parent: this, label: 'TextureOffsetX', type: {name: 'float', typeArguments: []}, description: 'Sets the texture offset x of the first renderer.' },
        { parent: this, label: 'TextureOffsetY', type: {name: 'float', typeArguments: []}, description: 'Sets the texture offset y of the first renderer.' },
        { parent: this, label: 'QuaternionRotation', type: {name: 'Quaternion', typeArguments: []}, description: 'Quaternion rotation of the map object.' },
        { parent: this, label: 'QuaternionLocalRotation', type: {name: 'Quaternion', typeArguments: []}, description: 'Quaternion local rotation of the map object.' }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'GetComponent',
            returnType: {name: 'Component', typeArguments: []},
            description: 'Gets the component with given name.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the component to get.' }
            ]
        },
        {
            parent: this,
            label: 'AddComponent',
            returnType: {name: 'Component', typeArguments: []},
            description: 'Adds the component to the object, calls Init, and returns the component.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the component to add.' }
            ]
        },
        {
            parent: this,
            label: 'RemoveComponent',
            returnType: {name: 'void', typeArguments: []},
            description: 'Removes the component if found on the object.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the component to remove.' }
            ]
        },
        {
            parent: this,
            label: 'GetChild',
            returnType: {name: 'MapObject', typeArguments: []},
            description: 'Gets the child with given name.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the child to get.' }
            ]
        },
        {
            parent: this,
            label: 'GetChildren',
            returnType: {name: 'List', typeArguments: [{name: 'MapObject', typeArguments: []}]},
            description: 'Gets a list of direct children of the map object.',
            parameters: []
        },
        {
            parent: this,
            label: 'GetTransform',
            returnType: {name: 'Transform', typeArguments: []},
            description: 'Gets the child transform with given name.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the child transform to get.' }
            ]
        },
        {
            parent: this,
            label: 'AddSphereCollider',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds a sphere collider with given mode, collide, center, and radius.',
            parameters: [
                { name: 'collideMode', type: {name: 'string', typeArguments: []}, description: 'Mode of the collider.' },
                { name: 'collideWith', type: {name: 'string', typeArguments: []}, description: 'What to collide with.' },
                { name: 'center', type: { name: 'Vector3', typeArguments: [] }, description: 'The center of the collider.' },
                { name: 'radius', type: {name: 'float', typeArguments: []}, description: 'The radius of the collider.' }
            ]
        },
        {
            parent: this,
            label: 'AddBoxCollider',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds a box collider with given mode, collide, center, and size.',
            parameters: [
                { name: 'collideMode', type: {name: 'string', typeArguments: []}, description: 'Mode of the collider.' },
                { name: 'collideWith', type: {name: 'string', typeArguments: []}, description: 'What to collide with.' },
                { name: 'center', type: { name: 'Vector3', typeArguments: [] }, description: 'The center of the collider.' },
                { name: 'size', type: { name: 'Vector3', typeArguments: [] }, description: 'The size of the collider.' }
            ]
        },
        {
            parent: this,
            label: 'SetColorAll',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets all colors on the MapObject.',
            parameters: [
                { name: 'color', type: {name: 'Color', typeArguments: []}, description: 'The color to set.' }
            ]
        },
        {
            parent: this,
            label: 'InBounds',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Returns true if the position is inside the bounds of the MapObject\'s colliders.',
            parameters: [
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to check.' }
            ]
        },
        {
            parent: this,
            label: 'GetBoundsAverageCenter',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the center of all of the bounds of all hitboxes on the object.',
            parameters: []
        },
        {
            parent: this,
            label: 'SetComponentEnabled',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the attached component to enabled or not.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the component to set.' },
                { name: 'enabled', type: { name: 'bool', typeArguments: [] }, description: 'True to enable, false to disable.' }
            ]
        },
        {
            parent: this,
            label: 'SetComponentsEnabled',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets all attached components to enabled or not.',
            parameters: [
                { name: 'enabled', type: { name: 'bool', typeArguments: [] }, description: 'True to enable all components, false to disable.' }
            ]
        },
        {
            parent: this,
            label: 'AddSphereTarget',
            returnType: {name: 'MapTargetable', typeArguments: []},
            description: 'Adds a sphere collider as a region with the layer of "HitBoxes" and sets it as a targetable object.',
            parameters: [
                { name: 'team', type: {name: 'string', typeArguments: []}, description: 'The team of the target.' },
                { name: 'center', type: { name: 'Vector3', typeArguments: [] }, description: 'The center of the sphere.' },
                { name: 'radius', type: {name: 'float', typeArguments: []}, description: 'The radius of the sphere.' }
            ]
        },
        {
            parent: this,
            label: 'AddBoxTarget',
            returnType: {name: 'MapTargetable', typeArguments: []},
            description: 'Adds a box collider as a region with the layer of "HitBoxes" and sets it as a targetable object.',
            parameters: [
                { name: 'team', type: {name: 'string', typeArguments: []}, description: 'The team of the target.' },
                { name: 'center', type: { name: 'Vector3', typeArguments: [] }, description: 'The center of the box.' },
                { name: 'size', type: { name: 'Vector3', typeArguments: [] }, description: 'The size of the box.' }
            ]
        },
        {
            parent: this,
            label: 'GetBoundsCenter',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the center of the first (main) hitbox on the object.',
            parameters: []
        },
        {
            parent: this,
            label: 'GetBoundsSize',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the size of the bounds. Returns null if there are no colliders.',
            parameters: []
        },
        {
            parent: this,
            label: 'GetBoundsMin',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the lower corner of the Bounds. Returns null if there are no colliders.',
            parameters: []
        },
        {
            parent: this,
            label: 'GetBoundsMax',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the upper corner of the Bounds. Returns null if there are no colliders.',
            parameters: []
        },
        {
            parent: this,
            label: 'GetCorners',
            returnType: {name: 'List', typeArguments: [{name: 'Vector3', typeArguments: []}]},
            description: 'Gets all eight corners of the bounds. Returns null if there are no colliders.',
            parameters: []
        },
        {
            parent: this,
            label: 'AddBuiltinComponent',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds a new built-in component with the given name and parameters.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the component to add.' },
                { name: 'params', type: {name: 'any', typeArguments: []}, description: 'Additional parameters for the component.', isVariadic: true }
            ]
        },
        {
            parent: this,
            label: 'UpdateBuiltinComponent',
            returnType: {name: 'void', typeArguments: []},
            description: 'Updates a specific field of an existing built-in component.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the component to update.' },
                { name: 'field', type: {name: 'string', typeArguments: []}, description: 'The specific field to update.' },
                { name: 'params', type: {name: 'any', typeArguments: []}, description: 'Additional parameters.', isVariadic: true }
            ]
        },
        {
            parent: this,
            label: 'ReadBuiltinComponent',
            returnType: {name: 'void', typeArguments: []},
            description: 'Reads the value of a specific field from an existing built-in component.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the component to read.' },
                { name: 'field', type: {name: 'string', typeArguments: []}, description: 'The specific field to read.' }
            ]
        },
        {
            parent: this,
            label: 'HasTag',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Whether or not the object has the given tag.',
            parameters: [
                { name: 'tag', type: {name: 'string', typeArguments: []}, description: 'The tag name of the map object.' }
            ]
        }
    ];

    public staticFields: IField[] = [];
    
    public staticMethods: IMethod[] = [];
}

export const MapObjectClassInstance: MapObjectClass = new MapObjectClass();
