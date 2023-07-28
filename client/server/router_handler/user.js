// 导入数据库操作模块，用以监测数据变化
const db = require('../db/index')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')

// 导入加密密码的包
const bcrypt = require('bcryptjs')
// 报名的处理函数
exports.regUser = (req, res) => {
    // 接收表单数据
    // console.log(req);
    const userinfo = req.body
    console.log(userinfo);
    // 定义mysql语句：检测昵称是否重复
    const sql = 'select * from socialm_users where tel=?'
    db.query(sql, userinfo.username, function (err, results) {
        // 执行sql语句失败
        if (err) {
            return res.send({
                message: err.message
            })
        }
        // 用户名已存在
        if (results.length > 0) {
            return res.send({
                message: '用户名重复，重新想一个吧'
            })
        }
        // 用户名可用，对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // 在数据库中插入新成员
        const sql = 'insert into socialm_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password, }, function (err, results) {
            // 执行sql语句失败
            if (err) {
                return res.send({
                    message: err.message
                })
            }
            // sql语句执行成功，但影响行数不为1
            if (results.affectedRows !== 1) {
                return res.send({
                    message: '注册失败，请稍后再试'
                })
            }
            // 注册成功
            res.send({
                message: '注册成功'
            })
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    // console.log(userinfo);
    const sql = `select * from socialm_users where username=?`
    db.query(sql, userinfo.username, function (err, results) {
        if (err) {
            return res.send(err.message)
        }
        if (results.length !== 1) {
            return res.send({
                message: '登录失败'
            })
        }
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
        return res.send('登录失败！')
        }
        //在服务器端生成Token字符串
        const user = { ...results[0], password: ''}
        //对用户信息进行加密，生成Token字符串
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '72h', // token 有效期为 72 个小时
        })
        // console.log(req.auth);
        res.send({
            status: 0,
            message: '登录成功',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
    })
}