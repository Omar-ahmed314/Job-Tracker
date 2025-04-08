import Handler from './Handler';
import Job from '../models/jobModel';
import { spinner } from '@clack/prompts';
import showTable from '../services/services';

const jobModel = new Job();

export default class ListJobsHandler implements Handler {
  constructor() {}
  async handle(data: any) {
    if (data?.action === 'list') {
      const s = spinner();
      s.start('Fetching jobs...');
      const jobs = await jobModel.index();
      s.stop('Jobs fetched successfully!');
      showTable(jobs);
    }
    return data;
  }
}
