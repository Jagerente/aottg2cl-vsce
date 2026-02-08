import * as vscode from 'vscode';
import {CodeContextUtils} from '../utils/CodeContextUtils';
import {Settings} from '../config/settings';
import {
    ClassKinds,
    IClass,
    IConstructor,
    IMethod,
    IParameter,
} from '../classes/IClass';
import {CompletionContext} from './CompletionContext';

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

        const {
            document,
            position,
            callChainInfo,
            wordRange,
            nextIsParen,
            currentClass: currentClassDef,
            currentMethod
        } = context;

        if (!callChainInfo || (callChainInfo.chain.length <= 1 && callChainInfo.nodeIndex !== undefined)) {
            return this.getVarsAndClassesCompletions(context);
        }

        const callChainBeforeCursor = callChainInfo?.chain.slice(0, callChainInfo.nodeIndex ?? callChainInfo.chain.length);

        const resolvedType = CodeContextUtils.resolveChainType(
            document,
            position,
            context.documentTreeProvider,
            callChainBeforeCursor,
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

        // Detect "static context": determines if we should suggest only static members (not instance members).
        //
        // The key indicator is the chain structure before the cursor:
        //   - Static access: "Something.Something" or "Something.Something()" 
        //     -> Chain has exactly one element that is NOT a method call AND NOT "self" AND is a class name -> static context
        //   - Instance access: "Something().Something" or "Something().Something()" 
        //     -> First element is a method call (constructor) -> instance context (we instantiated the class)
        //   - Variable/parameter access: "btn.Something" where btn is a variable
        //     -> First element is a variable or parameter -> instance context (accessing instance of a class)
        //   - Special case: "self.Something" or "self.Something()"
        //     -> If classDef is EXTENSION -> static context (self addresses extension as static)
        //     -> If classDef is not EXTENSION (component/class) -> instance context

        // Check if the first element is a variable or parameter (not a direct class access)
        const resolvedPart = CodeContextUtils.resolveChainFinalPart(
            document,
            position,
            context.documentTreeProvider,
            callChainBeforeCursor,
            currentClassDef,
            currentMethod,
            0 // Only resolve the first element
        );

        // Check if resolved part is a variable (has 'name' and 'type', but no 'label', 'isOptional', or 'kind')
        // or a parameter (has 'isOptional')
        const isVariableOrParameter = resolvedPart !== undefined &&
            (('name' in resolvedPart && !('label' in resolvedPart) && !('kind' in resolvedPart) && !('isOptional' in resolvedPart)) ||
                ('isOptional' in resolvedPart));

        const isDirectClassAccess = callChainBeforeCursor.length === 1 &&
            !callChainBeforeCursor[0].isMethodCall &&
            callChainBeforeCursor[0].text !== 'self' &&
            !isVariableOrParameter;
        const isSelfExtension = callChainBeforeCursor.length > 0 &&
            callChainBeforeCursor[0].text === 'self' &&
            classDef.kind === ClassKinds.EXTENSION;
        const staticContext = isDirectClassAccess || isSelfExtension;

        return this.getFieldsAndMethodsCompletions(
            classDef,
            includePrivates,
            !staticContext,
            staticContext,
            nextIsParen,
            wordRange
        );
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
        const {document, position, wordRange, currentMethod, documentTreeProvider} = context;
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
