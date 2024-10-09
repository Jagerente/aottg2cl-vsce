import { ClassKinds, IClass, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class MapObjectClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'MapObject';
    public description = 'Represents a map object created in the editor.';

    public extends?: IClass[] = [ObjectClassInstance];

    public instanceFields: IField[] = [
        { label: 'Name', type: 'string', description: 'Name of the map object.' },
        { label: 'Position', type: 'Vector3', description: 'Position of the map object.' },
        { label: 'LocalPosition', type: 'Vector3', description: 'Local position of the map object. Same as Position if there is no parent.' },
        { label: 'Rotation', type: 'Vector3', description: 'Rotation of the map object.' },
        { label: 'LocalRotation', type: 'Vector3', description: 'Local rotation of the map object. Same as Rotation if there is no parent.' },
        { label: 'Forward', type: 'Vector3', description: 'Forward vector of the map object.' },
        { label: 'Up', type: 'Vector3', description: 'Up vector of the map object.' },
        { label: 'Right', type: 'Vector3', description: 'Right vector of the map object.' },
        { label: 'Scale', type: 'Vector3', description: 'Scale of the map object.' },
        { label: 'Parent', type: 'MapObject', description: 'Parent of the map object. Returns null if there is no parent.' },
        { label: 'Active', type: 'bool', description: 'Whether or not the map object is active.' },
        { label: 'Static', type: 'bool', description: 'Whether or not the map object is static.' },
        { label: 'Transform', type: 'Transform', description: 'Gets the transform component of the map object.' },
        { label: 'Color', type: 'Color', description: 'The main color of the map object.' },
        { label: 'ID', type: 'int', description: 'The ID of the map object.' },
        { label: 'HasRenderer', type: 'bool', description: 'Whether the MapObject has a renderer attached.' },
        { label: 'TextureTilingX', type: 'float', description: 'Sets the texture tiling x of the first renderer.' },
        { label: 'TextureTilingY', type: 'float', description: 'Sets the texture tiling y of the first renderer.' },
        { label: 'TextureOffsetX', type: 'float', description: 'Sets the texture offset x of the first renderer.' },
        { label: 'TextureOffsetY', type: 'float', description: 'Sets the texture offset y of the first renderer.' },
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'GetComponent',
            returnType: 'Component',
            description: 'Gets the component with given name.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the component to get.' }
            ]
        },
        {
            label: 'AddComponent',
            returnType: 'Component',
            description: 'Adds the component to the object, calls Init, and returns the component.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the component to add.' }
            ]
        },
        {
            label: 'RemoveComponent',
            returnType: 'null',
            description: 'Removes the component if found on the object.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the component to remove.' }
            ]
        },
        {
            label: 'GetChild',
            returnType: 'MapObject',
            description: 'Gets the child with given name.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the child to get.' }
            ]
        },
        {
            label: 'GetChildren',
            returnType: 'List(MapObject)',
            description: 'Gets a list of direct children of the map object.',
            parameters: []
        },
        {
            label: 'GetTransform',
            returnType: 'Transform',
            description: 'Gets the child transform with given name.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the child transform to get.' }
            ]
        },
        {
            label: 'AddSphereCollider',
            returnType: 'null',
            description: 'Adds a sphere collider with given mode, collide, center, and radius.',
            parameters: [
                { name: 'collideMode', type: 'string', description: 'Mode of the collider.' },
                { name: 'collideWith', type: 'string', description: 'What to collide with.' },
                { name: 'center', type: 'Vector3', description: 'The center of the collider.' },
                { name: 'radius', type: 'float', description: 'The radius of the collider.' }
            ]
        },
        {
            label: 'AddBoxCollider',
            returnType: 'null',
            description: 'Adds a box collider with given mode, collide, center, and size.',
            parameters: [
                { name: 'collideMode', type: 'string', description: 'Mode of the collider.' },
                { name: 'collideWith', type: 'string', description: 'What to collide with.' },
                { name: 'center', type: 'Vector3', description: 'The center of the collider.' },
                { name: 'size', type: 'Vector3', description: 'The size of the collider.' }
            ]
        },
        {
            label: 'SetColorAll',
            returnType: 'null',
            description: 'Sets all colors on the MapObject.',
            parameters: [
                { name: 'color', type: 'Color', description: 'The color to set.' }
            ]
        },
        {
            label: 'InBounds',
            returnType: 'bool',
            description: 'Returns true if the position is inside the bounds of the MapObject\'s colliders.',
            parameters: [
                { name: 'position', type: 'Vector3', description: 'The position to check.' }
            ]
        },
        {
            label: 'GetBoundsAverageCenter',
            returnType: 'Vector3',
            description: 'Gets the center of all of the bounds of all hitboxes on the object.',
            parameters: []
        }
    ];

    public staticFields: IField[] = [];
    
    public staticMethods: IMethod[] = [];
}

export const MapObjectClassInstance: MapObjectClass = new MapObjectClass();
