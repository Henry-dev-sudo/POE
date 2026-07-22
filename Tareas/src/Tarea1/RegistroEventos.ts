interface Asistente { 
    nombre: string;
    carrera: string;
    correo?: string;
    asiento?: number;
}

let Henry: Asistente = {
    nombre: "Henry",
    carrera: "Ingeniería de Software",
    correo: "henry@example.com",
    asiento: 12
}

let Damon: Asistente = {
    nombre: "Damon",
    carrera: "Ingeniería de Software",
}

function imprimirAsistente(asistente: Asistente) {
    let info = `Nombre: ${asistente.nombre}, Carrera: ${asistente.carrera}`;
    
    if (asistente.correo) {
        info += `, Correo: ${asistente.correo}`;
    }
    
    if (asistente.asiento) {
        info += `, Asiento: ${asistente.asiento}`;
    }
    
    console.log(info);
}

imprimirAsistente(Henry);
imprimirAsistente(Damon);