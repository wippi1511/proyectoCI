const API_URL = "http://localhost:8080/api/aulas"; 

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("No se proporcionó un ID de aula.");
    window.location.href = "aula.html";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener el aula");

    const aula = await res.json();

    // Mostrar información principal
    document.getElementById("aulaId").textContent = aula.idaula || aula.id || "-";
    document.getElementById("aulaProfesor").textContent =
      aula.profesor
        ? `${aula.profesor.nombre || ""} ${aula.profesor.apellidos || ""}`.trim()
        : "-";
    document.getElementById("aulaCurso").textContent = aula.curso?.nombre || "-";

    // === Mostrar los días y horarios ===
    const listaDias = document.getElementById("aulaDias");
    listaDias.innerHTML = "";

    if (aula.dias && aula.dias.length > 0) {
      aula.dias.forEach(d => {
        const li = document.createElement("li");

        // Tolerar distintos nombres de propiedad
        const dia = d.dia || d.diaSemana || d.dia_semana || "Día no especificado";
        const hi = d.horaInicio || d.hora_inicio || "";
        const hf = d.horaFin || d.hora_fin || "";

        li.textContent = `${dia}: ${hi}${hi && hf ? " - " : ""}${hf}`;
        listaDias.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "Sin horarios registrados";
      listaDias.appendChild(li);
    }

    // === Lista de alumnos ===
    const tbody = document.getElementById("alumnosBody");
    tbody.innerHTML = "";

    if (aula.alumnos && aula.alumnos.length > 0) {
      aula.alumnos.forEach(alumno => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${alumno.idalumno || "-"}</td>
          <td>${alumno.nombres || "-"}</td>
          <td>${alumno.apellidos || "-"}</td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="3">No hay alumnos registrados</td>`;
      tbody.appendChild(tr);
    }

  } catch (err) {
    console.error("Error cargando detalles del aula:", err);
    alert("No se pudieron cargar los detalles del aula");
  }
});

document.getElementById("volverBtn").addEventListener("click", () => {
  window.location.href = "aula.html";
});
