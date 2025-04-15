import User from "../models/UserModel.js";

const loginFunction = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user.password === password) {
            // Only send one response
            return res.status(200).json({ message: "Login successful", user });
            console.log("Login successful:", user.username);
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export default loginFunction;