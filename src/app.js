const express = require('express')
const app = express()
const driveRouter = require('./modules/drive-api/drive.route')
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,  
  max: 100,  
  standardHeaders: true,
  legacyHeaders: false,
});

app.set("trust proxy", true);
app.use(express.json())
app.use(limiter);
app.use('/drive', driveRouter)

module.exports = app