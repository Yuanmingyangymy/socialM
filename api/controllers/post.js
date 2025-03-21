const db = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');


module.exports.getAll = (req, res) => {
    // 进行身份认证
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("未登录！")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("用户登录已过期，请重新登录")

        const q = `SELECT p.*, u.id AS userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) ORDER BY p.createdAt DESC`

        db.query(q, (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json(data)
        })
    })

}

module.exports.getPosts = (req, res) => {

    const userId = req.query.userId

    // 进行身份认证
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("未登录！")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("用户登录已过期，请重新登录")

        //  筛选帖子对应要展示的用户
        // const q = userId !== "undefined"
        //     ? `SELECT p.*, u.id AS userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC` 
        //     : `SELECT p.*, u.id AS userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`
        const q = userId !== "undefined"
            ? `SELECT DISTINCT p.*, u.id AS userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
            : `SELECT DISTINCT p.*, u.id AS userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`

        const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

        db.query(q, values, (err, data) => {
            // console.log(data);
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })

}

module.exports.addPost = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("未登录！")
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("用户登录已过期，请重新登录")
        const q = "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)"
        // console.log(req.body);
        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("post发布成功")
        })
    })
}

module.exports.deletePost = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("未登录！")
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("用户登录已过期，请重新登录")
        const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?"

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.affectedRows > 0) return res.status(200).json("帖子已删除")
            return res.status(403).json("只能删除用户自己的帖子！")
        })
    })
}