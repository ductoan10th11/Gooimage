const express = require('express')
const driveRouter = express.Router()
const Controller = require('./drive.controller')
driveRouter.get('/test', Controller.testServer)
driveRouter.get('/listImg/:id', Controller.getList)

module.exports = driveRouter