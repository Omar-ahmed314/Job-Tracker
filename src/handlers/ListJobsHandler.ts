import Handler from './Handler';
import Job from '../models/jobModel';

const jobModel = new Job();

export default class ListJobsHandler implements Handler {
  constructor() {}
  async handle(data: any) {
    if (data?.action === 'list') {
      const jobs = await jobModel.index();
      jobs?.forEach((job) => {
        job._id = job._id?.toString();
        job.applyDate = job.applyDate?.toDateString() as unknown as Date;
      });
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
