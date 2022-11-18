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
            res.cc("添加成功", 0)
        })
    })

}

exports.deleteCateByid = (req, res) => {
    const sql = "update article SET is_delete= 1 WHERE id=?"
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows != 1) return res.cc("删除错误")
        res.cc("删除成功", 0)
    })
}

exports.getArticleByid = (req, res) => {
    const sql = "SELECT name,alias FROM article WHERE id = ? AND is_delete=0"
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc("未找到该id数据")
        res.send({
            status: 0,
            message: "获取成功",
            data: results
        })
    })
}

exports.UpdateArticleByid = (req, res) => {
    const checkSQL = "SELECT name,alias,id FROM article WHERE id<>? AND name=? OR alias=?"
    const sql = "UPDATE article SET name=?,alias=? WHERE id=?"
    const data = req.body
    db.query(checkSQL, [data.id, data.name, data.alias], (err, results) => {
        console.log(results);
        if (err) return res.cc(err)
        if (results.length == 1) {
            if (results[0].name == data.name) return res.cc("该名称已被占用")
            if (results[0].alias == data.alias) return res.cc("别名已被占用")
        }
        if (results.length == 2) return res.cc("名称与别名均被占用")
        db.query(sql, [data.name, data.alias, data.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows != 1) return res.cc("更新失败，请重试")
            res.cc("更改成功", 0)
        })
    })

}