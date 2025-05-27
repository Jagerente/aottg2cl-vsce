import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class PrimitiveBoolClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'bool';
    public description = 'Primitive type.';
    public hidden = true;

    public instanceFields: IField[] = [];
    public instanceMethods: IMethod[] = [];
    public staticFields: IField[] = [];
    public staticMethods: IMethod[] = [];
}

export const PrimitiveBoolClassInstance: PrimitiveBoolClass = new PrimitiveBoolClass();
