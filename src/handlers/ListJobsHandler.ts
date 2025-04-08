import Handler from './Handler';
import Job from '../models/jobModel';

const jobModel = new Job();

export default class ListJobsHandler implements Handler {
  constructor() {}
  async handle(data: any) {
    if (data?.action === 'list') {
      const jobs = await jobModel.index();
      if (jobs?.length)
        console.table(jobs, [
          '_id',
          'jobTitle',
          'company',
          'status',
          'applyDate',
          'jobURL',
          'details',
        ]);
    }
    return data;
  }
}
