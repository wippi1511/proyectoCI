const API_URL = "http://localhost:8080/api/cursos";
let cursos = [];
let editIndex = -1;
let nextId = 1;

const form = document.getElementById('cursoForm');
const tabla = document.getElementById('tablaCursos');
const modalTitle = document.getElementById('modalTitle');
const modal = new bootstrap.Modal(document.getElementById('modalCurso'));

async function cargarCursos() {
  const res = await fetch(API_URL);
  cursos = await res.json();
  mostrarCursos();
}

function mostrarCursos() {
  tabla.innerHTML = '';
  cursos.forEach((curso, index) => {
    tabla.innerHTML += `
      <tr>
        <td data-label="ID">${curso.idcurso}</td>
        <td data-label="Nombre">${curso.nombre}</td>
        <td data-label="Duración">${curso.duracion}</td>
        <td data-label="Estado">${curso.estado}</td>
        <td data-label="Acciones">
          <button class="btn btn-sm btn-warning me-2" onclick="editarCurso(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarCurso(${curso.idcurso})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const duracion = document.getElementById('duracion').value;
  const estado = document.getElementById('estado').value;

  const cursoData = { nombre, duracion, estado };

  if (editIndex === -1) {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cursoData)
    });
  } else {
    const id = cursos[editIndex].idcurso;
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cursoData)
    });
    editIndex = -1;
  }

  form.reset();
  modal.hide();
  cargarCursos();
});

function editarCurso(index) {
  const curso = cursos[index];
  document.getElementById('nombre').value = curso.nombre;
  document.getElementById('duracion').value = curso.duracion;
  document.getElementById('estado').value = curso.estado;
  editIndex = index;
  modalTitle.textContent = 'Editar Curso';
  modal.show();
}

async function eliminarCurso(id) {
  if (!confirm('¿Seguro que deseas eliminar este curso?')) return;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  cargarCursos();
}

document.getElementById('modalCurso').addEventListener('hidden.bs.modal', () => {
  modalTitle.textContent = 'Agregar Curso';
  form.reset();
  editIndex = -1;
});

document.addEventListener('DOMContentLoaded', cargarCursos);

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toggleBtn = document.querySelector('.menu-toggle');

function checkToggleBtnVisibility() {
  if (window.innerWidth > 768) {
    toggleBtn.style.display = 'none';
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  } else {
    if (!sidebar.classList.contains('active')) {
      toggleBtn.style.display = 'block';
    } else {
      toggleBtn.style.display = 'none';
    }
  }
}

toggleBtn.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
  toggleBtn.style.display = 'none';
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  toggleBtn.style.display = 'block';
});

window.addEventListener('resize', checkToggleBtnVisibility);
window.addEventListener('load', checkToggleBtnVisibility);
