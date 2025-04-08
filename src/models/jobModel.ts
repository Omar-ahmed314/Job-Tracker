import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/jobTracing`);
const jobsSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    status: { type: String, required: true },
    applyDate: { type: Date, required: true },
    jobURL: { type: String, required: true },
    details: { type: String, required: false },
  },
  { timestamps: true }
);

const jobModel = mongoose.model('job', jobsSchema);

// Define the job status
export type jobStatus =
  | 'In Progress'
  | 'Assessment'
  | 'Phone Call'
  | 'Rejected'
  | 'Meeting'
  | 'Offer';

// Define the job type
export type job = {
  _id?: string;
  jobTitle: string;
  company: string;
  status: jobStatus;
  applyDate: Date;
  jobURL: string;
  details?: string;
};

export default class Job {
  async insert(job: job): Promise<job | undefined> {
    try {
      const jobJson = (await new jobModel(job).save()) as unknown as job;
      return jobJson;
    } catch (error) {
      console.error(`connection failed at the index query with error ${error}`);
    }
  }

  async index(): Promise<job[] | undefined> {
    try {
      const jobs = (await jobModel.find().lean()) as unknown as job[];
      return jobs;
    } catch (error) {
      console.error(`connection failed at the show query with error ${error}`);
    }
  }

  async showById(jobID: string): Promise<job | undefined> {
    try {
      const job = (await jobModel.findById(jobID).lean()) as unknown as job;
      return job;
    } catch (error) {
      console.error(`connection failed at the show query with error ${error}`);
    }
  }

  async filter(options: {
    status?: jobStatus;
    from?: Date;
    to?: Date;
  }): Promise<job[] | undefined> {
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
        .lean()) as unknown as job[];
      return jobs;
    } catch (error) {
      console.error(`connection failed at the show query with error ${error}`);
    }
  }

  async delete(jobID: string): Promise<job | undefined> {
    try {
      const job = (await jobModel.findByIdAndDelete(jobID)) as unknown as job;
      return job;
    } catch (error) {
      console.error(`connection failed at the show query with error ${error}`);
    }
  }

  async update(jobID: string, jobStatus: jobStatus): Promise<job | undefined> {
    try {
      const jobJson = (await jobModel.findByIdAndUpdate(
        jobID,
        { status: jobStatus },
        { new: true }
      )) as unknown as job;
      return jobJson;
    } catch (error) {
      console.error(`connection failed at the index query with error ${error}`);
    }
  }
}
