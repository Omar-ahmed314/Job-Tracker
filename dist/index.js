#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SkaffoldHandler_1 = __importDefault(require("./handlers/SkaffoldHandler"));
const taskSequence_1 = __importDefault(require("./sequence/taskSequence"));
const AddJobHandler_1 = __importDefault(require("./handlers/AddJobHandler"));
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const ListJobsHandler_1 = __importDefault(require("./handlers/ListJobsHandler"));
const DeleteJobHandler_1 = __importDefault(require("./handlers/DeleteJobHandler"));
const UpdateJobHandler_1 = __importDefault(require("./handlers/UpdateJobHandler"));
const FilterJobHandler_1 = __importDefault(require("./handlers/FilterJobHandler"));
const ViewJobHandler_1 = __importDefault(require("./handlers/ViewJobHandler"));
const taskSequence = new taskSequence_1.default();
const skaffoldHandler = new SkaffoldHandler_1.default();
const addJobHandler = new AddJobHandler_1.default();
const listJobHandler = new ListJobsHandler_1.default();
const deleteJobHandler = new DeleteJobHandler_1.default();
const updateJobHandler = new UpdateJobHandler_1.default();
const filterJobHandler = new FilterJobHandler_1.default();
const viewJobHandler = new ViewJobHandler_1.default();
taskSequence.addTask(skaffoldHandler);
taskSequence.addTask(addJobHandler);
taskSequence.addTask(listJobHandler);
taskSequence.addTask(deleteJobHandler);
taskSequence.addTask(updateJobHandler);
taskSequence.addTask(viewJobHandler);
taskSequence.addTask(filterJobHandler);
async function main() {
    (0, prompts_1.intro)(chalk_1.default.bold.green('Welcome to the Job Tracker CLI!'));
    await taskSequence.run();
    (0, prompts_1.outro)(chalk_1.default.bold.green('Thank you for using the Job Tracker CLI!'));
    process.exit(0);
}
main();
//   const action = await select({
//     message: 'What would you like to do?',
//     options: [
//       { value: 'add', label: 'Insert a new job' },
//       { value: 'list', label: 'List all jobs' },
//       { value: 'view', label: 'View job by ID' },
//       { value: 'filter', label: 'Filter jobs' },
//       { value: 'delete', label: 'Delete a job' },
//       { value: 'update', label: 'Update a job' },
//     ],
//   });
//   switch (action) {
//     case 'add':
//       const jobTitle = await text({
//         message: 'Job Title: ',
//         placeholder: 'Frontend Developer',
//       });
//       const company = await text({
//         message: 'Company name: ',
//         placeholder: 'Abo Cartona',
//       });
//       const status = await select({
//         message: 'Job Status: ',
//         options: [
//           { value: 'In Progress', label: 'In Progress', hint: 'Default' },
//           { value: 'Rejected', label: 'Rejected' },
//           { value: 'Assessment', label: 'Assessment' },
//           { value: 'Phone Call', label: 'Phone Call' },
//           { value: 'Meeting', label: 'Meeting' },
//           { value: 'Offer', label: 'Job Offer' },
//         ],
//       });
//       const applyDate = await text({
//         message: 'Apply Date: ',
//         placeholder: 'yyyy-mm-dd',
//       });
//       const jobURL = await text({
//         message: 'Job URL: ',
//         placeholder: 'https://example.com/job',
//       });
//       const details = await text({
//         message: 'Job Details: ',
//         placeholder: 'Details about the job',
//       });
//       const jobData = {
//         jobTitle,
//         company,
//         status,
//         applyDate: new Date(applyDate as string),
//         jobURL,
//         details,
//       };
//       //   spinner().start('Inserting job...');
//       const insertedJob = await jobModel.insert(jobData as job);
//       //   spinner().stop('Job inserted successfully!');
//       break;
//     case 'list':
//       //   spinner().start('Fetching jobs...');
//       const jobs = await jobModel.index();
//       //   spinner().stop('Jobs fetched successfully!');
//       if (jobs?.length)
//         console.table(jobs, [
//           '_id',
//           'jobTitle',
//           'company',
//           'status',
//           'applyDate',
//           'jobURL',
//           'details',
//         ]);
//       break;
//     case 'view':
//       const jobID = await text({
//         message: 'Enter job ID: ',
//         placeholder: '60d5f484f8d3c4b8b8e0c1a2',
//       });
//       //   spinner().start('Fetching job...');
//       const job = await jobModel.showById(jobID as string);
//       //   spinner().stop('Job fetched successfully!');
//       if (job) {
//         console.table(
//           [job],
//           [
//             '_id',
//             'jobTitle',
//             'company',
//             'status',
//             'applyDate',
//             'jobURL',
//             'details',
//           ]
//         );
//       } else {
//         console.log(chalk.red('Job not found!'));
//       }
//       break;
//     case 'filter':
//       const filterStatus = await select({
//         message: 'Filter by status: ',
//         options: [
//           { value: 'In Progress', label: 'In Progress' },
//           { value: 'Rejected', label: 'Rejected' },
//           { value: 'Assessment', label: 'Assessment' },
//           { value: 'Phone Call', label: 'Phone Call' },
//           { value: 'Meeting', label: 'Meeting' },
//           { value: 'Offer', label: 'Job Offer' },
//         ],
//       });
//       const fromDate = await text({
//         message: 'From date (YYYY-MM-DD): ',
//         placeholder: '2023-01-01',
//       });
//       const toDate = await text({
//         message: 'To date (YYYY-MM-DD): ',
//         placeholder: '2023-12-31',
//       });
//       //   spinner().start('Filtering jobs...');
//       const filteredJobs = await jobModel.filter({
//         status: filterStatus as jobStatus,
//         from: fromDate ? new Date(fromDate as string) : undefined,
//         to: toDate ? new Date(toDate as string) : undefined,
//       });
//       //   spinner().stop('Jobs filtered successfully!');
//       if (filteredJobs?.length) {
//         console.table(filteredJobs, [
//           '_id',
//           'jobTitle',
//           'company',
//           'status',
//           'applyDate',
//           'jobURL',
//           'details',
//         ]);
//       } else {
//         console.log(chalk.red('No jobs found!'));
//       }
//       break;
//     case 'delete':
//       const deleteJobID = await text({
//         message: 'Enter job ID to delete: ',
//         placeholder: '60d5f484f8d3c4b8b8e0c1a2',
//       });
//       //   spinner().start('Deleting job...');
//       const deletedJob = await jobModel.delete(deleteJobID as string);
//       //   spinner().stop('Job deleted successfully!');
//       if (deletedJob) {
//         console.log(chalk.green('Job deleted successfully!'));
//       } else {
//         console.log(chalk.red('Job not found!'));
//       }
//       break;
//     case 'update':
//       const updateJobID = await text({
//         message: 'Enter job ID to update: ',
//         placeholder: '60d5f484f8d3c4b8b8e0c1a2',
//       });
//       const updateJobStatus = await select({
//         message: 'Enter New status: ',
//         options: [
//           { value: 'In Progress', label: 'In Progress' },
//           { value: 'Rejected', label: 'Rejected' },
//           { value: 'Assessment', label: 'Assessment' },
//           { value: 'Phone Call', label: 'Phone Call' },
//           { value: 'Meeting', label: 'Meeting' },
//           { value: 'Offer', label: 'Job Offer' },
//         ],
//       });
//       //   spinner().start('Updating job...');
//       const updatedJob = await jobModel.update(
//         updateJobID as string,
//         updateJobStatus as jobStatus
//       );
//       //   spinner().stop('Job updated successfully!');
//       if (updatedJob) {
//         console.log(chalk.green('Job updated successfully!'));
//       } else {
//         console.log(chalk.red('Job not found!'));
//       }
//       break;
//   }
//   outro(chalk.bold.green('Thank you for using the Job Tracker CLI!'));
//   process.exit(0);
// }
// main();
