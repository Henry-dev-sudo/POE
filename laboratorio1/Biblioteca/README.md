# Biblioteca UNIVO

Sistema de gestión de préstamos y catálogo de libros desarrollado con TypeScript, HTML y CSS.

## Requisitos

- Node.js y npm instalados.
- Un navegador web moderno.

## Instalación

1. Abre una terminal en la carpeta del proyecto:

```bash
cd examen-practico-biblioteca
```

2. Instala las dependencias:

```bash
npm install
```

## Compilar el proyecto

Convierte el código TypeScript de `app.ts` en JavaScript:

```bash
npm run build
```

Este comando genera o actualiza el archivo `app.js`.

## Ejecutar el programa

Después de compilar, abre el archivo `index.html` en un navegador web.

También puedes abrir la carpeta del proyecto en Visual Studio Code y utilizar una extensión como **Live Server** para iniciar la página.

## Modo desarrollo

Para recompilar automáticamente cada vez que guardes cambios en `app.ts`, ejecuta:

```bash
npm run dev
```

Mantén este comando activo y abre `index.html` en el navegador. Si usas Live Server, la página se actualizará al guardar los cambios.

## Funcionalidades

- Agregar libros al catálogo.
- Consultar la cantidad total y los ejemplares disponibles.
- Filtrar libros por categoría.
- Ordenar el catálogo por título o autor.
- Mostrar únicamente los libros disponibles.
- Registrar préstamos y devoluciones desde el catálogo.
