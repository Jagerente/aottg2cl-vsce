import * as vscode from 'vscode';
import { CodeContextUtils } from '../utils/CodeContextUtils';
import { IClass, IMethod } from '../classes/IClass';
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
        const lines = document.getText().split('\n');

        const isInsideClass = CodeContextUtils.isInsideClass(document, position);
        const isInsideComponent = CodeContextUtils.isInsideComponent(document, position);
        const isInsideClassOrComponent = isInsideClass || isInsideComponent;
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
        // const assignmentMatch = lineText.match(/^\s*(\w+)\s*=\s*(.+)\s*$/);
        // if (assignmentMatch) {
        //     textBeforeCursor = assignmentMatch[2].trim();
        // }
        const validPrefixMatch = textBeforeCursor.match(/[\w\d_]+(\.[\w\d_]+)*\.$/);
        if (validPrefixMatch) {
            textBeforeCursor = validPrefixMatch[0].trim();
        } else {
            textBeforeCursor = ''
        }

        const dotIndex = textBeforeCursor.lastIndexOf('.');

        if (dotIndex !== -1) {
            const prefix = textBeforeCursor.substring(0, dotIndex).trim();
            const identifierChain = prefix.split('.').map(id => id.trim()).filter(id => id.length > 0);

            if (identifierChain.length === 0) {
                return [];
            }

            const resolvedType = this.resolveChainType(identifierChain, document, position);

            if (!resolvedType || resolvedType === 'unknown') {
                return [];
            }

            const classDef = this.findClassByName(resolvedType);
            if (!classDef) {
                return [];
            }

            const includePrivates = classDef.name == currentClassName;
            const staticContext = prefix !== 'self' && identifierChain.length === 1 && this.findClassByName(prefix) !== undefined;

            return this.provideFieldAndMethodCompletions(classDef, includePrivates, !staticContext, staticContext);
        }

        const items: vscode.CompletionItem[] = [];

        this.declaredVariables.forEach((details, variable) => {
            const item = new vscode.CompletionItem(variable, vscode.CompletionItemKind.Variable);
            item.detail = `Type: ${details.type} | Value: ${details.value}`;
            item.documentation = new vscode.MarkdownString(`**${variable}** = ${details.value}\n\nType: **${details.type}**`);
            items.push(item);
        });

        const allClasses = this.getAllClasses();
        allClasses.forEach(classDef => {
            const classItem = new vscode.CompletionItem(classDef.name, vscode.CompletionItemKind.Class);
            classItem.documentation = new vscode.MarkdownString(`**${classDef.name}**: ${classDef.description}`);
            items.push(classItem);
        });

        return items;
    }

    public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
        this.userDefinedClasses = ClassParser.parseClasses(document, this.getAllClassesMap());
        this.declaredVariables = VariableCollector.collectAvailableVariables(document, position, this.getAllClassesMap())

        const wordRange = document.getWordRangeAtPosition(position);
        const word = wordRange ? document.getText(wordRange) : null;

        if (word) {
            if (this.declaredVariables.has(word)) {
                const variableInfo = this.declaredVariables.get(word);
                const hoverContent = new vscode.MarkdownString(
                    `**Variable**: ${word}\n**Type**: ${variableInfo?.type}\n**Value**: ${variableInfo?.value}`
                );
                return new vscode.Hover(hoverContent, wordRange);
            }

            const classDef = this.findClassByName(word);
            if (classDef) {
                const hoverContent = new vscode.MarkdownString(`**Class**: ${classDef.name}\n${classDef.description}`);
                return new vscode.Hover(hoverContent, wordRange);
            }

            const currentClassName = CodeContextUtils.findCurrentClassName(document, position);
            const currentClass = currentClassName ? this.getAllClassesMap().get(currentClassName) : undefined;
            if (currentClass) {
                const field = currentClass.instanceFields.find(f => f.label === word) || currentClass.staticFields.find(f => f.label === word);
                if (field) {
                    const hoverContent = new vscode.MarkdownString(`**Field**: ${field.label}\n**Type**: ${field.type}\n${field.description}`);
                    return new vscode.Hover(hoverContent, wordRange);
                }

                const method = currentClass.instanceMethods.find(m => m.label === word) || currentClass.staticMethods.find(m => m.label === word);
                if (method) {
                    const hoverContent = new vscode.MarkdownString(`**Method**: ${method.label}\n**Signature**: ${this.constructMethodSignature(method)}\n\n${method.description}`);
                    return new vscode.Hover(hoverContent, wordRange);
                }
            }

            const methodDef = this.findMethodByName(word);
            if (methodDef) {
                const hoverContent = new vscode.MarkdownString(`**Method**: ${methodDef.label}\n**Signature**: ${this.constructMethodSignature(methodDef)}\n\n${methodDef.description}`);
                return new vscode.Hover(hoverContent, wordRange);
            }
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

        const textBeforeParen = lineText.substring(0, openParenIndex).trim();
        const identifierChain = textBeforeParen.split('.').map(id => id.trim()).filter(id => id.length > 0);

        if (identifierChain.length === 0) {
            return undefined;
        }

        const resolvedType = this.resolveChainType(identifierChain.slice(0, -1), document, position);
        if (!resolvedType) {
            return undefined;
        }

        const classDef = this.findClassByName(resolvedType);
        if (!classDef) {
            return undefined;
        }

        const methodName = identifierChain[identifierChain.length - 1];
        const methodDef = classDef.instanceMethods.find(m => m.label === methodName) || classDef.staticMethods.find(m => m.label === methodName);
        if (!methodDef) {
            return undefined;
        }

        const signatureHelp = new vscode.SignatureHelp();
        const signature = new vscode.SignatureInformation(this.constructMethodSignature(methodDef), new vscode.MarkdownString(methodDef.description));

        methodDef.parameters.forEach(param => {
            signature.parameters.push(new vscode.ParameterInformation(param.name, new vscode.MarkdownString(param.description)));
        });

        signatureHelp.signatures = [signature];
        signatureHelp.activeSignature = 0;
        signatureHelp.activeParameter = this.findActiveParameter(document, position, openParenIndex);

        return signatureHelp;
    }


    private findActiveParameter(document: vscode.TextDocument, position: vscode.Position, openParenIndex: number): number {
        const lineText = document.lineAt(position.line).text;
        const textAfterOpenParen = lineText.substring(openParenIndex + 1, position.character);
        return textAfterOpenParen.split(',').length - 1;
    }

    private resolveChainType(identifierChain: string[], document: vscode.TextDocument, position: vscode.Position): string | undefined {
        if (identifierChain.length === 0) {
            return undefined;
        }

        let currentTypeName: string | undefined;

        for (let i = 0; i < identifierChain.length; i++) {
            const identifier = identifierChain[i];

            if (i === 0) {
                if (identifier === 'self') {
                    const currentClassName = CodeContextUtils.findCurrentClassName(document, position);
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

    private provideFieldAndMethodCompletions(classDef: IClass, includePrivate: boolean, includeInstance: boolean, includeStatics: boolean): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];

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


    private findClassByName(className: string): IClass | undefined {
        if (this.userDefinedClasses.has(className)) {
            return this.userDefinedClasses.get(className);
        }

        return this.availableClasses.get(className);
    }

    private findMethodByName(methodName: string): IMethod | undefined {
        for (const classDef of this.getAllClasses()) {
            const method = classDef.instanceMethods.find(m => m.label === methodName) || classDef.staticMethods.find(m => m.label === methodName);
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

    private constructMethodSignature(method: IMethod): string {
        const params = method.parameters.map((param) => {
            const optionalFlag = param.isOptional ? '?' : '';
            const variadicFlag = param.isVariadic ? '...' : '';
            return `${variadicFlag}${param.name}${optionalFlag}: ${param.type}`;
        });
        const paramsString = params.join(', ');
        return `(${paramsString})`;
    }
}
