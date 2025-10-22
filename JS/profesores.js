    let Profesores = JSON.parse(localStorage.getItem("Profesores")) || [];
    let editandoId = null;
    let nextId = Profesores.length ? Profesores[Profesores.length - 1].id + 1 : 1;

    const form = document.getElementById("formProfesor");
    const tbody = document.querySelector("#tablaProfesores tbody");
    const btnSubmit = document.getElementById("btnSubmit");
    const inputUsuario = document.getElementById("usuario");
    const inputNombres = document.getElementById("nombres");
    const inputDni = document.getElementById("dni");
    const inputApellidos = document.getElementById("apellidos");
    const inputGrado_academico = document.getElementById("grado_academico");
    const inputFecha_ingreso = document.getElementById("fecha_ingreso");
    const inputTelefono = document.getElementById("telefono");
    const inputEstado = document.getElementById("estado");

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
          <td>${prof.nombres}</td>
          <td>${prof.apellidos}</td>
          <td>${prof.grado_academico}</td>
          <td>${prof.fecha_ingreso}</td>
          <td>${prof.telefono}</td>
          <td>${prof.estado}</td>
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
      const nombres = inputNombres.value.trim();
      const apellidos = inputApellidos.value.trim();
      const grado_academico = inputGrado_academico.value.trim();
      const fecha_ingreso = inputFecha_ingreso.value;
      const telefono = inputTelefono.value;
      const estado = inputEstado.value;
      if (!usuario || !nombres || !apellidos) return;
      if (editandoId === null) {
        Profesores.push({
          id: nextId++,
          usuario,
          dni,
          nombres,
          apellidos,
          grado_academico,
          fecha_ingreso,
          telefono,
          estado
        });
      } else {
        const prof = Profesores.find(x => x.id === editandoId);
        if (prof) {
          prof.usuario = usuario;
          prof.dni = dni;
          prof.nombres = nombres;
          prof.apellidos = apellidos;
          prof.grado_academico = grado_academico;
          prof.fecha_ingreso = fecha_ingreso;
          prof.telefono = telefono;
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
      inputDni.value = prof.dni;
      inputNombres.value = prof.nombres;
      inputApellidos.value = prof.apellidos;
      inputGrado_academico.value = prof.grado_academico;
      inputFecha_ingreso.value = prof.fecha_ingreso;
      inputTelefono.value = prof.telefono;
      inputEstado.value = prof.estado;
      btnSubmit.textContent = "Actualizar";
      editandoId = id;
    };

    window.eliminar = function(id) {
      const prof = Profesores.find(p => p.id === id);
      if (prof) {
        prof.estado = "Inactivo"; // Cambia el estado en lugar de eliminar
        guardarLocal();
        render();
      }
    };


    // Inicial render
    render();
    function exportarCSV() {
      const tabla = document.getElementById("tablaProfesores");
      let csv = [];
      for (let fila of tabla.rows) {
        let datosFila = [];
        for (let i = 0; i < fila.cells.length - 1; i++) { // -1 para saltar la columna "Acciones"
          datosFila.push(fila.cells[i].innerText);
        }

        csv.push(datosFila.join(","));
      }

      const blob = new Blob([csv.join("\n")], { type: "text/csv" });
      const enlace = document.createElement("a");
      enlace.href = URL.createObjectURL(blob);
      enlace.download = "lista_profesores.csv";
      enlace.click();
    }

    // Función para exportar a Excel (usando formato simple .xls)
    function exportarExcel() {
      let tablaOriginal = document.getElementById("tablaProfesores");
      let tablaCopia = tablaOriginal.cloneNode(true);

      // Eliminar la última columna ("Acciones") de cada fila
      for (let fila of tablaCopia.rows) {
        fila.deleteCell(fila.cells.length - 1);
      }

      const tabla = tablaCopia.outerHTML;

      const blob = new Blob(['\ufeff' + tabla], { type: 'application/vnd.ms-excel' });
      const enlace = document.createElement('a');
      enlace.href = URL.createObjectURL(blob);
      enlace.download = 'lista_profesores.xls';
      enlace.click();
    }