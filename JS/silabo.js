const form = document.getElementById("uploadForm");
    const tabla = document.getElementById("silabosTable").querySelector("tbody");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const archivo = document.getElementById("uploadFile").files[0];
        const curso = document.getElementById("cursoInput").value;
        const profesor = document.getElementById("profesorInput").value;

        if (!archivo) {
            mensaje.textContent = "⚠ Selecciona un archivo.";
            mensaje.className = "text-danger mt-2 fw-bold";
            return;
        }

        const fecha = new Date().toISOString().split("T")[0];
        const url = URL.createObjectURL(archivo);

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${archivo.name}</td>
            <td>${archivo.type || "Desconocido"}</td>
            <td>${fecha}</td>
            <td><input type="text" class="form-control form-control-sm cursoField" value="${curso}" readonly /></td>
            <td><input type="text" class="form-control form-control-sm profesorField" value="${profesor}" readonly /></td>
            <td>
                <a href="${url}" download="${archivo.name}" class="btn btn-primary btn-sm me-1">⬇ Descargar</a>
                <button class="btn btn-danger btn-sm me-1 eliminarBtn">🗑 Eliminar</button>
                <button class="btn btn-warning btn-sm editarBtn">✏ Editar</button>
            </td>
        `;

        tabla.appendChild(fila);

        mensaje.textContent = "✅ Sílabo subido correctamente.";
        mensaje.className = "text-success mt-2 fw-bold";

        form.reset();
    });

    tabla.addEventListener("click", (e) => {
        if (e.target.classList.contains("eliminarBtn")) {
            e.target.closest("tr").remove();
        }

        if (e.target.classList.contains("editarBtn")) {
            const fila = e.target.closest("tr");
            const cursoInput = fila.querySelector(".cursoField");
            const profesorInput = fila.querySelector(".profesorField");

            if (cursoInput.hasAttribute("readonly")) {
                cursoInput.removeAttribute("readonly");
                profesorInput.removeAttribute("readonly");
                e.target.textContent = "💾 Guardar";
            } else {
                cursoInput.setAttribute("readonly", true);
                profesorInput.setAttribute("readonly", true);
                e.target.textContent = "✏ Editar";
            }
        }
    });