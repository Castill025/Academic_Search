const arbolInform = {
  pregunta: "¿Qué materia buscas?",
  opc: [
    { titulo: "Alfabetización Digital", 
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Ofimática", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Analísis de Datos", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
  ]
};