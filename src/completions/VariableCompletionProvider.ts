import * as vscode from 'vscode';
import * as markdown from '../utils/MarkdownHelper';
import { CodeContextUtils } from '../utils/CodeContextUtils';
import {
    ClassKinds,
    FindFieldInClassHierarchy,
    FindMethodInClassHierarchy,
    IClass,
    IConstructor,
    IField,
    IMethod,
    IParameter,
    IVariable
} from '../classes/IClass';

import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';

export class VariableCompletionProvider implements vscode.CompletionItemProvider, vscode.HoverProvider, vscode.SignatureHelpProvider {
    private documentTreeProvider: DocumentTreeProvider;

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const currentClassDef = this.documentTreeProvider.getCurrentClass(document, position);
        const currentDeclaringMethod = this.documentTreeProvider.getCurrentDeclaringMethod(document, position);
        const currentMethod = this.documentTreeProvider.getCurrentMethod(document, position);

        if (!currentClassDef || currentDeclaringMethod && !currentMethod) {
            return [];
        }

        const lineText = document.lineAt(position).text;
        let textBeforeCursor = lineText.substring(0, position.character);
        const textAfterCursor = lineText.substring(position.character);
        const nextIsParen = /^\s*\(/.test(textAfterCursor);

        const callChainString = CodeContextUtils.parseCallChain(textBeforeCursor);

        let lastDot = callChainString.lastIndexOf('.');
        const afterDot = lastDot === -1 ? '' : callChainString.slice(lastDot + 1).trim();
        const afterDotBeforeCursor = callChainString.slice(lastDot + 1, position.character).trim();

        const textBeforeDot = callChainString.slice(0, lastDot + 1).trim();

        const callChainArray = CodeContextUtils.splitCallChain(textBeforeDot);
        const wordRange = document.getWordRangeAtPosition(position, /[\w$]+/);

        if (callChainArray.length > 0) {
            const resolvedType = CodeContextUtils.resolveChainType(
                document,
                position,
                this.documentTreeProvider,
                callChainArray,
                currentClassDef,
                currentMethod
            );

            if (!resolvedType) {
                return [];
            }

            const classDef = this.documentTreeProvider.findClassByReference(document, resolvedType);
            if (!classDef) {
                return [];
            }

            const includePrivates = classDef.name === currentClassDef?.name;
            const staticContext = callChainArray[0] !== 'self' && callChainArray.length === 1 && this.documentTreeProvider.findClassByName(document, callChainArray[0]) !== undefined;

            let completions = this.getFieldsAndMethodsCompletions(
                classDef,
                includePrivates,
                !staticContext,
                staticContext || callChainArray[0] === 'self' && callChainArray.length === 1,
                nextIsParen,
                wordRange
            );
            if (afterDotBeforeCursor !== '') {
                completions = completions.filter(item => item.label.toString().startsWith(afterDot));
            }
            return completions;
        }

        return this.getVarsAndClassesCompletions(document, position, wordRange, currentMethod);
    }

    private getFieldsAndMethodsCompletions(
        classDef: IClass,
        includePrivate: boolean,
        includeInstance: boolean,
        includeStatics: boolean,
        nextIsParen: boolean,
        wordRange: vscode.Range | undefined
    ): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];

        classDef.extends?.forEach(baseClass => {
            const baseCompletions = this.getFieldsAndMethodsCompletions(baseClass, includePrivate, includeInstance, includeStatics, nextIsParen, wordRange);
            baseCompletions.forEach(item => items.push(item));
        });

        if (includeInstance) {
            classDef.instanceFields.forEach(field => {
                if (field.private && !includePrivate) {
                    return;
                }

                const item = new vscode.CompletionItem(field.label, vscode.CompletionItemKind.Field);
                item.detail = `${CodeContextUtils.typeRefToString(field.type)}`;
                item.documentation = new vscode.MarkdownString(field.description);
                if (wordRange) {
                    item.range = wordRange;
                }
                items.push(item);
            });

            classDef.instanceMethods.forEach(method => {
                const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Method);
                item.detail = `${this.constructMethodSignature(method)}: ${CodeContextUtils.typeRefToString(method.returnType)}`;
                item.documentation = new vscode.MarkdownString(method.description);
                if (wordRange) {
                    item.range = wordRange;
                }

                const snippetParams = method.parameters.map((param, index) => {
                    const placeholder = `\${${index + 1}:${param.name}}`;
                    return param.isVariadic ? `...${placeholder}` : placeholder;
                }).join(', ');

                if (nextIsParen) {
                    item.insertText = new vscode.SnippetString(method.label);
                } else {
                    item.insertText = new vscode.SnippetString(`${method.label}(${snippetParams})`);
                }
                items.push(item);
            });
        }

        if (includeStatics) {
            classDef.staticFields.forEach(field => {
                if (field.private && !includePrivate) {
                    return;
                }

                const item = new vscode.CompletionItem(field.label, vscode.CompletionItemKind.Field);
                item.detail = `${CodeContextUtils.typeRefToString(field.type)}`;
                item.documentation = new vscode.MarkdownString(field.description);
                if (wordRange) {
                    item.range = wordRange;
                }
                items.push(item);
            });

            classDef.staticMethods.forEach(method => {
                const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Function);
                item.detail = `${this.constructMethodSignature(method)}: ${CodeContextUtils.typeRefToString(method.returnType)}`;
                item.documentation = new vscode.MarkdownString(method.description);
                if (wordRange) {
                    item.range = wordRange;
                }

                const snippetParams = method.parameters.map((param, index) => {
                    const placeholder = `\${${index + 1}:${param.name}}`;
                    return param.isVariadic ? `...${placeholder}` : placeholder;
                }).join(', ');

                if (nextIsParen) {
                    item.insertText = new vscode.SnippetString(method.label);
                } else {
                    item.insertText = new vscode.SnippetString(`${method.label}(${snippetParams})`);
                }
                items.push(item);
            });
        }

        return items;
    }


    private getVarsAndClassesCompletions(
        document: vscode.TextDocument,
        position: vscode.Position,
        wordRange: vscode.Range | undefined,
        currentMethod: IMethod | IConstructor | undefined
    ): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];

        this.documentTreeProvider.getAllAvailableClasses(document).forEach(classDef => {
            if (classDef.hidden) {
                return;
            }

            if (classDef.constructors && classDef.constructors.length > 0) {
                classDef.constructors.forEach(constructor => {
                    const item = new vscode.CompletionItem(classDef.name, vscode.CompletionItemKind.Constructor);
                    item.detail = `constructor ${this.constructMethodSignature(constructor)}: ${classDef.name}`;
                    if (classDef.constructors!.length > 1) {
                        item.detail += ` (+${classDef.constructors!.length - 1} overload)`;
                    }
                    item.documentation = new vscode.MarkdownString(constructor.description || 'Constructor');
                    if (wordRange) {
                        item.range = wordRange;
                    }

                    const snippetParams = constructor.parameters.map((param, index) => {
                        const placeholder = `\${${index + 1}:${param.name}}`;
                        return param.isVariadic ? `...${placeholder}` : placeholder;
                    }).join(', ');

                    item.insertText = new vscode.SnippetString(`${classDef.name}(${snippetParams})`);
                    items.push(item);
                });
            } else if (classDef.kind === ClassKinds.CLASS) {
                const defaultConstructor = new vscode.CompletionItem(classDef.name, vscode.CompletionItemKind.Constructor);
                defaultConstructor.detail = `constructor (): ${classDef.name}`;
                defaultConstructor.documentation = new vscode.MarkdownString('Default no-argument constructor');
                defaultConstructor.insertText = new vscode.SnippetString(`${classDef.name}()`);
                if (wordRange) {
                    defaultConstructor.range = wordRange;
                }

                items.push(defaultConstructor);
            }
        });

        if (currentMethod) {
            const seenNames = new Set<string>();

            for (const details of this.documentTreeProvider.iterateAvailableLocalVariables(
                currentMethod!,
                true,
                position
            )) {
                if (seenNames.has(details.name)) {
                    continue;
                }
                seenNames.add(details.name);

                const item = new vscode.CompletionItem(details.name, vscode.CompletionItemKind.Variable);
                item.detail = `(local variable) ${CodeContextUtils.typeRefToString(details.type)}`;
                if (wordRange) {
                    item.range = wordRange;
                }
                items.push(item);
            }

            for (const param of currentMethod!.parameters) {
                if (seenNames.has(param.name)) {
                    continue;
                }
                seenNames.add(param.name);

                const item = new vscode.CompletionItem(param.name, vscode.CompletionItemKind.Variable);
                item.detail = `(parameter) ${CodeContextUtils.typeRefToString(param.type)}`;
                item.documentation = new vscode.MarkdownString(param.description);
                if (wordRange) {
                    item.range = wordRange;
                }
                items.push(item);
            }
        }

        this.documentTreeProvider.getAllAvailableClasses(document).forEach(classDef => {
            if (classDef.kind !== ClassKinds.EXTENSION) {
                return;
            }
            const classItem = new vscode.CompletionItem(classDef.name, vscode.CompletionItemKind.Class);
            classItem.detail = `${classDef.kind} ${classDef.name}`;
            classItem.documentation = new vscode.MarkdownString(classDef.description);
            if (wordRange) {
                classItem.range = wordRange;
            }
            items.push(classItem);
        });

        return items;
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
        const callChainString = CodeContextUtils.parseCallChain(fullLineBeforeWordEnd);
        const callChainArray = CodeContextUtils.splitCallChain(callChainString);

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

        if (currentMethod && callChainArray.length > 1) {
            const resolvedType = CodeContextUtils.resolveChainFinalPart(document, position, this.documentTreeProvider, callChainArray, currentClass, currentMethod);

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
            const local = this.documentTreeProvider.findAvailableLocalVariableByName(currentMethod, word, true, position);;
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
        }

        const classDef = this.documentTreeProvider.findClassByName(document, word);
        if (classDef) {
            return new vscode.Hover(markdown.createClassMarkdown(classDef), wordRange);
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

    public provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position): vscode.SignatureHelp | undefined {
        const lineText = document.lineAt(position.line).text;
        const openParenIndex = lineText.lastIndexOf('(', position.character);

        if (openParenIndex === -1) {
            return undefined;
        }

        let textBeforeParen = lineText.substring(0, openParenIndex).trim();
        const identifierChain = this.extractIdentifierChain(textBeforeParen);

        if (identifierChain.length === 0) {
            return undefined;
        }

        const argumentText = lineText.substring(openParenIndex + 1, position.character);
        const providedArgumentsCount = this.countArguments(argumentText);

        let classDef = this.documentTreeProvider.findClassByName(document, identifierChain[0]);
        if (identifierChain.length === 1 && classDef) {
            if (classDef && classDef.constructors && classDef.constructors.length > 0) {
                const signatureHelp = new vscode.SignatureHelp();

                classDef.constructors.forEach(constructor => {
                    const signature = new vscode.SignatureInformation(this.constructMethodSignature(constructor), new vscode.MarkdownString(constructor.description));

                    constructor.parameters.forEach(param => {
                        signature.parameters.push(new vscode.ParameterInformation(param.name, new vscode.MarkdownString(param.description)));
                    });

                    signatureHelp.signatures.push(signature);
                });

                signatureHelp.activeSignature = this.findClosestSignature(signatureHelp.signatures, providedArgumentsCount);
                signatureHelp.activeParameter = providedArgumentsCount - 1;
                return signatureHelp;
            }
        }

        const resolvedType = CodeContextUtils.resolveChainType(
            document,
            position,
            this.documentTreeProvider,
            identifierChain.slice(0, -1),
            this.documentTreeProvider.getCurrentClass(document, position),
            this.documentTreeProvider.getCurrentMethod(document, position)
        );
        if (!resolvedType) {
            return undefined;
        }

        classDef = this.documentTreeProvider.findClassByReference(document, resolvedType);
        if (!classDef) {
            return undefined;
        }

        const methodName = identifierChain[identifierChain.length - 1];
        const methodDef = this.findMethodByName(classDef, methodName);
        if (!methodDef) {
            return undefined;
        }

        const signatureHelp = new vscode.SignatureHelp();
        const signature = new vscode.SignatureInformation(this.constructMethodSignature(methodDef), new vscode.MarkdownString(methodDef.description));

        methodDef.parameters.forEach(param => {
            signature.parameters.push(new vscode.ParameterInformation(param.name, new vscode.MarkdownString(param.description)));
        });

        signatureHelp.signatures = [signature];
        signatureHelp.activeSignature = this.findClosestSignature(signatureHelp.signatures, providedArgumentsCount);
        signatureHelp.activeParameter = providedArgumentsCount - 1;

        return signatureHelp;
    }

    private extractIdentifierChain(text: string): string[] {
        const match = text.match(/[\w\d_]+(\.[\w\d_]+)*$/);
        if (match) {
            return match[0].split('.').map(id => id.trim());
        }
        return [];
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
        this.documentTreeProvider.getAllAvailableClasses(document).forEach((classDef) => {
            const method = this.findMethodByName(classDef, methodName);
            if (method) {
                return method;
            }
        });
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
