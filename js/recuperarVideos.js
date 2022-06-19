var idGenero = "";
var nGeneros = 0;
var primero = true;
var myHeaders = new Headers();
var data = sessionStorage.getItem('token');
myHeaders.append("Authorization", "Bearer "+data);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

document.body.onload = cargaPagina;
//Primero al cargar tendríamos una función que llame al fetch, luego tendríamos otra función que realiza la muestra de archivos
function cargaPagina(){
  fetch("https://labinfsoft.herokuapp.com/api/videos?limite=10&desde=0", requestOptions)
    .then(response => response.json())
    .then(result => muestravideos(result))
    .catch(error => console.log('error', error));
}
  //result.productos[0].categoria.id;

  //2.- Acceder a los valores de un objeto JSON si NO conoces su estructura"

//Necesitamos encontrar una manera de contar el número de categorías que hay en la petición
//Para eso no sé si usar un bucle while o un bucle for para sacar los datos.

function muestravideos(videos) {
 var v= videos.total;
 for (var i = 0; i < v; i++) { //n debería recorrer toda la petición json
   if (videos.productos[i].categoria._id != idGenero) {
     idGenero = videos.productos[i].categoria._id;
       //en lugar de crear nuevos divs ponemos en el doc html
       //ya uno de base con una id definida.
       //a partir de ahí vamos creando el resto de divs asignandoles la clase e id correspondiente
     
     var div = document.getElementById("cat");    
     var clon = div.cloneNode("cat");
     clon.setAttribute("id", idGenero);
     clon.setAttribute("class", "categoria");

     var h3 = document.createElement("h3");
     var text = document.createTextNode(videos.productos[i].categoria.nombre);
     h3.appendChild(text);
     clon.appendChild(h3);

     const pagina = document.querySelector("#pagina"); // <div id="pagina">App</div>
     pagina.insertAdjacentElement("afterbegin", clon);
   } 
 }

 var categorias = document.getElementsByClassName("categoria");
 for (var j=0; j < v; j++){
   for (var k=0; k < categorias.length; k++){
     if(videos.productos[j].categoria._id == categorias[k].id){
       
       var tag = document.createElement("p");
       var text = document.createTextNode(videos.productos[j].nombre);
       tag.appendChild(text);
       categorias[k].appendChild(tag);

       //<iframe width="420" height="315" src="">

      
    const original= videos.productos[j].url;
    const youtube = getId(videos.productos[j].url);
    //const iframeMarkup = '<iframe width="560" height="315" src="//www.youtube.com/embed/' 
      //  + videoId + '" frameborder="0" allowfullscreen></iframe>';
    


     
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

function getId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
      return match[2];
  } else {
      return 'error';
  }
}