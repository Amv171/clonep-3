const express = require("express");
const router = express.Router();

//Importo las funciones del controlador de usuario
const { getItems, getAllItems , createItem, validateTFG} = require('../controllers/tfg');

//Importo la funcion de validacion de usuario
const {validatorCreateItem, validatorValidateitem} = require('../validators/TFG');

//Importo la función para sacar la sesion
const {authMiddleware, checkRol} = require('../middleware/session');


//Ruta para obtener todos los tfg
router.get("/getTFGs", getItems);


//Ruta para obtener los tfg aprobados
router.get("/getAllTFGs",authMiddleware,checkRol(["admin"]),getAllItems);

//Ruta para crear un nuevo tfg
router.post("/createTFG",authMiddleware,checkRol(["admin"]),validatorCreateItem,createItem);


//Ruta para validar un tfg
router.post("/validateTFG",authMiddleware,checkRol(["admin"]),validatorValidateitem ,validateTFG);



//Exporto el router de auth
module.exports = router