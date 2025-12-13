import * as vscode from 'vscode';
import * as markdown from '../utils/MarkdownHelper';
import { CodeContextUtils } from '../utils/CodeContextUtils';
import { Settings } from '../config/settings';
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
import { CompletionContext } from './CompletionContext';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';

const PRIORITY_STATIC = '0';
const PRIORITY_CONSTRUCTOR = '1';
const PRIORITY_VARIABLE = '2';

export class VariableCompletionProvider {
    public provideCompletions(context: CompletionContext): vscode.CompletionItem[] {
        if (context.isInsideClassDeclaration || context.isInsideMethodDeclaration) {
            return [];
        }

        if (!context.currentClass || context.currentDeclaringMethod) {
            return [];
        }

        const { document, position, textBeforeCursor, callChainString, callChainArray, wordRange, nextIsParen, currentClass: currentClassDef, currentMethod } = context;

        let lastDot = callChainString.lastIndexOf('.');
        const afterDot = lastDot === -1 ? '' : callChainString.slice(lastDot + 1).trim();
        const afterDotBeforeCursor = callChainString.slice(lastDot + 1, position.character).trim();

        const textBeforeDot = callChainString.slice(0, lastDot + 1).trim();
        const callChainArrayForResolve = CodeContextUtils.splitCallChain(textBeforeDot);

        if (callChainArrayForResolve.length > 0) {
            const resolvedType = CodeContextUtils.resolveChainType(
                document,
                position,
                context.documentTreeProvider,
                callChainArrayForResolve,
                currentClassDef,
                currentMethod
            );

            if (!resolvedType) {
                return [];
            }

            const classDef = context.documentTreeProvider.findClassByReference(document, resolvedType);
            if (!classDef) {
                return [];
            }

            const includePrivates = classDef.name === currentClassDef?.name;
            const staticContext = callChainArrayForResolve[0] !== 'self' && callChainArrayForResolve.length === 1 && context.documentTreeProvider.findClassByName(document, callChainArrayForResolve[0]) !== undefined;

            let completions = this.getFieldsAndMethodsCompletions(
                classDef,
                includePrivates,
                !staticContext,
                staticContext || callChainArrayForResolve[0] === 'self' && callChainArrayForResolve.length === 1,
                nextIsParen,
                wordRange
            );
            if (afterDotBeforeCursor !== '') {
                completions = completions.filter(item => item.label.toString().startsWith(afterDot));
            }
            return completions;
        }

        return this.getVarsAndClassesCompletions(context);
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
                const completions = this.createMethodCompletions(method, nextIsParen, wordRange);
                completions.forEach(item => items.push(item));
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
                const completions = this.createMethodCompletions(method, nextIsParen, wordRange, vscode.CompletionItemKind.Function);
                completions.forEach(item => items.push(item));
            });
        }

        return items;
    }


    private getVarsAndClassesCompletions(
        context: CompletionContext
    ): vscode.CompletionItem[] {
        const { document, position, wordRange, currentMethod, documentTreeProvider } = context;
        const items: vscode.CompletionItem[] = [];

        documentTreeProvider.getAllAvailableClasses(document).forEach(classDef => {
            if (classDef.hidden) {
                return;
            }
            const hasStatics = (classDef.staticFields?.length ?? 0) > 0 || (classDef.staticMethods?.length ?? 0) > 0;
            const hasParentStatics = (classDef.extends ?? []).some(parent =>
                (parent.staticFields?.length ?? 0) > 0 || (parent.staticMethods?.length ?? 0) > 0
            );
            if (!hasStatics && !hasParentStatics) {
                return;
            }

            const classItem = new vscode.CompletionItem(classDef.name, vscode.CompletionItemKind.Class);
            classItem.detail = `${classDef.kind} ${classDef.name}`;
            classItem.documentation = new vscode.MarkdownString(classDef.description);
            if (wordRange) {
                classItem.range = wordRange;
            }
            classItem.sortText = `${PRIORITY_STATIC}_${classDef.name}`;
            items.push(classItem);
        });

        documentTreeProvider.getAllAvailableClasses(document).forEach(classDef => {
            if (classDef.hidden) {
                return;
            }

            if (classDef.constructors && classDef.constructors.length > 0) {
                classDef.constructors.forEach((constructor, index) => {
                    const item = new vscode.CompletionItem(classDef.name, vscode.CompletionItemKind.Constructor);
                    item.detail = `constructor ${this.constructMethodSignature(constructor)}: ${classDef.name}`;
                    if (classDef.constructors!.length > 1) {
                        item.detail += ` (+${classDef.constructors!.length - 1} overload)`;
                    }
                    item.documentation = new vscode.MarkdownString(constructor.description || 'Constructor');
                    if (wordRange) {
                        item.range = wordRange;
                    }

                    if (Settings.disableAutoParameters) {
                        item.insertText = new vscode.SnippetString(`${classDef.name}($1)`);
                    } else {
                        const snippetParams = constructor.parameters.map((param, index) => {
                            const placeholder = `\${${index + 1}:${param.name}}`;
                            return param.isVariadic ? `...${placeholder}` : placeholder;
                        }).join(', ');
                        item.insertText = new vscode.SnippetString(`${classDef.name}(${snippetParams})`);
                    }
                    item.sortText = `${PRIORITY_CONSTRUCTOR}_${classDef.name}_${index}`;
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
                defaultConstructor.sortText = `${PRIORITY_CONSTRUCTOR}_${classDef.name}`;
                items.push(defaultConstructor);
            }
        });

        if (currentMethod) {
            const seenNames = new Set<string>();

            for (const details of documentTreeProvider.iterateAvailableLocalVariables(
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
                item.sortText = `${PRIORITY_VARIABLE}_${details.name}`;
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
                item.sortText = `${PRIORITY_VARIABLE}_${param.name}`;
                items.push(item);
            }
        }

        return items;
    }

    public provideHover(document: vscode.TextDocument, position: vscode.Position, documentTreeProvider: DocumentTreeProvider): vscode.Hover | undefined {
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

        const currentClass = documentTreeProvider.getCurrentClass(document, position);

        const currentField = documentTreeProvider.getCurrentFieldDeclaration(document, position);
        if (currentField) {
            if (word === currentField.label) {
                const hoverContent = markdown.createFieldMarkdown(currentField);
                return new vscode.Hover(hoverContent, wordRange);
            }
        }

        const currentDeclarationMethod = documentTreeProvider.getCurrentDeclaringMethod(document, position);
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

        const currentMethod = documentTreeProvider.getCurrentMethod(document, position);

        if (currentMethod && callChainArray.length > 1) {
            const resolvedType = CodeContextUtils.resolveChainFinalPart(document, position, documentTreeProvider, callChainArray, currentClass, currentMethod);

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
            const local = documentTreeProvider.findAvailableLocalVariableByName(currentMethod, word, true, position);;
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

        const classDef = documentTreeProvider.findClassByName(document, word);
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

        const methodDef = this.findMethodByNameFromAllClasses(document, word, documentTreeProvider);
        if (methodDef) {
            return new vscode.Hover(markdown.createMethodMarkdown(methodDef, this.constructMethodSignature(methodDef)), wordRange);
        }

        return undefined;
    }

    public provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position, documentTreeProvider: DocumentTreeProvider): vscode.SignatureHelp | undefined {
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

        let classDef = documentTreeProvider.findClassByName(document, identifierChain[0]);
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
            documentTreeProvider,
            identifierChain.slice(0, -1),
            documentTreeProvider.getCurrentClass(document, position),
            documentTreeProvider.getCurrentMethod(document, position)
        );
        if (!resolvedType) {
            return undefined;
        }

        classDef = documentTreeProvider.findClassByReference(document, resolvedType);
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

    private findMethodByNameFromAllClasses(document: vscode.TextDocument, methodName: string, documentTreeProvider: DocumentTreeProvider): IMethod | undefined {
        for (const classDef of documentTreeProvider.getAllAvailableClasses(document)) {
            const method = this.findMethodByName(classDef, methodName);
            if (method) {
                return method;
            }
        }
        return undefined;
    }

    private createMethodCompletions(
        method: IMethod,
        nextIsParen: boolean,
        wordRange: vscode.Range | undefined,
        kind: vscode.CompletionItemKind = vscode.CompletionItemKind.Method
    ): vscode.CompletionItem[] {
        const completions: vscode.CompletionItem[] = [];
        
        const requiredParams = method.parameters.filter(p => !p.isOptional && !p.isVariadic);
        const optionalParams = method.parameters.filter(p => p.isOptional && !p.isVariadic);
        const variadicParams = method.parameters.filter(p => p.isVariadic);
        
        const variantCount = 1 + optionalParams.length + (variadicParams.length > 0 ? 1 : 0);
        
        for (let variant = 0; variant < variantCount; variant++) {
            const paramsToInclude: IParameter[] = [...requiredParams];
            
            if (variant > 0) {
                const optionalCount = Math.min(variant, optionalParams.length);
                paramsToInclude.push(...optionalParams.slice(0, optionalCount));
            }
            
            if (variadicParams.length > 0 && variant === variantCount - 1) {
                paramsToInclude.push(...variadicParams);
            }
            
            const item = new vscode.CompletionItem(method.label, kind);
            
            const signatureParams = paramsToInclude.map((param) => {
                const optionalFlag = param.isOptional ? '?' : '';
                const variadicFlag = param.isVariadic ? '...' : '';
                return `${variadicFlag}${param.name}${optionalFlag}: ${CodeContextUtils.typeRefToString(param.type)}`;
            });
            const paramsString = signatureParams.join(', ');
            item.detail = `(${paramsString}): ${CodeContextUtils.typeRefToString(method.returnType)}`;
            
            if (variantCount > 1) {
                item.detail += ` [${variant + 1}/${variantCount}]`;
            }
            
            item.documentation = new vscode.MarkdownString(method.description);
            if (wordRange) {
                item.range = wordRange;
            }

            if (nextIsParen) {
                item.insertText = new vscode.SnippetString(method.label);
            } else if (Settings.disableAutoParameters) {
                item.insertText = new vscode.SnippetString(`${method.label}($1)`);
            } else {
                const snippetParams = paramsToInclude.map((param, index) => {
                    const placeholder = `\${${index + 1}:${param.name}}`;
                    return param.isVariadic ? `...${placeholder}` : placeholder;
                }).join(', ');
                item.insertText = new vscode.SnippetString(`${method.label}(${snippetParams})`);
            }
            
            completions.push(item);
        }
        
        return completions;
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
