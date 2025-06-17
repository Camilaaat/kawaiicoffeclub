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

  // --- CERRAR SESIÓN ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }

  // --- FORMULARIOS ---

  // Formulario Tareas
  const tareaForm = document.getElementById("tareaForm");
  tareaForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const tarea = document.getElementById("tarea").value;

    fetch('http://localhost:3000/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tarea })
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al guardar la tarea');
      return res.json();
    })
    .then(() => {
      tareaForm.reset();
      document.getElementById("tareaModal").style.display = "none";
      cargarTareas();
    })
    .catch(err => alert(err.message));
  });

  // Formulario Suscriptores
const suscriptorForm = document.getElementById("suscriptorForm");

suscriptorForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreSuscriptor").value.trim();
  const email = document.getElementById("emailSuscriptor").value.trim();
  const fecha_nacimiento = document.getElementById("fechaNacimiento").value;
  const acepto_promociones = document.getElementById("aceptoPromociones").checked;
  const acepto_terminos = document.getElementById("aceptoTerminos").checked;

  fetch('http://localhost:3000/suscriptores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, fecha_nacimiento, acepto_promociones, acepto_terminos })
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al guardar el suscriptor');
    return res.json();
  })
  .then(() => {
    suscriptorForm.reset();
    document.getElementById("suscriptorModal").style.display = "none";
    cargarSuscriptores();
  })
  .catch(err => alert(err.message));
});


  // Formulario Intereses
  document.addEventListener("DOMContentLoaded", () => {
  function cargarSuscriptoresEnSelect() {
    fetch('http://localhost:3000/suscriptores')
      .then(res => res.json())
      .then(data => {
        const select = document.getElementById("suscriptorIdInteres");
        select.innerHTML = "";
        data.forEach(suscriptor => {
          const option = document.createElement("option");
          option.value = suscriptor.id;   // Acá el ID
          option.textContent = suscriptor.nombre;
          select.appendChild(option);
        });
      });
  }

  cargarSuscriptoresEnSelect();

  const interesForm = document.getElementById("interesForm");
  interesForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const suscriptor_id = document.getElementById("suscriptorIdInteres").value;
    const interes = document.getElementById("interes").value;

    fetch('http://localhost:3000/intereses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ suscriptor_id, interes })
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al guardar el interés');
      return res.json();
    })
    .then(() => {
      interesForm.reset();
      document.getElementById("interesModal").style.display = "none";
      cargarIntereses();
    })
    .catch(err => alert(err.message));
  });
});

  // Formulario Contactos
  const contactoForm = document.getElementById("contactoForm");
  contactoForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombreContacto").value;
    const email = document.getElementById("emailContacto").value;
    const telefono = document.getElementById("telefonoContacto").value;
    const asunto = document.getElementById("asuntoContacto").value;
    const fecha = document.getElementById("fechaContacto").value;

    fetch('http://localhost:3000/contactos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, telefono, asunto, fecha })
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al guardar el contacto');
      return res.json();
    })
    .then(() => {
      contactoForm.reset();
      document.getElementById("contactoModal").style.display = "none";
      cargarContactos();
    })
    .catch(err => alert(err.message));
  });

  // Formulario Fotos Clientes
  const fotoForm = document.getElementById("fotoForm");
  fotoForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    // Suponiendo que subís la imagen como URL (si usás file upload necesitás otro manejo)
    const nombre = document.getElementById("nombreFoto").value;
    const imagen_url = document.getElementById("imagenUrl").value;

    fetch('http://localhost:3000/fotosclientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, imagen_url })
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al guardar la foto');
      return res.json();
    })
    .then(() => {
      fotoForm.reset();
      document.getElementById("fotoModal").style.display = "none";
      cargarFotos();
    })
    .catch(err => alert(err.message));
  });

  // --- CARGAR DATOS ---
  cargarTareas();
  cargarSuscriptores();
  cargarIntereses();
  cargarContactos();
  cargarFotos();
});

// --- FUNCIONES PARA CARGAR DESDE LA API ---

function cargarTareas() {
  fetch('http://localhost:3000/tareas')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("tareasTableBody");
      tbody.innerHTML = "";
      data.forEach(tarea => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${tarea.id}</td>
          <td>${tarea.tarea}</td>
          <td>
            <button class="edit-btn" data-id="${tarea.id}">Editar</button>
            <button class="delete-btn" data-id="${tarea.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
}

function cargarSuscriptores() {
  fetch('http://localhost:3000/suscriptores')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("suscriptoresTableBody");
      tbody.innerHTML = "";
      data.forEach(suscriptor => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${suscriptor.id}</td>
          <td>${suscriptor.nombre}</td>
          <td>${suscriptor.email}</td>
          <td>${suscriptor.fecha_nacimiento}</td>
          <td>${suscriptor.acepta_promociones ? 'Sí' : 'No'}</td>
          <td>${suscriptor.fecha_suscripcion}</td>
          <td>
            <button class="edit-btn" data-id="${suscriptor.id}">Editar</button>
            <button class="delete-btn" data-id="${suscriptor.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
}

// Cargar intereses desde la API y mostrarlos en la tabla
function cargarIntereses() {
  fetch('http://localhost:3000/intereses')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("interesesTableBody");
      tbody.innerHTML = "";
      data.forEach(interes => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${interes.id}</td>
          <td>${interes.nombre_suscriptor}</td>
          <td>${interes.interes}</td>
          <td>
            <button class="edit-btn" data-id="${interes.id}">Editar</button>
            <button class="delete-btn" data-id="${interes.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
}

// Cargar opciones de suscriptores para el select del formulario de intereses
function cargarSuscriptoresParaIntereses() {
  fetch('http://localhost:3000/suscriptores')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("suscriptorIdInteres");
      select.innerHTML = "";
      data.forEach(suscriptor => {
        const option = document.createElement("option");
        option.value = suscriptor.id;
        option.textContent = suscriptor.nombre;
        select.appendChild(option);
      });
    });
}

// Evento submit para agregar un interés
const interesForm = document.getElementById("interesForm");
interesForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const suscriptor_id = document.getElementById("suscriptorIdInteres").value;
  const interes = document.getElementById("interes").value;

  fetch('http://localhost:3000/intereses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ suscriptor_id, interes })
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al guardar el interés');
    return res.json();
  })
  .then(() => {
    interesForm.reset();
    document.getElementById("interesModal").style.display = "none";
    cargarIntereses();
  })
  .catch(err => alert(err.message));
});

// Al cargar la página o script, cargar opciones y tabla
document.addEventListener("DOMContentLoaded", () => {
  cargarSuscriptoresParaIntereses();
  cargarIntereses();
});


// Cargar contactos desde la API y mostrar en la tabla
const contactoForm = document.getElementById("contactoForm");

contactoForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreContacto").value;
  const email = document.getElementById("emailContacto").value;
  const telefono = document.getElementById("telefonoContacto").value;
  const asunto = document.getElementById("asuntoContacto").value;
  const mensaje = document.getElementById("mensajeContacto").value;
  const preferencia_contacto = document.getElementById("preferenciaContacto").value;
  const acepto_promociones = document.getElementById("aceptoPromocionesContacto").checked;

  fetch('http://localhost:3000/contactos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre,
      email,
      telefono,
      asunto,
      mensaje,
      preferencia_contacto,
      acepto_promociones
      // Fecha idealmente la genera el backend, si querés podés agregar un campo para enviar
    })
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al guardar el contacto');
    return res.json();
  })
  .then(() => {
    contactoForm.reset();
    document.getElementById("contactoModal").style.display = "none";
    cargarContactos();
  })
  .catch(err => alert(err.message));
});

function cargarContactos() {
  fetch('http://localhost:3000/contactos')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("contactosTableBody");
      tbody.innerHTML = "";
      data.forEach(contacto => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${contacto.id}</td>
          <td>${contacto.nombre}</td>
          <td>${contacto.email}</td>
          <td>${contacto.telefono}</td>
          <td>${contacto.asunto}</td>
          <td>${contacto.fecha ? new Date(contacto.fecha).toLocaleDateString() : ''}</td>
          <td>
            <button class="edit-btn" data-id="${contacto.id}">Editar</button>
            <button class="delete-btn" data-id="${contacto.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarContactos();
});



// Formulario para agregar fotos
// Cargar fotos de clientes y mostrarlas en la tabla
function cargarFotos() {
  fetch('http://localhost:3000/fotosclientes')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("fotosTableBody");
      tbody.innerHTML = "";
      data.forEach(foto => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${foto.id}</td>
          <td>${foto.nombre}</td>
          <td><img src="${foto.imagen_url}" alt="${foto.nombre}" style="max-width: 100px;"></td>
          <td>${foto.fecha_subida ?? ''}</td>
          <td>
            <button class="edit-btn" data-id="${foto.id}">Editar</button>
            <button class="delete-btn" data-id="${foto.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
}

// Evento submit para agregar foto de cliente con FormData (envío archivo)
const fotoForm = document.getElementById("fotoForm");

fotoForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  // Crear FormData a partir del formulario (incluye archivo y campos)
  const formData = new FormData(fotoForm);

  fetch("http://localhost:3000/fotosclientes", {
    method: "POST",
    body: formData, // IMPORTANTE: no seteamos headers para que fetch lo maneje automáticamente
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar la foto");
      return res.json();
    })
    .then(() => {
      fotoForm.reset();
      document.getElementById("fotoModal").style.display = "none";
      cargarFotos();  // Recarga la tabla con las fotos actualizadas
    })
    .catch(err => alert(err.message));
});

// Opcional: vista previa de la imagen antes de subir
const inputImagen = document.getElementById("imagenFoto");
const previewContainer = document.getElementById("previewContainer");
const imagePreview = document.getElementById("imagePreview");

inputImagen.addEventListener("change", () => {
  const file = inputImagen.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      imagePreview.src = e.target.result;
      previewContainer.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    previewContainer.style.display = "none";
    imagePreview.src = "/placeholder.svg";
  }
});

// Cargar fotos al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarFotos();
});


document.addEventListener("DOMContentLoaded", () => {
  cargarSuscriptoresEnSelect();
});

