import { IClass, IMethod, ClassKinds, IField } from './IClass';
import { BaseMainClass } from './BaseMainClass';
import { BaseNetworkClassInstance } from './BaseNetworkClass';

export class BaseComponentsClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Component';
    public description = 'Base class for components, providing callback functions specific to components. Components also inherit all callbacks from Main.';
    public hidden = true;

    public extends: IClass[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [];

    public instanceFields: IField[] = [
        {
            parent: this,
            label: 'MapObject',
            type: {name: 'MapObject', typeArguments: []},
            description: 'The MapObject the component is attached to.',
        },
        {
            parent: this,
            label: 'NetworkView',
            type: {name: 'NetworkView', typeArguments: []},
            description: 'The NetworkView attached to the MapObject, if Networked is enabled.',
        },
    ];

    public instanceMethods: IMethod[] = [
        {
            parent: this,
            label: 'OnCollisionEnter',
            returnType: {name: 'void', typeArguments: []},
            description: 'Called upon another object first colliding with the attached MapObject.',
            parameters: [
                { name: 'other', type: {name: 'Object', typeArguments: []}, description: 'The other object that collided.', isOptional: false, isVariadic: false }
            ]
        },
        {
            parent: this,
            label: 'OnCollisionStay',
            returnType: {name: 'void', typeArguments: []},
            description: 'Called every frame while another object is colliding with the attached MapObject.',
            parameters: [
                { name: 'other', type: {name: 'Object', typeArguments: []}, description: 'The other object that is colliding.', isOptional: false, isVariadic: false }
            ]
        },
        {
            parent: this,
            label: 'OnCollisionExit',
            returnType: {name: 'void', typeArguments: []},
            description: 'Called upon another object exiting collision with the attached MapObject.',
            parameters: [
                { name: 'other', type: {name: 'Object', typeArguments: []}, description: 'The other object that stopped colliding.', isOptional: false, isVariadic: false }
            ]
        },
        {
            parent: this,
            label: 'OnGetHit',
            returnType: {name: 'void', typeArguments: []},
            description: 'Called upon getting hit by a hitbox, such as a blade or titan attack. Only called if the MapObject has a collider of layer "Hitboxes" attached.',
            parameters: [
                { name: 'character', type: {name: 'Character', typeArguments: []}, description: 'The character that hit this object.', isOptional: false, isVariadic: false },
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the attacker or object.', isOptional: false, isVariadic: false },
                { name: 'damage', type: {name: 'int', typeArguments: []}, description: 'Amount of damage dealt.', isOptional: false, isVariadic: false },
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'The type of hit (e.g., blade or titan attack).', isOptional: false, isVariadic: false }
            ]
        },
        {
            parent: this,
            label: 'OnGetHooked',
            returnType: {name: 'void', typeArguments: []},
            description: 'Called upon getting hit by a hook. Only runs for your player character.',
            parameters: [
                { name: 'human', type: {name: 'Human', typeArguments: []}, description: 'The human who hooked this object.', isOptional: false, isVariadic: false },
                { name: 'hookPosition', type: { name: 'Vector3', typeArguments: [] }, description: 'The position where the hook hit.', isOptional: false, isVariadic: false },
                { name: 'leftHook', type: { name: 'bool', typeArguments: [] }, description: 'True if it was the left hook, false otherwise.', isOptional: false, isVariadic: false }
            ]
        }
    ];

    constructor() {
        this.extends = [
            new BaseMainClass(),
            BaseNetworkClassInstance
        ];
    }
}

export const BaseComponentClassInstance: BaseComponentsClass = new BaseComponentsClass();
