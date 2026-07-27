const evento = {
    tipo: "CLICK",
    coordenadas: { x: 100, y: 200 },
    usuario: "Henry"
};

const {tipo, coordenadas, usuario} = evento
console.log(`Tipo: ${tipo}`)
const {x, y} = coordenadas
console.log(`Coordenadas: \nX: ${x} Y: ${y}`)
console.log(`Usuario: ${usuario}`)