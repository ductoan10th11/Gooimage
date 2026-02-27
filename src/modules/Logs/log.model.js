const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    action: String,
    logType: {type: String, enum: ["log", "error"], default: "log"},
    description: String,
    ipaddress: String
}, {timestamps: true})

module.exports = mongoose.model('Log', logSchema)