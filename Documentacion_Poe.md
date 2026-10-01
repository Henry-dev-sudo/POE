# Documentación general del workspace POE

## 1. Introducción

Este repositorio reúne ejercicios y proyectos académicos relacionados con TypeScript, JavaScript, manipulación del DOM, programación orientada a eventos, React y Next.js.

Cada carpeta representa una práctica o proyecto independiente. No existe un único programa que conecte todo el repositorio: cada actividad tiene sus propios archivos fuente, configuración y forma de ejecución.

La mayoría de los ejercicios utiliza TypeScript como lenguaje de origen. Cuando aparece un archivo `.js` junto a un `.ts`, normalmente el JavaScript es la versión compilada que consume el navegador.

## 2. Estructura general

```text
POE/
├── clases/
│   └── computoOne/
│       ├── index.ts
│       ├── clase4.ts
│       ├── clase7/
│       ├── modificacion/
│       └── semana 9/taskapp/
├── examen-practico-biblioteca/
├── laboratorio1/
│   └── Biblioteca/
├── practicas/
│   ├── practica3/
│   ├── practica5/
│   └── practica6/practica6/
├── Tareas/
│   └── src/
│       ├── Tarea1/
│       └── Tarea2/
├── .gitignore
└── Documentacion_Poe.md
```

## 3. Requisitos generales

Para trabajar con los ejercicios se recomienda tener instalado:

- Node.js y npm.
- TypeScript, disponible mediante `npx` o como dependencia local.
- Un navegador web.
- Visual Studio Code.
- Una extensión como Live Server para abrir las aplicaciones que usan HTML y JavaScript.

Los comandos deben ejecutarse desde la carpeta del proyecto correspondiente, no necesariamente desde la raíz `POE`.

## 4. Carpeta `clases`

Contiene ejercicios vistos durante las clases. Tiene su propio `package.json` y `tsconfig.json`.

### 4.1. `clases/computoOne/index.ts`

Es una introducción a las estructuras básicas de TypeScript.

Conceptos principales:

- Arreglos de cadenas de texto.
- Recorrido de arreglos con `forEach`.
- Unión de elementos con `join`.
- Funciones con parámetros tipados.
- Alias de tipos mediante `type`.
- Propiedades opcionales usando `?`.
- Creación de objetos que cumplen un tipo definido.

El ejemplo activo crea un objeto de tipo alumno y muestra sus datos. También hay fragmentos comentados que funcionan como material de clase para observar distintas formas de tipar información.

### 4.2. `clases/computoOne/clase4.ts`

Presenta operaciones frecuentes sobre arreglos y objetos.

Se estudian los siguientes recursos:

- `map` para transformar precios y aplicar IVA.
- `forEach` para recorrer y mostrar información.
- `filter` para conservar precios mayores a un límite.
- Desestructuración de objetos.
- Tuplas para representar una cantidad fija de valores con tipos conocidos.

La parte activa utiliza una tupla de coordenadas formada por latitud y longitud.

### 4.3. `clases/computoOne/clase7`

Es una aplicación web sencilla para registrar estudiantes.

Archivos principales:

- `index.html`: estructura visual, campo de nombre, botón, mensaje y lista.
- `script.ts`: código fuente TypeScript.
- `script.js`: JavaScript que carga el navegador.
- `style.css`: estilos de la interfaz.

Funcionamiento:

1. El usuario escribe un nombre.
2. Pulsa el botón de registro.
3. El programa valida que el campo no esté vacío.
4. Se crea un elemento de lista.
5. La lista se agrega dinámicamente al documento.
6. El campo recupera el foco para facilitar nuevos registros.

Conceptos demostrados:

- `document.getElementById`.
- Conversión de elementos del DOM con `as HTMLInputElement` y tipos similares.
- Eventos `click`.
- Creación de nodos con `document.createElement`.
- Actualización del contenido de una página desde TypeScript.

Para actualizar el JavaScript después de modificar TypeScript, se debe compilar `script.ts` y después abrir `index.html` con un navegador o Live Server.

### 4.4. `clases/computoOne/modificacion`

Es una versión ampliada de la práctica anterior. La temática es un equipo de héroes y la interfaz está inspirada en cómics.

Archivos principales:

- `index.html`: formulario, filtros, botones, estadísticas y contenedor de tarjetas.
- `script1.ts`: fuente TypeScript y lógica principal.
- `script1.js`: archivo que consume el HTML.
- `style.css`: diseño responsive, tarjetas, colores y animaciones.

Funcionalidades:

- Registrar héroes con nombre y universo.
- Limitar el equipo a seis héroes.
- Rechazar nombres vacíos o de más de 20 caracteres.
- Evitar nombres repetidos sin diferenciar mayúsculas y minúsculas.
- Marcar y desmarcar favoritos.
- Filtrar por universo o por favoritos.
- Ordenar alfabéticamente.
- Eliminar héroes mediante delegación de eventos.
- Mostrar un estado vacío cuando no hay resultados.
- Mostrar un resumen agrupado por universo.
- Registrar un héroe pulsando la tecla Enter.

Conceptos de TypeScript y JavaScript:

- Interfaces, especialmente la interfaz `Heroe`.
- Arreglos tipados.
- `find`, `filter`, `some`, `map`, `reduce` y `sort`.
- `Record<string, number>` para contadores.
- `data-id` para relacionar una tarjeta HTML con un objeto.
- `closest` y delegación de eventos.
- Renderizado dinámico con `innerHTML`.
- Eventos `click`, `change`, `keydown` y `DOMContentLoaded`.
- Administración de un estado global sencillo y sincronización con la interfaz.

El HTML carga `script1.js`, por lo que `script1.ts` debe compilarse antes de ver cambios hechos en la fuente.

### 4.5. `clases/computoOne/semana 9/taskapp`

Es una aplicación independiente construida con Next.js, React, TypeScript y Tailwind CSS.

Rutas disponibles:

- `/`: página inicial con el título de la aplicación.
- `/tasks`: página de tareas, actualmente principalmente estática.
- `/about`: página informativa.

Archivos importantes:

- `app/layout.tsx`: layout global, metadatos, fuentes y estructura común.
- `app/page.tsx`: página inicial.
- `app/tasks/page.tsx`: vista de tareas.
- `app/about/page.tsx`: vista acerca de.
- `app/components/Header.tsx`: componente de navegación.
- `app/globals.css`: estilos globales y variables.
- `package.json`: dependencias y scripts.
- `next.config.ts`: configuración de Next.js.
- `postcss.config.mjs`: configuración de PostCSS.

Conceptos demostrados:

- App Router de Next.js.
- Rutas basadas en carpetas.
- Componentes funcionales de React.
- Enlaces con `Link` de Next.js.
- Layouts compartidos.
- Metadatos de la aplicación.
- Fuentes mediante `next/font`.
- Tailwind CSS integrado mediante PostCSS.

Ejecución:

```powershell
cd "clases\computoOne\semana 9\taskapp"
npm install
npm run dev
```

Después se puede visitar `http://localhost:3000`.

La carpeta `footer` está preparada, pero no contiene una funcionalidad relevante documentable. Los archivos `AGENTS.md` y `CLAUDE.md` contienen instrucciones de desarrollo, no lógica funcional de la aplicación.

## 5. Carpeta `Tareas`

Contiene ejercicios de TypeScript ejecutados normalmente desde la consola. Tiene su propio `package.json` y `tsconfig.json`.

### 5.1. `Tareas/src/Tarea1`

#### `RegistroEventos.ts`

Modela asistentes a un evento mediante una interfaz.

- `nombre` y `carrera` son propiedades obligatorias.
- `correo` y `asiento` son propiedades opcionales.
- Se crean asistentes con distintos niveles de información.
- Las propiedades opcionales se muestran solo cuando existen.

El ejercicio enseña la diferencia entre datos requeridos y datos que pueden faltar.

#### `carritoDeCompras.ts`

Simula un carrito y calcula precios.

- Define productos mediante interfaces.
- Recorre los productos con `forEach`.
- Aplica descuentos opcionales.
- Usa el operador ternario.
- Formatea importes con `toFixed(2)`.

Observación didáctica: una validación basada directamente en el descuento puede considerar falso el valor `0`. Si se necesitara diferenciar entre “descuento inexistente” y “descuento del 0 %”, convendría comprobar explícitamente si el valor es `undefined`.

#### `EntradaU.ts`

Calcula el precio de una entrada aplicando condiciones de cliente.

- Utiliza funciones flecha.
- Acepta parámetros opcionales.
- Aplica un recargo para clientes VIP.
- Aplica un descuento para estudiantes.
- Combina condiciones mediante estructuras `if`.

La función aplica primero el recargo VIP y después el descuento estudiantil.

Ejecución aproximada desde la carpeta `Tarea1`:

```powershell
npx tsx RegistroEventos.ts
npx tsx carritoDeCompras.ts
npx tsx EntradaU.ts
```

### 5.2. `Tareas/src/Tarea2`

#### `ejercicio1.ts`

Trabaja con `map` sobre objetos de productos. Calcula un subtotal, modifica precios aplicando un 10 % y muestra el total resultante.

El ejemplo utiliza `map` principalmente para recorrer y modificar datos. En código de producción sería preferible devolver un nuevo arreglo sin mutar los objetos originales.

#### `ejercicio2.ts`

Utiliza `filter` para conservar productos cuyo precio es mayor que 50. El resultado es un nuevo arreglo con los objetos que cumplen la condición.

#### `ejercicio3.ts`

Explica la desestructuración de objetos simples y anidados. Extrae `tipo`, `coordenadas` y `usuario`, y después obtiene `x` e `y` de las coordenadas.

#### `ejercicio4.ts`

Define un `enum` de estados para representar tres situaciones:

- `ACTIVO`.
- `INACTIVO`.
- `SUSPENDIDO`.

Ejecución aproximada desde la carpeta `Tarea2`:

```powershell
npx tsx ejercicio1.ts
npx tsx ejercicio2.ts
npx tsx ejercicio3.ts
npx tsx ejercicio4.ts
```

## 6. Proyecto `laboratorio1/Biblioteca`

```
Este proyecto implementa una biblioteca de libros con registro de préstamos, devoluciones, favoritos, filtros y estadísticas. La interfaz es responsive y se basa en eventos para separar la lógica de negocio de la presentación visual.
```
### 6.1. Archivos principales

- `app.ts`: fuente TypeScript.
- `app.js`: versión JavaScript utilizada por el navegador.
- `index.html`: estructura de la aplicación.
- `styles.css`: estilos responsive.
- `package.json`: dependencias y scripts.
- `tsconfig.json`: configuración de TypeScript.
- `README.md`: instrucciones específicas del proyecto.

### 6.2. Funcionalidades

- Agregar libros al catálogo.
- Registrar préstamos.
- Registrar devoluciones.
- Marcar libros como favoritos.
- Filtrar por categoría.
- Mostrar solo libros disponibles.
- Ordenar por título o autor.
- Mostrar estadísticas del catálogo.
- Mostrar mensajes temporales de éxito, error o información.
- Cargar libros iniciales para trabajar con datos de ejemplo.

### 6.3. Organización interna

- `Categoria`: unión de literales que limita las categorías válidas.
- `Libro`: interfaz con identidad, título, autor, año, existencias, disponibilidad y favorito.
- `EventEmitter`: clase sencilla para registrar listeners y emitir eventos.
- `Biblioteca`: concentra el estado y las operaciones del dominio.
- `ConsolaNotificador`: escucha eventos y los muestra en la consola.
- `UIManager`: transforma el estado de la biblioteca en elementos visuales.
- `actualizarVista`: aplica filtros, ordenamiento y renderizado.

Esta separación permite distinguir la lógica de negocio, la comunicación por eventos y la presentación visual.

Ejecución:

```powershell
cd laboratorio1\Biblioteca
npm install
npm run build
```

Después se puede abrir `index.html` con un navegador o Live Server. También existe un modo de desarrollo indicado en el README del proyecto.


### 6.4. Imágenes del proyecto

```Referencia visual de la interfaz y del entorno de desarrollo````

- ![Vista de la biblioteca funcionando](laboratorio1/Captura%20de%20pantalla%202026-08-19%20213639.png): muestra el catálogo, las estadísticas, el formulario para agregar libros y los controles de filtrado.
- ![Entorno de desarrollo](laboratorio1/Captura%20de%20pantalla%202026-08-19%20214022.png): muestra los archivos del proyecto, el README y la compilación de TypeScript sin errores.

Las imágenes no son necesarias para ejecutar la aplicación; solo sirven como evidencia y apoyo visual de la interfaz y del proceso de desarrollo.

## 7. Carpeta `practicas`

Agrupa prácticas independientes centradas en eventos, optimización de entradas y React.

### 7.1. `practicas/practica3`

Implementa un ejemplo del patrón observador mediante un emisor de eventos.

Archivos:

- `src/app.ts`: código fuente.
- `index.html`: página que carga `dist/app.js`.
- `tsconfig.json`: indica `src` como raíz y `dist` como salida.
- `package.json`: configuración del proyecto.

Funcionamiento:

1. El usuario se registra desde la interfaz.
2. Se emite un evento de usuario registrado.
3. Un listener simula el envío de un correo de bienvenida.
4. Otro listener simula guardar el usuario en una base de datos.
5. Ambas reacciones quedan separadas de la acción que produjo el evento.

Conceptos:

- Interfaces.
- Clase `EventEmitter`.
- Suscripción mediante `on`.
- Emisión mediante `emit`.
- Varios listeners para un mismo evento.
- Manipulación del DOM.
- Generación de identificadores aleatorios.

Antes de abrir la página debe generarse la carpeta `dist`:

```powershell
cd practicas\practica3
npx tsc
```

Después se abre `index.html` con un servidor local.

### 7.2. `practicas/practica5`

Compara un evento de escritura normal con una función `debounce`.

Comportamiento:

- Muestra una respuesta inmediata mientras se escribe.
- Espera un segundo sin nuevas pulsaciones antes de mostrar la respuesta retardada.
- Cancela el temporizador anterior cuando llega una nueva entrada.

Conceptos:

- Evento `input`.
- `setTimeout` y `clearTimeout`.
- Closures.
- Funciones de orden superior.
- `ReturnType<typeof setTimeout>`.
- Tipado de eventos y elementos HTML.
- Actualización del DOM.

El HTML carga `dist/app.js`, por lo que se debe compilar primero:

```powershell
cd practicas\practica5
npx tsc
```

## 8. Relación entre las prácticas

- `clases/computoOne/index.ts` y `clase4.ts` presentan fundamentos de TypeScript.
- `clase7` conecta TypeScript con el DOM y los eventos del navegador.
- `modificacion` amplía esa idea con estado, filtros, ordenamiento y renderizado dinámico.
- `Tareas` practica tipos, interfaces, arreglos, funciones, desestructuración y enumeraciones.
- `practica3` separa una acción de las reacciones mediante eventos.
- `practica5` muestra cómo controlar la frecuencia de eventos de entrada.
- El examen de biblioteca reúne clases, estado, eventos, filtros y una interfaz completa.
- `taskapp` presenta rutas, layouts y componentes dentro de Next.js.

Estos proyectos son independientes. Modificar uno no debería cambiar el comportamiento de los demás, salvo que se compartan dependencias o configuraciones locales.

## 10. Flujo recomendado para estudiar

1. Comenzar con `clases/computoOne/index.ts` y `clase4.ts`.
2. Continuar con `Tareas/src/Tarea1` para practicar interfaces y funciones.
3. Revisar `Tareas/src/Tarea2` para dominar `map`, `filter`, desestructuración y `enum`.
4. Abrir `clase7` para observar la interacción con el DOM.
5. Estudiar `modificacion` para comprender una interfaz con estado y filtros.
6. Revisar `practica3` para entender el patrón de eventos.
7. Revisar `practica5` para entender `debounce`.
8. Analizar el examen de biblioteca como ejemplo más completo de TypeScript aplicado.
9. Finalizar con React y Next.js para comparar el DOM directo con los componentes y las rutas.

## 11. Observaciones de mantenimiento

- Los archivos `.ts` deben considerarse la fuente principal cuando existe un `.js` equivalente.
- Los directorios `dist`, `build` y `node_modules` son generados o instalados; no deben editarse manualmente.
- En `practica3` y `practica5`, `dist` debe generarse antes de abrir el HTML.
- Algunos `package.json` no contienen scripts completos; en esos casos se puede usar `npx tsc` o `npx tsx` directamente.
- `taskapp` y `practica6` tienen servidores de desarrollo propios y deben iniciarse desde sus carpetas.
- Las carpetas `.zid` no forman parte de los archivos que se subirán al repositorio.
- La documentación de reglas internas de agentes debe consultarse solo cuando se vaya a modificar el proyecto Next.js.
