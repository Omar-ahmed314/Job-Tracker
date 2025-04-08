import Handler from './Handler';
import Job, { job } from '../models/jobModel';
import { text, select, spinner } from '@clack/prompts';
import chalk from 'chalk';

const jobModel = new Job();

export default class AddJobHandler implements Handler {
  constructor() {}
  async handle(data: any) {
    if (data?.action == 'add') {
      const jobTitle = await text({
        message: 'Job Title: ',
        placeholder: 'Frontend Developer',
      });
      const company = await text({
        message: 'Company name: ',
        placeholder: 'Abo Cartona',
      });
      const status = await select({
        message: 'Job Status: ',
        options: [
          { value: 'In Progress', label: 'In Progress', hint: 'Default' },
          { value: 'Rejected', label: 'Rejected' },
          { value: 'Assessment', label: 'Assessment' },
          { value: 'Phone Call', label: 'Phone Call' },
          { value: 'Meeting', label: 'Meeting' },
          { value: 'Offer', label: 'Job Offer' },
        ],
      });
      const applyDate = await text({
        message: 'Apply Date: ',
        placeholder: 'yyyy-mm-dd',
      });
      const jobURL = await text({
        message: 'Job URL: ',
        placeholder: 'https://example.com/job',
      });
      const details = await text({
        message: 'Job Details: ',
        placeholder: 'Details about the job',
      });

      const jobData = {
        jobTitle,
        company,
        status,
        applyDate: new Date(applyDate as string),
        jobURL,
        details,
      };
      const s = spinner();
      s.start('Inserting job...');
      const insertedJob = await jobModel.insert(jobData as job);
      s.stop('Job inserted successfully!');
      console.log(chalk.green('Job inserted successfully!'));
    }
    return data;
  }
}
