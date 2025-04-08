import Handler, { NextFunction } from './Handler';
import { select } from '@clack/prompts';

/**
 * SkaffoldHandler class to handle the skaffold action.
 * It prompts the user for an action to perform on the skaffold jobs.
 */
export default class SkaffoldHandler implements Handler {
  constructor() {}
  async handle(data: any, next: NextFunction) {
    const action = await select({
      message: 'What would you like to do?',
      options: [
        { value: 'add', label: 'Insert a new job' },
        { value: 'list', label: 'List all jobs' },
        { value: 'view', label: 'View job by ID' },
        { value: 'filter', label: 'Filter jobs' },
        { value: 'delete', label: 'Delete a job' },
        { value: 'update', label: 'Update a job' },
        { value: 'exit', label: 'Exit' },
      ],
    });
    if (action === 'exit') next('exit');
    data.action = action;
    return data;
  }
}
