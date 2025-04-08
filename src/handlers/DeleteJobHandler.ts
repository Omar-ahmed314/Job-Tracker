import Handler from './Handler';
import Job, { job, jobStatus } from '../models/jobModel';
import { intro, outro, text, select, spinner } from '@clack/prompts';
import chalk from 'chalk';

const jobModel = new Job();

export default class DeleteJobHandler implements Handler {
  constructor() {}
  async handle(data: any) {
    if (data?.action === 'delete') {
      const deleteJobID = await text({
        message: 'Enter job ID to delete: ',
        placeholder: '60d5f484f8d3c4b8b8e0c1a2',
      });
      const deletedJob = await jobModel.delete(deleteJobID as string);
      if (deletedJob) {
        console.log(chalk.green('Job deleted successfully!'));
      } else {
        console.log(chalk.red('Job not found!'));
      }
    }
    return data;
  }
}
