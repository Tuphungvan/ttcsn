const express = require('express');
const router = express.Router();
const checkoutController = require('../app/controllers/CheckoutController');
const isAuthenticated = require('../app/middlewares/isAuthenticated'); 
// Route hiển thị trang thanh toán
router.get('/', isAuthenticated, checkoutController.index);

// Route xác nhận thanh toán
router.post('/confirm', isAuthenticated, checkoutController.confirm);
// Route chỉ đặt hàng
router.post('/place-order', isAuthenticated, checkoutController.placeOrder);
router.get('/my-orders', isAuthenticated, checkoutController.myOrders);
// Xác nhận thanh toán cho đơn hàng
router.post('/confirm-payment/:id', isAuthenticated, checkoutController.confirmPayment);

module.exports = router;
