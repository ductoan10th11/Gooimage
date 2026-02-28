const express = require('express')
const app = express()
const rateLimit = require("express-rate-limit");
const cors = require('cors')
const cookieParser = require('cookie-parser')

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,  
  max: 100,  
  standardHeaders: true,
  legacyHeaders: false,
});

// app.set("trust proxy", true);
app.use(cors({
  origin: "http://localhost:3618",
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(limiter);

const driveRouter = require('./modules/drive-api/drive.route')
app.use('/drive', driveRouter)
const userRouter = require('./modules/users/user.route')
app.use('/user', userRouter)

module.exports = app