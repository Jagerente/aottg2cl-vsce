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
            parent: this,
            label: 'FindMapObjectByName',
            returnType: {name: 'MapObject', typeArguments: []},
            description: 'Returns the first map object matching the given name.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the map object to find.' }
            ]
        },
        {
            parent: this,
            label: 'FindMapObjectsByName',
            returnType: {name: 'List', typeArguments: [{name: 'MapObject', typeArguments: []}]},
            description: 'Returns a list of map objects matching the given name.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the map objects to find.' }
            ]
        },
        {
            parent: this,
            label: 'FindMapObjectByID',
            returnType: {name: 'MapObject', typeArguments: []},
            description: 'Returns the map object matching the given ID.',
            parameters: [
                { name: 'id', type: {name: 'int', typeArguments: []}, description: 'The ID of the map object to find.' }
            ]
        },
        {
            parent: this,
            label: 'FindMapObjectByTag',
            returnType: {name: 'MapObject', typeArguments: []},
            description: 'Returns the first map object that has a tag component matching the given name.',
            parameters: [
                { name: 'tag', type: {name: 'string', typeArguments: []}, description: 'The tag of the map object to find.' }
            ]
        },
        {
            parent: this,
            label: 'FindMapObjectsByTag',
            returnType: {name: 'List', typeArguments: [{name: 'MapObject', typeArguments: []}]},
            description: 'Returns a list of map objects matching the given tag.',
            parameters: [
                { name: 'tag', type: {name: 'string', typeArguments: []}, description: 'The tag of the map objects to find.' }
            ]
        },
        {
            parent: this,
            label: 'FindMapObjectsByComponent',
            returnType: {name: 'List', typeArguments: [{name: 'MapObject', typeArguments: []}]},
            description: 'Returns a list of map objects which have the corresponding CL component attached.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the component on the map objects to find.' }
            ]
        },
        {
            parent: this,
            label: 'CreateMapObjectRaw',
            returnType: {name: 'MapObject', typeArguments: []},
            description: 'Creates a map object given the raw data string, which corresponds to a map file CSV row.',
            parameters: [
                { name: 'data', type: {name: 'string', typeArguments: []}, description: 'The raw data string for the map object.' }
            ]
        },
        {
            parent: this,
            label: 'DestroyMapObject',
            returnType: {name: 'void', typeArguments: []},
            description: 'Destroys the given map object, and its children if includeChildren is true.',
            parameters: [
                { name: 'obj', type: {name: 'MapObject', typeArguments: []}, description: 'The map object to destroy.' },
                { name: 'includeChildren', type: { name: 'bool', typeArguments: [] }, description: 'Whether or not to destroy the children of the object.' }
            ]
        },
        {
            parent: this,
            label: 'CopyMapObject',
            returnType: {name: 'MapObject', typeArguments: []},
            description: 'Creates a copy of the given map object, and its children if includeChildren is true.',
            parameters: [
                { name: 'obj', type: {name: 'MapObject', typeArguments: []}, description: 'The map object to copy.' },
                { name: 'includeChildren', type: { name: 'bool', typeArguments: [] }, description: 'Whether or not to copy the children of the object.' }
            ]
        },
        {
            parent: this,
            label: 'UpdateNavMesh',
            returnType: {name: 'void', typeArguments: []},
            description: 'Updates the Navmesh (host only). This operation may take a while depending on the map size.',
            parameters: []
        },
        {
            parent: this,
            label: 'UpdateNavMeshAsync',
            returnType: {name: 'void', typeArguments: []},
            description: 'Updates the Navmesh (host only) asynchronously and should not hang.',
            parameters: []
        },
        {
            parent: this,
            label: 'FindAllMapObjects',
            returnType: {name: 'List', typeArguments: [{name: 'MapObject', typeArguments: []}]},
            description: 'Returns all map objects in the game.',
            parameters: []
        },
        {
            parent: this,
            label: 'DestroyMapTargetable',
            returnType: {name: 'void', typeArguments: []},
            description: 'Destroys the given map targetable.',
            parameters: [
                { name: 'obj', type: {name: 'MapTargetable', typeArguments: []}, description: 'The map targetable to destroy.' }
            ]
        }
    ];
}

export const MapClassInstance: MapClass = new MapClass();
