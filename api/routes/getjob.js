import Job from "../models/JobModel.js";

const getjob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        res.status(200).json(job);
    } catch (error) {
        res.status(404).json({ message: "Job not found" });
    }
};

export default getjob;