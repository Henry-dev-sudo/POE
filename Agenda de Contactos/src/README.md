# Agenda de Contactos

Aplicación web para registrar y administrar contactos telefónicos. Permite crear,
consultar, editar y eliminar contactos, y conserva la información en el
`localStorage` del navegador.

El proyecto está desarrollado con **TypeScript** y está organizado con el patrón
**MVC** (Model-View-Controller). La aplicación no necesita una base de datos ni un
servidor backend: cada navegador guarda su propia agenda.

## Funcionalidades

- Registrar contactos con nombre, teléfono y correo electrónico.
- Validar los datos antes de guardarlos.
- Formatear el teléfono automáticamente mientras se escribe.
- Buscar en tiempo real por nombre o por teléfono.
- Mostrar los contactos en tarjetas.
- Editar un contacto conservando su identificador original.
- Eliminar contactos después de pedir confirmación.
- Evitar que dos contactos tengan el mismo teléfono.
- Guardar los datos en `localStorage` para conservarlos al recargar o cerrar la página.

## Cómo ejecutar el proyecto

Desde la carpeta `Lab 2`, ejecutar una sola vez:

```bash
npm install
```

Después, para compilar TypeScript y abrir un servidor local:

```bash
npm start
```

El comando genera los archivos JavaScript dentro de `dist/` y ejecuta `serve`.
La terminal mostrará una dirección similar a `http://localhost:3000`.

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Compila el proyecto y levanta un servidor local. |
| `npm run build` | Ejecuta el compilador de TypeScript y genera `dist/`. |
| `npm run watch` | Compila automáticamente cada vez que se guarda un archivo `.ts`. |

Durante el desarrollo se puede ejecutar `npm run watch` en una terminal y usar
un servidor local en otra. El navegador debe abrirse mediante un servidor porque
`index.html` carga `dist/main.js` como módulo ES.

## Estructura del proyecto

```text
Lab 2/
├── Index.html
├── package.json
├── tsconfig.json
├── src/
│   ├── main.ts
│   ├── models/
│   │   └── Contacto.ts
│   ├── views/
│   │   └── ContactoView.ts
│   ├── controllers/
│   │   └── ContactoController.ts
│   ├── services/
│   │   └── StorageService.ts
│   ├── styles/
│   │   └── styles.css
│   └── README.md
└── dist/                 # Se genera al ejecutar npm run build
      └── ...
```

## Qué hace cada archivo

### `Index.html`

Es la estructura inicial de la página. Contiene:

- El encabezado con el título de la agenda.
- El formulario con los campos `nombre`, `telefono` y `email`.
- El botón **Guardar**, que también cambia a **Actualizar** durante una edición.
- El botón **Cancelar**, oculto mientras se crea un contacto nuevo.
- El elemento `mensaje`, donde aparecen errores o confirmaciones.
- El campo `buscar`, utilizado para filtrar la lista.
- El elemento `contador`, que muestra cuántos contactos se están mostrando.
- El contenedor `lista`, donde TypeScript crea las tarjetas.

El atributo `novalidate` del formulario permite que las validaciones sean
controladas por el modelo en lugar de depender de los mensajes automáticos del
navegador. Al final se carga `dist/main.js`, que es el JavaScript generado por
TypeScript.

### `package.json`

Define la información del proyecto, la dependencia de desarrollo de TypeScript y
los comandos disponibles. El script `start` encadena la compilación (`tsc`) con
el servidor estático `serve`.

#### Cambios y agregados

- Se define el nombre, la versión y la descripción de la agenda de contactos.
- Se agrega TypeScript como dependencia de desarrollo para compilar los archivos
  `.ts`.
- Se agregan los scripts `build`, `watch` y `start` para compilar, recompilar
  automáticamente y ejecutar la aplicación en un servidor local.

### `tsconfig.json`

Configura cómo TypeScript transforma los archivos `.ts` en `.js`, dónde coloca la
salida compilada y qué reglas utiliza el compilador. Gracias a esta configuración,
el navegador termina ejecutando los archivos de `dist/` y no los archivos fuente.

#### Cambios y agregados

- Se establece `ES2020` como versión de JavaScript y como módulo de salida.
- Se configura `moduleResolution: "bundler"` para resolver los módulos del
  proyecto.
- Se agregan las bibliotecas `ES2020` y `DOM`, necesarias para usar características
  modernas de JavaScript y elementos del navegador.
- Se definen `src/` como carpeta de entrada (`rootDir`) y `dist/` como carpeta de
  salida (`outDir`).
- Se activa `strict` para aplicar comprobaciones de tipos más seguras y se agregan
  `esModuleInterop` y `skipLibCheck` para facilitar la compatibilidad y la
  compilación de las dependencias.
- Se limita la compilación a los archivos TypeScript ubicados dentro de `src/`.

## Arquitectura MVC

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| Modelo | `models/Contacto.ts` | Define la forma de un contacto y comprueba que sus datos sean válidos. |
| Vista | `views/ContactoView.ts` | Lee el formulario, escucha eventos y actualiza el DOM. |
| Controlador | `controllers/ContactoController.ts` | Coordina los eventos, aplica las reglas del CRUD y decide cuándo actualizar la vista. |
| Servicio | `services/StorageService.ts` | Traduce la lista de contactos a JSON y la guarda o recupera del navegador. |
| Entrada | `main.ts` | Crea las piezas anteriores, las conecta e inicia la aplicación. |

La vista no guarda datos y el servicio no modifica la interfaz. Esta separación
permite que cada parte tenga una responsabilidad concreta.

## Detalle del modelo: `Contacto.ts`

### Interfaz `IContacto`

Describe la forma mínima de un contacto:

- `id: number`: identificador único usado para editar o eliminar.
- `nombre: string`: nombre de la persona.
- `telefono: string`: número telefónico, conservado como texto para mantener el formato.
- `email: string`: correo electrónico.

### Clase `Contacto`

El constructor recibe los cuatro datos y aplica `trim()` al nombre, teléfono y
correo para quitar espacios al principio y al final.

### Método `validar()`

Devuelve un arreglo de mensajes. Si el arreglo queda vacío, el contacto es válido.
Comprueba lo siguiente:

1. El nombre debe tener al menos dos caracteres.
2. El teléfono solo puede contener el signo `+`, números, espacios y guiones.
3. El teléfono debe contener entre 8 y 12 dígitos numéricos. Para contar los
    dígitos se eliminan los espacios y guiones con una expresión regular.
4. El email debe seguir un formato básico como `nombre@correo.com`.

El modelo valida la información independientemente de cómo se haya escrito en el
formulario, por lo que funciona como última protección antes de guardar.

## Detalle de la vista: `ContactoView.ts`

La clase obtiene referencias a los elementos de `Index.html` y se encarga de
reflejar el estado de la aplicación en la pantalla.

### Formato y eventos

- `constructor()`: registra el evento `input` del teléfono.
- `formatearTelefono()`: elimina caracteres no numéricos y agrega un guion
   después del cuarto dígito. Por ejemplo, `77778888` se convierte en `7777-8888`.
- `enlazarGuardar()`: intercepta el envío del formulario, evita que la página se
   recargue y llama al controlador.
- `enlazarCancelar()`: conecta el botón cancelar con el controlador.
- `enlazarBuscar()`: envía al controlador el texto de búsqueda cada vez que cambia.
- `enlazarAcciones()`: usa un solo evento `click` en el contenedor de la lista para
   detectar los botones de editar y eliminar mediante `data-accion` y `data-id`.

### Métodos del formulario

- `obtenerDatosFormulario()`: devuelve los valores escritos por el usuario.
- `cargarFormulario(contacto)`: coloca los datos de un contacto en el formulario,
   cambia el título a **Editar contacto** y el botón a **Actualizar**.
- `limpiarFormulario()`: restablece los campos y vuelve al modo **Nuevo contacto**.

### Mensajes y tarjetas

- `mostrarErrores()`: presenta todos los errores juntos con estilo de error.
- `mostrarExito()`: presenta una confirmación después de guardar, actualizar o eliminar.
- `limpiarMensaje()`: quita el mensaje actual.
- `mostrarContactos()`: limpia la lista, actualiza el contador y crea una tarjeta
   por cada contacto. Si no hay resultados, muestra un mensaje indicando que la
   lista está vacía.
- `crearTarjeta()`: construye los elementos HTML de una tarjeta y agrega los
   botones de editar y eliminar. Usa `textContent`, por lo que los datos escritos
   por el usuario no se interpretan como HTML.

## Detalle del controlador: `ContactoController.ts`

El controlador mantiene el arreglo en memoria y una referencia a la vista y al
servicio. También conserva dos estados:

- `idEditando`: es `null` cuando se crea un contacto y contiene un número cuando
   se está editando uno existente.
- `textoBusqueda`: guarda el filtro actual para volver a aplicarlo después de cada cambio.

### Métodos principales

- `constructor()`: carga los contactos guardados mediante `StorageService`.
- `iniciar()`: conecta todos los eventos de la vista con sus métodos y dibuja la
   lista inicial.
- `guardarContacto()`: obtiene los datos, crea un objeto `Contacto`, ejecuta las
   validaciones, revisa teléfonos repetidos, agrega o reemplaza el contacto,
   guarda la lista y refresca la pantalla.
- `iniciarEdicion(id)`: busca el contacto por su identificador y carga sus datos
   en el formulario.
- `cancelarEdicion()`: abandona la edición, limpia el formulario y borra el mensaje.
- `eliminarContacto(id)`: busca el contacto, pide confirmación, lo elimina con
   `filter()`, persiste la nueva lista y actualiza la vista.
- `buscar(texto)`: guarda el texto escrito y solicita una nueva actualización de
   la lista.
- `actualizarLista()`: muestra todos los contactos cuando no hay búsqueda; si hay
   texto, conserva los contactos cuyo nombre o teléfono lo incluyan.

## Detalle del almacenamiento: `StorageService.ts`

El servicio utiliza la clave `agenda-contactos` dentro de `localStorage`.

- `guardar(contactos)`: convierte el arreglo a una cadena JSON con
   `JSON.stringify()` y lo guarda con `localStorage.setItem()`.
- `cargar()`: lee la cadena con `localStorage.getItem()`. Si no existe, devuelve
   un arreglo vacío. Si existe, la convierte con `JSON.parse()` y reconstruye cada
   elemento como una instancia de `Contacto`, para conservar el método `validar()`.
- Si el contenido guardado no es un JSON válido, `cargar()` captura el error,
   informa el problema en la consola y empieza con una lista vacía.

## Detalle de `main.ts`

Es el punto de entrada de la aplicación. No contiene reglas de negocio; solamente:

1. Crea una instancia de `ContactoView`.
2. Crea una instancia de `StorageService`.
3. Entrega ambas instancias a `ContactoController`.
4. Ejecuta `controlador.iniciar()` para conectar eventos y mostrar los datos guardados.

## Flujo de las operaciones

### Crear un contacto

1. El usuario completa el formulario y presiona **Guardar**.
2. La vista evita el envío tradicional del formulario y avisa al controlador.
3. El controlador obtiene los datos y crea un `Contacto` con un `id` basado en `Date.now()`.
4. El modelo ejecuta `validar()`.
5. El controlador comprueba que el teléfono no exista en otro contacto.
6. Si hay errores, la vista los muestra y no se guarda nada.
7. Si los datos son correctos, el contacto se agrega al arreglo.
8. El servicio guarda el arreglo en `localStorage` y la vista redibuja las tarjetas.

### Editar un contacto

1. El usuario presiona **Editar** en una tarjeta.
2. La vista envía el `id` del botón al controlador.
3. El controlador encuentra el contacto y la vista carga sus datos en el formulario.
4. El formulario cambia al modo de edición.
5. Al presionar **Actualizar**, se conserva el mismo `id` y se reemplaza el objeto.
6. Se repiten las validaciones, el guardado y la actualización de la lista.

### Eliminar un contacto

1. El usuario presiona **Eliminar**.
2. El controlador muestra una confirmación con el nombre del contacto.
3. Si se confirma, `filter()` crea una lista sin ese contacto.
4. La nueva lista se guarda y las tarjetas se vuelven a dibujar.
5. Si el contacto eliminado estaba en edición, también se cancela ese modo.

### Buscar contactos

La búsqueda ocurre en cada evento `input`. El texto se convierte a minúsculas y se
compara con el nombre y el teléfono. La lista original no se destruye: solo se
envía a la vista un arreglo filtrado para mostrar los resultados.

## Validaciones

| Campo | Regla |
|-------|-------|
| Nombre | Debe contener al menos 2 caracteres después de quitar espacios exteriores. |
| Teléfono | Debe contener únicamente caracteres permitidos y entre 8 y 12 dígitos. |
| Email | Debe tener una estructura básica `texto@dominio.extensión`. |
| Teléfono duplicado | No puede coincidir con el teléfono de otro contacto. |

El formato visual del teléfono se aplica en la vista, pero la validez definitiva se
comprueba en el modelo. Por eso también se aceptan teléfonos escritos con espacios,
guiones o un prefijo `+`, siempre que cumplan las reglas del modelo.

## Estilos: `styles.css`

La hoja de estilos se encarga exclusivamente de la presentación:

- Define colores, tipografías, espaciado y tamaños generales.
- Organiza el formulario y la lista en dos columnas en pantallas grandes.
- Cambia a una sola columna mediante `@media` cuando la pantalla mide menos de
   `760px`.
- Da formato a mensajes de error y éxito.
- Presenta cada contacto como una tarjeta con botones separados para editar y eliminar.
- Usa una cuadrícula adaptable para que las tarjetas ocupen el espacio disponible.

## Conceptos de TypeScript utilizados

- **Interfaces:** `IContacto` describe la estructura de los datos.
- **Clases:** separan modelo, vista, controlador y servicio.
- **Tipos explícitos:** se utilizan `string`, `number`, `string[]`, `Contacto[]` y `void`.
- **Tipos unión:** `number | null` representa los dos estados del modo de edición.
- **Modificador `private`:** limita el acceso a datos y métodos internos de cada clase.
- **Módulos:** `import` y `export` dividen el código en archivos reutilizables.
- **Genéricos del DOM:** `HTMLInputElement`, `HTMLFormElement` y `HTMLElement` indican
   qué tipo de elemento se está manipulando.
- **Métodos de arreglos:** `find`, `findIndex`, `filter`, `some` y `map` permiten
   buscar, actualizar, validar, eliminar y reconstruir contactos.