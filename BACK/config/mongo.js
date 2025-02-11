//Importamos mongoose que es la librería que nos permite conectarnos a la base de datos
const mongoose = require("mongoose");

//Funión para conectarnos a la base de datos    
const dbConnect = () =>{
    mongoose.set('strictQuery', false);

    try{
        mongoose.connect(process.env.DB_URI);
    }
    catch(error){
        console.log("Error al conectar a la base de datos: ", error);
    }

    mongoose.connection.on('connected', () => {
        console.log(`
            __
           |  |
        .-'    '-.
       /   .-''-. \\
      /   /  🌱  \\ \\
      |  |  (__)  | |
      |  |        | |
      |  |        | |
      |  '--------' |
       \\            /
        '-.______.-'
    
      🚀 Connected to MongoDB! ✅
      🌍 Ready to handle requests!
    `);
    });
}


//exportamos la funcion
module.exports = dbConnect;