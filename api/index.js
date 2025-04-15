import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/UserModel.js"; // Make sure this path is correct
import Cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Important to parse JSON body
app.use(Cors()); // Enable CORS for all routes

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });


console.log("Hello World");

// Login route
app.get("/api/login", (req, res) => {
    res.send("Hello");
});

// Register route
app.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
        return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ name, email, password, role });
        await user.save();

        res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error" });
    }
});


// Login route
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    
        try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            },
        });
        } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
        }
    });

console.log("Hello World 2");