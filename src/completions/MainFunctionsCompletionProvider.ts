import * as vscode from 'vscode';
import { CodeContextUtils } from '../utils/CodeContextUtils';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';
import { ClassKinds } from '../classes/IClass';

export class MainFunctionsCompletionProvider implements vscode.CompletionItemProvider {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    private reservedFunctions = [
        { label: 'Init', snippet: 'Init()\n{\n\t$0\n}', description: 'Called upon class creation' },
        { label: 'OnGameStart', snippet: 'OnGameStart()\n{\n\t$0\n}', description: 'Called upon game start' },
        { label: 'OnTick', snippet: 'OnTick()\n{\n\t$0\n}', description: 'Called every fixed update frame (0.02 seconds)' },
        { label: 'OnFrame', snippet: 'OnFrame()\n{\n\t$0\n}', description: 'Called every update frame' },
        { label: 'OnLateFrame', snippet: 'OnLateFrame()\n{\n\t$0\n}', description: 'Called after every update frame' },
        { label: 'OnSecond', snippet: 'OnSecond()\n{\n\t$0\n}', description: 'Called every second' },
        { label: 'OnChatInput', snippet: 'OnChatInput(message: string)\n{\n\t$0\n}', description: 'Called upon chat input from the player' },
        { label: 'OnPlayerSpawn', snippet: 'OnPlayerSpawn(player: Player, character: Character)\n{\n\t$0\n}', description: 'Called upon any player spawning' },
        { label: 'OnCharacterSpawn', snippet: 'OnCharacterSpawn(character: Character)\n{\n\t$0\n}', description: 'Called upon any character spawning' },
        { label: 'OnCharacterDie', snippet: 'OnCharacterDie(victim: Character, killer: Character, killerName: string)\n{\n\t$0\n}', description: 'Called upon a character dying. Killer may be null.' },
        { label: 'OnCharacterDamaged', snippet: 'OnCharacterDamaged(victim: Character, killer: Character, killerName: string, damage: Int)\n{\n\t$0\n}', description: 'Called upon a character being damaged. Killer may be null.' },
        { label: 'OnPlayerJoin', snippet: 'OnPlayerJoin(player: Player)\n{\n\t$0\n}', description: 'Called upon a player joining the room' },
        { label: 'OnPlayerLeave', snippet: 'OnPlayerLeave(player: Player)\n{\n\t$0\n}', description: 'Called upon a player leaving the room' },
        { label: 'OnNetworkMessage', snippet: 'OnNetworkMessage(sender: Player, message: string)\n{\n\t$0\n}', description: 'Called upon receiving Network.SendMessage.' },
        { label: 'OnButtonClick', snippet: 'OnButtonClick(buttonName: string)\n{\n\t$0\n}', description: 'Called upon a UI button with a given name being pressed' }
    ];

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const isInsideClass = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.CLASS);
        const isInsideComponent = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.COMPONENT);
        const isInsideCutscene = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.CUTSCENE);

        if (isInsideClass || isInsideComponent) {
            const isDeclaringFunction = CodeContextUtils.isDeclaringFunction(document, position);
            if (isDeclaringFunction) {
                return this.reservedFunctions.map(fn => {
                    const item = new vscode.CompletionItem(fn.label, vscode.CompletionItemKind.Function);
                    item.detail = 'Reserved function';
                    item.insertText = new vscode.SnippetString(fn.snippet);
                    item.documentation = new vscode.MarkdownString(fn.description);
                    return item;
                });
            }
        } else if (isInsideCutscene) {
            const isDeclaringCoroutine = CodeContextUtils.isDeclaringCoroutine(document, position);
            if (isDeclaringCoroutine) {
                const item = new vscode.CompletionItem('Start', vscode.CompletionItemKind.Function);
                item.detail = 'Cutscene entry point';
                item.insertText = new vscode.SnippetString('Start()\n{\n\t$0\n}');
                item.documentation = new vscode.MarkdownString('Cutscene entry point');
                return [item];
            }
        }

        return [];
    }
}
