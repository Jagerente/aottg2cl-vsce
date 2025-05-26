import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class GameClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Game';
    public description = 'Game functions such as spawning titans and managing game state.';

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [
        { parent: this, label: 'IsEnding', type: { name: 'bool', typeArguments: [] }, description: 'Indicates if the game is currently ending.', readonly: true },
        { parent: this, label: 'EndTimeLeft', type: {name: 'float', typeArguments: []}, description: 'Time left before game restarts.', readonly: true },
        { parent: this, label: 'Titans', type: {name: 'List', typeArguments: [{name: 'Titan', typeArguments: []}]}, description: 'List of titans currently alive.', readonly: true },
        { parent: this, label: 'Shifters', type: {name: 'List', typeArguments: [{name: 'Shifter', typeArguments: []}]}, description: 'List of shifters currently alive.', readonly: true },
        { parent: this, label: 'Humans', type: {name: 'List', typeArguments: [{name: 'Human', typeArguments: []}]}, description: 'List of humans currently alive.', readonly: true },
        { parent: this, label: 'AITitans', type: {name: 'List', typeArguments: [{name: 'Titan', typeArguments: []}]}, description: 'List of AI titans currently alive.', readonly: true },
        { parent: this, label: 'AIShifters', type: {name: 'List', typeArguments: [{name: 'Shifter', typeArguments: []}]}, description: 'List of AI shifters currently alive.', readonly: true },
        { parent: this, label: 'AIHumans', type: {name: 'List', typeArguments: [{name: 'Human', typeArguments: []}]}, description: 'List of AI humans currently alive.', readonly: true },
        { parent: this, label: 'PlayerTitans', type: {name: 'List', typeArguments: [{name: 'Titan', typeArguments: []}]}, description: 'List of player titans currently alive.', readonly: true },
        { parent: this, label: 'PlayerShifters', type: {name: 'List', typeArguments: [{name: 'Shifter', typeArguments: []}]}, description: 'List of player shifters currently alive.', readonly: true },
        { parent: this, label: 'PlayerHumans', type: {name: 'List', typeArguments: [{name: 'Human', typeArguments: []}]}, description: 'List of player humans currently alive.', readonly: true },
        { parent: this, label: 'Loadouts', type: {name: 'List', typeArguments: [{name: 'string', typeArguments: []}]}, description: 'List of allowed player loadouts.', readonly: true },
        { parent: this, label: 'DefaultShowKillScore', type: { name: 'bool', typeArguments: [] }, description: 'If false, kill scores will not automatically show upon player dealing character damage.' },
        { parent: this, label: 'DefaultShowKillFeed', type: { name: 'bool', typeArguments: [] }, description: 'If false, kill feeds will not automatically show upon player kills.' },
        { parent: this, label: 'DefaultAddKillScore', type: { name: 'bool', typeArguments: [] }, description: 'If false, kills will not automatically modify kills/damage/deaths stats.' },
        { parent: this, label: 'ShowScoreboardStatus', type: { name: 'bool', typeArguments: [] }, description: 'Whether to show player alive/dead status in the scoreboard.' },
        { parent: this, label: 'ShowScoreboardLoadout', type: { name: 'bool', typeArguments: [] }, description: 'Whether to show player character/loadout in the scoreboard.' },
        { parent: this, label: 'ForcedCharacterType', type: {name: 'string', typeArguments: []}, description: 'The forced character for the local player for the next spawn.' },
        { parent: this, label: 'ForcedLoadout', type: {name: 'string', typeArguments: []}, description: 'The forced loadout for the local player for the next spawn.' }
    ];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'Debug',
            returnType: {name: 'void', typeArguments: []},
            description: 'Prints a message to the debug console (accessible using F11).',
            parameters: [
                { name: 'message', type: {name: 'string', typeArguments: []}, description: 'The message to print to the debug console.' }
            ]
        },
        {
            parent: this,
            label: 'Print',
            returnType: {name: 'void', typeArguments: []},
            description: 'Prints a message to the chat window.',
            parameters: [
                { name: 'message', type: {name: 'string', typeArguments: []}, description: 'The message to print to the chat window.' }
            ]
        },
        {
            parent: this,
            label: 'PrintAll',
            returnType: {name: 'void', typeArguments: []},
            description: 'Prints a message to all players\' chat windows.',
            parameters: [
                { name: 'message', type: {name: 'string', typeArguments: []}, description: 'The message to print to all players\' chat windows.' }
            ]
        },
        {
            parent: this,
            label: 'End',
            returnType: {name: 'void', typeArguments: []},
            description: 'Ends the game and restarts after the given delay. Master client only.',
            parameters: [
                { name: 'delay', type: {name: 'float', typeArguments: []}, description: 'Time in seconds before the game restarts.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitan',
            returnType: { name: 'Titan', typeArguments: [] },
            description: 'Spawns a titan of a specific type. Master client only. Valid types: "Default", "Dummy", "Normal", "Abnormal", "Punk", "Crawler".',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'Type of titan to spawn.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitanAt',
            returnType: { name: 'Titan', typeArguments: [] },
            description: 'Spawns a titan at a specific position. Master client only.',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'Type of titan to spawn.' },
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to spawn the titan at.' },
                { name: 'rotationY', type: {name: 'float', typeArguments: []}, description: 'The Y-axis rotation of the titan.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitans',
            returnType: {name: 'List', typeArguments: [{name: 'Titan', typeArguments: []}]},
            description: 'Spawns the specified amount of titans. Master client only.',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'Type of titan to spawn.' },
                { name: 'amount', type: {name: 'int', typeArguments: []}, description: 'Number of titans to spawn.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitansAt',
            returnType: {name: 'List', typeArguments: [{name: 'Titan', typeArguments: []}]},
            description: 'Spawns the specified amount of titans at a position. Master client only.',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'Type of titan to spawn.' },
                { name: 'amount', type: {name: 'int', typeArguments: []}, description: 'Number of titans to spawn.' },
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to spawn the titans at.' },
                { name: 'rotationY', type: {name: 'float', typeArguments: []}, description: 'The Y-axis rotation of the titans.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitansAsync',
            returnType: {name: 'void', typeArguments: []},
            description: 'Spawns titans over time. No titan list is returned.',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'Type of titan to spawn.' },
                { name: 'amount', type: {name: 'int', typeArguments: []}, description: 'Number of titans to spawn.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitansAtAsync',
            returnType: {name: 'void', typeArguments: []},
            description: 'Spawn a number of titans at a given position over time. Master client only.',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'Type of titan to spawn.' },
                { name: 'amount', type: {name: 'int', typeArguments: []}, description: 'Number of titans to spawn.' },
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to spawn the titans at.' },
                { name: 'rotationY', type: {name: 'float', typeArguments: []}, description: 'The Y-axis rotation of the titans.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnShifter',
            returnType: {name: 'Sh', typeArguments: []},
            description: 'Spawns a shifter. Master client only. Valid types: "Annie".',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'Type of shifter to spawn.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnShifterAt',
            returnType: {name: 'Sh', typeArguments: []},
            description: 'Spawn a shifter at a specific position. Master client only.',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'Type of shifter to spawn.' },
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to spawn the shifter at.' },
                { name: 'rotationY', type: {name: 'float', typeArguments: []}, description: 'The Y-axis rotation of the shifter.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnPlayer',
            returnType: {name: 'void', typeArguments: []},
            description: 'Spawns the given player. If force is true, respawns the player regardless of whether they are dead. Master client only.',
            parameters: [
                { name: 'player', type: {name: 'Player', typeArguments: []}, description: 'Player to spawn.' },
                { name: 'force', type: { name: 'bool', typeArguments: [] }, description: 'Whether to forcefully respawn the player.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnPlayerAt',
            returnType: {name: 'void', typeArguments: []},
            description: 'Spawns the given player at a specific position. Master client only.',
            parameters: [
                { name: 'player', type: {name: 'Player', typeArguments: []}, description: 'The player to spawn.' },
                { name: 'force', type: { name: 'bool', typeArguments: [] }, description: 'If true, kills the existing player and respawns them.' },
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to spawn the player at.' },
                { name: 'rotationY', type: {name: 'float', typeArguments: []}, description: 'The Y-axis rotation of the player.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnPlayerAll',
            returnType: {name: 'void', typeArguments: []},
            description: 'Spawns all players. Master client only.',
            parameters: [
                { name: 'force', type: { name: 'bool', typeArguments: [] }, description: 'Whether to forcefully respawn all players.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnPlayerAtAll',
            returnType: {name: 'void', typeArguments: []},
            description: 'Spawns all players at a specific position. Master client only.',
            parameters: [
                { name: 'force', type: { name: 'bool', typeArguments: [] }, description: 'If true, kills existing players and respawns them.' },
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'The position to spawn players at.' },
                { name: 'rotationY', type: {name: 'float', typeArguments: []}, description: 'The Y-axis rotation of the players.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'GetGeneralSetting',
            returnType: {name: 'bool | int | float | string', typeArguments: []},
            description: 'Retrieves the value of the given general tab setting.',
            parameters: [
                { name: 'setting', type: {name: 'string', typeArguments: []}, description: 'The general setting to retrieve.' }
            ]
        },
        {
            parent: this,
            label: 'GetTitanSetting',
            returnType: {name: 'bool | int | float | string', typeArguments: []},
            description: 'Retrieves the value of the given titan tab setting.',
            parameters: [
                { name: 'setting', type: {name: 'string', typeArguments: []}, description: 'The titan setting to retrieve.' }
            ]
        },
        {
            parent: this,
            label: 'GetMiscSetting',
            returnType: {name: 'bool | int | float | string', typeArguments: []},
            description: 'Retrieves the value of the given misc tab setting.',
            parameters: [
                { name: 'setting', type: {name: 'string', typeArguments: []}, description: 'The misc setting to retrieve.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnProjectile',
            returnType: {name: 'void', typeArguments: []},
            description: 'Spawns a projectile at a given position with specific parameters.',
            parameters: [
                { name: 'projectile', type: {name: 'string', typeArguments: []}, description: 'Type of projectile to spawn.' },
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'Position to spawn the projectile.' },
                { name: 'rotation', type: { name: 'Vector3', typeArguments: [] }, description: 'Rotation of the projectile.' },
                { name: 'velocity', type: { name: 'Vector3', typeArguments: [] }, description: 'Velocity of the projectile.' },
                { name: 'gravity', type: { name: 'Vector3', typeArguments: [] }, description: 'Gravity effect on the projectile.' },
                { name: 'liveTime', type: {name: 'float', typeArguments: []}, description: 'Duration for which the projectile will live.' },
                { name: 'team', type: {name: 'string', typeArguments: []}, description: 'Team that the projectile belongs to.' },
                { name: 'params', type: {name: 'any', typeArguments: []}, description: 'Extra params.', isVariadic: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnProjectileWithOwner',
            returnType: {name: 'void', typeArguments: []},
            description: 'Spawns a projectile from the given character as its owner.',
            parameters: [
                { name: 'projectile', type: {name: 'string', typeArguments: []}, description: 'Type of projectile to spawn.' },
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'Position to spawn the projectile.' },
                { name: 'rotation', type: { name: 'Vector3', typeArguments: [] }, description: 'Rotation of the projectile.' },
                { name: 'velocity', type: { name: 'Vector3', typeArguments: [] }, description: 'Velocity of the projectile.' },
                { name: 'gravity', type: { name: 'Vector3', typeArguments: [] }, description: 'Gravity effect on the projectile.' },
                { name: 'liveTime', type: {name: 'float', typeArguments: []}, description: 'Duration for which the projectile will live.' },
                { name: 'owner', type: {name: 'Character', typeArguments: []}, description: 'The character who owns the projectile.' },
                { name: 'params', type: {name: 'any', typeArguments: []}, description: 'Extra params.', isVariadic: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnEffect',
            returnType: {name: 'void', typeArguments: []},
            description: 'Spawns an effect at a given position with specific parameters.',
            parameters: [
                { name: 'effect', type: {name: 'string', typeArguments: []}, description: 'Type of effect to spawn.' },
                { name: 'position', type: { name: 'Vector3', typeArguments: [] }, description: 'Position to spawn the effect.' },
                { name: 'rotation', type: { name: 'Vector3', typeArguments: [] }, description: 'Rotation of the effect.' },
                { name: 'scale', type: {name: 'float', typeArguments: []}, description: 'Scale of the effect.' },
                { name: 'params', type: {name: 'any', typeArguments: []}, description: 'Extra params.', isVariadic: true }
            ]
        },
        {
            parent: this,
            label: 'SetPlaylist',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the music playlist.',
            parameters: [
                { name: 'playlist', type: {name: 'string', typeArguments: []}, description: 'Name of the playlist to set (Default, Boss, Menu, Peaceful, Battle, Racing).' }
            ]
        },
        {
            parent: this,
            label: 'SetSong',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the music song to play.',
            parameters: [
                { name: 'song', type: {name: 'string', typeArguments: []}, description: 'Name of the song to play.' }
            ]
        },
        {
            parent: this,
            label: 'FindCharacterByViewID',
            returnType: {name: 'Character', typeArguments: []},
            description: 'Returns a character by its network view ID.',
            parameters: [
                { name: 'viewID', type: {name: 'int', typeArguments: []}, description: 'Network view ID of the character.' }
            ]
        },
        {
            parent: this,
            label: 'ShowKillScore',
            returnType: {name: 'void', typeArguments: []},
            description: 'Locally shows a kill score popup for the player.',
            parameters: [
                { name: 'score', type: {name: 'int', typeArguments: []}, description: 'The score to display.' }
            ]
        },
        {
            parent: this,
            label: 'ShowKillFeed',
            returnType: {name: 'void', typeArguments: []},
            description: 'Locally shows a kill feed for the player.',
            parameters: [
                { name: 'killer', type: {name: 'string', typeArguments: []}, description: 'Name of the killer.' },
                { name: 'victim', type: {name: 'string', typeArguments: []}, description: 'Name of the victim.' },
                { name: 'score', type: {name: 'int', typeArguments: []}, description: 'Score value.' },
                { name: 'weapon', type: {name: 'string', typeArguments: []}, description: 'Weapon used. Valid options: Blades, AHSS, APG, Thunderspear, Titan, Shifter.' }
            ]
        },
        {
            parent: this,
            label: 'ShowKillFeedAll',
            returnType: {name: 'void', typeArguments: []},
            description: 'Shows a kill feed for all players.',
            parameters: [
                { name: 'killer', type: {name: 'string', typeArguments: []}, description: 'Name of the killer.' },
                { name: 'victim', type: {name: 'string', typeArguments: []}, description: 'Name of the victim.' },
                { name: 'score', type: {name: 'int', typeArguments: []}, description: 'Score value.' },
                { name: 'weapon', type: {name: 'string', typeArguments: []}, description: 'Weapon used. Valid options: Blades, AHSS, APG, Thunderspear, Titan, Shifter.' }
            ]
        }
    ];
}

export const GameClassInstance: GameClass = new GameClass();
