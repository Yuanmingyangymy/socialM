const express = require('express')
const { uploadFile, mergeFile, verifyFile } = require('../controllers/file.js')

const router = express.Router()

router.post('/upload', uploadFile)
router.post('/merge', mergeFile)
router.post('/verify', verifyFile)

module.exports = router
