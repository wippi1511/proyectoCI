let cursos = JSON.parse(localStorage.getItem('cursos')) || []
let editIndex = -1
let nextId = cursos.length ? Math.max(...cursos.map(c => c.idcurso)) + 1 : 1

const form = document.getElementById('cursoForm')
const tabla = document.getElementById('tablaCursos')
const modalTitle = document.getElementById('modalTitle')
const modal = new bootstrap.Modal(document.getElementById('modalCurso'))

function guardarCursos() {
  localStorage.setItem('cursos', JSON.stringify(cursos))
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  const nombre = document.getElementById('nombre').value
  const duracion = document.getElementById('duracion').value
  const estado = document.getElementById('estado').value

  if (editIndex === -1) {
    cursos.push({ idcurso: nextId++, nombre, duracion, estado })
  } else {
    cursos[editIndex].nombre = nombre
    cursos[editIndex].duracion = duracion
    cursos[editIndex].estado = estado
    editIndex = -1
  }

  guardarCursos()
  form.reset()
  modal.hide()
  mostrarCursos()
})

function mostrarCursos() {
  tabla.innerHTML = ''
  cursos.forEach((curso, index) => {
    tabla.innerHTML += `
      <tr>
        <td data-label="ID">${curso.idcurso}</td>
        <td data-label="Nombre">${curso.nombre}</td>
        <td data-label="Duración">${curso.duracion}</td>
        <td data-label="Estado">${curso.estado}</td>
        <td data-label="Acciones">
          <button class="btn btn-sm btn-warning me-2" onclick="editarCurso(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarCurso(${index})">Eliminar</button>
        </td>
      </tr>
    `
  })
}

function editarCurso(index) {
  const curso = cursos[index]
  document.getElementById('nombre').value = curso.nombre
  document.getElementById('duracion').value = curso.duracion
  document.getElementById('estado').value = curso.estado
  editIndex = index
  modalTitle.textContent = 'Editar Curso'
  modal.show()
}

function eliminarCurso(index) {
  cursos.splice(index, 1)
  guardarCursos()
  mostrarCursos()
}

document.getElementById('modalCurso').addEventListener('hidden.bs.modal', () => {
  modalTitle.textContent = 'Agregar Curso'
  form.reset()
  editIndex = -1
})

mostrarCursos()

// menú responsive
const sidebar = document.getElementById('sidebar')
const overlay = document.getElementById('overlay')
const toggleBtn = document.querySelector('.menu-toggle')

function checkToggleBtnVisibility() {
  if (window.innerWidth > 768) {
    toggleBtn.style.display = 'none'
    sidebar.classList.remove('active')
    overlay.classList.remove('active')
  } else {
    if (!sidebar.classList.contains('active')) {
      toggleBtn.style.display = 'block'
    } else {
      toggleBtn.style.display = 'none'
    }
  }
}

toggleBtn.addEventListener('click', () => {
  sidebar.classList.add('active')
  overlay.classList.add('active')
  toggleBtn.style.display = 'none'
})

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active')
  overlay.classList.remove('active')
  toggleBtn.style.display = 'block'
})

window.addEventListener('resize', checkToggleBtnVisibility)
window.addEventListener('load', checkToggleBtnVisibility)
