const Service = require('./user.service')
const MSG = require('../../utils/message')
const Role = require('../roles/role.service')

exports.auth = async(req, res) => {
    try{
        const user = req.user
        const role = await Role.getRole(user._id)
        res.json({...MSG.msg.success, user, role: role})
    }catch (err){
        console.log(err)
        return res.json(MSG.msg.error)
    }
}
exports.me = async(req, res) => {
    try{
        const user = req.user
        const role = await Role.getRole(user._id)
        res.json({...MSG.msg.success, user, role: role})
    }catch (err){
        console.log(err)
        return res.json(MSG.msg.error)
    }
}