/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints relacionados con la autenticación de usuarios
 */









const express = require("express");

//Importo las funciones del controlador de auth
const { register, login, resendOTP } = require('../controllers/auth');

//Importo la funcion de validacion de usuario
const {validateRegister, validateLogin, validateVerify, validateSendOTPVerificationMail} = require('../validators/auth');

//Importo la funcion de verificacion de OTP
const { verifyOTP } = require('../utils/handleOTPVerification');

const router = express.Router();

/**
 * @swagger
 * /auth/:
 *   get:
 *     summary: Endpoint de prueba para autenticación
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Respuesta exitosa con un mensaje de prueba
 */

router.get("/", (req, res) => {
    res.send("Hello from auth");
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la validación de datos
 */
router.post("/register",validateRegister,register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicio de sesión de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Error en la validación de datos
 */
router.post("/login",validateLogin,login);

/**
 * @swagger
 * /api/auth/verifyOTP:
 *   post:
 *     summary: Verificación de código OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verificado exitosamente
 *       400:
 *         description: Error en la validación de datos
 */
router.post("/verifyOTP",validateVerify,verifyOTP);

/**
 * @swagger
 * /api/auth/resendOTP:
 *   post:
 *     summary: Reenvío de código OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP reenviado exitosamente
 *       400:
 *         description: Error en la validación de datos
 */
router.post("/resendOTP",validateSendOTPVerificationMail, resendOTP);





//Exporto el router de auth
module.exports = router