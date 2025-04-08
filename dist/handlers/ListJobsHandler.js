"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobModel_1 = __importDefault(require("../models/jobModel"));
const prompts_1 = require("@clack/prompts");
const services_1 = __importDefault(require("../services/services"));
const jobModel = new jobModel_1.default();
class ListJobsHandler {
    constructor() { }
    async handle(data) {
        if (data?.action === 'list') {
            const s = (0, prompts_1.spinner)();
            s.start('Fetching jobs...');
            const jobs = await jobModel.index();
            s.stop('Jobs fetched successfully!');
            (0, services_1.default)(jobs);
        }
        return data;
    }
}
exports.default = ListJobsHandler;
