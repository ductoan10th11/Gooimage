const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    provider: String,
    googleId: String,
    avatar: String,
    rank: {type: String, enum: ["member", "contributor", "shareholder"], default: "member"},
    linklimit: {type: Number, default: 10}
}, {timestamps: true})

// Thành viên
// Người đóng góp
// Trụ cột

module.exports = mongoose.model('User', userSchema)