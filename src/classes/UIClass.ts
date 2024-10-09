import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class UIClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'UI';
    public description = 'UI label functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [];

    public staticMethods: IMethod[] = [
        {
            label: 'SetLabel',
            returnType: 'null',
            description: 'Sets the label at a certain location. Valid types: "TopCenter", "TopLeft", "TopRight", "MiddleCenter", "MiddleLeft", "MiddleRight", "BottomLeft", "BottomRight".',
            parameters: [
                { name: 'type', type: 'string', description: 'The label location.' },
                { name: 'label', type: 'string', description: 'The label content.' }
            ]
        },
        {
            label: 'SetLabelForTime',
            returnType: 'null',
            description: 'Sets the label for a certain time, after which it will be cleared.',
            parameters: [
                { name: 'type', type: 'string', description: 'The label location.' },
                { name: 'label', type: 'string', description: 'The label content.' },
                { name: 'time', type: 'float', description: 'The time duration.' }
            ]
        },
        {
            label: 'SetLabelAll',
            returnType: 'null',
            description: 'Sets the label for all players. Master client only.',
            parameters: [
                { name: 'type', type: 'string', description: 'The label location.' },
                { name: 'label', type: 'string', description: 'The label content.' }
            ]
        },
        {
            label: 'SetLabelForTimeAll',
            returnType: 'null',
            description: 'Sets the label for all players for a certain time. Master client only.',
            parameters: [
                { name: 'type', type: 'string', description: 'The label location.' },
                { name: 'label', type: 'string', description: 'The label content.' },
                { name: 'time', type: 'float', description: 'The time duration.' }
            ]
        },
        {
            label: 'CreatePopup',
            returnType: 'null',
            description: 'Creates a new popup, hidden until shown.',
            parameters: [
                { name: 'name', type: 'string', description: 'The popup name.' },
                { name: 'title', type: 'string', description: 'The popup title.' },
                { name: 'width', type: 'int', description: 'The popup width.' },
                { name: 'height', type: 'int', description: 'The popup height.' }
            ]
        },
        {
            label: 'ShowPopup',
            returnType: 'null',
            description: 'Shows the popup with the given name.',
            parameters: [
                { name: 'name', type: 'string', description: 'The popup name.' }
            ]
        },
        {
            label: 'HidePopup',
            returnType: 'null',
            description: 'Hides the popup with the given name.',
            parameters: [
                { name: 'name', type: 'string', description: 'The popup name.' }
            ]
        },
        {
            label: 'ClearPopup',
            returnType: 'null',
            description: 'Clears all elements in the popup with the given name.',
            parameters: [
                { name: 'name', type: 'string', description: 'The popup name.' }
            ]
        },
        {
            label: 'AddPopupLabel',
            returnType: 'null',
            description: 'Adds a text row to the popup with label as content.',
            parameters: [
                { name: 'name', type: 'string', description: 'The popup name.' },
                { name: 'label', type: 'string', description: 'The label text.' }
            ]
        },
        {
            label: 'AddPopupButton',
            returnType: 'null',
            description: 'Adds a button row to the popup.',
            parameters: [
                { name: 'popupName', type: 'string', description: 'The popup name.' },
                { name: 'buttonName', type: 'string', description: 'The button name.' },
                { name: 'buttonText', type: 'string', description: 'The button text.' }
            ]
        },
        {
            label: 'AddPopupButtons',
            returnType: 'null',
            description: 'Adds a list of buttons in a row to the popup.',
            parameters: [
                { name: 'popupName', type: 'string', description: 'The popup name.' },
                { name: 'buttonNames', type: 'List', description: 'List of button names.' },
                { name: 'buttonTitles', type: 'List', description: 'List of button titles.' }
            ]
        },
        {
            label: 'AddPopupBottomButton',
            returnType: 'null',
            description: 'Adds a button to the bottom bar of the popup.',
            parameters: [
                { name: 'popupName', type: 'string', description: 'The popup name.' },
                { name: 'buttonName', type: 'string', description: 'The button name.' },
                { name: 'buttonText', type: 'string', description: 'The button text.' }
            ]
        },
        {
            label: 'WrapStyleTag',
            returnType: 'string',
            description: 'Returns a wrapped string given style and args.',
            parameters: [
                { name: 'text', type: 'string', description: 'The text to wrap.' },
                { name: 'style', type: 'string', description: 'The style to apply.' },
                { name: 'args', type: 'string', description: 'Additional arguments for the style.' }
            ]
        },
        {
            label: 'GetLocale',
            returnType: 'string',
            description: 'Gets translated locale from the current Language.json file.',
            parameters: [
                { name: 'category', type: 'string', description: 'The locale category.' },
                { name: 'subcategory', type: 'string', description: 'The locale subcategory.' },
                { name: 'key', type: 'string', description: 'The locale key.' }
            ]
        },
        {
            label: 'GetLanguage',
            returnType: 'string',
            description: 'Returns the current language (ie "English").',
            parameters: []
        },
        {
            label: 'ShowChangeCharacterMenu',
            returnType: 'null',
            description: 'Shows the change character menu if the main character is Human.',
            parameters: []
        },
        {
            label: 'SetScoreboardHeader',
            returnType: 'null',
            description: 'Sets the display of the scoreboard header.',
            parameters: [
                { name: 'header', type: 'string', description: 'The scoreboard header text.' }
            ]
        },
        {
            label: 'SetScoreboardProperty',
            returnType: 'null',
            description: 'Sets which Player custom property to display on the scoreboard.',
            parameters: [
                { name: 'property', type: 'string', description: 'The custom property to display.' }
            ]
        }
    ];
}

export const UIClassInstance: UIClass = new UIClass();
