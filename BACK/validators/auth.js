//Importo check para validar los datos que recibo del front
const {check} = require('express-validator');  

//Importo la funcio  para validar los resultados de los validadores
const {validateResults} = require('../utils/handleValidator');

const validateRegister = [
    check('name').exists().isString().notEmpty(),
    check('mail').exists().isEmail().notEmpty(),
    check('password').exists().isString().notEmpty().isLength({min: 8}),
    check('age').exists().isInt().notEmpty(),
    (req,res,next) => validateResults(req,res,next)
];

const validateLogin = [
    check ("mail").exists().notEmpty().isEmail(),
    check ("password").exists().notEmpty().isLength({min: 8}),
    (req,res,next) => validateResults(req,res,next)
];

module.exports = {validateRegister, validateLogin}