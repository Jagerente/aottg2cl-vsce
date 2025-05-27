import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class PrimitiveIntClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'int';
    public description = 'Primitive type.';
    public hidden = true;

    public instanceFields: IField[] = [];
    public instanceMethods: IMethod[] = [];
    public staticFields: IField[] = [];
    public staticMethods: IMethod[] = [];
}

export const PrimitiveIntClassInstance: PrimitiveIntClass = new PrimitiveIntClass();
