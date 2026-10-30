const form    = document.getElementById("ctForm");
const nombre  = document.getElementById("ctNombre");
const correo  = document.getElementById("ctCorreo");
const mensaje = document.getElementById("ctMensaje");
const trampa  = document.getElementById("ctTrampa");
const cuenta  = document.getElementById("ctCuenta");
const errorEl = document.getElementById("ctError");
const boton   = document.getElementById("ctEnviar");
const ok      = document.getElementById("ctOk");

mensaje.addEventListener("input", () => {
  cuenta.textContent = mensaje.value.length + " / 1000";
});

function marcar(campo, malo){
  campo.closest(".ct-campo").classList.toggle("malo", malo);
}

function avisar(texto){
  errorEl.textContent = texto;
  errorEl.hidden = !texto;
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  avisar("");

  const okNombre  = nombre.value.trim().length >= 2;
  const okCorreo  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim());
  const okMensaje = mensaje.value.trim().length >= 5;
  marcar(nombre, !okNombre);
  marcar(correo, !okCorreo);
  marcar(mensaje, !okMensaje);

  if (!okNombre || !okCorreo || !okMensaje){
    avisar("Revisa los campos marcados: escribe tu nombre, un correo válido y tu mensaje.");
    return;
  }
  if (trampa.value) return;

  // Simulación: no se envía nada a ningún servidor.
  boton.disabled = true;
  boton.textContent = "Enviando…";
  setTimeout(() => {
    form.hidden = true;
    ok.hidden = false;
  }, 600);
});