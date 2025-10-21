const API_URL = "http://localhost:8080/api/historial"; // tu endpoint del backend
const tbody = document.getElementById("historialBody");
const tipoFiltro = document.getElementById("tipoFiltro");
const fechaInicio = document.getElementById("fechaInicio");
const fechaFin = document.getElementById("fechaFin");
const btnFiltrar = document.getElementById("btnFiltrar");
const btnLimpiar = document.getElementById("btnLimpiar");

let historialCompleto = [];

// 🟦 Cargar historial desde el backend
async function cargarHistorial() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al cargar historial");
    historialCompleto = await res.json();
    mostrarHistorial(historialCompleto);
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="8">Error al cargar historial</td></tr>`;
  }
}

// 🟦 Mostrar datos en tabla
function mostrarHistorial(datos) {
  tbody.innerHTML = "";

  if (datos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">No hay registros</td></tr>`;
    return;
  }

  datos.forEach(reg => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${reg.idhistorial || reg.id}</td>
      <td>${reg.tipoOperacion || "-"}</td>
      <td>${new Date(reg.fechaOperacion).toLocaleString()}</td>
      <td>${reg.idaula || "-"}</td>
      <td>${reg.profesorNombre || "-"}</td>
      <td>${reg.cursoNombre || "-"}</td>
      <td>${reg.dias || "-"}</td>
      <td>${reg.cantidadAlumnos || 0}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 🟦 Aplicar filtros
function filtrarHistorial() {
  const tipo = tipoFiltro.value;
  const inicio = fechaInicio.value ? new Date(fechaInicio.value) : null;
  const fin = fechaFin.value ? new Date(fechaFin.value) : null;

  let filtrados = [...historialCompleto];

  if (tipo) filtrados = filtrados.filter(r => r.tipoOperacion === tipo);

  if (inicio) {
    filtrados = filtrados.filter(r => new Date(r.fechaOperacion) >= inicio);
  }
  if (fin) {
    filtrados = filtrados.filter(r => new Date(r.fechaOperacion) <= fin);
  }

  mostrarHistorial(filtrados);
}

// 🟦 Limpiar filtros
function limpiarFiltros() {
  tipoFiltro.value = "";
  fechaInicio.value = "";
  fechaFin.value = "";
  mostrarHistorial(historialCompleto);
}

// Eventos
btnFiltrar.addEventListener("click", filtrarHistorial);
btnLimpiar.addEventListener("click", limpiarFiltros);

// Inicialización
cargarHistorial();
