import * as fs from 'fs';
import * as path from 'path';
import {
    ClassKinds,
    MethodKinds,
    IClass,
    IField,
    IMethod,
    IConstructor,
    IParameter,
    TypeReference,
    IGenericClass
} from '../IClass';

type JsonClassKind = 'class' | 'component' | 'extension' | 'cutscene';
type JsonMethodKind = 'function' | 'coroutine';

interface JsonClassDefinition {
    kind: JsonClassKind;
    name: string;
    description: string;
    typeParameters?: string[];
    extends?: string[];
    hidden?: boolean;
    instanceFields?: JsonField[];
    instanceMethods?: JsonMethod[];
    staticFields?: JsonField[];
    staticMethods?: JsonMethod[];
    constructors?: JsonConstructor[];
}

interface JsonTypeReference {
    name: string;
    typeArguments?: JsonTypeReference[];
}

interface JsonField {
    label: string;
    type: JsonTypeReference;
    description: string;
    readonly?: boolean;
    private?: boolean;
}

interface JsonParameter {
    name: string;
    type: JsonTypeReference;
    description: string;
    isOptional?: boolean;
    isVariadic?: boolean;
}

interface JsonMethod {
    label: string;
    returnType: JsonTypeReference;
    description: string;
    parameters?: JsonParameter[];
    kind: JsonMethodKind;
}

interface JsonConstructor {
    parameters?: JsonParameter[];
    description: string;
}

export class JsonClassLoader {
    private classMap: Map<string, IClass> = new Map();
    private genericClassMap: Map<string, IGenericClass> = new Map();
    private unresolvedExtends: Map<string, string[]> = new Map();
    private jsonDefinitions: Map<string, JsonClassDefinition> = new Map();
    private genericInstances: Map<string, IClass> = new Map();

    public loadFromDirectory(
        jsonDir: string,
        baseClasses?: Map<string, IClass>
    ): Map<string, IClass> {
        this.classMap.clear();
        this.genericClassMap.clear();
        this.unresolvedExtends.clear();
        this.jsonDefinitions.clear();
        this.genericInstances.clear();

        if (baseClasses) {
            for (const [name, cls] of baseClasses) {
                this.classMap.set(name, cls);
            }
        }

        if (!fs.existsSync(jsonDir)) {
            throw new Error(`Directory does not exist: ${jsonDir}`);
        }

        const files = fs.readdirSync(jsonDir);
        const jsonFiles = files.filter(f => f.endsWith('.json'));

        for (const file of jsonFiles) {
            const filePath = path.join(jsonDir, file);
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const jsonDef: JsonClassDefinition = JSON.parse(content);
                this.jsonDefinitions.set(jsonDef.name, jsonDef);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.warn(`Failed to parse JSON file ${filePath}: ${errorMessage}`);
                continue;
            }
        }

        for (const [name, jsonDef] of this.jsonDefinitions) {
            try {
                const cls = this.convertJsonToClass(jsonDef);
                this.classMap.set(name, cls);

                if (jsonDef.typeParameters && jsonDef.typeParameters.length > 0) {
                    this.genericClassMap.set(name, cls as IGenericClass);
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.warn(`Failed to convert class ${name}: ${errorMessage}`);
                continue;
            }
        }

        this.resolveExtends();

        return this.classMap;
    }

    public getGenericClasses(): Map<string, IGenericClass> {
        return this.genericClassMap;
    }

    private convertJsonToClass(jsonDef: JsonClassDefinition): IClass {
        const kind = this.parseClassKind(jsonDef.kind);
        const cls: IClass = {
            kind,
            name: jsonDef.name,
            description: jsonDef.description,
            instanceFields: [],
            instanceMethods: [],
            staticFields: [],
            staticMethods: []
        };

        if (jsonDef.hidden) {
            cls.hidden = true;
        }

        if (jsonDef.instanceFields) {
            cls.instanceFields = jsonDef.instanceFields.map(f => this.convertField(f, cls));
        }
        if (jsonDef.staticFields) {
            cls.staticFields = jsonDef.staticFields.map(f => this.convertField(f, cls));
        }

        if (jsonDef.instanceMethods) {
            cls.instanceMethods = jsonDef.instanceMethods.map(m => this.convertMethod(m, cls));
        }
        if (jsonDef.staticMethods) {
            cls.staticMethods = jsonDef.staticMethods.map(m => this.convertMethod(m, cls));
        }

        if (jsonDef.constructors) {
            cls.constructors = jsonDef.constructors.map(c => this.convertConstructor(c, cls));
        }

        if (jsonDef.extends && jsonDef.extends.length > 0) {
            this.unresolvedExtends.set(jsonDef.name, jsonDef.extends);
        }

        if (jsonDef.typeParameters && jsonDef.typeParameters.length > 0) {
            (cls as IGenericClass).typeParameters = jsonDef.typeParameters;
            (cls as IGenericClass).instantiate = (typeArgs: TypeReference[]) => {
                return this.instantiateGeneric(cls as IGenericClass, jsonDef, typeArgs);
            };
        }

        return cls;
    }

    private convertField(jsonField: JsonField, parent: IClass): IField {
        return {
            parent,
            label: jsonField.label,
            type: this.convertTypeReference(jsonField.type),
            description: jsonField.description,
            readonly: !!jsonField.readonly,
            private: !!jsonField.private
        };
    }

    private convertMethod(jsonMethod: JsonMethod, parent: IClass): IMethod {
        return {
            parent,
            label: jsonMethod.label,
            returnType: this.convertTypeReference(jsonMethod.returnType),
            description: jsonMethod.description,
            parameters: jsonMethod.parameters?.map(p => this.convertParameter(p)) ?? [],
            kind: this.parseMethodKind(jsonMethod.kind)
        };
    }

    private convertConstructor(jsonCtor: JsonConstructor, parent: IClass): IConstructor {
        return {
            parent,
            parameters: jsonCtor.parameters?.map(p => this.convertParameter(p)) ?? [],
            description: jsonCtor.description
        };
    }

    private convertParameter(jsonParam: JsonParameter): IParameter {
        return {
            name: jsonParam.name,
            type: this.convertTypeReference(jsonParam.type),
            description: jsonParam.description,
            isOptional: !!jsonParam.isOptional,
            isVariadic: !!jsonParam.isVariadic
        };
    }

    private convertTypeReference(jsonType: JsonTypeReference): TypeReference {
        return {
            name: jsonType.name,
            typeArguments: jsonType.typeArguments
                ? jsonType.typeArguments.map(t => this.convertTypeReference(t))
                : []
        };
    }

    private parseClassKind(kind: JsonClassKind): ClassKinds {
        switch (kind) {
            case 'class':
                return ClassKinds.CLASS;
            case 'component':
                return ClassKinds.COMPONENT;
            case 'extension':
                return ClassKinds.EXTENSION;
            case 'cutscene':
                return ClassKinds.CUTSCENE;
            default:
                throw new Error(`Unknown class kind: ${kind}`);
        }
    }

    private parseMethodKind(kind: JsonMethodKind): MethodKinds {
        switch (kind) {
            case 'function':
                return MethodKinds.FUNCTION;
            case 'coroutine':
                return MethodKinds.COROUTINE;
            default:
                throw new Error(`Unknown method kind: ${kind}`);
        }
    }

    private resolveExtends(): void {
        for (const [className, extendsNames] of this.unresolvedExtends) {
            const cls = this.classMap.get(className);
            if (!cls) {
                console.warn(`Class ${className} not found when resolving extends, skipping`);
                continue;
            }

            const baseClasses: IClass[] = [];
            for (const baseName of extendsNames) {
                const baseClass = this.classMap.get(baseName);
                if (!baseClass) {
                    console.warn(`Base class ${baseName} not found for class ${className}, skipping this base class`);
                    continue;
                }
                baseClasses.push(baseClass);
            }

            if (baseClasses.length > 0) {
                cls.extends = baseClasses;
            } else {
                console.warn(`No valid base classes found for class ${className}`);
            }
        }
    }

    private getGenericInstanceKey(genericName: string, typeArgs: TypeReference[]): string {
        return `${genericName}<${typeArgs.map(t => t.name).join(',')}>`;
    }

    private instantiateGeneric(
        genericClass: IGenericClass,
        jsonDef: JsonClassDefinition,
        typeArgs: TypeReference[]
    ): IClass {
        if (!jsonDef.typeParameters) {
            throw new Error(`Class ${genericClass.name} is not generic`);
        }

        if (typeArgs.length !== jsonDef.typeParameters.length) {
            throw new Error(
                `Type argument count mismatch: expected ${jsonDef.typeParameters.length}, got ${typeArgs.length}`
            );
        }

        const key = this.getGenericInstanceKey(genericClass.name, typeArgs);
        const cached = this.genericInstances.get(key);
        if (cached) {
            return cached;
        }

        const inst: IClass = {
            kind: genericClass.kind,
            name: `${genericClass.name}<${typeArgs.map(t => t.name).join(',')}>`,
            description: genericClass.description,
            instanceFields: [],
            instanceMethods: [],
            staticFields: [],
            staticMethods: []
        };

        inst.instanceFields = genericClass.instanceFields.map(f => ({
            ...f,
            parent: inst,
            type: this.substituteType(f.type, jsonDef.typeParameters!, typeArgs)
        }));

        inst.staticFields = genericClass.staticFields.map(f => ({
            ...f,
            parent: inst,
            type: this.substituteType(f.type, jsonDef.typeParameters!, typeArgs)
        }));

        inst.instanceMethods = genericClass.instanceMethods.map(m => ({
            ...m,
            parent: inst,
            returnType: this.substituteType(m.returnType, jsonDef.typeParameters!, typeArgs),
            parameters: m.parameters.map(p => ({
                ...p,
                type: this.substituteType(p.type, jsonDef.typeParameters!, typeArgs)
            }))
        }));

        inst.staticMethods = genericClass.staticMethods.map(m => ({
            ...m,
            parent: inst,
            returnType: this.substituteType(m.returnType, jsonDef.typeParameters!, typeArgs),
            parameters: m.parameters.map(p => ({
                ...p,
                type: this.substituteType(p.type, jsonDef.typeParameters!, typeArgs)
            }))
        }));

        if (genericClass.constructors) {
            inst.constructors = genericClass.constructors.map(c => ({
                ...c,
                parent: inst
            }));
        }

        if (genericClass.extends) {
            inst.extends = genericClass.extends;
        }

        this.genericInstances.set(key, inst);
        return inst;
    }

    private substituteType(
        typeRef: TypeReference,
        typeParameters: string[],
        typeArgs: TypeReference[]
    ): TypeReference {
        const paramIndex = typeParameters.indexOf(typeRef.name);
        if (paramIndex !== -1 && paramIndex < typeArgs.length) {
            return typeArgs[paramIndex];
        }

        return {
            ...typeRef,
            typeArguments: typeRef.typeArguments.map(arg =>
                this.substituteType(arg, typeParameters, typeArgs)
            )
        };
    }
}

