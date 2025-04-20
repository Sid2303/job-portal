import Application from "../models/ApplicationModel.js";

const userApplications = async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.params.userId })
            .populate("jobId", "title company location"); // Optional: get job info too
        res.status(200).json(applications);
    } catch (err) {
        console.error("Error fetching user applications:", err);
        res.status(500).json({ message: "Failed to fetch user applications" });
    }
}

export default userApplications;