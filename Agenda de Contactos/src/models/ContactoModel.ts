// MODELO: guarda la lista de contactos y hace todas las operaciones sobre ella
// (agregar, editar, eliminar, buscar, filtrar, ordenar y contar)

import { // Aca hacemos la importación de los tipos y clases que necesitamos del archivo Contacto.ts
  Contacto,
  Categoria,
  FiltroCategoria,
  Orden,
  ErrorValidacion,
  etiquetaCategoria,
} from "./Contacto.js";
import { StorageService } from "../services/StorageService.js";

// Esta clase es la que maneja la lista de contactos y todas las operaciones sobre ella
export class ContactoModel { 
  private contactos: Contacto[];
  private storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
    // Al iniciar se cargan automáticamente los contactos guardados
    this.contactos = this.storage.cargar();
  }

  // CRUD 

  // Devuelve una copia de la lista para que nadie la modifique desde afuera
  getContactos(): Contacto[] {
    return [...this.contactos];
  }
// Devuelve el contacto con el id indicado, o undefined si no lo encuentra
  getContactoPorId(id: number): Contacto | undefined {
    return this.contactos.find((c) => c.id === id);
  }
// Agrega un contacto al final de la lista y lo guarda en el storage
  addContacto(contacto: Contacto): void {
    this.contactos.push(contacto);
    this.guardar();
  }

  // Reemplaza el contacto que tenga el mismo id
  updateContacto(contacto: Contacto): void {
    const posicion = this.contactos.findIndex((c) => c.id === contacto.id);
    if (posicion !== -1) {
      this.contactos[posicion] = contacto;
      this.guardar();
    }
  }

  // filter deja todos los contactos menos el que se borra
  deleteContacto(id: number): void {
    this.contactos = this.contactos.filter((c) => c.id !== id);
    this.guardar();
  }

  // Búsqueda, filtro y orden
  // Cada método recibe una lista y devuelve otra, así se pueden combinar:
  // primero se busca, luego se filtra y al final se ordena.

  // Busca por nombre, teléfono o email
  searchContactos(lista: Contacto[], texto: string): Contacto[] {
    const buscado = texto.trim().toLowerCase();
    if (buscado === "") {
      return lista; // Si no hay texto de búsqueda, devuelve la lista completa
    }

    // Para el teléfono también se compara solo con números (77778888 encuentra 7777-8888)
    const soloNumeros = buscado.replace(/\D/g, "");
// Se filtra la lista y se devuelve otra con los contactos que coinciden
    return lista.filter((c) => {
      const coincideNombre = c.nombre.toLowerCase().includes(buscado);
      const coincideEmail = c.email.toLowerCase().includes(buscado);
      const coincideTelefono =
        c.telefono.includes(buscado) ||
        (soloNumeros !== "" && c.telefono.replace(/\D/g, "").includes(soloNumeros)); // Si el usuario escribió solo números, también se busca así
      return coincideNombre || coincideEmail || coincideTelefono;
    });
  }
// Filtra por categoría, o devuelve todos si la categoría es "todas"
  filterByCategory(lista: Contacto[], categoria: FiltroCategoria): Contacto[] {
    if (categoria === "todas") {
      return lista;
    }
    return lista.filter((c) => c.categoria === categoria); // Devuelve otra lista con los contactos que coinciden
  }

  // Ordena alfabéticamente. localeCompare con "es" respeta tildes y la ñ
  sortByName(lista: Contacto[], orden: Orden): Contacto[] {
    const copia = [...lista]; // se ordena una copia para no alterar la original
    copia.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    if (orden === "desc") {
      copia.reverse();
    }
    return copia; // devuelve la lista ordenada
  }

  // Contadores 
  contarPorCategoria(): Record<Categoria, number> {
    const conteo: Record<Categoria, number> = { familia: 0, trabajo: 0, amigos: 0 };
    for (const c of this.contactos) {
      conteo[c.categoria]++;
    }
    return conteo;
  }

  // Validación de duplicados 
  // Revisa que el teléfono y el email no los tenga otro contacto
  validarDuplicados(contacto: Contacto): ErrorValidacion[] {
    const errores: ErrorValidacion[] = [];
    const emailNuevo = contacto.email.toLowerCase();

    for (const otro of this.contactos) { // Recorre todos los contactos existentes
      // Al editar no se compara el contacto consigo mismo
      if (otro.id === contacto.id) {
        continue;
      }
      if (otro.telefono === contacto.telefono) {
        errores.push({
          campo: "telefono",
          mensaje: `Ese teléfono ya lo tiene el contacto ${otro.nombre}.`,
        });
      }
      // El email se compara en minúsculas: Ana@correo.com es igual a ana@correo.com
      if (otro.email.toLowerCase() === emailNuevo) {
        errores.push({
          campo: "email",
          mensaje: `Ese email ya lo tiene el contacto ${otro.nombre}.`,
        });
      }
    }

    return errores;
  }

  // Exportar 
  // Convierte una lista de contactos a texto en formato CSV
  generarCSV(lista: Contacto[]): string {
    const filas: string[] = ["Nombre,Teléfono,Email,Categoría"];

    for (const c of lista) {
      const celdas = [c.nombre, c.telefono, c.email, etiquetaCategoria(c.categoria)];
      filas.push(celdas.map((celda) => this.celdaCSV(celda)).join(","));
    }

    // El \uFEFF del inicio hace que Excel muestre bien las tildes y la ñ
    return "\uFEFF" + filas.join("\r\n"); // Devuelve el texto completo en formato CSV
  }

  // Pone el texto entre comillas y duplica las comillas internas
  private celdaCSV(valor: string): string {
    return '"' + valor.replace(/"/g, '""') + '"';
  }

  // Persistencia -
  private guardar(): void {
    this.storage.guardar(this.contactos);
  }
}
