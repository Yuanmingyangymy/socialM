import express from 'express';

import { getAll, getPosts, addPost, deletePost } from '../controllers/post.js';

const router = express.Router()

router.get("/all", getAll)
router.get("/", getPosts)
router.post("/", addPost)
router.delete("/:id", deletePost)

export default router