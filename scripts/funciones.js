const searchBtn = document.getElementById('search-btn');
const closeBtn = document.getElementById('close-btn');
const input = document.getElementById('entrada');
const logo = document.getElementById('logo-img');
const title = document.getElementById('title');
const mediaQuery = window.matchMedia('(max-width: 680px)');

function aparecerBarra() {
    if (mediaQuery.matches) {
        closeBtn.style.display = 'none';
        input.style.display = 'none';

        searchBtn.onclick = () => {
            logo.style.display = 'none';
            title.style.display = 'none';
            input.style.display = 'block';
            input.style.width = 'calc(100% - 2rem)';
            closeBtn.style.display = 'block';
        };
        


        closeBtn.onclick = () => {
            logo.style.display = 'flex';
            title.style.display = 'block';
            input.style.display = 'none';
            closeBtn.style.display = 'none';
        };
    } else {
        closeBtn.style.display = 'none';
        input.style.display = 'block';
        logo.style.display = 'flex';
        title.style.display = 'block';

      
        searchBtn.onclick = null;

        // Bind the search button to the save function for larger screens
        searchBtn.addEventListener("click", guardar);
    }
}

mediaQuery.addListener(aparecerBarra);
aparecerBarra();

// funciones del contenido
 document.addEventListener("DOMContentLoaded", function() {
    var boton = document.getElementsByClassName("btn-desplegar");
    for (var i = 0; i < boton.length; i++) {
        boton[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});

//#region (Almacenaje del contenido).
//Creacion de arreglo que contenga la opciones disponibles de los hechos historicos.
let opciones_cont = []; //contenido actual en la pagina dividido en opciones.
opciones_cont = document.getElementsByClassName("contenido");//Almacenamos todo el contenido que tenga la clase contenido.
//#endregion

//#region (Filtrado de contenido).
var opc_elegida = document.getElementById("filtro");//Se almacena la opcion del selec con el id filtro.
opc_elegida.onchange = Filtrado;//La opcion clicada del select ejecuta la función Filtrado.
var coincidencias = [];//Se guardaran todas las coincidencias entre el contenido y la opcion seleccionada del filtro.
var diferencias = [];//Se guardaran todas las opciones que no coinciden entre el contenido y la opocion seleccionada del filtro.

/*Función filtrado esta compara el elemento o opcion seleccionada por el usuario con el contenido existente,
  Luego de dicha comparación si se encuentra en el contenido de realizan unas operaciones de lo contrario se mostrara un mensaje.*/
function Filtrado(){
  var newValue = opc_elegida.value;//Variable que contiene el valor de la opcion elegida.

  //reiniciar el areglo de las coincidencias y diferencias cada vez que se selecione una nueva opcion.
  Restablecer_clasf();//Se reinicia los valores de los arreglos los cuales sirven para la clasificacion del contenido.
  Restableser_cont();//Funcion que restablese los varlores del contenido.
  for (var i=0; i<opciones_cont.length; i++){
    if(newValue == "Todos"){
    }
    else if(newValue == opciones_cont[i].getAttribute("data-fecha")){ 
      coincidencias.push(opciones_cont[i]);//Se almacenam las coincidencias con las busquedas en un arreglo.
       //Reorganización();
    }
    else{
      diferencias.push(opciones_cont[i]);//Se almacenan las opciones que no coinciden con la busqueda.
    }
  }
  Reorganización();//Se llama la funcion Reorganizacion.
}
//#endregion

//#region (Auto Completado)
var cd_vacias = [];//En este arreglo se almacenan las cadenas vacias que son ingresadas en el input que es el buscador.
var buscar = document.getElementById("entrada");//La variable buscar almacena al elemento que tiene como id entrada que es el buscador.
buscar.addEventListener('keyup',autocompletado);//Le ponemos el evento keyup es decir que funciona cuando se toca una tecla del teclado estando en el input y luego llama a la funcion autocompletado.
var new_elemento = [];//Este arreglo se utiliza para crear los elementos que conforma el autocompletado.
var lista = document.getElementById("auto_cpt");//La variable lista almacena al elemento que tiene como id auto_cpt que es un div padre este contendra las opciones del autocompletado.

function autocompletado(){
  Restablecer_clasf();//Se reinicia los valores de los arreglos los cuales sirven para la clasificacion del contenido.
  for(var i = 0; i < opciones_cont.length; i++){
    if(buscar.value.replace(/\s+/g, '').toLocaleLowerCase() == ""){
      /*No se ejecuta nada si esto pasa.*/
    }
    else if(opciones_cont[i].getAttribute("name").replace(/\s+/g, '').toLocaleLowerCase().includes(buscar.value.replace(/\s+/g, '').toLocaleLowerCase())){
      coincidencias.push(opciones_cont[i]);//Guarda las coincidencias entre lo buscado y el contenido de la web.
    }
    else{
      diferencias.push(opciones_cont[i]);//Guarda las diferencias entre lo buscado y el contenido de la web.
    }
  }
  if(coincidencias.length == 0){
    lista.innerHTML = '';//La lista se borra cada vez que las coincidencias esten vacia.
  }
  else{
    creacion_autcp();//Llamamos la funcion creacion_autcp.
  }
}

function creacion_autcp(){
  lista.innerHTML = '';//Vaciamos el contenido de la lista.

  for(i = 0; i < 5; i++){
    if(coincidencias[i]){
      new_elemento = document.createElement('div');//Creamos un div y lo almacenamos adentro de new_elemento.
      new_elemento.style.backgroundColor = "black";//Al div creado le añadimos un color de fondo.
      new_elemento.style.color = "white";//Al div creado le ponemos las letras en blanco.
      new_elemento.style.height = "auto";//Al div le ponemos un tamaño auto.
      new_elemento.style.width = "auto";//Al div le ponemos un tamaño auto.
      new_elemento.textContent = coincidencias[i].getAttribute('name');//Guardamos el elemento name del indice actual de coincidencias.
      new_elemento.addEventListener('mouseover',function(){this.style.backgroundColor = 'grey'});//Le agregamos un evento mause al div para que cuando se posicione arriba o encima de un div el color cambie a gris.
      new_elemento.addEventListener('mouseout',function(){this.style.backgroundColor = 'black'});//Le agregamos un evento mause al div para que cuando el mause se quite de arriba de un div el color cambie a negro.
      new_elemento.addEventListener('click',function(){opc_buscada = this.textContent; selc_auto();});//Le agregamos un evento click al div para que cuando se selecciones un div se llame a la funcion selc_auto.
      lista.appendChild(new_elemento);//Agrefamos los divs creados como hijos a la lista que es el div padre.
    }
  }
}
//#endregion

//#region (Buscador).
var opc_buscada;//Creamos la variable opc_buscada, esta almacena la opcion seleccionada del autocompletado. 
document.getElementById("search-btn").addEventListener("click",guardar);//Al hacer click en el boton buscar ejecutamos la funcion guardar.
document.getElementById("restablecer").addEventListener('click',Restableser_cont);//Al hacer click en el boton restablecer se ejecutara la funcion Restableser_cont.

function selc_auto(){
  document.getElementById("entrada").value = '';//Borramos el valor que tiene la barra de busqueda.
  document.getElementById("entrada").value = opc_buscada;//A la barra de busqueda le agregamos el valor que se encuentra adentro de opc_buscada.
  lista.innerHTML = '';//vaciamos la lista es decir que basiamos el autocompletado.
  guardar();//Llamamos la funcion guarda.
}

function guardar(){
  lista.innerHTML ='';//vaciamos la
  opc_buscador = document.getElementById('entrada').value.replace(/\s+/g, '').toLocaleLowerCase();//Almacena, borra los espacios y transforma todo el texto en minusculas. 
  document.getElementById("entrada").value = '';//El valor ingresado en la barra de busqueda se cambia por una cadena vacia.
  verificar();//Se llama a la funcion verificar.
}

function verificar(){
  Restablecer_clasf();//Se reinicia los valores de los arreglos los cuales sirven para la clasificacion del contenido.
  Restableser_cont();//Se llama la funcion Restablecer_cont.
  for(i = 0; i < opciones_cont.length; i++){
    //Se realiza una verificacion para las diferentes opciones que se puedan presentar.
    if(opc_buscador == ""){
    }
    else if(opc_buscador == opciones_cont[i].getAttribute('name').replace(/\s+/g, '').toLocaleLowerCase()){
      coincidencias.push(opciones_cont[i]);//Se guarda la coincidencias de la opc_buscador con el contenido de la pagina web.
    }
    else{
      diferencias.push(opciones_cont[i]);//Se guardan las diferencias entre las opc_budcador con el cotenido de la pagina web.
    }
  }
  Reorganización();//Se llama la funcion Reorganizacion.
}
//#endregion

//#region (Funciones basicas)
function Reorganización(){
    //Se ocultan las opciones que fueron diferente al seleccionar una opcion del filtrado o selec.
    for(var i = 0; i < diferencias.length; i++){
      diferencias[i].style.display = 'none';
    }
  }
  
  function Restableser_cont(){
    //Se restablese el valor display para todo el contenido, el contenido oculto vuelve a la normalidad.
    for(var i = 0; i < opciones_cont.length; i++){
      opciones_cont[i].style.display = 'block';
    }
  }

  function Restablecer_clasf(){
    coincidencias.splice(0);//Reiniciamos el valor predeterminado del arreglo concidencias.
    diferencias.splice(0);//Reiniciamos el valor predeterminado del arreglo diferencias.
  }
  //#endregion
