"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Connect to MongoDB
mongoose_1.default.connect(`mongodb://localhost:27017/jobTracing`);
const jobsSchema = new mongoose_1.default.Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    status: { type: String, required: true },
    applyDate: { type: Date, required: true },
    jobURL: { type: String, required: true },
    details: { type: String, required: false },
}, { timestamps: true });
const jobModel = mongoose_1.default.model('job', jobsSchema);
class Job {
    async insert(job) {
        try {
            const jobJson = (await new jobModel(job).save());
            return jobJson;
        }
        catch (error) {
            console.error(`connection failed at the index query with error ${error}`);
        }
    }
    async index() {
        try {
            const jobs = (await jobModel.find().lean());
            return jobs;
        }
        catch (error) {
            console.error(`connection failed at the show query with error ${error}`);
        }
    }
    async showById(jobID) {
        try {
            const job = (await jobModel.findById(jobID).lean());
            return job;
        }
        catch (error) {
            console.error(`connection failed at the show query with error ${error}`);
        }
    }
    async filter(options) {
        try {
            const jobs = (await jobModel
                .find({
                status: options.status,
                ...((options.from || options.to) && {
                    applyDate: {
                        ...(options.from && { $gte: options.from }),
                        ...(options.to && { $lte: options.to }),
                    },
                }),
            })
                .lean());
            return jobs;
        }
        catch (error) {
            console.error(`connection failed at the show query with error ${error}`);
        }
    }
    async delete(jobID) {
        try {
            const job = (await jobModel.findByIdAndDelete(jobID));
            return job;
        }
        catch (error) {
            console.error(`connection failed at the show query with error ${error}`);
        }
    }
    async update(jobID, jobStatus) {
        try {
            const jobJson = (await jobModel.findByIdAndUpdate(jobID, { status: jobStatus }, { new: true }));
            return jobJson;
        }
        catch (error) {
            console.error(`connection failed at the index query with error ${error}`);
        }
    }
}
exports.default = Job;
