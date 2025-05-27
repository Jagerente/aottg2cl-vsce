import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class CutsceneClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Cutscene';
    public description = 'Cutscene functions for starting and managing cutscenes.';

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            parent: this,
            label: 'Start',
            returnType: {name: 'void', typeArguments: []},
            description: 'Starts cutscene with name. If full is true, will enter cinematic mode. Otherwise will only show dialogue while still allowing gameplay.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The name of the cutscene.' },
                { name: 'full', type: { name: 'bool', typeArguments: [] }, description: 'Whether to enter full cinematic mode.' }
            ]
        },
        {
            parent: this,
            label: 'ShowDialogue',
            returnType: {name: 'void', typeArguments: []},
            description: 'Show dialogue screen with given icon, title, and content. Available icons are the same as profile icon names.',
            parameters: [
                { name: 'icon', type: {name: 'string', typeArguments: []}, description: 'The icon to show.' },
                { name: 'title', type: {name: 'string', typeArguments: []}, description: 'The title of the dialogue.' },
                { name: 'content', type: {name: 'string', typeArguments: []}, description: 'The content of the dialogue.' }
            ]
        },
        {
            parent: this,
            label: 'ShowDialogueForTime',
            returnType: {name: 'void', typeArguments: []},
            description: 'Show dialogue screen and automatically hide after time seconds.',
            parameters: [
                { name: 'icon', type: {name: 'string', typeArguments: []}, description: 'The icon to show.' },
                { name: 'title', type: {name: 'string', typeArguments: []}, description: 'The title of the dialogue.' },
                { name: 'content', type: {name: 'string', typeArguments: []}, description: 'The content of the dialogue.' },
                { name: 'time', type: {name: 'float', typeArguments: []}, description: 'Hide after.' }
            ]
        },
        {
            parent: this,
            label: 'HideDialogue',
            returnType: {name: 'void', typeArguments: []},
            description: 'Hides the dialogue screen.',
            parameters: []
        }
    ];
}

export const CutsceneClassInstance: CutsceneClass = new CutsceneClass();
