const mongoose= required('mongoose');

const Oder= new mongoose.Schema
(
    {
    name: {type:String, required: true,minlength: 6,maxlength: 50},
    price: {type:Number, required:true },
    description: {type: String, requied: true},
    valid: {type: Date, requied:true},// Ngày tạo khởi tạo đơn hàng có hiệu lực
    slug: { type: String, slug: 'name', unique: true },
    }
);
mongoose.plugin(slug);  // Plugin tạo slug tự động
Tour.plugin(mongooseDelete, {
    deletedAt: true,  // Trường deletedAt để đánh dấu thời gian xóa
    overrideMethods: 'all',  // Cung cấp các phương thức như find, findOne với xóa mềm
});

module.exports = mongoose.model('Oder', Oder);
