import { IClass, IField, IMethod } from './IClass';

export class TimeClass implements IClass {
    public name = 'Time';
    public description = 'Time functions.';

    public instanceFields: IField[] = [];
    
    public instanceMethods: IMethod[] = [];
    
    public staticFields: IField[] = [
        { label: 'TickTime', type: 'float', description: 'Time between each tick (0.02 seconds)', readonly: true },
        { label: 'GameTime', type: 'float', description: 'Time since start of the round.', readonly: true },
        { label: 'FrameTime', type: 'float', description: 'Time between each frame.', readonly: true },
        { label: 'TimeScale', type: 'float', description: 'Changes the timescale of the game.', readonly: false }
    ];

    public staticMethods: IMethod[] = [];
}
