const express = require('express')
const driveRouter = express.Router()
const Controller = require('./drive.controller')
const Middleware = require('../../middlewares/auth.middleware')

driveRouter.get('/test', Controller.testServer)
driveRouter.get('/listImg/:id', Controller.getList)

driveRouter.get('/dashboard', Middleware.getPage, Controller.dashboard)
driveRouter.get('/link', Middleware.getPage, Controller.link)
driveRouter.get('/api', Middleware.getPage, Controller.api)
driveRouter.get('/support', Middleware.getPage, Controller.support)
driveRouter.get('/upgrade', Middleware.getPage, Controller.upgrade)

module.exports = driveRouter