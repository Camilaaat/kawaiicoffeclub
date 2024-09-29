document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form'); 
    const message = document.querySelector('.mensaje-aceptacion'); 
    // Maneja el evento de envío del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const fecha = document.getElementById('fecha').value;
        const intereses = Array.from(document.querySelectorAll('input[name="intereses"]:checked')).map(checkbox => checkbox.value);
        const aceptaPromociones = document.querySelector('input[name="acepto-promociones"]:checked').value;
        const aceptaTerminos = document.querySelector('input[name="acepto-terminos"]:checked').value;

        const subscriberData = {
            nombre,
            email,
            fecha,
            intereses,
            aceptaPromociones,
            aceptaTerminos
        };

        localStorage.setItem('subscriberData', JSON.stringify(subscriberData));


        message.innerHTML = `<p>¡Gracias por suscribirte, ${nombre}! Tu información ha sido guardada.</p>`;
        form.reset();
    });
});
