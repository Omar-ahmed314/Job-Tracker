import Handler, { NextFunction } from './Handler';
import Job from '../models/jobModel';
import { spinner } from '@clack/prompts';
import showTable from '../services/services';

const jobModel = new Job();

/**
 * ListJobsHandler class to handle the list job action.
 * It fetches and displays all jobs.
 */
export default class ListJobsHandler implements Handler {
  constructor() {}
  async handle(data: any, next: NextFunction) {
    if (data?.action === 'list') {
      const s = spinner();
      s.start('Fetching jobs...');
      const jobs = await jobModel.index();
      s.stop('Jobs fetched successfully!');
      showTable(jobs, ['_id', 'jobTitle', 'company', 'status', 'applyDate']);
    }
    return data;
  }
}
