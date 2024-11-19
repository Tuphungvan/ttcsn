const mongoose = require('mongoose'); 
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete'); 

// Khai báo Schema cho Order
const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }, 
    valid: { type: Date, required: true }, 
    slug: { type: String, slug: 'name', unique: true }
});

// Cài đặt plugin slug để tự động tạo slug từ trường 'name'
mongoose.plugin(slug);

// Cài đặt plugin mongoose-delete để hỗ trợ xóa mềm
OrderSchema.plugin(mongooseDelete, {
    deletedAt: true,  // Trường deletedAt để đánh dấu thời gian xóa
    overrideMethods: 'all',  // Cung cấp các phương thức như find, findOne với xóa mềm
});

// Export model
module.exports = mongoose.model('Order', OrderSchema);
