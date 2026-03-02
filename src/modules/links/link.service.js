const Link = require('./link.model')
const crypto = require('crypto')

exports.addLink = async(userId, driveLink, name) => {
    try{
        const gooLink = randomId(20)
        const links = await Link.create({userId, name, driveLink, gooLink})
    }catch (err){
        throw err
    }
}
exports.getLink = async(userId) => {
    try{
        const links = await Link.find({userId})
        return links
    }catch (err){
        throw err
    }
}
exports.deleteLink = async(userId, linkId) => {
    try{
        const links = await Link.findOneAndDelete({_id: linkId, userId})
        return links !== null
    }catch (err){
        throw err
    }
}
exports.updateLink = async(userId, linkId, driveLink, name) => {
    try{
        const links = await Link.findOneAndUpdate({_id: linkId, userId}, { name, driveLink })
        return links !== null
    }catch (err){
        throw err
    }
}
exports.toggleStatusLink = async(userId, linkId, status) => {
    try{
        // console.log(status)
        const links = await Link.findOneAndUpdate({_id: linkId, userId}, { status })
        return links !== null
    }catch (err){
        throw err
    }
}



function randomId(length = 20) {
  return crypto.randomBytes(length).toString('base64url').slice(0, length)
}
