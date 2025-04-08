import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
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

/**
 * Job model class to handle job operations.
 * @class Job
 */
export default class Job {
  /**
   * Inserts a new job into the database.
   * @param job - The job object to be inserted into the database.
   * @returns {Promise<job | undefined>} - The inserted job object or undefined if an error occurs.
   */
  async insert(job: job): Promise<job | undefined> {
    try {
      const jobJson = (await new jobModel(job).save()) as unknown as job;
      return jobJson;
    } catch (error) {
      console.error(`connection failed at the index query with error ${error}`);
    }
  }

  /**
   * Retrieves all jobs from the database.
   * @returns {Promise<job[] | undefined>} - An array of job objects or undefined if an error occurs.
   */
  async index(): Promise<job[] | undefined> {
    try {
      const jobs = (await jobModel.find().lean()) as unknown as job[];
      return jobs;
    } catch (error) {
      console.error(`connection failed at the show query with error ${error}`);
    }
  }

  /**
   * Retrieves a job by its ID from the database.
   * @param jobID - The ID of the job to be retrieved.
   * @returns {Promise<job | undefined>} - The job object or undefined if an error occurs.
   */
  async showById(jobID: string): Promise<job | undefined> {
    try {
      const job = (await jobModel.findById(jobID).lean()) as unknown as job;
      return job;
    } catch (error) {
      console.error(`connection failed at the show query with error ${error}`);
    }
  }

  /**
   * Filters jobs based on the provided options.
   * @param options - The filter options including status, from date, and to date.
   * @returns {Promise<job[] | undefined>} - An array of filtered job objects or undefined if an error occurs.
   */
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

  /**
   * Deletes a job by its ID from the database.
   * @param jobID - The ID of the job to be deleted.
   * @returns {Promise<job | undefined>} - The deleted job object or undefined if an error occurs.
   */
  async delete(jobID: string): Promise<job | undefined> {
    try {
      const job = (await jobModel.findByIdAndDelete(jobID)) as unknown as job;
      return job;
    } catch (error) {
      console.error(`connection failed at the show query with error ${error}`);
    }
  }

  /**
   * Updates the status of a job by its ID in the database.
   * @param jobID - The ID of the job to be updated.
   * @param jobStatus - The new status of the job.
   * @returns {Promise<job | undefined>} - The updated job object or undefined if an error occurs.
   */
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
