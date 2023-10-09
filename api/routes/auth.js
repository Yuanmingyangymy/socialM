// 登录注册的认证
const express = require('express');

const { login, register, logout, getAuthCode } = require('../controllers/auth.js');

const router = express.Router()


router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/getAuthCode", getAuthCode)

module.exports = router