// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los enlaces que comienzan con #
    const links = document.querySelectorAll('nav ul li a[href^="#"]');

    // Agrega un evento de clic a cada enlace
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace

            // Obtiene la sección a la que se quiere desplazar
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Desplaza suavemente a la sección
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Código para el acordeón
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;

            // Alternar la visibilidad de la respuesta
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null; // Colapsa la respuesta
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px"; // Expande la respuesta
            }
        });
    });
});

// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Código previo...

    // Botón de "Subir arriba"
    const scrollToTopButton = document.getElementById("scrollToTop");

    // Mostrar u ocultar el botón según la posición de desplazamiento
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopButton.style.display = "block"; // Mostrar el botón
        } else {
            scrollToTopButton.style.display = "none"; // Ocultar el botón
        }
    };

    // Función para desplazarse hacia arriba al hacer clic en el botón
    scrollToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Desplazamiento suave
        });
    });
});

