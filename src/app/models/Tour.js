const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

// Khai báo schema cho Tour
const Tour = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },  // Tạo slug tự động từ trường 'name'
    },
    {
        timestamps: true,  // Tự động thêm createdAt và updatedAt
    },
);

// Thêm các plugin vào mongoose
mongoose.plugin(slug);  // Plugin tạo slug tự động
Tour.plugin(mongooseDelete, {
    deletedAt: true,  // Trường deletedAt để đánh dấu thời gian xóa
    overrideMethods: 'all',  // Cung cấp các phương thức như find, findOne với xóa mềm
});

// Xuất mô hình Tour
module.exports = mongoose.model('Tour', Tour);
