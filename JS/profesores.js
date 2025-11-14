const API_URL = "http://localhost:8080/api/profesores";
const API_USUARIOS = "http://localhost:8080/api/usuarios/activos"; 

const form = document.getElementById("formProfesor");
const tbody = document.querySelector("#tablaProfesores tbody");
const btnSubmit = document.getElementById("btnSubmit");

const inputUsuario = document.getElementById("usuario");
const inputDni = document.getElementById("dni");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputGrado = document.getElementById("grado_academico");
const inputFecha = document.getElementById("fecha_ingreso");
const inputTelefono = document.getElementById("telefono");

let editandoId = null;

// 🟦 Cargar usuarios en el select
async function cargarUsuariosSelect() {
  try {
    const res = await fetch(API_USUARIOS);
    if (!res.ok) throw new Error("Error al cargar usuarios");
    const usuarios = await res.json();
    inputUsuario.innerHTML = `<option value="">Seleccione un usuario</option>`;
    usuarios.forEach(u => {
      const option = document.createElement("option");
      option.value = u.id;
      option.textContent = u.usuario; // 'usuario' es el nombre de usuario
      inputUsuario.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    inputUsuario.innerHTML = `<option value="">Error al cargar usuarios</option>`;
  }
}

// Cargar todos los profesores
async function cargarProfesores() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    alert("Error al obtener los profesores");
    return;
  }
  const data = await res.json();
  render(data);
}

// Renderizar tabla
function render(profesores) {
  tbody.innerHTML = "";
  profesores.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.idprofesor}</td>
      <td>${p.usuario?.usuario || "(sin usuario)"}</td>
      <td>${p.dni}</td>
      <td>${p.nombre}</td>
      <td>${p.apellidos}</td>
      <td>${p.gradoAcademico}</td>
      <td>${p.fechaIngreso}</td>
      <td>${p.telefono}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editar(${p.idprofesor})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminar(${p.idprofesor})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Enviar datos al servidor (crear o editar)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const profesor = {
    usuario: { id: inputUsuario.value },
    dni: inputDni.value,
    nombre: inputNombre.value.trim(),
    apellidos: inputApellidos.value.trim(),
    gradoAcademico: inputGrado.value,
    fechaIngreso: inputFecha.value,
    telefono: inputTelefono.value
  };

  let metodo = "POST";
  let url = API_URL;

  if (editandoId !== null) {
    metodo = "PUT";
    url = `${API_URL}/${editandoId}`;
  }

  const res = await fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profesor)
  });

  if (res.ok) {
    alert(editandoId ? "Profesor actualizado correctamente" : "Profesor agregado correctamente");
    form.reset();
    btnSubmit.textContent = "Agregar";
    editandoId = null;
    cargarProfesores();
  } else {
    alert("Error al guardar el profesor");
  }
});

// Editar profesor
window.editar = async function(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return alert("No se pudo cargar el profesor");

  const p = await res.json();
  inputUsuario.value = p.usuario?.id || "";
  inputDni.value = p.dni;
  inputNombre.value = p.nombre;
  inputApellidos.value = p.apellidos;
  inputGrado.value = p.gradoAcademico;
  inputFecha.value = p.fechaIngreso;
  inputTelefono.value = p.telefono;

  btnSubmit.textContent = "Actualizar";
  editandoId = id;
};

// Eliminar profesor 
window.eliminar = async function(id) {
  if (!confirm("¿Desea eliminar este profesor?")) return;

  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (res.ok) {
    alert("Profesor eliminado correctamente");
    cargarProfesores();
  } else {
    alert("Error al eliminar el profesor");
  }
};

// Exportar a CSV
function exportarCSV() {
  const filas = [...document.querySelectorAll("#tablaProfesores tbody tr")];
  let csv = "ID,Usuario,DNI,Nombre,Apellidos,Grado Académico,Fecha Ingreso,Teléfono\n";

  filas.forEach(f => {
    const celdas = [...f.children].slice(0, 8); // sin columna "Acciones"
    csv += celdas.map(td => td.innerText).join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "profesores.csv";
  enlace.click();
}

// Exportar a Excel
function exportarExcel() {
  let tablaOriginal = document.getElementById("tablaProfesores");
  let tablaCopia = tablaOriginal.cloneNode(true);

  for (let fila of tablaCopia.rows) {
    fila.deleteCell(fila.cells.length - 1); // quitar columna Acciones
  }

  const tabla = tablaCopia.outerHTML;
  const blob = new Blob(['\ufeff' + tabla], { type: 'application/vnd.ms-excel' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = 'profesores.xls';
  enlace.click();
}

// Inicializar
cargarUsuariosSelect();
cargarProfesores();