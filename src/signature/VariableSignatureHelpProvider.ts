import * as vscode from 'vscode';
import {CodeContextUtils} from '../utils/CodeContextUtils';
import {IClass, IMethod, IConstructor} from '../classes/IClass';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';

export class VariableSignatureHelpProvider {
    constructor(
        private documentTreeProvider: DocumentTreeProvider
    ) {
    }

    public provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position): vscode.SignatureHelp | undefined {
        const lineText = document.lineAt(position.line).text;
        const openParenIndex = lineText.lastIndexOf('(', position.character);

        if (openParenIndex === -1) {
            return undefined;
        }

        const argumentText = lineText.substring(openParenIndex + 1, position.character);
        const providedArgumentsCount = this.countArguments(argumentText);

        // Find the chain at the position of the opening parenthesis
        const parenPosition = new vscode.Position(position.line, openParenIndex);
        const chainInfo = this.documentTreeProvider.findChainAtPosition(document, parenPosition);

        const currentClass = this.documentTreeProvider.getCurrentClass(document, position);
        const currentMethod = this.documentTreeProvider.getCurrentMethod(document, position);

        let resolved: IClass | IMethod | IConstructor | undefined;

        if (chainInfo && chainInfo.chain.length > 0) {
            // Use resolveChainFinalPart to get the method/constructor directly
            // For method calls, the last node in the chain is the method being called
            const resolvedPart = CodeContextUtils.resolveChainFinalPart(
                document,
                parenPosition,
                this.documentTreeProvider,
                chainInfo.chain,
                currentClass,
                currentMethod
            );

            // Only accept IClass, IMethod, or IConstructor (not IField, IVariable, IParameter)
            if (resolvedPart && ('kind' in resolvedPart || 'parameters' in resolvedPart)) {
                if ('kind' in resolvedPart && 'name' in resolvedPart && !('label' in resolvedPart)) {
                    resolved = resolvedPart as IClass;
                } else if ('parameters' in resolvedPart && 'returnType' in resolvedPart) {
                    resolved = resolvedPart as IMethod | IConstructor;
                }
            }
        }

        if (!resolved) {
            return undefined;
        }

        // Handle constructor calls (resolved is IClass)
        if ('kind' in resolved && 'name' in resolved && !('label' in resolved)) {
            const classDef = resolved as IClass;
            if (classDef.constructors && classDef.constructors.length > 0) {
                return this.createSignatureHelpForConstructors(classDef.constructors, providedArgumentsCount);
            }
            return undefined;
        }

        // Handle method calls (resolved is IMethod or IConstructor)
        if ('parameters' in resolved && 'returnType' in resolved) {
            const methodDef = resolved as IMethod;
            return this.createSignatureHelpForMethod(methodDef, providedArgumentsCount);
        }

        return undefined;
    }

    private createSignatureHelpForConstructors(constructors: IConstructor[], providedArgumentsCount: number): vscode.SignatureHelp {
        const signatureHelp = new vscode.SignatureHelp();

        constructors.forEach(constructor => {
            const signature = new vscode.SignatureInformation(
                this.constructMethodSignature(constructor),
                new vscode.MarkdownString(constructor.description)
            );

            constructor.parameters.forEach(param => {
                signature.parameters.push(
                    new vscode.ParameterInformation(param.name, new vscode.MarkdownString(param.description))
                );
            });

            signatureHelp.signatures.push(signature);
        });

        signatureHelp.activeSignature = this.findClosestSignature(signatureHelp.signatures, providedArgumentsCount);
        signatureHelp.activeParameter = providedArgumentsCount - 1;

        return signatureHelp;
    }

    private createSignatureHelpForMethod(method: IMethod, providedArgumentsCount: number): vscode.SignatureHelp {
        const signatureHelp = new vscode.SignatureHelp();
        const signature = new vscode.SignatureInformation(
            this.constructMethodSignature(method),
            new vscode.MarkdownString(method.description)
        );

        method.parameters.forEach(param => {
            signature.parameters.push(
                new vscode.ParameterInformation(param.name, new vscode.MarkdownString(param.description))
            );
        });

        signatureHelp.signatures = [signature];
        signatureHelp.activeSignature = 0;
        signatureHelp.activeParameter = providedArgumentsCount - 1;

        return signatureHelp;
    }

    private countArguments(argumentText: string): number {
        let count = 0;
        let insideString = false;
        let stringChar = '';
        for (let i = 0; i < argumentText.length; i++) {
            const char = argumentText[i];

            if ((char === '"' || char === "'") && (i === 0 || argumentText[i - 1] !== '\\')) {
                if (!insideString) {
                    insideString = true;
                    stringChar = char;
                } else if (char === stringChar) {
                    insideString = false;
                }
            } else if (char === ',' && !insideString) {
                count++;
            }
        }

        return count + 1;
    }

    private findClosestSignature(signatures: vscode.SignatureInformation[], argumentCount: number): number {
        let closestIndex = 0;
        let closestDiff = Infinity;

        signatures.forEach((signature, index) => {
            const paramCount = signature.parameters.length;
            const diff = Math.abs(paramCount - argumentCount);

            if (diff < closestDiff) {
                closestIndex = index;
                closestDiff = diff;
            }
        });

        return closestIndex;
    }

    private constructMethodSignature(method: IMethod | IConstructor): string {
        const params = method.parameters.map((param) => {
            const optionalFlag = param.isOptional ? '?' : '';
            const variadicFlag = param.isVariadic ? '...' : '';
            return `${variadicFlag}${param.name}${optionalFlag}: ${CodeContextUtils.typeRefToString(param.type)}`;
        });
        const paramsString = params.join(', ');
        return `(${paramsString})`;
    }
}

