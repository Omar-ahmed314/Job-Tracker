"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobModel_1 = __importDefault(require("../models/jobModel"));
const jobModel = new jobModel_1.default();
class ListJobsHandler {
    constructor() { }
    async handle(data) {
        if (data?.action === 'list') {
            const jobs = await jobModel.index();
            jobs?.forEach((job) => {
                job._id = job._id?.toString();
                job.applyDate = job.applyDate?.toDateString();
            });
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
        }
        return data;
    }
}
exports.default = ListJobsHandler;
