const Link = require('./link.model')
const crypto = require('crypto')
const Selected = require('./selected.model')

exports.addLink = async(userId, rawLink, name, limit) => {
    try{
        const gooLink = randomId(20)
        const driveLink = rawLink.split("folders/")[1].split("?usp")[0]
        const links = await Link.create({userId, name, driveLink, gooLink, selectLimit: limit})
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
exports.deleteLink = async(userId, linkIdr) => {
    try{
        const links = await Link.findOneAndDelete({_id: linkIdr, userId})
        const linkId = links._id
        await Selected.findOneAndDelete({linkId})
        return links !== null
    }catch (err){
        throw err
    }
}
exports.updateLink = async(userId, linkId, rawLink, name, limit) => {
    try{
        const driveLink = rawLink.split("folders/")[1].split("?usp")[0]
        const links = await Link.findOneAndUpdate({_id: linkId, userId}, { name, driveLink, selectLimit: limit })
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
exports.getGooLink = async(rawLink) => {
    try{
        const goolink = await Link.findOneAndUpdate({gooLink: rawLink, status: "active"}, { $inc: { viewer: 1 } }, { returnDocument: "after" })
        const res = [goolink.name, goolink.driveLink, goolink.selectLimit]
        return res
    }catch(err){
        throw err
    }
}

exports.writeSelectionImage = async(gooLink, selected) => {
    try{
        const goolink = await Link.findOne({gooLink})
        const linkId = goolink._id
        const isExist = await Selected.findOne({linkId})
        if(isExist !== null) return null
        const sel = await Selected.create({linkId, selected})
        return sel !== null
    }catch(err){
        throw err
    }
}
exports.getSelectedImage = async(gooLink, userId) => {
    try{
        const goolink = await Link.findOne({userId, gooLink})
        const linkId = goolink._id
        const isExist = await Selected.findOne({linkId})
        if(isExist === null) return null
        return [gooLink, isExist.selected]
    }catch(err){
        throw err
    }
}
exports.clearSelectedImage = async(gooLink, userId) => {
    try{
        const goolink = await Link.findOne({userId, gooLink})
        const linkId = goolink._id
        const isExist = await Selected.deleteOne({linkId})
        if(isExist === null) return null
        return [gooLink, isExist.selected]
    }catch(err){
        throw err
    }
}



function randomId(length = 20) {
  return crypto.randomBytes(length).toString('base64url').slice(0, length)
}
