const Role = require('./role.model')
const Permission = require('./permission.model')
exports.addRole = async(userId) => {
    try{
        const per = await Permission.findOne({name: "user"})
        const perId = per._id
        console.log(userId, perId)
        await Role.create({userId, perId})
    }catch (err){
        throw err
    }
}
exports.addPer = async() => {
    try{
        const permission = {
                                "LOGIN": true,
                                "GET_LINK": true,
                                "CREATE_LINK": true,
                                "REMOVE_LINK": true,
                                "UPDATE_LINK": true,
                                "DASHBOARD": true,
                                "LINK": true,
                                "API": true,
                                "DOCUMENT": true,
                                "UPGRADE": true,
                                "SUPPORT": true,
                                "ADMIN": true
                            }
        await Permission.findOneAndUpdate({name: "admin"}, {permission})
    }catch (err){
        throw err
    }
}
exports.getRole = async(userId) => {
    try{
        const role = await Role.findOne({userId})
        const perId = role.perId
        const per = await Permission.findById(perId)
        return per.name
    }catch(err){
        throw err
    }
}
exports.authPer = async(userId, reqPer) => {
    try{
        const role = await Role.findOne({userId})
        const perId = role.perId
        const per = await Permission.findById(perId)
        return per.permission[reqPer]
    }catch(err){
        throw err
    }
}