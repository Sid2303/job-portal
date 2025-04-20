import express from "express";
import dotenv from "dotenv";
import Cors from "cors";

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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json());
app.use(Cors());

//Routes
app.post("/api/login", loginFunction); //Login
app.post("/api/register", registerFunction); //Register
app.delete("/api/deleteuser/:id", deleteuser); //Delete User
app.post("/api/postjob", postjob); //Post Job
app.get("/api/getjobs", getjobs); //Get Jobs
app.get("/api/getjob/:id", getjob); //Get Job by ID
app.delete("/api/deletejob/:id", deletejob); //Delete Job by ID
app.post("/api/applyjob", applyJob); //Apply for Job
app.get("/api/getapplications/:id", getApplications); // Get applications for a specific job
app.delete("/api/deleteapplication/:id", deleteApplication); // Delete application by ID
app.put("/api/userapplication/:id", updateApplication); // Update application by ID
app.get("/api/userapplications/:userId", userApplications); // Get applications for a specific user




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
