const API_URL = "http://localhost:8080/api/aulas";
const API_PROFESORES = "http://localhost:8080/api/profesores/activos";
const API_CURSOS = "http://localhost:8080/api/cursos/activos";
const API_ALUMNOS = "http://localhost:8080/api/alumnos/activos";

const form = document.getElementById("aulaForm");
const horario = document.getElementById("horario");
const profesorSelect = document.getElementById("profesorSelect");
const cursoSelect = document.getElementById("cursoSelect");
const alumnosContainer = document.getElementById("alumnosContainer");
const buscarAlumno = document.getElementById("buscarAlumno");
const paginacionDiv = document.getElementById("paginacion");
const contadorSeleccion = document.getElementById("contadorSeleccion");
const tablaAulas = document.getElementById("tablaAulas").querySelector("tbody");
let seleccionadosGlobal = new Set();
let alumnos = [];
let alumnosFiltrados = [];
let paginaActual = 1;
const alumnosPorPagina = 10;

// Cargar profesores y cursos
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

async function cargarDatos() {
  await cargarSelect(API_PROFESORES, profesorSelect, "profesor");
  await cargarSelect(API_CURSOS, cursoSelect, "curso");

  const res = await fetch(API_ALUMNOS);
  alumnos = await res.json();
  alumnosFiltrados = alumnos;
  mostrarAlumnos();
}

// Mostrar alumnos paginados
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
      if (e.target.checked) {
        seleccionadosGlobal.add(id);
      } else {
        seleccionadosGlobal.delete(id);
      }
      actualizarContador(); 
    });

    alumnosContainer.appendChild(div);
  });

  renderPaginacion();
  actualizarContador(); // refresca el contador
}



// Paginación
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

// Buscador de alumnos
buscarAlumno.addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  alumnosFiltrados = alumnos.filter(a =>
  `${a.nombres} ${a.apellidos}`.toLowerCase().includes(texto)
);
  
  paginaActual = 1;
  mostrarAlumnos();
});

// Crear Aula
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const seleccionados = Array.from(seleccionadosGlobal);

  if (seleccionados.length < 15) {
    alert("Debes seleccionar al menos 15 alumnos.");
    return;
  }

  const datos = {
    horario: horario.value,
    idProfesor: parseInt(profesorSelect.value),
    idCurso: parseInt(cursoSelect.value),
    idsAlumnos: seleccionados
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
    mostrarAlumnos();
    listarAulas();
  } else {
    alert("Error al crear el aula");
  }
});
function actualizarContador() {
  contadorSeleccion.textContent = `Seleccionados: ${seleccionadosGlobal.size} `;
}

async function listarAulas() {
  const res = await fetch(API_URL);
  if (!res.ok) return;
  const aulas = await res.json();

  tablaAulas.innerHTML = "";

  aulas.forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.id || a.idaula || ""}</td>
      <td>${a.horario}</td>
      <td>${a.profesor?.nombre || ""} ${a.profesor?.apellidos || ""}</td>
      <td>${a.curso?.nombre || ""}</td>
      <td>${a.alumnos?.length || 0}</td>
    `;
    tablaAulas.appendChild(tr);
  });
}



cargarDatos();
listarAulas();