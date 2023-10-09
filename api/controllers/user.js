const db = require('../connect.js');
const jwt = require('jsonwebtoken');

module.exports.getUser = (req, res) => {
    const userId = req.params.userId
    const q = `SELECT * FROM users WHERE id = ?`

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        const { password, ...info } = data[0]
        return res.json(info)

    })

}

module.exports.updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("未登录");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("用户登录已过期，请重新登录");

        const userId = userInfo.id;
        const { username, city, website, profilePic, coverPic } = req.body;

        // 查询当前用户信息
        const getCurrentUserInfoQuery = "SELECT * FROM users WHERE id = ?";
        db.query(getCurrentUserInfoQuery, [userId], (err, data) => {
            if (err) return res.status(500).json(err);
            if (!data || data.length === 0) return res.status(404).json("用户信息未找到");

            const currentUserInfo = data[0];

            // 构建待更新字段和参数
            const updateFields = [];
            const updateParams = [];

            if (!isEmpty(username)) {
                currentUserInfo.username = username;
            }
            if (!isEmpty(city)) {
                currentUserInfo.city = city;
            }
            if (!isEmpty(website)) {
                currentUserInfo.website = website;
            }
            if (!isEmpty(profilePic)) {
                currentUserInfo.profilePic = profilePic;
            }
            if (!isEmpty(coverPic)) {
                currentUserInfo.coverPic = coverPic;
            }

            // 更新用户信息
            const updateQuery = "UPDATE users SET ? WHERE id = ?";
            db.query(updateQuery, [currentUserInfo, userId], (updateErr, updateData) => {
                if (updateErr) return res.status(500).json(updateErr);
                if (updateData.affectedRows > 0) return res.json(data);
                return res.status(400).json("只可以更新自己账号的信息");
            });
        });
    });
};

// 辅助函数，检查值是否为空或未定义
function isEmpty(value) {
    return value === undefined || value === null || value.trim() === "";
}
