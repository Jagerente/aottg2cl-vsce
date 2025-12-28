import * as path from 'path';
import * as vscode from 'vscode';
import {IClass, IGenericClass} from "./IClass";
import {PrimitiveBoolClassInstance} from "./PrimitiveBoolClass";
import {PrimitiveFloatClassInstance} from "./PrimitiveFloatClass";
import {PrimitiveIntClassInstance} from "./PrimitiveIntClass";
import {PrimitiveStringClassInstance} from "./PrimitiveStringClass";
import {PrimitiveVoidClassInstance} from "./PrimitiveVoidClass";
import {BaseComponentClassInstance} from "./BaseComponentsClass";
import {JsonClassLoader} from "./json/JsonClassLoader";
import { AbstractClassInstance } from './AbstractClass';
import { PrimitiveNullClassInstance } from './PrimitiveNullClass';

export const BaseClassesMap: Map<string, IClass> = new Map([
    [AbstractClassInstance.name, AbstractClassInstance],
    [PrimitiveNullClassInstance.name, PrimitiveNullClassInstance],
    [PrimitiveIntClassInstance.name, PrimitiveIntClassInstance],
    [PrimitiveStringClassInstance.name, PrimitiveStringClassInstance],
    [PrimitiveFloatClassInstance.name, PrimitiveFloatClassInstance],
    [PrimitiveBoolClassInstance.name, PrimitiveBoolClassInstance],
    [PrimitiveVoidClassInstance.name, PrimitiveVoidClassInstance],
    [BaseComponentClassInstance.name, BaseComponentClassInstance],
]);

export interface AvailableClassesResult {
    classes: Map<string, IClass>;
    genericClasses: Map<string, IGenericClass>;
}

export function buildAvailableClasses(
    context: vscode.ExtensionContext,
): AvailableClassesResult {
    const jsonDir = path.join(
        context.extensionPath,
        'resources',
        'classes',
    );

    const loader = new JsonClassLoader();
    
    try {
        const allClasses = loader.loadFromDirectory(jsonDir, BaseClassesMap);
        
        const jsonGeneric = loader.getGenericClasses();

        console.log('allClasses', allClasses);
        console.log('jsonGeneric', jsonGeneric);

        return {
            classes: allClasses,
            genericClasses: jsonGeneric,
        };
    } catch (error) {
        console.warn(`Failed to load JSON classes from ${jsonDir}:`, error);
        return {
            classes: BaseClassesMap,
            genericClasses: new Map(),
        };
    }
}
