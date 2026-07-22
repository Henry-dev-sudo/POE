//funcion
const calcularPrecio = (precioBase: number, tipo: string, codigo?: string): number => {
    let precioFinal = precioBase;
    if (tipo === "VIP") {
        precioFinal += 20; 
    }
    if (codigo === "Estudiante") {
        precioFinal = (precioFinal * 50) / 100; 
    }
    return precioFinal; 
}

console.log("Precio final para VIP con código de estudiante: ", calcularPrecio(100, "VIP", "Estudiante"));
console.log("Precio final para VIP sin código: ", calcularPrecio(100, "VIP"));
console.log("Precio final para Regular con código de estudiante: ", calcularPrecio(100, "Regular", "Estudiante"));
console.log("Precio final para Regular sin código: ", calcularPrecio(100, "Regular"));
