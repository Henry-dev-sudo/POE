/**
 * ================================================================
 * SPIDER-VERSE: REGISTRO DE HÉROES
 * Sistema de reclutamiento multiversal
 * ================================================================
 *
 * Este script maneja el registro de héroes del Spider-Verse,
 * permitiendo agregar, listar y eliminar reclutas del multiverso.
 * ================================================================
 */


// ================================================================
// PASO 1: INTERFACES Y TIPOS
// ================================================================
// Explicar: una interfaz define la "forma" que debe tener un objeto.
// Aquí decimos que TODO héroe debe tener id, nombre y universo.
// Esto es lo mismo que ya vieron en POO al tipar propiedades de una clase.

interface Heroe {
    id: number;          // Identificador único del héroe
    nombre: string;      // Alias o nombre del héroe
    universo: string;    // Tierra de origen (ej: "Tierra-1610")
    esFavorito: boolean; // Punto 7 - true si el héroe fue marcado como favorito
}


// ================================================================
// PASO 2: REFERENCIAS A LOS ELEMENTOS DEL DOM
// ================================================================
// Explicar: en vez de escribir document.getElementById(...) una y otra
// vez por todo el archivo, lo hacemos UNA sola vez aquí y lo guardamos
// en un objeto llamado DOM. Así, si el HTML cambia, solo tocamos este bloque.

const DOM = {
    // Input donde se escribe el nombre del héroe
    txtNombre: document.getElementById('txtNombre') as HTMLInputElement,
    // Select para elegir el universo de origen
    selectUniverso: document.getElementById('selectCarrera') as HTMLSelectElement,
    // Botón para reclutar un nuevo héroe
    btnAgregar: document.getElementById('btnAgregar') as HTMLButtonElement,
    // Botón para limpiar los campos del formulario
    btnLimpiar: document.getElementById('btnLimpiar') as HTMLButtonElement,
    // Contenedor (grid) donde se muestran las tarjetas de héroes
    listaHeroes: document.getElementById('listaEstudiantes') as HTMLElement,
    // Párrafo que muestra el estado actual del sistema
    estado: document.getElementById('estado') as HTMLParagraphElement,
    // Número que muestra cuántos héroes hay reclutados
    contadorHeroes: document.getElementById('contadorHeroes') as HTMLElement,
    // Bloque que se muestra solo cuando NO hay héroes reclutados
    emptyState: document.getElementById('emptyState') as HTMLElement,
    // Texto del footer que muestra el último universo reclutado
    dimensionFooter: document.getElementById('dimensionFooter') as HTMLElement,
    // Punto 12 - Select para elegir cómo filtrar la lista de héroes
    selectFiltro: document.getElementById('selectFiltro') as HTMLSelectElement,
    // Punto 14 - Botón para ordenar la lista alfabéticamente
    btnOrdenar: document.getElementById('btnOrdenar') as HTMLButtonElement,
    // Bloque 5 (Opción C) - Contenedor donde se dibuja el resumen por universo
    resumenUniversos: document.getElementById('resumenUniversos') as HTMLElement
};


// ================================================================
// PASO 3: ESTADO GLOBAL DE LA APLICACIÓN
// ================================================================
// Explicar: estas dos variables representan "la memoria" del programa.
// heroes guarda la lista completa; idCounter genera un id distinto
// para cada héroe nuevo (nunca se repite, siempre sube).

let heroes: Heroe[] = [];        // Arreglo con todos los héroes reclutados
let idCounter: number = 1;       // Contador para asignar IDs únicos
const MAX_HEROES: number = 6;    // Límite máximo de héroes reclutables


// ================================================================
// PASO 4: ACTUALIZAR EL CONTADOR EN PANTALLA
// ================================================================
// Explicar: esta función NO agrega ni elimina nada, solo actualiza
// lo que se VE en pantalla según el estado actual del arreglo "heroes".

function actualizarContador(): void {
    const total = heroes.length;
    DOM.contadorHeroes.textContent = total.toString();

    // Si hay al menos un héroe, mostramos su universo en el footer
    if (heroes.length > 0) {
        const ultimoUniverso = heroes[heroes.length - 1].universo;
        DOM.dimensionFooter.textContent = ultimoUniverso;
    }
}


// ================================================================
// PASO 5: ACTUALIZAR EL MENSAJE DE ESTADO
// ================================================================
// Explicar: el parámetro "mensaje?" es OPCIONAL (el "?" lo indica).
// Si se lo pasamos, mostramos ese mensaje específico.
// Si NO se lo pasamos, calculamos un mensaje genérico según cuántos
// héroes hay en total.

function actualizarEstado(mensaje?: string): void {
    // Punto 3 - Log de cambios: mostramos el arreglo completo de heroes
    // cada vez que esta función se ejecuta, para poder seguir en consola
    // cómo crece y decrece el equipo.
    console.log('Arreglo heroes actualizado:', heroes);

    if (mensaje) {
        DOM.estado.textContent = mensaje;
        return;
    }

    const total = heroes.length;

    if (total === 0) {
        DOM.estado.textContent = 'Estado: Esperando reclutas del multiverso...';
    } else {
        // Explicar: usamos un operador ternario para agregar la "s" de plural
        // solo cuando corresponde ("1 héroe" vs "2 héroes")
        const plural = total > 1 ? 's' : '';
        DOM.estado.textContent = `Estado: ${total} héroe${plural} reclutado${plural} en el Spider-Verse`;
    }
}


// ================================================================
// PASO 6: MOSTRAR U OCULTAR EL "ESTADO VACÍO"
// ================================================================
// Explicar: classList.add/remove permite agregar o quitar una clase
// CSS desde TypeScript. La clase "hidden" (definida en el CSS) es la
// que hace que el bloque desaparezca.

function toggleEmptyState(): void {
    if (heroes.length === 0) {
        DOM.emptyState.classList.remove('hidden');
    } else {
        DOM.emptyState.classList.add('hidden');
    }
}

// ================================================================
// PASO 6.1: HABILITAR/DESHABILITAR EL BOTÓN SEGÚN EL LÍMITE
// ================================================================
// Explicar: esta función revisa si el equipo llegó al máximo de héroes
// y, según eso, prende o apaga el atributo "disabled" del botón
// btnAgregar. La llamamos siempre que el arreglo heroes cambia
// (agregar o eliminar), para que el botón se mantenga sincronizado.

function actualizarLimiteHeroes(): void {
    const equipoLleno = heroes.length >= MAX_HEROES;

    // disabled = true hace que el botón se vea gris y no se pueda
    // clickear; disabled = false lo vuelve a habilitar normalmente.
    DOM.btnAgregar.disabled = equipoLleno;

    if (equipoLleno) {
        actualizarEstado(`Equipo completo: máximo de ${MAX_HEROES} héroes alcanzado`);
    }
}

// ================================================================
// BLOQUE 5 (Opción C): CONTADOR DE HÉROES POR UNIVERSO
// ================================================================
// Explicar: usamos reduce() para recorrer el arreglo "heroes" UNA sola
// vez y construir un objeto donde cada clave es un universo y cada
// valor es cuántos héroes hay de ese universo. Es el mismo concepto
// que un "acumulador": arrancamos con un objeto vacío {} y en cada
// vuelta le vamos sumando 1 a la clave que corresponda.

function actualizarResumenUniversos(): void {
    // conteo queda, por ejemplo: { "Tierra-616 (Peter Parker)": 2, "Tierra-1610 (Miles Morales)": 1 }
    const conteo: Record<string, number> = heroes.reduce((acumulador, heroe) => {
        acumulador[heroe.universo] = (acumulador[heroe.universo] || 0) + 1;
        return acumulador;
    }, {} as Record<string, number>);

    // Si no hay héroes todavía, no mostramos nada
    if (heroes.length === 0) {
        DOM.resumenUniversos.innerHTML = '';
        return;
    }

    // Object.entries() convierte el objeto conteo en un arreglo de pares
    // [universo, cantidad], que después recorremos con .map() para
    // armar una "pastillita" de texto por cada universo.
    const items = Object.entries(conteo)
        .map(([universo, cantidad]) => `<span class="universo-chip">${universo}: ${cantidad}</span>`)
        .join('');

    DOM.resumenUniversos.innerHTML = `
        <span class="resumen-titulo">Héroes por universo:</span>
        ${items}
    `;
}


// ================================================================
// PASO 7.1: FILTRAR LA LISTA SEGÚN LA OPCIÓN ELEGIDA
// ================================================================
// Explicar: esta función NO modifica el arreglo "heroes" original.
// .filter() siempre devuelve un arreglo NUEVO con los elementos que
// cumplen la condición, dejando intacto el arreglo de partida.

function obtenerHeroesFiltrados(): Heroe[] {
    const filtro = DOM.selectFiltro.value;

    if (filtro === 'todos') {
        return heroes;
    }

    if (filtro === 'favoritos') {
        return heroes.filter(heroe => heroe.esFavorito);
    }

    // Cualquier otro valor del select es un universo puntual
    return heroes.filter(heroe => heroe.universo === filtro);
}

// ================================================================
// PASO 7: RENDERIZAR (DIBUJAR) LA LISTA DE HÉROES
// ================================================================
// Explicar: "renderizar" significa tomar los datos (el arreglo heroes)
// y convertirlos en HTML real dentro de la página. Esta función se
// vuelve a llamar CADA VEZ que el arreglo heroes cambia.

function renderizarHeroes(): void {
    // Punto 13 - Generamos el arreglo filtrado ANTES de decidir qué
    // dibujar. A partir de acá usamos "heroesFiltrados" para todo lo
    // que se ve en pantalla, y seguimos usando "heroes" (el arreglo
    // completo) para el contador total y las validaciones.
    const heroesFiltrados = obtenerHeroesFiltrados();

    // Caso 1: no hay héroes en el arreglo completo, dejamos el contenedor vacío
    if (heroes.length === 0) {
        DOM.listaHeroes.innerHTML = '';
        toggleEmptyState();
        actualizarContador();
        actualizarEstado();
        actualizarResumenUniversos();
        return;
    }

    // Caso 1.1: SÍ hay héroes reclutados, pero el filtro elegido no
    // encuentra ninguno (ej: filtrar "Solo favoritos" sin favoritos aún)
    if (heroesFiltrados.length === 0) {
        DOM.listaHeroes.innerHTML = '';
        DOM.emptyState.classList.remove('hidden');
        const mensajeVacio = DOM.emptyState.querySelector('p');
        if (mensajeVacio) mensajeVacio.textContent = 'Sin resultados para este filtro';
        actualizarContador();
        actualizarEstado();
        actualizarResumenUniversos();
        return;
    }

    // Caso 2: hay héroes que mostrar, ocultamos el mensaje de "vacío"
    toggleEmptyState();
    const mensajeDefault = DOM.emptyState.querySelector('p');
    if (mensajeDefault) mensajeDefault.textContent = 'Nuevo día, nuevos héroes';

    // Explicar: .map() recorre el arreglo FILTRADO y convierte CADA
    // héroe en un string de HTML. Luego .join('') une todos esos
    // strings en uno solo. El atributo data-id guarda el id del héroe
    // dentro del propio HTML, para poder identificarlo después.
    DOM.listaHeroes.innerHTML = heroesFiltrados.map(heroe => `
        <div class="hero-card" data-id="${heroe.id}">
            <div class="hero-info">
                <span class="hero-name">${heroe.nombre}</span>
                <span class="hero-universe">
                    Origen: <span class="dimension-badge">${heroe.universo}</span>
                </span>
            </div>
            <button class="btn-favorito" data-id="${heroe.id}">
                ${heroe.esFavorito ? 'Quitar de favoritos' : 'Marcar como favorito'}
            </button>
            <button class="btn-eliminar" data-id="${heroe.id}">
                Expulsar
            </button>
        </div>
    `).join('');

    // Punto 11 (bonus visual) - Recorremos los héroes FILTRADOS (los
    // únicos que están dibujados en pantalla) y usamos
    // classList.toggle('favorito', condicion) sobre su tarjeta.
    heroesFiltrados.forEach(heroe => {
        const card = DOM.listaHeroes.querySelector(`.hero-card[data-id="${heroe.id}"]`);
        if (card) {
            card.classList.toggle('favorito', heroe.esFavorito);
        }
    });
    actualizarContador();
    actualizarEstado();
    actualizarLimiteHeroes(); // Actualiza el mensaje del límite de héroes
    actualizarResumenUniversos(); // Bloque 5 (Opción C)

    // IMPORTANTE: los botones "Expulsar" que acabamos de crear con
    // innerHTML NO tienen todavía ningún addEventListener propio.
    // Por eso usamos DELEGACIÓN DE EVENTOS (ver setupEliminarHeroes).
}


// ================================================================
// PASO 8: DELEGACIÓN DE EVENTOS PARA LOS BOTONES "EXPULSAR"
// ================================================================
// Explicar: en vez de poner un addEventListener en CADA botón nuevo
// (que además se borran y se vuelven a crear todo el tiempo), ponemos
// UN SOLO listener en el contenedor padre (listaHeroes). Cuando se hace
// clic en cualquier parte adentro, revisamos si el clic fue sobre un
// botón "Expulsar" usando closest().

function setupEliminarHeroes(): void {
    DOM.listaHeroes.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        // closest() busca hacia "arriba" en el HTML hasta encontrar
        // un elemento con la clase .btn-eliminar (o devuelve null si no hay)
        const btnEliminar = target.closest('.btn-eliminar');

        if (btnEliminar) {
            const id = parseInt(btnEliminar.getAttribute('data-id') || '0');
            if (id > 0) {
                eliminarHeroe(id);
            }
        }

        // Punto 10 - misma lógica de delegación, pero para el botón
        // de favorito: revisamos si el clic fue sobre .btn-favorito.
        const btnFavorito = target.closest('.btn-favorito');

        if (btnFavorito) {
            const id = parseInt(btnFavorito.getAttribute('data-id') || '0');
            if (id > 0) {
                toggleFavorito(id);
            }
        }
    });
}


// ================================================================
// PASO 9: ELIMINAR UN HÉROE POR SU ID
// ================================================================
// Explicar: find() busca UN elemento que cumpla la condición (para
// poder mostrar su nombre en el mensaje). filter() crea un arreglo
// NUEVO con todos los héroes MENOS el que tiene ese id.

function eliminarHeroe(id: number): void {
    const heroeEliminado = heroes.find(h => h.id === id);

    heroes = heroes.filter(heroe => heroe.id !== id);

    renderizarHeroes();

    if (heroeEliminado) {
        actualizarEstado(`${heroeEliminado.nombre} ha sido expulsado del Spider-Verse`);
    }
}

// ================================================================
// PASO 9.1: MARCAR / DESMARCAR UN HÉROE COMO FAVORITO
// ================================================================
// Explicar: buscamos el héroe por su id con .find() y, si lo
// encontramos, invertimos su propiedad esFavorito con el operador "!"
// (si era true pasa a false, y viceversa). Después volvemos a
// renderizar para que el botón y la tarjeta reflejen el nuevo estado.

function toggleFavorito(id: number): void {
    const heroe = heroes.find(h => h.id === id);
    if (heroe) {
        heroe.esFavorito = !heroe.esFavorito;
        renderizarHeroes();
        const mensaje = heroe.esFavorito
            ? `${heroe.nombre} fue marcado como favorito`
            : `${heroe.nombre} fue quitado de favoritos`;
        actualizarEstado(mensaje);
    }
}


// ================================================================
// PASO 9.2: ORDENAR LOS HÉROES ALFABÉTICAMENTE POR NOMBRE
// ================================================================
// Explicar: .sort() reordena el arreglo "en el lugar" (modifica
// "heroes" directamente, a diferencia de .filter()). localeCompare()
// compara texto respetando tildes y mayúsculas correctamente.

function ordenarAlfabeticamente(): void {
    heroes.sort((a, b) => a.nombre.localeCompare(b.nombre));
    renderizarHeroes();
    actualizarEstado('Equipo ordenado alfabéticamente por nombre');
}


// ================================================================
// PASO 10: AGREGAR UN NUEVO HÉROE
// ================================================================
// Explicar: esta es la función principal del formulario. Primero VALIDA
// que el nombre no esté vacío; si está vacío, avisa y se detiene con
// "return" (no sigue ejecutando el resto de la función).

function agregarHeroe(): void {
    const nombre = DOM.txtNombre.value.trim();
    const universo = DOM.selectUniverso.value;

    // Punto 6 - Límite de héroes: validación "de respaldo" por si el botón
    // btnAgregar se llegara a habilitar igual (ej. manipulando el HTML
    // desde la consola). El disabled del botón evita el caso normal, pero
    // esta validación evita que el arreglo supere el máximo de todas formas.
    if (heroes.length >= MAX_HEROES) {
        actualizarEstado(`No se pueden reclutar más de ${MAX_HEROES} héroes. Expulsa a alguno primero`);
        return;
    }

    // Validación: si el campo nombre está vacío, mostramos aviso y salimos
    if (nombre === '') {
        actualizarEstado('Ingresa un alias o nombre para el héroe');
        DOM.txtNombre.focus();

        // Efecto visual temporal: el borde se pone rojo 2 segundos
        DOM.txtNombre.style.borderColor = 'var(--spider-red)';
        setTimeout(() => {
            DOM.txtNombre.style.borderColor = '';
        }, 2000);

        return;
    }

    // Punto 5 - Límite de caracteres: definimos una constante para el
    // máximo de caracteres permitidos en el nombre del héroe. Esto hace
    // que sea fácil cambiar el límite en un solo lugar si se desea
    // modificarlo en el futuro.
    const MAX_CARACTERES = 20;
    // Límite de caracteres: elegimos MOSTRAR UN ERROR en vez de
    // cortar el string automáticamente. Justificación: si recortáramos el
    // nombre sin avisar, el usuario podría terminar con un alias distinto
    // al que escribió (ej. "Miles Morales Spider-Man" -> "Miles Morales Spi")
    // sin darse cuenta. Es más claro avisarle y dejar que él decida cómo
    // acortarlo.
    if (nombre.length > MAX_CARACTERES) {
        actualizarEstado(`El nombre no puede superar los ${MAX_CARACTERES} caracteres (tiene ${nombre.length})`);
        DOM.txtNombre.focus();

        DOM.txtNombre.style.borderColor = 'var(--spider-red)';
        setTimeout(() => {
            DOM.txtNombre.style.borderColor = '';
        }, 2000);

        return;
    }

    // Validación: si ya existe un héroe con ese nombre (ignorando mayúsculas/minúsculas)
    const yaExiste = heroes.some(h => h.nombre.toLowerCase() === nombre.toLowerCase());

    if (yaExiste) {
        actualizarEstado(`Ya existe un héroe llamado "${nombre}" en el equipo`);
        DOM.txtNombre.focus();

        DOM.txtNombre.style.borderColor = 'var(--spider-red)';
        setTimeout(() => {
            DOM.txtNombre.style.borderColor = '';
        }, 2000);

        return;
    }

    // Creamos el objeto héroe siguiendo la interfaz definida en el Paso 1
    const nuevoHeroe: Heroe = {
        id: idCounter++,   // usamos el contador y LUEGO lo incrementamos
        nombre: nombre,
        universo: universo,
        esFavorito: false // Inicialmente no es favorito
    };

    heroes.push(nuevoHeroe);

    DOM.txtNombre.value = '';
    DOM.txtNombre.focus();

    renderizarHeroes();

    actualizarEstado(`${nombre} ha sido reclutado en el Spider-Verse`);
}


// ================================================================
// PASO 11: LIMPIAR LOS CAMPOS DEL FORMULARIO
// ================================================================
// Explicar: esta función NO toca el arreglo heroes, solo resetea
// lo que el usuario ve en el formulario (sin agregar ni eliminar nada).

function limpiarCampos(): void {
    DOM.txtNombre.value = '';
    DOM.selectUniverso.selectedIndex = 0;
    DOM.txtNombre.focus();
    console.log('Fecha y hora actual:', new Date());
    actualizarEstado('Campos limpiados. Listo para nuevo recluta');
}


// ================================================================
// PASO 12: INICIALIZACIÓN — CONECTAR TODOS LOS EVENTOS
// ================================================================
// Explicar: esta función es la que "arma" toda la aplicación,
// conectando cada botón/input con la función que le corresponde.
// Se ejecuta una sola vez, cuando la página termina de cargar.

function init(): void {
    console.log(`Iniciando sistema de reclutamiento Spider-Verse...`);
    //Horario actual
     console.log('Fecha y hora actual:', new Date());


    // Clic en "Reclutar"
    DOM.btnAgregar.addEventListener('click', agregarHeroe);

    // Clic en "Limpiar"
    DOM.btnLimpiar.addEventListener('click', limpiarCampos);

    // Permitir reclutar presionando la tecla Enter dentro del input
    DOM.txtNombre.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // evita comportamiento por defecto del navegador
            agregarHeroe();
        }
    });

    // Activar la delegación de eventos para los botones "Expulsar"
    setupEliminarHeroes();

    // Punto 13 - Evento "change" en el select de filtro. Usamos "change"
    // y NO "click" porque "change" se dispara solo cuando el VALOR
    // seleccionado realmente cambió, no con cualquier clic sobre el select.
    DOM.selectFiltro.addEventListener('change', renderizarHeroes);

    // Punto 14 - Clic en "Ordenar alfabéticamente"
    DOM.btnOrdenar.addEventListener('click', ordenarAlfabeticamente);

    // Estado inicial de la página al cargar (sin héroes todavía)
    actualizarEstado();
    toggleEmptyState();

    console.log(`Sistema Spider-Verse listo para reclutar héroes multiversales`);
    console.log(`${DOM.selectUniverso.options.length} universos disponibles para reclutamiento`);
}


// ================================================================
// PASO 13: PUNTO DE ENTRADA DEL PROGRAMA
// ================================================================
// Explicar: 'DOMContentLoaded' es un evento del navegador que se
// dispara cuando TODO el HTML ya terminó de cargar. Es importante
// esperar a este evento, porque si init() se ejecutara antes, los
// document.getElementById(...) del Paso 2 devolverían null
// (el HTML todavía no existiría).

document.addEventListener('DOMContentLoaded', init);