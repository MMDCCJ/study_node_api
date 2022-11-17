const express = require('express')
const app = express()
const cors = require('cors')
const port = 3007
const userRouter = require("./router/user")
const userinfoRouter = require("./router/userinfo")
const joi = require('joi')
const {expressjwt} = require('express-jwt')
const config = require('./config')
// 解决跨域
app.use(cors())
// 解析表单数据中间键
app.use(express.urlencoded({ extended: false }))
// 方便给客户端发送数据
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
// 解析Token
app.use(
    expressjwt({
      secret: config.jwtSecretKey,
      algorithms: ["HS256"]
    }).unless({ path: [/^\/api/] })
  );
// 登录注册
app.use("/api", userRouter)
// 上传头像，更新数据
app.use('/my',userinfoRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
// 监听错误
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name == "UnauthorizedError") return res.cc(err)
    res.cc(err)
})
