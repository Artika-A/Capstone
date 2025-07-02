const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed });
    return res.status(201).json({ message: "User registered" });

  } catch (err) {
    console.error("Registration error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/login", async (req, res) => {
  console.log("Hello!")
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "User not found, please register."});

  const isValid = await bcrypt.compare(req.body.password, user.password);
   if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "w4h9V7xYpL3QmZ8tR2fN6jBvXsC1KdPzF0qW8eYtUaMvJrXn", { expiresIn: "1h" });
  res.json({ token });
});

router.post("/test", async (req, res) => {
  console.log("Test")
  res.send("Testing ok!")
})

module.exports = router;