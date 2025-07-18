import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';
import {buildImportChain} from '../utils/DependencyChain';
import {extensionContext} from '../extension';
import {Settings} from '../config/settings';

export async function buildFinalFileIntoMap() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active file.');
        return;
    }
    const mainUri = editor.document.uri;

    const rememberPath = Settings.rememberLastPath;
    const rememberName = Settings.rememberLastName;
    const lastMapPath: string | undefined = extensionContext.globalState.get('lastMapPath');
    const lastMapName: string | undefined = extensionContext.globalState.get('lastMapName');

    const defaultDir = (rememberPath && lastMapPath)
        ? lastMapPath
        : path.dirname(mainUri.fsPath);

    const defaultFileName = (rememberName && lastMapName) ? lastMapName : '';
    const defaultUri = defaultFileName 
        ? vscode.Uri.file(path.join(defaultDir, defaultFileName))
        : vscode.Uri.file(defaultDir);

    const mapFileUri = await vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        filters: {'Custom Map Files': ['txt', 'cl'], 'All Files': ['*']},
        openLabel: 'Select Custom Map File',
        defaultUri: defaultUri
    });

    if (!mapFileUri || mapFileUri.length === 0) {
        return;
    }

    const targetMapFile = mapFileUri[0];

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

        const mapContent = await fs.readFile(targetMapFile.fsPath, 'utf-8');
        
        const logicStartMatch = mapContent.match(/^[ \t]*\/\/\/\s*Logic\s*$/im);
        const weatherStartMatch = mapContent.match(/^[ \t]*\/\/\/\s*Weather\s*$/im);
        
        if (!logicStartMatch || !weatherStartMatch) {
            throw new Error('Invalid Custom Map file selected. The file must contain both "/// Logic" and "/// Weather" boundaries to insert Custom Logic content.');
        }

        const logicStartIndex = logicStartMatch.index! + logicStartMatch[0].length;
        const weatherStartIndex = weatherStartMatch.index!;

        if (logicStartIndex >= weatherStartIndex) {
            throw new Error('Invalid Custom Map file structure. "/// Logic" boundary must appear before "/// Weather" boundary.');
        }

        const beforeLogic = mapContent.substring(0, logicStartIndex);
        const afterWeather = mapContent.substring(weatherStartIndex);
        
        const newMapContent = beforeLogic + '\n' + finalContent.trim() + '\n' + afterWeather;

        await fs.writeFile(targetMapFile.fsPath, newMapContent, 'utf-8');

        if (rememberPath) {
            extensionContext.globalState.update('lastMapPath', path.dirname(targetMapFile.fsPath));
        }
        if (rememberName) {
            extensionContext.globalState.update('lastMapName', path.basename(targetMapFile.fsPath));
        }

        vscode.window.showInformationMessage(
            `Custom Logic successfully injected into ${path.basename(targetMapFile.fsPath)}.`,
            'Open File Location'
        ).then(selection => {
            if (selection === 'Open File Location') {
                vscode.commands.executeCommand('revealFileInOS', targetMapFile);
            }
        });
    } catch (error: any) {
        vscode.window.showErrorMessage(error.message);
    }
} 
