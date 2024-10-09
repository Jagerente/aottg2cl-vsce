import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class MapClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Map';
    public description = 'Functions for finding, creating, and destroying map objects.';

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            label: 'FindMapObjectByName',
            returnType: 'MapObject',
            description: 'Returns the first map object matching the given name.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the map object to find.' }
            ]
        },
        {
            label: 'FindMapObjectsByName',
            returnType: 'List(MapObject)',
            description: 'Returns a list of map objects matching the given name.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the map objects to find.' }
            ]
        },
        {
            label: 'FindMapObjectByID',
            returnType: 'MapObject',
            description: 'Returns the map object matching the given ID.',
            parameters: [
                { name: 'id', type: 'int', description: 'The ID of the map object to find.' }
            ]
        },
        {
            label: 'FindMapObjectByTag',
            returnType: 'MapObject',
            description: 'Returns the first map object that has a tag component matching the given name.',
            parameters: [
                { name: 'tag', type: 'string', description: 'The tag of the map object to find.' }
            ]
        },
        {
            label: 'FindMapObjectsByTag',
            returnType: 'List(MapObject)',
            description: 'Returns a list of map objects matching the given tag.',
            parameters: [
                { name: 'tag', type: 'string', description: 'The tag of the map objects to find.' }
            ]
        },
        {
            label: 'FindMapObjectsByComponent',
            returnType: 'List(MapObject)',
            description: 'Returns a list of map objects which have the corresponding CL component attached.',
            parameters: []
        },
        {
            label: 'CreateMapObjectRaw',
            returnType: 'MapObject',
            description: 'Creates a map object given the raw data string, which corresponds to a map file CSV row.',
            parameters: [
                { name: 'data', type: 'string', description: 'The raw data string for the map object.' }
            ]
        },
        {
            label: 'DestroyMapObject',
            returnType: 'null',
            description: 'Destroys the given map object, and its children if includeChildren is true.',
            parameters: [
                { name: 'obj', type: 'MapObject', description: 'The map object to destroy.' },
                { name: 'includeChildren', type: 'bool', description: 'Whether or not to destroy the children of the object.' }
            ]
        },
        {
            label: 'CopyMapObject',
            returnType: 'MapObject',
            description: 'Creates a copy of the given map object, and its children if includeChildren is true.',
            parameters: [
                { name: 'obj', type: 'MapObject', description: 'The map object to copy.' },
                { name: 'includeChildren', type: 'bool', description: 'Whether or not to copy the children of the object.' }
            ]
        },
        {
            label: 'UpdateNavMesh',
            returnType: 'null',
            description: 'Updates the Navmesh (host only). This operation may take a while depending on the map size.',
            parameters: []
        },
        {
            label: 'UpdateNavMeshAsync',
            returnType: 'null',
            description: 'Updates the Navmesh (host only) asynchronously and should not hang.',
            parameters: []
        }
    ];
}

export const MapClassInstance: MapClass = new MapClass();
