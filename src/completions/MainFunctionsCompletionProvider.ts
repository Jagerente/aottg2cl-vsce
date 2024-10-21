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

    private componentFunctions = [
        { label: 'OnCollisionEnter', snippet: 'OnCollisionEnter(other: Object)\n{\n\t$0\n}', description: 'Called upon another object first colliding with the attached MapObject.' },
        { label: 'OnCollisionStay', snippet: 'OnCollisionStay(other: Object)\n{\n\t$0\n}', description: 'Called every frame while another object is colliding with the attached MapObject.' },
        { label: 'OnCollisionExit', snippet: 'OnCollisionExit(other: Object)\n{\n\t$0\n}', description: 'Called upon another object exiting collision with the attached MapObject.' },
        { label: 'OnGetHit', snippet: 'OnGetHit(character: Character, name: string, damage: int, type: string)\n{\n\t$0\n}', description: 'Called upon getting hit by a hitbox, such as a blade or titan attack.' },
        { label: 'OnGetHooked', snippet: 'OnGetHooked(human: Human, hookPosition: Vector3, leftHook: bool)\n{\n\t$0\n}', description: 'Called upon getting hit by a hook.' },
        { label: 'OnNetworkTransfer', snippet: 'OnNetworkTransfer(oldOwner: Player, newOwner: Player)\n{\n\t$0\n}', description: 'Called upon the NetworkView changing ownership.' },
        { label: 'SendNetworkStream', snippet: 'SendNetworkStream()\n{\n\t$0\n}', description: 'Called every frame for the owner.' },
        { label: 'OnNetworkStream', snippet: 'OnNetworkStream()\n{\n\t$0\n}', description: 'Called every frame for every non-owner observer.' },
        { label: 'OnNetworkMessage', snippet: 'OnNetworkMessage(sender: Player, message: string)\n{\n\t$0\n}', description: 'Called upon receiving a self.NetworkView.SendMessage call.' },
    ];

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const isInsideClass = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.CLASS);
        const isInsideComponent = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.COMPONENT);
        const isInsideCutscene = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.CUTSCENE);

        const completionItems: vscode.CompletionItem[] = [];

        if (isInsideClass || isInsideComponent) {
            const isDeclaringFunction = CodeContextUtils.isDeclaringFunction(document, position);
            if (isDeclaringFunction) {
                this.reservedFunctions.forEach(fn => {
                    const item = new vscode.CompletionItem(fn.label, vscode.CompletionItemKind.Function);
                    item.detail = 'Reserved function';
                    item.insertText = new vscode.SnippetString(fn.snippet);
                    item.documentation = new vscode.MarkdownString(fn.description);
                    completionItems.push(item);
                });

                if (isInsideComponent) {
                    this.componentFunctions.forEach(fn => {
                        const item = new vscode.CompletionItem(fn.label, vscode.CompletionItemKind.Function);
                        item.detail = 'Reserved function';
                        item.insertText = new vscode.SnippetString(fn.snippet);
                        item.documentation = new vscode.MarkdownString(fn.description);
                        completionItems.push(item);
                    });
                }
            }
        } else if (isInsideCutscene) {
            const isDeclaringCoroutine = CodeContextUtils.isDeclaringCoroutine(document, position);
            if (isDeclaringCoroutine) {
                const item = new vscode.CompletionItem('Start', vscode.CompletionItemKind.Function);
                item.detail = 'Cutscene entry point';
                item.insertText = new vscode.SnippetString('Start()\n{\n\t$0\n}');
                item.documentation = new vscode.MarkdownString('Cutscene entry point');
                completionItems.push(item);
            }
        }

        return completionItems;
    }
}
