import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/usersModel.js';

export const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.send({ "status": "failed", "message": "Unauthorized user" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const currentUser = await User.findById(decoded.userId).select('-password');

        res.status(201).send({
            "status": "success",
            "message": "Authorized user",
            "currentStaff": currentUser,
            "role": currentUser.role
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, phone, password, confPassword } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.send({ "status": "failed", "message": "This username is already taken" });
        }

        // Validate required fields
        const requiredFields = ['username', 'email', 'phone', 'password', 'confPassword',];
        if (!requiredFields.every(field => req.body[field])) {
            return res.send({ "status": "failed", "message": "All fields are required" });
        }

        // Check if password and confirm password match
        if (password !== confPassword) {
            return res.send({ "status": "failed", "message": "Password and confirm password don't match" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create and save new staff member
        const newUser = new User({
            username,
            email,
            phone,
            password: hashPassword,
            role: 'user',
        });

        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

        res.status(201).send({ "status": "success", "message": "Registered user successfully", "token": token });
    } catch (error) {
        res.status(500).send({ "status": "failed", "message": "Unable to register" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.send({ "status": "failed", "message": "All fields are required" });
        }

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.send({ "status": "failed", "message": "You are not a registered user" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

            // Save token to cookie
            res.cookie("jwt", token, {
                maxAge: 60000 * 60 * 24 * 7,
                httpOnly: true
            });

            return res.send({ "status": "success", "message": "Logged in successfully", "token": token });
        } else {
            return res.send({ "status": "failed", "message": "Username or password is not valid" });
        }
    } catch (error) {
        res.status(500).send({ "status": "failed", "message": "Unable to login" });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie("jwt");

        res.send({ "status": "success", "message": "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ "status": "failed", "message": "Internal server error during logout" });
    }
};
