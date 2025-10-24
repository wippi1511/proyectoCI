document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaDesempeño");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuToggle = document.querySelector(".menu-toggle");
  const modal = document.getElementById("modalEditar");
  const form = document.getElementById("formDesempeno");
  const inputNota = document.getElementById("inputNota");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnCerrar = document.getElementById("btnCerrar");

  let profesorActual = null;

  // menu lateral
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  // datos locales
  const Profesores = JSON.parse(localStorage.getItem("Profesores")) || [];
  const Desempeños = JSON.parse(localStorage.getItem("Desempeños")) || [];

  function cargarTabla() {
    tabla.innerHTML = "";
    Profesores.forEach(prof => {
      const registro = Desempeños.find(d => d.id === prof.id);
      const notaActual = registro ? registro.nota : "-";

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${prof.id}</td>
        <td>${prof.nombre || "-"}</td>
        <td>${prof.apellidos || "-"}</td>
        <td>${prof.grado_academico || "-"}</td>
        <td>${notaActual}</td>
        <td><button class="btn btn-sm btn-editar">Editar</button></td>
      `;
      tabla.appendChild(fila);

      const btnEditar = fila.querySelector(".btn-editar");
      btnEditar.addEventListener("click", () => {
        profesorActual = prof;
        inputNota.value = notaActual !== "-" ? notaActual : "";
        modal.classList.add("mostrar");
      });
    });
  }

  function cerrarModal() {
    modal.classList.remove("mostrar");
    profesorActual = null;
  }

  btnCancelar.addEventListener("click", cerrarModal);
  btnCerrar.addEventListener("click", cerrarModal);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!profesorActual) return;

    const nuevaNota = inputNota.value.trim();
    if (nuevaNota === "" || isNaN(nuevaNota) || nuevaNota < 0 || nuevaNota > 20) {
      alert("Ingrese un número válido entre 0 y 20");
      return;
    }

    const existente = Desempeños.find(d => d.id === profesorActual.id);
    if (existente) {
      existente.nota = nuevaNota;
    } else {
      Desempeños.push({
        id: profesorActual.id,
        nombre: profesorActual.nombre,
        apellidos: profesorActual.apellidos,
        grado_academico: profesorActual.grado_academico,
        nota: nuevaNota
      });
    }

    localStorage.setItem("Desempeños", JSON.stringify(Desempeños));
    cerrarModal();
    cargarTabla();
  });

  inputNota.addEventListener("input", () => {
    inputNota.value = inputNota.value.replace(/[^0-9]/g, "");
  });

  cargarTabla();
});
