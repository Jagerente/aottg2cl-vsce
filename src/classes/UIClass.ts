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
            parent: this,
            label: 'SetLabel',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the label at a certain location. Valid types: "TopCenter", "TopLeft", "TopRight", "MiddleCenter", "MiddleLeft", "MiddleRight", "BottomLeft", "BottomRight".',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'The label location.' },
                { name: 'label', type: {name: 'string', typeArguments: []}, description: 'The label content.' }
            ]
        },
        {
            parent: this,
            label: 'SetLabelForTime',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the label for a certain time, after which it will be cleared.',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'The label location.' },
                { name: 'label', type: {name: 'string', typeArguments: []}, description: 'The label content.' },
                { name: 'time', type: {name: 'float', typeArguments: []}, description: 'The time duration.' }
            ]
        },
        {
            parent: this,
            label: 'SetLabelAll',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the label for all players. Master client only.',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'The label location.' },
                { name: 'label', type: {name: 'string', typeArguments: []}, description: 'The label content.' }
            ]
        },
        {
            parent: this,
            label: 'SetLabelForTimeAll',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the label for all players for a certain time. Master client only.',
            parameters: [
                { name: 'type', type: {name: 'string', typeArguments: []}, description: 'The label location.' },
                { name: 'label', type: {name: 'string', typeArguments: []}, description: 'The label content.' },
                { name: 'time', type: {name: 'float', typeArguments: []}, description: 'The time duration.' }
            ]
        },
        {
            parent: this,
            label: 'CreatePopup',
            returnType: {name: 'void', typeArguments: []},
            description: 'Creates a new popup, hidden until shown.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The popup name.' },
                { name: 'title', type: {name: 'string', typeArguments: []}, description: 'The popup title.' },
                { name: 'width', type: {name: 'int', typeArguments: []}, description: 'The popup width.' },
                { name: 'height', type: {name: 'int', typeArguments: []}, description: 'The popup height.' }
            ]
        },
        {
            parent: this,
            label: 'IsPopupActive',
            returnType: {name: 'bool', typeArguments: []},
            description: 'Whether popup is active.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'Popup name.' },
            ]
        },
        {
            parent: this,
            label: 'GetPopups',
            returnType: {name: 'List', typeArguments: [{name: 'string', typeArguments: []}]},
            description: 'Returns all registered custom popups.',
            parameters: []
        },
        {
            parent: this,
            label: 'ShowPopup',
            returnType: {name: 'void', typeArguments: []},
            description: 'Shows the popup with the given name.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The popup name.' }
            ]
        },
        {
            parent: this,
            label: 'HidePopup',
            returnType: {name: 'void', typeArguments: []},
            description: 'Hides the popup with the given name.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The popup name.' }
            ]
        },
        {
            parent: this,
            label: 'ClearPopup',
            returnType: {name: 'void', typeArguments: []},
            description: 'Clears all elements in the popup with the given name.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The popup name.' }
            ]
        },
        {
            parent: this,
            label: 'AddPopupLabel',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds a text row to the popup with label as content.',
            parameters: [
                { name: 'name', type: {name: 'string', typeArguments: []}, description: 'The popup name.' },
                { name: 'label', type: {name: 'string', typeArguments: []}, description: 'The label text.' }
            ]
        },
        {
            parent: this,
            label: 'AddPopupButton',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds a button row to the popup.',
            parameters: [
                { name: 'popupName', type: {name: 'string', typeArguments: []}, description: 'The popup name.' },
                { name: 'buttonName', type: {name: 'string', typeArguments: []}, description: 'The button name.' },
                { name: 'buttonText', type: {name: 'string', typeArguments: []}, description: 'The button text.' }
            ]
        },
        {
            parent: this,
            label: 'AddPopupButtons',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds a list of buttons in a row to the popup.',
            parameters: [
                { name: 'popupName', type: {name: 'string', typeArguments: []}, description: 'The popup name.' },
                { name: 'buttonNames', type: {name: 'List', typeArguments: [{name: 'string', typeArguments: []}]}, description: 'List of button names.' },
                { name: 'buttonTitles', type: {name: 'List', typeArguments: [{name: 'string', typeArguments: []}]}, description: 'List of button titles.' }
            ]
        },
        {
            parent: this,
            label: 'AddPopupBottomButton',
            returnType: {name: 'void', typeArguments: []},
            description: 'Adds a button to the bottom bar of the popup.',
            parameters: [
                { name: 'popupName', type: {name: 'string', typeArguments: []}, description: 'The popup name.' },
                { name: 'buttonName', type: {name: 'string', typeArguments: []}, description: 'The button name.' },
                { name: 'buttonText', type: {name: 'string', typeArguments: []}, description: 'The button text.' }
            ]
        },
        {
            parent: this,
            label: 'WrapStyleTag',
            returnType: {name: 'string', typeArguments: []},
            description: 'Returns a wrapped string given style and args.',
            parameters: [
                { name: 'text', type: {name: 'string', typeArguments: []}, description: 'The text to wrap.' },
                { name: 'style', type: {name: 'string', typeArguments: []}, description: 'The style to apply.' },
                { name: 'args', type: {name: 'string', typeArguments: []}, description: 'Additional arguments for the style.' }
            ]
        },
        {
            parent: this,
            label: 'GetLocale',
            returnType: {name: 'string', typeArguments: []},
            description: 'Gets translated locale from the current Language.json file.',
            parameters: [
                { name: 'category', type: {name: 'string', typeArguments: []}, description: 'The locale category.' },
                { name: 'subcategory', type: {name: 'string', typeArguments: []}, description: 'The locale subcategory.' },
                { name: 'key', type: {name: 'string', typeArguments: []}, description: 'The locale key.' }
            ]
        },
        {
            parent: this,
            label: 'GetLanguage',
            returnType: {name: 'string', typeArguments: []},
            description: 'Returns the current language (ie "English").',
            parameters: []
        },
        {
            parent: this,
            label: 'ShowChangeCharacterMenu',
            returnType: {name: 'void', typeArguments: []},
            description: 'Shows the change character menu if the main character is Human.',
            parameters: []
        },
        {
            parent: this,
            label: 'SetScoreboardHeader',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets the display of the scoreboard header.',
            parameters: [
                { name: 'header', type: {name: 'string', typeArguments: []}, description: 'The scoreboard header text.' }
            ]
        },
        {
            parent: this,
            label: 'SetScoreboardProperty',
            returnType: {name: 'void', typeArguments: []},
            description: 'Sets which Player custom property to display on the scoreboard.',
            parameters: [
                { name: 'property', type: {name: 'string', typeArguments: []}, description: 'The custom property to display.' }
            ]
        },
        {
            parent: this,
            label: 'GetThemeColor',
            returnType: {name: 'Color', typeArguments: []},
            description: 'Gets the color of the specified item. See theme JSON for reference.',
            parameters: [
                { name: 'panel', type: {name: 'string', typeArguments: []}, description: 'The panel to query.' },
                { name: 'category', type: {name: 'string', typeArguments: []}, description: 'The category within the panel.' },
                { name: 'item', type: {name: 'string', typeArguments: []}, description: 'The specific item to get the color for.' }
            ]
        }
    ];
}

export const UIClassInstance: UIClass = new UIClass();
