const express = require("express");
const pool = require("../db");

const router = express.Router();

// User Signup (NO bcrypt)
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const userCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userCheck.rows.length > 0) return res.send("Username already taken");

    // Store password as plain text (⚠ Not secure)
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);

    res.send("Signup successful! You can now login.");
});

// User Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (user.rows.length === 0) return res.send("Invalid username or password");

    // Compare plain text passwords
    if (user.rows[0].password !== password) return res.send("Invalid username or password");

    res.send("Login successful! Redirecting...");
});

module.exports = router;