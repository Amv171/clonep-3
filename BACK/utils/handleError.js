//Esta funcion sirve para manejar los errores de http
//Como valor default si no se le pasa el codigo de error pondra el 403
const handleHttpError = (res, message, code = 403)=>{
    res.status(code).send(message)
}
module.exports = {handleHttpError}