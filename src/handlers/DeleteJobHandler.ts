import Handler, { NextFunction } from './Handler';
import Job from '../models/jobModel';
import { text, spinner } from '@clack/prompts';
import chalk from 'chalk';

const jobModel = new Job();

/**
 * DeleteJobHandler class to handle the delete job action.
 * It prompts the user for a job ID and deletes the job.
 */
export default class DeleteJobHandler implements Handler {
  constructor() {}
  async handle(data: any, next: NextFunction) {
    if (data?.action === 'delete') {
      const deleteJobID = await text({
        message: 'Enter job ID to delete: ',
        placeholder: '60d5f484f8d3c4b8b8e0c1a2',
      });
      const s = spinner();
      s.start('Deleting job...');
      const deletedJob = await jobModel.delete(deleteJobID as string);
      s.stop('Job deleted successfully!');
      if (deletedJob) {
        console.log(chalk.green('Job deleted successfully!'));
      } else {
        console.log(chalk.red('Job not found!'));
      }
    }
    return data;
  }
}
