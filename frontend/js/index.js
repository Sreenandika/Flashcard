document.getElementById("flashcard-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const explanation = document.getElementById("explanation").value;

    const response = await fetch("http://localhost:5000/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, explanation }),
    });

    if (response.ok) {
        alert("✅ Flashcard submitted!");
        window.location.href = "flashcards.html"; // Redirect to flashcards page
    }
});

function goToFlashcards() {
    window.location.href = "flashcards.html";
}
// Handle Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
    fetch("/auth/logout").then(() => window.location.href = "/login");
});
