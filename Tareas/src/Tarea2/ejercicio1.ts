const Productos = [
    { nombre: "Laptop", precio: 800 },
    { nombre: "Mouse", precio: 25 },
    { nombre: "Teclado", precio: 60 }
];

Productos.map((producto) => {
    console.log(`Producto: ${producto.nombre}`)
    console.log(`Subtotal: $${producto.precio.toFixed(2)}`)
    producto.precio *= 0.90
    console.log(`Total: $${producto.precio.toFixed(2)}`)
});
