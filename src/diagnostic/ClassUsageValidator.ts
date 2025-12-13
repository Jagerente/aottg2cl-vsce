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

    private isCallbackType(type: TypeReference): boolean {
        return type.name === 'any' || type.name === 'void' || type.name === 'function';
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
                    const currentMethod = this.documentTreeProvider.getCurrentMethod(document, position);
                    if (currentMethod) {
                        const local = this.documentTreeProvider.findAvailableLocalVariableByName(currentMethod, className, true, position);
                        let foundType: TypeReference | undefined;
                        if (local) {
                            foundType = local.type;
                        }
                        if (!foundType && currentMethod.parameters) {
                            const param = currentMethod.parameters.find(p => p.name === className);
                            if (param) {
                                foundType = param.type;
                            }
                        }
                        if (foundType && this.isCallbackType(foundType)) {
                            continue;
                        }
                    }
                    
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
                        if (this.isCallbackType(foundType)) {
                            if (chain.length > 1 && chain[1].isMethodCall) {
                                continue;
                            }
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
                        const field = FindFieldInClassHierarchy(
                            currentClass,
                            methodName,
                            !isStatic,
                            isStatic,
                            true,
                            true
                        );
                        if (field && this.isCallbackType(field.type)) {
                            currentReturnType = { name: 'any', typeArguments: [] };
                            currentClass = undefined;
                            isStatic = false;
                            selfCast = false;
                            continue;
                        }
                        
                        if (i > 0 && !chain[i - 1].isMethodCall) {
                            const prevLink = chain[i - 1];
                            const prevMethod = this.documentTreeProvider.getCurrentMethod(document, position);
                            if (prevMethod) {
                                const prevLocal = this.documentTreeProvider.findAvailableLocalVariableByName(prevMethod, prevLink.text, true, position);
                                let prevType: TypeReference | undefined;
                                if (prevLocal) {
                                    prevType = prevLocal.type;
                                }
                                if (!prevType && prevMethod.parameters) {
                                    const prevParam = prevMethod.parameters.find(p => p.name === prevLink.text);
                                    if (prevParam) {
                                        prevType = prevParam.type;
                                    }
                                }
                                if (prevType && this.isCallbackType(prevType)) {
                                    currentReturnType = { name: 'any', typeArguments: [] };
                                    currentClass = undefined;
                                    isStatic = false;
                                    selfCast = false;
                                    continue;
                                }
                            }
                        }
                        
                        let msg = `${isStatic ? 'Static' : 'Instance'} method '${methodName}' with ${link.methodArguments!.length} arguments does not exist on type '${currentClass.name}'.`;
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
                    const method = FindMethodInClassHierarchy(
                        currentClass,
                        link.text,
                        -1,
                        !isStatic,
                        isStatic
                    );
                    
                    if (method) {
                        const isLastLink = i === chain.length - 1;
                        
                        if (!isLastLink) {
                            const nextLink = chain[i + 1];
                            diagnostics.push(
                                this.createDiagnostic(
                                    nextLink,
                                    `Cannot access '${nextLink.text}' on method '${link.text}' without calling it.`,
                                    vscode.DiagnosticSeverity.Error
                                )
                            );
                            
                            for (let j = i + 2; j < chain.length; j++) {
                                const subsequentLink = chain[j];
                                diagnostics.push(
                                    this.createDiagnostic(
                                        subsequentLink,
                                        `This access is invalid because the previous access on method '${link.text}' failed.`,
                                        vscode.DiagnosticSeverity.Warning
                                    )
                                );
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
                        
                        if (i < chain.length - 1 && chain[i + 1].isMethodCall && this.isCallbackType(field.type)) {
                            currentReturnType = { name: 'any', typeArguments: [] };
                            currentClass = undefined;
                            isStatic = false;
                            selfCast = false;
                            continue;
                        }
                    }
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
