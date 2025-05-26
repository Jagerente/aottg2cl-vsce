import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class PrimitiveStringClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'string';
    public description = 'Primitive type.';
    public hidden = true;

    public instanceFields: IField[] = [];
    public instanceMethods: IMethod[] = [];
    public staticFields: IField[] = [];
    public staticMethods: IMethod[] = [];
}

export const PrimitiveStringClassInstance: PrimitiveStringClass = new PrimitiveStringClass();
