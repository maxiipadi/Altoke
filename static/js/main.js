document.addEventListener("DOMContentLoaded", function () {
    
    // =================================================================
    //  1. FUENTE ÚNICA DE VERDAD (Single Source of Truth)
    //  Toda la información de contacto en un solo lugar.
    //  Si un link cambia, lo modificás ACÁ y listo.
    // =================================================================
    const contactData = {
        sgo: {
            whatsapp: "https://wa.me/5493854992929",
            facebook: "https://www.facebook.com/altokeservtec/",
            instagram: "#", // Link de SGO o general si no hay
            tiktok: "#"      // Link de SGO o general si no hay
        },
        jujuy: {
            whatsapp: "https://wa.me/5493885238366",
            facebook: "https://www.facebook.com/profile.php?id=100065417592160",
            instagram: "https://www.instagram.com/l_toke.serviciotecnico/",
            tiktok: "https://www.tiktok.com/@al.toke.serviciotecnico"
        }
    };

    // =================================================================
    //  2. LÓGICA DE UBICACIÓN (Reemplaza el Modal)
    // =================================================================
    const locationSelector = document.getElementById('location-selector');
    const mainContentContainer = document.getElementById('main-content-container');
    const sgoButton = document.getElementById('sgoButton');
    const jujuyButton = document.getElementById('jujuyButton');

    sgoButton.addEventListener('click', () => setLocation('sgo'));
    jujuyButton.addEventListener('click', () => setLocation('jujuy'));

    function setLocation(location) {
        // Actualiza todos los links de la página
        updateContactLinks(location);
        // Muestra el mapa correcto
        showMap(location);
        // Actualiza el texto en el header
        updateHeaderText(location);
        // Oculta el selector y muestra el contenido principal
        locationSelector.style.display = 'none';
        mainContentContainer.style.display = 'block';
        // Envía la data a Google (tu función)
        sendLocationToGoogleApps(location === 'sgo' ? 'Santiago del Estero' : 'Jujuy');
    }

    function updateContactLinks(location) {
        const locationData = contactData[location];
        document.querySelectorAll('.contact-link').forEach(link => {
            if (link.id.includes('whatsapp')) link.href = locationData.whatsapp;
            if (link.id.includes('facebook')) link.href = locationData.facebook;
            if (link.id.includes('instagram')) link.href = locationData.instagram;
            if (link.id.includes('tiktok')) link.href = locationData.tiktok;
        });
    }

    function showMap(location) {
        document.getElementById('mapaSgo').style.display = location === 'sgo' ? 'block' : 'none';
        document.getElementById('mapaJujuy').style.display = location === 'jujuy' ? 'block' : 'none';
    }

    function updateHeaderText(location) {
        const textoLocalizacion = document.querySelector('.texto-localizacion');
        textoLocalizacion.textContent = location === 'sgo' ? 'Santiago del Estero, Capital' : 'Palpalá, Jujuy';
    }

    function sendLocationToGoogleApps(locationName) {
        fetch("https://script.google.com/macros/s/AKfycbxWRKSjAR5MymL0OGeh0JZxTkUfJqxm19FDzfOPN_pInhVXf9pXQQACjpgGxE9E7GUyUw/exec", {
            method: "POST",
            body: JSON.stringify({ location: locationName })
        }).then(response => response.json())
          .then(data => console.log("Visita registrada:", data))
          .catch(error => console.error("Error al registrar visita:", error));
    }


    // =================================================================
    //  3. LÓGICA DE INTERFAZ (Acordeones, Scroll, etc.)
    //  (Tu código original, funciona perfecto)
    // =================================================================

    // Acordeón de Servicios
    document.querySelectorAll('.servicio-titulo').forEach(titulo => {
        titulo.addEventListener('click', () => {
            const detalles = titulo.nextElementSibling;
            detalles.style.maxHeight = !detalles.style.maxHeight || detalles.style.maxHeight === "0px" ? detalles.scrollHeight + "px" : "0px";
        });
    });

    // Acordeón de FAQs
    document.querySelectorAll(".faq-question").forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + "px";
        });
    });
    
    // Botón "Subir arriba"
    const scrollToTopButton = document.getElementById("scrollToTop");
    window.addEventListener("scroll", () => {
        scrollToTopButton.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";
    });
    
    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
