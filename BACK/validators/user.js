//Importo check para validar los datos que recibo del front
const {check} = require('express-validator');  

//Importo la funcio  para validar los resultados de los validadores
const {validateResults} = require('../utils/handleValidator');

const validatorCreateItem = [
    check('name').exists().isString().notEmpty(),
    check('mail').exists().isEmail().notEmpty(),
    check('password').exists().isString().notEmpty(),
    check('age').exists().isInt().notEmpty(),
(req,res,next) => validateResults(req,res,next)
];

module.exports = {validatorCreateItem}