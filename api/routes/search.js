import express from 'express';

import { findUser } from '../controllers/search.js';

const router = express.Router()


router.get("/find/:username", findUser)


export default router