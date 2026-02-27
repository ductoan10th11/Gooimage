const Service = require('./drive.service')
const Tracking = require('../Logs/tracking')
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
    await Tracking.writeLog(req, "call api")
    res.json({msg: "ok"})
}