import Job from "../models/JobModel.js";

const deletejob =async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete job" });
    }
};

export default deletejob;