#!/usr/bin/env node

import SkaffoldHandler from './handlers/SkaffoldHandler';
import TaskSequence from './sequence/taskSequence';
import AddJobHandler from './handlers/AddJobHandler';
import { intro, outro } from '@clack/prompts';
import chalk from 'chalk';
import Handler from './handlers/Handler';
import ListJobsHandler from './handlers/ListJobsHandler';
import DeleteJobHandler from './handlers/DeleteJobHandler';
import UpdateJobsHandler from './handlers/UpdateJobHandler';
import FilterJobHandler from './handlers/FilterJobHandler';
import ViewJobHandler from './handlers/ViewJobHandler';

const taskSequence = new TaskSequence();

const skaffoldHandler: Handler = new SkaffoldHandler();

const addJobHandler: Handler = new AddJobHandler();

const listJobHandler: Handler = new ListJobsHandler();

const deleteJobHandler: Handler = new DeleteJobHandler();

const updateJobHandler: Handler = new UpdateJobsHandler();

const filterJobHandler: Handler = new FilterJobHandler();

const viewJobHandler: Handler = new ViewJobHandler();

taskSequence.addTask(skaffoldHandler);
taskSequence.addTask(addJobHandler);
taskSequence.addTask(listJobHandler);
taskSequence.addTask(deleteJobHandler);
taskSequence.addTask(updateJobHandler);
taskSequence.addTask(viewJobHandler);
taskSequence.addTask(filterJobHandler);

async function main() {
  intro(chalk.bold.green('Welcome to the Job Tracker CLI!'));
  await taskSequence.run();
  outro(chalk.bold.green('Thank you for using the Job Tracker CLI!'));
  process.exit(0);
}

main();
