// /static/js/login.js
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    // Datos de prueba
    const usuarios = [
        { user: "admin", pass: "1234", rol: "admin" },
        { user: "cliente", pass: "4321", rol: "usuario" }
    ];

const logoutBtn = document.getElementById("logoutBtn");

if (rol) {
    logoutBtn.classList.remove("oculto");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("rol");
        location.reload(); // Recargar la página para volver al estado sin login
    });
}
});
