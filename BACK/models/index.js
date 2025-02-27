//Creo un objeto que va a contener todos los modelos que vana  existir en la base de datos y lo exporto para poder usarlo en otros archivos
const models = {
    userModel: require('./mongo/user'),
}
module.exports = models;