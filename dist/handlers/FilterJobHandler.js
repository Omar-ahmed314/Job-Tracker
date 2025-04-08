"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobModel_1 = __importDefault(require("../models/jobModel"));
const prompts_1 = require("@clack/prompts");
const services_1 = __importDefault(require("../services/services"));
const jobModel = new jobModel_1.default();
class FilterJobHandler {
    constructor() { }
    async handle(data) {
        if (data?.action === 'filter') {
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
            const s = (0, prompts_1.spinner)();
            s.start('Filtering jobs...');
            const filteredJobs = await jobModel.filter({
                status: filterStatus,
                from: fromDate ? new Date(fromDate) : undefined,
                to: toDate ? new Date(toDate) : undefined,
            });
            s.stop('Jobs filtered successfully!');
            (0, services_1.default)(filteredJobs);
        }
        return data;
    }
}
exports.default = FilterJobHandler;
