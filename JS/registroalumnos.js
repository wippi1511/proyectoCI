let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
let editIndex = -1;

const form = document.getElementById('alumnoForm');
const tabla = document.getElementById('tablaAlumnos');
const modalTitle = document.getElementById('modalTitle');
const modal = new bootstrap.Modal(document.getElementById('modalAlumnos'));

//solo para demostrar funcionalidad d guardado (luego se remplaza por la base de datos real)
function guardarAlumnos() {
  localStorage.setItem('alumnos', JSON.stringify(alumnos));
}


form.addEventListener('submit', function(e) {
  e.preventDefault();

  const id = document.getElementById('alumnoId').value;
  const dni = document.getElementById('dni').value;
  const nombres = document.getElementById('nombres').value;
  const apellidos = document.getElementById('apellidos').value;
  const correo = document.getElementById('correo').value;
  const numcelular = document.getElementById('numcelular').value;
  const carrera = document.getElementById('carrera').value;
  const ciclo = document.getElementById('ciclo').value;

  if (editIndex === -1) {
    alumnos.push({ id, dni, nombres, apellidos, correo, numcelular, carrera, ciclo });
  } else {
    alumnos[editIndex] = { id, dni, nombres, apellidos, correo, numcelular, carrera, ciclo };
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
        <td data-label="ID">${alumno.id}</td>
        <td data-label="DNI">${alumno.dni}</td>
        <td data-label="Nombres">${alumno.nombres}</td>
        <td data-label="Apellidos">${alumno.apellidos}</td>
        <td data-label="Correo">${alumno.correo}</td>
        <td data-label="Num. Celular">${alumno.numcelular}</td>
        <td data-label="Carrera">${alumno.carrera}</td>
        <td data-label="Ciclo">${alumno.ciclo}</td>
        <td data-label="Acciones">
          <button class="btn btn-sm btn-warning" onclick="editarAlumno(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarAlumno(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editarAlumno(index) {
  const alumno = alumnos[index];
  document.getElementById('alumnoId').value = alumno.id;
  document.getElementById('dni').value = alumno.dni;
  document.getElementById('nombres').value = alumno.nombres;
  document.getElementById('apellidos').value = alumno.apellidos;
  document.getElementById('correo').value = alumno.correo;
  document.getElementById('numcelular').value = alumno.numcelular;
  document.getElementById('carrera').value = alumno.carrera;
  document.getElementById('ciclo').value = alumno.ciclo;
  editIndex = index;
  modalTitle.textContent = "Editar Alumno";
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
});

mostrarAlumnos();

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
