// CONTROLADOR: conecta la vista con el modelo.
// Recibe los eventos de la vista, le pide al modelo que haga el trabajo
// y luego le dice a la vista que se vuelva a dibujar.

import {
  Contacto,
  FiltroCategoria,
  Orden,
  ErrorValidacion,
} from "../models/Contacto.js";
import { ContactoModel } from "../models/ContactoModel.js";
import { ContactoView } from "../views/ContactoView.js";
// Esta clase es la que maneja la interacción entre la vista y el modelo
export class ContactoController {
  private vista: ContactoView;
  private modelo: ContactoModel;

  // Si es null estamos creando; si tiene un número estamos editando ese contacto
  private idEditando: number | null = null;

  // Estado de la búsqueda, el filtro y el orden (se combinan los tres)
  private textoBusqueda: string = "";
  private categoriaFiltro: FiltroCategoria = "todas";
  private orden: Orden = "asc";

  constructor(vista: ContactoView, modelo: ContactoModel) {
    this.vista = vista;
    this.modelo = modelo;
  }

  // Se llama una vez al abrir la página
  iniciar(): void {
    this.vista.enlazarGuardar(() => this.handleSubmit());
    this.vista.enlazarCancelar(() => this.handleCancel());
    this.vista.enlazarBuscar((texto) => this.handleSearch(texto));
    this.vista.enlazarFiltro((categoria) => this.handleFilter(categoria));
    this.vista.enlazarOrden((orden) => this.handleSort(orden));
    this.vista.enlazarExportar(() => this.handleExport());
    this.vista.enlazarAcciones(
      (id) => this.handleEdit(id),
      (id) => this.handleDelete(id)
    );

    this.actualizarVista();
  }

  // Guardar (crear o actualizar) 
  // El mismo formulario sirve para crear y para editar
  private handleSubmit(): void {
    if (this.idEditando === null) {
      this.handleCreate();
    } else {
      this.handleUpdate();
    }
  }

  private handleCreate(): void {
    // Date.now() da un número que no se repite, sirve como id
    const contacto = this.leerFormulario(Date.now());

    const errores = this.validar(contacto);
    if (errores.length > 0) {
      this.vista.mostrarErrores(errores);
      return;
    }

    this.modelo.addContacto(contacto);
    this.vista.limpiarFormulario();
    this.vista.mostrarExito("Contacto guardado correctamente.");
    this.actualizarVista();
  }

  private handleUpdate(): void {
    if (this.idEditando === null) {
      return;
    }

    // Se mantiene el mismo id para reemplazar el contacto original
    const contacto = this.leerFormulario(this.idEditando); 
    // Se valida el contacto antes de actualizarlo
    const errores = this.validar(contacto);
    if (errores.length > 0) {
      this.vista.mostrarErrores(errores);
      return;
    }
    // Se actualiza el contacto en el modelo
    this.modelo.updateContacto(contacto);
    this.idEditando = null;
    this.vista.limpiarFormulario();
    this.vista.mostrarExito("Contacto actualizado correctamente.");
    this.actualizarVista();
  }

  // Crea un objeto Contacto con lo que hay escrito en el formulario
  private leerFormulario(id: number): Contacto {
    const datos = this.vista.obtenerDatosFormulario();
    return new Contacto(id, datos.nombre, datos.telefono, datos.email, datos.categoria);
  }

  // Junta los errores de formato (del contacto) y los de duplicados (del modelo)
  private validar(contacto: Contacto): ErrorValidacion[] {
    const errores = contacto.validar();
    const duplicados = this.modelo.validarDuplicados(contacto);
    return errores.concat(duplicados);
  }

  //  Editar, cancelar y eliminar 

  // Pasa los datos del contacto al formulario
  private handleEdit(id: number): void {
    const contacto = this.modelo.getContactoPorId(id);
    if (contacto === undefined) {
      return;
    }
    this.idEditando = id;
    this.vista.cargarFormulario(contacto);
  }
  // Cancela la edición y limpia el formulario
  private handleCancel(): void {
    this.idEditando = null;
    this.vista.limpiarFormulario();
  } 
  // Pide confirmación y borra el contacto del modelo
  private handleDelete(id: number): void {
    const contacto = this.modelo.getContactoPorId(id);
    if (contacto === undefined) {
      return;
    }

    // Se pide confirmación antes de borrar
    const acepto = this.vista.pedirConfirmacion(
      `¿Seguro que quieres eliminar a ${contacto.nombre}?`
    );
    if (!acepto) {
      return;
    } 
    // Se borra el contacto del modelo
    this.modelo.deleteContacto(id);

    // Si se estaba editando justo ese contacto, se cancela la edición
    if (this.idEditando === id) {
      this.handleCancel();
    }
    // Se muestra un mensaje de éxito y se actualiza la vista
    this.vista.mostrarExito(`Se eliminó a ${contacto.nombre}.`);
    this.actualizarVista();
  }

  //  Búsqueda, filtro y orden 

  private handleSearch(texto: string): void {
    this.textoBusqueda = texto; 
    this.actualizarVista();
  }
  // Cambia la categoría de filtro (familia, trabajo, amigos o todas)
  private handleFilter(categoria: FiltroCategoria): void {
    this.categoriaFiltro = categoria;
    this.actualizarVista();
  }
  // Cambia el orden de los contactos (ascendente o descendente)
  // Como Funciona? Cuando el usuario hace clic en el botón de orden, se llama a esta función 
  // con el nuevo orden.
  // Se guarda el nuevo orden en la propiedad this.orden y se llama a actualizarVista() para 
  // que se vuelvan a dibujar los contactos.
  // La función actualizarVista() obtiene la lista de contactos visibles (aplicando búsqueda, 
  // filtro y orden) y le dice a la vista que los muestre.
  private handleSort(orden: Orden): void {
    this.orden = orden;
    this.actualizarVista();
  }

  //  Exportar 

  // Exporta los contactos que se están viendo (respeta búsqueda y filtro)
  private handleExport(): void {
    const lista = this.obtenerContactosVisibles();
    // Si no hay contactos, se muestra un mensaje y no se hace nada
    if (lista.length === 0) {
      this.vista.mostrarInfo("No hay contactos para exportar.");
      return;
    }
    // Se genera el CSV y se descarga
    const csv = this.modelo.generarCSV(lista);
    this.vista.descargarArchivo("contactos.csv", csv, "text/csv;charset=utf-8");
    this.vista.mostrarExito(`Se exportaron ${lista.length} contactos a contactos.csv.`);
  }

  //  Mostrar 

  // Aplica los tres pasos en orden: buscar, filtrar y ordenar
  // Como funciona? Esta función obtiene la lista de contactos del modelo, luego aplica la búsqueda, 
  // el filtro y el orden, y devuelve la lista resultante.
  private obtenerContactosVisibles(): Contacto[] {
    let lista = this.modelo.getContactos();
    lista = this.modelo.searchContactos(lista, this.textoBusqueda);
    lista = this.modelo.filterByCategory(lista, this.categoriaFiltro);
    lista = this.modelo.sortByName(lista, this.orden);
    return lista;
  }

  // Vuelve a dibujar todo lo que depende de los datos
  private actualizarVista(): void {
    const total = this.modelo.getContactos().length;
    const conteos = this.modelo.contarPorCategoria();

    this.vista.mostrarContactos(this.obtenerContactosVisibles(), total);
    this.vista.renderCategoryFilter(conteos, total, this.categoriaFiltro);
    this.vista.renderResumen(total, conteos);
  }
}