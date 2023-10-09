const db = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports.getComments = (req, res) => {

    //  筛选帖子对应要展示的用户
    const q = `SELECT c.*, u.id AS userId, username, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err)
        // console.log(data);
        return res.status(200).json(data)
    })
}

module.exports.addComment = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("未登录！")
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        const q = "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)"

        const values = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("comment发布成功")
        })
    })
}