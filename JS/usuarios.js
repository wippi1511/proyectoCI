let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let editIndex = -1;
let nextId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

const form = document.getElementById('usuarioForm');
const tabla = document.getElementById('usuariosLista');
const submitBtn = form.querySelector('button');

let originalData = {};

let cancelBtn = document.createElement('button');
cancelBtn.type = 'button';
cancelBtn.textContent = 'Cancelar';
cancelBtn.style.marginLeft = '10px';
cancelBtn.style.backgroundColor = '#9e9e9e';
cancelBtn.style.color = 'white';
cancelBtn.style.border = 'none';
cancelBtn.style.padding = '10px 18px';
cancelBtn.style.borderRadius = '6px';
cancelBtn.style.cursor = 'pointer';
cancelBtn.style.display = 'none';
form.appendChild(cancelBtn);

cancelBtn.addEventListener('click', () => {
  form.reset();
  editIndex = -1;
  submitBtn.textContent = 'Registrar';
  submitBtn.disabled = false;
  cancelBtn.style.display = 'none';
});

// guarda los usuarios temporalmente en el cache local (luego c cambia por base de datos)
function guardarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;
  const correo = document.getElementById('correo').value;
  const rol = document.getElementById('rol').value;

  if (editIndex === -1) {
    usuarios.push({ id: nextId++, usuario, contrasena, correo, rol });
  } else {
    usuarios[editIndex] = { ...usuarios[editIndex], usuario, contrasena, correo, rol };
    editIndex = -1;
    cancelBtn.style.display = 'none';
    submitBtn.textContent = 'Registrar';
    submitBtn.disabled = false;
  }

  guardarUsuarios();
  form.reset();
  mostrarUsuarios();
});

function mostrarUsuarios() {
  tabla.innerHTML = '';
  usuarios.forEach((u, index) => {
    tabla.innerHTML += `
      <tr>
        <td data-label="ID">${u.id}</td>
        <td data-label="Usuario">${u.usuario}</td>
        <td data-label="Correo">${u.correo}</td>
        <td data-label="Rol">${u.rol}</td>
        <td data-label="Acciones">
          <button class="editar" onclick="editarUsuario(${index})">Editar</button>
          <button class="eliminar" onclick="eliminarUsuario(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editarUsuario(index) {
  const u = usuarios[index];
  document.getElementById('usuario').value = u.usuario;
  document.getElementById('contrasena').value = u.contrasena;
  document.getElementById('correo').value = u.correo;
  document.getElementById('rol').value = u.rol;
  editIndex = index;

  originalData = { ...u };

  submitBtn.textContent = 'Actualizar';
  submitBtn.disabled = true;
  cancelBtn.style.display = 'inline-block';
}

function detectarCambios() {
  if (editIndex === -1) return;

  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;
  const correo = document.getElementById('correo').value;
  const rol = document.getElementById('rol').value;

  submitBtn.disabled = !(
    usuario !== originalData.usuario ||
    contrasena !== originalData.contrasena ||
    correo !== originalData.correo ||
    rol !== originalData.rol
  );
}

['usuario','contrasena','correo','rol'].forEach(id => {
  document.getElementById(id).addEventListener('input', detectarCambios);
});

function eliminarUsuario(index) {
  usuarios.splice(index, 1);
  guardarUsuarios();
  mostrarUsuarios();
}

mostrarUsuarios();
