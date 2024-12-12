import * as vscode from 'vscode';
import * as markdown from '../utils/MarkdownHelper';
import { CodeContextUtils } from '../utils/CodeContextUtils';
import { ClassKinds, FindFieldInClassHierarchy, FindMethodInClassHierarchy, IClass, IConstructor, IField, IMethod, IParameter, IVariable, MethodKinds } from '../classes/IClass';
import { VariableCollector } from '../utils/VariableCollector';
import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';

export class VariableCompletionProvider implements vscode.CompletionItemProvider, vscode.HoverProvider, vscode.SignatureHelpProvider {
    private documentTreeProvider: DocumentTreeProvider;
    private declaredVariables: Map<string, IVariable>;
    private variableCollector: VariableCollector;

    constructor(documentTreeProvider: DocumentTreeProvider, variableCollector: VariableCollector) {
        this.documentTreeProvider = documentTreeProvider;
        this.variableCollector = variableCollector;
        this.declaredVariables = new Map();
    }

    public updateDeclaredVariables(declaredVariables: Map<string, IVariable>) {
        this.declaredVariables = declaredVariables;
    }

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const isInsideClass = this.documentTreeProvider.isInsideClassBody(position);
        const isInsideComponent = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.COMPONENT);
        const isInsideExtension = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.EXTENSION);
        const isInsideCutscene = this.documentTreeProvider.isInsideClassKindBody(position, ClassKinds.CUTSCENE);
        const isInsideAnyClass = isInsideClass || isInsideComponent || isInsideExtension || isInsideCutscene;
        const isInsideAnyMethodBody = this.documentTreeProvider.isInsideAnyMethodBody(position);

        const isDeclaringFunction = this.documentTreeProvider.isInsideAnyMethodDeclaration(position);

        if (!isInsideAnyClass || isDeclaringFunction && !isInsideAnyMethodBody) {
            return [];
        }

        this.declaredVariables = this.variableCollector.collectAvailableVariables(document, position);

        const currentClassDef = this.documentTreeProvider.getCurrentClass(position);

        const lineText = document.lineAt(position).text;
        let textBeforeCursor = lineText.substring(0, position.character);

        let lastDot = textBeforeCursor.lastIndexOf('.');
        const afterDot = lastDot === -1 ? '' : textBeforeCursor.slice(lastDot + 1).trim();
        const afterDotBeforeCursor = textBeforeCursor.slice(lastDot + 1, position.character).trim();
        const textBeforeDot = textBeforeCursor.slice(0, lastDot + 1).trim();

        const callChainString = CodeContextUtils.parseCallChain(textBeforeDot);
        const callChainArray = CodeContextUtils.splitCallChain(callChainString);

        if (callChainArray.length > 0) {
            const resolvedType = this.resolveChainType(callChainArray, currentClassDef);

            if (!resolvedType || resolvedType === 'unknown') {
                return [];
            }

            const classDef = this.findClassByName(resolvedType);
            if (!classDef) {
                return [];
            }

            const includePrivates = classDef.name === currentClassDef?.name;
            const staticContext = callChainArray[0] !== 'self' && callChainArray.length === 1 && this.findClassByName(callChainArray[0]) !== undefined;

            let completions = this.getFieldsAndMethodsCompletions(classDef, includePrivates, !staticContext, staticContext || callChainArray[0] === 'self' && callChainArray.length === 1);
            if (afterDotBeforeCursor !== '') {
                completions = completions.filter(item => item.label.toString().startsWith(afterDot));
            }
            return completions;
        }

        return this.getVarsAndClassesCompletions();
    }

    private getFieldsAndMethodsCompletions(classDef: IClass, includePrivate: boolean, includeInstance: boolean, includeStatics: boolean): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];

        classDef.extends?.forEach(baseClass => {
            const baseCompletions = this.getFieldsAndMethodsCompletions(baseClass, includePrivate, includeInstance, includeStatics);
            baseCompletions.forEach(item => items.push(item));
        });

        if (includeInstance) {
            classDef.instanceFields.forEach(field => {
                if (field.private && !includePrivate) {
                    return;
                }

                const item = new vscode.CompletionItem(field.label, vscode.CompletionItemKind.Field);
                item.detail = `Instance Field: ${field.type}`;
                item.documentation = new vscode.MarkdownString(field.description);
                items.push(item);
            });

            classDef.instanceMethods.forEach(method => {
                const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Method);
                item.detail = `Instance Method: ${this.constructMethodSignature(method)} -> ${method.returnType}`;
                item.documentation = new vscode.MarkdownString(method.description);

                const snippetParams = method.parameters.map((param, index) => {
                    const placeholder = `\${${index + 1}:${param.name}}`;
                    return param.isVariadic ? `...${placeholder}` : placeholder;
                }).join(', ');

                item.insertText = new vscode.SnippetString(`${method.label}(${snippetParams})`);
                items.push(item);
            });
        }

        if (includeStatics) {
            classDef.staticFields.forEach(field => {
                if (field.private && !includePrivate) {
                    return;
                }

                const item = new vscode.CompletionItem(field.label, vscode.CompletionItemKind.Field);
                item.detail = `Static Field: ${field.type}`;
                item.documentation = new vscode.MarkdownString(field.description);
                items.push(item);
            });

            classDef.staticMethods.forEach(method => {
                const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Method);
                item.detail = `Static Method: ${this.constructMethodSignature(method)} -> ${method.returnType}`;
                item.documentation = new vscode.MarkdownString(method.description);

                const snippetParams = method.parameters.map((param, index) => {
                    const placeholder = `\${${index + 1}:${param.name}}`;
                    return param.isVariadic ? `...${placeholder}` : placeholder;
                }).join(', ');

                item.insertText = new vscode.SnippetString(`${method.label}(${snippetParams})`);
                items.push(item);
            });
        }

        return items;
    }


    private getVarsAndClassesCompletions(): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];

        this.documentTreeProvider.getAllAvailableClasses().forEach(classDef => {
            if (classDef.constructors && classDef.constructors.length > 0) {
                classDef.constructors.forEach(constructor => {
                    const item = new vscode.CompletionItem(classDef.name, vscode.CompletionItemKind.Constructor);
                    item.detail = `Constructor: ${this.constructMethodSignature(constructor)}`;
                    item.documentation = new vscode.MarkdownString(constructor.description || 'Constructor');

                    const snippetParams = constructor.parameters.map((param, index) => {
                        const placeholder = `\${${index + 1}:${param.name}}`;
                        return param.isVariadic ? `...${placeholder}` : placeholder;
                    }).join(', ');

                    item.insertText = new vscode.SnippetString(`${classDef.name}(${snippetParams})`);
                    items.push(item);
                });
            } else if (classDef.kind === ClassKinds.CLASS || classDef.kind === ClassKinds.COMPONENT) {
                const defaultConstructor = new vscode.CompletionItem(classDef.name, vscode.CompletionItemKind.Constructor);
                defaultConstructor.detail = `Constructor: ${classDef.name}()`;
                defaultConstructor.documentation = new vscode.MarkdownString('Default no-argument constructor');
                defaultConstructor.insertText = new vscode.SnippetString(`${classDef.name}()`);
                items.push(defaultConstructor);
            }
        });

        this.declaredVariables.forEach((details, variable) => {
            const item = new vscode.CompletionItem(variable, vscode.CompletionItemKind.Variable);
            item.detail = `${details.type}`;
            item.documentation = new vscode.MarkdownString(`**${variable}** = ${details.value}\n\nType: **${details.type}**`);
            items.push(item);
        });

        this.documentTreeProvider.getAllAvailableClasses().forEach(classDef => {
            const classItem = new vscode.CompletionItem(classDef.name, vscode.CompletionItemKind.Class);
            classItem.documentation = new vscode.MarkdownString(`**${classDef.name}**: ${classDef.description}`);
            classItem.detail = `${classDef.kind}`;
            items.push(classItem);
        });

        return items;
    }

    public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
        this.declaredVariables = this.variableCollector.collectAvailableVariables(document, position);

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

        if (callChainArray.length > 0) {
            const resolvedType = this.resolveChainFinalPart(callChainArray, this.documentTreeProvider.getCurrentClass(position));

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
                    hoverContent = this.buildVariableMarkdown(variableDef);
                } else {
                    hoverContent = new vscode.MarkdownString(`Unknown type`);
                }

                return new vscode.Hover(hoverContent, wordRange);
            }
        }

        const currentMethodDef = this.documentTreeProvider.getCurrentDeclarationMethod(position);
        if (currentMethodDef) {
            for (let i = 0; i < currentMethodDef.parameters.length; i++) {
                const param = currentMethodDef.parameters[i];
                if (param.name === word) {
                    return new vscode.Hover(this.buildParameterMarkdown(param), wordRange);
                }
            }
        }

        if (this.declaredVariables.has(word)) {
            const variableInfo = this.declaredVariables.get(word);
            return new vscode.Hover(this.buildVariableMarkdown(variableInfo!), wordRange);
        }

        const classDef = this.findClassByName(word);
        if (classDef) {
            return new vscode.Hover(markdown.createClassMarkdown(classDef), wordRange);
        }

        const currentClass = this.documentTreeProvider.getCurrentClass(position);
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

        const methodDef = this.findMethodByNameFromAllClasses(word);
        if (methodDef) {
            return new vscode.Hover(markdown.createMethodMarkdown(methodDef, this.constructMethodSignature(methodDef)), wordRange);
        }

        return undefined;
    }

    public provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position): vscode.SignatureHelp | undefined {
        this.declaredVariables = this.variableCollector.collectAvailableVariables(document, position);

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

        if (identifierChain.length === 1 && this.findClassByName(identifierChain[0])) {
            const classDef = this.findClassByName(identifierChain[0]);
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

        const resolvedType = this.resolveChainType(identifierChain.slice(0, -1), this.documentTreeProvider.getCurrentClass(position));
        if (!resolvedType) {
            return undefined;
        }

        const classDef = this.findClassByName(resolvedType);
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

    private resolveChainType(identifierChain: string[], currentClassDef?: IClass | undefined): string | undefined {
        if (identifierChain.length === 0) {
            return undefined;
        }

        const currentClassName = currentClassDef?.name;
        let currentTypeName: string | undefined;

        for (let i = 0; i < identifierChain.length; i++) {
            const identifier = identifierChain[i];

            if (i === 0) {
                if (identifier === 'self') {
                    if (!currentClassName) {
                        return undefined;
                    }
                    currentTypeName = currentClassName;
                    continue;
                } else {
                    const variable = this.declaredVariables.get(identifier);
                    if (variable) {
                        currentTypeName = variable.type;
                    } else {
                        if (this.findClassByName(identifier.split('(')[0])) {
                            currentTypeName = identifier.split('(')[0];
                        } else {
                            return undefined;
                        }
                    }
                }
            } else {
                if (!currentTypeName) {
                    return undefined;
                }

                const classDef = this.findClassByName(currentTypeName);
                if (!classDef) {
                    return undefined;
                }

                const field = FindFieldInClassHierarchy(classDef, identifier, true, true, true, true);
                if (field) {
                    currentTypeName = field.type;
                    continue;
                }

                if (/^\s*\w+\s*\(.*\)\s*$/.test(identifier)) {
                    const name = identifier.split('(')[0].trim();
                    const method = FindMethodInClassHierarchy(classDef, name, -1, true, true);
                    if (method) {
                        currentTypeName = method.returnType;
                        continue;
                    }
                }

                return undefined;
            }
        }

        return currentTypeName;
    }

    private resolveChainFinalPart(identifierChain: string[], currentClassDef?: IClass | undefined): IClass | IMethod | IField | IVariable | undefined {
        if (identifierChain.length === 0) {
            return undefined;
        }

        const currentClassName = currentClassDef?.name;
        let currentTypeName: string | undefined;
        let currentPart: IClass | IMethod | IField | IVariable | undefined;

        for (let i = 0; i < identifierChain.length; i++) {
            const identifier = identifierChain[i];

            if (i === 0) {
                if (identifier === 'self') {
                    if (!currentClassName) {
                        return undefined;
                    }
                    currentTypeName = currentClassName;
                    currentPart = currentClassDef;
                    continue;
                } else {
                    const variable = this.declaredVariables.get(identifier);
                    if (variable) {
                        currentTypeName = variable.type;
                        currentPart = variable;
                    } else {
                        const classDef = this.findClassByName(identifier.split('(')[0]);
                        if (classDef) {
                            currentTypeName = identifier.split('(')[0];
                            currentPart = classDef;
                        } else {
                            return undefined;
                        }
                    }
                }
            } else {
                if (!currentTypeName) {
                    return undefined;
                }

                const classDef = this.findClassByName(currentTypeName);
                if (!classDef) {
                    return undefined;
                }

                const field = FindFieldInClassHierarchy(classDef, identifier, true, true, true, true);
                if (field) {
                    currentTypeName = field.type;
                    currentPart = field;
                    continue;
                }

                if (/^\s*\w+\s*\(.*\)\s*$/.test(identifier)) {
                    const name = identifier.split('(')[0].trim();
                    const method = FindMethodInClassHierarchy(classDef, name, -1, true, true);
                    if (method) {
                        currentTypeName = method.returnType;
                        currentPart = method;
                        continue;
                    }
                }

                return undefined;
            }
        }

        return currentPart;
    }

    private findClassByName(className: string): IClass | undefined {
        return this.documentTreeProvider.getAllAvailableClasses().find((cls) => cls.name === className);
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

    private findMethodByNameFromAllClasses(methodName: string): IMethod | undefined {
        this.documentTreeProvider.getAllAvailableClasses().forEach((classDef) => {
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
            return `${variadicFlag}${param.name}${optionalFlag}: ${param.type}`;
        });
        const paramsString = params.join(', ');
        return `(${paramsString})`;
    }

    private buildVariableMarkdown(variableDef: IVariable): vscode.MarkdownString {
        return new vscode.MarkdownString(
            `(var) ${variableDef.name} ${variableDef.type} = ${variableDef.value}`
        );
    }

    private buildParameterMarkdown(paramDef: IParameter): vscode.MarkdownString {
        return new vscode.MarkdownString(
            `(param) ${paramDef.name}: ${paramDef.type}`
        );
    }
}
