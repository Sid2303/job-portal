// controllers/userApplicationsController.js
import Application from "../models/ApplicationModel.js";
import mongoose from "mongoose";

const userApplications = async (req, res) => {
  const { userId } = req.params;

  try {
    const applications = await Application.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

export default userApplications;
