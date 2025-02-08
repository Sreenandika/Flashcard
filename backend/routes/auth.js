const express = require("express");
const router = express.Router();
const pool = require("../db");

// Signup Route
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
        res.send("Signup successful!");
    } catch (err) {
        res.status(500).send("Error signing up");
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);

        if (user.rows.length > 0) {
            res.cookie("loggedIn", "true", { httpOnly: true }); // Set login cookie
            res.send("Login successful!");
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        res.status(500).send("Error logging in");
    }
});

// Logout Route
router.get("/logout", (req, res) => {
    res.clearCookie("loggedIn");
    res.redirect("/login");
});

module.exports = router;
