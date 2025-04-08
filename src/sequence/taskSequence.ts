import Handler, { NextFunction } from '../handlers/Handler';

export default class TaskSequence {
  sequence: Handler[];
  isProcessRunning: boolean = true;
  taskIndex: number = 0;

  constructor() {
    this.sequence = new Array();
    this._next = this._next.bind(this);
  }

  _next(message: any): void {
    if (message) this.isProcessRunning = false;
  }

  addTask(task: Handler): void {
    this.sequence.push(task);
  }

  async run(): Promise<void> {
    let tempData = {};
    while (this.isProcessRunning && this.sequence.length > 0) {
      tempData = await this.sequence[this.taskIndex].handle(
        tempData,
        this._next
      );
      this.taskIndex = ++this.taskIndex % this.sequence.length;
    }
  }
}
