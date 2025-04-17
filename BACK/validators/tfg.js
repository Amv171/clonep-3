//Importo check para validar los datos que recibo del front
const {check} = require('express-validator');  

//Importo la funcio  para validar los resultados de los validadores
const {validateResults} = require('../utils/handleValidator');

// Atributos obligatorios: TituloTFG, Año, TitulaciónGrado, Alumno, Tutor, Abstract
// Atributos opcionales: archivo, enlacesExternos
const validatorCreateItem = [
    check('TituloTFG')
        .exists().withMessage('El título del TFG es obligatorio')
        .notEmpty().withMessage('El título del TFG no puede estar vacío')
        .isString().withMessage('El título del TFG debe ser un texto'),
    check('Año')
        .exists().withMessage('El año académico es obligatorio')
        .notEmpty().withMessage('El año académico no puede estar vacío')
        .isString().withMessage('El año académico debe ser un texto'),
    check('TitulaciónGrado')
        .exists().withMessage('La titulación o grado es obligatorio')
        .notEmpty().withMessage('La titulación o grado no puede estar vacía')
        .isString().withMessage('La titulación o grado debe ser un texto'),
    check('Tutor')
        .exists().withMessage('El nombre del tutor es obligatorio')
        .notEmpty().withMessage('El nombre del tutor no puede estar vacío')
        .isString().withMessage('El nombre del tutor debe ser un texto'),
    check('Abstract')
        .exists().withMessage('El resumen (abstract) es obligatorio')
        .notEmpty().withMessage('El resumen (abstract) no puede estar vacío')
        .isString().withMessage('El resumen (abstract) debe ser un texto'),
    check('archivo')
        .optional()
        .isString().withMessage('El archivo debe ser un texto'),
    check('enlacesExternos')
        .optional()
        .isArray().withMessage('Los enlaces externos deben ser un arreglo'),
    check('enlacesExternos.*')
        .isString().withMessage('Cada enlace externo debe ser un texto'),
    (req, res, next) => validateResults(req, res, next)
];



const validatorValidateitem=[
    check ('TituloTFG')
        .exists().withMessage('El título es obligatorio')
        .notEmpty().withMessage('El título no puede estar vacío')
        .isString().withMessage('El título debe ser un texto'),
        (req,res,next) => validateResults(req,res,next)

]

module.exports = {validatorCreateItem, validatorValidateitem};