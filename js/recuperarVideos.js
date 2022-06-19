const express = require('express')
const router =express.Router()
const conexion = require('database/db')

const authController =require('Controllers/authController');
const { createConnection } = require('mysql');

var nGeneros = 0;
var nombreGenero = ''; 
var nVideos = 0;
var video;
var primero = true;


document.body.onload = cargaPagina;
//Aquí poner la función de cargar los vídeos
//Primero al cargar tendríamos una función que llame al fetch, luego tendríamos otra función que realiza la muestra de archivos
function cargaPagina(){

  getNumeroCategorias(function(err, data){
    if(err){
      console.log("Error : ", err );
    }else{
      nGeneros = data;
    }
  })

  getNumeroVideos(function(err,data){
    if(err){
      console.log("Error: ", err);
    }else{
      nVideos = data;
    }
  })

  for (var i = 1; i <= nGeneros; i++){

    getCategoria(i, function(err, data){
      if(err){
        console.log("Error: ", err)
      }else{
        nombreGenero = data;
      }
    })

    var div = document.getElementById("cat");    
    var clon = div.cloneNode("cat");
    clon.setAttribute("id", i);
    clon.setAttribute("class", "categoria");

    var h3 = document.createElement("h3");
    var text = document.createTextNode(nombreGenero);
    h3.appendChild(text);
    clon.appendChild(h3);

    const pagina = document.querySelector("#pagina"); // <div id="pagina">App</div>
    pagina.insertAdjacentElement("afterbegin", clon);
  }

  var categorias = document.getElementsByClassName("categoria");
  for (var j=1; j <= nVideos; j++){
    getVideo(i, function(err, data){
      if(err){
        console.log("Error: ", err)
      }else{
        video = data;
      }
    })
    for(var g = 1; g <= nGeneros; g++){
      if( video.idCat == g){
        var tag = document.createElement("p");
        var text = document.createTextNode(video.Titulo);
        tag.appendChild(text);
        categorias[k].appendChild(tag);

       //<iframe width="420" height="315" src="">
        const original= video.Enlace;
        const youtube = getId(original);

        console.log('Video ID:', videos.productos[j].url)

        var iframe = document.createElement("iframe");
        iframe.style.width ="420 px";
        iframe.style.height ="315 px";
        iframe.setAttribute("src", "http://www.youtube.com/embed/"  + youtube);
        iframe.setAttribute("frameborder", "0");
        categorias[k].appendChild(iframe);
      }
    }
  }
}
  //result.productos[0].categoria.id;

  //2.- Acceder a los valores de un objeto JSON si NO conoces su estructura"

//Necesitamos encontrar una manera de contar el número de categorías que hay en la petición
//Para eso no sé si usar un bucle while o un bucle for para sacar los datos.


function getId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
      return match[2];
  } else {
      return 'error';
  }
}

function getNumeroCategorias (callback){
  try{
    conexion.query("SELECT COUNT(*) FROM categorias",function (err, results){
      if (err){
         throw err;
      }else{
        callback(results[0]);
      }
    }) 
  }catch( error){
    console.log(error);
  }
}

function getNumeroVideos (callback){
  try{
    conexion.query("SELECT COUNT(*) FROM vídeos", function (err, results){
      if (err) throw err;
      callback(results[0]);
    }) 
  }catch( error){
    console.log(error);
  }
}

function getCategoria (numeroCat, callback){
  try{
    conexion.query('SELECT Nombre FROM categorías Where ID = ?', [numeroCat], function (error,results){
      if(error){console.log(error)}
      callback(results[0]);
    })
  }catch( error){
      console.log(error);
  }
}

function getVideo (numeroVideo, callback){
  try{
    conexion.query('SELECT * FROM vídeos Where ID = ?', [numeroVideo], async (error,results)=>{
      if(error){console.log(error)}
      callback(results[0]);
    })
  }catch( error){
      console.log(error);
  }
}