const express = require("express");
const router = express.Router();

//Importo las funciones del controlador de usuario
const { getItems} = require('../controllers/user');

//Importo la funcion de validacion de usuario
const {validatorCreateItem} = require('../validators/user');






router.get("/getUsers", getItems);

//Exporto el router de auth
module.exports = router