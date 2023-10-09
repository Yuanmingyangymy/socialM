const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');


const userRoutes = require('./routes/users.js')
const postRoutes = require('./routes/posts.js')
const likeRoutes = require('./routes/likes.js');
const commentRoutes = require('./routes/comments.js')
const authRoutes = require('./routes/auth.js')
const relationshipRoutes = require('./routes/relationship.js');
const searchRoutes = require('./routes/search.js');

const app = express()

// 中间件middlewares

// 设置请求头以允许跨域请求包含凭据信息
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
// express.json() 中间件是将 HTTP 请求体中的 JSON 数据转换成 JavaScript 对象。具体来说，它使用 JSON.parse() 方法将请求体中的 JSON 字符串解析成 JavaScript 对象，并将其赋值给 req.body 对象的属性。
app.use(express.json())
// 配置跨域
app.use(
    cors({
        origin: "http://localhost:3000"
    })
)
// 用于解析HTTP请求中的Cookie
app.use(cookieParser())

// 上传文件路由（因为只有项目中只有这一处使用到，就直接写在这里了）
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json("No file uploaded.");
    }
    const file = req.file
    res.status(200).json(file.filename)
})

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/relationships", relationshipRoutes)
app.use("/api/search", searchRoutes)

app.listen(8800, () => {
    console.log("api working well");
})