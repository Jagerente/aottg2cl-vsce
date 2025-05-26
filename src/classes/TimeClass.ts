import { ClassKinds, IClass, IField, IMethod } from './IClass';

export class TimeClass implements IClass {
    public kind = ClassKinds.EXTENSION;
    public name = 'Time';
    public description = 'Time functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [
        { parent: this, label: 'TickTime', type: 'float', description: 'Time between each tick (0.02 seconds)', readonly: true },
        { parent: this, label: 'GameTime', type: 'float', description: 'Time since start of the round.', readonly: true },
        { parent: this, label: 'FrameTime', type: 'float', description: 'Time between each frame.', readonly: true },
        { parent: this, label: 'TimeScale', type: 'float', description: 'Changes the timescale of the game.', readonly: false }
    ];

    public staticMethods: IMethod[] = [];
}

export const TimeClassInstance: TimeClass = new TimeClass();
