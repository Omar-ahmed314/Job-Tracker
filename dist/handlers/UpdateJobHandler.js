"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobModel_1 = __importDefault(require("../models/jobModel"));
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const jobModel = new jobModel_1.default();
class UpdateJobsHandler {
    constructor() { }
    async handle(data) {
        if (data?.action === 'update') {
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
            const s = (0, prompts_1.spinner)();
            s.start('Updating job...');
            const updatedJob = await jobModel.update(updateJobID, updateJobStatus);
            s.stop('Job updated successfully!');
            if (updatedJob) {
                console.log(chalk_1.default.green('Job updated successfully!'));
            }
            else {
                console.log(chalk_1.default.red('Job not found!'));
            }
        }
        return data;
    }
}
exports.default = UpdateJobsHandler;
