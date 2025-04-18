import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resume: {
        type: String, // You can use a URL or base64 string here
        required: false
    },
    coverLetter: {
        type: String,
        required: false
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
