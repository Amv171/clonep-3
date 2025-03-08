//Importo mongoose y mongoose-delete para poder hacer soft delete
const mongoose = require('mongoose');

//Creo el esquema de la verificadcion del usuario
const OTPVerificationUserSchema = new mongoose.Schema(
    {   mail:{
            type: String
        },
        otp:{
            type: String
        },
        expires:{
            type: Date
        }
    },
    {
        timestamps: true, 
        versionKey: false
    });



module.exports = mongoose.model("otpVerificationUser",OTPVerificationUserSchema)