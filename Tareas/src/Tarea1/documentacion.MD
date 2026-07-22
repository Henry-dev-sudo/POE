Ejercicios prácticos de interfaces, funciones, condicionales y propiedades opcionales.

Instalación y configuración del entorno
powershell
# 1. Verificar que Node.js y npm estén instalados
node -v
npm -v

# 2. Instalar TypeScript como dependencia del proyecto
npm install --save-dev typescript

# 3. Generar el archivo de configuración
npx tsc --init

# 4. Instalar los tipos de Node (necesarios para usar TypeScript con Node.js)
npm install -D @types/node

# 5. Ejecutar cualquier archivo .ts directamente (compila y corre en un solo paso)
npx tsx nombre-del-archivo.ts

tsx se instala automáticamente la primera vez que se usa (npx lo descarga solo).

Ejercicio 1 — Registro de Asistentes

Objetivo: interfaces y propiedades opcionales.

La interfaz Asistente define nombre y carrera como obligatorios, mientras que correo y asiento son opcionales (?). La función imprimirAsistente usa if para agregar esos datos al mensaje solo si existen, evitando mostrar undefined.

Cómo correrlo: 

npx tsx RegistroEventos.ts

Ejercicio 2 — Carrito de Compras

Objetivo: arreglos, forEach y operador ternario.

productos es un arreglo de objetos Producto. forEach recorre cada uno y calcula el precio final con un ternario: si tiene descuento, se aplica el porcentaje sobre el precio; si no, el precio queda igual. .toFixed(2) asegura 2 decimales al mostrar el resultado.

Cómo correrlo:

npx tsx carritoDeCompras.ts

Ejercicio 3 — Calculadora de Entradas

Objetivo: función flecha, parámetro opcional y condicionales.

calcularPrecio es una función flecha que recibe precioBase y tipo obligatorios, y codigo opcional. Si tipo es "VIP", suma $20 al precio. Si codigo es "Estudiante", aplica un 50% de descuento sobre el precio ya calculado.

Cómo correrlo:

npx tsx EntradaU.ts

Conclusión:
Los tres ejercicios muestran cómo TypeScript ayuda a definir estructuras claras (interface), manejar datos que pueden faltar (?) y tomar decisiones de forma corta con condicionales y ternarios en lugar de bloques largos de if/else.