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
          {titulo: "Acentuación", 
            hijo:{ 
              pregunta: "¿Qué subtema buscas?", 
              opc:[
                {titulo: "Clasificación de Acentos", hijo: { fin: true } },
                {titulo: "Tipos de Acentos", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
    {titulo: "Comprensión Lectora", 
      hijo:{
        pregunta: "¿Qué tema buscas?",
        opc:[
          {titulo: "Textos Argumentativos", 
            hijo:{ 
              pregunta: "¿Qué subtema buscas?", 
              opc:[
                {titulo: "Ensayo Escolar", hijo: { fin: true } },
                {titulo: "La Argumentación", hijo: { fin: true } },
              ]
            }
          },
          {titulo: "Textos Informativos", 
            hijo:{ 
              pregunta: "¿Qué subtema buscas?", 
              opc:[
                {titulo: "Infografías Escolares", hijo: { fin: true } },
                {titulo: "Búsqueda de Información", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
  ]
};