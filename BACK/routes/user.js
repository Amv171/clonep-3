const express = require("express");
const router = express.Router();

//Importo las funciones del controlador de usuario
const { getItems, deleteItemAdmin } = require('../controllers/user');

//Importo la funcion de validacion de usuario
const {validatorCreateItem, validatorDeleteItem} = require('../validators/user');

//Importo la funcion de autenticacion
const {authMiddleware, checkRol} = require('../middleware/session');



router.get("/getUsers", getItems);

router.post("/deleteUser", validatorDeleteItem, authMiddleware, checkRol(["admin"]), deleteItemAdmin);


//Exporto el router de auth
module.exports = router