import Application from "../models/ApplicationModel.js";
import Job from "../models/JobModel.js";
import mongoose from "mongoose";

const applyJob = async (req, res) => {
  try {
    const {
      jobId,
      userId,
      applicantName,
      applicantEmail,
      coverLetter,
      resumeUrl,
      jobTitle,
      company,
      location,
      type,
      salary,
      description,
    } = req.body;

    // Validate required fields
    if (!jobId || !userId || !coverLetter || !applicantName || !applicantEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Create new application
    const application = await Application.create({
      userId: new mongoose.Types.ObjectId(userId),
      jobId: new mongoose.Types.ObjectId(jobId),
      applicantName,
      applicantEmail,
      jobTitle,
      company,
      location,
      type,
      salary,
      description,
      coverLetter,
      resumeUrl,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to apply for job" });
  }
};

export default applyJob;
