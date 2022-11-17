const db = require('../db/index');
const bcrypt = require('bcryptjs')
exports.getUserInfo = (req, res) => {
    const sql = "SELECT id,username,nickname,email,user_pic FROM user_info WHERE id=?"
    console.log(req);
    console.log(res);
    db.query(sql, req.auth.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("获取失败")
        res.send({
            status: 0,
            message: "获取成功",
            data: results[0]
        })
    })
}
exports.updateUserInfo = (req, res) => {
    const newInfo = req.body
    const sql = "UPDATE user_info SET ? WHERE id=" + req.auth.id
    console.log(newInfo);
    db.query(sql, req.body, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("更新失败")
        res.cc("更新成功", 0)
    })
}
exports.resetPassword = (req, res) => {
    const userinfo = req.body
    const sql = "SELECT password FROM user_info WHERE id=?"
    console.log(req.auth.id);
    db.query(sql, req.auth.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc(err)
        if (!bcrypt.compareSync(userinfo.oldpassword, results[0].password)) return res.cc("密码输入错误")
        if (bcrypt.compareSync(userinfo.newpassword, results[0].password)) return res.cc("新旧密码不能一致")
        const set_new_pwSQL = "UPDATE user_info SET password=? WHERE id=?"
        const new_password = bcrypt.hashSync(userinfo.newpassword, 10)
        console.log("生成密码");
        db.query(set_new_pwSQL, [new_password, req.auth.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc(err)
            res.cc("更改密码成功")
        })
    })
}
exports.update_user_pic = (req, res) => {
    const sql = "UPDATE user_info SET user_pic=? WHERE id=?"
    db.query(sql, [req.body.pic, req.auth.id], (err, results) => {
        // if (err) return res.cc(err)
        // if (results.affectedRows != 1) return res.cc("更换失败请重试")
        res.send("成功")
    })
}