// MODELO: define cómo es un contacto y valida sus datos

// Categorías permitidas. Es un tipo unión: solo acepta estos 3 textos
export type Categoria = "familia" | "trabajo" | "amigos";

// Lo que puede elegir el filtro: una categoría o todas
export type FiltroCategoria = Categoria | "todas";

// Orden alfabético: ascendente (A-Z) o descendente (Z-A)
export type Orden = "asc" | "desc";

// Nombres de los campos del formulario (sirve para saber dónde hubo un error)
export type NombreCampo = "nombre" | "telefono" | "email" | "categoria";

// Lista con las mismas categorías para poder recorrerlas con un for
export const CATEGORIAS: Categoria[] = ["familia", "trabajo", "amigos"];

// Devuelve la categoría con la primera letra en mayúscula (familia -> Familia)
export function etiquetaCategoria(categoria: Categoria): string {
  return categoria.charAt(0).toUpperCase() + categoria.slice(1);
}

// Interface: describe la forma que debe tener un contacto
export interface IContacto {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  categoria: Categoria;
}

// Un error de validación dice en qué campo pasó y qué pasó
export interface ErrorValidacion {
  campo: NombreCampo;
  mensaje: string;
}

export class Contacto implements IContacto {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  categoria: Categoria;

  constructor(
    id: number,
    nombre: string,
    telefono: string,
    email: string,
    categoria: Categoria
  ) {
    this.id = id;
    this.nombre = nombre.trim();
    this.telefono = telefono.trim();
    this.email = email.trim();
    this.categoria = categoria;
  }

  // Revisa los datos y devuelve una lista con los errores encontrados.
  // Si la lista está vacía, el contacto es válido.
  validar(): ErrorValidacion[] {
    const errores: ErrorValidacion[] = [];

    // Nombre: entre 2 y 40 caracteres
    if (this.nombre === "") {
      errores.push({ campo: "nombre", mensaje: "El nombre es obligatorio." });
    } else if (this.nombre.length < 2) {
      errores.push({
        campo: "nombre",
        mensaje: "El nombre debe tener al menos 2 caracteres.",
      });
    } else if (this.nombre.length > 40) {
      errores.push({
        campo: "nombre",
        mensaje: "El nombre no puede pasar de 40 caracteres.",
      });
    }

    // Teléfono: exactamente 8 dígitos con guion en medio (ej: 7777-8888)
    const digitos = this.telefono.replace(/\D/g, "");
    if (this.telefono === "") { // Si el teléfono está vacío
      errores.push({ campo: "telefono", mensaje: "El teléfono es obligatorio." });
    } else if (digitos.length > 8) {
      errores.push({
        campo: "telefono",
        mensaje: "El teléfono no puede tener más de 8 dígitos.",
      });
    } else if (!/^\d{4}-\d{4}$/.test(this.telefono)) { // Si no tiene el formato correcto
      errores.push({
        campo: "telefono",
        mensaje: "El teléfono debe tener 8 dígitos con el formato 7777-8888.",
      });
    }

    // Email: formato básico texto@dominio.algo
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del email
    if (this.email === "") {
      errores.push({ campo: "email", mensaje: "El email es obligatorio." });
    } else if (!formatoEmail.test(this.email)) {
      errores.push({
        campo: "email",
        mensaje: "El email no es válido (ejemplo: nombre@correo.com).",
      });
    }

    // Categoría: tiene que ser una de las 3 permitidas
    if (!CATEGORIAS.includes(this.categoria)) {
      errores.push({ campo: "categoria", mensaje: "Elige una categoría." });
    }

    return errores;
  }
}