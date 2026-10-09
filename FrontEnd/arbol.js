const arbol={
  pregunta:"¿Qué área te interesa?",
  opc:[
    {titulo:"Ciencias",
      hijo:{
        pregunta:"¿Qué materia buscas?",
        opc:[
          {titulo:"Biología",
            hijo:{
              pregunta:"¿Qué tema buscas?",
              opc:[
                {titulo:"Genética", 
                  hijo:{
                    pregunta:"¿Qué subtema buscas?",
                    opc:[
                      {titulo:"Herencia", 
                        hijo:{fin:true}
                      },
                    ]
                  }
                },
                {titulo:"Ecología", 
                  hijo:{fin:true}},
              ]
            }
          },
          {titulo:"Química", 
            hijo:{
              pregunta:"¿Qué tema buscas?",
              opc:[]
            }
          },
        ]
      }
    },
    {titulo:"Matemáticas", 
      hijo:{
        pregunta:"¿Qué materia buscas?",
        opc:[
          {titulo:"Aritmética", 
            hijo:{
              pregunta:"¿Qué tema buscas?",
              opc:[
                {titulo:"Fracciones", 
                  hijo:{ 
                    pregunta:"¿Qué subtema buscas?", 
                    opc:[
                     {titulo:"Propiedades", 
                       hijo:{fin:true}
                      },
                      {titulo:"Operaciones", 
                       hijo:{fin:true}
                      },
                    ]  
                  }
                },
                {titulo:"Potencias", 
                  hijo:{ 
                    pregunta:"¿Qué subtema buscas?", 
                    opc:[
                     {titulo:"Propiedades", 
                       hijo:{fin:true}
                      },
                    ]  
                  }
                },
                {titulo:"Radicales", 
                  hijo:{ 
                    pregunta:"¿Qué subtema buscas?", 
                    opc:[
                     {titulo:"Propiedades", 
                       hijo:{fin:true}
                      },
                      {titulo:"Simplificación", 
                       hijo:{fin:true}
                      },
                    ]  
                  }
                }
              ]

            }
          },
          {titulo:"Lógica", 
            hijo:{
              pregunta:"¿Qué tema buscas?",
              opc:[
                {titulo:"Fracciones", 
                  hijo:{ 
                    pregunta:"¿Qué subtema buscas?", 
                    opc:[
                     {titulo:"Propiedades", 
                       hijo:{fin:true}
                      },
                      {titulo:"Operaciones", 
                       hijo:{fin:true}
                      },
                    ]  
                  }
                },
                {titulo:"Potencias", 
                  hijo:{ 
                    pregunta:"¿Qué subtema buscas?", 
                    opc:[
                     {titulo:"Propiedades", 
                       hijo:{fin:true}
                      },
                    ]  
                  }
                },
                {titulo:"Radicales", 
                  hijo:{ 
                    pregunta:"¿Qué subtema buscas?", 
                    opc:[
                     {titulo:"Propiedades", 
                       hijo:{fin:true}
                      },
                      {titulo:"Simplificación", 
                       hijo:{fin:true}
                      },
                    ]  
                  }
                }
              ]

            }
          },
        ]
      }
    },
  ]
};

const niveles=["disciplina","rama","tema","subtema"];
let hist=[arbol];
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

  const resp=await fetch("http://localhost:3000/api/contenido?"+new URLSearchParams(filtro));
  const contenido=await resp.json();
  document.getElementById("opc").innerHTML="";

  recursos.forEach(c=>{
    const item=document.createElement("a");
    item.href=c.link;
    item.textContent=c.titulo;
    item.target="_blank";
    document.getElementById("opc").appendChild(item);
  });
}

mNodo();