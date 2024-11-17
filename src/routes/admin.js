// adminRoutes.js
const express = require('express');
const router = express.Router();
const isAdmin = require('../app/middlewares/isAdmin'); // Middleware kiểm tra quyền admin
const adminController = require('../app/controllers/AdminController');

// Chỉ cho phép admin truy cập
router.get('/dashboard', isAdmin, adminController.dashboard);
router.get('/users', isAdmin, adminController.manageUsers);
// Thêm các route khác cho admin như quản lý tour, v.v.
router.get('/create-admin', isAdmin, (req, res) => {
    res.render('createAdmin'); // Hiển thị form tạo admin
});
router.post('/create-admin', isAdmin, adminController.createAdmin); // Xử lý thêm admin


module.exports = router;
