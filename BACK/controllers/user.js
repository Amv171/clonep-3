//Importo el modelo de usuario para poder hacer las consultas a la base de datos
const {userModel} = require('../models');

//Importo matched-data para validar los datos que recibo del front
const {matchedData} = require('express-validator');

//Importo hanldeHTTPError para manejar los errores de http
const {handleHttpError} = require('../utils/handleError');


const getItems = async (req, res) => {
    try{
        //Obtengo todos los usuarios de la base de datos
        const users = await userModel.find();
        //Envio los usuarios
        res.send(users);
    }
    catch(error){
        //Manejo el error
        handleHttpError(res, "ERR_GET_USERS");
    }
};

module.exports = { getItems }