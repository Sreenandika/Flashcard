async function loadFlashcards() {
    const response = await fetch("http://localhost:5000/flashcards");
    const flashcards = await response.json();

    const container = document.getElementById("flashcards-container");
    container.innerHTML = "";

    flashcards.forEach(card => {
        const div = document.createElement("div");
        div.classList.add("flashcard");
        div.innerHTML = `
            <h3 onclick="toggleExplanation(this)">${card.title}</h3>
            <p class="hidden">${card.explanation}</p>
            <button onclick="editFlashcard(${card.id})">Edit</button>
            <button onclick="deleteFlashcard(${card.id})">Delete</button>
        `;
        container.appendChild(div);
    });
}

// Toggle explanation visibility
function toggleExplanation(element) {
    const explanation = element.nextElementSibling;
    explanation.classList.toggle("hidden");
}

// Edit a flashcard
async function editFlashcard(id) {
    const newTitle = prompt("Enter new title:");
    const newExplanation = prompt("Enter new explanation:");
    if (newTitle && newExplanation) {
        await fetch(`http://localhost:5000/flashcards/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle, explanation: newExplanation })
        });
        loadFlashcards();
    }
}

// Delete a flashcard
async function deleteFlashcard(id) {
    if (confirm("Are you sure you want to delete this flashcard?")) {
        await fetch(`http://localhost:5000/flashcards/${id}`, { method: "DELETE" });
        loadFlashcards();
    }
}

// Go back to the submission page
function goBack() {
    window.location.href = "index.html";
}

// Load flashcards on page load
loadFlashcards();
