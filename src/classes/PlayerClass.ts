import { IClass, IField, IMethod } from './IClass';

export class PlayerClass implements IClass {
    public name = 'Player';
    public description = 'Represents a network player. Only the master client or the player themselves may modify fields.';

    public staticFields: IField[] = []; 
    public staticMethods: IMethod[] = [];

    public instanceFields: IField[] = [
        { label: 'Character', type: 'Character', description: "Player's current character, if alive." },
        { label: 'Connected', type: 'float', description: 'Player is still connected to the room.' },
        { label: 'ID', type: 'int', description: 'Player unique ID.' },
        { label: 'Name', type: 'string', description: 'Player name.' },
        { label: 'Guild', type: 'string', description: 'Player guild.' },
        { label: 'Team', type: 'string', description: 'Player\'s chosen team ("None", "Blue", "Red", "Titan", "Human").' },
        { label: 'Status', type: 'string', description: 'Player\'s spawn status ("Alive", "Dead", "Spectating").' },
        { label: 'CharacterType', type: 'string', description: 'Player\'s chosen character ("Human", "Titan", "Shifter").' },
        { label: 'Loadout', type: 'string', description: 'Player\'s chosen loadout ("Blades", "AHSS", "APG", "ThunderSpear").' },
        { label: 'Kills', type: 'int', description: 'Player kills.' },
        { label: 'Deaths', type: 'int', description: 'Player deaths.' },
        { label: 'HighestDamage', type: 'int', description: 'Player highest damage.' },
        { label: 'TotalDamage', type: 'int', description: 'Player total damage.' },
        { label: 'SpawnPoint', type: 'Vector3', description: "Player\'s respawn point. Can be null." }
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'GetCustomProperty',
            returnType: 'Object',
            description: 'Get a custom property at the given key. Must be a primitive type. This is synced to all clients.',
            parameters: [{ name: 'key', type: 'string', description: 'The key for the custom property.' }]
        },
        {
            label: 'SetCustomProperty',
            returnType: 'null',
            description: 'Sets a custom property at the given key. Must be a primitive type. This is synced to all clients.',
            parameters: [
                { name: 'key', type: 'string', description: 'The key for the custom property.' },
                { name: 'value', type: 'Object', description: 'The value to assign to the custom property.' }
            ]
        },
        {
            label: 'ClearKDR',
            returnType: 'null',
            description: 'Clears kills, deaths, highest damage, and total damage properties.',
            parameters: []
        }
    ];
}
