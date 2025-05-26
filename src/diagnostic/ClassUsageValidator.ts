import * as vscode from 'vscode';
import {
    ClassKinds,
    FindConstructorInClassHierarchy,
    FindFieldInClassHierarchy,
    FindMethodInClassHierarchy,
    IChainNode,
    IClass,
} from '../classes/IClass';
import {IValidator} from './DiagnosticManager';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';

export class ClassUsageValidator implements IValidator {
    constructor(
        private documentTreeProvider: DocumentTreeProvider,
    ) {
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];
        const availableClasses = this.documentTreeProvider.getAllAvailableClasses(document);
        const chains = this.documentTreeProvider.getChains(document);

        for (const chain of chains) {
            const firstLink = chain[0];
            const position = new vscode.Position(firstLink.startLine, firstLink.startColumn);

            let currentClass: IClass | undefined;
            let isStatic = false;
            let selfCast = false;

            if (firstLink.text === 'self') {
                currentClass = this.documentTreeProvider.getCurrentClass(document, position);
                if (!currentClass) {
                    diagnostics.push(
                        this.createDiagnostic(
                            firstLink,
                            `'self' reference found but no class is associated in the current context. Report this to the developer.`
                        )
                    );
                    continue;
                }
                selfCast = true;
                isStatic = isStatic || currentClass.name === 'Main' || currentClass.kind === ClassKinds.EXTENSION;
            } else if (firstLink.isMethodCall) {
                const className = firstLink.text.split('(')[0];
                currentClass = availableClasses.find(c => c.name === className);
                if (!currentClass) {
                    diagnostics.push(
                        this.createDiagnostic(firstLink, `Class definition for '${className}' not found.`)
                    );
                    continue;
                }
                const ctor = FindConstructorInClassHierarchy(
                    currentClass,
                    firstLink.methodArguments!.length
                );
                if (!ctor) {
                    diagnostics.push(
                        this.createDiagnostic(
                            firstLink,
                            `Constructor for class ${className} with ${firstLink.methodArguments!.length} arguments not found.`
                        )
                    );
                    continue;
                }

            } else {
                const className = firstLink.text;
                currentClass = availableClasses.find(c => c.name === className);
                if (currentClass) {
                    isStatic = true;
                }
            }

            if (!currentClass) {
                const currentMethod = this.documentTreeProvider.getCurrentMethod(document, position);
                if (currentMethod) {
                    const param = currentMethod.parameters.find(p => p.name === firstLink.text);
                    if (param) {
                        if (param.type === 'any') {
                            continue;
                        }
                        currentClass = availableClasses.find(c => c.name === param.type);
                    }

                    if (!currentClass && currentMethod.localVariables) {
                        const local = currentMethod.localVariables
                            .find(v => v.name === firstLink.text && v.scopeRange?.contains(position));
                        if (local) {
                            if (local.type === 'any') {
                                continue;
                            }
                            currentClass = availableClasses.find(c => c.name === local.type);
                        }
                    }
                }
                if (!currentClass) {
                    diagnostics.push(
                        this.createDiagnostic(firstLink, `Class definition for '${firstLink.text}' not found.`)
                    );
                    continue;
                }
            }

            let broken = false;
            for (let i = 1; i < chain.length; i++) {
                const link = chain[i];
                let returnType: string;

                if (link.isMethodCall) {
                    const methodName = link.text.split('(')[0];
                    const method = FindMethodInClassHierarchy(
                        currentClass,
                        methodName,
                        link.methodArguments!.length,
                        !isStatic,
                        isStatic
                    );
                    if (!method) {
                        let msg = `${isStatic ? 'Static' : 'Instance'} method '${methodName}' with ${link.methodArguments!.length} arguments not found in class '${currentClass.name}'.`;
                        let severity = vscode.DiagnosticSeverity.Error;
                        if (['Object', 'Character'].includes(currentClass.name)) {
                            msg += `\nType '${currentClass.name}' is a base class; resolution may be imprecise.`;
                            severity = vscode.DiagnosticSeverity.Warning;
                        }
                        diagnostics.push(this.createDiagnostic(link, msg, severity));
                        broken = true;
                        break;
                    }
                    returnType = method.returnType;

                } else {
                    const field = FindFieldInClassHierarchy(
                        currentClass,
                        link.text,
                        !isStatic,
                        isStatic,
                        true,
                        true
                    );
                    if (!field) {
                        let msg = `${isStatic ? 'Static' : 'Instance'} field '${link.text}' not found in class '${currentClass.name}'.`;
                        let severity = vscode.DiagnosticSeverity.Error;
                        if (['Object', 'Character'].includes(currentClass.name)) {
                            msg += `\nType '${currentClass.name}' is a base class; resolution may be imprecise.`;
                            severity = vscode.DiagnosticSeverity.Warning;
                        }
                        diagnostics.push(this.createDiagnostic(link, msg, severity));
                        broken = true;
                        break;
                    }
                    returnType = field.type;
                }

                const nextClassName = returnType.split('(')[0];
                const nextClass = availableClasses.find(c => c.name === nextClassName);
                if (!nextClass) {
                    broken = true;
                    break;
                }

                currentClass = nextClass;

                isStatic = false;
                selfCast = false;
            }

            if (broken) {
                continue;
            }
        }

        return diagnostics;
    }


    private createDiagnostic(link: IChainNode, message: string, severity: vscode.DiagnosticSeverity = vscode.DiagnosticSeverity.Error): vscode.Diagnostic {
        const range = new vscode.Range(
            new vscode.Position(link.startLine, link.startColumn),
            new vscode.Position(link.startLine, link.startColumn + link.text.length)
        );
        return new vscode.Diagnostic(
            range,
            message,
            severity
        );
    }
}
