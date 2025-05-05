// models/ApplicationModel.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
        },
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        type: { type: String, required: true },
        salary: { type: String }, // optional
        description: { type: String },
        coverLetter: { type: String, required: true },
        applicantName: { type: String, required: true },
        applicantEmail: { type: String, required: true },
        resumeUrl: { type: String }, // optional
        appliedAt: {
        type: Date,
        default: Date.now,
        },
    },
    { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
