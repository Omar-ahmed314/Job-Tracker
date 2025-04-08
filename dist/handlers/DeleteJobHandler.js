"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobModel_1 = __importDefault(require("../models/jobModel"));
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const jobModel = new jobModel_1.default();
class DeleteJobHandler {
    constructor() { }
    async handle(data, next) {
        if (data?.action === 'delete') {
            const deleteJobID = await (0, prompts_1.text)({
                message: 'Enter job ID to delete: ',
                placeholder: '60d5f484f8d3c4b8b8e0c1a2',
            });
            const s = (0, prompts_1.spinner)();
            s.start('Deleting job...');
            const deletedJob = await jobModel.delete(deleteJobID);
            s.stop('Job deleted successfully!');
            if (deletedJob) {
                console.log(chalk_1.default.green('Job deleted successfully!'));
            }
            else {
                console.log(chalk_1.default.red('Job not found!'));
            }
        }
        return data;
    }
}
exports.default = DeleteJobHandler;
