document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll para enlaces con #
    document.querySelectorAll('nav ul li a[href^="#"]').forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            targetSection?.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Acordeón de FAQs
    document.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Botón "Subir arriba"
    const scrollToTopButton = document.getElementById("scrollToTop");
    window.addEventListener("scroll", function () {
        if (
            document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100
        ) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

        // Lógica para el acordeón de servicios
    document.querySelectorAll('.servicio-titulo').forEach(titulo => {
        titulo.addEventListener('click', () => {
            const detalles = titulo.nextElementSibling;

            // Alternar la visibilidad de la respuesta con un solo clic
            if (detalles.style.maxHeight === "0px" || !detalles.style.maxHeight) {
                detalles.style.maxHeight = detalles.scrollHeight + "px"; // Expande el contenido
            } else {
                detalles.style.maxHeight = "0px"; // Colapsa el contenido
            }
        });
    });

    // Modal de ubicación
    const modal = document.getElementById("locationModal");
    const sgoButton = document.getElementById("sgoButton");
    const jujuyButton = document.getElementById("jujuyButton");

    const savedUbicacion = localStorage.getItem("ubicacion");

    if (savedUbicacion) {
        modal.style.display = "none";
        aplicarUbicacion(savedUbicacion);
    } else {
        modal.style.display = "block";
    }

    sgoButton.addEventListener("click", function () {
        localStorage.setItem("ubicacion", "sgo");
        modal.style.display = "none";
        aplicarUbicacion("sgo");
    });

    jujuyButton.addEventListener("click", function () {
        localStorage.setItem("ubicacion", "jujuy");
        modal.style.display = "none";
        aplicarUbicacion("jujuy");
    });

    function aplicarUbicacion(location) {
        togglePrices(location);
        updateContactLinks(location);
        sendLocationToGoogleApps(location === "sgo" ? "Santiago del Estero" : "Jujuy");
        showMap(location);
        mostrarImagenes(location); // solo si existe esta función
    }

    function togglePrices(location) {
        console.log("Toggle precios para: " + location);
        // Aquí iría la lógica de visibilidad de precios si aplica
    }

    function showMap(location) {
        const mapaSgo = document.getElementById("mapaSgo");
        const mapaJujuy = document.getElementById("mapaJujuy");
        if (location === "sgo") {
            mapaSgo.style.display = "block";
            mapaJujuy.style.display = "none";
        } else {
            mapaSgo.style.display = "none";
            mapaJujuy.style.display = "block";
        }
    }

    function updateContactLinks(location) {
        const links = document.querySelectorAll(".contact-link");
        links.forEach((link) => {
            const sgoUrl = link.getAttribute("data-sgo");
            const jujuyUrl = link.getAttribute("data-jujuy");
            link.href = location === "sgo" ? sgoUrl : jujuyUrl;
        });
    }

    function sendLocationToGoogleApps(location) {
        fetch("https://script.google.com/macros/s/AKfycbxWRKSjAR5MymL0OGeh0JZxTkUfJqxm19FDzfOPN_pInhVXf9pXQQACjpgGxE9E7GUyUw/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ location: location }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la solicitud: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Respuesta del servidor:", data);
            })
            .catch((error) => {
                console.error("Error al enviar la ubicación:", error);
            });
    }
});
