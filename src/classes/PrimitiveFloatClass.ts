import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class PrimitiveFloatClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'float';
    public description = 'Primitive type.';
    public hidden = true;

    public instanceFields: IField[] = [];
    public instanceMethods: IMethod[] = [];
    public staticFields: IField[] = [];
    public staticMethods: IMethod[] = [];
}

export const PrimitiveFloatClassInstance: PrimitiveFloatClass = new PrimitiveFloatClass();
