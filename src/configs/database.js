const mongoose = require('mongoose')
const Tracking = require('../modules/Logs/tracking')
const URI = process.env.MONGO_URI

const connectDB = async() => {
    try{
        await mongoose.connect(URI)
        console.log(' - Connect DB success')
    }catch (err){
        console.error(' [*] Fail to connect DB')
    }
}

module.exports = connectDB