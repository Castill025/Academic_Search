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
              ]
            }
          },
        ]
      }
    },
  ]
};
