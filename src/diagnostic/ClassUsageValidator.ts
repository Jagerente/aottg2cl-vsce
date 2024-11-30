import * as vscode from 'vscode';
import { ClassKinds, FindConstructorInClassHierarchy, FindFieldInClassHierarchy, FindMethodInClassHierarchy, IChainNode, IClass, IField, IMethod } from '../classes/IClass';
import { IValidator } from './DiagnosticManager';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';

export class ClassUsageValidator implements IValidator {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];

        const availableClasses = this.documentTreeProvider.getAllAvailableClasses();
        this.documentTreeProvider.getChains().forEach(chain => {
            const firstLink = chain[0];
            let currentClass: IClass | undefined = undefined;
            let isStatic = false;
            let selfCast = false;

            if (firstLink.text === 'self') {
                currentClass = this.documentTreeProvider.getCurrentClass(new vscode.Position(firstLink.startLine, firstLink.startColumn));
                if (!currentClass) {
                    diagnostics.push(this.createDiagnostic(firstLink, `'self' reference found but no class is associated in the current context. Report this to the developer.`));
                    return;
                }

                selfCast = true;
            } else if (firstLink.isMethodCall) {
                const className = firstLink.text.split('(')[0];
                currentClass = availableClasses.find((cls) => cls.name === className);

                if (currentClass) {
                    switch (currentClass.kind) {
                        case ClassKinds.CUTSCENE:
                            diagnostics.push(this.createDiagnostic(firstLink, `Cutscenes are not recommended for instantiation.`, vscode.DiagnosticSeverity.Warning));
                            return;
                        case ClassKinds.EXTENSION:
                            diagnostics.push(this.createDiagnostic(firstLink, `Extensions are not recommended for instantiation.`, vscode.DiagnosticSeverity.Warning));
                            return;
                    }

                    const constructorMatch = FindConstructorInClassHierarchy(currentClass, firstLink.methodArguments!.length);
                    if (!constructorMatch) {
                        diagnostics.push(this.createDiagnostic(firstLink, `Constructor for class ${className} with ${firstLink.methodArguments!.length} arguments not found.`));
                        return;
                    }
                } else {
                    diagnostics.push(this.createDiagnostic(firstLink, `Class definition for '${className}' not found.`));
                    return;
                }
            } else {
                const className = firstLink.text;
                currentClass = availableClasses.find((cls) => cls.name === className);
                if (currentClass) {
                    isStatic = true;
                }
            }

            if (!currentClass) {
                // diagnostics.push(this.createDiagnostic(firstLink, `Class definition for '${firstLink.text}' not found.`));
                return;
            }

            for (let i = 1; i < chain.length; i++) {
                const currentLink = chain[i];

                let returnType = '';
                if (currentLink.isMethodCall) {
                    const methodName = currentLink.text.split('(')[0];
                    let method: IMethod | null = null;

                    if (selfCast) {
                        method = FindMethodInClassHierarchy(currentClass, methodName, currentLink.methodArguments!.length, true, true);
                    } else {
                        method = FindMethodInClassHierarchy(currentClass, methodName, currentLink.methodArguments!.length, !isStatic, isStatic);
                    }

                    if (!method) {
                        diagnostics.push(this.createDiagnostic(currentLink, `${selfCast ? 'Self' : (isStatic ? 'Static' : 'Instance')} method '${methodName}' with ${currentLink.methodArguments!.length} arguments not found in class '${currentClass?.name}'.`));
                        break;
                    }

                    returnType = method.returnType;
                } else {
                    let field: IField | null = null;

                    if (selfCast) {
                        field = FindFieldInClassHierarchy(currentClass, currentLink.text, true, true, true, true);
                    } else {
                        field = FindFieldInClassHierarchy(currentClass, currentLink.text, !isStatic, isStatic, true, true);
                    }

                    if (!field) {
                        diagnostics.push(this.createDiagnostic(currentLink, `${isStatic ? 'Static' : 'Instance'} field '${currentLink.text}' not found in class '${currentClass?.name}'.`));
                        break;
                    }

                    returnType = field.type;
                }
                currentClass = availableClasses.find((cls) => cls.name === returnType);
                if (!currentClass) {
                    // diagnostics.push(this.createDiagnostic(firstLink, `Class definition for '${firstLink.text}' not found.`));
                    return;
                }
                isStatic = false;
                selfCast = false;
            }
        });

        return diagnostics;
    }

    private createDiagnostic(link: IChainNode, message: string, severity: vscode.DiagnosticSeverity = vscode.DiagnosticSeverity.Error): vscode.Diagnostic {
        const range = new vscode.Range(
            new vscode.Position(link.startLine - 1, link.startColumn),
            new vscode.Position(link.startLine - 1, link.startColumn + link.text.length)
        );
        return new vscode.Diagnostic(
            range,
            message,
            severity
        );
    }
}
