let videos = JSON.parse(localStorage.getItem("videos")) || [];
let editIndex = -1;

const form = document.getElementById("videoForm");
const tabla = document.getElementById("tablaVideos");
const modal = new bootstrap.Modal(document.getElementById("modalVideo"));
const visorModal = new bootstrap.Modal(document.getElementById("visorModal"));
const visorVideo = document.getElementById("visorVideo");
const visorTitulo = document.getElementById("visorTitulo");

// 🔸 modal de confirmación
let confirmModal;
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

// 🔹 cargar cursos desde localStorage
function cargarCursos() {
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  const select = document.getElementById("cursoSelect");
  select.innerHTML = "";
  cursos.forEach(curso => {
    const option = document.createElement("option");
    option.value = curso.nombre;
    option.textContent = curso.nombre;
    select.appendChild(option);
  });
}

// 🔹 guardar en localStorage
function guardarVideos() {
  localStorage.setItem("videos", JSON.stringify(videos));
}

// 🔹 mostrar tabla
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
          <a href="${v.url}" download="${v.titulo}" class="btn btn-sm btn-info text-white">Descargar</a>
        </td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="editarVideo(${i})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarVideo(${i})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// 🔹 visor de video
function verVideo(index) {
  const video = videos[index];
  visorTitulo.textContent = video.titulo;
  visorVideo.src = video.url;
  visorModal.show();
}

document.getElementById("visorModal").addEventListener("hidden.bs.modal", () => {
  visorVideo.pause();
  visorVideo.src = "";
});

// 🔹 guardar o editar video
form.addEventListener("submit", e => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const curso = document.getElementById("cursoSelect").value;
  const archivo = document.getElementById("archivo").files[0];

  // validar longitud descripción
  if (descripcion.length > 100) {
    alert("La descripción no puede superar los 100 caracteres.");
    return;
  }

  // si hay archivo nuevo
  if (archivo) {
    if (!["video/mp4", "audio/mpeg"].includes(archivo.type)) {
      alert("Solo se permiten archivos MP4 o MP3.");
      return;
    }

    if (archivo.size > 4 * 1024 * 1024) {
      alert("El archivo es demasiado grande (máximo 4 MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
      const base64 = event.target.result;
      guardarVideo(titulo, descripcion, curso, base64, archivo.type);
    };
    reader.readAsDataURL(archivo);
  }

  // si no hay archivo pero estamos editando
  else if (editIndex !== -1) {
    const v = videos[editIndex];
    guardarVideo(titulo, descripcion, curso, v.url, v.tipo);
  }

  // si no hay archivo y es nuevo
  else {
    alert("Debe subir un archivo de video o audio.");
  }
});

function guardarVideo(titulo, descripcion, curso, url, tipo) {
  const nuevoVideo = { titulo, descripcion, curso, url, tipo };

  if (editIndex === -1) videos.push(nuevoVideo);
  else videos[editIndex] = nuevoVideo;

  guardarVideos();
  form.reset();
  modal.hide();
  mostrarVideos();
  editIndex = -1;
}

// 🔹 editar video
function editarVideo(i) {
  const v = videos[i];
  document.getElementById("titulo").value = v.titulo;
  document.getElementById("descripcion").value = v.descripcion;
  document.getElementById("cursoSelect").value = v.curso;
  document.getElementById("archivo").value = "";
  editIndex = i;
  modal.show();
}

// 🔹 eliminar con confirmación
function eliminarVideo(i) {
  mostrarConfirmacion(`¿Seguro que deseas eliminar "<b>${videos[i].titulo}</b>"?`, () => {
    videos.splice(i, 1);
    guardarVideos();
    mostrarVideos();
  });
}

// 🔹 reset al cerrar modal
document.getElementById("modalVideo").addEventListener("hidden.bs.modal", () => {
  form.reset();
  editIndex = -1;
});

// 🔹 menú lateral
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
  mostrarVideos();
});
