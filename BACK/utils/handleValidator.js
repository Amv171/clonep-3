//Importo validateResult para validar los datos que recibo del front y si dan o no error
const { validationResult } = require('express-validator');


//Este metodo se enarga de manejar los resultados de los validadores
//Si no hay errores en el validador pasa al siguiente middleware
//Si hay errores manda un mensaje de error con el status 403 y enseña el array de errores
const validateResults = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Errores en la validación",
            errors: errors.array()
        });
    }
    next();
}

module.exports = {validateResults}