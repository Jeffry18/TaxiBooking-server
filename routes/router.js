const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require("../middlewares/jwtMiddleware")

const router = new express.Router()

// Update routes to include /api prefix
router.post('/api/register', userController.registerController)
router.post('/api/login', userController.loginController)

module.exports = router