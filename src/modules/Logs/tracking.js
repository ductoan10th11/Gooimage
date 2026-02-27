const Log = require('./log.model')

exports.writeLog = async(req, action, description) => {
    try{
        const ipaddress = getClientIp(req)
        await Log.create({action, logType: "log", description, ipaddress})
    }catch (err){
        console.error(err)
    }
}
exports.writeError = async(req, action, description) => {
    try{
        const ipaddress = getClientIp(req)
        await Log.create({action, logType: "error", description, ipaddress})
    }catch (err){
        console.error(err)
    }
}
const getClientIp = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    null
  ).replace("::ffff:", "")
}