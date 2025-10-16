const API_URL = "http://localhost:8080/api/aulas";
const API_PROFESORES = "http://localhost:8080/api/profesores/activos";
const API_CURSOS = "http://localhost:8080/api/cursos/activos";
const API_ALUMNOS = "http://localhost:8080/api/alumnos/activos";

const form = document.getElementById("aulaForm");
const horario = document.getElementById("horario");
const profesorSelect = document.getElementById("profesor");
const cursoSelect = document.getElementById("curso");
const alumnosContainer = document.getElementById("alumnosContainer");
const tablaAulas = document.getElementById("tablaAulas");

document.addEventListener("DOMContentLoaded", () => {
  cargarProfesores();
  cargarCursos();
  cargarAlumnos();
  listarAulas();
});

async function cargarProfesores() {
  const res = await fetch(API_PROFESORES);
  const data = await res.json();
  profesorSelect.innerHTML = data
    .filter(p => p.usuario.estado === "Activo")
    .map(p => `<option value="${p.idprofesor}">${p.nombre} ${p.apellidos}</option>`)
    .join("");
}

async function cargarCursos() {
  const res = await fetch(API_CURSOS);
  const data = await res.json();
  cursoSelect.innerHTML = data
    .filter(c => c.estado === "Activo")
    .map(c => `<option value="${c.idcurso}">${c.nombre}</option>`)
    .join("");
}

async function cargarAlumnos() {
  const res = await fetch(API_ALUMNOS);
  const data = await res.json();
  alumnosContainer.innerHTML = data
    .filter(a => a.estado === "Activo")
    .map(a => `
      <label>
        <input type="checkbox" value="${a.idalumno}" />
        ${a.nombres} ${a.apellidos}
      </label>
    `)
    .join("<br>");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const seleccionados = [...alumnosContainer.querySelectorAll("input:checked")].map(c => parseInt(c.value));

  if (seleccionados.length < 15) {
    alert("Debes seleccionar al menos 15 alumnos.");
    return;
  }

  const aula = {
    horario: horario.value,
    idProfesor: parseInt(profesorSelect.value),
    idCurso: parseInt(cursoSelect.value),
    idsAlumnos: seleccionados
  };

  const res = await fetch(`${API_URL}/crear`, {
    
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aula)
  });

    if (res.ok) {
    alert("Aula creada correctamente");
    form.reset();
    listarAulas();
  } else {
    const error = await res.text();
    console.error("Error al crear aula:", error);
    alert("Error al crear el aula");
  }
});

async function listarAulas() {
  const res = await fetch(API_URL);
  const data = await res.json();
  tablaAulas.innerHTML = data.map(a => `
    <tr>
      <td>${a.idaula}</td>
      <td>${a.horario}</td>
      <td>${a.profesor.nombre} ${a.profesor.apellidos}</td>
      <td>${a.curso.nombre}</td>
      <td>${a.alumnos.length}</td>
      <td><button onclick="eliminarAula(${a.idaula})">Eliminar</button></td>
    </tr>
  `).join("");
}

async function eliminarAula(id) {
  if (!confirm("¿Seguro que deseas eliminar esta aula?")) return;
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  listarAulas();
}
