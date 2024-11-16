const User = require("../models/User");
const bcrypt = require("bcrypt");

class AuthController {
    // Trang đăng ký
    async index(req, res) {
        res.render('register'); 
    }

    // Xử lý đăng ký người dùng
    async register(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            
            // Tạo user mới
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            });

            // Lưu user vào database
            const user = await newUser.save();
            res.status(200).json(user); // Trả về JSON dữ liệu user mới
        } catch (err) {
            res.status(500).json(err); // Bắt lỗi
        }
    }

    //login
     async login(req, res) {
        try {
            // Tìm người dùng theo username
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Wrong username!"); // Username không đúng
            }

            // So sánh mật khẩu người dùng với mật khẩu đã mã hóa trong cơ sở dữ liệu
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json("Wrong password!"); // Mật khẩu sai
            }

            // Nếu username và password đều hợp lệ, trả về thông tin người dùng
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err }); // Bắt lỗi server
        }
    }
}

module.exports = new AuthController();


