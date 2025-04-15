import mongoose from "mongoose";
import dotenv from "dotenv";

const userSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        trim: true,
        },

        email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        },

        password: {
        type: String,
        required: true,
        },

        role: {
        type: String,
        enum: ["jobseeker", "recruiter", "admin"],
        default: "jobseeker",
        },

        bio: {
        type: String,
        default: "",
        },

        location: {
        type: String,
        },

        skills: {
        type: [String],
        default: [],
        },

        resume_url: {
        type: String,
        },

        createdAt: {
        type: Date,
        default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model("User", userSchema);
export default User;