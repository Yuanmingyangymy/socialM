import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getRelationships = (req, res) => {
    const q = `SELECT followerUserId FROM relationships WHERE followedUserId = ?`


    db.query(q, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data.map(relationship => relationship.followerUserId))
    })
}

export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
        // 使用唯一索引限制的方式来避免重复的关注关系数据，在插入数据之前先进行查询，判断关注关系是否已存在。
        const checkDuplicateQ = "SELECT COUNT(*) AS count FROM relationships WHERE followerUserId = ? AND followedUserId = ?";
        const checkDuplicateParams = [userInfo.id, req.body.userId];
        const values = [
            userInfo.id,
            req.body.userId
        ];

        db.query(checkDuplicateQ, checkDuplicateParams, (err, result) => {
            if(err) return res.status(500).json(err)
            if(result[0].count > 0) {
                 return res.status(400).json("该关注关系已存在")
            }
            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("成功关注");
            });
        })

       
    });
}

export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
      db.query(q, [userInfo.id, req.body.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Unfollow.");
      });
    });
}