const express = require("express")
const router = express.Router()
const userinfo = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema } = require('../schema/user')
const { reset_password } = require('../schema/user')
const { update_user_pic } = require('../schema/user')

// 获取信息
router.get('/userinfo', userinfo.getUserInfo)
// 更改信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo.updateUserInfo)
// 改密码
router.post('/updatepd',expressJoi(reset_password),userinfo.resetPassword)
// 上传头像
router.post('/updatepic',expressJoi(update_user_pic),userinfo.update_user_pic)
module.exports = router