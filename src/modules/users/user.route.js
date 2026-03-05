const express = require('express')
const userRouter = express.Router()
const Auth = require('../../middlewares/auth.middleware')
const Controller = require('./user.controller')
const Role = require('../roles/role.service')

userRouter.route('/health')
    .get((req, res, next) => { res.json({status: "ok"}) })

userRouter.route('/auth')
    .post(Auth.verify, Controller.auth)

userRouter.route('/me')
    .get(Auth.refresh, Controller.me)

userRouter.route("/logout")
    .delete((req, res) => {
        res.clearCookie("token");
        res.json({ message: "Logged out" }) 
    });


module.exports = userRouter