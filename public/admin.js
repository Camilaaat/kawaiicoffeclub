document.addEventListener("DOMContentLoaded", () => {
  // --- TABS ---
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // --- MODALES ---
  function setupModal(btnId, modalId, closeSelector) {
    const openBtn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    const closeBtn = modal.querySelector(closeSelector);

    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  setupModal("addTareaBtn", "tareaModal", ".close-btn");
  setupModal("addSuscriptorBtn", "suscriptorModal", ".close-btn");
  setupModal("addInteresBtn", "interesModal", ".close-btn");
  setupModal("addContactoBtn", "contactoModal", ".close-btn");
  setupModal("addFotoBtn", "fotoModal", ".close-btn");

  // --- VISTA PREVIA IMAGEN ---
  const imagenFoto = document.getElementById("imagenFoto");
  const previewContainer = document.getElementById("previewContainer");
  const imagePreview = document.getElementById("imagePreview");

  if (imagenFoto) {
    imagenFoto.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          previewContainer.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // --- BOTÓN CERRAR SESIÓN ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Borra el token si lo usás
      localStorage.removeItem("token");
      window.location.href = "index.html"; // O login.html
    });
  }

  // --- FORMULARIOS (guardar datos - ejemplo local temporal o API) ---
  const tareaForm = document.getElementById("tareaForm");
  tareaForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const tarea = document.getElementById("tarea").value;

    // Aquí podrías hacer fetch a tu backend para guardar la tarea
    // Ejemplo local:
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
      <td>--</td>
      <td>${tarea}</td>
      <td><button class="delete-btn">Eliminar</button></td>
    `;
    document.getElementById("tareasTableBody").appendChild(nuevaFila);
    tareaForm.reset();
    document.getElementById("tareaModal").style.display = "none";
  });

  // Agregá lógica similar para los demás formularios (suscriptores, intereses, etc.)
});
