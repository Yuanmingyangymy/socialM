const express = require('express');

const { findUser } = require('../controllers/search.js');

const router = express.Router()


router.get("/find/:username", findUser)


module.exports = router