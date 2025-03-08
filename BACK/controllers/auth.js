//Importo matched-data para validar los datos que recibo del front
const {matchedData} = require('express-validator');

//Importo hanldeHTTPError para manejar los errores de http
const {handleHttpError} = require('../utils/handleError');

//Importo el modelo de usuario para poder hacer las consultas a la base de datos
const {userModel, otpVerificationUserModel} = require('../models');

//Importo las funciones para manejar las contraseñas
const { encrypt, compare } = require('../utils/handlePassword');

//Importo el sign con jwtoken
const {tokensignUser} = require('../utils/handleJwt');

//Importo la funcion para validar si el usuario existe
const {userExists} = require('../utils/handleAuth');

//Importo la funcion para enviar el mail
const {sendMail} = require('../utils/handleMail');




const user = require('../models/mongo/user');



const register = async (req, res) => {
    try{
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password, verified: false};
       if ( await userExists(body.mail)){
            handleHttpError(res, "ERR_USER_EXISTS", 400);
       }
       else{ 
        console.log(req.mail);
        if(!await sendOTPVerificationMail(req.mail, res)){
            handleHttpError(res, "ERR_SEND_OTP", 500);
            return;
        }
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
            return
        }
        if(!user.verified){
            handleHttpError(res, "ERR_EMAIL_NOT_VERIFIED", 401);
            return
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
        console.log(newOtpVerification);
        //Se envia el mail
        await sendMail(mailOptions);
        return true;
    }
    catch(err){
        handleHttpError(err, "ERR_SEND_OTP");
        return false;
    }
};




const verifyOTP = async (req, res) => {
    try{
        req = matchedData(req);
        const {mail, otp} = req;
        console.log(mail);
        const userOTP = await otpVerificationUserModel.findOne({mail: mail});
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
        await otpVerificationUserModel.deleteOne({mail: mail});
        await userModel.updateOne({mail: mail}, {verified: true});
        res.send("Email verificado correctamente");
        return true;
    }
    catch(err){
        return false;
    }
}


module.exports = {register, login, verifyOTP}
