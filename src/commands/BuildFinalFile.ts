import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';
import {buildImportChain} from '../utils/DependencyChain';
import {extensionContext} from '../extension';
import {Settings} from '../config/settings';

export async function buildFinalFile() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active file.');
        return;
    }
    const mainUri = editor.document.uri;

    const rememberPath = Settings.rememberLastPath;
    const rememberName = Settings.rememberLastName;

    const lastPath: string | undefined = extensionContext.globalState.get('lastSavePath');
    const lastName: string | undefined = extensionContext.globalState.get('lastSaveName');

    const defaultFileName = (rememberName && lastName)
        ? lastName
        : path.basename(mainUri.fsPath, '.cl') + '_final.cl';
    const defaultDir = (rememberPath && lastPath)
        ? lastPath
        : path.dirname(mainUri.fsPath);

    const defaultUri = vscode.Uri.file(path.join(defaultDir, defaultFileName));
    const fileUri = await vscode.window.showSaveDialog({
        defaultUri,
        filters: {'CL Files': ['cl']}
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
            definedClasses.set(match[1], mainUri.fsPath);
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

        if (rememberPath) {
            extensionContext.globalState.update('lastSavePath', path.dirname(fileUri.fsPath));
        }
        if (rememberName) {
            extensionContext.globalState.update('lastSaveName', path.basename(fileUri.fsPath));
        }

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
