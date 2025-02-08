const express = require("express");
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Allows reading cookies
app.use(express.static(path.join(__dirname, "../frontend")));

// Force login page first
app.get("/", (req, res) => {
    if (req.cookies.loggedIn === "true") {
        res.redirect("/submit");
    } else {
        res.sendFile(path.join(__dirname, "../frontend/login.html"));
    }
});

// Serve Flashcards Page
app.get("/flashcards", (req, res) => {
    if (req.cookies.loggedIn === "true") {
        res.sendFile(path.join(__dirname, "../frontend/flashcards.html"));
    } else {
        res.redirect("/login");
    }
});

// Authentication Routes
app.use("/auth", require("./routes/auth"));
app.use("/flashcards/api", require("./routes/flashcard")); // API route for flashcards

// Serve Login & Signup Pages
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "../frontend/login.html")));
app.get("/signup", (req, res) => res.sendFile(path.join(__dirname, "../frontend/signup.html")));
app.get("/submit", (req, res) => res.sendFile(path.join(__dirname, "../frontend/submit.html")));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
