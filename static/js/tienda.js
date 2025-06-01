document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("locationModal");
    const sgoBtn = document.getElementById("sgoButton");
    const jujuyBtn = document.getElementById("jujuyButton");
    const adminPanel = document.getElementById("adminPanel");
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");
    const cartItems = document.getElementById("cartItems");
    const total = document.getElementById("total");

    let currentUser = null;
    let productos = {
        sgo: [],
        jujuy: []
    };
    let carrito = [];

    function renderCatalogo(location) {
        productList.innerHTML = "";
        productos[location].forEach((producto, index) => {
            const div = document.createElement("div");
            div.className = "producto";
            div.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button onclick="agregarAlCarrito('${location}', ${index})">Agregar al carrito</button>
            `;
            productList.appendChild(div);
        });
    }

    window.agregarAlCarrito = (location, index) => {
        const producto = productos[location][index];
        carrito.push(producto);
        renderCarrito();
    };

    function renderCarrito() {
        cartItems.innerHTML = "";
        let suma = 0;
        carrito.forEach((item, i) => {
            suma += item.precio;
            const li = document.createElement("li");
            li.textContent = `${item.nombre} - $${item.precio}`;
            cartItems.appendChild(li);
        });
        total.textContent = suma.toFixed(2);
    }

    function iniciarSesionComo(location) {
        modal.style.display = "none";
        currentUser = location;

        if (location === "sgo") {
            adminPanel.classList.remove("oculto");
        }

        renderCatalogo(location);

        productForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("productName").value;
            const precio = parseFloat(document.getElementById("productPrice").value);
            productos[location].push({ nombre, precio });
            productForm.reset();
            renderCatalogo(location);
        });
    }

    sgoBtn.addEventListener("click", () => iniciarSesionComo("sgo"));
    jujuyBtn.addEventListener("click", () => iniciarSesionComo("jujuy"));

    const rol = localStorage.getItem("rol");

    if (rol === "admin") {
        document.getElementById("adminPanel").classList.remove("oculto");
    }

    if (rol === "usuario") {
        // Podés mostrar un panel de compras acá si querés
        console.log("Modo usuario cargado.");
    }

    if (!rol) {
        // Si no hay sesión, redirigir al login
        window.location.href = "/src/views/pages/public/auth/login.html"
    }
    
});
