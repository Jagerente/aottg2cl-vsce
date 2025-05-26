import * as vscode from 'vscode';
import {
    ClassKinds,
    FindConstructorInClassHierarchy,
    FindFieldInClassHierarchy,
    FindMethodInClassHierarchy,
    IChainNode,
    IClass, TypeReference,
} from '../classes/IClass';
import {IValidator} from './DiagnosticManager';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';
import {Settings} from "../config/settings";

export class ClassUsageValidator implements IValidator {
    constructor(
        private documentTreeProvider: DocumentTreeProvider,
    ) {
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        if (!Settings.showClassUsageDiagnostics) {
            return [];
        }

        const diagnostics: vscode.Diagnostic[] = [];
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
                currentClass = this.documentTreeProvider.findClassByName(document, className);
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
                currentClass = this.documentTreeProvider.findClassByName(document, className);
                if (currentClass) {
                    isStatic = true;
                }
            }

            if (!currentClass) {
                const currentMethod = this.documentTreeProvider.getCurrentMethod(document, position);
                if (currentMethod) {
                    const local = this.documentTreeProvider.findAvailableLocalVariableByName(currentMethod, firstLink.text, true, position);
                    let foundType: TypeReference | undefined;
                    if (local) {
                        foundType = local.type;
                    }

                    if (!foundType && currentMethod.parameters) {
                        const param = currentMethod.parameters.find(p => p.name === firstLink.text);
                        if (param) {
                            foundType = param.type;
                        }
                    }

                    if (foundType) {
                        if (foundType.name === 'any') {
                            continue;
                        }

                        currentClass = this.documentTreeProvider.findClassByReference(document, foundType);
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
            let currentReturnType: TypeReference | undefined;
            for (let i = 1; i < chain.length; i++) {
                const link = chain[i];
                if (!currentClass) {

                    if (currentReturnType) {
                        if (currentReturnType.name === 'any' || currentReturnType.name.includes('|')) {
                            broken = true;
                            continue;
                        }

                        currentClass = this.documentTreeProvider.findClassByReference(document, currentReturnType);
                    }

                    if (!currentClass) {
                        diagnostics.push(
                            this.createDiagnostic(
                                chain[i - 1],
                                `Unexpected error. Report this to the developer.`
                            )
                        );
                        broken = true;
                        break;
                    }
                }

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
                        let msg = `${isStatic ? 'Static' : 'Instance'} method '${methodName}' with ${link.methodArguments!.length} does not exist on type '${currentClass.name}'.`;
                        let severity = vscode.DiagnosticSeverity.Error;
                        if (['Object', 'Character', 'Component'].includes(currentClass.name)) {
                            msg += `\nType '${currentClass.name}' is a base class; resolution may be imprecise.`;
                            severity = vscode.DiagnosticSeverity.Warning;
                        }
                        if (severity === vscode.DiagnosticSeverity.Error || Settings.showUnresolvedMemberWarnings) {
                            diagnostics.push(this.createDiagnostic(link, msg, severity));
                        }
                        broken = true;
                        break;
                    }
                    currentReturnType = method.returnType;
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
                        let msg = `${isStatic ? 'Static' : 'Instance'} field '${link.text}' does not exist on type '${currentClass.name}'.`;
                        let severity = vscode.DiagnosticSeverity.Error;
                        if (['Object', 'Character', 'Component'].includes(currentClass.name)) {
                            msg += `\nType '${currentClass.name}' is a base class; resolution may be imprecise.`;
                            severity = vscode.DiagnosticSeverity.Warning;
                        }
                        if (severity === vscode.DiagnosticSeverity.Error || Settings.showUnresolvedMemberWarnings) {
                            diagnostics.push(this.createDiagnostic(link, msg, severity));
                        }
                        broken = true;
                        break;
                    }
                    currentReturnType = field.type;
                }
                currentClass = undefined;

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
