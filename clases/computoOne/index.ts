
// // arreglos
// let materias: string[] = ["POE", "ASW", "Estructura de Datos", "POO"];
// console.log("Materias: ", materias);
// materias.forEach((materia) => {
//     console.log("Materia: ", materia);
// });

// console.log(materias.join (", "));


// //funciones
// // function operacionesBasicas (a: number, b: number): void {
// //     console.log("Suma: ", a + b);
// //     console.log("Resta: ", a - b);
// //     console.log("Multiplicacion: ", a * b);
// //     console.log("Division: ", a / b);
// // }   

// // operacionesBasicas(10, 5);


//modelado o plantillas / creacion de objetos

type Alumno = {
    nombre: string;
    edad: number;
    activos: boolean;
    telefono?: string; //propiedad opcional
}

// let newAlumno: Alumno = {
//     nombre: "Dean",
//     edad: 24,
//     activos: true,
//     telefono: "123-456-7890"
// }

// console.log("Alumno: ", newAlumno);

// console.log("Su Nombre es: ", newAlumno.nombre);
// console.log("La edad es: ", newAlumno.edad);
// console.log("esta Activo: ", newAlumno.activos); 

let newAlumno2: Alumno = {
    nombre: "Sam",
    edad: 22,
    activos: false,
    telefono: "987-654-3210"
}

console.log("Alumno: ", newAlumno2);
console.log("Su Nombre es: ", newAlumno2.nombre);
console.log("La edad es: ", newAlumno2.edad);
console.log("esta Activo: ", newAlumno2.activos); 
console.log("Telefono: ", newAlumno2.telefono);