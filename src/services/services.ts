import chalk from 'chalk';
import { job } from '../models/jobModel';

/**
 * Displays a table of jobs in the console in form of table.
 * @param {job[] | undefined} jobs - The array of job objects to display.
 */
function showTable(jobs: job[] | undefined, categoryList: string[]) {
  jobs?.forEach((job) => {
    job._id = job._id?.toString();
    job.applyDate = job.applyDate?.toDateString() as unknown as Date;
  });
  if (jobs?.length) {
    console.table(jobs, categoryList);
  } else {
    console.log(chalk.red('No jobs found!'));
  }
}

export default showTable;
