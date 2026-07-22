interface Producto {
    nombre: string;
    precio: number;
    descuento?: number;
}

let productos: Producto[] = [
    { nombre: "Laptop", precio: 1500, descuento: 10 },
    { nombre: "Mouse", precio: 25 },
    { nombre: "Teclado", precio: 45, descuento: 0 },
];

productos.forEach((producto) => {
    const precioFinal = producto.descuento ? producto.precio * (1 - producto.descuento / 100) : producto.precio;
    console.log(`Producto: ${producto.nombre}, Precio Final: $${precioFinal.toFixed(2)}`);
} )