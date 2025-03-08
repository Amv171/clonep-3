const express = require("express");

//Importo las funciones del controlador de auth
const { register, login, verifyOTP } = require('../controllers/auth');

const { sendMail } = require('../utils/handleMail');

//Importo la funcion de validacion de usuario
const {validateRegister, validateLogin, validateVerify} = require('../validators/auth');


const router = express.Router();

//Configuracion del mail
const mailOptions = {
    from: process.env.EMAIL,
    to: "moreno.villas.17@gmail.com",
    subject: "Verificacion de mail",
    text: "Hola manito esto es una pruebecica to wapa de un email",
  };



router.get("/", (req, res) => {
    res.send("Hello from auth");
    sendMail(mailOptions);
});


router.post("/register",validateRegister,register);


router.post("/login",validateLogin,login);


router.post("/verify",validateVerify,verifyOTP);



//Exporto el router de auth
module.exports = router