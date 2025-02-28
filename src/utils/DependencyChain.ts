import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';

export function extractImports(content: string): string[] {
    const importRegex = /^#\s*@import\s+(.*)$/gm;
    const imports: string[] = [];
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const importedFiles = match[1].trim().split(/\s+/);
        imports.push(...importedFiles);
    }
    return imports;
}

async function processFile(
    filePath: string,
    mainFilePath: string,
    visited: Set<string>,
    recursionStack: Set<string>,
    result: string[]
): Promise<void> {
    if (recursionStack.has(filePath)) {
        const cycle = Array.from(recursionStack).concat(filePath);
        throw new Error(`Cyclic dependency detected: ${cycle.join(' -> ')}`);
    }
    if (visited.has(filePath)) {
        return;
    }
    recursionStack.add(filePath);
    const content = await fs.readFile(filePath, 'utf-8');
    const imports = extractImports(content);
    for (const imp of imports) {
        const importedFilePath = path.join(path.dirname(filePath), imp + '.cl');
        await processFile(importedFilePath, mainFilePath, visited, recursionStack, result);
    }
    recursionStack.delete(filePath);
    visited.add(filePath);
    if (filePath !== mainFilePath) {
        result.push(filePath);
    }
}

export async function buildImportChain(mainFileUri: vscode.Uri): Promise<string[]> {
    const mainFilePath = mainFileUri.fsPath;
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const result: string[] = [];
    await processFile(mainFilePath, mainFilePath, visited, recursionStack, result);
    return result;
}
