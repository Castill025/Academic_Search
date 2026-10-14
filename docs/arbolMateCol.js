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
                { titulo: "Teorema de Tales", hijo: { fin: true } },
              ]
            }
          },
          { titulo: "Ángulos", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Ángulos Adyacentes", hijo: { fin: true } },
                { titulo: "Ángulos Consecutivos", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
    { titulo: "Aritmética", 
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Teoría de Números", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Mínimo Común Múltiplo", hijo: { fin: true } },
                { titulo: "Máximo Común Divisor", hijo: { fin: true } },
              ]
            }
          },
          { titulo: "Fracciones", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Tipos de Fracciones", hijo: { fin: true } },
                { titulo: "Operaciones con Fracciones", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },    
  ]
};
