let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
let editIndex = -1;

const form = document.getElementById('alumnoForm');
const tabla = document.getElementById('tablaAlumnos');
const modalTitle = document.getElementById('modalTitle');
const modal = new bootstrap.Modal(document.getElementById('modalAlumnos'));

function guardarAlumnos() {
  localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

function generarID() {
  if (alumnos.length === 0) return 1;
  return Math.max(...alumnos.map(a => a.idalumno)) + 1;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const id = document.getElementById('idalumno').value;
  const nombres = document.getElementById('nombres').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const estado = document.getElementById('estado').value;
  let fecha = document.getElementById('fecha_inscripcion').value;

  if (!fecha) {
    const hoy = new Date();
    fecha = hoy.toISOString().split('T')[0];
  }

  if (editIndex === -1) {
    alumnos.push({
      idalumno: generarID(),
      nombres,
      apellidos,
      fecha_inscripcion: fecha,
      estado
    });
  } else {
    alumnos[editIndex] = {
      idalumno: alumnos[editIndex].idalumno,
      nombres,
      apellidos,
      fecha_inscripcion: fecha,
      estado
    };
    editIndex = -1;
  }

  guardarAlumnos();
  form.reset();
  modal.hide();
  mostrarAlumnos();
});

function mostrarAlumnos() {
  tabla.innerHTML = '';
  alumnos.forEach((alumno, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${alumno.idalumno}</td>
        <td>${alumno.nombres}</td>
        <td>${alumno.apellidos}</td>
        <td>${alumno.fecha_inscripcion}</td>
        <td>${alumno.estado}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarAlumno(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarAlumno(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editarAlumno(index) {
  const alumno = alumnos[index];
  document.getElementById('idalumno').value = alumno.idalumno;
  document.getElementById('nombres').value = alumno.nombres;
  document.getElementById('apellidos').value = alumno.apellidos;
  document.getElementById('fecha_inscripcion').value = alumno.fecha_inscripcion;
  document.getElementById('estado').value = alumno.estado;
  editIndex = index;
  modalTitle.textContent = "Editar Alumno";
  document.getElementById('idField').style.display = 'block';
  modal.show();
}

function eliminarAlumno(index) {
  alumnos.splice(index, 1);
  guardarAlumnos();
  mostrarAlumnos();
}

document.getElementById('modalAlumnos').addEventListener('hidden.bs.modal', () => {
  modalTitle.textContent = "Registrar Alumno";
  form.reset();
  editIndex = -1;
  document.getElementById('idField').style.display = 'none';
});

mostrarAlumnos();

// Sidebar responsive
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const toggleBtn = document.querySelector(".menu-toggle");

function checkToggleBtnVisibility() {
  if (window.innerWidth > 768) {
    toggleBtn.style.display = "none";
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  } else {
    if (!sidebar.classList.contains("active")) {
      toggleBtn.style.display = "block";
    } else {
      toggleBtn.style.display = "none";
    }
  }
}

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

window.addEventListener("resize", checkToggleBtnVisibility);
window.addEventListener("load", checkToggleBtnVisibility);
