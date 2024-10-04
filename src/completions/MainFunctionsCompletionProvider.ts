import * as vscode from 'vscode';
import { CodeContextUtils } from '../utils/CodeContextUtils';

export class MainFunctionsCompletionProvider implements vscode.CompletionItemProvider {
    private reservedFunctions = [
        { label: 'Init', description: 'Called upon class creation' },
        { label: 'OnGameStart', description: 'Called upon game start' },
        { label: 'OnTick', description: 'Called every fixed update frame (0.02 seconds)' },
        { label: 'OnFrame', description: 'Called every update frame' },
        { label: 'OnLateFrame', description: 'Called after every update frame' },
        { label: 'OnSecond', description: 'Called every second' },
        { label: 'OnChatInput', description: 'Called upon chat input from the player' },
        { label: 'OnPlayerSpawn', description: 'Called upon any player spawning' },
        { label: 'OnCharacterSpawn', description: 'Called upon any character spawning' },
        { label: 'OnCharacterDie', description: 'Called upon a character dying' },
        { label: 'OnCharacterDamaged', description: 'Called upon a character being damaged' },
        { label: 'OnPlayerJoin', description: 'Called upon a player joining the room' },
        { label: 'OnPlayerLeave', description: 'Called upon a player leaving the room' },
        { label: 'OnNetworkMessage', description: 'Called upon receiving Network.SendMessage' },
        { label: 'OnButtonClick', description: 'Called upon a UI button with a given name being pressed' }
    ];

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const isDeclaringFunction = CodeContextUtils.isDeclaringFunction(document, position)

        if (isDeclaringFunction) {
            return this.reservedFunctions.map(fn => {
                const item = new vscode.CompletionItem(fn.label, vscode.CompletionItemKind.Function);
                item.detail = 'Reserved function';
                item.documentation = new vscode.MarkdownString(fn.description);
                return item;
            });
        }

        return [];
    }
}
