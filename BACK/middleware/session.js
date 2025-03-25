const {handleHttpError} = require('../utils/handleError')
const { verifyToken } = require('../utils/handleJwt')
const { userModel } = require('../models')

const authMiddleware = async (req, res, next) => {

    try{
            if(!req.headers.authorization){
                handleHttpError(res, "ERROR_NO_TOKEN")
                return
            }
            const token = req.headers.authorization.split(' ').pop()
            const dataToken = await verifyToken(token)

            if(!dataToken.id){
                handleHttpError(res, "ERROR_ID_TOKEN")
                return
            }
            const user = await userModel.findById(dataToken.id)
            req.token = dataToken
            next()
    }
    catch(err){
        handleHttpError(res, "ERROR_NOT_SESSION")
    }
}



const checkRol = (roles) => (req, res, next) => {
    try{
        const {token} = req
        const userRol = token.role
        const ckeckRol = roles.includes(userRol)
        if(!ckeckRol){
            handleHttpError(res, "ERROR_NO_AUTORIZADO", 403)
            return
        }
        next()
    }
    catch(err){
        handleHttpError(res,"ERROR_CKECK_ROL",403)
    }
}

module.exports = {authMiddleware, checkRol}