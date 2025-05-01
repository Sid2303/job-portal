import Job from "../models/JobModel.js";

const getjobs = async (req, res) => {
    const { skill } = req.query;

    try {
        let jobs;
        if (skill) {
            jobs = await Job.find({ skills: { $regex: new RegExp(skill, "i") } });
        } else {
            jobs = await Job.find({});
        }

        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Failed to fetch jobs" });
    }
};

export default getjobs;
