const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;  
    const password = e.target.password.value;  
    
    try {
        const res = await fetch("http://localhost:3000/auth/login", {  // RUTA CORREGIDA
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, 
                password,
            })
        });

        const resJson = await res.json();

        if (!res.ok) {
            mensajeError.classList.toggle("invisible_visible", false);
            mensajeError.textContent = resJson.error || "Error al iniciar sesión";
            return;
        }

        if (resJson.token) {
            localStorage.setItem("token", resJson.token);
            window.location.href = resJson.redirect || "admin.html";
        }

    } catch (error) {
        console.error("Error en la solicitud:", error);
        mensajeError.textContent = "Error de conexión con el servidor";
    }
});
