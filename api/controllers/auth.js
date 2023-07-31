import { db } from '../connect.js';

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = (req, res) => {

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

export const login = (req, res) => {
    // 先从数据库找是否有该用户名
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        console.log(data);
        if(err) return res.status(500).json(err)
        if(data.length === 0) return res.status(404).json("未找到该用户，请注册！")

        // 若有，则核对密码(data[0]是当前user)
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) return res.status(400).json("用户名或密码错误")

        const token = jwt.sign({id:data[0].id}, "secretkey")

        // 分开密码和其他信息，给客户端发送信息时不带密码
        const { password, ...others } = data[0]
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others)

    })
}

export const logout = (req, res) => {
    // 此处参考express框架文档，如下设置才可顺利清除cookie
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("用户已退出")

}