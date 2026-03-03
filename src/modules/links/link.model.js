const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    name: String,
    driveLink: {type: String},
    gooLink: {type: String, require: true, unique: true},
    status: {type: String, enum: ["active", "inactive"], default: "active"},
    viewer: {type: Number, default: 0},
    selectLimit: {type: Number, default: 0}
}, {timestamps: true})

module.exports = mongoose.model("Link", linkSchema)