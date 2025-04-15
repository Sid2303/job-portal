import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        salary: String,
        type: { type: String, enum: ["full-time", "part-time", "remote"], default: "full-time" },
        skills: [String],
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Recruiter
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
