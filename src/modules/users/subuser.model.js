const mongoose = require('mongoose')

const subUserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    fileLimit: Number
}, {timestamps: true})

module.exports = mongoose.model("SubUser", subUserSchema)