// adminRoutes.js
const express = require('express');
const router = express.Router();
const isAdmin = require('../app/middlewares/isAdmin'); // Middleware kiểm tra quyền admin
const adminController = require('../app/controllers/AdminController');

router.get('/edit-tour/:id', isAdmin, adminController.renderEditTour); // Danh sách tour
router.post('/edit-tour/:id', isAdmin, adminController.updateTour);
// Xử lý lưu tour
router.post('/delete-tour/:id', isAdmin, adminController.deleteTour); // Xóa tour
// Chỉ cho phép admin truy cập
router.get('/dashboard', isAdmin, adminController.dashboard);
router.get('/users', isAdmin, adminController.manageUsers);
// Thêm các route khác cho admin như quản lý tour, v.v.
router.get('/create-admin', isAdmin, adminController.renderCreateAdminForm);

router.post('/create-admin', isAdmin, adminController.createAdmin); // Xử lý thêm admin

// Quản lý tour
router.get('/manage-tours', isAdmin, adminController.manageTours); // Danh sách tour
router.get('/create-tour', isAdmin, adminController.renderCreateTour); // Danh sách tour
router.post('/create-tour', isAdmin, adminController.createTour); // Danh sách tour



module.exports = router;
