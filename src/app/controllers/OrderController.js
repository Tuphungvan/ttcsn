const Order = require('../models/Order');

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
    const { customer, tour, price, description, valid, status } = req.body;

    try {
        // Tạo đơn hàng mới
        const newOrder = new Order({
            customer,
            tour,
            price,
            description,
            valid,
            status
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            order: newOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error,cannot creat this order',
            error: error.message,
        });
    }
};

// Lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            orders: orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message,
        });
    }
};

// Lấy thông tin đơn hàng theo ID
exports.getOrderById = async (req, res) => {
    const { orderId } = req.params;//Lấy Id theo URL

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        res.status(200).json({
            success: true,
            order: order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message,
        });
    }
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;  // status có thể là 'pending', 'confirmed', hoặc 'cancelled' mặc đinhj theo model của Order

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order: order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message,
        });
    }
};

// Xóa đơn hàng (xóa mềm)
// Có thể dùng hàm isDeleted nếu không muốn xóa hẳn khỏi csdl(Recomended)
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Tìm đơn hàng theo ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        // Xóa đơn hàng (xóa mềm)
        await order.delete();

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error deleting order',
            error: error.message,
        });
    }
};
