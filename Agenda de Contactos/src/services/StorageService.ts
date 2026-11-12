// SERVICIO: se encarga únicamente de guardar y leer en localStorage

import { Contacto, IContacto, CATEGORIAS } from "../models/Contacto.js";

export class StorageService {
  // Nombre con el que se guarda la información en el navegador
  private clave: string = "agenda-contactos";

  // Guarda la lista completa de contactos
  guardar(contactos: Contacto[]): void {
    // localStorage solo guarda texto, por eso se convierte a JSON
    localStorage.setItem(this.clave, JSON.stringify(contactos));
  }

  // Lee los contactos guardados (devuelve lista vacía si no hay nada)
  cargar(): Contacto[] {
    const texto = localStorage.getItem(this.clave);
    if (texto === null) {
      return [];
    }
// Se intenta convertir el texto a JSON y luego a objetos Contacto
    try {
      const datos: IContacto[] = JSON.parse(texto);
      // Se vuelven a crear como objetos Contacto para tener sus métodos
      return datos.map((d) => {
        // Los contactos del laboratorio no tenían categoría: se les pone "amigos"
        const categoria = CATEGORIAS.includes(d.categoria) ? d.categoria : "amigos";
        return new Contacto(d.id, d.nombre, d.telefono, d.email, categoria);
      });
    } catch (error) {
      // Si el JSON estaba dañado, se empieza con la agenda vacía
      console.error("No se pudieron leer los contactos guardados", error);
      return [];
    }
  }
}