// static/js/darkmode.js (con animación y lógica de iconos CORREGIDA)

document.addEventListener("DOMContentLoaded", function () {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // Función corregida: ahora muestra el icono del estado actual.
    function applyThemeClasses(theme) {
        const icon = themeSwitcher.querySelector('i'); // Buscamos el icono

        if (theme === 'dark') {
            // Si el tema es OSCURO, mostramos el icono de la LUNA
            body.classList.add('dark-mode');
            icon.classList.remove('fa-sun');   // Quitamos el sol
            icon.classList.add('fa-moon');  // Ponemos la luna
        } else {
            // Si el tema es CLARO, mostramos el icono del SOL
            body.classList.remove('dark-mode');
            icon.classList.remove('fa-moon'); // Quitamos la luna
            icon.classList.add('fa-sun');   // Ponemos el sol
        }
    }

    // Al cargar la página, creamos el icono inicial
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        // Creamos el elemento <i> por primera vez
        const initialIcon = document.createElement('i');
        initialIcon.classList.add('fa-solid');
        themeSwitcher.appendChild(initialIcon);
        
        applyThemeClasses(savedTheme); // Aplicamos las clases correctas al icono y al body
    }

    initializeTheme(); // Llamamos a la función de inicialización

    // El event listener no cambia, su lógica sigue siendo correcta.
    themeSwitcher.addEventListener('click', () => {
        const icon = themeSwitcher.querySelector('i');

        if (icon.classList.contains('is-changing')) {
            return;
        }

        const isDarkMode = body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';

        icon.classList.add('is-changing');
        
        setTimeout(() => {
            applyThemeClasses(newTheme);
            localStorage.setItem('theme', newTheme);
        }, 300);

        icon.addEventListener('animationend', () => {
            icon.classList.remove('is-changing');
        }, { once: true });
    });
});