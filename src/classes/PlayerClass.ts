import { ClassKinds, IClass, IField, IMethod } from './IClass';
import { ObjectClassInstance } from './ObjectClass';

export class PlayerClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Player';
    public description = 'Represents a network player. Only the master client or the player themselves may modify fields.';

    public extends?: IClass[] = [ObjectClassInstance];

    public staticFields: IField[] = []; 

    public staticMethods: IMethod[] = [];

    public instanceFields: IField[] = [
        { parent: this, label: 'Character', type: 'Character', description: "Player's current character, if alive." },
        { parent: this, label: 'Connected', type: 'float', description: 'Player is still connected to the room.' },
        { parent: this, label: 'ID', type: 'int', description: 'Player unique ID.' },
        { parent: this, label: 'Name', type: 'string', description: 'Player name.' },
        { parent: this, label: 'Guild', type: 'string', description: 'Player guild.' },
        { parent: this, label: 'Team', type: 'string', description: 'Player\'s chosen team ("None", "Blue", "Red", "Titan", "Human").' },
        { parent: this, label: 'Status', type: 'string', description: 'Player\'s spawn status ("Alive", "Dead", "Spectating").' },
        { parent: this, label: 'CharacterType', type: 'string', description: 'Player\'s chosen character ("Human", "Titan", "Shifter").' },
        { parent: this, label: 'Loadout', type: 'string', description: 'Player\'s chosen loadout ("Blades", "AHSS", "APG", "ThunderSpear").' },
        { parent: this, label: 'Kills', type: 'int', description: 'Player kills.' },
        { parent: this, label: 'Deaths', type: 'int', description: 'Player deaths.' },
        { parent: this, label: 'HighestDamage', type: 'int', description: 'Player highest damage.' },
        { parent: this, label: 'TotalDamage', type: 'int', description: 'Player total damage.' },
        { parent: this, label: 'SpawnPoint', type: 'Vector3', description: "Player\'s respawn point. Can be null." },
        { parent: this, label: 'Ping', type: 'int', description: "The player's connection ping." },
        { parent: this, label: 'SpectateID', type: 'int', description: "The player's spectating ID. If not spectating anyone, returns -1." }
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'GetCustomProperty',
            returnType: 'Object',
            description: 'Get a custom property at the given key. Must be a primitive type. This is synced to all clients.',
            parameters: [{ name: 'key', type: 'string', description: 'The key for the custom property.' }]
        },
        {
            parent: this,
            label: 'SetCustomProperty',
            returnType: 'null',
            description: 'Sets a custom property at the given key. Must be a primitive type. This is synced to all clients.',
            parameters: [
                { name: 'key', type: 'string', description: 'The key for the custom property.' },
                { name: 'value', type: 'Object', description: 'The value to assign to the custom property.' }
            ]
        },
        {
            parent: this,
            label: 'ClearKDR',
            returnType: 'null',
            description: 'Clears kills, deaths, highest damage, and total damage properties.',
            parameters: []
        }
    ];
}

export const PlayerClassInstance: PlayerClass = new PlayerClass();
