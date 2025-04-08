import Handler, { NextFunction } from './Handler';
import Job, { job, jobStatus } from '../models/jobModel';
import { intro, outro, text, select, spinner } from '@clack/prompts';
import chalk from 'chalk';
import showTable from '../services/services';

const jobModel = new Job();

export default class FilterJobHandler implements Handler {
  constructor() {}
  async handle(data: any, next: NextFunction) {
    if (data?.action === 'filter') {
      const filterStatus = await select({
        message: 'Filter by status: ',
        options: [
          { value: 'In Progress', label: 'In Progress' },
          { value: 'Rejected', label: 'Rejected' },
          { value: 'Assessment', label: 'Assessment' },
          { value: 'Phone Call', label: 'Phone Call' },
          { value: 'Meeting', label: 'Meeting' },
          { value: 'Offer', label: 'Job Offer' },
        ],
      });
      const fromDate = await text({
        message: 'From date (YYYY-MM-DD): ',
        placeholder: '2023-01-01',
      });
      const toDate = await text({
        message: 'To date (YYYY-MM-DD): ',
        placeholder: '2023-12-31',
      });
      const s = spinner();
      s.start('Filtering jobs...');
      const filteredJobs = await jobModel.filter({
        status: filterStatus as jobStatus,
        from: fromDate ? new Date(fromDate as string) : undefined,
        to: toDate ? new Date(toDate as string) : undefined,
      });
      s.stop('Jobs filtered successfully!');
      showTable(filteredJobs as job[]);
    }
    return data;
  }
}
