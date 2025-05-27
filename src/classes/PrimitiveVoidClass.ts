import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class PrimitiveVoidClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'void';
    public description = 'Primitive type.';
    public hidden = true;

    public instanceFields: IField[] = [];
    public instanceMethods: IMethod[] = [];
    public staticFields: IField[] = [];
    public staticMethods: IMethod[] = [];
}

export const PrimitiveVoidClassInstance: PrimitiveVoidClass = new PrimitiveVoidClass();
