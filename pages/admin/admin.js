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
    localStorage.removeItem("token"); // borra el token
    window.location.href = "/login.html"; // redirige bien al login
  });
}


  // --- FORMULARIOS ---

// Formulario TAREAS
let tareaEditandoId = null; // id de tarea que estamos editando, null si es nueva

const tareaForm = document.getElementById("tareaForm");
const tareaModal = document.getElementById("tareaModal");
const btnAddTarea = document.getElementById("addTareaBtn"); // botón para abrir modal agregar tarea

// Abrir modal para agregar tarea nueva
btnAddTarea?.addEventListener("click", () => {
  tareaForm.reset();
  tareaEditandoId = null;
  tareaModal.style.display = "block";
});

// Cerrar modal al hacer click en la "x"
tareaModal.querySelector(".close-btn").addEventListener("click", () => {
  tareaModal.style.display = "none";
});

// Submit para crear o editar tarea
tareaForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const tarea = document.getElementById("tarea").value.trim();

  if (!tarea) return alert("La tarea no puede estar vacía");

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
    tareaModal.style.display = "none";
    cargarTareas();
  })
  .catch(err => alert(err.message));
});

// Cargar tareas y mostrar en la tabla
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

      // Agregar evento a botones Editar
      document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          const tareaTexto = e.target.dataset.tarea;

          document.getElementById("tarea").value = tareaTexto;
          tareaEditandoId = id;
          tareaModal.style.display = "block";
        });
      });

      // Agregar evento a botones Eliminar
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          if (confirm("¿Seguro querés eliminar esta tarea?")) {
            fetch(`http://localhost:3000/tareas/${id}`, { method: 'DELETE' })
              .then(res => {
                if (!res.ok) throw new Error("Error al eliminar la tarea");
                cargarTareas();
              })
              .catch(err => alert(err.message));
          }
        });
      });
    });
}

// Cargar tareas apenas carga la página
document.addEventListener("DOMContentLoaded", () => {
  cargarTareas();
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

//FORMULARIO SUSCRIPTORES
// Formulario Suscriptores
let suscriptorEditandoId = null;

const suscriptorForm = document.getElementById("suscriptorForm");
const suscriptorModal = document.getElementById("suscriptorModal");
const btnAddSuscriptor = document.getElementById("addSuscriptorBtn");

// Abrir modal para agregar nuevo suscriptor
btnAddSuscriptor?.addEventListener("click", () => {
  suscriptorForm.reset();
  suscriptorEditandoId = null;
  suscriptorModal.style.display = "block";
});

// Cerrar modal al hacer click en la "x"
suscriptorModal.querySelector(".close-btn")?.addEventListener("click", () => {
  suscriptorModal.style.display = "none";
});

// Enviar formulario (crear o editar)
suscriptorForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreSuscriptor").value.trim();
  const email = document.getElementById("emailSuscriptor").value.trim();
  const fecha_nacimiento = document.getElementById("fechaNacimiento").value;
  const acepto_promociones = document.getElementById("aceptoPromociones").checked;
  const acepto_terminos = document.getElementById("aceptoTerminos").checked;

  const url = suscriptorEditandoId
    ? `http://localhost:3000/suscriptores/${suscriptorEditandoId}`
    : `http://localhost:3000/suscriptores`;

  const method = suscriptorEditandoId ? 'PUT' : 'POST';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, fecha_nacimiento, acepto_promociones, acepto_terminos })
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar el suscriptor");
      return res.json();
    })
    .then(() => {
      suscriptorForm.reset();
      suscriptorEditandoId = null;
      suscriptorModal.style.display = "none";
      cargarSuscriptores();
    })
    .catch(err => alert(err.message));
});

// Cargar suscriptores y mostrar en tabla
function cargarSuscriptores() {
  fetch("http://localhost:3000/suscriptores")
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
          <td>${suscriptor.fecha_nacimiento || ''}</td>
          <td>${suscriptor.acepto_promociones ? 'Sí' : 'No'}</td>
          <td>${suscriptor.fecha_suscripcion || ''}</td>
          <td>
            <button class="edit-btn" data-id="${suscriptor.id}">Editar</button>
            <button class="delete-btn" data-id="${suscriptor.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Botones editar
      document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          fetch(`http://localhost:3000/suscriptores/${id}`)
            .then(res => res.json())
            .then(s => {
              document.getElementById("nombreSuscriptor").value = s.nombre;
              document.getElementById("emailSuscriptor").value = s.email;
              document.getElementById("fechaNacimiento").value = s.fecha_nacimiento || '';
              document.getElementById("aceptoPromociones").checked = s.acepto_promociones;
              document.getElementById("aceptoTerminos").checked = s.acepto_terminos;

              suscriptorEditandoId = s.id;
              suscriptorModal.style.display = "block";
            });
        });
      });

      // Botones eliminar
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          if (confirm("¿Seguro que querés eliminar este suscriptor?")) {
            fetch(`http://localhost:3000/suscriptores/${id}`, {
              method: "DELETE",
            })
              .then(res => {
                if (!res.ok) throw new Error("Error al eliminar");
                cargarSuscriptores();
              })
              .catch(err => alert(err.message));
          }
        });
      });
    });
}

// Cargar al iniciar
document.addEventListener("DOMContentLoaded", () => {
  cargarSuscriptores();
});




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

// Cerrar modal
contactoModal.querySelector(".close-btn")?.addEventListener("click", () => {
  contactoModal.style.display = "none";
});

// Guardar contacto (crear o editar)
contactoForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreContacto").value.trim();
  const email = document.getElementById("emailContacto").value.trim();
  const telefono = document.getElementById("telefonoContacto").value.trim();
  const asunto = document.getElementById("asuntoContacto").value.trim();
  const mensaje = document.getElementById("mensajeContacto").value.trim();
  const preferencia_contacto = document.getElementById("preferenciaContacto").value;
  const acepto_promociones = document.getElementById("aceptoPromocionesContacto").checked;

  const url = contactoEditandoId
    ? `http://localhost:3000/contactos/${contactoEditandoId}`
    : `http://localhost:3000/contactos`;

  const method = contactoEditandoId ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      nombre, 
      email, 
      telefono,
      asunto, 
      mensaje, 
      preferencia_contacto, 
      acepto_promociones 
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar el contacto");
      return res.json();
    })
    .then(() => {
      contactoForm.reset();
      contactoModal.style.display = "none";
      contactoEditandoId = null;
      cargarContactos();
    })
    .catch(err => alert(err.message));
});

// Cargar contactos y mostrar en tabla
function cargarContactos() {
  fetch("http://localhost:3000/contactos")
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
          <td>${contacto.telefono || ""}</td>
          <td>${contacto.asunto || ""}</td>
          <td>${contacto.fecha_contacto || ""}</td>
          <td>
            <button class="edit-btn" data-id="${contacto.id}">Editar</button>
            <button class="delete-btn" data-id="${contacto.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Botones editar
      document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          fetch(`http://localhost:3000/contactos/${id}`)
            .then(res => res.json())
            .then(c => {
              document.getElementById("nombreContacto").value = c.nombre;
              document.getElementById("emailContacto").value = c.email;
              document.getElementById("telefonoContacto").value = c.telefono || "";
              document.getElementById("asuntoContacto").value = c.asunto || "consulta";
              document.getElementById("mensajeContacto").value = c.mensaje;
              document.getElementById("preferenciaContacto").value = c.preferencia_contacto || "correo";
              document.getElementById("aceptoPromocionesContacto").checked = c.acepto_promociones;

              contactoEditandoId = c.id;
              contactoModal.style.display = "block";
            });
        });
      });

      // Botones eliminar
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          if (confirm("¿Seguro que querés eliminar este contacto?")) {
            fetch(`http://localhost:3000/contactos/${id}`, {
              method: "DELETE"
            })
              .then(res => {
                if (!res.ok) throw new Error("Error al eliminar");
                cargarContactos();
              })
              .catch(err => alert(err.message));
          }
        });
      });
    });
}

// Cargar al iniciar
document.addEventListener("DOMContentLoaded", () => {
  cargarContactos();
});




// Formulario para agregar fotos
// Cargar fotos de clientes y mostrarlas en la tabla
let fotoEditandoId = null;

const fotoForm = document.getElementById("fotoForm");
const fotoModal = document.getElementById("fotoModal");
const btnAddFoto = document.getElementById("addFotoBtn");

// Abrir modal para agregar nueva foto
btnAddFoto?.addEventListener("click", () => {
  fotoForm.reset();
  fotoEditandoId = null;
  document.getElementById("previewContainer").style.display = "none";
  document.getElementById("imagePreview").src = "/placeholder.svg";
  fotoModal.style.display = "block";
});

// Cerrar modal
fotoModal.querySelector(".close-btn")?.addEventListener("click", () => {
  fotoModal.style.display = "none";
});

// Mostrar vista previa de la imagen seleccionada
document.getElementById("imagenFoto")?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const preview = document.getElementById("imagePreview");
      preview.src = event.target.result;
      document.getElementById("previewContainer").style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Guardar foto (crear o editar)
fotoForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreFoto").value.trim();
  const imagenInput = document.getElementById("imagenFoto");
  const file = imagenInput.files[0];

  if (!nombre || (!file && !fotoEditandoId)) {
    alert("Completá todos los campos.");
    return;
  }

  // Crear FormData para enviar con imagen
  const formData = new FormData();
  formData.append("nombre", nombre);
  if (file) {
    formData.append("ruta_imagen", file);
  }

  // Definir URL y método según si es edición o creación
  const url = fotoEditandoId
    ? `http://localhost:3000/fotosclientes/${fotoEditandoId}`
    : "http://localhost:3000/fotosclientes";
  const method = fotoEditandoId ? "PUT" : "POST";

  fetch(url, {
    method,
    body: formData
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al guardar la foto");
      return res.json();
    })
    .then(() => {
      fotoForm.reset();
      fotoModal.style.display = "none";
      document.getElementById("previewContainer").style.display = "none";
      fotoEditandoId = null;
      cargarFotos();
    })
    .catch((err) => alert(err.message));
});

// Cargar fotos y mostrar en tabla
function cargarFotos() {
  fetch("http://localhost:3000/fotosclientes")
    .then((res) => res.json())
    .then((data) => {
      const tbody = document.getElementById("fotosTableBody");
      tbody.innerHTML = "";

      data.forEach((foto) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${foto.id}</td>
          <td>${foto.nombre}</td>
          <td><img src="${foto.imagen_url}" alt="${foto.nombre}" style="max-width: 100px;"></td>
          <td>${foto.fecha_subida || ""}</td>
          <td>
            <button class="edit-btn" data-id="${foto.id}">Editar</button>
            <button class="delete-btn" data-id="${foto.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Agregar evento a botones Editar
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          fetch(`http://localhost:3000/fotosclientes/${id}`)
            .then((res) => res.json())
            .then((f) => {
              document.getElementById("nombreFoto").value = f.nombre;
              document.getElementById("previewContainer").style.display = "block";
              document.getElementById("imagePreview").src = f.imagen_url;
              fotoEditandoId = f.id;
              fotoModal.style.display = "block";
            });
        });
      });

      // Agregar evento a botones Eliminar
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          if (confirm("¿Seguro que querés eliminar esta foto?")) {
            fetch(`http://localhost:3000/fotosclientes/${id}`, {
              method: "DELETE"
            })
              .then((res) => {
                if (!res.ok) throw new Error("Error al eliminar");
                cargarFotos();
              })
              .catch((err) => alert(err.message));
          }
        });
      });
    });
}

// Cargar fotos al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarFotos();
});




document.addEventListener("DOMContentLoaded", () => {
  cargarSuscriptoresEnSelect();
});

