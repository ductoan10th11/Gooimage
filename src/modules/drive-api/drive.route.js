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

driveRouter.post('/link', Middleware.getPage, Controller.addLink)
driveRouter.delete('/link', Middleware.getPage, Controller.deleteLink)
driveRouter.put('/link', Middleware.getPage, Controller.updateLink)
driveRouter.patch('/link', Middleware.getPage, Controller.toggleStatusLink)

driveRouter.get("/:goolink", Controller.getList)
driveRouter.post("/:goolink", Controller.selectedImage)
driveRouter.get("/:goolink/selected", Middleware.refresh, Controller.getSelectedImage)

module.exports = driveRouter