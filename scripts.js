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
});
