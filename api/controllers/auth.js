const db = require('../connect.js');

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

module.exports.register = (req, res) => {

    // 检查用户是否已存在数据库中
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }

        if (data.length) return res.status(409).json("用户名已存在！请更换用户名")
        // 加密密码
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        // 创建新用户
        const q = "INSERT INTO users (`username`, `password`, `email`) VALUE (?)"

        const values = [
            req.body.username,
            hashedPassword,
            req.body.email
        ]
        db.query(q, [values], (err, data) => {
            if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).json("用户注册成功！")
        })
    })



}

module.exports.login = (req, res) => {
    // 先从数据库找是否有该用户名
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(404).json("未找到该用户，请注册！")

        // 若有，则核对密码(data[0]是当前user)
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if (!checkPassword) return res.status(400).json("用户名或密码错误")

        const token = jwt.sign({ id: data[0].id }, "secretkey")

        // 分开密码和其他信息，给客户端发送信息时不带密码
        const { password, ...others } = data[0]
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json(others)

    })
}

module.exports.logout = (req, res) => {
    // 此处参考express框架文档，如下设置才可顺利清除cookie
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("用户已退出")

}

module.exports.getAuthCode = (req, res) => {
    const { email } = req.body
    const q = `SELECT * FROM users WHERE email = ?`
    db.query(q, email, (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (data.length) return res.status(409).json("邮箱已被注册！")
        const transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            secureConnection: true,
            port: 465,
            secure: true,
            auth: {
                user: 'ymy030720@qq.com',
                pass: 'utsjzazagavadhgj'
            }
        })

        function createCode() {
            let codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let length = 6,
                code = "";
            for (let i = 0; i < length; i++) {
                let randomI = Math.floor(Math.random() * 10);
                code += codeArr[randomI];
            }
            return code;
        }
        const code = createCode()
        try {
            let info = transporter.sendMail({
                from: 'ymy030720@qq.com', // 发送源邮箱
                to: email, //目标邮箱号
                subject: "验证邮件", // 邮箱主题
                html:
                    `
                    <h1>验证码： ${code}</h1>
                `, // 发送的内容
            });
            // 验证邮件是否发送成功
            transporter.verify(async function (error, success) {
                if (!error) {
                    // 在数据库中创建一个emails表，点击获取验证码后，在其中存入相关验证码，设置有效期，然后点击注册时校验
                    const eq = "INSERT INTO emails (`email`) VALUE (?)"
                    db.query(eq, email, (err, data) => {
                        if (err) {
                            return res.status(500).json(err)
                        }
                        return res.status(200).json("邮箱注册成功！")
                    })

                    // 设置30分钟后自动删除验证码记录
                    setTimeout(() => {
                        const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?"

                        const eq = "DELETE FROM emails WHERE `email` = ?"
                        db.query(eq, email, (err, data) => {
                            if (err) return res.status(500).json(err)
                            if (data.affectedRows > 0) return res.status(200).json("邮箱及验证码已删除")
                            else return res.status(409).json('删除邮箱失败')
                        })
                        console.log(`Email record for ${email} has been deleted.`);
                    }, 30 * 60 * 1000); // 30分钟的毫秒数

                    return res.status(200).json('发送邮件成功');
                }
            })

        } catch (error) {
            return res.status(409).json(error);

        }

    })
}