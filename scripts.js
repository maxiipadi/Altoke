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

    // Lógica para mostrar la ubicación
    const modal = document.getElementById('locationModal');
    const sgoButton = document.getElementById('sgoButton');
    const jujuyButton = document.getElementById('jujuyButton');

    // Mostrar el modal al cargar la página
    modal.style.display = 'block';

    // Selección de Santiago del Estero
    sgoButton.addEventListener('click', function() {
        modal.style.display = 'none';
        togglePrices('sgo');
        updateContactLinks('sgo'); // Actualiza enlaces para Santiago del Estero
    });

    // Selección de Jujuy
    jujuyButton.addEventListener('click', function() {
        modal.style.display = 'none';
        togglePrices('jujuy');
        updateContactLinks('jujuy'); // Actualiza enlaces para Jujuy
    });

    // Función para mostrar los precios correspondientes
    function togglePrices(location) {
        const precioSgoElements = document.querySelectorAll('.precio-sgo');
        const precioJujuyElements = document.querySelectorAll('.precio-jujuy');

        if (location === 'sgo') {
            precioSgoElements.forEach(el => el.style.display = 'inline');
            precioJujuyElements.forEach(el => el.style.display = 'none');
        } else {
            precioSgoElements.forEach(el => el.style.display = 'none');
            precioJujuyElements.forEach(el => el.style.display = 'inline');
        }
    }

    // Función para actualizar los enlaces de contacto
    function updateContactLinks(location) {
        const links = document.querySelectorAll('.contact-link');

        links.forEach(link => {
            const sgoUrl = link.getAttribute('data-sgo');
            const jujuyUrl = link.getAttribute('data-jujuy');

            // Cambia el href según la ubicación
            if (location === 'sgo') {
                link.href = sgoUrl;
            } else {
                link.href = jujuyUrl;
            }
        });
    }
});
