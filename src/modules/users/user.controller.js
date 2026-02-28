const Service = require('./user.service')
const MSG = require('../../utils/message')
exports.auth = async(req, res) => {
    try{
        const user = req.user
        res.json({...MSG.msg.success, user})
    }catch (err){
        console.log(err)
        return res.json(MSG.msg.error)
    }
}
exports.me = async(req, res) => {
    try{
        const user = req.user
        res.json({...MSG.msg.success, user})
    }catch (err){
        console.log(err)
        return res.json(MSG.msg.error)
    }
}