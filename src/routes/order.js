const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Route để đặt đơn hàng
router.post('/order', OrderController.createOrder);

// Route để hủy đơn hàng
router.delete('/order/:orderId', OrderController.cancelOrder);

module.exports = router;
