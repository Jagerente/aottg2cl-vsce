import {
    DocumentSymbol,
    SymbolKind,
    TextDocument,
    CancellationToken,
    DocumentSymbolProvider,
    Range,
} from 'vscode';

import { DocumentTreeProvider } from '../utils/DocumentTreeProvider';
import { IClass, IField, IMethod, MethodKinds } from '../classes/IClass';

export class SymbolProvider implements DocumentSymbolProvider {
    constructor(private documentTreeProvider: DocumentTreeProvider) { }

    public async provideDocumentSymbols(
        doc: TextDocument,
        token: CancellationToken
    ): Promise<DocumentSymbol[]> {
        const symbols: DocumentSymbol[] = [];
        for (const classDef of this.documentTreeProvider.getUserDefinedClassesMap().values()) {
            const classSymbol = this.createClassSymbolSafe(classDef);
            if (classSymbol) {
                symbols.push(classSymbol);
            }
        }
        return symbols;
    }

    private createClassSymbolSafe(classDef: IClass): DocumentSymbol | null {
        if (!classDef.declarationRange || !classDef.bodyRange) {
            console.warn(`Skipping class ${classDef.name}: missing ranges`);
            return null;
        }
        try {
            return this.createClassSymbol(classDef);
        } catch (error) {
            console.error(`Error generating class symbol for ${classDef.name}`, error);
            return null;
        }
    }

    private createClassSymbol(classDef: IClass): DocumentSymbol {
        const fullRange = new Range(
            classDef.declarationRange!.start,
            classDef.bodyRange!.end
        );
        const selectionRange = new Range(
            classDef.declarationRange!.start,
            classDef.declarationRange!.end
        );

        const classSymbol = new DocumentSymbol(
            classDef.name,
            classDef.kind,
            SymbolKind.Class,
            fullRange,
            selectionRange
        );

        const members: DocumentSymbol[] = [];
        members.push(...this.createConstructorSymbolsSafe(classDef));
        members.push(...this.createMethodSymbolsSafe(classDef.staticMethods));
        members.push(...this.createMethodSymbolsSafe(classDef.instanceMethods));
        members.push(...this.createFieldSymbolsSafe(classDef.staticFields));
        members.push(...this.createFieldSymbolsSafe(classDef.instanceFields));
        classSymbol.children = members;

        return classSymbol;
    }

    private createConstructorSymbolsSafe(classDef: IClass): DocumentSymbol[] {
        const result: DocumentSymbol[] = [];
        for (const ctor of classDef.constructors || []) {
            if (ctor.declarationRange && ctor.bodyRange) {
                result.push(
                    this.wrapSymbol(
                        `${classDef.name}(${ctor.parameters.map(p => p.name).join(', ')})`,
                        'constructor',
                        SymbolKind.Constructor,
                        ctor.declarationRange,
                        ctor.bodyRange
                    )
                );
            } else {
                console.warn(`Skipping constructor in ${classDef.name}: missing ranges`);
            }
        }
        return result;
    }

    private createMethodSymbolsSafe(
        methods: IMethod[]
    ): DocumentSymbol[] {
        const result: DocumentSymbol[] = [];
        for (const method of methods) {
            if (method.declarationRange && method.bodyRange) {
                result.push(
                    this.wrapSymbol(
                        method.label,
                        method.kind || MethodKinds.FUNCTION,
                        SymbolKind.Method,
                        method.declarationRange,
                        method.bodyRange
                    )
                );
            } else {
                console.warn(`Skipping method ${method.label}: missing ranges`);
            }
        }
        return result;
    }

    private createFieldSymbolsSafe(fields: IField[]): DocumentSymbol[] {
        return fields
            .filter(f => !!f.declarationRange)
            .map(f => {
                // const kind =
                //     f.private ? SymbolKind.Key :
                //         f.readonly ? SymbolKind.Constant :
                //             ['string'].includes(f.type) ? SymbolKind.String :
                //                 ['int', 'float'].includes(f.type) ? SymbolKind.Number :
                //                     ['bool'].includes(f.type) ? SymbolKind.Boolean :
                //                         SymbolKind.Object;
                const kind = SymbolKind.Field;
                const label = `${f.label}: ${f.type}`;
                const range = f.declarationRange!;
                return new DocumentSymbol(label, '', kind, range, range);
            });
    }

    private wrapSymbol(
        label: string,
        detail: string,
        kind: SymbolKind,
        declRange: Range,
        bodyRange: Range
    ): DocumentSymbol {
        try {
            const fullRange = new Range(declRange.start, bodyRange.end);
            const selectionRange = new Range(declRange.start, declRange.end);
            return new DocumentSymbol(label, detail, kind, fullRange, selectionRange);
        } catch (error) {
            console.error(`Error generating symbol for ${label}`, error);
            return new DocumentSymbol(label, detail, kind, declRange, declRange);
        }
    }
}
