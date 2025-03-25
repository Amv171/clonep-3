//Importo el modelo de usuario para poder hacer las consultas a la base de datos
const {tfgModel} = require('../models');

//Importo matched-data para validar los datos que recibo del front
const {matchedData} = require('express-validator');

//Importo hanldeHTTPError para manejar los errores de http
const {handleHttpError} = require('../utils/handleError');
const tfg = require('../models/mongo/tfg');


const getItems = async (req, res) => {
    try{
        //Obtengo todos los usuarios de la base de datos
        const tfg = await tfgModel.find();
        //Envio los usuarios
        res.send(tfg);
    }
    catch(error){
        //Manejo el error
        handleHttpError(res, "ERR_GET_TFG");
    }
};

const createItem = async (req, res) => {
    try{
        //Extraigo los datos validados
        const data = matchedData(req);
        //Creo un nuevo usuario
        const newTFG = await tfgModel.create(data);
        //Envio el usuario
        res.send(newTFG);
    }
    catch(error){
        //Manejo el error
        handleHttpError(res, "ERR_CREATE_TFG");
    }
}

module.exports = { getItems, createItem }