import Application from "../models/ApplicationModel.js";

const userApplications = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const applications = await Application.find({ userId })
            .populate("jobId", "title company location"); // Populating specific fields

        res.status(200).json(applications);
    } catch (err) {
        console.error("❌ Error fetching user applications:", err.message);
        res.status(500).json({ message: "Failed to fetch user applications" });
    }
};

export default userApplications;
