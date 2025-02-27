//Importo el modelo de usuario para poder hacer las consultas a la base de datos
const {userModel} = require('../models');


const userExists = async (mail) => {
    const user = await userModel.findOne({mail: mail});
    if(user !== null){
        return true;
    }
    else{
    return false;}
}
module.exports = {userExists}