import Handler, { NextFunction } from './Handler';
import Job, { job } from '../models/jobModel';
import { text, spinner } from '@clack/prompts';
import showTable from '../services/services';

const jobModel = new Job();

/**
 * ViewJobHandler class to handle the view job action.
 * It prompts the user for a job ID and displays the job details.
 */
export default class ViewJobHandler implements Handler {
  constructor() {}
  /**
   * Handles the view job action.
   * @param data - The data object containing the action.
   * @param next - The next function to call in the middleware chain.
   * @returns The updated data object.
   */
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
      showTable([job] as job[], [
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
