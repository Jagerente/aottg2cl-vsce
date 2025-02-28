import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';
import { buildImportChain } from '../utils/DependencyChain';

export async function buildFinalFile() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active file.');
        return;
    }
    const mainUri = editor.document.uri;
    const defaultFileName = path.basename(mainUri.fsPath, '.cl') + '_final.cl';
    const fileUri = await vscode.window.showSaveDialog({
        defaultUri: vscode.Uri.file(path.join(path.dirname(mainUri.fsPath), defaultFileName)),
        filters: { 'CL Files': ['cl'] }
    });
    if (!fileUri) {
        return;
    }
    try {
        const importChain = await buildImportChain(mainUri);
        let finalContent = '';
        const definedClasses = new Map<string, string>();
        const mainContentRaw = await fs.readFile(mainUri.fsPath, 'utf-8');
        const mainContent = mainContentRaw.replace(/^#\s*@import.*$/gm, '').trim();
        const classRegex = /class\s+(\w+)\s*{/g;
        let match;
        while ((match = classRegex.exec(mainContent)) !== null) {
            const className = match[1];
            definedClasses.set(className, mainUri.fsPath);
        }
        finalContent += mainContent + '\n\n';
        for (const file of importChain) {
            const contentRaw = await fs.readFile(file, 'utf-8');
            const content = contentRaw.replace(/^#\s*@import.*$/gm, '').trim();
            classRegex.lastIndex = 0;
            while ((match = classRegex.exec(content)) !== null) {
                const className = match[1];
                if (definedClasses.has(className)) {
                    throw new Error(`Duplicate class definition detected: ${className} found in ${definedClasses.get(className)} and ${file}`);
                }
                definedClasses.set(className, file);
            }
            finalContent += content + '\n\n';
        }
        await fs.writeFile(fileUri.fsPath, finalContent, 'utf-8');
        vscode.window.showInformationMessage(
            `File ${path.basename(fileUri.fsPath)} created successfully.`,
            'Open File Location'
        ).then(selection => {
            if (selection === 'Open File Location') {
                vscode.commands.executeCommand('revealFileInOS', fileUri);
            }
        });
    } catch (error: any) {
        vscode.window.showErrorMessage(error.message);
    }
}
