import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class PrimitiveNullClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'null';
    public description = 'Primitive type.';
    public hidden = true;

    public instanceFields: IField[] = [];
    public instanceMethods: IMethod[] = [];
    public staticFields: IField[] = [];
    public staticMethods: IMethod[] = [];
}

export const PrimitiveNullClassInstance: PrimitiveNullClass = new PrimitiveNullClass();
