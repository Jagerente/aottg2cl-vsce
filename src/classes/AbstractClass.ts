import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class AbstractClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'class';
    public description = 'Abstract class.';
    public hidden = true;

    public instanceFields: IField[] = [];
    public instanceMethods: IMethod[] = [];
    public staticFields: IField[] = [];
    public staticMethods: IMethod[] = [];
}

export const AbstractClassInstance: AbstractClass = new AbstractClass();
