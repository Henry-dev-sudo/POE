# Práctica de TypeScript: Tipado, Interfaces y Funciones

Este documento resume tres ejercicios trabajados en clase, cubriendo interfaces con campos opcionales, recorrido de arreglos y funciones con lógica condicional.

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

> Nota: no hace falta instalar `tsx` por separado, `npx` lo descarga automáticamente la primera vez que se ejecuta.

---

## Ejercicio 1: `RegistroEventos.ts`

**Tema:** interfaces con propiedades opcionales.

Se define una interfaz `Asistente` donde `nombre` y `carrera` son campos requeridos, pero `correo` y `asiento` llevan `?` y por lo tanto pueden omitirse. Al construir el string de salida, se usan validaciones `if` para incluir esos campos únicamente cuando el objeto realmente los trae, así se evita imprimir `undefined` en pantalla.

**Ejecución:**
```bash
npx tsx RegistroEventos.ts
```

---

## Ejercicio 2: `carritoDeCompras.ts`

**Tema:** arreglos tipados, `forEach` y operador ternario.

Se declara un arreglo `productos: Producto[]`, y con `forEach` se itera sobre cada elemento. El precio final se resuelve con una condición ternaria: cuando el producto tiene `descuento`, se calcula el precio reducido según ese porcentaje; en caso contrario se deja el precio original. El método `toFixed(2)` se aplica al final para mostrar siempre dos decimales, formato típico de un valor monetario.

**Ejecución:**
```bash
npx tsx carritoDeCompras.ts
```

---

## Ejercicio 3: `EntradaU.ts`

**Tema:** arrow function, parámetro opcional y condicionales encadenadas.

`calcularPrecio` está escrita como función flecha y recibe `precioBase` y `tipo` como parámetros obligatorios, más `codigo` como opcional. Primero se evalúa si `tipo` corresponde a `"VIP"`, sumando un recargo de $20. Después, si `codigo` es `"Estudiante"`, el precio acumulado hasta ese punto se reduce a la mitad. El valor resultante se retorna con `return`.

**Ejecución:**
```bash
npx tsx EntradaU.ts
```

---

## Cierre

Los tres ejercicios giran en torno a conceptos similares de TypeScript vistos desde ángulos distintos: `interface` y `?` para modelar datos que no siempre están completos, y estructuras condicionales (`if`, ternarios) para tomar decisiones dentro de la lógica sin depender de bloques extensos.