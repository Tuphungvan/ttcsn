const Cart = require('../models/Cart');
const Order = require('../models/Order'); // Import model Order

class CheckoutController {
    // [GET] /checkout
    async index(req, res) {
        try {
            const userId = req.session.user.id; // Truy cập thông tin người dùng từ session
            const cart = await Cart.findOne({ userId });

            if (!cart || cart.items.length === 0) {
                return res.redirect('/cart'); // Nếu giỏ hàng rỗng, quay lại trang giỏ hàng
            }

            const total = cart.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
            res.render('users/checkout', { cart, total });

        } catch (error) {
            console.error(error);
            res.redirect('/cart');
        }
    }

    async confirm(req, res) {
        try {
            const userId = req.session.user?.id;
            const cart = await Cart.findOne({ userId });
            if (!cart || cart.items.length === 0) {
                return res.redirect('/cart');
            }

            const totalAmount = cart.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
            req.session.paymentStatus = 'Đã thanh toán và chờ xác nhận';
            res.status(200).end();
        } catch (error) {
            res.redirect('/checkout');
        }
    }

    // [POST] /checkout/place-order (Đặt hàng)
    async placeOrder(req, res) {
        try {
            const userId = req.session.user.id;  // ID người dùng
            const cart = await Cart.findOne({ userId });

            if (!cart || cart.items.length === 0) {
                return res.redirect('/cart');
            }

            // Tính tổng tiền
            const totalAmount = cart.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

            // Xác định trạng thái đơn hàng dựa trên trạng thái thanh toán
            const orderStatus = req.session.paymentStatus === 'Đã thanh toán và chờ xác nhận'
                ? 'Đã thanh toán và chờ xác nhận'
                : 'Chờ thanh toán';

            const newOrder = new Order({
                userId,
                items: cart.items,
                totalAmount,
                status: orderStatus, // Trạng thái có thể là "Chờ thanh toán" hoặc "Đã thanh toán và chờ xác nhận"
                paymentMethod: 'Giả lập', // Có thể là ví điện tử hoặc thanh toán qua các phương thức khác
            });

            // Lưu đơn hàng
            await newOrder.save();

            // Xóa giỏ hàng sau khi tạo đơn hàng
            await Cart.deleteOne({ userId });

            // Hiển thị thông báo đặt hàng thành công
            res.render('users/checkout-success', { message: 'Đặt hàng thành công! Bạn có thể xem đơn hàng của mình trong My Orders.' });

        } catch (error) {
            console.error(error);
            res.redirect('/checkout');
        }
    }

    // [GET] /my-orders
    async myOrders(req, res) {
        try {
            const userId = req.session.user.id;
            const orders = await Order.find({ userId });

            res.render('users/my-orders', { orders });
        } catch (error) {
            console.error(error);
            res.redirect('/');
        }
    }

async confirmPayment(req, res) {
    try {
        const orderId = req.params.id;  // Lấy ID đơn hàng từ URL
        const order = await Order.findById(orderId);

        if (!order || order.status !== 'Chờ thanh toán') {
            return res.status(400).json({ message: 'Đơn hàng không hợp lệ hoặc đã thanh toán' });
        }

        order.status = 'Đã thanh toán và chờ xác nhận';  // Cập nhật trạng thái đơn hàng
        await order.save();  // Lưu lại thay đổi

        return res.status(200).json({ message: 'Xác nhận thanh toán thành công!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
    }
}


}

module.exports = new CheckoutController();
