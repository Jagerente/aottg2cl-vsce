import { ClassKinds, IClass, IConstructor } from './IClass';
import { ListClassInstance } from './ListClass';

export class RangeClass implements IClass {
    public kind = ClassKinds.CLASS;
    public name = 'Range';
    public description = 'Inherits from List. Allows you to create lists of integers for convenient iteration, particularly in for loops.';

    public extends: IClass[] = [ListClassInstance.instantiate([{name: 'int', typeArguments: []}])];

    public constructors: IConstructor[] = [
        {
            parent: this,
            description: "Create a sequence of integers with Start, End (exclusive), and Step values.",
            parameters: [
                { name: "start", type: {name: 'int', typeArguments: []}, description: "The starting value of the range." },
                { name: "end", type: {name: 'int', typeArguments: []}, description: "The exclusive end value of the range." },
                { name: "step", type: {name: 'int', typeArguments: []}, description: "The step value between elements in the range." }
            ]
        }
    ];

    public staticFields = [];
    public staticMethods = [];
    public instanceFields = [];
    public instanceMethods = [];
}

export const RangeClassInstance: RangeClass = new RangeClass();
