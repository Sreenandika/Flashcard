// Handle Signup
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.text();
    alert(data);
    if (data.includes("successful")) window.location.href = "/login";
});

// Handle Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.text();
    alert(data);
    if (data.includes("successful")) window.location.href = "/";
});

// Handle Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
    fetch("/auth/logout").then(() => window.location.href = "/login");
});
