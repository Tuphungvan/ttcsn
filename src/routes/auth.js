const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/AuthControllers')

// Hiển thị form đăng ký
router.get('/register', authController.index);

// Xử lý yêu cầu đăng ký
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
