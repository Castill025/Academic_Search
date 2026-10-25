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

 

function mNodo(){
  const nodo=nActual();

  const pasos = ["Inicio", ...JSON.parse(localStorage.getItem("camino") || "[]")]; dibujarArbolVisual(pasos);
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

  contenido.forEach(c => {
  const item = document.createElement("div");
  item.className = "resultado";

  const link = document.createElement("a");
  link.href = c.link;
  link.textContent = c.titulo;
  link.target = "_blank";
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

  document.getElementById("opc").appendChild(item);
  });
  
}

document.getElementById("comenzarBtn").onclick = () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("contenidoArbol").style.display = "block";
  mNodo();
};