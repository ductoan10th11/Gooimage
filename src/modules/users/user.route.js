const express = require('express')
const userRouter = express.Router()
const Auth = require('../../middlewares/auth.middleware')
const Controller = require('./user.controller')
const Role = require('../roles/role.service')

userRouter.get('/health', (req, res, next) => {
    res.json({status: "ok"});
})

userRouter.post('/auth', Auth.verify, Controller.auth)
userRouter.get('/me', Auth.refresh, Controller.me)
userRouter.delete("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });

});


module.exports = userRouter