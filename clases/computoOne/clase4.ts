// //Lista para hacer modificados con .MAP 7 .FILTER

// let precioBase: number[] = [100, 200, 250, 80, 500];

// //Utilizando .map vamod a tomar cada elemento y lo vamos a modficar

// //IVA del 13% a cada precio base
// let preciosConIVA: number[] = precioBase.map((precio) => {
//     return precio * 1.13;
// })


// // console.log("Precio Base: ", precioBase);
// // console.log("Precio con IVA: ", preciosConIVA);

// //Utilizando .forEach para mostrar los precios
// precioBase.forEach((precio) => {
//     //console.log("Precio Base: ", precio);
//    // console.log("Precio con IVA: ", (precio * 1.13).toFixed(2));
//    //console.log("\n");
//    //console.log(`Precio Base: ${precioBase} | Precio con Iva: ${(precioConIVA * 1.23)}`)
//    //console.log(`Precio Base: ${precio} | Precio con Iva: ${(precio * 1.13).toFixed(2)}\n`)
// });

// //filtrar precios arriba de $200

// let preciosAltos: number[] = precioBase.filter((precio) => {
//     return precio > 200;
// })

// console.log("Precios Altos: ", preciosAltos);  

// type Usuario = {
//     experiencia: number;
//     username: string;
//     rol: string;
// }

// let desarrolador : Usuario = {
//     username: "Dean",
//     rol: "Frontend",
//     experiencia: 5
// }

// //Forma tradicional
// let nombre = desarrolador.username;
// let cargo = desarrolador.rol;

// console.log("Nombre: ", nombre + "," + "Rol: ", cargo);

// //destructuracion de objetos
// const { username, rol } = desarrolador;
// console.log("Nombre: ", username + ", " + "Rol: ", rol);

let coord: [number, number] = [446.45, -87.56];

const[latitud, longitud] = coord;
console.log("Latitud: ", coord[0], "Longitud: ", coord[1]);  