//Importo matched-data para validar los datos que recibo del front
const {matchedData} = require('express-validator');

//Importo hanldeHTTPError para manejar los errores de http
const {handleHttpError} = require('../utils/handleError');

//Importo el modelo de usuario para poder hacer las consultas a la base de datos
const {userModel} = require('../models');

//Importo las funciones para manejar las contraseñas
const { encrypt, compare } = require('../utils/handlePassword');

//Importo el sign con jwtoken
const {tokensignUser} = require('../utils/handleJwt');

//Importo la funcion para validar si el usuario existe
const {userExists} = require('../utils/handleAuth');




const user = require('../models/mongo/user');



const register = async (req, res) => {
    try{
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password}
       if ( await userExists(body.mail)){
            handleHttpError(res, "ERR_USER_EXISTS", 400);
       }
       else{
                const newUser = await userModel.create(body);
        newUser.set('password',undefined, { strict: false })

        const data = {
            token: tokensignUser(newUser),
            user: newUser,
        }
        res.send(data);
       }


    }
    catch(err)
    {
        handleHttpError(res, "ERR_CREATE_USER");
    }
};






const login = async (req, res) => {
    try{
        req = matchedData(req);
        const user = await userModel.findOne({mail: req.mail});
        if(!user){
            handleHttpError(res, "ERR_INVALID_CREDS", 401);
        }
        const hashPass = user.password;

        const valid = await compare(req.password, hashPass);
        if(!valid){
            handleHttpError(res, "ERR_INVALID_CREDS", 401);
            return
        }
        user.set('password', undefined, {strict: false})
        const data = {
            token: tokensignUser(user),
            user: user,
        }
        res.send(data);
    }
    catch(err){
        handleHttpError(res, "ERR_LOGIN");
    }
    
};



module.exports = {register, login}
