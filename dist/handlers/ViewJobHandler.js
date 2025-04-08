"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobModel_1 = __importDefault(require("../models/jobModel"));
const prompts_1 = require("@clack/prompts");
const services_1 = __importDefault(require("../services/services"));
const jobModel = new jobModel_1.default();
class ViewJobHandler {
    constructor() { }
    async handle(data, next) {
        if (data?.action === 'view') {
            const jobID = await (0, prompts_1.text)({
                message: 'Enter job ID: ',
                placeholder: '60d5f484f8d3c4b8b8e0c1a2',
            });
            const s = (0, prompts_1.spinner)();
            s.start('Fetching job...');
            const job = await jobModel.showById(jobID);
            s.stop('Job fetched successfully!');
            (0, services_1.default)([job]);
        }
        return data;
    }
}
exports.default = ViewJobHandler;
