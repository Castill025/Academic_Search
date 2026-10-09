const preguntasDisponibles={ 
    genero: "¿Qué genero buscas?",
    tema: "¿Qué tema buscas?" 
    };

let preguntasfalt= Object.keys(preguntasDisponibles);
let datosfil= [...datos];
let historial= [];

function renderPregunta() {
    if (preguntasfalt.length === 0 || datosfil.length <=1){
        document.getElementById("contpreguntas").style.display= "none";
        mostrarResultados();
        return;
    }

    document.getElementById("contpreguntas").style.display= "block";
    document.getElementById("resultados").innerHTML= "";

    const claveActual= preguntasfalt[0];
    document.getElementById("textpregunta").textContent= preguntasDisponibles[claveActual];

    const contenedorOpc= document.getElementById("opc");
    contenedorOpc.innerHTML= "";

    const opc= obtenerOpcDispo(claveActual);
    
    opc.forEach(opc=> {
        const btn= document.createElement("button");
        btn.textContent= opc;
        btn.addEventListener("click", () => responder(claveActual, opc));
        contenedorOpc.appendChild(btn);
    });

    actuBtnAtras();

}

function responder(clave, valor) {
    historial.push({
        datosfil: [...datosfil],
        preguntasfalt: [...preguntasfalt]
    });

    datosfil= datosfil.filter(item => item[clave] ===valor);
    preguntasfalt= preguntasfalt.filter(p =>p !== clave);

    renderPregunta();
}

function atras(){
    if (historial.length===0) return;

    const estadoAnt= historial.pop();
    datosfil= estadoAnt.datosfil;
    preguntasfalt= estadoAnt.preguntasfalt;

    renderPregunta();
}

function actuBtnAtras(){
    const btn= document.getElementById("btnAtras");
    btn.style.display= historial.length >0 ? "inline-block": "none";
}

document.getElementById("btnAtras").addEventListener("click", atras);

function mostrarResultados(){
    const contenedor= document.getElementById("resultados");

    if(datosfil.length===0) {
        contenedor.innerHTML= `<p>No se encontraron resultados.<p>`;
        return;
    }

    contenedor.innerHTML= datosfil
    .map(item => `<div class="result"><strong>${item.titulo}</strong></div>`)
    .join("");
}

renderPregunta();
