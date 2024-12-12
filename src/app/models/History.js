const mongoose = require('mongoose');

// Schema cho order_history
const HistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    completedAt: { type: Date, default: Date.now }, // Thời gian chuyển sang lịch sử
    endDate: { type: Date, required: true }, // Ngày kết thúc tour
}, { timestamps: true });

module.exports = mongoose.model('History', HistorySchema);
