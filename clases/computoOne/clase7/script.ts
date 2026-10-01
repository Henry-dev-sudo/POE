//busca elementos de html

const boton = document.getElementById("btnAgregar") as HTMLButtonElement;
const cajadeTexto = document.getElementById("txtnombre") as HTMLInputElement;
const etiqueta = document.getElementById("lblEstado") as HTMLHeadingElement;
const lista = document.getElementById("lista") as HTMLUListElement;

//Registro de los eventos 
boton.addEventListener("click", AgregarNombre);

function AgregarNombre(): void {
    //verificar si hay un nombre
    if (cajadeTexto.value.trim()==="") {
        alert("Debe ingresar un nombre");
        return;
    }
    //cambiaer estado de la etiqueta
    
    etiqueta.textContent = "Ultimo Registro: " + cajadeTexto.value;

    //crear nuevo elemento de lista
    const elemento = document.createElement("li");

    //agregar texto a los elementos
    elemento.textContent = cajadeTexto.value;

    //agregar elemento a la lista
    lista.appendChild(elemento);

    //cambiar el texto
    cajadeTexto.value = "";

    //colocar nuevamente el cursor en la caja de texto
    cajadeTexto.focus();

}