const User = require('../modules/users/user.model')
const Tracking = require('../modules/Logs/tracking')
const MSG = require('../utils/message')
const jwtUtil = require('../utils/jwt')
const { google } = require('googleapis')
const Role = require('../modules/roles/role.service')

exports.verify = async (req, res, next) => {
    try{
        const token = req.body.credential
        const { OAuth2Client } = require("google-auth-library");

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const user = await verityUser(req, payload)
        const jwt_payload = {
            email: user.email,
            name: user.name,
            googleId: user.googleId
        }
        const authToken = jwtUtil.sign(jwt_payload)

        req.user = user
        res.clearCookie("token");
        res.cookie("token", authToken, {
            httpOnly: true,
            // secure: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        next()
    }catch(err){
        res.json(MSG.msg.error)
        throw err
    }
}


const verityUser = async(req, payload) => {
    try{
        const googleId = payload.sub
        const email = payload.email
        const name = payload.name
        const provider = payload.iss
        const avatar = payload.picture
        
        let user = await User.findOne({googleId})
        if(!user){
            const newUser = await register(googleId,email,name,provider,avatar)
            user = await User.findOne({googleId})
            await Tracking.writeLog(req, "register", googleId)
        }
        await Tracking.writeLog(req, "login", googleId)
        return user

    }catch (err){
        throw err
    }
}

const register = async(googleId,email,name,provider,avatar) => {
    try{
        const newUser = await User.create({ email, name, provider, googleId, avatar})
        const userId = newUser._id
        await Role.addRole(userId)
        return newUser !== true
    }catch (err){
        throw err
    }
}

exports.refresh = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            res.clearCookie("token")
            return res.json(MSG.msg.unauthorized)
        }
        const tUser = jwtUtil.decode(token) 

        const googleId = tUser.googleId
        let user = await User.findOne({googleId})
        if(!user){
            return res.json(MSG.msg.accountdoesnotexist)
        }
        req.user = user
        next()
    }catch (err){
        res.json(MSG.msg.error)
        throw err
    }
}

exports.getPage = async(req, res, next) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const token = req.cookies.token;
        if(!token){
            res.clearCookie("token")
            return res.json(MSG.msg.unauthorized)
        }
        const tUser = jwtUtil.decode(token) 

        const googleId = tUser.googleId
        let user = await User.findOne({googleId})
        if(!user){
            return res.json(MSG.msg.accountdoesnotexist)
        }
        const author = await authorizationPage(user._id, path)
        if(!author){
            return res.json({...MSG.msg.success, [path]: author})
        }
        req.user = user
        next()
    }catch (err){
        res.json(MSG.msg.error)
        console.log(err)
    }
}

const authorizationPage = async(userId, path) => {
    try{    
        const reqPer = path
        const isvalid = await Role.authPer(userId, reqPer)
        return isvalid
    }catch (err){
        console.log(err)
    }

}