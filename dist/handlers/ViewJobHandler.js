"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobModel_1 = __importDefault(require("../models/jobModel"));
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const jobModel = new jobModel_1.default();
class ViewJobHandler {
    constructor() { }
    async handle(data) {
        if (data?.action === 'view') {
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
        }
        return data;
    }
}
exports.default = ViewJobHandler;
