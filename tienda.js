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

    const rol = localStorage.getItem("rol");
    const loginBtn = document.getElementById("loginBtn");

    // Mostrar el botón siempre
    loginBtn.style.display = "block";

    loginBtn.addEventListener("click", () => {
        window.location.href = "/login.html";
    });

    // Si está logueado, mostrar panel según rol
    if (rol === "admin") {
        document.getElementById("adminPanel")?.classList.remove("oculto");
        loginBtn.style.display = "none"; // Ocultar botón si ya está logueado
    }

    if (rol === "usuario") {
        document.getElementById("userPanel")?.classList.remove("oculto");
        loginBtn.style.display = "none"; // Ocultar botón si ya está logueado
    }

});
