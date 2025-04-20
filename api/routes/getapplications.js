import Application from "../models/ApplicationModel.js";

const getApplications = async (req, res) => {
    const { id } = req.params;
    try {
        const applications = await Application.find({ jobId: id });
        res.status(200).json(applications);
    }
    catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: "Failed to fetch applications" });
    }
}

export default getApplications;