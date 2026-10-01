interface UsuarioRegistrado {
    id: number;
    nombre: string;
    email: string;
}

type EventCallBack = (data:any)=> void;

class EventEmitter {
    private eventos:{[nombreEvento:string]: EventCallBack[]} = {};

    public on(nombreEvento:string, callback:EventCallBack):void {
        if(!this.eventos[nombreEvento]){
            this.eventos[nombreEvento] = [];
        }
        this.eventos[nombreEvento].push(callback);
    }

    public emit(nombreEvento:string, datos:any):void {
        const suscriptores = this.eventos[nombreEvento];

        if(suscriptores){
            suscriptores.forEach(callback => {
                callback(datos);
            });
        }
    }
}   

const sistemaNotificaciones = new EventEmitter();

function agregarLog(mensaje:string, color: string) {
    const ul=document.getElementById('logList') as HTMLUListElement;
    const li=document.createElement('li');
    li.style.color=color;
    li.textContent=mensaje;
    ul.appendChild(li);
}

sistemaNotificaciones.on('Nuevo Usuario', (usuario:UsuarioRegistrado) => {
    agregarLog(`Email de bienvenida a: ${usuario.email}`, '#222dc5')
});


sistemaNotificaciones.on('Nuevo Usuario', (usuario:UsuarioRegistrado) => {
    agregarLog(`Guardado en la DB al usuario ID: ${usuario.id}`, '#22c553')
});

const btnRegistrar = document.getElementById('btnRegistrar') as HTMLButtonElement;

btnRegistrar.addEventListener('click', () => {
    const nuevoUsuario: UsuarioRegistrado = {
        id: Math.floor(Math.random() * 1000),
        nombre : 'Red Jong',
        email : 'ejemplo@ejemplo.com'
    };

    agregarLog('Accion: Boton Click' , '#64748b');
    sistemaNotificaciones.emit('Nuevo Usuario', nuevoUsuario);
});