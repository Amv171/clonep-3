// Importamos dotenv para manejar variables de entorno
require('dotenv').config();
//Importamos express 
const express = require("express");



//Importo la función para conectarme a la base de datos
const dbConnect = require("./config/mongo");


//Creamos una instancia de express llamada app
const app = express();



//Uso de rutas
app.use("/api", require("./routes"));





//Ponemos la app a escuchar en el puerto 3200
app.listen(process.env.API_PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.API_PORT}`);
    console.log(`
        ⣀⣤⣴⣶⣶⣶⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀
     ⢀⣴⡿⠛⠉⠀⠀⠀⠀⠉⠙⢿⣦⡀⠀⠀⠀⠀
    ⢠⣿⠋⠀⠀⠀⣀⡀⠀⠀⠀⢀⡀⠙⣿⡄⠀⠀⠀
    ⣾⡇⠀⠀⠀⠰⣿⡇⠀⠀⠀⢸⡇⠀⢸⡷⠀⠀⠀
    ⣿⡇⠀⠀⠀⠠⠿⠇⠀⠀⠀⠘⠇⠀⢸⡿⠀⠀⠀
    ⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠃⠀⠀⠀
    ⠘⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠃⠀⠀⠀⠀
      ⠙⠻⣦⣤⣤⣤⣤⣴⡾⠟⠋⠀⠀⠀⠀⠀⠀
        `);
  
});



//Conectamos a la base de datos
dbConnect();