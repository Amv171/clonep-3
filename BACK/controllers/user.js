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

const deleteItemAdmin = async (req, res) => {
    try {
        //Obtengo los datos del usuario
        const { mail } = matchedData(req);
        //Busco el usuario en la base de datos
        const user = await userModel.findOne({ mail: mail });
        //Si no existe el usuario, devuelvo un error
        if (!user) {
            return handleHttpError(res, "USER_NOT_FOUND");
        }
        //Si existe el usuario, lo elimino
        await userModel.deleteOne({ mail: mail });
        //Devuelvo un mensaje de exito
        res.send({ message: "User deleted successfully", user });
    }
    catch (error) {
        //Manejo el error
        handleHttpError(res, "ERR_DELETE_USER");
    }
}

module.exports = { getItems, deleteItemAdmin }