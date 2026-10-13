const arbolMateCol = {
  pregunta: "¿Qué materia buscas?",
  opc: [
    { titulo: "Geometría", 
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Geometría Plana", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Teorema de Pitágoras", hijo: { fin: true } },
                { titulo: "Operaciones", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },    
  ]
};
