//Importo check para validar los datos que recibo del front
const {check} = require('express-validator');  

//Importo la funcio  para validar los resultados de los validadores
const {validateResults} = require('../utils/handleValidator');

// Atributos obligatorios: titulo, asignatura, estudiante, resumen, cursoAcademico, subidoPor
const validatorCreateItem = [
    check('titulo')
        .exists().withMessage('El título es obligatorio')
        .notEmpty().withMessage('El título no puede estar vacío')
        .isString().withMessage('El título debe ser un texto'),
    check('asignatura')
        .exists().withMessage('La asignatura es obligatoria')
        .notEmpty().withMessage('La asignatura no puede estar vacía')
        .isString().withMessage('La asignatura debe ser un texto'),
    check('estudiante')
        .exists().withMessage('Los estudiantes son obligatorios')
        .isString().withMessage('Los estudiantes deben ser un texto'),
    check('docente')
        .optional() // Marcado como opcional
        .isString().withMessage('El docente debe ser un texto'),
    check('resumen')
        .exists().withMessage('El resumen es obligatorio')
        .notEmpty().withMessage('El resumen no puede estar vacío')
        .isString().withMessage('El resumen debe ser un texto'),
    check('palabrasClave')
        .optional() // Marcado como opcional
        .isArray().withMessage('Las palabras clave deben ser un arreglo'),
    check('cursoAcademico')
        .exists().withMessage('El curso académico es obligatorio')
        .notEmpty().withMessage('El curso académico no puede estar vacío')
        .isString().withMessage('El curso académico debe ser un texto'),
    check('archivo')
        .optional() // Marcado como opcional
        .isString().withMessage('El archivo debe ser un texto'),
    check('enlacesExternos')
        .optional() // Marcado como opcional
        .isArray().withMessage('Los enlaces externos deben ser un arreglo'),
    check('enlacesExternos.*')
        .isString().withMessage('Cada enlace externo debe ser un texto'),
    check('estado')
        .optional() // Marcado como opcional
        .isIn(['pendiente', 'aprobado']).withMessage('El estado debe ser "pendiente" o "aprobado"'),
        (req,res,next) => validateResults(req,res,next)
];


const validatorValidateitem=[
    check ('titulo')
        .exists().withMessage('El título es obligatorio')
        .notEmpty().withMessage('El título no puede estar vacío')
        .isString().withMessage('El título debe ser un texto'),
        (req,res,next) => validateResults(req,res,next)

]

module.exports = {validatorCreateItem, validatorValidateitem};