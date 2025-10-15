const API_AULAS = "http://localhost:8080/api/aulas";
const API_PROFESORES = "http://localhost:8080/api/profesores/activos";
const API_CURSOS = "http://localhost:8080/api/cursos/activos";

document.addEventListener("DOMContentLoaded", () => {
    cargarAulas();
    cargarProfesores();
    cargarCursos();
});

const form = document.getElementById("aulaForm");
const tbody = document.getElementById("aulasTableBody");
const selectProfesor = document.getElementById("profesorSelect");
const selectCurso = document.getElementById("cursoSelect");

//  Cargar lista de aulas
async function cargarAulas() {
    tbody.innerHTML = "";
    try {
        const res = await fetch(API_AULAS);
        const aulas = await res.json();
        aulas.forEach(aula => agregarFila(aula));
    } catch (error) {
        console.error("Error cargando aulas:", error);
    }
}

//  Mostrar aulas en tabla
function agregarFila(aula) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${aula.id}</td>
        <td>${aula.horario}</td>
        <td>${aula.profesor?.nombre || "Sin nombre"}</td>
        <td>${aula.curso?.nombre || "Sin nombre"}</td>
        <td>
            <button onclick="eliminarAula(${aula.id})"> Eliminar</button>
        </td>
    `;
    tbody.appendChild(tr);
}

//  Cargar profesores activos
async function cargarProfesores() {
    try {
        const res = await fetch(API_PROFESORES);
        const profesores = await res.json();

        profesores.forEach(p => {
            const option = document.createElement("option");
            option.value = p.idprofesor;
            option.textContent = `${p.nombre} ${p.apellidos}`;
            selectProfesor.appendChild(option);
        });
    } catch (error) {
        console.error("Error cargando profesores:", error);
    }
}

//  Cargar cursos activos
async function cargarCursos() {
    try {
        const res = await fetch(API_CURSOS);
        const cursos = await res.json();

        cursos.forEach(c => {
            const option = document.createElement("option");
            option.value = c.idcurso;
            option.textContent = c.nombre;
            selectCurso.appendChild(option);
        });
    } catch (error) {
        console.error("Error cargando cursos:", error);
    }
}

//  Crear nueva aula
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevaAula = {
        horario: document.getElementById("horario").value,
        idprofesor: parseInt(selectProfesor.value),
        idcurso: parseInt(selectCurso.value)
    };

    try {
        const res = await fetch(API_AULAS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaAula)
        });

        if (res.ok) {
            alert("Aula registrada con éxito ");
            form.reset();
            cargarAulas();
        } else {
            alert("Error al registrar aula ");
        }
    } catch (error) {
        console.error("Error al guardar aula:", error);
    }
});

//  Eliminar aula
async function eliminarAula(id) {
    if (!confirm("¿Seguro que deseas eliminar esta aula?")) return;
    try {
        const res = await fetch(`${API_AULAS}/${id}`, { method: "DELETE" });
        if (res.ok) {
            cargarAulas();
        } else {
            alert("Error al eliminar aula ");
        }
    } catch (error) {
        console.error("Error eliminando aula:", error);
    }
}
