const API_ASISTENCIAS = "http://localhost:8080/api/asistencias";
const API_AULAS = "http://localhost:8080/api/aulas";

const urlParams = new URLSearchParams(window.location.search);
const idAulaURL = urlParams.get("id");

const aulaSelect = document.getElementById("aulaSelect");
const tablaAsistencias = document.getElementById("tablaAsistencias");
const fechaInput = document.getElementById("fecha");
const btnCargar = document.getElementById("cargarAlumnos");
const btnGuardar = document.getElementById("guardarAsistencias");

let alumnos = [];

// 🔹 Cargar aulas disponibles
async function cargarAulas() {
  const res = await fetch(API_AULAS);
  const data = await res.json();
  aulaSelect.innerHTML = "<option value=''>Seleccione un aula</option>";
  data.forEach(a => {
    const opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = `${a.curso.nombre} - ${a.profesor.nombre} ${a.profesor.apellidos}`;
    aulaSelect.appendChild(opt);
  });
}

// 🔹 Cargar alumnos del aula
async function cargarAlumnos() {
  const idAula = aulaSelect.value;
  if (!idAula) {
    alert("Seleccione un aula");
    return;
  }

  const res = await fetch(`${API_ASISTENCIAS}/aula/${idAula}/alumnos`);
  alumnos = await res.json();

  tablaAsistencias.innerHTML = alumnos.map(a => `
    <tr>
      <td>${a.nombres} ${a.apellidos}</td>
      <td>
        <select id="estado-${a.idalumno}">
          <option value="Presente">Presente</option>
          <option value="Tarde">Tarde</option>
          <option value="Ausente">Ausente</option>
          <option value="Justificado">Justificado</option>
        </select>
      </td>
      <td><input type="text" id="obs-${a.idalumno}" placeholder="Observación"></td>
    </tr>
  `).join("");
}

// 🔹 Guardar asistencias
async function guardarAsistencias() {
  const idAula = aulaSelect.value;
  const fecha = fechaInput.value;
  if (!idAula || !fecha) {
    alert("Seleccione aula y fecha");
    return;
  }

  for (const a of alumnos) {
    const estado = document.getElementById(`estado-${a.idalumno}`).value;
    const observacion = document.getElementById(`obs-${a.idalumno}`).value;

    await fetch(API_ASISTENCIAS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idAula: parseInt(idAula),
        idAlumno: a.idalumno,
        fecha: fecha,
        estado: estado,
        observacion: observacion
      })
    });
  }

  alert("Asistencias registradas correctamente");
}

// Eventos
btnCargar.addEventListener("click", cargarAlumnos);
btnGuardar.addEventListener("click", guardarAsistencias);

// Inicializar
cargarAulas();
