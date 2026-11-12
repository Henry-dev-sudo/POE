// Punto de entrada: crea las piezas del MVC y las conecta

import { ContactoView } from "./views/ContactoView.js";
import { ContactoController } from "./controllers/ContactoController.js";
import { ContactoModel } from "./models/ContactoModel.js";
import { StorageService } from "./services/StorageService.js";

const storage = new StorageService();
const modelo = new ContactoModel(storage);
const vista = new ContactoView();
const controlador = new ContactoController(vista, modelo);

controlador.iniciar();