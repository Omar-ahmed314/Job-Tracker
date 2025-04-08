import Handler from './Handler';
import Job, { job, jobStatus } from '../models/jobModel';
import { intro, outro, text, select, spinner } from '@clack/prompts';
import chalk from 'chalk';

const jobModel = new Job();

export default class ViewJobHandler implements Handler {
  constructor() {}
  async handle(data: any) {
    if (data?.action === 'view') {
      const jobID = await text({
        message: 'Enter job ID: ',
        placeholder: '60d5f484f8d3c4b8b8e0c1a2',
      });
      //   spinner().start('Fetching job...');
      const job = await jobModel.showById(jobID as string);
      //   spinner().stop('Job fetched successfully!');
      if (job) {
        console.table(
          [job],
          [
            '_id',
            'jobTitle',
            'company',
            'status',
            'applyDate',
            'jobURL',
            'details',
          ]
        );
      } else {
        console.log(chalk.red('Job not found!'));
      }
    }
    return data;
  }
}
