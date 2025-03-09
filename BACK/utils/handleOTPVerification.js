//Importo el modelo de usuario para poder hacer las consultas a la base de datos
const {otpVerificationUserModel, userModel} = require('../models');

//Importo las funciones para manejar las contraseñas
const { compare,encrypt } = require('../utils/handlePassword');

//Importo la funcion para manejar los errores
const { handleHttpError } = require('./handleError');

//Importo la funcion para validar los datos
const { matchedData } = require('express-validator');

//Importo la funcion para enviar el mail
const { sendMail } = require('./handleMail');





//Funcion para enviar el mail de verificacion
const sendOTPVerificationMail = async (email, res) => {
    try{
        
        const otp = Math.floor(1000 + Math.random() * 9000);
        
        //Aqui se define la configuracion del mail que se va a enviar
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verificacion de mail",
           html: `<h3>Estees tu codigo de verificacion:</h3><br><br><h1><b>${otp}</b></h1> <br><br> <p>Este codigo expira en 5 minutos</p>`,
        };
        //Se hashea el otp
        const hashedOTP = await encrypt(otp.toString());
        //Se crea el objeto que se va a guardar en la base de datos
             const newOtpVerification = await otpVerificationUserModel.create({
            mail: email,
            otp: hashedOTP,
            expires: new Date(new Date().getTime() + 5 * 60 * 1000) // 5 minutes
        })
        //Se envia el mail
        await sendMail(mailOptions);
        return true;
    }
    catch(err){
        handleHttpError(err, "ERR_SEND_OTP");
        return false;
    }
};





//Funcion para verificar el OTP
const verifyOTP = async (req, res) => {
    try{
        req = matchedData(req);
        const {mail, otp} = req;

        //Busco el ultimo otp que se haya enviado
        const userOTP = await otpVerificationUserModel.findOne({mail: mail}).sort({createdAt: -1});
        
        if(!userOTP){
            handleHttpError(res, "ERR_OTP_DONT_EXIST", 400);
            return false;
        }

        if(new Date() > userOTP.expires){
            //await otpVerificationUserModel.deleteMany({mail: mail});
            handleHttpError(res, "ERR_OTP_EXPIRED", 400);
            return false;
         }
        
        const valid = await compare(otp, userOTP.otp);
        if(!valid){
            handleHttpError(res, "ERR_OTP_INVALID", 400);
            return false;
        }
        await otpVerificationUserModel.deleteMany({mail: mail});
        await userModel.updateOne({mail: mail}, {verified: true});
        res.send("Email verificado correctamente");
        return true;
    }
    catch(err){
        return false;
    }
}


module.exports = {sendOTPVerificationMail, verifyOTP}