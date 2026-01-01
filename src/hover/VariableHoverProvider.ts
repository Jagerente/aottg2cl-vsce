import * as vscode from 'vscode';
import * as markdown from '../utils/MarkdownHelper';
import {CodeContextUtils} from '../utils/CodeContextUtils';
import {
    FindConstructorInClassHierarchy,
    FindFieldInClassHierarchy,
    FindMethodInClassHierarchy,
    IClass,
    IConstructor,
    IField,
    IMethod,
    IVariable
} from '../classes/IClass';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';

export class VariableHoverProvider {
    constructor(
        private documentTreeProvider: DocumentTreeProvider
    ) {
    }

    public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
        const lineText = document.lineAt(position).text;
        const wordRange = document.getWordRangeAtPosition(position);
        const word = wordRange ? document.getText(wordRange) : null;
        if (!word) {
            return undefined;
        }

        let fullLineBeforeWordEnd = lineText.substring(0, wordRange!.end.character);
        const charAfterWord = lineText.substring(wordRange!.end.character, wordRange!.end.character + 1);
        if (charAfterWord === '(') {
            fullLineBeforeWordEnd += '()';
        }

        const currentClass = this.documentTreeProvider.getCurrentClass(document, position);

        const currentField = this.documentTreeProvider.getCurrentFieldDeclaration(document, position);
        if (currentField) {
            if (word === currentField.label) {
                const hoverContent = markdown.createFieldMarkdown(currentField);
                return new vscode.Hover(hoverContent, wordRange);
            }
        }

        const currentDeclarationMethod = this.documentTreeProvider.getCurrentDeclaringMethod(document, position);
        if (currentDeclarationMethod) {
            const isMethod = 'label' in currentDeclarationMethod;
            const methodName = isMethod ? currentDeclarationMethod.label : 'Init';

            if (methodName === word) {
                if (isMethod) {
                    return new vscode.Hover(
                        markdown.createMethodMarkdown(currentDeclarationMethod, this.constructMethodSignature(currentDeclarationMethod)),
                        wordRange
                    );
                } else {
                    return new vscode.Hover(
                        markdown.createConstructorMarkdown(currentDeclarationMethod, this.constructMethodSignature(currentDeclarationMethod)),
                        wordRange
                    );
                }
            }

            for (let i = 0; i < currentDeclarationMethod.parameters.length; i++) {
                const param = currentDeclarationMethod.parameters[i];
                if (param.name === word) {
                    return new vscode.Hover(markdown.createParameterMarkdown(param), wordRange);
                }
            }
        }

        const currentMethod = this.documentTreeProvider.getCurrentMethod(document, position);

        const chainInfo = this.documentTreeProvider.findChainAtPosition(document, position);
        const callChain = chainInfo?.chain.slice(0, (chainInfo.nodeIndex ?? chainInfo.chain.length - 1) + 1);

        if (currentMethod && callChain && callChain.length > 1) {
            const resolvedType = CodeContextUtils.resolveChainFinalPart(document, position, this.documentTreeProvider, callChain, currentClass, currentMethod);

            if (resolvedType) {
                let hoverContent: vscode.MarkdownString;
                if ('kind' in resolvedType && 'name' in resolvedType) {
                    const classDef = resolvedType as IClass;
                    hoverContent = markdown.createClassMarkdown(classDef);
                } else if ('parameters' in resolvedType && 'returnType' in resolvedType) {
                    const methodDef = resolvedType as IMethod;
                    hoverContent = markdown.createMethodMarkdown(methodDef, this.constructMethodSignature(methodDef));
                } else if ('label' in resolvedType && 'type' in resolvedType) {
                    const fieldDef = resolvedType as IField;
                    hoverContent = markdown.createFieldMarkdown(fieldDef);
                } else if ('name' in resolvedType && 'type' in resolvedType) {
                    const variableDef = resolvedType as IVariable;
                    hoverContent = markdown.createVariableMarkdown(variableDef);
                } else {
                    hoverContent = new vscode.MarkdownString(`Unknown type`);
                }

                return new vscode.Hover(hoverContent, wordRange);
            }
        }

        if (currentMethod) {
            const local = this.documentTreeProvider.findAvailableLocalVariableByName(currentMethod, word, true, position);
            ;
            if (local) {
                return new vscode.Hover(
                    markdown.createVariableMarkdown(local),
                    wordRange
                );
            }

            const param = currentMethod.parameters?.find(p => p.name === word);
            if (param) {
                return new vscode.Hover(
                    markdown.createParameterMarkdown(param),
                    wordRange
                );
            }

            if (callChain && callChain.length === 1 && callChain[0].text === "self") {
                // Check if there's a next link in the full chain
                if (chainInfo && chainInfo.nodeIndex !== undefined && chainInfo.chain.length > chainInfo.nodeIndex + 1) {
                    // Use the extended chain including the next link
                    const extendedChain = chainInfo.chain.slice(0, chainInfo.nodeIndex + 2);

                    const resolvedType = CodeContextUtils.resolveChainFinalPart(document, position, this.documentTreeProvider, extendedChain, currentClass, currentMethod);

                    if (resolvedType) {
                        let hoverContent: vscode.MarkdownString;
                        if ('kind' in resolvedType && 'name' in resolvedType) {
                            const classDef = resolvedType as IClass;
                            hoverContent = markdown.createClassMarkdown(classDef);
                        } else if ('parameters' in resolvedType && 'returnType' in resolvedType) {
                            const methodDef = resolvedType as IMethod;
                            hoverContent = markdown.createMethodMarkdown(methodDef, this.constructMethodSignature(methodDef));
                        } else if ('label' in resolvedType && 'type' in resolvedType) {
                            const fieldDef = resolvedType as IField;
                            hoverContent = markdown.createFieldMarkdown(fieldDef);
                        } else if ('name' in resolvedType && 'type' in resolvedType) {
                            const variableDef = resolvedType as IVariable;
                            hoverContent = markdown.createVariableMarkdown(variableDef);
                        } else {
                            hoverContent = new vscode.MarkdownString(`Unknown type`);
                        }

                        return new vscode.Hover(hoverContent, wordRange);
                    }
                }
            }
        }

        const classDef = this.documentTreeProvider.findClassByName(document, word);
        if (classDef) {
            if (charAfterWord !== '(') {
                return new vscode.Hover(markdown.createClassMarkdown(classDef), wordRange);
            }
            if (classDef.constructors && classDef.constructors.length > 0) {
                const chains = this.documentTreeProvider.getChains(document);
                let argCount = -1;

                for (const chain of chains) {
                    const firstLink = chain[0];
                    if (firstLink.isMethodCall && firstLink.text.split('(')[0] === word) {
                        const linkEndColumn = firstLink.startColumn + firstLink.text.length;

                        if (position.line === firstLink.startLine &&
                            position.character >= firstLink.startColumn &&
                            position.character <= linkEndColumn) {
                            if (firstLink.methodArguments) {
                                argCount = firstLink.methodArguments.length;
                                break;
                            }
                        }
                    }
                }

                const ctor = FindConstructorInClassHierarchy(classDef, argCount);
                if (ctor) {
                    return new vscode.Hover(markdown.createConstructorMarkdown(ctor, this.constructMethodSignature(ctor)), wordRange);
                }

                return new vscode.Hover(markdown.createConstructorMarkdown(classDef.constructors[0], this.constructMethodSignature(classDef.constructors[0])), wordRange);
            }
        }

        if (currentClass) {
            const fieldDef = FindFieldInClassHierarchy(currentClass, word, true, true, true, true);
            if (fieldDef) {
                return new vscode.Hover(markdown.createFieldMarkdown(fieldDef), wordRange);
            }

            const methodDef = FindMethodInClassHierarchy(currentClass, word, -1, true, true);
            if (methodDef) {
                return new vscode.Hover(markdown.createMethodMarkdown(methodDef, this.constructMethodSignature(methodDef)), wordRange);
            }
        }

        const methodDef = this.findMethodByNameFromAllClasses(document, word);
        if (methodDef) {
            return new vscode.Hover(markdown.createMethodMarkdown(methodDef, this.constructMethodSignature(methodDef)), wordRange);
        }

        return undefined;
    }

    private findMethodByName(classDef: IClass, methodName: string): IMethod | undefined {
        let methodDef = classDef.instanceMethods.find(m => m.label === methodName) || classDef.staticMethods.find(m => m.label === methodName);
        if (methodDef) {
            return methodDef;
        }
        if (classDef.extends) {
            for (const parentClass of classDef.extends) {
                methodDef = this.findMethodByName(parentClass, methodName);
                if (methodDef) {
                    return methodDef;
                }
            }
        }
        return undefined;
    }

    private findMethodByNameFromAllClasses(document: vscode.TextDocument, methodName: string): IMethod | undefined {
        for (const classDef of this.documentTreeProvider.getAllAvailableClasses(document)) {
            const method = this.findMethodByName(classDef, methodName);
            if (method) {
                return method;
            }
        }
        return undefined;
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

