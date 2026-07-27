const Productos = [
    { nombre: "Laptop", precio: 800 },
    { nombre: "Mouse", precio: 25 },
    { nombre: "Teclado", precio: 60 },
    { nombre: "Monitor", precio: 200 },
    { nombre: "USB", precio: 15 }
];

const filter = Productos.filter((producto) => producto.precio > 50)
console.log(filter)