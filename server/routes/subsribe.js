const express = require('express')
const controller = require('../controllers/subscribe')
const router = express.Router()

router.post( '/subscribe', controller.subscribe )

module.exports = router