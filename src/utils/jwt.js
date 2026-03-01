const JWT = require('jsonwebtoken')

const jwt_secret = process.env.JWT_SECRET
const jwt_expires = process.env.JWT_EXPIRES
exports.sign = (payload) => {
    try{
        const token = JWT.sign(
            payload, 
            jwt_secret, 
            {expiresIn: jwt_expires}
        )
        return token
    }catch (err){
        console.log(err)
    }
}
exports.decode = (token) => {
    try{
        const decoded = JWT.verify(token, jwt_secret)
        return decoded
    }catch(err){
        console.log(err)
    }
}