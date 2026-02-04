const User = require('../../model/User');
const generateToken = require('../../utils/jwt');
const bcrypt = require('bcryptjs');



exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Log incoming request (for debugging)
        console.log('Registration attempt:', { name, email });

        //validate
        if (!name || !email || !password) {
            console.log('Validation failed: missing fields');
            return res.status(400).json({ message: "Please enter all fields" });
        }

        // Password validation
        if (password.length < 6) {
            console.log('Validation failed: password too short');
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        //checkExitUser
        const userExits = await User.findOne({ email });
        if (userExits) {
            console.log('User already exists:', email);
            return res.status(409).json({ message: "User already exists" })
        }

        // Hash password

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        console.log('User created successfully:', user._id);
        res.status(201).json({ message: "User created successfully", token: generateToken(user._id) });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "User logged in successfully",token: generateToken(user._id)});
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

}