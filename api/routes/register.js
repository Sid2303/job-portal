const registerFunction = async (req, res) => {
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
}

export default registerFunction;