import Handler from '../handlers/Handler';

/**
 * TaskSequence class for managing a sequence of tasks
 * @class TaskSequence
 * @description This class manages a sequence of tasks and executes them in order.
 * It allows adding tasks to the sequence and running them one by one.
 * The tasks are expected to be of type Handler, which is an interface that defines a handle method.
 */
export default class TaskSequence {
  sequence: Handler[];
  isProcessRunning: boolean = true;
  taskIndex: number = 0;

  constructor() {
    this.sequence = new Array();
    this._next = this._next.bind(this);
  }

  /**
   * _next function to be called when a task is completed
   * or no further processing is needed.
   * This function stops the process if a message is provided.
   * @private
   * @param message - optional message to stop the process
   */
  _next(message: any): void {
    if (message) this.isProcessRunning = false;
  }

  /**
   * addTask function to add a task to the sequence.
   * @param task - The task to be added to the sequence.
   */
  addTask(task: Handler): void {
    this.sequence.push(task);
  }

  /**
   * run function to start processing the tasks in the sequence.
   * It will continue processing until there are no more tasks or the process is stopped.
   * @returns {Promise<void>}
   */
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
