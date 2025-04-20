import Application from "../models/ApplicationModel.js";

const applyJob = async(req,res) => {
    const {jobId,userId,resume,coverLetter} = req.body;
    try {
        const newApplication = await Application.create({
            jobId,
            userId,
            resume,
            coverLetter
        });
        res.status(201).json({ message: "Application submitted successfully", application: newApplication });
    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ message: "Failed to apply for job" });
    }
}

export default applyJob;