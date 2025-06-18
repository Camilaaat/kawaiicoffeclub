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

// Formulario TAREAS
const tareaForm = document.getElementById("tareaForm");
let tareaEditandoId = null; // para saber si estamos editando

tareaForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const tarea = document.getElementById("tarea").value;

  let url = 'http://localhost:3000/tareas';
  let method = 'POST';
  if (tareaEditandoId) {
    url += `/${tareaEditandoId}`;
    method = 'PUT';
  }

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tarea })
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al guardar la tarea');
    return res.json();
  })
  .then(() => {
    tareaForm.reset();
    tareaEditandoId = null;
    document.getElementById("tareaModal").style.display = "none";
    cargarTareas();
  })
  .catch(err => alert(err.message));
});

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
            <button class="edit-btn" data-id="${tarea.id}" data-tarea="${tarea.tarea}">Editar</button>
            <button class="delete-btn" data-id="${tarea.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Botones Editar
      document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.onclick = (e) => {
          const id = e.target.dataset.id;
          const tareaTexto = e.target.dataset.tarea;
          document.getElementById("tarea").value = tareaTexto;
          tareaEditandoId = id;
          document.getElementById("tareaModal").style.display = "block";
        };
      });

      // Botones Eliminar
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.onclick = (e) => {
          const id = e.target.dataset.id;
          if (confirm("¿Querés eliminar esta tarea?")) {
            fetch(`http://localhost:3000/tareas/${id}`, { method: 'DELETE' })
              .then(res => {
                if (!res.ok) throw new Error('Error al eliminar la tarea');
                cargarTareas();
              })
              .catch(err => alert(err.message));
          }
        };
      });
    });
}

// Cargar tareas al iniciar
document.addEventListener("DOMContentLoaded", cargarTareas);


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

//FORMULARIO SUSCRIPTORES
// Formulario Suscriptores
const suscriptorForm = document.getElementById("suscriptorForm");
let suscriptorEditandoId = null;

suscriptorForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreSuscriptor").value.trim();
  const email = document.getElementById("emailSuscriptor").value.trim();
  const fecha_nacimiento = document.getElementById("fechaNacimiento").value;
  const acepto_promociones = document.getElementById("aceptoPromociones").checked;
  const acepto_terminos = document.getElementById("aceptoTerminos").checked;

  let url = 'http://localhost:3000/suscriptores';
  let method = 'POST';
  if (suscriptorEditandoId) {
    url += `/${suscriptorEditandoId}`;
    method = 'PUT';
  }

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, fecha_nacimiento, acepto_promociones, acepto_terminos })
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al guardar el suscriptor');
    return res.json();
  })
  .then(() => {
    suscriptorForm.reset();
    suscriptorEditandoId = null;
    document.getElementById("suscriptorModal").style.display = "none";
    cargarSuscriptores();
  })
  .catch(err => alert(err.message));
});

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
          <td>${suscriptor.acepto_promociones ? "Sí" : "No"}</td>
          <td>${suscriptor.acepto_terminos ? "Sí" : "No"}</td>
          <td>
            <button class="edit-btn" data-id="${suscriptor.id}" data-nombre="${suscriptor.nombre}" data-email="${suscriptor.email}" data-fecha="${suscriptor.fecha_nacimiento}" data-promociones="${suscriptor.acepto_promociones}" data-terminos="${suscriptor.acepto_terminos}">Editar</button>
            <button class="delete-btn" data-id="${suscriptor.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Botones Editar
      document.querySelectorAll("#suscriptoresTableBody .edit-btn").forEach(btn => {
        btn.onclick = (e) => {
          const el = e.target;
          suscriptorEditandoId = el.dataset.id;
          document.getElementById("nombreSuscriptor").value = el.dataset.nombre;
          document.getElementById("emailSuscriptor").value = el.dataset.email;
          document.getElementById("fechaNacimiento").value = el.dataset.fecha;
          document.getElementById("aceptoPromociones").checked = (el.dataset.promociones === "true");
          document.getElementById("aceptoTerminos").checked = (el.dataset.terminos === "true");
          document.getElementById("suscriptorModal").style.display = "block";
        };
      });

      // Botones Eliminar
      document.querySelectorAll("#suscriptoresTableBody .delete-btn").forEach(btn => {
        btn.onclick = (e) => {
          const id = e.target.dataset.id;
          if (confirm("¿Querés eliminar este suscriptor?")) {
            fetch(`http://localhost:3000/suscriptores/${id}`, { method: 'DELETE' })
              .then(res => {
                if (!res.ok) throw new Error('Error al eliminar el suscriptor');
                cargarSuscriptores();
              })
              .catch(err => alert(err.message));
          }
        };
      });
    });
}

// Cargar suscriptores al iniciar
document.addEventListener("DOMContentLoaded", cargarSuscriptores);


// Cargar intereses desde la API y mostrarlos en la tabla
let interesEditandoId = null;

// Función para cargar intereses en la tabla
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
            <button class="edit-btn" 
              data-id="${interes.id}"
              data-suscriptor_id="${interes.suscriptor_id}"
              data-interes="${interes.interes}"
            >Editar</button>
            <button class="delete-btn" data-id="${interes.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Botones Editar
      document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.onclick = (e) => {
          const el = e.target;
          interesEditandoId = el.dataset.id;

          // Cargar datos en formulario
          document.getElementById("suscriptorIdInteres").value = el.dataset.suscriptor_id;
          document.getElementById("interes").value = el.dataset.interes;

          document.getElementById("interesModal").style.display = "block";
        };
      });

      // Botones Eliminar
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.onclick = (e) => {
          const id = e.target.dataset.id;
          if (confirm("¿Querés eliminar este interés?")) {
            fetch(`http://localhost:3000/intereses/${id}`, { method: 'DELETE' })
              .then(res => {
                if (!res.ok) throw new Error('Error al eliminar el interés');
                cargarIntereses();
              })
              .catch(err => alert(err.message));
          }
        };
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

// Evento submit para agregar o editar un interés
const interesForm = document.getElementById("interesForm");
interesForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const suscriptor_id = document.getElementById("suscriptorIdInteres").value;
  const interes = document.getElementById("interes").value.trim();

  if (!interes) return alert("El interés no puede estar vacío");

  let url = 'http://localhost:3000/intereses';
  let method = 'POST';
  if (interesEditandoId) {
    url += `/${interesEditandoId}`;
    method = 'PUT';
  }

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ suscriptor_id, interes })
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al guardar el interés');
    return res.json();
  })
  .then(() => {
    interesForm.reset();
    interesEditandoId = null;
    document.getElementById("interesModal").style.display = "none";
    cargarIntereses();
  })
  .catch(err => alert(err.message));
});

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarSuscriptoresParaIntereses();
  cargarIntereses();
});


//FORMULARIO CONTACTOS
let contactoEditandoId = null;

const contactoForm = document.getElementById("contactoForm");
const contactoModal = document.getElementById("contactoModal");
const btnAddContacto = document.getElementById("addContactoBtn");

// Abrir modal para agregar contacto nuevo
btnAddContacto?.addEventListener("click", () => {
  contactoForm.reset();
  contactoEditandoId = null;
  contactoModal.style.display = "block";
});

// Cerrar modal con la "x"
contactoModal.querySelector(".close-btn").addEventListener("click", () => {
  contactoModal.style.display = "none";
});

// Submit para agregar o editar contacto
contactoForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreContacto").value.trim();
  const email = document.getElementById("emailContacto").value.trim();
  const telefono = document.getElementById("telefonoContacto").value.trim();
  const asunto = document.getElementById("asuntoContacto").value;
    const fecha = document.getElementById("fechaContacto").value;

  if (!nombre || !email) {
    alert("El nombre y el email son obligatorios");
    return;
  }

  let url = 'http://localhost:3000/contactos';
  let method = 'POST';
  if (contactoEditandoId) {
    url += `/${contactoEditandoId}`;
    method = 'PUT';
  }

 fetch(url, {
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre, email, telefono, asunto, fecha })
})
  .then(res => {
    if (!res.ok) throw new Error("Error al guardar el contacto");
    return res.json();
  })
  .then(() => {
    contactoForm.reset();
    contactoEditandoId = null;
    contactoModal.style.display = "none";
    cargarContactos();
  })
  .catch(err => alert(err.message));
});

// Función para cargar contactos y mostrarlos en la tabla
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
          <td>${contacto.telefono || ''}</td>
          <td>${contacto.asunto || ''}</td>
        <td>${contacto.fecha || ''}</td>
          <td>
            <button class="edit-btn" 
              data-id="${contacto.id}" 
              data-nombre="${contacto.nombre}" 
              data-email="${contacto.email}" 
              data-telefono="${contacto.telefono || ''}"
              data-asunto="${contacto.asunto || ''}"
      data-fecha="${contacto.fecha || ''}">>
              Editar
            </button>
            <button class="delete-btn" data-id="${contacto.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Botones Editar
      document.querySelectorAll("#contactosTableBody .edit-btn").forEach(btn => {
        btn.onclick = (e) => {
          const el = e.target;
          contactoEditandoId = el.dataset.id;
          document.getElementById("nombreContacto").value = el.dataset.nombre;
          document.getElementById("emailContacto").value = el.dataset.email;
          document.getElementById("telefonoContacto").value = el.dataset.telefono;
        document.getElementById("asuntoContacto").value = el.dataset.asunto || "";
        document.getElementById("fechaContacto").value = el.dataset.fecha || "";

          contactoModal.style.display = "block";
        };
      });

      // Botones Eliminar
      document.querySelectorAll("#contactosTableBody .delete-btn").forEach(btn => {
        btn.onclick = (e) => {
          const id = e.target.dataset.id;
          if (confirm("¿Querés eliminar este contacto?")) {
            fetch(`http://localhost:3000/contactos/${id}`, { method: 'DELETE' })
              .then(res => {
                if (!res.ok) throw new Error("Error al eliminar el contacto");
                cargarContactos();
              })
              .catch(err => alert(err.message));
          }
        };
      });
    });
}

// Cargar contactos al cargar la página
document.addEventListener("DOMContentLoaded", cargarContactos);



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

