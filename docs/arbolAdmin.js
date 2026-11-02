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
          { titulo: "Planeación Estratégica", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Estrategía Proscpectiva", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
    { titulo: "Innovación y Emprendimiento", 
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Metodologías Para La Innovación", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Design Thinking", hijo: { fin: true } },
                { titulo: "Metodología Lean StartUp", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
  ]
}