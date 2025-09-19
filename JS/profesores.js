let Profesores = JSON.parse(localStorage.getItem("Profesores")) || [];
    let editandoId = null;
    let nextId = Profesores.length ? Profesores[Profesores.length - 1].id + 1 : 1;

    const form = document.getElementById("formProfesor");
    const tbody = document.querySelector("#tablaProfesores tbody");
    const btnSubmit = document.getElementById("btnSubmit");

    const inputUsuario = document.getElementById("usuario");
    const inputNombre = document.getElementById("nombre");
    const inputApellido = document.getElementById("apellido");
    const inputFecha = document.getElementById("fecha");
    const inputEstado = document.getElementById("estado");

    function guardarLocal() {
      localStorage.setItem("Profesores", JSON.stringify(Profesores));
    }

    function render() {
      tbody.innerHTML = "";
      Profesores.forEach(prof => {
        tbody.innerHTML += `
          <tr>
            <td>${prof.id}</td>
            <td>${prof.usuario}</td>
            <td>${prof.nombre}</td>
            <td>${prof.apellido}</td>
            <td>${prof.fecha}</td>
            <td>${prof.estado}</td>
            <td>
              <button class="btn btn-edit" onclick="editar(${prof.id})">Editar</button>
              <button class="btn btn-delete" onclick="eliminar(${prof.id})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    }

    form.addEventListener("submit", e => {
      e.preventDefault();
      const usuario = inputUsuario.value;
      const nombre = inputNombre.value.trim();
      const apellido = inputApellido.value.trim();
      const fecha = inputFecha.value;
      const estado = inputEstado.value;

      if (!nombre || !apellido) return;

      if (editandoId === null) {
        Profesores.push({ id: nextId++, usuario, nombre, apellido, fecha, estado });
      } else {
        const prof = Profesores.find(x => x.id === editandoId);
        if (prof) {
          prof.usuario = usuario;
          prof.nombre = nombre;
          prof.apellido = apellido;
          prof.fecha = fecha;
          prof.estado = estado;
        }
        editandoId = null;
        btnSubmit.textContent = "Agregar";
      }

      guardarLocal();
      render();
      form.reset();
    });

    window.editar = function(id) {
      const prof = Profesores.find(x => x.id === id);
      if (!prof) return;
      inputUsuario.value = prof.usuario;
      inputNombre.value = prof.nombre;
      inputApellido.value = prof.apellido;
      inputFecha.value = prof.fecha;
      inputEstado.value = prof.estado;
      btnSubmit.textContent = "Actualizar";
      editandoId = id;
    }

    window.eliminar = function(id) {
      Profesores = Profesores.filter(p => p.id !== id);
      guardarLocal();
      render();
    }

    // Inicial
    render();