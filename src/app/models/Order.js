const mongoose = require('mongoose'); 
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete'); 

// Khai báo Schema cho Order
const OrderSchema = new mongoose.Schema({
    customer: {
        username: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 50, // Mở rộng tối đa cho tên đầy đủ
            unique: true
          },
          email: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 50,
            unique: true
          },
          phoneNumber: {
            type: String,
            required: false, // Không bắt buộc ở bước đăng ký
            maxlength: 15
          },
          address: {
            type: String,
            required: false, // Để dành cho việc đặt hàng sau này
            maxlength: 200
          },
    },
            // Thông tin tour
            tour: {
                name: { type: String, required: true },
                description: { type: String },
                image: { type: String },
                videoId: { type: String, required: true },
                level: { type: String },
                startDate: { type: Date },  // Ngày bắt đầu tour
                endDate: { type: Date },    // Ngày kết thúc tour
                itinerary: { type: String }, // Lịch trình tour
                price: { type: Number },      // Giá tour
                slug: { type: String, unique: true },  // Không sử dụng slug tự động
            },
    
            // Thông tin đơn hàng
            price: { type: Number, required: true },  // Tổng giá trị đơn hàng
            description: { type: String, required: true },  // Mô tả đơn hàng
            valid: { type: Date, required: true },  // Ngày hiệu lực của đơn hàng
            slug: { type: String, slug: 'tour.name', unique: true },  // Slug đơn hàng từ tên tour
    
            // Trạng thái đơn hàng
            status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },  
        },
        {
            timestamps: true,  // Tự động thêm createdAt và updatedAt
        }

);

// Cài đặt plugin slug để tự động tạo slug từ trường 'name'
mongoose.plugin(slug);

// Cài đặt plugin mongoose-delete để hỗ trợ xóa mềm
OrderSchema.plugin(mongooseDelete, {
    deletedAt: true,  // Trường deletedAt để đánh dấu thời gian xóa
    overrideMethods: 'all',  // Cung cấp các phương thức như find, findOne với xóa mềm
});

// Export model
module.exports = mongoose.model('Order', OrderSchema);
