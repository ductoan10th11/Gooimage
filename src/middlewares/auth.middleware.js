const User = require('../modules/users/user.model')
const Tracking = require('../modules/Logs/tracking')
const MSG = require('../utils/message')

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
        req.user = user
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,
            sameSite: "lax",
            maxAge: 1 * 60 * 60 * 1000
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
        return newUser !== true
    }catch (err){
        throw err
    }
}

exports.refresh = async(req, res, next) => {
    try{
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { OAuth2Client } = require("google-auth-library");

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const googleId = payload.sub
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