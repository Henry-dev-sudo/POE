# Práctica de TypeScript: Arreglos, Destructuring y Enums

Este documento resume cuatro ejercicios trabajados en clase, cubriendo métodos de arreglos (`map`, `filter`), destructuring de objetos anidados y enumeraciones (`enum`).

## Preparación del entorno

Pasos seguidos para dejar el proyecto listo en VS Code:

```powershell
# Confirmar versiones instaladas
node -v
npm -v

# Añadir TypeScript al proyecto
npm install --save-dev typescript

# Crear el tsconfig.json
npx tsc --init

# Añadir definiciones de tipos para Node
npm install -D @types/node

# Correr un archivo .ts sin compilar manualmente
npx tsx archivo.ts
```

---

## Ejercicio 1: `ejercicio1.ts`

**Tema:** `map` sobre un arreglo de objetos.

Se recorre el arreglo `Productos` con `map`, y por cada producto se imprime su nombre y el subtotal original. Luego el precio se modifica directamente (`producto.precio *= 0.90`), aplicando un 10% de descuento, y se imprime el total ya rebajado. `.toFixed(2)` mantiene el formato de dos decimales en cada valor mostrado.

**Ejecución:**
```bash
npx tsx .\ejercicio1.ts
```

---

## Ejercicio 2: `ejercicio2.ts`

**Tema:** `filter` sobre un arreglo de objetos.

`Productos.filter()` recorre el arreglo y devuelve solo los elementos cuyo `precio` es mayor a 50, guardando el resultado en una nueva constante `filter`. A diferencia de `map`, `filter` no transforma los elementos, únicamente decide cuáles se conservan según la condición indicada.

**Ejecución:**
```bash
npx tsx ejercicio2.ts
```

---

## Ejercicio 3: `ejercicio3.ts`

**Tema:** destructuring de objetos, incluyendo objetos anidados.

Del objeto `evento` se extraen directamente `tipo`, `coordenadas` y `usuario` mediante destructuring. Como `coordenadas` es a su vez un objeto, se vuelve a aplicar destructuring sobre él para obtener `x` e `y` por separado. Esto evita escribir `evento.tipo`, `evento.coordenadas.x`, etc., accediendo a los valores de forma más directa.

**Ejecución:**
```bash
npx tsx ejercicio3.ts
```

---

## Ejercicio 4: `ejercicio4.ts`

**Tema:** `enum`.

Se define un `enum EstadoUsuario` con tres valores posibles: `activo`, `inactivo` y `suspendido`, cada uno asociado a un string. La constante `usuario` se tipa como `EstadoUsuario` y se le asigna `EstadoUsuario.activo`. Los enums son útiles cuando una variable solo debe poder tomar un conjunto fijo y conocido de valores, evitando strings sueltos que puedan escribirse mal.

**Ejecución:**
```bash
npx tsx ejercicio4.ts
```

---

## Cierre

Estos cuatro ejercicios abordan herramientas distintas para trabajar con datos estructurados en TypeScript: transformación y filtrado de arreglos (`map`, `filter`), extracción rápida de valores anidados (destructuring), y restricción de valores posibles mediante `enum`.