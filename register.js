document.getElementById("register-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            alert("Usuario registrado correctamente");
            window.location.href = "/login.html"; // redirigir al login
        } else {
            alert(data.error || "Error al registrar");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión");
    }
});
