// controllers/applyJobController.js
import Application from "../models/ApplicationModel.js";
import Job from "../models/JobModel.js";
import mongoose from "mongoose";

const applyJob = async (req, res) => {
  try {
    const { jobId, userId, coverLetter } = req.body;

    if (!jobId || !userId || !coverLetter) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = await Application.create({
      userId: new mongoose.Types.ObjectId(userId),
      jobId: new mongoose.Types.ObjectId(jobId),
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      coverLetter,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to apply for job" });
  }
};

export default applyJob;
