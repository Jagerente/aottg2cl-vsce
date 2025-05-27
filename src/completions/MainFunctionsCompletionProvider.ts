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
        { parent: this, label: 'Init', snippet: 'Init()\n{\n\t$0\n}', description: 'Called upon class creation' },
        { parent: this, label: 'OnGameStart', snippet: 'OnGameStart()\n{\n\t$0\n}', description: 'Called upon game start' },
        { parent: this, label: 'OnTick', snippet: 'OnTick()\n{\n\t$0\n}', description: 'Called every fixed update frame (0.02 seconds)' },
        { parent: this, label: 'OnFrame', snippet: 'OnFrame()\n{\n\t$0\n}', description: 'Called every update frame' },
        { parent: this, label: 'OnLateFrame', snippet: 'OnLateFrame()\n{\n\t$0\n}', description: 'Called after every update frame' },
        { parent: this, label: 'OnSecond', snippet: 'OnSecond()\n{\n\t$0\n}', description: 'Called every second' },
        { parent: this, label: 'OnChatInput', snippet: 'OnChatInput(message)\n{\n\t$0\n}', description: 'Called upon chat input from the player' },
        { parent: this, label: 'OnPlayerSpawn', snippet: 'OnPlayerSpawn(player, character)\n{\n\t$0\n}', description: 'Called upon any player spawning' },
        { parent: this, label: 'OnCharacterSpawn', snippet: 'OnCharacterSpawn(character)\n{\n\t$0\n}', description: 'Called upon any character spawning' },
        { parent: this, label: 'OnCharacterDie', snippet: 'OnCharacterDie(victim, killer, killerName)\n{\n\t$0\n}', description: 'Called upon a character dying. Killer may be null.' },
        { parent: this, label: 'OnCharacterDamaged', snippet: 'OnCharacterDamaged(victim, killer, killerName, damage)\n{\n\t$0\n}', description: 'Called upon a character being damaged. Killer may be null.' },
        { parent: this, label: 'OnPlayerJoin', snippet: 'OnPlayerJoin(player)\n{\n\t$0\n}', description: 'Called upon a player joining the room' },
        { parent: this, label: 'OnPlayerLeave', snippet: 'OnPlayerLeave(player)\n{\n\t$0\n}', description: 'Called upon a player leaving the room' },
        { parent: this, label: 'OnNetworkMessage', snippet: 'OnNetworkMessage(sender, message)\n{\n\t$0\n}', description: 'Called upon receiving Network.SendMessage.' },
        { parent: this, label: 'OnButtonClick', snippet: 'OnButtonClick(buttonName)\n{\n\t$0\n}', description: 'Called upon a UI button with a given name being pressed' }
    ];

    private componentFunctions = [
        { parent: this, label: 'OnCollisionEnter', snippet: 'OnCollisionEnter(obj)\n{\n\t$0\n}', description: 'Called upon another object first colliding with the attached MapObject.' },
        { parent: this, label: 'OnCollisionStay', snippet: 'OnCollisionStay(obj)\n{\n\t$0\n}', description: 'Called every frame while another object is colliding with the attached MapObject.' },
        { parent: this, label: 'OnCollisionExit', snippet: 'OnCollisionExit(obj)\n{\n\t$0\n}', description: 'Called upon another object exiting collision with the attached MapObject.' },
        { parent: this, label: 'OnGetHit', snippet: 'OnGetHit(character, name, damage, type)\n{\n\t$0\n}', description: 'Called upon getting hit by a hitbox, such as a blade or titan attack.' },
        { parent: this, label: 'OnGetHooked', snippet: 'OnGetHooked(human, hookPosition, leftHook)\n{\n\t$0\n}', description: 'Called upon getting hit by a hook.' },
        { parent: this, label: 'OnNetworkTransfer', snippet: 'OnNetworkTransfer(oldOwner, newOwner)\n{\n\t$0\n}', description: 'Called upon the NetworkView changing ownership.' },
        { parent: this, label: 'SendNetworkStream', snippet: 'SendNetworkStream()\n{\n\t$0\n}', description: 'Called every frame for the owner.' },
        { parent: this, label: 'OnNetworkStream', snippet: 'OnNetworkStream()\n{\n\t$0\n}', description: 'Called every frame for every non-owner observer.' },
        { parent: this, label: 'OnNetworkMessage', snippet: 'OnNetworkMessage(sender, message)\n{\n\t$0\n}', description: 'Called upon receiving a self.NetworkView.SendMessage call.' }
    ];

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const currentClass = this.documentTreeProvider.getCurrentClass(document, position);
        const isInsideClass = currentClass?.kind === ClassKinds.CLASS;
        const isInsideComponent = currentClass?.kind === ClassKinds.COMPONENT;
        const isInsideCutscene = currentClass?.kind === ClassKinds.CUTSCENE;

        const line = document.lineAt(position).text;
        const textAfter = line.slice(position.character);
        const hasRightText = /\S/.test(textAfter);
        const preferSnippet = !hasRightText;
        const wordRange = document.getWordRangeAtPosition(position, /[A-Za-z_]\w*/);

        const makePlain = (label: string, detail: string) => {
            const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Function);
            item.detail = detail;
            item.insertText = label;
            item.sortText = (preferSnippet ? '1_' : '0_') + label;
            if (wordRange) { item.range = wordRange; }
            return item;
        };
        const makeSnippet = (fn: { label: string; snippet: string; description: string }, detail: string) => {
            const item = new vscode.CompletionItem(fn.label, vscode.CompletionItemKind.Function);
            item.detail = detail;
            item.insertText = new vscode.SnippetString(fn.snippet);
            item.documentation = new vscode.MarkdownString(fn.description);
            item.sortText = (preferSnippet ? '0_' : '1_') + fn.label;
            if (wordRange) { item.range = wordRange; }
            return item;
        };

        const items: vscode.CompletionItem[] = [];

        if (isInsideComponent || currentClass?.name === 'Main') {
            if (CodeContextUtils.isDeclaringFunction(document, position)) {
                this.reservedFunctions.forEach(fn => {
                    items.push(makePlain(fn.label, 'Reserved function'));
                    items.push(makeSnippet(fn, 'Reserved function'));
                });
                if (isInsideComponent) {
                    this.componentFunctions.forEach(fn => {
                        items.push(makePlain(fn.label, 'Reserved function'));
                        items.push(makeSnippet(fn, 'Reserved function'));
                    });
                }
            }
        } else if (isInsideClass) {
            if (CodeContextUtils.isDeclaringFunction(document, position)) {
                const initFn = this.reservedFunctions.find(fn => fn.label === 'Init')!;
                items.push(makePlain(initFn.label, 'Constructor'));
                items.push(makeSnippet(initFn, 'Constructor'));
            }
        } else if (isInsideCutscene) {
            if (CodeContextUtils.isDeclaringCoroutine(document, position)) {
                items.push(makePlain('Start', 'Cutscene entry point'));
                items.push(makeSnippet({ label: 'Start', snippet: 'Start()\n{\n\t$0\n}', description: 'Cutscene entry point' }, 'Cutscene entry point'));
            }
        }

        return items;
    }
}
