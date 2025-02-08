const express = require("express");
const cors = require("cors");
const pool = require("./db");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/flashcards", require("./routes/flashcard.js"));
app.use("/auth", require("./routes/auth")); // Add this for login/signup

// Serve HTML pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../frontend/index.html")));
app.get("/flashcards", (req, res) => res.sendFile(path.join(__dirname, "../frontend/flashcards.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "../frontend/login.html")));
app.get("/signup", (req, res) => res.sendFile(path.join(__dirname, "../frontend/signup.html")));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
