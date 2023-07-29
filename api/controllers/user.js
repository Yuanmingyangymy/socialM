import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
    const userId = req.params.userId
    const q = `SELECT * FROM users WHERE id = ?`

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        const { password, ...info } = data[0]
        return res.json(info)

    })

}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("未登录")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("用户登录已过期，请重新登录")

        const userId = userInfo.id
        const { username, city, website, profilePic, coverPic } = req.body
        // 查询当前用户名
        const getCurrentUsernameQuery = "SELECT `username` FROM users WHERE id = ?"

        db.query(getCurrentUsernameQuery, [userId], (err, data) => {
            if (err) return res.status(500).json(err)
            const currentUsername = data[0].username

            // 如果输入的用户名与当前用户名相同，则设置新用户名为当前用户名，避免报错
            const newUsername = username === currentUsername ? currentUsername : username

            // 构建待更新字段和参数
            const updateFields = []
            const updateParams = []

            if (newUsername !== undefined) {
                updateFields.push("`username` = ?")
                updateParams.push(newUsername)
            }
            if (city !== undefined) {
                updateFields.push("`city` = ?")
                updateParams.push(city)
            }
            if (website !== undefined) {
                updateFields.push("`website` = ?")
                updateParams.push(website)
            }
            if (profilePic !== undefined) {
                updateFields.push("`profilePic` = ?")
                updateParams.push(profilePic)
            }
            if (coverPic !== undefined) {
                updateFields.push("`coverPic` = ?")
                updateParams.push(coverPic)
            }

            // 如果没有更新字段，则返回成功
            if (updateFields.length === 0) {
                return res.json("没有要更新的信息")
            }

            // 更新用户信息
            const updateQuery = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`
            const updateParamsWithUserId = [...updateParams, userId]

            db.query(updateQuery, updateParamsWithUserId, (updateErr, updateData) => {
                if (updateErr) return res.status(500).json(updateErr)
                if (updateData.affectedRows > 0) return res.json("更新成功")
                return res.status(400).json("只可以更新自己账号的信息")
            })

        })

    })


}