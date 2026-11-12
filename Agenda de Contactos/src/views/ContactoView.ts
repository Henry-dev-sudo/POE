// VISTA: solo se encarga de mostrar cosas y de leer lo que escribe el usuario.
// No guarda datos ni toma decisiones (eso lo hace el controlador).

import {
  Contacto,
  Categoria,
  CATEGORIAS,
  FiltroCategoria,
  Orden,
  NombreCampo,
  ErrorValidacion,
  etiquetaCategoria,
} from "../models/Contacto.js";

export class ContactoView {
  // Elementos del formulario
  private formulario = document.getElementById("formulario") as HTMLFormElement;
  private inputNombre = document.getElementById("nombre") as HTMLInputElement;
  private inputTelefono = document.getElementById("telefono") as HTMLInputElement;
  private inputEmail = document.getElementById("email") as HTMLInputElement;
  private selectCategoria = document.getElementById("categoria") as HTMLSelectElement;
  private botonGuardar = document.getElementById("btn-guardar") as HTMLButtonElement;
  private botonCancelar = document.getElementById("btn-cancelar") as HTMLButtonElement;
  private tituloFormulario = document.getElementById("titulo-form") as HTMLElement;

  // Elementos de la lista
  private inputBuscar = document.getElementById("buscar") as HTMLInputElement;
  private selectFiltro = document.getElementById("filtro-categoria") as HTMLSelectElement;
  private selectOrden = document.getElementById("orden") as HTMLSelectElement;
  private botonExportar = document.getElementById("btn-exportar") as HTMLButtonElement;
  private lista = document.getElementById("lista") as HTMLElement;
  private contador = document.getElementById("contador") as HTMLElement;

  // Pestañas, resumen y notificaciones
  private botonesTab = document.querySelectorAll<HTMLButtonElement>(".tab");
  private secciones = document.querySelectorAll<HTMLElement>(".vista");
  private resumen = document.getElementById("resumen-contenido") as HTMLElement;
  private notificaciones = document.getElementById("notificaciones") as HTMLElement;

  constructor() {
    this.llenarSelectCategoria();
    this.iniciarTabs();

    // Cada vez que el usuario escribe en el teléfono, se acomoda el formato
    this.inputTelefono.addEventListener("input", () => {
      this.formatearTelefono();
    });

    // Al escribir en un campo se le quita el borde rojo del error
    const campos = [
      this.inputNombre,
      this.inputTelefono,
      this.inputEmail,
      this.selectCategoria,
    ];
    for (const campo of campos) {
      campo.addEventListener("input", () => campo.classList.remove("invalido"));
    }
  }

  // Eventos: el controlador le dice a la vista qué hacer cuando pasan

  enlazarGuardar(manejador: () => void): void {
    this.formulario.addEventListener("submit", (evento) => {
      evento.preventDefault(); // evita que la página se recargue
      manejador();
    });
  }

  enlazarCancelar(manejador: () => void): void {
    this.botonCancelar.addEventListener("click", manejador);
  }

  // Evento "input": se ejecuta con cada letra que se escribe
  enlazarBuscar(manejador: (texto: string) => void): void {
    this.inputBuscar.addEventListener("input", () => {
      manejador(this.inputBuscar.value);
    });
  }

  // Evento "change": se ejecuta cuando se elige otra opción del select
  enlazarFiltro(manejador: (categoria: FiltroCategoria) => void): void {
    this.selectFiltro.addEventListener("change", () => {
      manejador(this.selectFiltro.value as FiltroCategoria);
    });
  }

  enlazarOrden(manejador: (orden: Orden) => void): void {
    this.selectOrden.addEventListener("change", () => {
      manejador(this.selectOrden.value as Orden);
    });
  }

  enlazarExportar(manejador: () => void): void {
    this.botonExportar.addEventListener("click", manejador);
  }

  // Un solo "click" en la lista sirve para todos los botones de las tarjetas
  enlazarAcciones(
    alEditar: (id: number) => void,
    alEliminar: (id: number) => void
  ): void {
    this.lista.addEventListener("click", (evento) => {
      const objetivo = evento.target as HTMLElement;
      const accion = objetivo.dataset.accion;
      const id = Number(objetivo.dataset.id);

      if (accion === "editar") {
        alEditar(id);
      } else if (accion === "eliminar") {
        alEliminar(id);
      }
    });
  }

  // Pestañas

  private iniciarTabs(): void {
    this.botonesTab.forEach((boton) => {
      boton.addEventListener("click", () => {
        this.mostrarTab(boton.dataset.tab as string);
      });
    });
  }

  // Muestra una sección y esconde las demás
  private mostrarTab(nombre: string): void {
    this.botonesTab.forEach((boton) => {
      boton.classList.toggle("activa", boton.dataset.tab === nombre);
    });
    this.secciones.forEach((seccion) => {
      seccion.hidden = seccion.id !== "vista-" + nombre;
    });
  }

  //Formulario 
  // Las opciones del select se crean con la lista CATEGORIAS del modelo
  private llenarSelectCategoria(): void {
    this.selectCategoria.appendChild(this.crearOpcion("", "Selecciona una categoría"));
    for (const categoria of CATEGORIAS) {
      this.selectCategoria.appendChild(
        this.crearOpcion(categoria, etiquetaCategoria(categoria))
      );
    }
  }

  private crearOpcion(valor: string, texto: string): HTMLOptionElement {
    const opcion = document.createElement("option");
    opcion.value = valor;
    opcion.textContent = texto;
    return opcion;
  }

  // Deja solo números y pone el guion después del cuarto dígito
  private formatearTelefono(): void {
    const digitos = this.inputTelefono.value.replace(/\D/g, "");
    if (digitos.length > 4) {
      this.inputTelefono.value = digitos.slice(0, 4) + "-" + digitos.slice(4);
    } else {
      this.inputTelefono.value = digitos;
    }
  }

  // Devuelve lo que el usuario escribió (el modelo se encarga de validarlo)
  obtenerDatosFormulario(): {
    nombre: string;
    telefono: string;
    email: string;
    categoria: Categoria;
  } {
    return {
      nombre: this.inputNombre.value,
      telefono: this.inputTelefono.value,
      email: this.inputEmail.value,
      categoria: this.selectCategoria.value as Categoria,
    };
  }

  // Pone los datos de un contacto en el formulario para editarlo
  cargarFormulario(contacto: Contacto): void {
    this.quitarMarcas();
    this.inputNombre.value = contacto.nombre;
    this.inputTelefono.value = contacto.telefono;
    this.inputEmail.value = contacto.email;
    this.selectCategoria.value = contacto.categoria;
    this.tituloFormulario.textContent = "Editar contacto";
    this.botonGuardar.textContent = "Actualizar";
    this.botonCancelar.hidden = false;
    this.inputNombre.focus();
  }

  // Deja el formulario como al principio
  limpiarFormulario(): void {
    this.formulario.reset();
    this.quitarMarcas();
    this.tituloFormulario.textContent = "Nuevo contacto";
    this.botonGuardar.textContent = "Guardar";
    this.botonCancelar.hidden = true;
  }

  // Quita el borde rojo de todos los campos
  private quitarMarcas(): void {
    this.inputNombre.classList.remove("invalido");
    this.inputTelefono.classList.remove("invalido");
    this.inputEmail.classList.remove("invalido");
    this.selectCategoria.classList.remove("invalido");
  }

  private campoDe(campo: NombreCampo): HTMLInputElement | HTMLSelectElement {
    if (campo === "nombre") {
      return this.inputNombre;
    }
    if (campo === "telefono") {
      return this.inputTelefono;
    }
    if (campo === "email") {
      return this.inputEmail;
    }
    return this.selectCategoria;
  }

  // Notificaciones (se cierran solas)

  // Marca en rojo los campos con error y muestra todos los mensajes
  mostrarErrores(errores: ErrorValidacion[]): void {
    this.quitarMarcas();
    for (const error of errores) {
      this.campoDe(error.campo).classList.add("invalido");
    }
    const mensajes = errores.map((e) => e.mensaje);
    this.crearNotificacion(mensajes, "error");

    // El cursor se va al primer campo con error
    this.campoDe(errores[0].campo).focus();
  }

  mostrarExito(texto: string): void {
    this.crearNotificacion([texto], "exito");
  }

  mostrarInfo(texto: string): void {
    this.crearNotificacion([texto], "info");
  }

  private crearNotificacion(mensajes: string[], tipo: string): void {
    const aviso = document.createElement("div"); // Se crea un div para la notificación
    aviso.className = "aviso " + tipo;

    for (const mensaje of mensajes) { // Se crea un párrafo por cada mensaje
      const linea = document.createElement("p");
      linea.textContent = mensaje;
      aviso.appendChild(linea);
    }

    // Si el usuario hace clic, se cierra antes
    aviso.addEventListener("click", () => aviso.remove());
    this.notificaciones.appendChild(aviso);

    // Auto-cierre: a los 3.6 s empieza a desvanecerse y a los 4 s se elimina
    setTimeout(() => aviso.classList.add("saliendo"), 3600);
    setTimeout(() => aviso.remove(), 4000);
  }

  // Pregunta si está seguro. Devuelve true si el usuario acepta
  // Este msj lo tira cuando se quiere eliminar un contacto, para que el usuario confirme la acción
  pedirConfirmacion(texto: string): boolean {
    return confirm(texto);
  }

  //  Lista de tarjetas 
  mostrarContactos(contactos: Contacto[], total: number): void {
    this.lista.innerHTML = ""; // se vacía la lista antes de volver a dibujarla
    this.contador.textContent = `Mostrando ${contactos.length} de ${total} contactos`;

    if (contactos.length === 0) {
      const vacio = document.createElement("p");
      vacio.className = "vacio";
      if (total === 0) {
        vacio.textContent = "Todavía no hay contactos. Agrega el primero.";
      } else {
        vacio.textContent = "Ningún contacto coincide con la búsqueda o el filtro.";
      }
      this.lista.appendChild(vacio);
      return;
    }

    for (const contacto of contactos) {
      this.lista.appendChild(this.crearTarjeta(contacto));
    }
  }

  // Crea el círculo con las iniciales. El color depende de la categoría
  renderAvatar(nombre: string, categoria: Categoria): HTMLElement {
    const avatar = document.createElement("div"); // Crea el elemento del avatar
    avatar.className = "avatar avatar-" + categoria; // Le asigna la clase según la categoría
    avatar.textContent = this.obtenerIniciales(nombre); // Pone las iniciales del nombre como contenido del avatar
    return avatar; // Devuelve el elemento del avatar para que se pueda agregar a la tarjeta
  }

  // "María José López" -> "MJ" (primera letra de las dos primeras palabras)
  private obtenerIniciales(nombre: string): string { 
    const palabras = nombre.trim().split(/\s+/); // Separa el nombre en palabras usando espacios como separadores
    let iniciales = palabras[0].charAt(0); // Primera letra de la primera palabra
    if (palabras.length > 1) { // Si hay más de una palabra, se toma la primera letra de la segunda palabra
      iniciales += palabras[1].charAt(0); // Segunda letra de la segunda palabra
    }
    return iniciales.toUpperCase(); // Devuelve las iniciales en mayúscula
  }

  // Llena el select de filtro con cada categoría y cuántos contactos tiene
  // Esta funcion lo que hace es renderizar el select de filtro de categorias, 
  // mostrando la cantidad de contactos que hay en cada categoria y la opcion de "todas"
  // con el total de contactos. Ademas, mantiene seleccionada la categoria que el usuario haya elegido previamente.
  renderCategoryFilter(
    conteos: Record<Categoria, number>, // { familia: 3, trabajo: 5, amigos: 2 }
    total: number, 
    seleccionada: FiltroCategoria
  ): void {
    this.selectFiltro.innerHTML = ""; // se vacía el select antes de volver a llenarlo
    this.selectFiltro.appendChild(this.crearOpcion("todas", `Todas (${total})`)); // Opción "todas" con el total de contactos

    for (const categoria of CATEGORIAS) { // Se recorre la lista de categorías para crear una opción por cada una
      const texto = `${etiquetaCategoria(categoria)} (${conteos[categoria]})`;
      this.selectFiltro.appendChild(this.crearOpcion(categoria, texto));
    }

    // Se vuelve a marcar la opción que el usuario había elegido
    this.selectFiltro.value = seleccionada;
  }

  // Crea el HTML de una tarjeta. Se usa textContent para que lo que escriba
  // el usuario nunca se interprete como código HTML.
  private crearTarjeta(contacto: Contacto): HTMLElement {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    // Parte de arriba: avatar y datos
    const cabecera = document.createElement("div");
    cabecera.className = "tarjeta-cabecera";

    const info = document.createElement("div");
    info.className = "tarjeta-info";

    const nombre = document.createElement("h3");
    nombre.textContent = contacto.nombre;

    const telefono = document.createElement("p");
    telefono.textContent = contacto.telefono;

    const email = document.createElement("p");
    email.textContent = contacto.email;

    const etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta etiqueta-" + contacto.categoria;
    etiqueta.textContent = etiquetaCategoria(contacto.categoria);

    info.appendChild(nombre);
    info.appendChild(telefono);
    info.appendChild(email);
    info.appendChild(etiqueta);

    cabecera.appendChild(this.renderAvatar(contacto.nombre, contacto.categoria));
    cabecera.appendChild(info);

    // Parte de abajo: botones
    const botones = document.createElement("div");
    botones.className = "botones";
    // Botones de editar y eliminar. Se usan data-atributos para saber qué contacto es
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.className = "btn-editar";
    botonEditar.dataset.accion = "editar";
    botonEditar.dataset.id = String(contacto.id);
    // Botón de eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "btn-eliminar";
    botonEliminar.dataset.accion = "eliminar";
    botonEliminar.dataset.id = String(contacto.id);
    // Se agregan los botones a la tarjeta
    botones.appendChild(botonEditar);
    botones.appendChild(botonEliminar);
    // Se agregan la cabecera y los botones a la tarjeta
    tarjeta.appendChild(cabecera);
    tarjeta.appendChild(botones);

    return tarjeta;
  }

  // Pestaña de resumen 
  // Muestra el total y una barra por cada categoría
  renderResumen(total: number, conteos: Record<Categoria, number>): void {
    this.resumen.innerHTML = "";
    // Se muestra el total de contactos y el porcentaje de cada categoría
    const titulo = document.createElement("p");
    titulo.className = "resumen-total";
    titulo.textContent = `Total de contactos: ${total}`;
    this.resumen.appendChild(titulo);
    // Se crea una fila con el nombre, la cantidad y la barra de cada categoría
    for (const categoria of CATEGORIAS) {
      const cantidad = conteos[categoria];
      const porcentaje = total === 0 ? 0 : Math.round((cantidad / total) * 100);

      const fila = document.createElement("div");
      fila.className = "fila-resumen";

      const texto = document.createElement("p");
      texto.textContent = `${etiquetaCategoria(categoria)}: ${cantidad} (${porcentaje}%)`;

      const barra = document.createElement("div");
      barra.className = "barra";

      const relleno = document.createElement("div");
      relleno.className = "relleno relleno-" + categoria;
      relleno.style.width = porcentaje + "%";

      barra.appendChild(relleno);
      fila.appendChild(texto);
      fila.appendChild(barra);
      this.resumen.appendChild(fila);
    }
  }

  // Exportar 

  // Crea un archivo con el texto y hace que el navegador lo descargue
  // Como funciona?, esto funciona creando un "blob" (un archivo virtual) con el contenido que queremos descargar,
  // luego se crea un enlace <a> con el atributo "download" y se hace clic en él para que el navegador descargue el archivo.
  descargarArchivo(nombre: string, contenido: string, tipo: string): void {
    const blob = new Blob([contenido], { type: tipo });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombre;
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(url);
  }
}