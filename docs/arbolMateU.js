const arbolMateU = {
  pregunta: "¿Qué materia buscas?",
  opc: [
    { titulo: "Álgebra Lineal", 
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Ecuaciones Lineales", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Matrices", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
  ]
};