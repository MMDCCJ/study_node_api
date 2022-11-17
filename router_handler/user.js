const db = require('../db/index');
// 加密密码用
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const config = require('../config')

exports.reguser = (req, res) => {
    // 获取客户端提交信息
    const userinfo = req.body
    const sql = 'SELECT * FROM user_info WHERE username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc("用户名被占用")
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const reguserSQL = "INSERT INTO user_info SET ?";
        db.query(reguserSQL, { password: userinfo.password, username: userinfo.username }, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc("注册失败,请稍后再试")
            }
            else {
                return res.cc("注册成功", 0)
            }
        })
    })
}

exports.login = (req, res) => {
    const userinfo = req.body
    const sql = "SELECT * FROM user_info WHERE username=?"
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("用户名错误")
        const compare = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compare) return res.cc("密码错误")
        console.log(results[0]);
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { algorithm:"HS256",expiresIn: config.expiresIn })
        console.log(tokenStr);
        res.send({
            status: 0,
            message: "登陆成功",
            token: "Bearer " + tokenStr
        })
    })

}