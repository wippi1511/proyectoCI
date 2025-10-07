let Profesores = JSON.parse(localStorage.getItem("Profesores")) || [];
    let editandoId = null;
    let nextId = Profesores.length ? Profesores[Profesores.length - 1].id + 1 : 1;

    const form = document.getElementById("formProfesor");
    const tbody = document.querySelector("#tablaProfesores tbody");
    const btnSubmit = document.getElementById("btnSubmit");
    const inputUsuario = document.getElementById("usuario");
    const inputNombre = document.getElementById("nombre");
    const inputDni = document.getElementById("dni");
    const inputApellidos = document.getElementById("apellidos");
    const inputGrado_academico = document.getElementById("grado_academico");
    const inputFecha_ingreso = document.getElementById("fecha_ingreso");
    const inputTelefono = document.getElementById("telefono");

    function guardarLocal() {
      localStorage.setItem("Profesores", JSON.stringify(Profesores));
    }

    function render() {
      tbody.innerHTML = "";
      for (const prof of Profesores) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${prof.id}</td>
          <td>${prof.usuario}</td>
          <td>${prof.dni}</td>
          <td>${prof.nombre}</td>
          <td>${prof.apellidos}</td>
          <td>${prof.grado_academico}</td>
          <td>${prof.fecha_ingreso}</td>
          <td>${prof.telefono}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editar(${prof.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminar(${prof.id})">Eliminar</button>
          </td>
        `;
        tbody.appendChild(tr);
      }
    }

    form.addEventListener("submit", e => {
      e.preventDefault();
      const usuario = inputUsuario.value.trim();
      const dni = inputDni.value;
      const nombre = inputNombre.value.trim();
      const apellidos = inputApellidos.value.trim();
      const grado_academico = inputGrado_academico.value.trim();
      const fecha_ingreso = inputFecha_ingreso.value;
      const telefono = inputTelefono.value;
      if (!usuario || !nombre || !apellidos) return;
      if (editandoId === null) {
        Profesores.push({
          id: nextId++,
          usuario,
          dni,
          nombre,
          apellidos,
          grado_academico,
          fecha_ingreso,
          telefono
        });
      } else {
        const prof = Profesores.find(x => x.id === editandoId);
        if (prof) {
          prof.usuario = usuario;
          prof.dni = dni;
          prof.nombre = nombre;
          prof.apellidos = apellidos;
          prof.grado_academico = grado_academico;
          prof.fecha_ingreso = fecha_ingreso;
          prof.telefono = telefono;
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
      inputDni.value = prof.dni;
      inputNombre.value = prof.nombre;
      inputApellidos.value = prof.apellidos;
      inputGrado_academico.value = prof.grado_academico;
      inputFecha_ingreso.value = prof.fecha_ingreso;
      inputTelefono.value = prof.telefono;
      btnSubmit.textContent = "Actualizar";
      editandoId = id;
    };

    window.eliminar = function(id) {
      Profesores = Profesores.filter(p => p.id !== id);
      guardarLocal();
      render();
    };

    // Inicial render
    render();