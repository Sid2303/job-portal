import Application from "../models/ApplicationModel.js";

const updateApplication = async (req, res) => {
    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        res.status(200).json({ message: "Application updated", updatedApplication });
    } catch (err) {
        console.error("Error updating application:", err);
        res.status(500).json({ message: "Failed to update application" });
    }
}

export default updateApplication;