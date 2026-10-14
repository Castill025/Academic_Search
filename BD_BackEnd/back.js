const lexpr=require("express");
const lsql=require("better-sqlite3");
const cors=require("cors");
const app=lexpr();
app.use(cors());
const mibd=new lsql("DB_Buscador.db");


app.get("/api/Contenido",(req,res)=>{
  const{nivel,area,materia,tema,subtema}=req.query;

  const resultados=mibd.prepare(
    "SELECT *FROM Contenido WHERE nivel=? AND area=? AND materia=? AND tema=? AND subtema=? AND tipo_doc=? AND link=?"
  ).all(nivel,area,materia,tema,subtema,tipo_doc,link);

  res.json(resultados);
});

app.listen(3000,()=>{
  console.log("Servidor corriendo en http://localhost:3000");
});
