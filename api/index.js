import express from "express";
import dotenv from "dotenv";
import Cors from "cors";

import loginFunction from "./routes/login.js";
import registerFunction from "./routes/register.js";
import dbConnect from "./db/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json());
app.use(Cors());

//Routes
app.post("/api/login", loginFunction);
app.post("/api/register", registerFunction);

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
