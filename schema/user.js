const joi = require('joi')
// 判断合法性
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const oldpassword = joi.string().pattern(/^[\S]{6,12}$/).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().required()
// 见名
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

exports.update_userinfo_schema = {
    body: {
        nickname,
        email
    }
}

exports.reset_password = {
    body: {
        oldpassword,
        newpassword: password
    }
}

exports.update_user_pic = {
    body: {
        avatar
    }
}