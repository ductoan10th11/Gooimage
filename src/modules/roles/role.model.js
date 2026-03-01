const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    perId: { type: mongoose.Schema.Types.ObjectId, ref: "Permission"}
}, {timestamps: true})

roleSchema.index({ userId: 1, perId: 1 }, { unique: true })

module.exports = mongoose.model('Role', roleSchema)