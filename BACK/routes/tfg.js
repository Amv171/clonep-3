const express = require("express");
const router = express.Router();

//Importo las funciones del controlador de usuario
const { getItems, createItem} = require('../controllers/tfg');

//Importo la funcion de validacion de usuario
const {validatorCreateItem} = require('../validators/TFG');

//Importo la función para sacar la sesion
const {authMiddleware, checkRol} = require('../middleware/session');


//Ruta para obtener todos los tfg
router.get("/getTFGs", getItems);

//Ruta para crear un nuevo tfg
router.post("/createTFG",authMiddleware,checkRol(["admin"]),validatorCreateItem,createItem);



//Exporto el router de auth
module.exports = router