#!/usr/bin/env node
import Job, { job, jobStatus } from './models/jobModel';
import { intro, outro, text, select, spinner } from '@clack/prompts';
import chalk from 'chalk';

const jobModel = new Job();

intro(chalk.bold.green('Welcome to the Job Tracker CLI!'));

async function main() {
  const action = await select({
    message: 'What would you like to do?',
    options: [
      { value: 'add', label: 'Insert a new job' },
      { value: 'list', label: 'List all jobs' },
      { value: 'view', label: 'View job by ID' },
      { value: 'filter', label: 'Filter jobs' },
      { value: 'delete', label: 'Delete a job' },
      { value: 'update', label: 'Update a job' },
    ],
  });

  switch (action) {
    case 'add':
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
      //   spinner().start('Inserting job...');
      const insertedJob = await jobModel.insert(jobData as job);
      //   spinner().stop('Job inserted successfully!');
      break;
    case 'list':
      //   spinner().start('Fetching jobs...');
      const jobs = await jobModel.index();
      //   spinner().stop('Jobs fetched successfully!');
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
      break;

    case 'view':
      const jobID = await text({
        message: 'Enter job ID: ',
        placeholder: '60d5f484f8d3c4b8b8e0c1a2',
      });
      //   spinner().start('Fetching job...');
      const job = await jobModel.showById(jobID as string);
      //   spinner().stop('Job fetched successfully!');
      if (job) {
        console.table(
          [job],
          [
            '_id',
            'jobTitle',
            'company',
            'status',
            'applyDate',
            'jobURL',
            'details',
          ]
        );
      } else {
        console.log(chalk.red('Job not found!'));
      }
      break;

    case 'filter':
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
      //   spinner().start('Filtering jobs...');
      const filteredJobs = await jobModel.filter({
        status: filterStatus as jobStatus,
        from: fromDate ? new Date(fromDate as string) : undefined,
        to: toDate ? new Date(toDate as string) : undefined,
      });
      //   spinner().stop('Jobs filtered successfully!');
      if (filteredJobs?.length) {
        console.table(filteredJobs, [
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
      break;
    case 'delete':
      const deleteJobID = await text({
        message: 'Enter job ID to delete: ',
        placeholder: '60d5f484f8d3c4b8b8e0c1a2',
      });
      //   spinner().start('Deleting job...');
      const deletedJob = await jobModel.delete(deleteJobID as string);
      //   spinner().stop('Job deleted successfully!');
      if (deletedJob) {
        console.log(chalk.green('Job deleted successfully!'));
      } else {
        console.log(chalk.red('Job not found!'));
      }
      break;
    case 'update':
      const updateJobID = await text({
        message: 'Enter job ID to update: ',
        placeholder: '60d5f484f8d3c4b8b8e0c1a2',
      });
      const updateJobStatus = await select({
        message: 'Enter New status: ',
        options: [
          { value: 'In Progress', label: 'In Progress' },
          { value: 'Rejected', label: 'Rejected' },
          { value: 'Assessment', label: 'Assessment' },
          { value: 'Phone Call', label: 'Phone Call' },
          { value: 'Meeting', label: 'Meeting' },
          { value: 'Offer', label: 'Job Offer' },
        ],
      });
      //   spinner().start('Updating job...');
      const updatedJob = await jobModel.update(
        updateJobID as string,
        updateJobStatus as jobStatus
      );
      //   spinner().stop('Job updated successfully!');
      if (updatedJob) {
        console.log(chalk.green('Job updated successfully!'));
      } else {
        console.log(chalk.red('Job not found!'));
      }
      break;
  }
  outro(chalk.bold.green('Thank you for using the Job Tracker CLI!'));
  process.exit(0);
}

main();
