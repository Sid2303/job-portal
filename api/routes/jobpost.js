import Job from "../models/JobModel.js";

const postjob = async(req, res) => {
    const {
        title,
        company,
        location,
        type,
        description,
        requirements,
        salary,
        postedBy,
    } = req.body;

    try {
        const newJob = await Job.create({
            title,
            company,
            location,
            type,
            description,
            requirements,
            salary,
            postedBy,
        });

        res.status(201).json({ message: "Job posted successfully", job: newJob });
    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ message: "Failed to post job" });
    }
}

export default postjob;