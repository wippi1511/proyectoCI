const API_URL = "http://localhost:8080/api/aulas";
const API_PROFESORES = "http://localhost:8080/api/profesores/activos";
const API_CURSOS = "http://localhost:8080/api/cursos/activos";
const API_ALUMNOS = "http://localhost:8080/api/alumnos/activos";

const form = document.getElementById("editarForm");
const profesorSelect = document.getElementById("profesorSelect");
const cursoSelect = document.getElementById("cursoSelect");
const alumnosContainer = document.getElementById("alumnosContainer");
const buscarAlumno = document.getElementById("buscarAlumno");
const paginacionDiv = document.getElementById("paginacion");
const contadorSeleccion = document.getElementById("contadorSeleccion");
const volverBtn = document.getElementById("volverBtn");

const diasContainer = document.getElementById("diasContainer");
const agregarDiaBtn = document.getElementById("agregarDiaBtn");

const urlParams = new URLSearchParams(window.location.search);
const idAula = urlParams.get("id");
console.log("🟢 idAula obtenido:", idAula);

let alumnos = [];
let alumnosFiltrados = [];
let seleccionadosGlobal = new Set();
let paginaActual = 1;
const alumnosPorPagina = 10;

// 🟦 Cargar selects
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

// 🟦 Cargar datos del aula a editar
async function cargarAula() {
  const res = await fetch(`${API_URL}/${idAula}`);
  if (!res.ok) {
    alert("Error al obtener los datos del aula");
    return;
  }
  const aula = await res.json();

  profesorSelect.value = aula.profesor?.idprofesor || "";
  cursoSelect.value = aula.curso?.idcurso || "";
  seleccionadosGlobal = new Set(aula.alumnos.map(a => a.idalumno));
  actualizarContador();

  // Cargar días y horarios
  diasContainer.innerHTML = "";
  if (aula.dias && aula.dias.length > 0) {
    aula.dias.forEach(d => agregarFilaDia(d.dia, d.horaInicio, d.horaFin));
  } else {
    agregarFilaDia(); // mínimo una fila
  }
}

// 🟦 Cargar alumnos y mostrar con paginación
async function cargarAlumnos() {
  const res = await fetch(API_ALUMNOS);
  alumnos = await res.json();
  alumnosFiltrados = alumnos;
  mostrarAlumnos();
}

// 🟦 Mostrar alumnos por página
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
}

// 🟦 Paginación
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

// 🟦 Buscador
buscarAlumno.addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  alumnosFiltrados = alumnos.filter(a =>
    `${a.nombres} ${a.apellidos}`.toLowerCase().includes(texto)
  );
  paginaActual = 1;
  mostrarAlumnos();
});

// 🟦 Contador
function actualizarContador() {
  contadorSeleccion.textContent = `Seleccionados: ${seleccionadosGlobal.size}`;
}

// 🟦 Crear fila para día y horario
function agregarFilaDia(dia = "", horaInicio = "", horaFin = "") {
  const fila = document.createElement("div");
  fila.classList.add("fila-dia");
  fila.innerHTML = `
    <select class="dia-select">
      <option value="">Seleccione día</option>
      <option value="Lunes" ${dia === "Lunes" ? "selected" : ""}>Lunes</option>
      <option value="Martes" ${dia === "Martes" ? "selected" : ""}>Martes</option>
      <option value="Miércoles" ${dia === "Miércoles" ? "selected" : ""}>Miércoles</option>
      <option value="Jueves" ${dia === "Jueves" ? "selected" : ""}>Jueves</option>
      <option value="Viernes" ${dia === "Viernes" ? "selected" : ""}>Viernes</option>
      <option value="Sábado" ${dia === "Sábado" ? "selected" : ""}>Sábado</option>
    </select>
    <input type="time" class="hora-inicio" value="${horaInicio || ""}">
    <input type="time" class="hora-fin" value="${horaFin || ""}">
    <button type="button" class="eliminarDiaBtn">🗑️</button>
  `;

  fila.querySelector(".eliminarDiaBtn").addEventListener("click", () => fila.remove());
  diasContainer.appendChild(fila);
}

// Botón agregar día
agregarDiaBtn.addEventListener("click", () => agregarFilaDia());

// 🟦 Guardar cambios
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const seleccionados = Array.from(seleccionadosGlobal);
  if (seleccionados.length < 15) {
    alert("Debes seleccionar al menos 15 alumnos.");
    return;
  }

  const dias = Array.from(diasContainer.querySelectorAll(".fila-dia")).map(f => ({
    dia: f.querySelector(".dia-select").value,
    horaInicio: f.querySelector(".hora-inicio").value,
    horaFin: f.querySelector(".hora-fin").value
  })).filter(d => d.dia);

  const datos = {
    profesor: { idprofesor: parseInt(profesorSelect.value) },
    curso: { idcurso: parseInt(cursoSelect.value) },
    dias,
    idsAlumnos: seleccionados
  };

  const res = await fetch(`${API_URL}/${idAula}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });

  if (res.ok) {
    alert("Aula actualizada correctamente");
    window.location.href = "aula.html";
  } else {
    alert("Error al actualizar el aula");
  }
});

// 🟦 Botón cancelar
volverBtn.addEventListener("click", () => {
  window.location.href = "aula.html";
});

// 🟦 Inicializar
(async () => {
  await cargarSelect(API_PROFESORES, profesorSelect, "profesor");
  await cargarSelect(API_CURSOS, cursoSelect, "curso");
  await cargarAula();
  await cargarAlumnos();
})();
