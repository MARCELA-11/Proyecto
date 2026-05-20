// A. Interactividad del Menú Hamburguesa
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Una interacción simple con el DOM para móviles
if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
    });
}

// B. Validación del Formulario
const form = document.getElementById('reservation-form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar envío automático
    
    let isValid = true;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Limpiar errores previos
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';

    // Validar nombre (no vacío y mínimo 3 caracteres)
    if (name.trim().length < 3) {
        document.getElementById('name-error').textContent = 'Por favor, ingresa un nombre válido.';
        isValid = false;
    }

    // Validar email con Regex simple
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = 'Ingresa un formato de correo correcto.';
        isValid = false;
    }

    if (isValid) {
        alert('¡Gracias por tu reserva, ' + name + '! Te contactaremos pronto.');
        form.reset(); // Limpiar el formulario
    }
});