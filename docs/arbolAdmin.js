const arbolAdmin = {
  pregunta: "¿Qué materia buscas?",
  opc: [
    { titulo: "Procesos Administrativos", 
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Gestión del Cambio Organizacional", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Resistencia al Cambio", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
  ]
}