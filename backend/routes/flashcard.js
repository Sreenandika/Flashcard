const express = require("express");
const pool = require("../db");

const router = express.Router();

// Add a new flashcard
router.post("/", async (req, res) => {
    const { title, explanation } = req.body;
    await pool.query("INSERT INTO flashcards (title, explanation) VALUES ($1, $2)", [title, explanation]);
    res.status(201).json({ message: "Flashcard added" });
});

// Get all flashcards
router.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM flashcards ORDER BY title ASC");
    res.json(result.rows);
});

// Update a flashcard
router.put("/:id", async (req, res) => {
    const { title, explanation } = req.body;
    const { id } = req.params;
    await pool.query("UPDATE flashcards SET title = $1, explanation = $2 WHERE id = $3", [title, explanation, id]);
    res.json({ message: "Flashcard updated" });
});

// Delete a flashcard
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM flashcards WHERE id = $1", [id]);
    res.json({ message: "Flashcard deleted" });
});
// // Redirect if not logged in
// if (!localStorage.getItem("token")) {
//     window.location.href = "login.html";
// }


module.exports = router;