const arbolCyL={
  pregunta: "¿Qué materia buscas?",
  opc:[
    {titulo: "Grámatica", 
      hijo:{
        pregunta: "¿Qué tema buscas?",
        opc:[
          {titulo: "Sintaxis de la Oración", 
            hijo:{ 
              pregunta: "¿Qué subtema buscas?", 
              opc:[
                {titulo: "Sujeto y predicados", hijo: { fin: true } },
                {titulo: "Operaciones", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
  ]
};