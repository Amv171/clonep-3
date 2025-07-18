//Importo check para validar los datos que recibo del front
const {check} = require('express-validator');  

//Importo la funcio  para validar los resultados de los validadores
const {validateResults} = require('../utils/handleValidator');

const validateRegister = [
    check('name').exists().isString().notEmpty(),
    check('mail').exists().isEmail().
    withMessage("Debe ser un correo válido")
    .custom((value) => {
      const allowedDomains = ["@live.u-tad.com", "@u-tad.com"];
      const domain = value.substring(value.lastIndexOf("@"));
      if (!allowedDomains.includes(domain)) {
        throw new Error("El correo debe ser de los dominios @live.u-tad.com o @u-tad.com");
      }
      return true;
    }),
    
    check('password').exists().isString().notEmpty().isLength({min: 8}),
    check('role').exists().isString().notEmpty().
    isIn(['user', 'teacher', 'coord']).withMessage('Rol no válido').
    custom((rolValue, { req }) => {
      const email = req.body.mail;
      const domain = email?.substring(email.lastIndexOf("@"));

      if (rolValue === 'coord' && domain !== '@u-tad.com') {
        throw new Error("Solo los correos @u-tad.com pueden tener el rol 'coord'");
      }
      return true;
    }),
    (req,res,next) => validateResults(req,res,next)
];

const validateLogin = [
    check ("mail").exists().notEmpty().isEmail(),
    check ("password").exists().notEmpty().isLength({min: 8}),
    (req,res,next) => validateResults(req,res,next)
];

const validateVerify = [
    check ("mail").exists().notEmpty().isEmail(),
    check ("otp").exists().notEmpty(),
    (req,res,next) => validateResults(req,res,next)
];


const validateSendOTPVerificationMail = [
    check ("mail").exists().notEmpty().isEmail(),
    (req,res,next) => validateResults(req,res,next)
]

module.exports = {validateRegister, validateLogin, validateVerify, validateSendOTPVerificationMail}