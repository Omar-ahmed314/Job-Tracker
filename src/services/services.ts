import chalk from 'chalk';
import { job } from '../models/jobModel';

function showTable(jobs: job[] | undefined) {
  jobs?.forEach((job) => {
    job._id = job._id?.toString();
    job.applyDate = job.applyDate?.toDateString() as unknown as Date;
  });
  if (jobs?.length) {
    console.table(jobs, [
      '_id',
      'jobTitle',
      'company',
      'status',
      'applyDate',
      'jobURL',
      'details',
    ]);
  } else {
    console.log(chalk.red('No jobs found!'));
  }
}

export default showTable;
