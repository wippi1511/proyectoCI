document.addEventListener("DOMContentLoaded", function () {
      const calendarEl = document.getElementById("calendar");

      const cursos = [
        {
          title: "Matemáticas Aplicadas",
          aula: "Aula 201",
          profesor: "Ing. Ramírez",
          start: "2025-10-21T08:00:00",
          end: "2025-10-21T10:00:00",
          color: "#007bff"
        },
        {
          title: "Física II",
          aula: "Aula 303",
          profesor: "Dra. López",
          start: "2025-10-22T09:00:00",
          end: "2025-10-22T11:00:00",
          color: "#28a745"
        },
        {
          title: "Taller de Robótica",
          aula: "Laboratorio 1",
          profesor: "Mtro. Pérez",
          start: "2025-10-23T13:00:00",
          end: "2025-10-23T15:00:00",
          color: "#ffc107"
        }
      ];

      // Inicializar calendario
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "es", 
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
        },
        events: cursos,
            eventClick: function(info) {
            // Mostrar datos en el modal
                document.getElementById("modalTitulo").textContent = info.event.title;
                document.getElementById("modalAula").textContent = info.event.extendedProps.aula || "No especificada";
                document.getElementById("modalProfesor").textContent = info.event.extendedProps.profesor || "Desconocido";
                document.getElementById("modalInicio").textContent = new Date(info.event.start).toLocaleString();
                document.getElementById("modalFin").textContent = info.event.end ? new Date(info.event.end).toLocaleString() : "No especificado";

                const modal = new bootstrap.Modal(document.getElementById("detalleModal"));
                modal.show();
                }
        });        

    calendar.render();
});