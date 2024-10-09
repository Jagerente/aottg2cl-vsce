import * as vscode from 'vscode';
import { CodeContextUtils } from '../utils/CodeContextUtils';
import { ClassKinds, IClass, IConstructor, IMethod, MethodKinds } from '../classes/IClass';
import { ClassParser } from '../utils/ClassParser';
import { VariableCollector } from '../utils/VariableCollector';

export class VariableCompletionProvider implements vscode.CompletionItemProvider, vscode.HoverProvider, vscode.SignatureHelpProvider {
    private declaredVariables: Map<string, { value: string, type: string }>;
    private availableClasses: Map<string, IClass>;
    private userDefinedClasses: Map<string, IClass>;

    constructor(availableClasses: Map<string, IClass>) {
        this.declaredVariables = new Map();
        this.availableClasses = availableClasses;
        this.userDefinedClasses = new Map();
    }

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const isInsideClass = CodeContextUtils.isInsideClass(document, position);
        const isInsideComponent = CodeContextUtils.isInsideComponent(document, position);
        const isInsideExtension = CodeContextUtils.isInsideExtension(document, position);
        const isInsideClassOrComponent = isInsideClass || isInsideComponent || isInsideExtension;
        const isDeclaringFunction = CodeContextUtils.isDeclaringFunction(document, position);

        if (!isInsideClassOrComponent || isDeclaringFunction) {
            return [];
        }

        this.declaredVariables.clear();
        this.userDefinedClasses.clear();

        this.userDefinedClasses = ClassParser.parseClasses(document, this.getAllClassesMap());
        this.declaredVariables = VariableCollector.collectAvailableVariables(document, position, this.getAllClassesMap())

        const currentClassName = CodeContextUtils.findCurrentClassName(document, position);

        const lineText = document.lineAt(position).text;
        let textBeforeCursor = lineText.substring(0, position.character);
        const callChainString = CodeContextUtils.parseCallChain(textBeforeCursor);
        const callChainArray = CodeContextUtils.splitCallChain(callChainString);

        if (callChainArray.length > 0) {
            const resolvedType = this.resolveChainType(callChainArray, currentClassName);

            if (!resolvedType || resolvedType === 'unknown') {
                return [];
            }

            const classDef = this.findClassByName(resolvedType);
            if (!classDef) {
                return [];
            }

            const includePrivates = classDef.name == currentClassName;
            const staticContext = callChainArray[0] !== 'self' && callChainArray.length === 1 && this.findClassByName(callChainArray[0]) !== undefined;

            return this.getFieldsAndMethodsCompletions(classDef, includePrivates, !staticContext, staticContext);
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

        this.getAllClasses().forEach(classDef => {
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

        const allClasses = this.getAllClasses();
        allClasses.forEach(classDef => {
            const classItem = new vscode.CompletionItem(classDef.name, vscode.CompletionItemKind.Class);
            classItem.documentation = new vscode.MarkdownString(`**${classDef.name}**: ${classDef.description}`);
            classItem.detail = `${classDef.kind}`;
            items.push(classItem);
        });

        return items;
    }

    public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
        this.userDefinedClasses = ClassParser.parseClasses(document, this.getAllClassesMap());
        this.declaredVariables = VariableCollector.collectAvailableVariables(document, position, this.getAllClassesMap())

        const wordRange = document.getWordRangeAtPosition(position);
        const word = wordRange ? document.getText(wordRange) : null;
        if (!word) {
            return undefined;
        }

        if (this.declaredVariables.has(word)) {
            const variableInfo = this.declaredVariables.get(word);
            const hoverContent = new vscode.MarkdownString(
                `(var) ${word} ${variableInfo?.type} = ${variableInfo?.value}`
            );
            return new vscode.Hover(hoverContent, wordRange);
        }

        const classDef = this.findClassByName(word);
        if (classDef) {
            const hoverContent = new vscode.MarkdownString(`(${classDef.kind}) ${classDef.name}\n\n${classDef.description}`);
            return new vscode.Hover(hoverContent, wordRange);
        }

        const currentClassName = CodeContextUtils.findCurrentClassName(document, position);
        const currentClass = currentClassName ? this.getAllClassesMap().get(currentClassName) : undefined;
        if (currentClass) {
            const field = currentClass.instanceFields.find(f => f.label === word) || currentClass.staticFields.find(f => f.label === word);
            if (field) {
                const hoverContent = new vscode.MarkdownString(`(field) ${field.label} ${field.type}\n\n${field.description}`);
                return new vscode.Hover(hoverContent, wordRange);
            }

            const method = currentClass.instanceMethods.find(m => m.label === word) || currentClass.staticMethods.find(m => m.label === word);
            if (method) {
                const hoverContent = new vscode.MarkdownString(`${MethodKinds.FUNCTION} ${method.label}${this.constructMethodSignature(method)} ${method.returnType}\n\n${method.description}`);
                return new vscode.Hover(hoverContent, wordRange);
            }
        }

        const methodDef = this.findMethodByNameFromAllClasses(word);
        if (methodDef) {
            const hoverContent = new vscode.MarkdownString(`${methodDef.kind ?? MethodKinds.FUNCTION} ${methodDef.label}${this.constructMethodSignature(methodDef)} ${methodDef.returnType}\n\n${methodDef.description}`);
            return new vscode.Hover(hoverContent, wordRange);
        }

        return undefined;
    }

    public provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position): vscode.SignatureHelp | undefined {
        this.userDefinedClasses = ClassParser.parseClasses(document, this.getAllClassesMap());
        this.declaredVariables = VariableCollector.collectAvailableVariables(document, position, this.getAllClassesMap());

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

        const currentClassName = CodeContextUtils.findCurrentClassName(document, position);
        const resolvedType = this.resolveChainType(identifierChain.slice(0, -1), currentClassName);
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

    private findActiveParameter(document: vscode.TextDocument, position: vscode.Position, openParenIndex: number): number {
        const lineText = document.lineAt(position.line).text;
        const textAfterOpenParen = lineText.substring(openParenIndex + 1, position.character);
        return textAfterOpenParen.split(',').length - 1;
    }

    private resolveChainType(identifierChain: string[], currentClassName?: string | undefined): string | undefined {
        if (identifierChain.length === 0) {
            return undefined;
        }

        let currentTypeName: string | undefined;

        for (let i = 0; i < identifierChain.length; i++) {
            const identifier = identifierChain[i];

            if (i === 0) {
                if (identifier === 'self') {
                    if (!currentClassName) {
                        return undefined;
                    }
                    currentTypeName = currentClassName;
                } else {
                    const variable = this.declaredVariables.get(identifier);
                    if (variable) {
                        currentTypeName = variable.type;
                    } else {
                        if (this.findClassByName(identifier)) {
                            currentTypeName = identifier;
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


                const field = classDef.instanceFields.find(f => f.label === identifier) || classDef.staticFields.find(f => f.label === identifier);
                if (field) {
                    currentTypeName = field.type;
                    continue;
                }

                if (/^\s*\w+\s*\(.*\)\s*$/.test(identifier)) {
                    const name = identifier.split('(')[0].trim();
                    const method = classDef.instanceMethods.find(m => m.label === name) || classDef.staticMethods.find(m => m.label === name);
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




    private findClassByName(className: string): IClass | undefined {
        if (this.userDefinedClasses.has(className)) {
            return this.userDefinedClasses.get(className);
        }

        return this.availableClasses.get(className);
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
        for (const classDef of this.getAllClasses()) {
            const method = this.findMethodByName(classDef, methodName);
            if (method) {
                return method;
            }
        }
        return undefined;
    }

    private getAllClasses(): IClass[] {
        return [...Array.from(this.availableClasses.values()), ...Array.from(this.userDefinedClasses.values())];
    }

    private getAllClassesMap(): Map<string, IClass> {
        const combinedMap = new Map<string, IClass>();

        this.availableClasses.forEach((classDef, className) => {
            combinedMap.set(className, classDef);
        });

        this.userDefinedClasses.forEach((classDef, className) => {
            combinedMap.set(className, classDef);
        });

        return combinedMap;
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
}
