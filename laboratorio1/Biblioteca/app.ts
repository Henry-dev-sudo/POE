// Sistema de Biblioteca - UNIVO
// Programacion Orientada a Eventos

// ============================================
// 1. INTERFACES
// ============================================

// Las categorias que pueden tener los libros
type Categoria = "CIENCIA" | "LITERATURA" | "HISTORIA" | "TECNOLOGIA" | "ARTE";

// Como es un libro
interface Libro {
    id: number;
    titulo: string;
    autor: string;
    categoria: Categoria;
    anio: number;
    disponible: boolean;
    ejemplares: number;
    esFavorito: boolean;
}

// ============================================
// 2. EMISOR DE EVENTOS (copiado del profe)
// ============================================

// Esto es para poder usar eventos como en Node.js
class EventEmitter {
    private eventos: { [nombre: string]: Function[] } = {};

    // Para escuchar un evento
    on(nombre: string, callback: Function) {
        if (!this.eventos[nombre]) {
            this.eventos[nombre] = [];
        }
        this.eventos[nombre].push(callback);
    }

    // Para emitir un evento
    emit(nombre: string, ...datos: any[]) {
        const lista = this.eventos[nombre];
        if (!lista) return;
        for (const cb of lista) {
            cb(...datos);
        }
    }
}

// ============================================
// 3. CLASE BIBLIOTECA (la que maneja los libros)
// ============================================

class Biblioteca extends EventEmitter {
    private libros: Libro[] = [];
    private contadorId = 1;

    // Agregar libro nuevo
    agregarLibro(datos: Omit<Libro, "id" | "disponible" | "esFavorito">) {
        const libro: Libro = {
            ...datos,
            id: this.contadorId,
            disponible: datos.ejemplares > 0,
            esFavorito: false
        };
        this.contadorId++;
        this.libros.push(libro);
        this.emit("libroAgregado", libro);
    }

    // Pedir prestado un libro
    solicitarPrestamo(id: number) {
        const libro = this.libros.find(l => l.id === id);
        if (!libro || libro.ejemplares <= 0) {
            this.emit("noDisponible", libro);
            return;
        }
        libro.ejemplares--;
        if (libro.ejemplares === 0) {
            libro.disponible = false;
        }
        this.emit("prestamoExitoso", libro);
    }

    // Devolver un libro
    devolverLibro(id: number) {
        const libro = this.libros.find(l => l.id === id);
        if (!libro) return;
        libro.ejemplares++;
        libro.disponible = true;
        this.emit("devolucionExitosa", libro);
    }

    // Marcar/desmarcar favorito
    marcarFavorito(id: number) {
        const libro = this.libros.find(l => l.id === id);
        if (!libro) return;
        libro.esFavorito = !libro.esFavorito;
    }

    // Obtener todos los libros
    obtenerLibros() {
        return this.libros;
    }
}

// ============================================
// 4. CLASES QUE ESCUCHAN EVENTOS
// ============================================

// Esta clase solo muestra mensajes en consola
class ConsolaNotificador {
    notificarNuevoLibro(libro: Libro) {
        console.log(`Nuevo libro: "${libro.titulo}" - ${libro.autor}`);
    }
    notificarPrestamo(libro: Libro) {
        console.log(`Prestamo: "${libro.titulo}" (quedan ${libro.ejemplares})`);
    }
    notificarNoDisponible(libro: Libro | undefined) {
        if (libro) {
            console.log(`"${libro.titulo}" no disponible`);
        } else {
            console.log("Libro no encontrado");
        }
    }
    notificarDevolucion(libro: Libro) {
        console.log(`Devolucion: "${libro.titulo}" (ahora hay ${libro.ejemplares})`);
    }
}

// Esta clase maneja lo que se ve en la pagina
class UIManager {
    private contenedor = document.getElementById("contenedor-libros") as HTMLElement;
    private total = document.getElementById("contador-total") as HTMLElement;
    private disponibles = document.getElementById("contador-disponibles") as HTMLElement;
    private conteo = document.getElementById("catalogo-conteo") as HTMLElement;
    private mensajes = document.getElementById("area-mensajes") as HTMLElement;

    // Mostrar los libros en la pagina
    renderizarLibros(libros: Libro[]) {
        if (libros.length === 0) {
            this.contenedor.innerHTML = `<p class="catalogo__vacio">No hay libros</p>`;
            this.conteo.textContent = "0";
            return;
        }

        let html = "";
        for (const libro of libros) {
            const favorito = libro.esFavorito ? "★" : "☆";
            const claseFav = libro.esFavorito ? "es-favorito" : "";
            const botonPrestar = libro.ejemplares > 0
                ? `<button class="btn-prestar" data-id="${libro.id}">Prestar</button>`
                : `<button disabled>Prestar</button>`;
            const estado = libro.disponible ? "Disponible" : "Agotado";
            const claseEstado = libro.disponible ? "estado-disponible" : "estado-agotado";

            html += `
                <div class="ficha">
                    <span class="ficha__categoria">${libro.categoria}</span>
                    <span class="ficha__numero">#${String(libro.id).padStart(3, "0")}</span>
                    <h3>${libro.titulo}</h3>
                    <p class="ficha__autor">${libro.autor}</p>
                    <div class="ficha__detalles">
                        ${libro.anio} · ${libro.ejemplares} ejemplares
                    </div>
                    <span class="ficha__estado ${claseEstado}">${estado}</span>
                    <div class="ficha__acciones">
                        ${botonPrestar}
                        <button class="btn-devolver" data-id="${libro.id}">Devolver</button>
                        <button class="btn-favorito ${claseFav}" data-id="${libro.id}">${favorito}</button>
                    </div>
                </div>
            `;
        }

        this.contenedor.innerHTML = html;
        this.conteo.textContent = String(libros.length);
    }

    // Actualizar los contadores
    actualizarContador(libros: Libro[]) {
        this.total.textContent = String(libros.length);
        this.disponibles.textContent = String(libros.filter(l => l.disponible).length);
    }

    // Mostrar mensajes temporales
    mostrarMensaje(texto: string, tipo: "exito" | "error" | "info") {
        const div = document.createElement("div");
        div.className = `mensaje mensaje-${tipo}`;
        div.textContent = texto;
        this.mensajes.appendChild(div);
        setTimeout(() => div.remove(), 3000);
    }
}

// ============================================
// 5. CREAR INSTANCIAS Y CONECTAR TODO
// ============================================

const biblioteca = new Biblioteca();
const consola = new ConsolaNotificador();
const ui = new UIManager();

// Variables para los filtros
let filtroCategoria: Categoria | "TODAS" = "TODAS";
let soloDisponibles = false;
let ordenPor: "titulo" | "autor" | "ninguno" = "ninguno";

// Funcion que actualiza la vista aplicando filtros
function actualizarVista() {
    let libros = biblioteca.obtenerLibros();

    // Filtrar por categoria
    if (filtroCategoria !== "TODAS") {
        libros = libros.filter(l => l.categoria === filtroCategoria);
    }

    // Filtrar solo disponibles
    if (soloDisponibles) {
        libros = libros.filter(l => l.disponible);
    }

    // Ordenar
    if (ordenPor === "titulo") {
        libros.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }
    if (ordenPor === "autor") {
        libros.sort((a, b) => a.autor.localeCompare(b.autor));
    }

    ui.renderizarLibros(libros);
    ui.actualizarContador(biblioteca.obtenerLibros());
}

// Conectar eventos - cuando pasa algo, se actualiza la vista
biblioteca.on("libroAgregado", (libro: Libro) => {
    consola.notificarNuevoLibro(libro);
    ui.mostrarMensaje(`"${libro.titulo}" agregado`, "exito");
    actualizarVista();
});

biblioteca.on("prestamoExitoso", (libro: Libro) => {
    consola.notificarPrestamo(libro);
    ui.mostrarMensaje(`"${libro.titulo}" prestado`, "exito");
    actualizarVista();
});

biblioteca.on("noDisponible", (libro: Libro | undefined) => {
    consola.notificarNoDisponible(libro);
    const msg = libro ? `"${libro.titulo}" no disponible` : "Libro no encontrado";
    ui.mostrarMensaje(msg, "error");
});

biblioteca.on("devolucionExitosa", (libro: Libro) => {
    consola.notificarDevolucion(libro);
    ui.mostrarMensaje(`"${libro.titulo}" devuelto`, "info");
    actualizarVista();
});

// ============================================
// 6. MANEJAR EL DOM
// ============================================

// Agregar libro desde el formulario
const form = document.getElementById("form-libro") as HTMLFormElement;
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = (document.getElementById("input-titulo") as HTMLInputElement).value.trim();
    const autor = (document.getElementById("input-autor") as HTMLInputElement).value.trim();
    const categoria = (document.getElementById("input-categoria") as HTMLSelectElement).value as Categoria;
    const ejemplares = Number((document.getElementById("input-ejemplares") as HTMLInputElement).value);
    const anio = Number((document.getElementById("input-anio") as HTMLInputElement).value);

    if (!titulo || !autor || ejemplares < 1 || anio < 1) {
        ui.mostrarMensaje("Completa todos los datos", "error");
        return;
    }

    biblioteca.agregarLibro({ titulo, autor, categoria, ejemplares, anio });
    form.reset();
    (document.getElementById("input-ejemplares") as HTMLInputElement).value = "1";
    (document.getElementById("input-anio") as HTMLInputElement).value = "2024";
});

// Cuando se hace click en los botones de los libros (prestar, devolver, favorito)
const contenedor = document.getElementById("contenedor-libros") as HTMLElement;
contenedor.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset.id);
    if (!id) return;

    if (target.classList.contains("btn-prestar")) {
        biblioteca.solicitarPrestamo(id);
    }
    if (target.classList.contains("btn-devolver")) {
        biblioteca.devolverLibro(id);
    }
    if (target.classList.contains("btn-favorito")) {
        biblioteca.marcarFavorito(id);
        actualizarVista();
    }
});

// Filtro por categoria
const filtro = document.getElementById("select-filtro-categoria") as HTMLSelectElement;
filtro.addEventListener("change", () => {
    filtroCategoria = filtro.value as Categoria | "TODAS";
    actualizarVista();
});

// Boton ordenar por titulo
const btnTitulo = document.getElementById("btn-orden-titulo") as HTMLButtonElement;
btnTitulo.addEventListener("click", () => {
    ordenPor = ordenPor === "titulo" ? "ninguno" : "titulo";
    btnTitulo.classList.toggle("activo", ordenPor === "titulo");
    btnAutor.classList.remove("activo");
    actualizarVista();
});

// Boton ordenar por autor
const btnAutor = document.getElementById("btn-orden-autor") as HTMLButtonElement;
btnAutor.addEventListener("click", () => {
    ordenPor = ordenPor === "autor" ? "ninguno" : "autor";
    btnAutor.classList.toggle("activo", ordenPor === "autor");
    btnTitulo.classList.remove("activo");
    actualizarVista();
});

// Boton solo disponibles
const btnDisponibles = document.getElementById("btn-solo-disponibles") as HTMLButtonElement;
btnDisponibles.addEventListener("click", () => {
    soloDisponibles = !soloDisponibles;
    btnDisponibles.classList.toggle("activo", soloDisponibles);
    actualizarVista();
});

// ============================================
// 7. DATOS DE PRUEBA
// ============================================

const librosIniciales: Omit<Libro, "id" | "disponible" | "esFavorito">[] = [
    { titulo: "El Principito", autor: "Antoine de Saint-Exupery", categoria: "LITERATURA", anio: 1943, ejemplares: 5 },
    { titulo: "Cien años de soledad", autor: "Gabriel Garcia Marquez", categoria: "LITERATURA", anio: 1967, ejemplares: 3 },
    { titulo: "Breve historia del tiempo", autor: "Stephen Hawking", categoria: "CIENCIA", anio: 1988, ejemplares: 2 },
    { titulo: "El arte de la guerra", autor: "Sun Tzu", categoria: "HISTORIA", anio: 500, ejemplares: 4 },
    { titulo: "Clean Code", autor: "Robert C. Martin", categoria: "TECNOLOGIA", anio: 2008, ejemplares: 6 },
    { titulo: "Historia del arte", autor: "Ernst Gombrich", categoria: "ARTE", anio: 1950, ejemplares: 2 },
    { titulo: "Game of Thrones", autor: "George R. R. Martin", categoria: "LITERATURA", anio: 1996, ejemplares: 3 },
    { titulo: "50 sombras de Grey", autor: "E. L. James", categoria: "LITERATURA", anio: 2011, ejemplares: 5 },
    { titulo: "House the Dragon", autor: "George R. R. Martin", categoria: "LITERATURA", anio: 2022, ejemplares: 4 },
    { titulo: "Harry Potter y la piedra filosofal", autor: "J. K. Rowling", categoria: "LITERATURA", anio: 1997, ejemplares: 7 },
    { titulo: "Harry Potter y la cámara secreta", autor: "J. K. Rowling", categoria: "LITERATURA", anio: 1998, ejemplares: 5 },
    { titulo: "Harry Potter y el prisionero de Azkaban", autor: "J. K. Rowling", categoria: "LITERATURA", anio: 1999, ejemplares: 4 },
    { titulo: "Harry Potter y el cáliz de fuego", autor: "J. K. Rowling", categoria: "LITERATURA", anio: 2000, ejemplares: 3 },
    { titulo: "Harry Potter y la orden del Fénix", autor: "J. K. Rowling", categoria: "LITERATURA", anio: 2003, ejemplares: 2 },
    { titulo: "Harry Potter y el misterio del príncipe", autor: "J. K. Rowling", categoria: "LITERATURA", anio: 2005, ejemplares: 1 },
    { titulo: "Harry Potter y las reliquias de la muerte", autor: "J. K. Rowling", categoria: "LITERATURA", anio: 2007, ejemplares: 3 },
];

for (const libro of librosIniciales) {
    biblioteca.agregarLibro(libro);
}

console.log("Sistema de Biblioteca UNIVO iniciado");