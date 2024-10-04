import { IClass, IField, IMethod } from './IClass';

export class InputClass implements IClass {
    public name = 'Input';
    public description = 'Reading player key inputs. Note that inputs are best handled in OnFrame rather than OnTick, due to being updated every frame and not every physics tick.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [];
    
    public staticMethods: IMethod[] = [
        {
            label: 'GetKeyName',
            returnType: 'string',
            description: 'Gets the key name the player assigned to the key setting. Example: GetKeyName("General/Forward") will return the keybind at that setting. Note that key names are PascalCase, for example "Special attack" should be referenced as "SpecialAttack".',
            parameters: [
                { name: 'key', type: 'string', description: 'The key setting to check.' }
            ]
        },
        {
            label: 'GetKeyHold',
            returnType: 'bool',
            description: 'Whether or not the key is being held down. Example: GetKey("Human/HookLeft").',
            parameters: [
                { name: 'key', type: 'string', description: 'The key setting to check.' }
            ]
        },
        {
            label: 'GetKeyDown',
            returnType: 'bool',
            description: 'Whether or not the key is first pressed this frame.',
            parameters: [
                { name: 'key', type: 'string', description: 'The key setting to check.' }
            ]
        },
        {
            label: 'GetKeyUp',
            returnType: 'bool',
            description: 'Whether or not the key is first released this frame.',
            parameters: [
                { name: 'key', type: 'string', description: 'The key setting to check.' }
            ]
        },
        {
            label: 'GetMouseAim',
            returnType: 'Vector3',
            description: 'Gets a Vector3 that represents the point the mouse pointer is aiming at. Note that this is not a direction but a world-space position of the closest object the mouse is aiming at.',
            parameters: []
        }
    ];
}
