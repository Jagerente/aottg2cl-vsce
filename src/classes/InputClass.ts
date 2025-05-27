import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class InputClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Input';
    public description = 'Reading player key inputs. Note that inputs are best handled in OnFrame rather than OnTick, due to being updated every frame and not every physics tick.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [];
    
    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'GetKeyName',
            returnType: {name: 'string', typeArguments: []},
            description: 'Gets the key name the player assigned to the key setting. Example: GetKeyName("General/Forward") will return the keybind at that setting. Note that key names are PascalCase, for example "Special attack" should be referenced as "SpecialAttack".',
            parameters: [
                { name: 'key', type: {name: 'string', typeArguments: []}, description: 'The key setting to check.' }
            ]
        },
        {
            parent: this,
            label: 'GetKeyHold',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Whether or not the key is being held down. Example: GetKey("Human/HookLeft").',
            parameters: [
                { name: 'key', type: {name: 'string', typeArguments: []}, description: 'The key setting to check.' }
            ]
        },
        {
            parent: this,
            label: 'GetKeyDown',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Whether or not the key is first pressed this frame.',
            parameters: [
                { name: 'key', type: {name: 'string', typeArguments: []}, description: 'The key setting to check.' }
            ]
        },
        {
            parent: this,
            label: 'GetKeyUp',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Whether or not the key is first released this frame.',
            parameters: [
                { name: 'key', type: {name: 'string', typeArguments: []}, description: 'The key setting to check.' }
            ]
        },
        {
            parent: this,
            label: 'GetMouseAim',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets a Vector3 that represents the point the mouse pointer is aiming at. Note that this is not a direction but a world-space position of the closest object the mouse is aiming at.',
            parameters: []
        },
        {
            parent: this,
            label: 'GetMouseSpeed',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the user mouse speed.',
            parameters: []
        },
        {
            parent: this,
            label: 'GetMousePosition',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the user mouse position.',
            parameters: []
        },
        {
            parent: this,
            label: 'GetScreenDimensions',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the user screen dimensions.',
            parameters: []
        },
        {
            parent: this,
            label: 'SetKeyDefaultEnabled',
            returnType: {name: 'void', typeArguments: []},
            description: 'Enables or disables the default behavior for the specified keybind. If set to false, the keybind will not trigger the normal in-game action.',
            parameters: [
                { name: 'key', type: {name: 'string', typeArguments: []}, description: 'The key setting to modify.' },
                { name: 'enable', type: { name: 'bool', typeArguments: [] }, description: 'Enable or disable default input.' }
            ]
        },
        {
            parent: this,
            label: 'SetKeyHold',
            returnType: {name: 'void', typeArguments: []},
            description: 'Simulates holding down the specified keybind. If set to true, the game will act as if the player is holding down the key.',
            parameters: [
                { name: 'key', type: {name: 'string', typeArguments: []}, description: 'The key setting to modify.' }
            ]
        },
        {
            parent: this,
            label: 'CursorAimDirection',
            returnType: {name: 'Vector3', typeArguments: []},
            description: 'Gets the direction ray of the cursor.',
            parameters: []
        }        
    ];
}

export const InputClassInstance: InputClass = new InputClass();
