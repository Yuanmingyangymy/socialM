const db = require('../connect.js');

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

// 用于存储定时器标识
let registrationTimer = null;
module.exports.register = (req, res) => {
    const { authCode, email } = req.body
    // 校验验证码
    const q = `SELECT * FROM users WHERE email = ?`
    db.query(q, email, (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(409).json("该邮箱未注册！")
        const codeRight = data[0].code
        if (authCode == codeRight) {

            // 取消之前的定时器
            if (registrationTimer) {
                clearTimeout(registrationTimer);
                registrationTimer = null;
                console.log("Registration timer canceled.");
            }
            return res.status(200).json("用户注册成功");
        } else {
            return res.status(400).json("验证码不正确，请重新输入")
        }
    })




}

module.exports.login = (req, res) => {
    if (registrationTimer) {
        return res.status(409).json("请注册后登录！")
    }
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
    const username = req.body.username;
    const email = req.body.email;

    // 检查用户是否已存在数据库中
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";

    db.query(q, [username, email], (err, data) => {
        if (err) {
            console.error("Error checking user existence:", err);
            return res.status(500).json({ error: "数据库查询出错，请稍后重试" });
        }

        if (data.length) {
            return res.status(409).json("用户名或邮箱已存在！请更换用户名或邮箱");
        }

        // 邮箱验证代码
        const transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            secureConnection: true,
            port: 465,
            secure: true,
            auth: {
                user: 'ymy030720@qq.com',
                pass: 'utsjzazagavadhgj'
            }
        });

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
        const code = createCode();

        // 加密密码
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        transporter.sendMail({
            from: 'ymy030720@qq.com', // 发送源邮箱
            to: email, // 目标邮箱号
            subject: "验证邮件", // 邮箱主题
            html: `
                <div style="background-color: #fff; max-width: 400px; margin: 20px auto; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);">
                    <h1 style="color: #333;">验证码</h1>
                    <p style="font-size: 16px; color: #777;">您的验证码为：${code}</p>
                    <p style="font-size: 32px; color: #333; font-weight: bold;">${code}</p>
                    <p style="font-size: 16px; color: #333; font-weight: bold;">验证码将在30分钟后过期，请及时注册！</p>
                </div>
            ` // 发送的内容
        }, (sendErr, info) => {
            if (sendErr) {
                console.error("Error sending email:", sendErr);
                return res.status(500).json({ error: "邮件发送失败，请检查邮箱配置或稍后重试" });
            }

            // 验证邮件是否发送成功
            transporter.verify((verifyErr, success) => {
                if (verifyErr) {
                    console.error("Error verifying email transporter:", verifyErr);
                    return res.status(500).json({ error: "邮件验证失败，请检查邮箱配置或稍后重试" });
                }

                // 创建新用户
                const insertQuery = "INSERT INTO users (`username`, `password`, `email`, `code`) VALUES (?, ?, ?, ?)";
                const values = [username, hashedPassword, email, code];

                db.query(insertQuery, values, (insertErr, data) => {
                    if (insertErr) {
                        console.error("Error inserting user data:", insertErr);
                        return res.status(500).json({ error: "用户数据插入失败，请稍后重试" });
                    }

                    // 注册成功后，启动定时器
                    registrationTimer = setTimeout(() => {
                        // 定时器触发后，执行删除数据操作
                        const deleteQuery = "DELETE FROM users WHERE username = ? OR email = ?";
                        db.query(deleteQuery, [username, email], (deleteErr, data) => {
                            if (deleteErr) {
                                console.error("Error deleting user data:", deleteErr);
                            } else {
                                console.log("User data deleted after 30 minutes.");
                            }
                        });
                    }, 30 * 60 * 1000); // 30分钟的毫秒数

                    return res.status(200).json("验证码已发送，请及时查收邮件");
                });
            });
        });
    });
};