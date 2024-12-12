const Order = require('../models/Order');
const History = require('../models/History');
const Tour = require('../models/Tour');

class ManagerOrderController {

    // 1. Lấy danh sách đơn hàng "Chờ thanh toán"
    async getOrdersPendingPayment(req, res) {
        try {
            const orders = await Order.find({ status: 'Chờ thanh toán' });
            res.render('admin/pending-payment', { orders });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra khi lấy danh sách đơn hàng chờ thanh toán.');
        }
    }


    // 2. Xóa đơn hàng chưa thanh toán
    async deletePendingOrder(req, res) {
        const { orderId } = req.params;
        try {
            await Order.findByIdAndDelete(orderId);
            res.redirect('/admin/manager-order/pending-payment');
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra khi xóa đơn hàng chưa thanh toán.');
        }
    }


    // 3. Lấy danh sách đơn hàng "Đã thanh toán và chờ xác nhận"
    async getOrdersToConfirm(req, res) {
        try {
            const orders = await Order.find({ status: 'Đã thanh toán và chờ xác nhận' });
            res.render('admin/to-confirm', { orders });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra khi lấy danh sách đơn hàng chờ xác nhận.');
        }
    }


    // 4. Xác nhận đơn hàng và chuyển sang trạng thái "Hoàn tất"
    async confirmOrder(req, res) {
        const { orderId } = req.params;
        try {
            const order = await Order.findById(orderId);

            // Kiểm tra trạng thái của đơn hàng
            if (order.status !== 'Đã thanh toán và chờ xác nhận') {
                return res.status(400).send('Đơn hàng không hợp lệ để xác nhận');
            }

            // Lấy thông tin tour từ đơn hàng
            const tour = await Tour.findOne({ slug: order.items[0].slug });
            if (!tour) {
                return res.status(404).send('Không tìm thấy tour tương ứng.');
            }

            // Cập nhật trạng thái của đơn hàng thành "Hoàn tất"
            order.status = 'Hoàn tất';
            await order.save(); // Lưu lại trạng thái mới

            res.redirect('/admin/manager-order/to-confirm');
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra khi xác nhận đơn hàng');
        }
    }


    // 5. Di chuyển đơn hàng đã hết hạn vào lịch sử
    async moveOrderToHistory(orderId) {
        try {
            const order = await Order.findById(orderId);

            if (!order) {
                return { message: 'Không tìm thấy đơn hàng.' };
            }

            // Lấy thông tin tour từ đơn hàng
            const tour = await Tour.findOne({ slug: order.items[0].slug });

            if (!tour) {
                return { message: 'Không tìm thấy tour tương ứng.' };
            }

            // Kiểm tra nếu tour đã kết thúc
            if (new Date() >= new Date(tour.endDate)) {
                // Tạo bản ghi trong lịch sử đơn hàng
                const History = new History({
                    userId: order.userId,
                    orderId: order._id,
                    completedAt: new Date(),
                    endDate: tour.endDate, // Lưu ngày kết thúc tour vào lịch sử đơn hàng
                });

                // Lưu vào OrderHistory
                await History.save();

                // Xóa đơn hàng khỏi hệ thống sau khi đã chuyển vào lịch sử
                await Order.findByIdAndDelete(order._id); // Xóa đơn hàng

                return { message: 'Đơn hàng đã được chuyển vào lịch sử và trạng thái đã cập nhật.' };
            } else {
                return { message: 'Tour chưa kết thúc, không thể chuyển đơn hàng vào lịch sử.' };
            }
        } catch (error) {
            console.error('Lỗi khi chuyển đơn hàng vào lịch sử:', error);
            return { message: 'Có lỗi xảy ra trong quá trình chuyển đơn hàng vào lịch sử.' };
        }
    }
    // 6. Lấy danh sách các đơn hàng "Hoàn tất"
    async getOrdersCompleted(req, res) {
        try {
            // Lấy danh sách đơn hàng có trạng thái "Hoàn tất"
            const orders = await Order.find({ status: 'Hoàn tất' });

            // Hiển thị danh sách các đơn hàng trong trang admin/completed.hbs
            res.render('admin/completed', { orders });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra khi lấy danh sách đơn hàng.');
        }
    }
    // 7. Admin xác nhận đơn hàng đã kết thúc
    async confirmExpiredOrder(req, res) {
        const { orderId } = req.params;
        try {
            const order = await Order.findById(orderId);

            if (!order) {
                return res.status(404).send('Không tìm thấy đơn hàng.');
            }

            // Lấy thông tin tour từ đơn hàng
            const tour = await Tour.findOne({ slug: order.items[0].slug });

            if (!tour) {
                return res.status(404).send('Không tìm thấy tour tương ứng.');
            }

            // Tạo bản ghi trong lịch sử đơn hàng
            const history = new History({
                userId: order.userId,
                orderId: order._id,
                completedAt: new Date(),  // Đánh dấu thời gian hoàn tất
                endDate: tour.endDate,  // Lưu ngày kết thúc tour vào lịch sử
            });

            await history.save();

            // Xóa đơn hàng khỏi collection Order
            await Order.findByIdAndDelete(orderId);

            res.redirect('/admin/manager-order/completed'); // Quay lại trang quản lý đơn hàng hoàn tất
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra khi xác nhận hết hạn.');
        }
    }


}

module.exports = new ManagerOrderController();
