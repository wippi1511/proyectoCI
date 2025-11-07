document.addEventListener("DOMContentLoaded", () => {
    cargarAulas();
    cargarAlumnos();
    document.getElementById("btnBuscar").addEventListener("click", buscarHistorial);
});

async function cargarAulas() {
    const res = await fetch("http://localhost:8080/api/aulas");
    const data = await res.json();
    const select = document.getElementById("aulaSelect");

    select.innerHTML = `<option value="">-- Todas --</option>`;

    data.forEach(aula => {
        const option = document.createElement("option");
        option.value = aula.id;
        option.textContent = `${aula.curso?.nombre ?? "Sin curso"} - ${aula.profesor?.nombre ?? ""}`;
        select.appendChild(option);
    });
}

async function cargarAlumnos() {
    const res = await fetch("http://localhost:8080/api/alumnos");
    const data = await res.json();
    const select = document.getElementById("alumnoSelect");

    select.innerHTML = `<option value="">-- Todos --</option>`;

    data.forEach(alumno => {
        const option = document.createElement("option");
        option.value = alumno.idalumno;
        option.textContent = `${alumno.nombres} ${alumno.apellidos}`;
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
    const lista = await res.json();

    mostrarHistorial(lista);
}

function mostrarHistorial(lista) {
    const tbody = document.querySelector("#tablaHistorial tbody");
    tbody.innerHTML = "";

    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-msg">No hay resultados</td></tr>`;
        return;
    }

    lista.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td>${item.fecha || "-"}</td>
        <td>${item.idaula ? `Aula #${item.idaula}` : "Sin aula"}</td>
        <td>${item.idalumno ?? "-"}</td>
        <td><span class="estado ${item.estado}">${item.estado}</span></td>
        <td>${item.observacion || "-"}</td>
        <td>${item.tipoOperacion}</td>
        `;

        tbody.appendChild(tr);
    });
}
