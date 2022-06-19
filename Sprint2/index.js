const fs=require('fs')
const express = require('express')
const app = express()
require("dotenv").config()
require("./Database/db")


app.use(express.static("public"));
app.use(express.urlencoded({extendes:true}));

//app.get('/formulario', (req, res) => {
  //console.log(req.query);
  //res.send('Formulario enviado')
//})
app.post("/formulario", (req, res) => {
  console.log(req.body);
  const{username,password} =req.body;
  if(!username || !password){ 
    return res.send('no existen los datos');
  }else{
    //Realizar petición comprobación existencia usuario

    //Si existe devuelve el id del usuario para crear un token
  }
})

app.post("/register", (req, res) => {
  console.log(req.body);
  const{username,password} =req.body;
  if(!username || !password){ 
    return res.send('no existen los datos');
  }else{
    //Realizar petición para crear usuario a
  }
})

app.get("/", (req,res) =>{
  res.send("visitaste la pagina de inicio");
});
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})