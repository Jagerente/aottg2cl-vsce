import * as vscode from 'vscode';
import {
    ClassKinds,
    FindConstructorInClassHierarchy,
    FindFieldInClassHierarchy,
    FindMethodInClassHierarchy,
    IChainNode,
    IClass,
    IMethod,
    IConstructor,
    TypeReference,
} from '../classes/IClass';
import {IValidator} from './DiagnosticManager';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';
import {Settings} from "../config/settings";
import {DiagnosticCodes} from './DiagnosticCodes';

export class MemberAccessValidator implements IValidator {
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
            if (chain.length === 0) {
                continue;
            }

            this.validateChain(document, chain, diagnostics);
        }

        return diagnostics;
    }

    private validateChain(document: vscode.TextDocument, chain: IChainNode[], diagnostics: vscode.Diagnostic[]): void {
        const firstNode = chain[0];
        const position = new vscode.Position(firstNode.startLine, firstNode.startColumn);

        // 1. Resolve the Root Type (the type of the first element in the chain)
        let currentTypeCtx: { type: TypeReference, isStatic: boolean } | undefined =
            this.resolveRootType(document, firstNode, position, diagnostics);

        if (!currentTypeCtx) {
            // Root resolution failed (diagnostic already added if needed inside resolveRootType)
            return;
        }

        // 2. Iterate through the rest of the chain
        for (let i = 1; i < chain.length; i++) {
            const node = chain[i];

            // If we hit an 'any' type or function callback upstream, stop validating this chain to avoid false positives.
            if (this.isDynamicType(currentTypeCtx.type)) {
                return;
            }

            // Resolve the IClass definition for the current type
            const currentClassDef = this.documentTreeProvider.findClassByReference(document, currentTypeCtx.type);

            if (!currentClassDef) {
                // We have a type name, but cannot find the class definition anywhere.
                // If it's a generic type parameter or primitive that isn't mapped, we might want to stop.
                // Otherwise, report error.
                diagnostics.push(this.createDiagnostic(chain[i - 1], `Type definition for '${currentTypeCtx.type.name}' not found.`, vscode.DiagnosticSeverity.Error, DiagnosticCodes.TYPE_DEFINITION_NOT_FOUND));
                return;
            }

            // Validate the access on the current class
            const nextType = this.validateMemberAccess(currentClassDef, node, currentTypeCtx.isStatic, diagnostics);

            if (!nextType) {
                // Member not found on class. Diagnostic added in validateMemberAccess.
                return;
            }

            // Prepare for next iteration
            currentTypeCtx = {
                type: nextType,
                isStatic: false // Result of a member access is always an instance
            };
        }
    }

    private resolveRootType(
        document: vscode.TextDocument,
        node: IChainNode,
        position: vscode.Position,
        diagnostics: vscode.Diagnostic[]
    ): { type: TypeReference, isStatic: boolean } | undefined {

        // Get context once to use in implicit checks
        const currentClass = this.documentTreeProvider.getCurrentClass(document, position);
        const currentMethod = this.documentTreeProvider.getCurrentMethod(document, position);

        // A. Handle explicit 'self'
        if (node.text === 'self') {
            if (!currentClass) {
                diagnostics.push(this.createDiagnostic(node, `'self' used outside of a class context.`, vscode.DiagnosticSeverity.Error, DiagnosticCodes.SELF_OUTSIDE_CLASS));
                return undefined;
            }
            // self behaves like an instance, unless we are in a static context (Main/Extension)
            const isStaticContext = currentClass.name === 'Main' || currentClass.kind === ClassKinds.EXTENSION;
            return {
                type: {name: currentClass.name, typeArguments: []},
                isStatic: isStaticContext
            };
        }

        // B. Handle Method Call at root: method(...)
        if (node.isMethodCall) {
            const methodName = node.text.split('(')[0];

            // 1. Check if it's a Constructor call: ClassName(...)
            const classAsConstructor = this.documentTreeProvider.findClassByName(document, methodName);
            if (classAsConstructor) {
                const ctor = FindConstructorInClassHierarchy(classAsConstructor, node.methodArguments?.length ?? 0);
                if (!ctor) {
                    diagnostics.push(this.createDiagnostic(node, `Constructor for '${methodName}' with ${node.methodArguments?.length} arguments not found.`, vscode.DiagnosticSeverity.Error, DiagnosticCodes.CONSTRUCTOR_NOT_FOUND));
                    return undefined;
                }
                return {type: {name: classAsConstructor.name, typeArguments: []}, isStatic: false}; // Returns instance
            }

            // 2. Check Local Variables / Parameters (Callback invocation)
            if (currentMethod) {
                const localType = this.findLocalOrParamType(currentMethod, methodName, position);
                if (localType) {
                    return {type: localType, isStatic: false};
                }
            }

            // 3. Implicit 'self' check
            if (currentClass) {
                const implicitMethod = FindMethodInClassHierarchy(
                    currentClass,
                    methodName,
                    node.methodArguments?.length ?? 0,
                    true,
                    true
                );

                if (implicitMethod) {
                    diagnostics.push(this.createDiagnostic(
                        node,
                        `Method '${methodName}' exists in class '${currentClass.name}'. Did you forget 'self.'?`,
                        vscode.DiagnosticSeverity.Error,
                        DiagnosticCodes.METHOD_FORGOT_SELF
                    ));
                    return undefined;
                }
            }

            diagnostics.push(this.createDiagnostic(node, `Method or Class '${methodName}' not found.`, vscode.DiagnosticSeverity.Error, DiagnosticCodes.METHOD_OR_CLASS_NOT_FOUND));
            return undefined;
        }

        // C. Handle Property/Variable at root: identifier

        // 1. Local Variable or Parameter (Highest Priority - Shadowing)
        if (currentMethod) {
            const localType = this.findLocalOrParamType(currentMethod, node.text, position);
            if (localType) {
                return {type: localType, isStatic: false};
            }
        }

        // 2. Static Class Reference
        const staticClass = this.documentTreeProvider.findClassByName(document, node.text);
        if (staticClass) {
            return {
                type: {name: staticClass.name, typeArguments: []},
                isStatic: true
            };
        }

        // 3. Implicit 'self' field check
        if (currentClass) {
            const implicitField = FindFieldInClassHierarchy(
                currentClass,
                node.text,
                true,
                true,
                true,
                true
            );

            if (implicitField) {
                diagnostics.push(this.createDiagnostic(
                    node,
                    `Field '${node.text}' exists in class '${currentClass.name}'. Did you forget 'self.'?`,
                    vscode.DiagnosticSeverity.Error,
                    DiagnosticCodes.FIELD_FORGOT_SELF
                ));
                return undefined;
            }
        }

        diagnostics.push(this.createDiagnostic(node, `Variable or Class '${node.text}' not found.`, vscode.DiagnosticSeverity.Error, DiagnosticCodes.VARIABLE_OR_CLASS_NOT_FOUND));
        return undefined;
    }

    private validateMemberAccess(
        classDef: IClass,
        node: IChainNode,
        isStatic: boolean,
        diagnostics: vscode.Diagnostic[]
    ): TypeReference | undefined {

        if (node.isMethodCall) {
            const methodName = node.text.split('(')[0];
            const argCount = node.methodArguments?.length ?? 0;

            const method = FindMethodInClassHierarchy(classDef, methodName, argCount, !isStatic, isStatic);

            if (!method) {
                // Fallback: Check if it's a field of type function/callback
                const field = FindFieldInClassHierarchy(classDef, methodName, !isStatic, isStatic, true, true);
                if (field && this.isDynamicType(field.type)) {
                    return {name: 'any', typeArguments: []};
                }

                this.reportMemberError(node, classDef, methodName, isStatic, 'method', diagnostics);
                return undefined;
            }
            return method.returnType;

        } else {
            // Field Access
            const fieldName = node.text;

            // 1. Check explicit Methods used as properties (delegates)
            const methodAsProp = FindMethodInClassHierarchy(classDef, fieldName, -1, !isStatic, isStatic);
            if (methodAsProp) {
                return {name: 'function', typeArguments: []};
            }

            // 2. Check Fields
            const field = FindFieldInClassHierarchy(classDef, fieldName, !isStatic, isStatic, true, true);
            if (field) {
                return field.type;
            }

            this.reportMemberError(node, classDef, fieldName, isStatic, 'field', diagnostics);
            return undefined;
        }
    }

    private findLocalOrParamType(method: IMethod | IConstructor, name: string, position: vscode.Position): TypeReference | undefined {
        const local = this.documentTreeProvider.findAvailableLocalVariableByName(method, name, true, position);
        if (local) {
            return local.type;
        }

        if (method.parameters) {
            const param = method.parameters.find(p => p.name === name);
            if (param) {
                return param.type;
            }
        }
        return undefined;
    }

    private isDynamicType(type: TypeReference): boolean {
        return type.name === 'any' || type.name === 'void' || type.name === 'function' || type.name.includes('|');
    }

    private reportMemberError(
        node: IChainNode,
        classDef: IClass,
        memberName: string,
        isStatic: boolean,
        kind: 'method' | 'field',
        diagnostics: vscode.Diagnostic[]
    ): void {
        let msg = `${isStatic ? 'Static' : 'Instance'} ${kind} '${memberName}' does not exist on type '${classDef.name}'.`;
        let severity = vscode.DiagnosticSeverity.Error;

        // Soften warnings for Base classes where definitions might be incomplete or dynamic
        let code = DiagnosticCodes.MEMBER_DOES_NOT_EXIST;
        if (['Object', 'Character', 'Component', 'component', 'null'].includes(classDef.name)) {
            msg += `\nResolution may be imprecise.`;
            severity = vscode.DiagnosticSeverity.Warning;
            code = DiagnosticCodes.MEMBER_DOES_NOT_EXIST_BASE_CLASS;
        }

        if (severity === vscode.DiagnosticSeverity.Error || Settings.showUnresolvedMemberWarnings) {
            diagnostics.push(this.createDiagnostic(node, msg, severity, code));
        }
    }

    private createDiagnostic(
        link: IChainNode,
        message: string,
        severity: vscode.DiagnosticSeverity = vscode.DiagnosticSeverity.Error,
        code?: string | number
    ): vscode.Diagnostic {
        const range = link.range;
        const diagnostic = new vscode.Diagnostic(range, message, severity);
        if (code !== undefined) {
            diagnostic.code = code;
        }
        return diagnostic;
    }
}
