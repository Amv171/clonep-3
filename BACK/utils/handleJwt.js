const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const {handleHttpError} = require('../utils/handleError')
const user = require("../models/mongo/user")

const tokensignUser = (user) => {
    const sign = jwt.sign({
        id: user._id,
        mail: user.mail,
        role: user.role
    }
    ,JWT_SECRET,
    {expiresIn: "2h"}
    )
    return sign
}

const verifyToken = (token) => {
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    }
    catch(err){
        handleHttpError(res, "ERR_INVALID_TOKEN", 401)
    }
}


module.exports = {tokensignUser, verifyToken}