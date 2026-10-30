const CLAVE = "historial";
let filtro = "Todos";

function leer(){
  try { return JSON.parse(localStorage.getItem(CLAVE) || "[]"); }
  catch (e) { return []; }
}

function cuando(ts){
  const d = new Date(ts), hoy = new Date();
  const dia = x => new Date(x.getFullYear(), x.getMonth(), x.getDate());
  const dif = Math.round((dia(hoy) - dia(d)) / 86400000);
  const fecha = dif === 0 ? "Hoy"
              : dif === 1 ? "Ayer"
              : dif < 7   ? "Hace " + dif + " d"
              : d.toLocaleDateString("es", { day: "numeric", month: "short" });
  const hora = d.toLocaleTimeString("es", { hour: "numeric", minute: "2-digit" });
  return [fecha, hora];
}

function dibujar(){
  const todo = leer();
  const datos = filtro === "Todos" ? todo : todo.filter(e => e.camino[0] === filtro);
  const lista = document.getElementById("hLista");
  lista.innerHTML = "";

  document.getElementById("hCuenta").textContent =
    todo.length === 0 ? "" :
    todo.length === 1 ? "1 búsqueda guardada en este dispositivo"
                      : todo.length + " búsquedas guardadas en este dispositivo";

  const vacio = todo.length === 0;
  document.getElementById("hVacio").hidden = !vacio;
  document.getElementById("hFiltros").hidden = vacio;
  document.getElementById("hBorrar").parentElement.hidden = vacio;
  lista.hidden = datos.length === 0;

  datos.forEach(e => {
    const fila = document.createElement("div");
    fila.className = "h-fila";

    const [f, h] = cuando(e.fecha);
    const fecha = document.createElement("div");
    fecha.className = "h-fecha";
    const b = document.createElement("b");    b.textContent = f;
    const s = document.createElement("span"); s.textContent = h;
    fecha.append(b, s);

    const centro = document.createElement("div");
    const tema = document.createElement("p");
    tema.className = "h-tema";
    tema.textContent = e.camino[e.camino.length - 1];
    const ruta = document.createElement("div");
    ruta.className = "h-ruta";
    e.camino.forEach((paso, i) => {
      if (i > 0){
        const sep = document.createElement("span");
        sep.className = "h-sep";
        sep.textContent = "›";
        ruta.appendChild(sep);
      }
      const chip = document.createElement("span");
      chip.className = "h-chip c" + Math.min(i, 4);
      chip.textContent = paso;
      ruta.appendChild(chip);
    });
    centro.append(tema, ruta);

    const abrir = document.createElement("button");
    abrir.className = "h-abrir";
    abrir.type = "button";
    abrir.textContent = "Abrir";
    abrir.onclick = () => {
      sessionStorage.setItem("retomar", JSON.stringify(e.camino));
      location.href = "index.html";
    };

    fila.append(fecha, centro, abrir);
    lista.appendChild(fila);
  });
}

document.querySelectorAll("#hFiltros button").forEach(btn => {
  btn.onclick = () => {
    filtro = btn.dataset.f;
    document.querySelectorAll("#hFiltros button").forEach(x => x.classList.toggle("activo", x === btn));
    dibujar();
  };
});

document.getElementById("hBorrar").onclick = () => {
  if (confirm("¿Borrar todo tu historial?")){
    localStorage.removeItem(CLAVE);
    dibujar();
  }
};

dibujar();