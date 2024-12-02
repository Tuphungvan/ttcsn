const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');



// Khai báo schema cho Tour
const TourSchema = new mongoose.Schema(
    {
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
    {
        timestamps: true,  // Tự động thêm createdAt và updatedAt
    },
);

// Thêm các plugin vào mongoose
mongoose.plugin(slug);  // Plugin tạo slug tự động
TourSchema.plugin(mongooseDelete, {
    deletedAt: true,  // Trường deletedAt để đánh dấu thời gian xóa
    overrideMethods: 'all',  // Cung cấp các phương thức như find, findOne với xóa mềm
});

// Xuất mô hình Tour
module.exports = mongoose.model('Tour', TourSchema);

