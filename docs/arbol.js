const arbolPrincipal={
        pregunta: "¿Qué nivel deseas?",
        opc: [
          { titulo: "Colegio", hijo: arbolColegio },
          { titulo: "Universidad", hijo: arbolU },
        ]
      };

const niveles=["nivel", "disciplina","rama","tema","subtema"];
let hist=[arbolPrincipal];
let elec={};

function nActual(){
  return hist[hist.length-1];
}

function mNodo(){
  const nodo=nActual();

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
      hist.push(opcion.hijo);
      mNodo();
    };
    document.getElementById("opc").appendChild(btn);
  });

  const contBtn=document.getElementById("retro");
  contBtn.style.display=hist.length>1? "inline-block":"none";
}

document.getElementById("retro").onclick=()=>{
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