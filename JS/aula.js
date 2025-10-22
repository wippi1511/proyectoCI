const API_URL = "http://localhost:8080/api/aulas";
const API_PROFESORES = "http://localhost:8080/api/profesores/activos";
const API_CURSOS = "http://localhost:8080/api/cursos/activos";
const API_ALUMNOS = "http://localhost:8080/api/alumnos/activos";

const form = document.getElementById("aulaForm");
const profesorSelect = document.getElementById("profesorSelect");
const cursoSelect = document.getElementById("cursoSelect");
const alumnosContainer = document.getElementById("alumnosContainer");
const buscarAlumno = document.getElementById("buscarAlumno");
const paginacionDiv = document.getElementById("paginacion");
const contadorSeleccion = document.getElementById("contadorSeleccion");
const tablaAulas = document.getElementById("aulasBody");
const diasContainer = document.getElementById("diasContainer");
const agregarDiaBtn = document.getElementById("agregarDiaBtn");

let seleccionadosGlobal = new Set();
let alumnos = [];
let alumnosFiltrados = [];
let paginaActual = 1;
const alumnosPorPagina = 10;

// === FUNCIONES DE DÍAS ===
const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function agregarDia(dia = "", horaInicio = "", horaFin = "") {
  const div = document.createElement("div");
  div.classList.add("fila-dia");
  div.innerHTML = `
    <select class="diaSelect" required>
      <option value="">Seleccione día</option>
      ${DIAS_SEMANA.map(d => `<option value="${d}" ${d === dia ? "selected" : ""}>${d}</option>`).join("")}
    </select>
    <input type="time" class="horaInicio" value="${horaInicio}" required>
    <input type="time" class="horaFin" value="${horaFin}" required>
    <button type="button" class="eliminarDia">✖</button>
  `;
  div.querySelector(".eliminarDia").addEventListener("click", () => div.remove());
  diasContainer.appendChild(div);
}

agregarDiaBtn.addEventListener("click", () => agregarDia());

// === CARGAR SELECTS ===
async function cargarSelect(url, select, texto) {
  const res = await fetch(url);
  const data = await res.json();
  select.innerHTML = `<option value="">Seleccione ${texto}</option>`;
  data.forEach(item => {
    const opt = document.createElement("option");
    if (item.idprofesor) {
      opt.value = item.idprofesor;
      opt.textContent = `${item.nombre} ${item.apellidos}`;
    } else if (item.idcurso) {
      opt.value = item.idcurso;
      opt.textContent = item.nombre;
    }
    select.appendChild(opt);
  });
}

// === CARGAR DATOS INICIALES ===
async function cargarDatos() {
  await cargarSelect(API_PROFESORES, profesorSelect, "profesor");
  await cargarSelect(API_CURSOS, cursoSelect, "curso");
  const res = await fetch(API_ALUMNOS);
  alumnos = await res.json();
  alumnosFiltrados = alumnos;
  mostrarAlumnos();
}

// === MOSTRAR ALUMNOS PAGINADOS ===
function mostrarAlumnos() {
  const inicio = (paginaActual - 1) * alumnosPorPagina;
  const fin = inicio + alumnosPorPagina;
  const alumnosPagina = alumnosFiltrados.slice(inicio, fin);
  alumnosContainer.innerHTML = "";

  alumnosPagina.forEach(a => {
    const div = document.createElement("div");
    div.className = "alumno";
    const estaSeleccionado = seleccionadosGlobal.has(a.idalumno);

    div.innerHTML = `
      <label>
        <input type="checkbox" value="${a.idalumno}" ${estaSeleccionado ? "checked" : ""}>
        ${a.nombres} ${a.apellidos}
      </label>
    `;

    div.querySelector("input").addEventListener("change", (e) => {
      const id = parseInt(e.target.value);
      if (e.target.checked) seleccionadosGlobal.add(id);
      else seleccionadosGlobal.delete(id);
      actualizarContador();
    });

    alumnosContainer.appendChild(div);
  });

  renderPaginacion();
  actualizarContador();
}

function renderPaginacion() {
  const totalPaginas = Math.ceil(alumnosFiltrados.length / alumnosPorPagina);
  paginacionDiv.innerHTML = "";
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === paginaActual) btn.classList.add("activo");
    btn.addEventListener("click", () => {
      paginaActual = i;
      mostrarAlumnos();
    });
    paginacionDiv.appendChild(btn);
  }
}

buscarAlumno.addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  alumnosFiltrados = alumnos.filter(a =>
    `${a.nombres} ${a.apellidos}`.toLowerCase().includes(texto)
  );
  paginaActual = 1;
  mostrarAlumnos();
});

function actualizarContador() {
  contadorSeleccion.textContent = `Seleccionados: ${seleccionadosGlobal.size}`;
}

// === CREAR AULA ===
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const seleccionados = Array.from(seleccionadosGlobal);
  if (seleccionados.length < 15) {
    alert("Debes seleccionar al menos 15 alumnos.");
    return;
  }

  // Recolectar los días
  const dias = [];
  document.querySelectorAll(".fila-dia").forEach(div => {
    const dia = div.querySelector(".diaSelect").value;
    const horaInicio = div.querySelector(".horaInicio").value;
    const horaFin = div.querySelector(".horaFin").value;
    if (dia && horaInicio && horaFin) {
      dias.push({ dia, horaInicio, horaFin });
    }
  });

  if (dias.length === 0) {
    alert("Debes agregar al menos un día con horario.");
    return;
  }

  const datos = {
    idProfesor: parseInt(profesorSelect.value),
    idCurso: parseInt(cursoSelect.value),
    idsAlumnos: seleccionados,
    dias: dias
  };

  const res = await fetch(`${API_URL}/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });

  if (res.ok) {
    alert("Aula creada correctamente");
    form.reset();
    seleccionadosGlobal.clear();
    diasContainer.innerHTML = "";
    agregarDia();
    mostrarAlumnos();
    listarAulas();
  } else {
    alert("Error al crear el aula");
  }
});

// === LISTAR AULAS ===
// Helper: formatea un array de días tolerando distintos nombres de campo
function formatoDiasTexto(dias) {
  if (!dias || dias.length === 0) return "Sin días asignados";

  return dias.map(d => {
    // soporta distintos nombres posibles
    const dia = d.dia || d.diaSemana || d.dia_semana || d.day || d.nombreDia || "";
    const hi = d.horaInicio || d.hora_inicio || d.hora || d.startTime || "";
    const hf = d.horaFin || d.hora_fin || d.endTime || "";
    // si vienen como objetos (por serialización) intentamos usar toString
    const hiStr = hi ? hi : "";
    const hfStr = hf ? hf : "";
    return `${dia} (${hiStr}${hiStr && hfStr ? ' - ' : ''}${hfStr})`;
  }).join("<br>");
}

// Funión que lista aulas y agrega botones
async function listarAulas() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      console.error("Error al obtener aulas:", res.status);
      return;
    }
    const aulas = await res.json();

    const tablaAulas = document.getElementById("aulasBody");
    tablaAulas.innerHTML = "";

    aulas.forEach(a => {
      const diasTexto = formatoDiasTexto(a.dias);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${a.id || a.idaula || ""}</td>
        <td>${diasTexto}</td>
        <td>${(a.profesor?.nombre || "") + " " + (a.profesor?.apellidos || "")}</td>
        <td>${a.curso?.nombre || ""}</td>
        <td>${a.alumnos?.length || 0}</td>
        <td>
          <button type="button" class="detalles-btn" data-id="${a.id || a.idaula}">Ver</button>
          <button type="button" class="editar-btn" data-id="${a.id || a.idaula}">Editar</button>
          <button type="button" class="eliminar-btn" data-id="${a.id || a.idaula}">Eliminar</button>
          <button type="button" class="historial-btn" data-id="${a.id || a.idaula}">Historial</button>
        </td>
      `;
      tablaAulas.appendChild(tr);
    });

    // después de renderizar la tabla, asignamos los eventos
    agregarEventosVer();
    asignarEventosEditar();
    asignarEventosEliminar();
    asignarEventosAsistencias();
    asignarEventosHistorial();


  } catch (err) {
    console.error("listarAulas Error:", err);
  }
}
function agregarEventosVer() {
  const botonesVer = document.querySelectorAll(".detalles-btn");
  botonesVer.forEach(btn => {
    btn.removeEventListener("click", handleVerClick); // por si ya estaba
    btn.addEventListener("click", handleVerClick);
  });
}
function handleVerClick(e) {
  const id = e.currentTarget.dataset.id;
  if (!id) { console.error("No se encontró el ID del aula (ver)"); return; }
  // Ajusta la ruta relativa según tu estructura de carpetas
  window.location.href = `detallesAula.html?id=${id}`;
}

function asignarEventosEditar() {
  const botonesEditar = document.querySelectorAll(".editar-btn");
  botonesEditar.forEach(btn => {
    btn.removeEventListener("click", handleEditarClick);
    btn.addEventListener("click", handleEditarClick);
  });
}
function handleEditarClick(e) {
  const id = e.currentTarget.dataset.id;
  if (!id) { console.error("No se encontró el ID del aula (editar)"); return; }
  window.location.href = `editarAula.html?id=${id}`;
}

function asignarEventosEliminar() {
  const botonesEliminar = document.querySelectorAll(".eliminar-btn");
  botonesEliminar.forEach(btn => {
    btn.removeEventListener("click", handleEliminarClick);
    btn.addEventListener("click", handleEliminarClick);
  });
}

// === EVENTOS DE ASISTENCIAS ===
function asignarEventosAsistencias() {
  const botonesAsistencia = document.querySelectorAll(".asistencia-btn");
  botonesAsistencia.forEach(btn => {
    btn.addEventListener("click", handleAsistenciaClick);
  });
}

function handleAsistenciaClick(e) {
  const id = e.currentTarget.dataset.id;
  if (!id) return alert("ID de aula no encontrado.");
  window.location.href = `asistencia.html?id=${id}`;
}

// === EVENTOS DE HISTORIAL ===
function asignarEventosHistorial() {
  const botonesHistorial = document.querySelectorAll(".historial-btn");
  botonesHistorial.forEach(btn => {
    btn.addEventListener("click", handleHistorialClick);
  });
}

function handleHistorialClick(e) {
  const id = e.currentTarget.dataset.id;
  if (!id) return alert("ID de aula no encontrado.");
  window.location.href = `historialAsistencia.html?id=${id}`;
}


async function handleEliminarClick(e) {
  const id = e.currentTarget.dataset.id;
  if (!id) { console.error("No se encontró el ID del aula (eliminar)"); return; }

  if (!confirm("¿Estás seguro de eliminar este aula?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Aula eliminada correctamente");
      listarAulas();
    } else {
      console.error("Error al eliminar aula:", res.status);
      alert("Error al eliminar el aula");
    }
  } catch (err) {
    console.error("handleEliminarClick error:", err);
    alert("Error al eliminar el aula");
  }
}


cargarDatos();
listarAulas();
