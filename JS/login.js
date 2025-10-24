// Crear usuarios iniciales si no existen
if (!localStorage.getItem("usuarios")) {
  const iniciales = [
    { usuario: "profesor", password: "1234", rol: "profesor" },
    { usuario: "cordinador", password: "admin", rol: "cordinador" }
  ];
  localStorage.setItem("usuarios", JSON.stringify(iniciales));
}

const btnLogin = document.getElementById("btnLogin");
const mensaje = document.getElementById("mensaje");

function mostrarMensaje(texto, tipo = "danger") {
  mensaje.className = `alert alert-${tipo} mt-3`;
  mensaje.textContent = texto;
  mensaje.style.display = "block";
}

if (btnLogin) {
  btnLogin.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const user = document.getElementById("usuario").value.trim();
    const pass = document.getElementById("password").value.trim();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!user || !pass) {
      mostrarMensaje("Debes ingresar usuario y contraseña.");
      return;
    }

    const usuarioEncontrado = usuarios.find(u => u.usuario === user);

    if (!usuarioEncontrado) {
      mostrarMensaje("El nombre de usuario es incorrecto.");
      return;
    }

    if (usuarioEncontrado.password !== pass) {
      mostrarMensaje("La contraseña es incorrecta.");
      return;
    }

    // Inicio correcto
    mostrarMensaje("✅ Inicio de sesión exitoso, redirigiendo...", "success");
    localStorage.setItem("rol", usuarioEncontrado.rol);

    setTimeout(() => {
      window.location.href = "index.html"; // Asegúrate de que esta ruta existe
    }, 1200);
  });
}






