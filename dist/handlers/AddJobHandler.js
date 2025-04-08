"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobModel_1 = __importDefault(require("../models/jobModel"));
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const jobModel = new jobModel_1.default();
class AddJobHandler {
    constructor() { }
    async handle(data) {
        if (data?.action == 'add') {
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
            const insertedJob = await jobModel.insert(jobData);
            console.log(chalk_1.default.green('Job inserted successfully!'));
        }
        return data;
    }
}
exports.default = AddJobHandler;
