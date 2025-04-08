#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobModel_1 = __importDefault(require("./models/jobModel"));
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const jobModel = new jobModel_1.default();
(0, prompts_1.intro)(chalk_1.default.bold.green('Welcome to the Job Tracker CLI!'));
async function main() {
    const action = await (0, prompts_1.select)({
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
            const jobTitle = await (0, prompts_1.text)({
                message: 'Job Title: ',
                placeholder: 'Frontend Developer',
            });
            const company = await (0, prompts_1.text)({
                message: 'Company name: ',
                placeholder: 'Abo Cartona',
            });
            const status = await (0, prompts_1.select)({
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
            const applyDate = await (0, prompts_1.text)({
                message: 'Apply Date: ',
                placeholder: 'yyyy-mm-dd',
            });
            const jobURL = await (0, prompts_1.text)({
                message: 'Job URL: ',
                placeholder: 'https://example.com/job',
            });
            const details = await (0, prompts_1.text)({
                message: 'Job Details: ',
                placeholder: 'Details about the job',
            });
            const jobData = {
                jobTitle,
                company,
                status,
                applyDate: new Date(applyDate),
                jobURL,
                details,
            };
            //   spinner().start('Inserting job...');
            const insertedJob = await jobModel.insert(jobData);
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
            const jobID = await (0, prompts_1.text)({
                message: 'Enter job ID: ',
                placeholder: '60d5f484f8d3c4b8b8e0c1a2',
            });
            //   spinner().start('Fetching job...');
            const job = await jobModel.showById(jobID);
            //   spinner().stop('Job fetched successfully!');
            if (job) {
                console.table([job], [
                    '_id',
                    'jobTitle',
                    'company',
                    'status',
                    'applyDate',
                    'jobURL',
                    'details',
                ]);
            }
            else {
                console.log(chalk_1.default.red('Job not found!'));
            }
            break;
        case 'filter':
            const filterStatus = await (0, prompts_1.select)({
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
            const fromDate = await (0, prompts_1.text)({
                message: 'From date (YYYY-MM-DD): ',
                placeholder: '2023-01-01',
            });
            const toDate = await (0, prompts_1.text)({
                message: 'To date (YYYY-MM-DD): ',
                placeholder: '2023-12-31',
            });
            //   spinner().start('Filtering jobs...');
            const filteredJobs = await jobModel.filter({
                status: filterStatus,
                from: fromDate ? new Date(fromDate) : undefined,
                to: toDate ? new Date(toDate) : undefined,
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
            }
            else {
                console.log(chalk_1.default.red('No jobs found!'));
            }
            break;
        case 'delete':
            const deleteJobID = await (0, prompts_1.text)({
                message: 'Enter job ID to delete: ',
                placeholder: '60d5f484f8d3c4b8b8e0c1a2',
            });
            //   spinner().start('Deleting job...');
            const deletedJob = await jobModel.delete(deleteJobID);
            //   spinner().stop('Job deleted successfully!');
            if (deletedJob) {
                console.log(chalk_1.default.green('Job deleted successfully!'));
            }
            else {
                console.log(chalk_1.default.red('Job not found!'));
            }
            break;
        case 'update':
            const updateJobID = await (0, prompts_1.text)({
                message: 'Enter job ID to update: ',
                placeholder: '60d5f484f8d3c4b8b8e0c1a2',
            });
            const updateJobStatus = await (0, prompts_1.select)({
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
            const updatedJob = await jobModel.update(updateJobID, updateJobStatus);
            //   spinner().stop('Job updated successfully!');
            if (updatedJob) {
                console.log(chalk_1.default.green('Job updated successfully!'));
            }
            else {
                console.log(chalk_1.default.red('Job not found!'));
            }
            break;
    }
    (0, prompts_1.outro)(chalk_1.default.bold.green('Thank you for using the Job Tracker CLI!'));
    process.exit(0);
}
main();
