// Mostrar / ocultar notificaciones
const btnNotif = document.getElementById("btnNotif");
const notifBox = document.getElementById("notifBox");

btnNotif.addEventListener("click", () => {
  notifBox.classList.toggle("show");
});
