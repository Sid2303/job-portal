// controllers/editJob.js
import Job from "../models/JobModel.js";

export const editJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(updatedJob);
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Failed to update job" });
    }
};

export default editJob;