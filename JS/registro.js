document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const alertBox = document.getElementById("alert");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Crear el nuevo usuario
    const nuevoUsuario = {
      usuario: document.getElementById("nombre").value.trim(), // 🔹 aquí está la clave
      nombre: document.getElementById("nombre").value.trim(),
      apellidos: document.getElementById("apellidos").value.trim(),
      dni: document.getElementById("dni").value.trim(),
      grado: document.getElementById("grado").value.trim(),
      fechaIngreso: document.getElementById("fechaIngreso").value,
      telefono: document.getElementById("telefono").value.trim(),
      password: document.getElementById("password").value.trim(),
      rol: document.getElementById("rol").value.trim()
    };

    // Validar campos vacíos
    if (Object.values(nuevoUsuario).some(v => !v)) {
      mostrarMensaje("⚠️ Todos los campos son obligatorios.", "danger");
      return;
    }

    // Obtener usuarios guardados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el DNI o el usuario ya existen
    const existe = usuarios.some(u => u.dni === nuevoUsuario.dni || u.usuario === nuevoUsuario.usuario);
    if (existe) {
      mostrarMensaje("⚠️ Ya existe un usuario con ese nombre o DNI.", "warning");
      return;
    }

    // Guardar nuevo usuario
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensaje("✅ Registro exitoso. Ahora puedes iniciar sesión.", "success");

    // Limpiar formulario y redirigir
    form.reset();
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });

  function mostrarMensaje(texto, tipo = "info") {
    alertBox.className = `alert alert-${tipo} mt-3`;
    alertBox.textContent = texto;
    alertBox.style.display = "block";
  }
});




