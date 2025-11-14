const API_URL = "http://localhost:8080/api/competencias";

const form = document.getElementById("formCompetencia");
const tbody = document.querySelector("#tablaCompetencias tbody");
const btnSubmit = document.getElementById("btnSubmit");
const inputNombre = document.getElementById("nombre");
const inputDescripcion = document.getElementById("descripcion");

let editandoId = null;

// Cargar todas las competencias
async function cargarCompetencias() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener competencias");
    const data = await res.json();
    render(data);
  } catch (error) {
    console.error(error);
    alert("No se pudieron cargar las competencias.");
  }
}

// Renderizar tabla
function render(competencias) {
  tbody.innerHTML = "";
  competencias.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.idcompetencia}</td>
      <td>${c.nombre}</td>
      <td>${c.descripcion}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editar(${c.idcompetencia})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminar(${c.idcompetencia})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Guardar (crear o actualizar)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = inputNombre.value.trim();
  const descripcion = inputDescripcion.value.trim();

  if (!nombre) {
    alert("El nombre es obligatorio.");
    return;
  }

  const competencia = { nombre, descripcion };
  let metodo = "POST";
  let url = API_URL;

  if (editandoId !== null) {
    metodo = "PUT";
    url = `${API_URL}/${editandoId}`;
  }

  try {
    const res = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(competencia)
    });

    if (res.ok) {
      alert(editandoId ? "Competencia actualizada correctamente" : "Competencia agregada correctamente");
      form.reset();
      btnSubmit.textContent = "Agregar";
      editandoId = null;
      cargarCompetencias();
    } else {
      alert("Error al guardar la competencia");
    }
  } catch (error) {
    console.error(error);
    alert("Error de conexión con el servidor.");
  }
});

// Editar
window.editar = async function(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("No se encontró la competencia");

    const c = await res.json();
    inputNombre.value = c.nombre;
    inputDescripcion.value = c.descripcion;
    editandoId = id;
    btnSubmit.textContent = "Actualizar";
  } catch (error) {
    console.error(error);
    alert("Error al cargar los datos de la competencia.");
  }
};

//  Eliminar
window.eliminar = async function(id) {
  if (!confirm("¿Desea eliminar esta competencia?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Competencia eliminada correctamente");
      cargarCompetencias();
    } else {
      alert("Error al eliminar la competencia");
    }
  } catch (error) {
    console.error(error);
    alert("Error de conexión con el servidor.");
  }
};

// 🟦 Inicializar
cargarCompetencias();

    