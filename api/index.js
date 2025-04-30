import express from "express";
import dotenv from "dotenv";
import Cors from "cors";
import multer from "multer";
import session from 'express-session';

import dbConnect from "./db/database.js";

// Importing routes
import loginFunction from "./routes/login.js";
import registerFunction from "./routes/register.js";
import postjob from "./routes/jobpost.js";
import getjobs from "./routes/getjobs.js";
import getjob from "./routes/getjob.js";
import deletejob from "./routes/deletejob.js";
import deleteuser from "./routes/deleteuser.js";
import applyJob from "./routes/applyjob.js";
import getApplications from "./routes/getapplications.js";
import deleteApplication from "./routes/deleteapplication.js";
import updateApplication from "./routes/updateapplication.js";
import userApplications from "./routes/getuserapplications.js";
import editJob from "./routes/editjob.js";
import updateUser from "./routes/updateuser.js";

dotenv.config();
const upload = multer();

const app = express();
const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json());
app.use(Cors());
app.use(session({
    secret: 'yourSecretKeyHere', // 🔥 very important, keep it secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using https
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    }
}));

//Routes
app.post("/api/login", loginFunction); //Login
app.post("/api/register", registerFunction); //Register
app.delete("/api/deleteuser/:id", deleteuser); //Delete User
app.post("/api/postjob", postjob); //Post Job
app.get("/api/getjobs", getjobs); //Route to get jobs
app.get("/api/getjob/:id", getjob); //Get Job by ID
app.delete("/api/deletejob/:id", deletejob); //Delete Job by ID
app.post("/api/applyjob", upload.none(), applyJob); //Apply for Job
app.get("/api/getapplications/:id", getApplications); // Get applications for a specific job
app.delete("/api/deleteapplication/:id", deleteApplication); // Delete application by ID
app.put("/api/userapplication/:id", updateApplication); // Update application by ID
app.get("/api/userapplications/:userId", userApplications); // Get applications for a specific user
app.put("/api/editjob/:id", editJob); // Edit job route
app.put("/api/updateuser/:id", updateUser); // Update user route




const startServer = async () => {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
