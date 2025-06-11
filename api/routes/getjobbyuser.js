import Job from "../models/JobModel.js"; // Import the Job model

export const getJobsByUser = async (req, res) => {
    const { userId } = req.params; // Get userId from URL params

    try {
        // Find jobs where postedBy matches userId
        const jobs = await Job.find({ postedBy: userId });
        
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this user." });
        }

        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching user's jobs:", error);
        res.status(500).json({ message: "Failed to fetch jobs." });
    }
};

export default getJobsByUser;