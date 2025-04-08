import Handler, { NextFunction } from './Handler';
import Job, { job, jobStatus } from '../models/jobModel';
import { intro, outro, text, select, spinner } from '@clack/prompts';
import chalk from 'chalk';

const jobModel = new Job();

export default class UpdateJobsHandler implements Handler {
  constructor() {}
  async handle(data: any, next: NextFunction) {
    if (data?.action === 'update') {
      const updateJobID = await text({
        message: 'Enter job ID to update: ',
        placeholder: '60d5f484f8d3c4b8b8e0c1a2',
      });
      const updateJobStatus = await select({
        message: 'Enter New status: ',
        options: [
          { value: 'In Progress', label: 'In Progress' },
          { value: 'Rejected', label: 'Rejected' },
          { value: 'Assessment', label: 'Assessment' },
          { value: 'Phone Call', label: 'Phone Call' },
          { value: 'Meeting', label: 'Meeting' },
          { value: 'Offer', label: 'Job Offer' },
        ],
      });
      const s = spinner();
      s.start('Updating job...');
      const updatedJob = await jobModel.update(
        updateJobID as string,
        updateJobStatus as jobStatus
      );
      s.stop('Job updated successfully!');
      if (updatedJob) {
        console.log(chalk.green('Job updated successfully!'));
      } else {
        console.log(chalk.red('Job not found!'));
      }
    }
    return data;
  }
}
