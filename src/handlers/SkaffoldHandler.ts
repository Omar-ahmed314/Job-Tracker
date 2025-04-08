import Handler from './Handler';
import Job, { job, jobStatus } from '../models/jobModel';
import { intro, outro, text, select, spinner } from '@clack/prompts';
import chalk from 'chalk';

export default class SkaffoldHandler implements Handler {
  constructor() {}
  async handle(data: any) {
    const action = await select({
      message: 'What would you like to do?',
      options: [
        { value: 'add', label: 'Insert a new job' },
        { value: 'list', label: 'List all jobs' },
        { value: 'view', label: 'View job by ID' },
        { value: 'filter', label: 'Filter jobs' },
        { value: 'delete', label: 'Delete a job' },
        { value: 'update', label: 'Update a job' },
      ],
    });
    data.action = action;
    return data;
  }
}
