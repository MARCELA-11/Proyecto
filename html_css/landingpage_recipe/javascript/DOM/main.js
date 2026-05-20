//accedemos al documento html
console.log(dodument)

//seleccionar/acceder elemntos
/**
 * getrtelemtByIde() == solo
 * querySelector()
 * querySelectorAll()
*/

let titulo = document.
getElementById("title")
console.log(titulo)

let entrada_dato = Document.querySelector("form")
console.log(formulario)
console.log(entrada_dato)


//seleccionando varios elementos
let lista_input s = document.querySelectorAll(".entrada_titulo");
console.log (lista_inputs)

//accediendo al TEXTO del elemento del HTML
let texto_titulo =  document.querySelector("h1").textContent;
/**
 * 
 * InnerHTML = 
 * innerText = devuelve el cpntenido de una etiqueta de texto y puede modificar el contenidp del texto
 * *TextContent = devuelve el cpntenido de una etiqueta de texto y puede modificar el contenidp del texto
 */
console.log(texto.titulo)

// Acccediendo a la    <section>
let contenedor = document.querySelector("#contenedor_dinamico");
console.log(contenedor)

// dibujando las etiquetas    <p> denetro de la seccion
//templete literals ('')
contenedor.innerHTML =
   <p>Creando un parrafo desde javascript</p>
      <p>Algún día, primero Dios, has de quererme un poquito<br>
      o levantaré el ranchito en que vivamos los dos</p> 
;
//utilizar eventos

//funcion para tirar confetti
function enviarConfeti(){
    //metodo de la libreria confetti.js que hace la animacion de tirar confetti
    confetti();
}
//funcion para envio de datos 
