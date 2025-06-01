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

    const encontrado = usuarios.find(u => u.user === user && u.pass === pass);

    if (encontrado) {
        // Guardar rol y redirigir
        localStorage.setItem("rol", encontrado.rol);
        window.location.href = "/src/views/pages/public/tienda.html";
    } else {
        errorMsg.textContent = "Usuario o contraseña incorrectos.";
    }
    function logout() {
        localStorage.removeItem("rol");
        window.location.href = "/src/views/pages/public/auth/login.html";
    }
    
    
});
