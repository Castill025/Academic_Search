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
                { titulo: "Métodos Númericos para Ingenieros", hijo: { fin: true } },
              ]
            }
          },
          { titulo: "Ecuaciones Vectoriales", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Fundamentos Espacios Vectoriales", hijo: { fin: true } },
                { titulo: "Autovalores y Autovectores", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
    { titulo: "Cálculo", 
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Cálculo Diferencial", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Límites", hijo: { fin: true } },
                { titulo: "Fundamentos Cálculo Diferencial", hijo: { fin: true } },
              ]
            }
          },
          { titulo: "Cálculo Integral", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Fundamentos Cálculo Integral", hijo: { fin: true } },
                { titulo: "Integración Númerico", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
  ]
};