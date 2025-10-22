document.addEventListener("DOMContentLoaded", async () => {
  await cargarAulas();
  await cargarAlumnos();
  document.getElementById("btnBuscar").addEventListener("click", buscarHistorial);
});

async function cargarAulas() {
  const res = await fetch("http://localhost:8080/api/aulas");
  const data = await res.json();
  const select = document.getElementById("aulaSelect");
  select.innerHTML = '<option value="">--Todas--</option>';
  data.forEach(aula => {
    const option = document.createElement("option");
    option.value = aula.id;
    option.textContent = aula.nombre;
    select.appendChild(option);
  });
}

async function cargarAlumnos() {
  const res = await fetch("http://localhost:8080/api/alumnos");
  const data = await res.json();
  const select = document.getElementById("alumnoSelect");
  select.innerHTML = '<option value="">--Todos--</option>';
  data.forEach(al => {
    const option = document.createElement("option");
    option.value = al.idalumno;
    option.textContent = `${al.nombres} ${al.apellidos}`;
    select.appendChild(option);
  });
}

async function buscarHistorial() {
  const idAula = document.getElementById("aulaSelect").value;
  const idAlumno = document.getElementById("alumnoSelect").value;
  const inicio = document.getElementById("fechaInicio").value;
  const fin = document.getElementById("fechaFin").value;

  const params = new URLSearchParams();
  if (idAula) params.append("idAula", idAula);
  if (idAlumno) params.append("idAlumno", idAlumno);
  if (inicio) params.append("inicio", inicio);
  if (fin) params.append("fin", fin);

  const url = `http://localhost:8080/api/asistencias/historial?${params.toString()}`;
  const res = await fetch(url);
  const data = await res.json();
  mostrarHistorial(data);
}

function mostrarHistorial(lista) {
  const tbody = document.querySelector("#tablaHistorial tbody");
  tbody.innerHTML = "";
  lista.forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.fecha}</td>
      <td>${a.aula?.nombre || ""}</td>
      <td>${a.alumno?.nombres} ${a.alumno?.apellidos}</td>
      <td>${a.estado}</td>
      <td>${a.observacion || ""}</td>
    `;
    tbody.appendChild(tr);
  });
}
