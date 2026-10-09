const lexpr=require("express");
const lsql=require("better-sqlite3");
const cors=require("cors");
const app=lexpr();
app.use(cors());
const mibd=new lsql("DB_Proyecto.db");


app.get("/api/Contenido",(req,res)=>{
  const{area,materia,tema,subtema}=req.query;

  const resultados=mibd.prepare(
    "SELECT *FROM Contenido WHERE area=? AND materia=? AND tema=? AND subtema=?"
  ).all(area,materia,tema,subtema);

  res.json(resultados);
});

app.listen(3000,()=>{
  console.log("Servidor corriendo en http://localhost:3000");
});
