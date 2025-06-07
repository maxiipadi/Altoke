document.addEventListener('DOMContentLoaded', () => {
    // Mapeo de provincias y municipios por país
    const provinciasPorPais = {
        Argentina: {
            "Buenos Aires": ["La Plata", "Mar del Plata", "Bahía Blanca"],
            "Córdoba": ["Córdoba Capital", "Villa Carlos Paz", "Río Cuarto"],
            "Santiago del Estero": ["Santiago Capital", "La Banda", "Termas de Río Hondo"]
        }
    };

    // Elementos del DOM
    const paisSelect = document.getElementById('pais');
    const provinciaSelect = document.getElementById('provincia');
    const municipioSelect = document.getElementById('municipio');
    const fechaInput = document.getElementById('fechaNacimiento');
    const checkboxes = document.querySelectorAll('input[name="intereses"]');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnFormSiguiente = document.getElementById('btn-siguiente');
    const paso1 = document.getElementById('paso1');
    const paso2 = document.getElementById('paso2');

    // Lógica de país → provincias
    paisSelect.addEventListener('change', function () {
        const pais = this.value;
        provinciaSelect.innerHTML = '<option value="" disabled selected>Seleccioná una provincia</option>';
        municipioSelect.innerHTML = '<option value="" disabled selected>Seleccioná un municipio</option>';
        municipioSelect.disabled = true;

        if (provinciasPorPais[pais]) {
            provinciaSelect.disabled = false;
            Object.keys(provinciasPorPais[pais]).forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia;
                option.textContent = provincia;
                provinciaSelect.appendChild(option);
            });
        } else {
            provinciaSelect.disabled = true;
        }
    });

    // Lógica de provincia → municipios
    provinciaSelect.addEventListener('change', function () {
        const pais = paisSelect.value;
        const provincia = this.value;

        municipioSelect.innerHTML = '<option value="" disabled selected>Seleccioná un municipio</option>';

        if (provinciasPorPais[pais] && provinciasPorPais[pais][provincia]) {
            municipioSelect.disabled = false;
            provinciasPorPais[pais][provincia].forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio;
                option.textContent = municipio;
                municipioSelect.appendChild(option);
            });
        } else {
            municipioSelect.disabled = true;
        }
    });

    // Formateo automático de fecha
    fechaInput.addEventListener('input', function (e) {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length >= 3 && input.length <= 4) {
            input = input.slice(0, 2) + '/' + input.slice(2);
        } else if (input.length > 4) {
            input = input.slice(0, 2) + '/' + input.slice(2, 4) + '/' + input.slice(4, 8);
        }
        e.target.value = input;
    });

    // Validar que al menos un interés esté seleccionado
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const algunoMarcado = Array.from(checkboxes).some(c => c.checked);
            btnSiguiente.disabled = !algunoMarcado;
        });
    });

    // Ir al paso 2 desde formulario de paso 1
    document.getElementById('registroForm').addEventListener('submit', (e) => {
        e.preventDefault();
        mostrarPaso2();
    });

    // Enviar formulario de intereses
    document.getElementById('interesesForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Formulario completado. Gracias por registrarte en el DNI Cultural.");
        // Aquí iría el código para enviar al backend
    });

    // Botones "Siguiente" y "Anterior"
    btnFormSiguiente.addEventListener('click', () => mostrarPaso2());
    btnAnterior.addEventListener('click', () => mostrarPaso1());

    // Mostrar paso 1 al inicio
    mostrarPaso1();

    // Funciones para mostrar pasos
    function mostrarPaso1() {
        paso1.classList.add('active');
        paso2.classList.remove('active');
    }

    function mostrarPaso2() {
        paso1.classList.remove('active');
        paso2.classList.add('active');
    }
});
