//Importo mongoose y mongoose-delete para poder hacer soft delete
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');


//Creo el esquema de usuario
const UsuarioSchema = new mongoose.Schema(
    {   
        name:{
            type: String
        },
        mail:{
            type: String
        },
        password:{
            type: String
        },
        role:{
            type: String,
            enum:['user', 'admin', 'anonymous'],
            default: 'user'
        },
        age:{
            type: Number
        },
        verified:{
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true, 
        versionKey: false
    })
    UsuarioSchema.plugin(mongooseDelete, {overrideMethods: "all"})

    module.exports = mongoose.model("user",UsuarioSchema)