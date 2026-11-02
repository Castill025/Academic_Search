const arbolCiencias = {
  pregunta: "¿Qué materia buscas?",
  opc: [
    { titulo: "Biología",
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Biología Celular", 
            hijo: {
              pregunta: "¿Qué subtema buscas?",
              opc: [
                { titulo: "Orgánulos Celulares", hijo: { fin: true } },
                { titulo: "Teoría Celular", hijo: { fin: true } },
              ]
            }
          },
          { titulo: "Genética", 
            hijo: {
              pregunta: "¿Qué subtema buscas?",
              opc: [
                { titulo: "Genética Mendeliana", hijo: { fin: true } },
                { titulo: "ADN", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
    { titulo: "Anatomía Humana",
      hijo: {
        pregunta: "¿Qué tema buscas?",
        opc: [
          { titulo: "Nutrición Humana", 
            hijo: {
              pregunta: "¿Qué subtema buscas?",
              opc: [
                { titulo: "Piramide Saludable", hijo: { fin: true } },
              ]
            }
          },
          { titulo: "El Sistema Cardiovascular", 
            hijo: {
              pregunta: "¿Qué subtema buscas?",
              opc: [
                { titulo: "Anatomía del Corazón", hijo: { fin: true } },
                { titulo: "Componentes de la Sangre", hijo: { fin: true } },
              ]
            }
          },
        ]
      }
    },
  ]
};
