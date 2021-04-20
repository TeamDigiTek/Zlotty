const express = require('express')

const userController = require('../controllers/user')

const router = express.Router();

// User Routes
router.get('/', userController.getIndex)
router.get('/talk', userController.getTalk)

module.exports = router;