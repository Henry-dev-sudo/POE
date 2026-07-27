enum EstadoUsuario{
    activo = "ACTIVO",
    inactivo = "INACTIVO",
    suspendido = "SUSPENDIDO"
};

const usuario: EstadoUsuario = EstadoUsuario.activo
console.log(usuario)