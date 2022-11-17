const express = require("express")
const router = express.Router()
const userinfo = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema } = require('../schema/user')
const { reset_password } = require('../schema/user')
const { update_user_pic } = require('../schema/user')

router.get('/userinfo', userinfo.getUserInfo)
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo.updateUserInfo)
router.post('/updatepd',expressJoi(reset_password),userinfo.resetPassword)
router.post('/updatepic',expressJoi(update_user_pic),userinfo.update_user_pic)
module.exports = router