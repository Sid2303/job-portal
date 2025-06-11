import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const loginFunction = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("Login successful:", user.name);

        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export default loginFunction;
