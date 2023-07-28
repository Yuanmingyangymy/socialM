// 登录注册的认证
import express from 'express';

import { login, register, logout } from '../controllers/auth.js';

const router = express.Router()


router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)

export default router