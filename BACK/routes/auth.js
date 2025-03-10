const express = require("express");

//Importo las funciones del controlador de auth
const { register, login, resendOTP } = require('../controllers/auth');

//Importo la funcion de validacion de usuario
const {validateRegister, validateLogin, validateVerify, validateSendOTPVerificationMail} = require('../validators/auth');

//Importo la funcion de verificacion de OTP
const { verifyOTP } = require('../utils/handleOTPVerification');

const router = express.Router();


router.get("/", (req, res) => {
    res.send("Hello from auth");
});


router.post("/register",validateRegister,register);

router.post("/login",validateLogin,login);

router.post("/verifyOTP",validateVerify,verifyOTP);

router.post("/resendOTP",validateSendOTPVerificationMail, resendOTP);





//Exporto el router de auth
module.exports = router