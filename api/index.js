import express from "express";
import dotenv from "dotenv";
import Cors from "cors";

import loginFunction from "./routes/login.js";
import registerFunction from "./routes/register.js";
import dbConnect from "./db/database.js";
import postjob from "./routes/jobpost.js";
import getjobs from "./routes/getjobs.js";
import getjob from "./routes/getjobs.js";
import deletejob from "./routes/deletejob.js";
import deleteuser from "./routes/deleteuser.js";

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
