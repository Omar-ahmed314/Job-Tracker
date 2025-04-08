"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskSequence {
    sequence;
    constructor() {
        this.sequence = new Array();
    }
    addTask(task) {
        this.sequence.push(task);
    }
    async run() {
        let tempData = {};
        for (let task of this.sequence) {
            tempData = await task.handle(tempData);
        }
    }
}
exports.default = TaskSequence;
