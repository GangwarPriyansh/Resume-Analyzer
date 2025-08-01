const express = require("express")
const User = require('../models/User.js');
const authMiddleware = require('../middleware/auth1.js');

const router = express.Router();

// Get user profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update profile
router.put('/', authMiddleware, async (req, res) => {
  const { name, email, number, linkedin, github, photoUrl } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.number = number || user.number;
    user.linkedin = linkedin || user.linkedin;
    user.github = github || user.github;
    if (photoUrl) user.photoUrl = photoUrl;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;