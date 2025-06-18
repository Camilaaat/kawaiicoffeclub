document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token"); // Busca el token JWT

  if (token) {
    const adminLinkContainer = document.getElementById("adminLinkContainer");
    const nav = document.querySelector("nav ul");

    if (adminLinkContainer && nav) {
      // Limpio el contenido para evitar duplicados
      adminLinkContainer.innerHTML = "";

      // Creo el link al panel admin con la ruta correcta
      const adminLink = document.createElement("a");
      adminLink.href = "pages/admin/admin.html";  // <-- Ruta correcta sin / al principio
      adminLink.textContent = "Panel Admin";
      adminLinkContainer.appendChild(adminLink);

      // Creo botón Cerrar sesión en un <li> nuevo y lo agrego al nav
      const logoutLi = document.createElement("li");
      const logoutBtn = document.createElement("button");
      logoutBtn.textContent = "Cerrar sesión";
      logoutBtn.id = "logoutBtn";
      logoutBtn.style.cursor = "pointer";
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token"); // Elimina token
        window.location.href = "login.html"; // Ruta relativa al login
      });
      logoutLi.appendChild(logoutBtn);
      nav.appendChild(logoutLi);
    }
  }
});
