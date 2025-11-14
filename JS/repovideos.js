let videos = [];
let editIndex = -1;

const API_URL = "http://localhost:8080/api/videos";

const form = document.getElementById("videoForm");
const tabla = document.getElementById("tablaVideos");
const modal = new bootstrap.Modal(document.getElementById("modalVideo"));
const visorModal = new bootstrap.Modal(document.getElementById("visorModal"));
const visorVideo = document.getElementById("visorVideo");
const visorTitulo = document.getElementById("visorTitulo");

let confirmModal;

// modal confirmación eliminar
function mostrarConfirmacion(mensaje, onConfirm) {
  const modalHTML = `
    <div class="modal fade" id="confirmModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirmar acción</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p>${mensaje}</p>
          </div>
          <div class="modal-footer justify-content-center">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-danger" id="confirmBtn">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  confirmModal = new bootstrap.Modal(document.getElementById("confirmModal"));
  confirmModal.show();

  document.getElementById("confirmBtn").onclick = () => {
    onConfirm();
    confirmModal.hide();
    document.getElementById("confirmModal").remove();
  };

  document.getElementById("confirmModal").addEventListener("hidden.bs.modal", () => {
    document.getElementById("confirmModal")?.remove();
  });
}

async function cargarCursos() {
  try {
    const res = await fetch("http://localhost:8080/api/cursos/activos");
    const cursos = await res.json();

    const select = document.getElementById("cursoSelect");
    select.innerHTML = "";

    cursos.forEach(curso => {
      const option = document.createElement("option");
      option.value = curso.nombre;
      option.textContent = curso.nombre;
      select.appendChild(option);
    });

  } catch (error) {
    console.error("Error cargando cursos:", error);
  }
}

// obtener videos del backend
async function cargarVideos() {
  const res = await fetch(API_URL);
  videos = await res.json();
  mostrarVideos();
}

function mostrarVideos() {
  tabla.innerHTML = "";
  videos.forEach((v, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${v.titulo}</td>
        <td>${v.curso}</td>
        <td><div class="descripcion-cuadro">${v.descripcion}</div></td>
        <td>
          <button class="btn btn-sm btn-success me-2" onclick="verVideo(${i})">Ver</button>
          <a href="${v.link}" download="${v.titulo}" class="btn btn-sm btn-info text-white">Descargar</a>
        </td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="editarVideo(${i})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarVideo(${v.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function verVideo(index) {
  const video = videos[index];
  visorTitulo.textContent = video.titulo;
  visorVideo.src = video.link;
  visorModal.show();
}

document.getElementById("visorModal").addEventListener("hidden.bs.modal", () => {
  visorVideo.pause();
  visorVideo.src = "";
});

form.addEventListener("submit", async e => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const curso = document.getElementById("cursoSelect").value;
  const archivo = document.getElementById("archivo").files[0];

  if (descripcion.length > 100) {
    alert("La descripción no puede superar los 100 caracteres.");
    return;
  }

  if (!archivo && editIndex === -1) {
    alert("Debe subir un archivo de video o audio.");
    return;
  }

  let linkFinal;

  if (archivo) {
    linkFinal = URL.createObjectURL(archivo);
  } else {
    linkFinal = videos[editIndex].link;
  }

  const data = {
    titulo,
    descripcion,
    curso,
    link: linkFinal
  };

  if (editIndex === -1) {
    // crear
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } else {
    // editar
    const id = videos[editIndex].id;
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  modal.hide();
  form.reset();
  editIndex = -1;
  cargarVideos();
});

// editar video
function editarVideo(i) {
  const v = videos[i];
  document.getElementById("titulo").value = v.titulo;
  document.getElementById("descripcion").value = v.descripcion;
  document.getElementById("cursoSelect").value = v.curso;
  document.getElementById("archivo").value = "";
  editIndex = i;
  modal.show();
}

// eliminar video backend
function eliminarVideo(id) {
  mostrarConfirmacion(`¿Seguro que deseas eliminar este video?`, async () => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    cargarVideos();
  });
}

// reset modal
document.getElementById("modalVideo").addEventListener("hidden.bs.modal", () => {
  form.reset();
  editIndex = -1;
});

// menú lateral
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const toggleBtn = document.querySelector(".menu-toggle");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  toggleBtn.style.display = "none";
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  toggleBtn.style.display = "block";
});

window.addEventListener("load", () => {
  cargarCursos();
  cargarVideos();
});

// prueba para git pull