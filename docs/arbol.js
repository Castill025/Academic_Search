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

function nActual(){
  return hist[hist.length-1];
}

function dibujarArbolVisual(pasos){
  const cont = document.getElementById("arbolVisual");
  cont.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";
  const ancho = Math.max(pasos.length * 120, 120);
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${ancho} 110`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "110");

  pasos.forEach((paso, i) => {
    const cx = 60 + i * 120;
    const cy = 50;
    const esUltimo = i === pasos.length - 1;
    const radio = esUltimo ? 24 : 22;

    if (i > 0) {
      const linea = document.createElementNS(svgNS, "line");
      linea.setAttribute("x1", cx - 120);
      linea.setAttribute("y1", cy);
      linea.setAttribute("x2", cx);
      linea.setAttribute("y2", cy);
      linea.setAttribute("stroke", "#D3DEF0");
      linea.setAttribute("stroke-width", "2");
      svg.appendChild(linea);
    }

    const circulo = document.createElementNS(svgNS, "circle");
    circulo.setAttribute("cx", cx);
    circulo.setAttribute("cy", cy);
    circulo.setAttribute("r", radio);
    circulo.setAttribute("fill", esUltimo ? "#1F9D6B" : "#D9F7E2");
    svg.appendChild(circulo);

    const icono = document.createElementNS(svgNS, "text");
    icono.setAttribute("x", cx);
    icono.setAttribute("y", cy + (esUltimo ? 7 : 6));
    icono.setAttribute("text-anchor", "middle");
    icono.setAttribute("font-size", esUltimo ? "20" : "18");
    icono.textContent = "🍃";
    svg.appendChild(icono);

    const texto = document.createElementNS(svgNS, "text");
    texto.setAttribute("x", cx);
    texto.setAttribute("y", cy + (esUltimo ? 42 : 40));
    texto.setAttribute("text-anchor", "middle");
    texto.setAttribute("font-family", "DM Sans, sans-serif");
    texto.setAttribute("font-size", "12");
    texto.setAttribute("font-weight", esUltimo ? "600" : "500");
    texto.setAttribute("fill", esUltimo ? "#1F9D6B" : "#2B3558");
    texto.textContent = paso;
    svg.appendChild(texto);
  });

  cont.appendChild(svg);
}

function mNodo(){
  const nodo=nActual();

  const esRaiz = hist.length === 1;

  if (nodo.fin){
    mResultados();
    return;
  }

  document.getElementById("pregunta").textContent=nodo.pregunta;
  document.getElementById("opc").innerHTML="";

  nodo.opc.forEach(opcion=>{
    const btn=document.createElement("button");
    btn.textContent=opcion.titulo;
    
    btn.onclick=()=>{
      elec[niveles[hist.length - 1]]=opcion.titulo;
      let camino = JSON.parse(localStorage.getItem("camino") || "[]");
      camino.push(opcion.titulo);
      localStorage.setItem("camino", JSON.stringify(camino));
       
      hist.push(opcion.hijo);
      mNodo();
    };
    document.getElementById("opc").appendChild(btn);
  });

  const contBtn=document.getElementById("retro");
  contBtn.style.display=hist.length>=1? "inline-block":"none";
}

document.getElementById("retro").onclick=()=>{
  if (hist.length===1){
    document.getElementById("contenidoArbol").style.display = "none";
    document.getElementById("inicio").style.display = "block";
    hist = [arbolPrincipal];
    return;
  }
  hist.pop();
  mNodo();
};

async function mResultados(){
  document.getElementById("pregunta").textContent="Resultados Hallados: ";
  document.getElementById("opc").innerHTML="Cargando Archivos...";

  const resp=await fetch("https://academic-search-gzmp.onrender.com/api/contenido?"+new URLSearchParams(elec));
  const contenido=await resp.json();
  document.getElementById("opc").innerHTML="";

  contenido.forEach(c=>{
    const item=document.createElement("a");
    item.href=c.link;
    item.textContent=c.titulo;
    item.target="_blank"; 
    document.getElementById("opc").appendChild(item);
  });
}

document.getElementById("comenzarBtn").onclick = () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("contenidoArbol").style.display = "block";
  mNodo();
};