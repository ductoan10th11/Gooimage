const Service = require('./drive.service')
const Tracking = require('../Logs/tracking')
const MSG = require('../../utils/message')
const Link = require('../links/link.service')

exports.dashboard = async(req, res) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const userId = req.user._id
        const links = await Link.getLink(userId)
        return res.json({...MSG.msg.success, [path]: true, links})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}
exports.link = async(req, res) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const userId = req.user._id
        console.log(userId)
        return res.json({...MSG.msg.success, [path]: true})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}
exports.api = async(req, res) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const userId = req.user._id
        console.log(userId)
        return res.json({...MSG.msg.success, [path]: true})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}
exports.support = async(req, res) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const userId = req.user._id
        console.log(userId)
        return res.json({...MSG.msg.success, [path]: true})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}
exports.upgrade = async(req, res) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const userId = req.user._id
        console.log(userId)
        return res.json({...MSG.msg.success, [path]: true})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}

exports.getList = async(req, res) => {
    try{
        const folId = req.params.id
        const listImg = await Service.listImages(folId)
        await Tracking.writeLog(req, `Get list image with ${folId}`)
        return res.json({status: "success", listImg})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}
exports.testServer = async (req, res) => {
    try{ 
        return res.json({status: "ok"})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}