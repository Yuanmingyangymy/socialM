// 导入express模块
const express = require('express')
// 创建express服务器实例
const app = express()

const joi = require('joi')

// 导入cors中间件
const cors = require('cors')
// 将cors注册为全局中间件
app.use(cors())
// 配置解析表单数据的中间件
app.use(express.urlencoded({extended: false}))
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')


// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"]}).unless({ path: [/^\/api\//] }))

// 导入并使用路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入并使用个人信息的路由模块
// const userinfoRouter = require('./router/userinfo')
// app.use('/my', userinfoRouter)


// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.send({
        message: err instanceof Error ? err.message : err
    })
    //身份认证失败后的错误
    if(err.name === 'UnauthorizedError') return res.send({
        message: '身份认证失败'
    })
    // 未知错误
    res.send({
        message: err instanceof Error ? err.message : err
    })
})

// 调用app.listen方法，指定端口号并启动web服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007/')
})