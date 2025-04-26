import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const registerFunction = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // ✅ Save user info in session
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    await req.session.save(); // 🧠 Very important! Otherwise session is not persisted.

    res.status(201).json({
      message: "User registered successfully",
      user: req.session.user, // Return the saved session user
    });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default registerFunction;
