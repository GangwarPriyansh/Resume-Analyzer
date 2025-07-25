// const express = require("express");
// const User = require("..//models/User");
// const router = express.Router();

// // Signup
// router.post("/signup", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const existing = await User.findOne({ email });
//         if (existing) return res.status(400).json({ message: "User already exists" });

//         const newUser = new User({ name, email, password });
//         await newUser.save();
//         res.status(201).json({ message: "User created successfully" });
//     } catch (err) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Login
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user || user.password !== password)
//             return res.status(400).json({ message: "User not found" });

//         res.status(200).json({ message: "Login successful", user });
//     } catch (err) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// module.exports = router;
const express = require("express");
const User = require("../models/User"); // Make sure the path is correct
const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, number, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, number, password });
        await newUser.save();

        // Return the new user
        res.status(201).json({
            message: "User created successfully",
            user: {
                name: newUser.name,
                email: newUser.email,
                number: newUser.number,
            },
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check password
        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Return user info
        res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                number: user.number,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
