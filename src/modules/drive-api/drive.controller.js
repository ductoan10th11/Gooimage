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
        const links = await Link.getLink(userId)
        return res.json({...MSG.msg.success, [path]: true, links})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}
exports.api = async(req, res) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const userId = req.user._id
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

exports.addLink = async(req, res) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const userId = req.user._id
        const [driveLink, name] = [req.body.driveLink, req.body.name]
        await Link.addLink(userId, driveLink, name)
        const links = await Link.getLink(userId)
        return res.json({...MSG.msg.success, [path]: true, links})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}
exports.deleteLink = async(req, res) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const userId = req.user._id
        const [linkId] = [req.body.linkId]
        const stt = await Link.deleteLink(userId, linkId)
        const links = await Link.getLink(userId)
        if(!stt) return res.json({...MSG.msg.fail, [path]: true, links})
        return res.json({...MSG.msg.success, [path]: true, links})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}

exports.updateLink = async(req, res) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const userId = req.user._id
        const [linkId, driveLink, name] = [req.body.linkId, req.body.driveLink, req.body.name]
        const stt = await Link.updateLink(userId, linkId, driveLink, name)
        const links = await Link.getLink(userId)
        if(!stt) return res.json({...MSG.msg.fail, [path]: true, links})
        return res.json({...MSG.msg.success, [path]: true, links})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}
exports.toggleStatusLink = async(req, res) => {
    try{ 
        const path = req.route.path.replace("/", "").toUpperCase()
        const userId = req.user._id
        const [linkId, status] = [req.body.linkId, req.body.status]
        // console.log(linkId, status)
        const stt = await Link.toggleStatusLink(userId, linkId, status)
        const links = await Link.getLink(userId)
        if(!stt) return res.json({...MSG.msg.fail, [path]: true, links})
        return res.json({...MSG.msg.success, [path]: true, links})
    }catch (err){
        await Tracking.writeError(req, err)
        return res.status(500).json({message: "Server Error"})
    }
}

exports.getList = async(req, res) => {
    try{
        const rawLink = req.params.goolink
        const folId = await Link.getGooLink(rawLink)
        // console.log(folId)
        const listImg = await Service.listImages(folId)
        // console.log(listImg)
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