let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
let editIndex = -1;

const form = document.getElementById('cursoForm');
const tabla = document.getElementById('tablaCursos');
const modalTitle = document.getElementById('modalTitle');
const modal = new bootstrap.Modal(document.getElementById('modalCurso'));

function guardarCursos() {
  localStorage.setItem('cursos', JSON.stringify(cursos));
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const codigo = document.getElementById('codigo').value;
  const profesor = document.getElementById('profesor').value;
  const horario = document.getElementById('horario').value;

  if (editIndex === -1) {
    cursos.push({ nombre, codigo, profesor, horario });
  } else {
    cursos[editIndex] = { nombre, codigo, profesor, horario };
    editIndex = -1;
  }

  guardarCursos();
  form.reset();
  modal.hide();
  mostrarCursos();
});

function mostrarCursos() {
  tabla.innerHTML = '';
  cursos.forEach((curso, index) => {
    tabla.innerHTML += `
      <tr>
        <td data-label="Nombre">${curso.nombre}</td>
        <td data-label="Código">${curso.codigo}</td>
        <td data-label="Profesor">${curso.profesor}</td>
        <td data-label="Horario">${curso.horario}</td>
        <td data-label="Acciones">
          <button class="btn btn-sm btn-warning me-2" onclick="editarCurso(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarCurso(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editarCurso(index) {
  const curso = cursos[index];
  document.getElementById('nombre').value = curso.nombre;
  document.getElementById('codigo').value = curso.codigo;
  document.getElementById('profesor').value = curso.profesor;
  document.getElementById('horario').value = curso.horario;
  editIndex = index;
  modalTitle.textContent = "Editar Curso";
  modal.show();
}

function eliminarCurso(index) {
  cursos.splice(index, 1);
  guardarCursos();
  mostrarCursos();
}

document.getElementById('modalCurso').addEventListener('hidden.bs.modal', () => {
  modalTitle.textContent = "Agregar Curso";
  form.reset();
  editIndex = -1;
});

mostrarCursos();

/* menu en celular */
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const toggleBtn = document.querySelector(".menu-toggle");

function checkToggleBtnVisibility() {
  if (window.innerWidth > 768) {
    toggleBtn.style.display = "none";
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  } else {
    if (!sidebar.classList.contains("active")) {
      toggleBtn.style.display = "block";
    } else {
      toggleBtn.style.display = "none";
    }
  }
}

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  toggleBtn.style.display = "none";
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  toggleBtn.style.display = "block";
});

window.addEventListener("resize", checkToggleBtnVisibility);
window.addEventListener("load", checkToggleBtnVisibility);

(function () {
      const sel   = document.getElementById('horarioSelect');
      const hidden= document.getElementById('horario');   // mantiene el valor final
      const grupo = document.getElementById('horarioOtroGroup');
      const hinic = document.getElementById('horaInicio');
      const hfin  = document.getElementById('horaFin');
      const form  = document.getElementById('cursoForm');
      const modal = document.getElementById('modalCurso');

      function fmt(t){
        if(!t) return '';
        const [HH,MM] = t.split(':').map(Number);
        const ampm = HH >= 12 ? 'pm' : 'am';
        const hh = ((HH + 11) % 12) + 1;
        return `${hh}:${MM.toString().padStart(2,'0')} ${ampm}`;
      }

      sel.addEventListener('change', () => {
        if (sel.value === 'otro') {
          grupo.classList.remove('d-none');
          hidden.value = '';
          hinic.focus();
        } else {
          grupo.classList.add('d-none');
          hidden.value = sel.options[sel.selectedIndex]?.text || '';
        }
      });

      [hinic, hfin].forEach(el => el.addEventListener('change', () => {
        if (hinic.value && hfin.value) {
          hidden.value = `${fmt(hinic.value)} – ${fmt(hfin.value)}`;
        }
      }));

      // Validación ligera: asegura que tengamos un valor final en el hidden
      form.addEventListener('submit', (e) => {
        if (!hidden.value) {
          e.preventDefault();
          alert('Por favor selecciona un horario o completa Inicio y Fin.');
        }
      });

      // Reset limpio cada vez que abres el modal
      modal.addEventListener('show.bs.modal', () => {
        sel.selectedIndex = 0;
        grupo.classList.add('d-none');
        hinic.value = hfin.value = '';
        hidden.value = '';
      });
    })();

    
