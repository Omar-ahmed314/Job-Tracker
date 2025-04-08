import Handler, { NextFunction } from './Handler';
import Job, { job, jobStatus } from '../models/jobModel';
import { intro, outro, text, select, spinner } from '@clack/prompts';
import chalk from 'chalk';
import showTable from '../services/services';

const jobModel = new Job();

export default class ViewJobHandler implements Handler {
  constructor() {}
  async handle(data: any, next: NextFunction) {
    if (data?.action === 'view') {
      const jobID = await text({
        message: 'Enter job ID: ',
        placeholder: '60d5f484f8d3c4b8b8e0c1a2',
      });

      const s = spinner();
      s.start('Fetching job...');
      const job = await jobModel.showById(jobID as string);
      s.stop('Job fetched successfully!');
      showTable([job] as job[]);
    }
    return data;
  }
}
