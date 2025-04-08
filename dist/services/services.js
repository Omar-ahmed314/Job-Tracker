"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
function showTable(jobs) {
    jobs?.forEach((job) => {
        job._id = job._id?.toString();
        job.applyDate = job.applyDate?.toDateString();
    });
    if (jobs?.length) {
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
    else {
        console.log(chalk_1.default.red('No jobs found!'));
    }
}
exports.default = showTable;
