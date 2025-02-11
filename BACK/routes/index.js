//Importo la libreria de express
const express = require("express");
//Importo el metodo fs de la libreria fs
const fs = require("fs");

//Creo un objeto tipo router de express
const router = express.Router();

//Este metodo recibe un nombre de archivo y le quita la extension
const removeExtension = (fileName)=>{
    return fileName.split(".").shift();
}
//Esta funcion recorre los archivos de la carpeta hasta que encuentra el archivo que se le pasa por parametro y lo encuentra para que use las funciones de enrutamiento dentro de ese archivo
fs.readdirSync(__dirname).filter((file)=>{
    const name = removeExtension(file);
    if(name !== "index"){
        router.use(`/${name}`, require(`./${name}`));
    }
})
module.exports = router;