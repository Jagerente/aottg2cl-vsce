import {IVariable, IReference, IParameter} from './../classes/IClass';
import * as vscode from 'vscode';
import {
    IChainNode,
    IClass,
    IConstructor,
    IField,
    ILoopNode,
    IMethod,
    IConditionNode, IGenericClass, TypeReference
} from "../classes/IClass";
import {ACLManager} from '../antlr4ts/ACLManager';
import {CodeContextUtils} from "./CodeContextUtils";

type ParsedDocumentData = {
    userDefinedClasses: IClass[];
    importedClasses: Map<string, IClass>;
    allAvailableClasses: IClass[];
    chains: IChainNode[][];
    chainRanges: vscode.Range[];
    chainIndexByLine: Map<number, IChainNode[][]>;
    loopNodes: ILoopNode[];
    conditionNodes: IConditionNode[];
    stringRanges: vscode.Range[];
    commentRanges: vscode.Range[];
};

export class DocumentTreeProvider {
    private parsedDocuments = new Map<string, ParsedDocumentData>();
    private documentVersions = new Map<string, number>();

    constructor(
        private aclManager: ACLManager,
        private readonly globalClasses: Map<string, IClass>,
        private readonly genericClasses = new Map<string, IGenericClass>()
    ) {
        this.globalClasses = globalClasses;
        this.aclManager = aclManager;
    }

    public async refetchUserDefinedClasses(document: vscode.TextDocument): Promise<void> {
        const uri = document.uri.toString();
        const currentVersion = document.version;
        const cachedVersion = this.documentVersions.get(uri);

        if (cachedVersion !== undefined && cachedVersion === currentVersion) {
            return;
        }

        await this.aclManager.refetchWithImports(document);
        const userDefinedClasses = this.aclManager.getClasses();
        const importedClasses = this.aclManager.getImportedClasses();
        const chains = this.aclManager.getChains();
        const loopNodes = this.aclManager.getLoopNodes();
        const conditionNodes = this.aclManager.getConditionNodes();
        const stringRanges = this.aclManager.getStringRanges();
        const commentRanges = this.aclManager.getCommentRanges();

        const chainRanges = chains.map(chain => {
            if (chain.length === 0) {
                return new vscode.Range(0, 0, 0, 0);
            }

            const firstNode = chain[0];
            const lastNode = chain[chain.length - 1];

            const startPos = new vscode.Position(firstNode.startLine, firstNode.startColumn);
            const endPos = new vscode.Position(
                lastNode.startLine,
                lastNode.startColumn + lastNode.text.length
            );

            return new vscode.Range(startPos, endPos);
        });

        const chainIndexByLine = new Map<number, IChainNode[][]>();
        for (const chain of chains) {
            if (chain.length === 0) {
                continue;
            }

            const firstNode = chain[0];
            const lastNode = chain[chain.length - 1];
            const startLine = firstNode.range.start.line;
            const endLine = lastNode.range.end.line;

            for (let line = startLine; line <= endLine; line++) {
                if (!chainIndexByLine.has(line)) {
                    chainIndexByLine.set(line, []);
                }
                chainIndexByLine.get(line)!.push(chain);
            }
        }

        const allAvailableClasses = [
            ...Array.from(this.globalClasses.values()),
            ...userDefinedClasses,
            ...Array.from(importedClasses.values())
        ];

        this.parsedDocuments.set(uri, {
            userDefinedClasses,
            importedClasses,
            allAvailableClasses,
            chains,
            chainRanges,
            chainIndexByLine,
            loopNodes,
            conditionNodes,
            stringRanges,
            commentRanges
        });

        for (const classDef of userDefinedClasses) {
            let methods: IMethod | IConstructor[] = [...classDef.instanceMethods, ...classDef.staticMethods];
            if (classDef.constructors) {
                methods = [...methods, ...classDef.constructors];
            }

            for (const methodDef of methods) {
                if (!methodDef.localVariables) {
                    continue;
                }

                for (let i = 0; i < methodDef.localVariables.length; i++) {
                    const localVariable = methodDef.localVariables[i];
                    const varType = localVariable.type.name;
                    if (varType !== 'any') {
                        continue;
                    }

                    if (!classDef.sourceUri || !localVariable.declarationRange) {
                        continue;
                    }

                    const valuePosition = localVariable.valueRange?.start;
                    if (!valuePosition) {
                        continue;
                    }

                    const chainInfo = this.findChainAtPosition(document, valuePosition);

                    if (!chainInfo || chainInfo.identifierChain.length === 0) {
                        continue;
                    }
                    
                    let parsedType = CodeContextUtils.resolveChainTypeNew(
                        classDef.sourceUri.toString(),
                        localVariable.declarationRange.start,
                        this,
                        chainInfo.chain,
                        classDef,
                        methodDef
                    );
                    if (!parsedType) {
                        continue;
                    }

                    if (localVariable.inLoop && parsedType.typeArguments.length === 1) {
                        parsedType = parsedType.typeArguments[0];
                    }

                    localVariable.type = parsedType;
                }
            }
        }

        this.documentVersions.set(uri, currentVersion);

        this.buildReferences(document);
    }

    private buildReferences(document: vscode.TextDocument): void {
        const parsedData = this.getParsedData(document);
        if (!parsedData) {
            return;
        }

        const chains = parsedData.chains;

        // Initialize references arrays if they don't exist
        for (const classDef of parsedData.userDefinedClasses) {
            if (!classDef.references) {
                classDef.references = [];
            }

            // Process instance methods
            for (const method of classDef.instanceMethods) {
                if (!method.references) {
                    method.references = [];
                }
                for (const param of method.parameters) {
                    if (!param.references) {
                        param.references = [];
                    }
                }
                for (const variable of method.localVariables ?? []) {
                    if (!variable.references) {
                        variable.references = [];
                    }
                }
            }

            // Process static methods
            for (const method of classDef.staticMethods) {
                if (!method.references) {
                    method.references = [];
                }
                for (const param of method.parameters) {
                    if (!param.references) {
                        param.references = [];
                    }
                }
                for (const variable of method.localVariables ?? []) {
                    if (!variable.references) {
                        variable.references = [];
                    }
                }
            }

            // Process constructors
            if (classDef.constructors) {
                for (const ctor of classDef.constructors) {
                    if (!ctor.references) {
                        ctor.references = [];
                    }
                    for (const param of ctor.parameters) {
                        if (!param.references) {
                            param.references = [];
                        }
                    }
                    for (const variable of ctor.localVariables ?? []) {
                        if (!variable.references) {
                            variable.references = [];
                        }
                    }
                }
            }

            for (const field of [...classDef.instanceFields, ...classDef.staticFields]) {
                if (!field.references) {
                    field.references = [];
                }
            }
        }

        // Process each chain to find references
        for (const chain of chains) {
            if (chain.length === 0) {
                continue;
            }

            // Get the position of the first node in the chain
            const firstNode = chain[0];
            const position = new vscode.Position(firstNode.startLine, firstNode.startColumn);

            // Skip if inside string or comment
            if (this.isInsideString(document, position) || this.isInsideComment(document, position)) {
                continue;
            }

            // Build identifier chain from chain nodes
            const identifierChain: string[] = [];
            for (const node of chain) {
                let identifier = node.text;
                if (node.isMethodCall) {
                    // Extract method name from "methodName(args)"
                    const match = identifier.match(/^(\w+)\s*\(/);
                    if (match) {
                        identifier = match[1];
                    }
                }
                identifierChain.push(identifier);
            }

            if (identifierChain.length === 0) {
                continue;
            }

            // Get current context
            const currentClass = this.getCurrentClass(document, position);
            const currentMethod = this.getCurrentMethod(document, position);

            // Process each node in the chain to find references
            // For each node, resolve what it refers to using the prefix chain
            for (let i = 0; i < chain.length; i++) {
                const node = chain[i];
                const nodePosition = new vscode.Position(node.startLine, node.startColumn);

                // Skip if inside string or comment
                if (this.isInsideString(document, nodePosition) || this.isInsideComment(document, nodePosition)) {
                    continue;
                }

                // Build prefix chain up to and including current node
                const prefixChain = identifierChain.slice(0, i + 1);

                // Skip if this is 'self' and we're inside the class itself
                // 'self' inside a class should not count as a reference to that class
                if (i === 0 && prefixChain[0] === 'self' && currentClass) {
                    // Skip adding reference for 'self' when inside the class
                    continue;
                }

                // Resolve what this prefix chain refers to
                const resolved = CodeContextUtils.resolveChainFinalPart(
                    document,
                    nodePosition,
                    this,
                    prefixChain,
                    currentClass,
                    currentMethod
                );

                if (!resolved) {
                    continue;
                }

                // Skip if resolved is the current class and we're inside it
                // This prevents 'self' from creating references to the class itself
                if ('kind' in resolved && 'name' in resolved && !('label' in resolved)) {
                    const classDef = resolved as IClass;
                    if (currentClass && classDef.name === currentClass.name && 
                        classDef.sourceUri?.toString() === currentClass.sourceUri?.toString()) {
                        continue;
                    }
                }

                // Create reference range for this node
                let referenceRange: vscode.Range;

                if (node.isMethodCall) {
                    // For method calls, extract just the method name range
                    const methodNameMatch = node.text.match(/^(\w+)\s*\(/);
                    if (methodNameMatch) {
                        const methodName = methodNameMatch[1];
                        referenceRange = new vscode.Range(
                            new vscode.Position(node.startLine, node.startColumn),
                            new vscode.Position(node.startLine, node.startColumn + methodName.length)
                        );
                    } else {
                        referenceRange = new vscode.Range(
                            new vscode.Position(node.startLine, node.startColumn),
                            new vscode.Position(node.startLine, node.startColumn + node.text.length)
                        );
                    }
                } else {
                    // For fields/variables, use the full node range
                    referenceRange = new vscode.Range(
                        new vscode.Position(node.startLine, node.startColumn),
                        new vscode.Position(node.startLine, node.startColumn + node.text.length)
                    );
                }

                // Skip if reference is inside declaration range (self-reference)
                const isDeclaration = this.isReferenceInDeclaration(resolved, referenceRange);
                if (isDeclaration) {
                    continue;
                }

                // Determine if this is a read or write operation
                // For now, we'll mark method calls and most accesses as reads
                // Write operations would need additional analysis (assignment statements)
                const isWrite = false; // TODO: Implement write detection
                const isRead = !isWrite;

                const reference: IReference = {
                    uri: document.uri,
                    range: referenceRange,
                    isRead,
                    isWrite
                };

                // Add reference to the appropriate entity
                this.addReferenceToEntity(resolved, reference, parsedData);
            }
        }
    }

    private addReferenceToEntity(
        resolved: IClass | IMethod | IField | IVariable | IParameter | IConstructor,
        reference: IReference,
        parsedData: ParsedDocumentData
    ): void {
        // Check for class first (has 'kind' and 'name', but no 'label')
        if ('kind' in resolved && 'name' in resolved && !('label' in resolved)) {
            const classDef = resolved as IClass;
            // Only add reference if it's a user-defined class (not global)
            if (parsedData.userDefinedClasses.includes(classDef)) {
                if (classDef.references && !this.referenceExists(classDef.references, reference)) {
                    classDef.references.push(reference);
                }
            }
        }
        // Check for method (has 'label', 'returnType', 'parent', 'parameters', and 'kind' in MethodKinds)
        else if ('label' in resolved && 'returnType' in resolved && 'parent' in resolved && 'parameters' in resolved && 'kind' in resolved) {
            // Additional check: IMethod has 'kind' of type MethodKinds, IField doesn't
            const hasMethodKind = (resolved as any).kind === 'function' || (resolved as any).kind === 'coroutine';
            if (hasMethodKind) {
                const method = resolved as IMethod;
                // Only add reference if it's a user-defined method
                const isUserDefined = parsedData.userDefinedClasses.some(cls =>
                    cls.instanceMethods.includes(method) || cls.staticMethods.includes(method)
                );
                if (isUserDefined && method.references && !this.referenceExists(method.references, reference)) {
                    method.references.push(reference);
                }
            }
        }
        // Check for field (has 'label' and 'type', but no 'returnType')
        else if ('label' in resolved && 'type' in resolved && !('returnType' in resolved) && 'private' in resolved) {
            const field = resolved as IField;
            // Only add reference if it's a user-defined field
            const isUserDefined = parsedData.userDefinedClasses.some(cls =>
                cls.instanceFields.includes(field) || cls.staticFields.includes(field)
            );
            if (isUserDefined && field.references && !this.referenceExists(field.references, reference)) {
                field.references.push(reference);
            }
        }
        // Check for parameter (has 'isOptional' and 'isVariadic')
        else if ('isOptional' in resolved && 'isVariadic' in resolved) {
            const param = resolved as IParameter;
            // Only add reference if it's a parameter of a user-defined method/constructor
            const isUserDefined = parsedData.userDefinedClasses.some(cls => {
                for (const method of cls.instanceMethods) {
                    if (method.parameters.includes(param)) {
                        return true;
                    }
                }
                for (const method of cls.staticMethods) {
                    if (method.parameters.includes(param)) {
                        return true;
                    }
                }
                if (cls.constructors) {
                    for (const ctor of cls.constructors) {
                        if (ctor.parameters.includes(param)) {
                            return true;
                        }
                    }
                }
                return false;
            });
            if (isUserDefined && param.references && !this.referenceExists(param.references, reference)) {
                param.references.push(reference);
            }
        }
        // Check for variable (has 'name' and 'type', but no 'label', 'isOptional', or 'kind')
        else if ('name' in resolved && 'type' in resolved && !('label' in resolved) && !('isOptional' in resolved) && !('kind' in resolved)) {
            const variable = resolved as IVariable;
            // Only add reference if it's a local variable of a user-defined method/constructor
            const isUserDefined = parsedData.userDefinedClasses.some(cls => {
                for (const method of cls.instanceMethods) {
                    if ((method.localVariables ?? []).includes(variable)) {
                        return true;
                    }
                }
                for (const method of cls.staticMethods) {
                    if ((method.localVariables ?? []).includes(variable)) {
                        return true;
                    }
                }
                if (cls.constructors) {
                    for (const ctor of cls.constructors) {
                        if ((ctor.localVariables ?? []).includes(variable)) {
                            return true;
                        }
                    }
                }
                return false;
            });
            if (isUserDefined && variable.references && !this.referenceExists(variable.references, reference)) {
                variable.references.push(reference);
            }
        }
    }

    private isReferenceInDeclaration(
        entity: IClass | IMethod | IField | IVariable | IParameter | IConstructor,
        referenceRange: vscode.Range
    ): boolean {
        let declarationRange: vscode.Range | undefined;

        if ('declarationRange' in entity) {
            declarationRange = entity.declarationRange;
        }

        if (!declarationRange) {
            return false;
        }

        return declarationRange.contains(referenceRange.start) || declarationRange.contains(referenceRange.end);
    }

    private referenceExists(references: IReference[], newReference: IReference): boolean {
        return references.some(ref =>
            ref.uri.toString() === newReference.uri.toString() &&
            ref.range.isEqual(newReference.range)
        );
    }

    public clearDocument(document: vscode.TextDocument): void {
        const uri = document.uri.toString();
        this.parsedDocuments.delete(uri);
        this.documentVersions.delete(uri);
    }

    private getParsedData(document: vscode.TextDocument | string): ParsedDocumentData | undefined {
        if (typeof document === 'string') {
            return this.parsedDocuments.get(document);
        }

        return this.parsedDocuments.get(document.uri.toString());
    }

    public getGlobalClassesMap(): Map<string, IClass> {
        return this.globalClasses;
    }

    public getUserDefinedClasses(document: vscode.TextDocument): IClass[] {
        return this.getParsedData(document)?.userDefinedClasses ?? [];
    }

    public getAllAvailableClasses(document: vscode.TextDocument): IClass[] {
        return this.getParsedData(document)?.allAvailableClasses ?? Array.from(this.globalClasses.values());
    }

    public getCurrentClass(document: vscode.TextDocument, position: vscode.Position): IClass | undefined {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.bodyRange?.contains(position)) {
                return classDef;
            }
        }
        return undefined;
    }

    public getCurrentClassByDeclaration(document: vscode.TextDocument, position: vscode.Position): IClass | undefined {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.declarationRange?.contains(position)) {
                return classDef;
            }
        }
        return undefined;
    }

    public isInsideClassDeclaration(document: vscode.TextDocument, position: vscode.Position): boolean {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.declarationRange?.contains(position)) {
                return true;
            }
        }
        return false;
    }

    public isInsideMethodDeclaration(document: vscode.TextDocument, position: vscode.Position): boolean {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.instanceMethods.some(method => method.declarationRange?.contains(position)) || classDef.staticMethods.some(method => method.declarationRange?.contains(position)) || classDef.constructors?.some(ctor => ctor.declarationRange?.contains(position))) {
                return true;
            }

            if (classDef.constructors?.some(ctor => ctor.declarationRange?.contains(position))) {
                return true;
            }

            if (classDef.staticMethods.some(method => method.declarationRange?.contains(position))) {
                return true;
            }
        }
        return false;
    }

    public findClassByName(
        document: vscode.TextDocument | string,
        rawName: string
    ): IClass | undefined {
        const typeRef = CodeContextUtils.parseTypeReference(rawName);
        return this.findClassByReference(document, typeRef);
    }

    public findClassByReference(
        document: vscode.TextDocument | string,
        typeRef: TypeReference
    ): IClass | undefined {
        if (typeRef.typeArguments.length > 0) {
            const generic = this.genericClasses.get(typeRef.name);
            if (!generic) {
                return undefined;
            }

            return generic.instantiate(typeRef.typeArguments);
        }

        const parsedData = this.getParsedData(document);
        if (parsedData) {
            const userDefined = parsedData.userDefinedClasses.find(c => c.name === typeRef.name);
            if (userDefined) {
                return userDefined;
            }

            const imported = parsedData.importedClasses.get(typeRef.name);
            if (imported) {
                return imported;
            }

            const global = this.globalClasses.get(typeRef.name);
            if (global) {
                return global;
            }
        } else {
            return this.globalClasses.get(typeRef.name);
        }

        return undefined;
    }

    public getCurrentDeclaringMethod(document: vscode.TextDocument, position: vscode.Position): IMethod | IConstructor | undefined {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.bodyRange?.contains(position)) {
                for (const method of classDef.instanceMethods) {
                    if (method.declarationRange?.contains(position)) {
                        return method;
                    }
                }
                for (const method of classDef.staticMethods) {
                    if (method.declarationRange?.contains(position)) {
                        return method;
                    }
                }
                for (const ctor of classDef.constructors ?? []) {
                    if (ctor.declarationRange?.contains(position)) {
                        return ctor;
                    }
                }
            }
        }
        return undefined;
    }

    public getCurrentMethod(document: vscode.TextDocument, position: vscode.Position): IMethod | IConstructor | undefined {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.bodyRange?.contains(position)) {
                for (const method of classDef.instanceMethods) {
                    if (method.bodyRange?.contains(position)) {
                        return method;
                    }
                }
                for (const method of classDef.staticMethods) {
                    if (method.bodyRange?.contains(position)) {
                        return method;
                    }
                }
                for (const ctor of classDef.constructors ?? []) {
                    if (ctor.bodyRange?.contains(position)) {
                        return ctor;
                    }
                }
            }
        }
        return undefined;
    }

    public getCurrentFieldDeclaration(document: vscode.TextDocument, position: vscode.Position): IField | undefined {
        for (const classDef of this.getUserDefinedClasses(document)) {
            if (classDef.bodyRange?.contains(position)) {
                for (const field of classDef.instanceFields) {
                    if (field.declarationRange?.contains(position)) {
                        return field;
                    }
                }
                for (const field of classDef.staticFields) {
                    if (field.declarationRange?.contains(position)) {
                        return field;
                    }
                }
            }
        }
        return undefined;
    }

    public isInsideAnyMethodBody(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.getCurrentMethod(document, position) !== undefined;
    }

    public getChains(document: vscode.TextDocument): IChainNode[][] {
        return this.getParsedData(document)?.chains ?? [];
    }

    public isInsideChainNode(document: vscode.TextDocument, position: vscode.Position): boolean {
        const parsedData = this.getParsedData(document);
        if (!parsedData) {
            return false;
        }
        const candidateChains = parsedData.chainIndexByLine.get(position.line);
        if (candidateChains && candidateChains.length > 0) {
            for (const chain of candidateChains) {
                if (chain.length === 0) {continue;}
                const firstNode = chain[0];
                const lastNode = chain[chain.length - 1];
                const chainRange = new vscode.Range(firstNode.range.start, lastNode.range.end);
                if (chainRange.contains(position)) {
                    for (const node of chain) {
                        if (node.range.contains(position)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public findChainAtPosition(
        document: vscode.TextDocument,
        position: vscode.Position
    ): { chain: IChainNode[]; nodeIndex: number | undefined; identifierChain: string[] } | undefined {
        const parsedData = this.getParsedData(document);
        if (!parsedData) {
            return undefined;
        }

        const candidateChains = parsedData.chainIndexByLine.get(position.line);
        if (!candidateChains || candidateChains.length === 0) {
            return undefined;
        }

        const lineText = document.lineAt(position).text;
        const textBeforeCursor = lineText.substring(0, position.character);
        const isAfterDot = textBeforeCursor.trim().endsWith('.');

        // Check candidate chains (only those that intersect the line)
        for (const chain of candidateChains) {
            if (chain.length === 0) {
                continue;
            }

            // Check if position is within the overall chain range
            const firstNode = chain[0];
            const lastNode = chain[chain.length - 1];
            
            const chainStart = firstNode.range.start;
            let chainEnd = lastNode.range.end;
            
            // Expand chain end to include the next character if it's a dot
            if (isAfterDot) {
                chainEnd = new vscode.Position(chainEnd.line, chainEnd.character + 1);
            }

            if (!new vscode.Range(chainStart, chainEnd).contains(position)) {
                continue;
            }

            // If cursor is after a dot, build identifierChain for all nodes and return undefined nodeIndex
            if (isAfterDot) {
                // Build identifier chain for all nodes in the chain
                const identifierChain: string[] = [];
                for (let j = 0; j < chain.length; j++) {
                    let identifier = chain[j].text;
                    if (chain[j].isMethodCall) {
                        // Extract method name from "methodName(args)"
                        const parenIndex = identifier.indexOf('(');
                        if (parenIndex !== -1) {
                            identifier = identifier.substring(0, parenIndex).trim();
                        }
                    }
                    identifierChain.push(identifier);
                }

                return {
                    chain,
                    nodeIndex: undefined,
                    identifierChain
                };
            }

            // Find the specific node that contains the position
            for (let i = 0; i < chain.length; i++) {
                const node = chain[i];
                const nodeRange = node.range;

                if (nodeRange.contains(position)) {
                    // Build identifier chain up to and including this node
                    const identifierChain: string[] = [];
                    for (let j = 0; j <= i; j++) {
                        let identifier = chain[j].text;
                        if (chain[j].isMethodCall) {
                            // Extract method name from "methodName(args)"
                            const parenIndex = identifier.indexOf('(');
                            if (parenIndex !== -1) {
                                identifier = identifier.substring(0, parenIndex).trim();
                            }
                        }
                        identifierChain.push(identifier);
                    }

                    return {
                        chain,
                        nodeIndex: i,
                        identifierChain
                    };
                }
            }
        }

        return undefined;
    }

    public getLoopNodes(document: vscode.TextDocument): ILoopNode[] {
        return this.getParsedData(document)?.loopNodes ?? [];
    }

    public isInsideLoopBody(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.getLoopNodes(document).some(node => node.bodyRange.contains(position));
    }

    public isInsideLoopCondition(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.getLoopNodes(document).some(node => node.conditionsRange.contains(position));
    }

    public isInsideConditionBlock(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.getParsedData(document)?.conditionNodes.some(node => node.bodyRange.contains(position)) ?? false;
    }

    public isInsideConditionCondition(document: vscode.TextDocument, position: vscode.Position): boolean {
        return this.getParsedData(document)?.conditionNodes.some(node => node.conditionRange?.contains(position) ?? false) ?? false;
    }

    public canSuggestElif(document: vscode.TextDocument, position: vscode.Position): boolean {
        const nodes = this.getParsedData(document)?.conditionNodes ?? [];
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];
            if (node.afterBlockRange.contains(position)) {
                if (node.type === 'if' || node.type === 'elif') {
                    return true;
                }
                break;
            }
        }
        return false;
    }

    public canSuggestElse(document: vscode.TextDocument, position: vscode.Position): boolean {
        const nodes = this.getParsedData(document)?.conditionNodes ?? [];
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];
            if (node.afterBlockRange.contains(position)) {
                if (node.type === 'if' || node.type === 'elif') {
                    return true;
                }
                if (node.type === 'else') {
                    return false;
                }
                break;
            }
        }
        return false;
    }

    public isInsideString(document: vscode.TextDocument, position: vscode.Position): boolean {
        const stringRanges = this.getParsedData(document)?.stringRanges ?? [];
        return stringRanges.some(range => range.contains(position));
    }

    public isInsideComment(document: vscode.TextDocument, position: vscode.Position): boolean {
        const commentRanges = this.getParsedData(document)?.commentRanges ?? [];
        return commentRanges.some(range => range.contains(position));
    }

    public findAvailableLocalVariableByName(
        method: IMethod | IConstructor,
        name: string,
        reverse: boolean = false,
        posInScopeRange?: vscode.Position,
        posInDeclarationRange?: vscode.Position
    ): IVariable | undefined {
        const vars = reverse
            ? (method.localVariables ?? []).slice().reverse()
            : (method.localVariables ?? []);

        return vars.find(v => {
            const matchesName = v.name === name;

            const noFilters = posInScopeRange === undefined && posInDeclarationRange === undefined;

            const inScope = posInScopeRange !== undefined && v.scopeRange?.contains(posInScopeRange);
            const inDeclaration = posInDeclarationRange !== undefined && v.declarationRange?.contains(posInDeclarationRange);

            return matchesName && (noFilters || inScope || inDeclaration);
        });
    }

    public* iterateAvailableLocalVariables(
        method: IMethod | IConstructor,
        reverse: boolean = false,
        posInScopeRange?: vscode.Position,
        posInDeclarationRange?: vscode.Position
    ): IterableIterator<IVariable> {
        const vars = method.localVariables ?? [];
        const list = reverse ? [...vars].reverse() : vars;

        const noFilters = posInScopeRange === undefined
            && posInDeclarationRange === undefined;

        for (const v of list) {
            const inScope = posInScopeRange !== undefined
                && v.scopeRange?.contains(posInScopeRange);
            const inDeclaration = posInDeclarationRange !== undefined
                && v.declarationRange?.contains(posInDeclarationRange);

            if (noFilters || inScope || inDeclaration) {
                yield v;
            }
        }
    }
}
