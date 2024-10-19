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

    // Código para el acordeón de FAQs
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
    const catrielButton = document.getElementById('catrielButton');

    // Mostrar el modal al cargar la página
    modal.style.display = 'block';

    // Selección de Santiago del Estero
    sgoButton.addEventListener('click', function() {
        console.log("Santiago del Estero seleccionado"); // Debugging
        modal.style.display = 'none';
        togglePrices('sgo');
        updateContactLinks('sgo');
        sendLocationToGoogleApps('Santiago del Estero');
        showMap('sgo');
        mostrarImagenes('sgo'); // Asegúrate de llamar a mostrarImagenes aquí
    });

    function togglePrices(location) {
        // Aquí puedes implementar la lógica para mostrar u ocultar precios
        console.log("Toggle precios para: " + location);
        // Implementa la lógica necesaria aquí
    }
    
    jujuyButton.addEventListener('click', function() {
        console.log("Jujuy seleccionado"); // Debugging
        modal.style.display = 'none';
        togglePrices('jujuy');
        updateContactLinks('jujuy');
        sendLocationToGoogleApps('Jujuy');
        showMap('jujuy');
    });

    catrielButton.addEventListener('click', function() {
        console.log("Catriel seleccionado"); // Debugging
        modal.style.display = 'none';
        togglePrices('catriel');
        updateContactLinks('catriel');
        sendLocationToGoogleApps('Catriel');
        showMap('catriel');
    });
    

    // Función para mostrar el mapa correspondiente
    function showMap(location) {
        const mapaSgo = document.getElementById('mapaSgo');
        const mapaJujuy = document.getElementById('mapaJujuy');
        const textoLocalizacion = document.querySelector('.texto-localizacion');

        // Muestra el mapa correspondiente según la ubicación
        if (location === 'sgo') {
            mapaSgo.style.display = 'block';
            mapaJujuy.style.display = 'none';
            textoLocalizacion.textContent = 'Santiago del Estero, Capital'; // Actualiza el texto
        } else if (location === 'jujuy') {
            mapaSgo.style.display = 'none';
            mapaJujuy.style.display = 'block';
            textoLocalizacion.textContent = 'Palpalá, Jujuy'; // Actualiza el texto
        } else if (location === 'catriel') {
            mapaSgo.style.display = 'none';
            mapaJujuy.style.display = 'none'; // Si hay mapa específico para Catriel, ajústalo aquí
            textoLocalizacion.textContent = 'Catriel, Río Negro'; // Actualiza el texto
        }
    }

    // Función para actualizar los enlaces de contacto
    function updateContactLinks(location) {
        const links = document.querySelectorAll('.contact-link');

        links.forEach(link => {
            const sgoUrl = link.getAttribute('data-sgo');
            const jujuyUrl = link.getAttribute('data-jujuy');
            const catrielUrl = link.getAttribute('data-catriel');

            // Cambia el href según la ubicación
            if (location === 'sgo') {
                link.href = sgoUrl;
            } else if (location === 'jujuy') {
                link.href = jujuyUrl;
            } else if (location === 'catriel') {
                link.href = catrielUrl;
            }
        });
    }

    // Función para enviar la ubicación al Google Apps Script
    function sendLocationToGoogleApps(location) {
        fetch("https://script.google.com/macros/s/AKfycbxWRKSjAR5MymL0OGeh0JZxTkUfJqxm19FDzfOPN_pInhVXf9pXQQACjpgGxE9E7GUyUw/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ location: location }) // Enviando la ubicación seleccionada
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.statusText);
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            console.log("Respuesta del servidor:", data); // Manejar la respuesta
        })
        .catch(error => {
            console.error("Error al enviar la ubicación:", error); // Manejar errores
        });
    }
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

    // Función para mostrar el mapa correspondiente
function showMap(location) {
    const mapaSgo = document.getElementById('mapaSgo');
    const mapaJujuy = document.getElementById('mapaJujuy');
    const textoLocalizacion = document.querySelector('.texto-localizacion');

    // Muestra el mapa correspondiente según la ubicación
    if (location === 'sgo') {
        mapaSgo.style.display = 'block';
        mapaJujuy.style.display = 'none';
        textoLocalizacion.textContent = 'Santiago del Estero, Capital'; // Actualiza el texto
    } else {
        mapaSgo.style.display = 'none';
        mapaJujuy.style.display = 'block';
        textoLocalizacion.textContent = 'Palpalá, Jujuy'; // Actualiza el texto
    }
}



});
