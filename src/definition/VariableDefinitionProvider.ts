import * as vscode from 'vscode';

export class VariableDefinitionProvider implements vscode.DefinitionProvider {
    public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.Definition | null {
        const word = document.getText(document.getWordRangeAtPosition(position));
        const text = document.getText();

        const variableRegex = new RegExp(`(\\w+)\\s*=\\s*.*`, 'g');
        let match;

        while ((match = variableRegex.exec(text)) !== null) {
            const variable = match[1];
            if (variable === word) {
                const startPosition = document.positionAt(match.index);
                const endPosition = document.positionAt(match.index + variable.length);
                return new vscode.Location(document.uri, new vscode.Range(startPosition, endPosition));
            }
        }

        const methodRegex = new RegExp(`(function|coroutine)\\s+(\\w+)\\s*\\(`, 'g');

        while ((match = methodRegex.exec(text)) !== null) {
            const methodName = match[2];
            if (methodName === word) {
                const startPosition = document.positionAt(match.index + match[1].length + 1);
                const endPosition = document.positionAt(match.index + match[1].length + 1 + methodName.length);
                return new vscode.Location(document.uri, new vscode.Range(startPosition, endPosition));
            }
        }

        const classRegex = new RegExp(`(class|component|extension|cutscene)\\s+(\\w+)`, 'g');

        while ((match = classRegex.exec(text)) !== null) {
            const className = match[2];
            if (className === word) {
                const startPosition = document.positionAt(match.index);
                const endPosition = document.positionAt(match.index + className.length);
                return new vscode.Location(document.uri, new vscode.Range(startPosition, endPosition));
            }
        }

        return null;
    }
}
