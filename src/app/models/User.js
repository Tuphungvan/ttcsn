const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 6
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
  admin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
