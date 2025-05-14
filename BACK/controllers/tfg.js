//Importo el modelo de usuario para poder hacer las consultas a la base de datos
const {tfgModel, userModel} = require('../models');

//Importo matched-data para validar los datos que recibo del front
const {matchedData} = require('express-validator');

//Importo hanldeHTTPError para manejar los errores de http
const {handleHttpError} = require('../utils/handleError');
const tfg = require('../models/mongo/tfg');


const getAllItems = async (req, res) => {
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


const getPendingItems = async (req, res) => {
    try{
        //Obtengo todos los usuarios de la base de datos
        const tfg = await tfgModel.find( {estado: "pendiente"});
        //Envio los usuarios
        res.send(tfg);
    }
    catch(error){
        //Manejo el error
        handleHttpError(res, "ERR_GET_TFG");
    }
}

const getItems = async (req, res) => {
    try{
        //Obtengo todos los usuarios de la base de datos
        const tfg = await tfgModel.find( {estado: "aprobado"});
        //Envio los usuarios
        res.send(tfg);
    }
    catch(error){
        //Manejo el error
        handleHttpError(res, "ERR_GET_TFG");
    }
}


const getItemsGrados = async (req, res) => {
    try {
        // Obtengo el parámetro de la ruta
        const { TitulacionGrado } = req.params;

        // Construyo el filtro dinámico basado en el parámetro recibido
        const filter = {
            estado: "aprobado",
            TitulaciónGrado: TitulacionGrado ? { $in: [TitulacionGrado] } : { $in: ["ANIV", "ANIG", "ANIM", "DIRE", "DIDI", "DVCD", "DIPI", "DIPG", "INSO", "IDCD", "MACO"] }
        };

        // Obtengo los datos de la base de datos
        const tfg = await tfgModel.find(filter);

        // Envío los datos
        res.send(tfg);
    } catch (error) {
        // Manejo el error
        handleHttpError(res, "ERR_GET_TFG");
    }
};

const getItemsMasters= async (req, res) => {
    try{
        //Obtengo todos los usuarios de la base de datos
        const tfg = await tfgModel.find({
            estado: "aprobado",
            TitulaciónGrado: { $in: ["MCRS"] }
        });
        //Envio los usuarios
        res.send(tfg);
    }
    catch(error){
        //Manejo el error
        handleHttpError(res, "ERR_GET_TFG");
    }
}




const createItem = async (req, res) => {
    try{
        //Extraigo los datos validados
        const data = matchedData(req);

        //Busco si el usuario existe
        const user = await userModel.findOne({mail: req.token.mail});
        if(!user){
            handleHttpError(res, "ERR_USER_NOT_FOUND", 404);
            return ;
        }
        data.Alumno = user.name;
        //Busco si ya existe un tfg con el mismo titulo
        const tfg = await tfgModel.findOne({TituloTFG: data.TituloTFG});
        if(tfg){
            handleHttpError(res, "ERR_TFG_ALREADY_EXISTS", 409);
            return;
        }
        //Creo un nuevo tfg
        const newTFG = await tfgModel.create(data);
        //Envio el nuevo tfg
        res.send(newTFG);
    }
    catch(error){
        //Manejo el error
        handleHttpError(res, "ERR_CREATE_TFG");
    }
}




const validateTFG = async (req, res) => {
 try{
    const data = matchedData(req);

    const tfg = await tfgModel.findOne({TituloTFG: data.TituloTFG});
    if(!tfg){
        handleHttpError(res, "ERR_TFG_NOT_FOUND", 404);
        return ;
    }
    else{
        if (tfg.estado != "pendiente"){
            handleHttpError(res, "ERR_TFG_ALREADY_JUDGE", 400);
            return ;
        }
        else{
            await tfgModel.updateOne({TituloTFG: data.TituloTFG}, {estado: "aprobado"});
            res.send(tfg);
    }
}
}
catch(error){
    handleHttpError(res, "ERR_VALIDATE_TFG");
}
}  


const invalidateTFG = async (req, res) => {
    try{
       const data = matchedData(req);
   
       const tfg = await tfgModel.findOne({TituloTFG: data.TituloTFG});
       if(!tfg){
           handleHttpError(res, "ERR_TFG_NOT_FOUND", 404);
           return ;
       }
       else{
           if (tfg.estado != "pendiente"){
               handleHttpError(res, "ERR_TFG_ALREADY_JUDGED", 400);
               return ;
           }
           else{
               await tfgModel.updateOne({TituloTFG: data.TituloTFG}, {estado: "suspenso"});
               res.send(tfg);
       }
   }
   }
   catch(error){
       handleHttpError(res, "ERR_INVALIDATE_TFG");
   }
   }  



//Función para recibir un tfg por el titulo
const getItemByTitle = async (req, res) => {
try{
    //Extraigo los datos validados
    const {TituloTFG} = req.params;

    //Busco si ya existe un tfg con el mismo titulo
    const tfg = await tfgModel.findOne({TituloTFG: TituloTFG});
    if(!tfg){
        handleHttpError(res, "ERR_TFG_NOT_FOUND", 404);
        return ;
    }
    else{
        res.send(tfg);
    }
}
catch(error){
    handleHttpError(res, "ERR_GET_TFG");
    return;
}
}

const getItemByAuthor = async (req, res) => {
    try{
        //Extraigo los datos validados
        const {mail} = req.params;

        const user = await userModel.findOne({mail: mail});
        if(!user){
            handleHttpError(res, "ERR_USER_NOT_FOUND", 404);
            return ;
        }
        //Busco si ya existe un tfg con el mismo titulo
        const tfg = await tfgModel.find({Alumno: user.name});
        if(!tfg){
            handleHttpError(res, "ERR_TFG_NOT_FOUND", 404);
            return ;
        }
        else{
            tfg.forEach(tfg => {
                    if(tfg.Alumno != user.name){
                        if (tfg.estado == "pendiente"){
                            handleHttpError(res, "ERR_TFG_NOT_APROVED", 404);
                            return ;
                        }
                    }
            });
        }
            res.send(tfg);
        }
    catch(error){
        handleHttpError(res, "ERR_GET_TFG");
        return;
    }
}



const getItemByTutor = async (req, res) => {
    try{
        //Extraigo los datos validados
        const {name} = req.params;
        //Busco si ya existe un tfg con el mismo titulo
        const tfg = await tfgModel.find({Tutor: name});
        if(!tfg){
            handleHttpError(res, "ERR_TFG_NOT_FOUND", 404);
            return ;
        }
        else{
            const filteredTFG = tfg.filter(tfg => {
                return tfg.Tutor === name && tfg.estado === 'aprobado';
              });
              res.send(filteredTFG);
        }
        }
    catch(error){
        handleHttpError(res, "ERR_GET_TFG");
        return;
    }
}




const deleteItemAdmin =  async (req, res) => {
    try{
        //Extraigo los datos validados
        const data = matchedData(req);

        const tfg = await tfgModel.findOne({TituloTFG: data.TituloTFG});
        if(!tfg){
            handleHttpError(res, "ERR_TFG_NOT_FOUND", 404);
            return ;
        }
        else{
            await tfgModel.deleteOne({TituloTFG: data.TituloTFG});
            res.send(tfg);
        }
    }
    catch(error){
        handleHttpError(res, "ERR_DELETE_TFG");
    }
}


const deleteItem =  async (req, res) => {
    try{
        //Extraigo los datos validados
        const data = matchedData(req);

        const tfg = await tfgModel.findOne({TituloTFG: data.TituloTFG});


        const user = await userModel.findOne({mail: req.token.mail});
        if(!user){
            handleHttpError(res, "ERR_USER_NOT_FOUND", 404);
            return ;
        }
        if(!tfg){
            handleHttpError(res, "ERR_TFG_NOT_FOUND", 404);
            return ;
        }
        else{
            if( tfg.Alumno != user.name){
                handleHttpError(res, "ERR_TFG_NOT_YOURS", 404);
                return ;
            }
            await tfgModel.deleteOne({TituloTFG: data.TituloTFG});
            res.send(tfg);
        }
    }
    catch(error){
        handleHttpError(res, "ERR_DELETE_TFG");
    }
}



module.exports = { getItems, getAllItems , createItem, validateTFG, invalidateTFG, getPendingItems,
     getItemsGrados, getItemsMasters, getItemByTitle, getItemByAuthor, deleteItem, deleteItemAdmin, getItemByTutor };