document.addEventListener("DOMContentLoaded", function () {
    const footerDiv = document.getElementById("footer-component");

    if (footerDiv) {
        fetch("/src/views/pages/public/components/footer.html")
            .then(response => response.text())
            .then(data => {
                footerDiv.innerHTML = data;
                const yearSpan = document.getElementById("currentYear");
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
            })
            .catch(error => console.error("Error al cargar el footer:", error));
    }
});

// Carga dinámica del header
fetch('/src/views/pages/public/components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error('Error al cargar navbar: ', error));

fetch('/src/views/pages/public/components/nav-tienda.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-tienda').innerHTML = data;
    })
    .catch(error => console.error('Error al cargar navbar: ', error));
