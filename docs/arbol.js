const arbolPrincipal={
        pregunta: "¿Qué nivel deseas?",
        opc: [
          { titulo: "Colegio", hijo: arbolColegio },
          { titulo: "Universidad", hijo: arbolU },
        ]
      };

const niveles=["nivel", "disciplina","rama","tema","subtema", "tipo_doc", "link"];
let hist=[arbolPrincipal];
let elec={};

const PASOS_TOTAL = 5;
const etiquetas = ["NIVEL","DISCIPLINA","RAMA","TEMA","SUBTEMA"];
let camino = [];

function dibujarRuta(){
  const lista = document.getElementById("rutaLista");
  lista.innerHTML = "";
  for (let i = 0; i < PASOS_TOTAL; i++){
    const li = document.createElement("li");
    if (i < camino.length) li.className = "hecho";
    else if (i === camino.length) li.className = "actual";
    const et = document.createElement("span");
    et.textContent = etiquetas[i];
    const val = document.createElement("b");
    val.textContent = camino[i] || (i === camino.length ? "Elige…" : "—");
    li.append(et, val);
    lista.appendChild(li);
  }
}

function actualizarAvance(esFin){
  const hechos = esFin ? PASOS_TOTAL : Math.min(camino.length, PASOS_TOTAL);
  document.getElementById("avanceBarra").style.width = (hechos / PASOS_TOTAL * 100) + "%";
  document.getElementById("avanceTxt").textContent =
    esFin ? "¡Listo!" : `${hechos} de ${PASOS_TOTAL} pasos`;
}

function dibujarArbolVisual(pasos){
  const cont = document.getElementById("arbolVisual");

  // números "al azar" siempre iguales, para que las hojas no cambien de lugar
  let semilla = 1;
  const rnd = () => (semilla = (semilla * 16807) % 2147483647) / 2147483647;

  const puntas = [[60,120],[95,80],[150,60],[205,80],[240,120],[40,170],[260,170],[120,110],[180,110]];
  let ramas = "", hojas = "";
  puntas.forEach(([x, y]) => {
    ramas += `<path d="M150 300 C150 240 ${x} ${y+70} ${x} ${y}" fill="none" stroke="#C9D0EE" stroke-width="3" stroke-linecap="round"/>`;
    for (let i = 0; i < 7; i++){
      const hx = (x + rnd()*44 - 22).toFixed(1);
      const hy = (y + rnd()*32 - 18).toFixed(1);
      const r = Math.round(rnd()*180);
      hojas += `<ellipse cx="${hx}" cy="${hy}" rx="7" ry="3.6" transform="rotate(${r} ${hx} ${hy})" fill="#BFE9CC"/>`;
    }
  });

  // puntos por donde sube tu camino (uno por paso)
  const pts = [[150,300],[128,250],[96,205],[76,160],[64,118],[60,84]];
  const n = Math.min(pasos.length, PASOS_TOTAL);
  let ruta = "", marcas = "";

  if (n > 0){
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i <= n; i++){
      const [x0, y0] = pts[i-1], [x1, y1] = pts[i], ym = (y0 + y1) / 2;
      d += ` C${x0} ${ym} ${x1} ${ym} ${x1} ${y1}`;
    }
    ruta = `<path d="${d}" fill="none" stroke="#7FD6A0" stroke-width="7" stroke-linecap="round"/>`;

    for (let i = 1; i <= n; i++){
      marcas += `<circle cx="${pts[i][0]}" cy="${pts[i][1]}" r="7" fill="#fff" stroke="#1F9D6B" stroke-width="3"/>`;
    }
    const txt = esc(String(pasos[n-1]).slice(0, 16));
    const w = txt.length * 7 + 20;
    const [lx, ly] = pts[n];
    marcas += `<rect x="${lx+14}" y="${ly-13}" width="${w}" height="26" rx="13" fill="#596498"/>
      <text x="${lx+14+w/2}" y="${ly+4}" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="12" font-weight="700" fill="#fff">${txt}</text>`;
  }

  cont.innerHTML = `
    <svg viewBox="0 0 300 345" width="100%" role="img" aria-label="Tu rama en el árbol">
      <defs><radialGradient id="gArb"><stop offset="0" stop-color="#E2F8EA"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="150" cy="150" rx="140" ry="120" fill="url(#gArb)"/>
      <ellipse cx="150" cy="338" rx="70" ry="8" fill="#CFEBDD"/>
      ${ramas}${hojas}
      <path d="M138 338 C146 314 148 304 150 288 C152 304 154 314 162 338 Z" fill="#7482BC"/>
      ${ruta}${marcas}
    </svg>`;
}

function mNodo(){
  const nodo = nActual();
  const esFin = !!nodo.fin;

  dibujarRuta();
  actualizarAvance(esFin);
  dibujarArbolVisual(camino);

  if (esFin){
    mResultados();
    return;
  }

  document.getElementById("chipNivel").textContent = etiquetas[camino.length] || "OPCIÓN";
  document.getElementById("tituloElige").textContent = "Elige una opción";
  document.getElementById("pregunta").textContent = nodo.pregunta;

  const cont = document.getElementById("opc");
  cont.className = "";
  cont.innerHTML = "";

  document.getElementById("retro").onclick = () => {
  if (hist.length === 1){
    document.getElementById("contenidoArbol").style.display = "none";
    document.getElementById("inicio").style.display = "";
    return;
  }
  hist.pop();
  camino.pop();
  delete elec[niveles[hist.length - 1]];
  guardarCamino();
  mNodo();
};
}

async function mResultados(){
  document.getElementById("chipNivel").textContent = "RESULTADOS";
  document.getElementById("tituloElige").textContent = "Documentos encontrados";
  document.getElementById("pregunta").textContent = "Resultados hallados";

  const cont = document.getElementById("opc");
  cont.className = "opc-lista";
  cont.textContent = "Cargando archivos…";

  let contenido;
  try {
    const resp = await fetch("https://academic-search-gzmp.onrender.com/api/contenido?" + new URLSearchParams(elec));
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    contenido = await resp.json();
  } catch (e) {
    cont.textContent = "No pudimos cargar los resultados. Intenta de nuevo en unos segundos.";
    return;
  }

  cont.innerHTML = "";
  if (!contenido.length){
    cont.textContent = "Todavía no hay documentos para esta ruta.";
    return;
  }

  contenido.forEach(c => {
    const item = document.createElement("div");
    item.className = "resultado";

    const link = document.createElement("a");
    link.href = c.link;
    link.textContent = c.titulo;
    link.target = "_blank";
    link.rel = "noopener";
    item.appendChild(link);

    const meta = document.createElement("p");
    meta.className = "resultado-meta";
    meta.textContent = `${c.autor_fuente || "Fuente no especificada"} · ${c.duracion || "Duración no especificada"} · ${c.fecha_publicacion || "Fecha no especificada"}`;
    item.appendChild(meta);

    const citarBtn = document.createElement("button");
    citarBtn.className = "citar-btn";
    citarBtn.textContent = "Citar (APA)";
    citarBtn.onclick = () => {
      const anio = c.fecha_publicacion ? c.fecha_publicacion.split("-")[0] : "s.f.";
      const cita = `${c.autor_fuente || "Autor desconocido"}. (${anio}). ${c.titulo}. ${c.link}`;
      navigator.clipboard.writeText(cita);
      citarBtn.textContent = "¡Copiado!";
      setTimeout(() => { citarBtn.textContent = "Citar (APA)"; }, 1500);
    };
    item.appendChild(citarBtn);

    cont.appendChild(item);
  });
}

function reiniciar(){
  hist = [arbolPrincipal];
  elec = {};
  camino = [];
  guardarCamino();
  mNodo();
}

document.getElementById("reiniciar").onclick = reiniciar;

document.getElementById("comenzarBtn").onclick = () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("contenidoArbol").style.display = "block";
  reiniciar();
};