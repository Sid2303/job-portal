import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    type: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
        required: true,
    },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    skills: { type: [String], required: true }, // ✅ NEW
    salary: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
