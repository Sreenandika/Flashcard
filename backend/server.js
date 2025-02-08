const express = require("express");
const cors = require("cors");
const pool = require("./db");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// API Routes
app.use("/flashcards", require("./routes/flashcard.js"));

// Serve HTML pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/flashcards", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/flashcards.html"));
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
