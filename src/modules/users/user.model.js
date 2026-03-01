const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: String,
    provider: String,
    googleId: {type: String, required: true, unique: true},
    avatar: String,
    rank: {type: String, enum: ["member", "contributor", "shareholder"], default: "member"},
    linklimit: {type: Number, default: 5}
}, {timestamps: true})

// Thành viên
// Người đóng góp
// Trụ cột

module.exports = mongoose.model('User', userSchema)