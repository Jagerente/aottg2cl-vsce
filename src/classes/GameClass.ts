import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class GameClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Game';
    public description = 'Game functions such as spawning titans and managing game state.';

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [
        { parent: this, label: 'IsEnding', type: 'bool', description: 'Indicates if the game is currently ending.', readonly: true },
        { parent: this, label: 'EndTimeLeft', type: 'float', description: 'Time left before game restarts.', readonly: true },
        { parent: this, label: 'Titans', type: 'List(Titan)', description: 'List of titans currently alive.', readonly: true },
        { parent: this, label: 'Shifters', type: 'List(Shifter)', description: 'List of shifters currently alive.', readonly: true },
        { parent: this, label: 'Humans', type: 'List(Human)', description: 'List of humans currently alive.', readonly: true },
        { parent: this, label: 'AITitans', type: 'List(Titan)', description: 'List of AI titans currently alive.', readonly: true },
        { parent: this, label: 'AIShifters', type: 'List(Shifter)', description: 'List of AI shifters currently alive.', readonly: true },
        { parent: this, label: 'AIHumans', type: 'List(Human)', description: 'List of AI humans currently alive.', readonly: true },
        { parent: this, label: 'PlayerTitans', type: 'List(Titan)', description: 'List of player titans currently alive.', readonly: true },
        { parent: this, label: 'PlayerShifters', type: 'List(Shifter)', description: 'List of player shifters currently alive.', readonly: true },
        { parent: this, label: 'PlayerHumans', type: 'List(Human)', description: 'List of player humans currently alive.', readonly: true },
        { parent: this, label: 'Loadouts', type: 'List(string)', description: 'List of allowed player loadouts.', readonly: true },
        { parent: this, label: 'DefaultShowKillScore', type: 'bool', description: 'If false, kill scores will not automatically show upon player dealing character damage.' },
        { parent: this, label: 'DefaultShowKillFeed', type: 'bool', description: 'If false, kill feeds will not automatically show upon player kills.' },
        { parent: this, label: 'DefaultAddKillScore', type: 'bool', description: 'If false, kills will not automatically modify kills/damage/deaths stats.' },
        { parent: this, label: 'ShowScoreboardStatus', type: 'bool', description: 'Whether to show player alive/dead status in the scoreboard.' },
        { parent: this, label: 'ShowScoreboardLoadout', type: 'bool', description: 'Whether to show player character/loadout in the scoreboard.' },
        { parent: this, label: 'ForcedCharacterType', type: 'string', description: 'The forced character for the local player for the next spawn.' },
        { parent: this, label: 'ForcedLoadout', type: 'string', description: 'The forced loadout for the local player for the next spawn.' }
    ];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'Debug',
            returnType: 'void',
            description: 'Prints a message to the debug console (accessible using F11).',
            parameters: [
                { name: 'message', type: 'string', description: 'The message to print to the debug console.' }
            ]
        },
        {
            parent: this,
            label: 'Print',
            returnType: 'void',
            description: 'Prints a message to the chat window.',
            parameters: [
                { name: 'message', type: 'string', description: 'The message to print to the chat window.' }
            ]
        },
        {
            parent: this,
            label: 'PrintAll',
            returnType: 'void',
            description: 'Prints a message to all players\' chat windows.',
            parameters: [
                { name: 'message', type: 'string', description: 'The message to print to all players\' chat windows.' }
            ]
        },
        {
            parent: this,
            label: 'End',
            returnType: 'void',
            description: 'Ends the game and restarts after the given delay. Master client only.',
            parameters: [
                { name: 'delay', type: 'float', description: 'Time in seconds before the game restarts.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitan',
            returnType: 'Titan',
            description: 'Spawns a titan of a specific type. Master client only. Valid types: "Default", "Dummy", "Normal", "Abnormal", "Punk", "Crawler".',
            parameters: [
                { name: 'type', type: 'string', description: 'Type of titan to spawn.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitanAt',
            returnType: 'Titan',
            description: 'Spawns a titan at a specific position. Master client only.',
            parameters: [
                { name: 'type', type: 'string', description: 'Type of titan to spawn.' },
                { name: 'position', type: 'Vector3', description: 'The position to spawn the titan at.' },
                { name: 'rotationY', type: 'float', description: 'The Y-axis rotation of the titan.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitans',
            returnType: 'List(Titan)',
            description: 'Spawns the specified amount of titans. Master client only.',
            parameters: [
                { name: 'type', type: 'string', description: 'Type of titan to spawn.' },
                { name: 'amount', type: 'int', description: 'Number of titans to spawn.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitansAt',
            returnType: 'List(Titan)',
            description: 'Spawns the specified amount of titans at a position. Master client only.',
            parameters: [
                { name: 'type', type: 'string', description: 'Type of titan to spawn.' },
                { name: 'amount', type: 'int', description: 'Number of titans to spawn.' },
                { name: 'position', type: 'Vector3', description: 'The position to spawn the titans at.' },
                { name: 'rotationY', type: 'float', description: 'The Y-axis rotation of the titans.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitansAsync',
            returnType: 'void',
            description: 'Spawns titans over time. No titan list is returned.',
            parameters: [
                { name: 'type', type: 'string', description: 'Type of titan to spawn.' },
                { name: 'amount', type: 'int', description: 'Number of titans to spawn.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnTitansAtAsync',
            returnType: 'void',
            description: 'Spawn a number of titans at a given position over time. Master client only.',
            parameters: [
                { name: 'type', type: 'string', description: 'Type of titan to spawn.' },
                { name: 'amount', type: 'int', description: 'Number of titans to spawn.' },
                { name: 'position', type: 'Vector3', description: 'The position to spawn the titans at.' },
                { name: 'rotationY', type: 'float', description: 'The Y-axis rotation of the titans.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnShifter',
            returnType: 'Shifter',
            description: 'Spawns a shifter. Master client only. Valid types: "Annie".',
            parameters: [
                { name: 'type', type: 'string', description: 'Type of shifter to spawn.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnShifterAt',
            returnType: 'Shifter',
            description: 'Spawn a shifter at a specific position. Master client only.',
            parameters: [
                { name: 'type', type: 'string', description: 'Type of shifter to spawn.' },
                { name: 'position', type: 'Vector3', description: 'The position to spawn the shifter at.' },
                { name: 'rotationY', type: 'float', description: 'The Y-axis rotation of the shifter.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnPlayer',
            returnType: 'void',
            description: 'Spawns the given player. If force is true, respawns the player regardless of whether they are dead. Master client only.',
            parameters: [
                { name: 'player', type: 'Player', description: 'Player to spawn.' },
                { name: 'force', type: 'bool', description: 'Whether to forcefully respawn the player.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnPlayerAt',
            returnType: 'void',
            description: 'Spawns the given player at a specific position. Master client only.',
            parameters: [
                { name: 'player', type: 'Player', description: 'The player to spawn.' },
                { name: 'force', type: 'bool', description: 'If true, kills the existing player and respawns them.' },
                { name: 'position', type: 'Vector3', description: 'The position to spawn the player at.' },
                { name: 'rotationY', type: 'float', description: 'The Y-axis rotation of the player.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnPlayerAll',
            returnType: 'void',
            description: 'Spawns all players. Master client only.',
            parameters: [
                { name: 'force', type: 'bool', description: 'Whether to forcefully respawn all players.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnPlayerAtAll',
            returnType: 'void',
            description: 'Spawns all players at a specific position. Master client only.',
            parameters: [
                { name: 'force', type: 'bool', description: 'If true, kills existing players and respawns them.' },
                { name: 'position', type: 'Vector3', description: 'The position to spawn players at.' },
                { name: 'rotationY', type: 'float', description: 'The Y-axis rotation of the players.', isOptional: true }
            ]
        },
        {
            parent: this,
            label: 'GetGeneralSetting',
            returnType: 'bool | int | float | string',
            description: 'Retrieves the value of the given general tab setting.',
            parameters: [
                { name: 'setting', type: 'string', description: 'The general setting to retrieve.' }
            ]
        },
        {
            parent: this,
            label: 'GetTitanSetting',
            returnType: 'bool | int | float | string',
            description: 'Retrieves the value of the given titan tab setting.',
            parameters: [
                { name: 'setting', type: 'string', description: 'The titan setting to retrieve.' }
            ]
        },
        {
            parent: this,
            label: 'GetMiscSetting',
            returnType: 'bool | int | float | string',
            description: 'Retrieves the value of the given misc tab setting.',
            parameters: [
                { name: 'setting', type: 'string', description: 'The misc setting to retrieve.' }
            ]
        },
        {
            parent: this,
            label: 'SpawnProjectile',
            returnType: 'void',
            description: 'Spawns a projectile at a given position with specific parameters.',
            parameters: [
                { name: 'projectile', type: 'string', description: 'Type of projectile to spawn.' },
                { name: 'position', type: 'Vector3', description: 'Position to spawn the projectile.' },
                { name: 'rotation', type: 'Vector3', description: 'Rotation of the projectile.' },
                { name: 'velocity', type: 'Vector3', description: 'Velocity of the projectile.' },
                { name: 'gravity', type: 'Vector3', description: 'Gravity effect on the projectile.' },
                { name: 'liveTime', type: 'float', description: 'Duration for which the projectile will live.' },
                { name: 'team', type: 'string', description: 'Team that the projectile belongs to.' },
                { name: 'params', type: 'any', description: 'Extra params.', isVariadic: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnProjectileWithOwner',
            returnType: 'void',
            description: 'Spawns a projectile from the given character as its owner.',
            parameters: [
                { name: 'projectile', type: 'string', description: 'Type of projectile to spawn.' },
                { name: 'position', type: 'Vector3', description: 'Position to spawn the projectile.' },
                { name: 'rotation', type: 'Vector3', description: 'Rotation of the projectile.' },
                { name: 'velocity', type: 'Vector3', description: 'Velocity of the projectile.' },
                { name: 'gravity', type: 'Vector3', description: 'Gravity effect on the projectile.' },
                { name: 'liveTime', type: 'float', description: 'Duration for which the projectile will live.' },
                { name: 'owner', type: 'Character', description: 'The character who owns the projectile.' },
                { name: 'params', type: 'any', description: 'Extra params.', isVariadic: true }
            ]
        },
        {
            parent: this,
            label: 'SpawnEffect',
            returnType: 'void',
            description: 'Spawns an effect at a given position with specific parameters.',
            parameters: [
                { name: 'effect', type: 'string', description: 'Type of effect to spawn.' },
                { name: 'position', type: 'Vector3', description: 'Position to spawn the effect.' },
                { name: 'rotation', type: 'Vector3', description: 'Rotation of the effect.' },
                { name: 'scale', type: 'float', description: 'Scale of the effect.' },
                { name: 'params', type: 'any', description: 'Extra params.', isVariadic: true }
            ]
        },
        {
            parent: this,
            label: 'SetPlaylist',
            returnType: 'void',
            description: 'Sets the music playlist.',
            parameters: [
                { name: 'playlist', type: 'string', description: 'Name of the playlist to set (Default, Boss, Menu, Peaceful, Battle, Racing).' }
            ]
        },
        {
            parent: this,
            label: 'SetSong',
            returnType: 'void',
            description: 'Sets the music song to play.',
            parameters: [
                { name: 'song', type: 'string', description: 'Name of the song to play.' }
            ]
        },
        {
            parent: this,
            label: 'FindCharacterByViewID',
            returnType: 'Character',
            description: 'Returns a character by its network view ID.',
            parameters: [
                { name: 'viewID', type: 'int', description: 'Network view ID of the character.' }
            ]
        },
        {
            parent: this,
            label: 'ShowKillScore',
            returnType: 'void',
            description: 'Locally shows a kill score popup for the player.',
            parameters: [
                { name: 'score', type: 'int', description: 'The score to display.' }
            ]
        },
        {
            parent: this,
            label: 'ShowKillFeed',
            returnType: 'void',
            description: 'Locally shows a kill feed for the player.',
            parameters: [
                { name: 'killer', type: 'string', description: 'Name of the killer.' },
                { name: 'victim', type: 'string', description: 'Name of the victim.' },
                { name: 'score', type: 'int', description: 'Score value.' },
                { name: 'weapon', type: 'string', description: 'Weapon used. Valid options: Blades, AHSS, APG, Thunderspear, Titan, Shifter.' }
            ]
        },
        {
            parent: this,
            label: 'ShowKillFeedAll',
            returnType: 'void',
            description: 'Shows a kill feed for all players.',
            parameters: [
                { name: 'killer', type: 'string', description: 'Name of the killer.' },
                { name: 'victim', type: 'string', description: 'Name of the victim.' },
                { name: 'score', type: 'int', description: 'Score value.' },
                { name: 'weapon', type: 'string', description: 'Weapon used. Valid options: Blades, AHSS, APG, Thunderspear, Titan, Shifter.' }
            ]
        }
    ];
}

export const GameClassInstance: GameClass = new GameClass();
