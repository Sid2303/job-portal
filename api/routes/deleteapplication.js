import Application from "../models/ApplicationModel.js";

const deleteApplication = async (req, res) => {
    try {
        await Application.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Application deleted successfully" });
    } catch (err) {
        console.error("Error deleting application:", err);
        res.status(500).json({ message: "Failed to delete application" });
    }
}

export default deleteApplication;