const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');


// tạo đơn hàng mới
router.post('/', OrderController.createOrder);

// lấy tất cả đơn hàng
router.get('/orders', OrderController.getAllOrders);

// lấy thông tin đơn hàng theo ID
router.get('/orderId', OrderController.getOrderById);

// cập nhật trạng thái đơn hàng
router.put('/:orderId/status', OrderController.updateOrderStatus);

// xóa đơn hàng (xóa mềm)
router.delete('/:orderId', OrderController.deleteOrder);

module.exports = router;
