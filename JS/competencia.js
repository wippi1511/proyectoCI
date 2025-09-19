    let competencias = JSON.parse(localStorage.getItem("competencias")) || [];
    let nextId = competencias.length ? competencias[competencias.length - 1].id + 1 : 1;
    let editandoId = null;

    const form = document.getElementById("formCompetencia");
    const tbody = document.getElementById("tablaCompetencias");
    const btnSubmit = document.getElementById("btnSubmit");
    const inputNombre = document.getElementById("nombre");
    const inputDescripcion = document.getElementById("descripcion");

    function guardarLocal() {
      localStorage.setItem("competencias", JSON.stringify(competencias));
    }

    function render() {
      tbody.innerHTML = "";
      competencias.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${c.id}</td>
          <td>${c.nombre}</td>
          <td>${c.descripcion}</td>
          <td>
            <button onclick="editar(${c.id})">Editar</button>
            <button onclick="eliminar(${c.id})">Eliminar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    form.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = inputNombre.value.trim();
      const descripcion = inputDescripcion.value.trim();

      if (editandoId === null) {
        competencias.push({ id: nextId++, nombre, descripcion });
      } else {
        const c = competencias.find(x => x.id === editandoId);
        if (c) {
          c.nombre = nombre;
          c.descripcion = descripcion;
        }
        editandoId = null;
        btnSubmit.textContent = "Agregar";
      }

      guardarLocal();
      form.reset();
      render();
    });

    window.editar = id => {
      const c = competencias.find(x => x.id === id);
      if (c) {
        inputNombre.value = c.nombre;
        inputDescripcion.value = c.descripcion;
        editandoId = id;
        btnSubmit.textContent = "Actualizar";
      }
    };

    window.eliminar = id => {
      competencias = competencias.filter(x => x.id !== id);
      guardarLocal();
      render();
    };

    render();

    