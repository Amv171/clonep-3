const express = require("express");

//Importo las funciones del controlador de auth
const { register, login } = require('../controllers/auth');

//Importo la funcion de validacion de usuario
const {validateRegister, validateLogin} = require('../validators/auth');


const router = express.Router();




router.get("/", (req, res) => {
    res.send("Hello from auth");
});


router.post("/register",validateRegister,register);


router.post("/login",validateLogin,login);




//Exporto el router de auth
module.exports = router