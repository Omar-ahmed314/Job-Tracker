"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskSequence {
    sequence;
    isProcessRunning = true;
    taskIndex = 0;
    constructor() {
        this.sequence = new Array();
        this._next = this._next.bind(this);
    }
    _next(message) {
        if (message)
            this.isProcessRunning = false;
    }
    addTask(task) {
        this.sequence.push(task);
    }
    async run() {
        let tempData = {};
        while (this.isProcessRunning && this.sequence.length > 0) {
            tempData = await this.sequence[this.taskIndex].handle(tempData, this._next);
            this.taskIndex = ++this.taskIndex % this.sequence.length;
        }
    }
}
exports.default = TaskSequence;
