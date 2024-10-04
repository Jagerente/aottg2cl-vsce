import { IClass, IField, IMethod } from './IClass';

export class CutsceneClass implements IClass {
    public name = 'Cutscene';
    public description = 'Cutscene functions for starting and managing cutscenes.';

    public instanceFields: IField[] = [];

    public instanceMethods: IMethod[] = [];

    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            label: 'Start',
            returnType: 'null',
            description: 'Starts cutscene with name. If full is true, will enter cinematic mode. Otherwise will only show dialogue while still allowing gameplay.',
            parameters: [
                { name: 'name', type: 'string', description: 'The name of the cutscene.' },
                { name: 'full', type: 'bool', description: 'Whether to enter full cinematic mode.' }
            ]
        },
        {
            label: 'ShowDialogue',
            returnType: 'null',
            description: 'Show dialogue screen with given icon, title, and content. Available icons are the same as profile icon names.',
            parameters: [
                { name: 'icon', type: 'string', description: 'The icon to show.' },
                { name: 'title', type: 'string', description: 'The title of the dialogue.' },
                { name: 'content', type: 'string', description: 'The content of the dialogue.' }
            ]
        },
        {
            label: 'HideDialogue',
            returnType: 'null',
            description: 'Hides the dialogue screen.',
            parameters: []
        }
    ];
}
