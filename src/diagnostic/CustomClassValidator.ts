import * as vscode from 'vscode';

export class CustomClassValidator {
    private customClasses: Map<string, { fields: string[]; methods: string[] }> = new Map();

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];
        const text = document.getText();
        const lines = text.split(/\r?\n/);

        let currentClass: { fields: string[]; methods: string[] } | null = null;
        let isComponent = false;

        lines.forEach((line) => {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('class ') || trimmedLine.startsWith('component ')) {
                const className = this.getClassName(trimmedLine);
                currentClass = { fields: [], methods: [] };

                isComponent = trimmedLine.startsWith('component ');
                if (isComponent) {
                    currentClass.fields.push('MapObject', 'NetworkView');
                }

                this.customClasses.set(className, currentClass);
            }

            if (currentClass) {
                if (this.isFieldDeclaration(trimmedLine)) {
                    const fieldName = this.getFieldName(trimmedLine);
                    currentClass.fields.push(fieldName);
                }

                const methodMatch = trimmedLine.match(/(function|coroutine)\s+(\w+)/);
                if (methodMatch) {
                    const methodName = methodMatch[2];
                    currentClass.methods.push(methodName);
                }
            }
        });

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            if (trimmedLine.includes('self.')) {
                this.validateSelfUsage(trimmedLine, index, document, diagnostics);
            }
        });

        return diagnostics;
    }

    private getClassName(line: string): string {
        const classMatch = line.match(/(class|component)\s+(\w+)/);
        return classMatch ? classMatch[2] : '';
    }

    private isFieldDeclaration(line: string): boolean {
        return line.match(/^\w+\s*=\s*/) !== null;
    }

    private getFieldName(line: string): string {
        const fieldMatch = line.match(/^(\w+)\s*=/);
        return fieldMatch ? fieldMatch[1] : '';
    }

    private validateSelfUsage(
        line: string,
        lineIndex: number,
        document: vscode.TextDocument,
        diagnostics: vscode.Diagnostic[]
    ): void {
        const selfReferenceMatch = line.match(/self\.(\w+)/);
        if (selfReferenceMatch) {
            const referenceName = selfReferenceMatch[1];

            let found = false;

            this.customClasses.forEach((classDef) => {
                if (classDef.fields.includes(referenceName) || classDef.methods.includes(referenceName)) {
                    found = true;
                }
            });

            const fullLine = document.lineAt(lineIndex).text;
            const selfPosition = fullLine.indexOf('self.');

            if (!found) {
                const range = new vscode.Range(
                    new vscode.Position(lineIndex, selfPosition + 5),
                    new vscode.Position(lineIndex, selfPosition + 5 + referenceName.length)
                );
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Invalid reference to '${referenceName}' in self context. Field or method not found.`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }
    }
}
