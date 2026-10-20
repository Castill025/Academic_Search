const lexpr=require("express");
const lsql=require("better-sqlite3");
const cors=require("cors");
const app=lexpr();
app.use(cors());
const mibd=new lsql("DB_Buscador.db");


app.get("/api/Contenido",(req,res)=>{
  const{nivel,area,materia,tema,subtema}=req.query;

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