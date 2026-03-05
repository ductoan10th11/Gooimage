const express = require('express')
const driveRouter = express.Router()
const Controller = require('./drive.controller')
const Middleware = require('../../middlewares/auth.middleware')

driveRouter.route('/health')
    .get(Controller.testServer)

driveRouter.route('/dashboard')
    .get(Middleware.getPage, Controller.dashboard)

driveRouter.route('/api')
    .get(Middleware.getPage, Controller.api)

driveRouter.route('/support')
    .get(Middleware.getPage, Controller.support)

driveRouter.route('/upgrade')
    .get(Middleware.getPage, Controller.upgrade)

driveRouter.route('/link')
    .get(Middleware.getPage, Controller.link)
    .post(Middleware.getPage, Controller.addLink)
    .put(Middleware.getPage, Controller.updateLink)
    .delete(Middleware.getPage, Controller.deleteLink)
    .patch(Middleware.getPage, Controller.toggleStatusLink)

driveRouter.route('/link/:goolink/images')
    .get(Controller.getList)

driveRouter.route('/link/:goolink/selected-images')
    .get(Middleware.refresh, Controller.getSelectedImage)
    .post(Controller.selectedImage)
    .delete(Middleware.refresh, Controller.clearSelectedImage)

module.exports = driveRouter