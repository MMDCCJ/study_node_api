const db = require('../db/index')

exports.getArticleCates = (req, res) => {
    const sql = "SELECT * FROM article WHERE is_delete=0 order by id"
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "获取数据成功",
            data: results
        })
    })
}

exports.addArticleCates = (req, res) => {
    const data = req.body
    const sql = "INSERT INTO article SET ?"
    const checkSQL = "SELECT * FROM article WHERE name=? OR alias=?"
    db.query(checkSQL, [data.name, data.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length == 1) {
            if (results[0].name === data.name) {
                return res.cc("已存在该名称")
            }
            return res.cc("已存在该别名")
        }
        if (results.length == 2) return res.cc("已存在该名称与别名")
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows != 1) return res.cc("添加失败")
            res.cc("添加成功",0)
        })
    })

}