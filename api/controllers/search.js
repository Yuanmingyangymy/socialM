import { db } from '../connect.js';


export const findUser = (req, res) => {
    const username = req.params.username
    const q = `SELECT * FROM users WHERE username = ?`

    db.query(q, [username], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}