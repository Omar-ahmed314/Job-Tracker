import Handler from '../handlers/Handler';

export default class TaskSequence {
  sequence: Handler[];

  constructor() {
    this.sequence = new Array();
  }

  addTask(task: Handler): void {
    this.sequence.push(task);
  }

  async run(): Promise<void> {
    let tempData = {};
    for (let task of this.sequence) {
      tempData = await task.handle(tempData);
    }
  }
}
