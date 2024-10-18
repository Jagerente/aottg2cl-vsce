import { IClass, IMethod, ClassKinds, IField } from './IClass';
import { BaseMainClass } from './BaseMainClass';
import { BaseNetworkClassInstance } from './BaseNetworkClass';

export class BaseComponentsClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'BaseComponent';
    public description = 'Base class for components, providing callback functions specific to components. Components also inherit all callbacks from Main.';

    public extends: IClass[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];

    public instanceFields: IField[] = [
        {
            label: 'MapObject',
            type: 'MapObject',
            description: 'The MapObject the component is attached to.',
        },
        {
            label: 'NetworkView',
            type: 'NetworkView',
            description: 'The NetworkView attached to the MapObject, if Networked is enabled.',
        },
    ];

    public instanceMethods: IMethod[] = [
        {
            label: 'OnCollisionEnter',
            returnType: 'void',
            description: 'Called upon another object first colliding with the attached MapObject.',
            parameters: [
                { name: 'other', type: 'Object', description: 'The other object that collided.', isOptional: false, isVariadic: false }
            ]
        },
        {
            label: 'OnCollisionStay',
            returnType: 'void',
            description: 'Called every frame while another object is colliding with the attached MapObject.',
            parameters: [
                { name: 'other', type: 'Object', description: 'The other object that is colliding.', isOptional: false, isVariadic: false }
            ]
        },
        {
            label: 'OnCollisionExit',
            returnType: 'void',
            description: 'Called upon another object exiting collision with the attached MapObject.',
            parameters: [
                { name: 'other', type: 'Object', description: 'The other object that stopped colliding.', isOptional: false, isVariadic: false }
            ]
        },
        {
            label: 'OnGetHit',
            returnType: 'void',
            description: 'Called upon getting hit by a hitbox, such as a blade or titan attack. Only called if the MapObject has a collider of layer "Hitboxes" attached.',
            parameters: [
                { name: 'character', type: 'Character', description: 'The character that hit this object.', isOptional: false, isVariadic: false },
                { name: 'name', type: 'string', description: 'The name of the attacker or object.', isOptional: false, isVariadic: false },
                { name: 'damage', type: 'int', description: 'Amount of damage dealt.', isOptional: false, isVariadic: false },
                { name: 'type', type: 'string', description: 'The type of hit (e.g., blade or titan attack).', isOptional: false, isVariadic: false }
            ]
        },
        {
            label: 'OnGetHooked',
            returnType: 'void',
            description: 'Called upon getting hit by a hook. Only runs for your player character.',
            parameters: [
                { name: 'human', type: 'Human', description: 'The human who hooked this object.', isOptional: false, isVariadic: false },
                { name: 'hookPosition', type: 'Vector3', description: 'The position where the hook hit.', isOptional: false, isVariadic: false },
                { name: 'leftHook', type: 'bool', description: 'True if it was the left hook, false otherwise.', isOptional: false, isVariadic: false }
            ]
        }
    ];

    constructor(initReturnType: string) {
        this.extends = [
            new BaseMainClass(initReturnType),
            BaseNetworkClassInstance
        ];
    }
}
