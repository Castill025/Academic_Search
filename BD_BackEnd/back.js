const lexpr=require("express");
const lsql=require("better-sqlite3");
const cors=require("cors");
const app=lexpr();
app.use(cors());
const mibd=new lsql("DB_Buscador.db");

app.get("/api/Contenido",(req,res)=>{
  const q=req.query;
  const nivel=q.nivel, tema=q.tema, subtema=q.subtema;
  const area=q.area ?? q.disciplina;
  const materia=q.materia ?? q.rama;

  const campos = { nivel, area, materia, tema, subtema };
  const condiciones = [];
  const valores = [];

  for (const [columna, valor] of Object.entries(campos)) {
    if (valor !== undefined) {
      condiciones.push(`${columna} = ?`);
      valores.push(valor);
    }
  }

  const sql = "SELECT * FROM Contenido" + (condiciones.length ? " WHERE " + condiciones.join(" AND ") : "");
  const resultados = mibd.prepare(sql).all(...valores);

  res.json(resultados);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto " + PORT);
});
 