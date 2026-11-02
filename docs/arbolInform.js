const arbolInform = {
  pregunta: "¿Qué materia buscas?",
  opc: [
    { titulo: "Fundamentos de la Informática", 
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Ofimática Avanzada", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Procesamiento de Documentos Maestros", hijo: { fin: true } },
                { titulo: "Introducción al Analísis de Algoritmos", hijo: { fin: true } },
              ]
            }
          },
          { titulo: "Analísis de Algoritmos", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Diagramas de Flujo", hijo: { fin: true } },
                { titulo: "Introducción al Analísis de Algoritmos", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
    { titulo: "Programación", 
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Bases para Programar", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Fundamentos de Programación", hijo: { fin: true } },
                { titulo: "Diagramas de Flujo", hijo: { fin: true } },
              ]
            }
          },
          { titulo: "Programación Orientada a Objetos", 
            hijo: { 
              pregunta: "¿Qué subtema buscas?", 
              opc: [
                { titulo: "Clases y Objetos", hijo: { fin: true } },
                { titulo: "Inyección de Dependencia", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
  ]
};