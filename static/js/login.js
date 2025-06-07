// /static/js/login.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");
    const adminPanel = document.getElementById("adminPanel");
    const userPanel = document.getElementById("userPanel");

    const usuarios = [
        { user: "admin", pass: "1234", rol: "admin" },
        { user: "cliente", pass: "4321", rol: "usuario" }
    ];

    // Mostrar panel si ya hay sesión
    const rolGuardado = localStorage.getItem("rol");
    if (rolGuardado) {
        mostrarPanel(rolGuardado);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const user = usernameInput.value.trim();
        const pass = passwordInput.value.trim();

        const encontrado = usuarios.find(u => u.user === user && u.pass === pass);

        if (encontrado) {
            errorMsg.style.color = "green";
            errorMsg.textContent = "✅ Login exitoso. Redirigiendo...";

            localStorage.setItem("rol", encontrado.rol);

            setTimeout(() => {
                mostrarPanel(encontrado.rol);
                form.reset();
                errorMsg.textContent = "";
            }, 1000);

        } else {
            errorMsg.style.color = "red";
            errorMsg.textContent = "❌ Usuario o contraseña incorrecta.";
        }
    });

    function mostrarPanel(rol) {
        if (rol === "admin") {
            adminPanel.classList.remove("oculto");
        } else if (rol === "usuario") {
            userPanel.classList.remove("oculto");
        }

        const logoutBtn = document.createElement("button");
        logoutBtn.textContent = "Cerrar sesión";
        logoutBtn.classList.add("logout-button");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("rol");
            location.reload();
        });

        document.querySelector("main").appendChild(logoutBtn);
    }
});
