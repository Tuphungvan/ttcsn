const User = require("../models/User");
const bcrypt = require("bcrypt");

class AuthController {
    // Trang đăng ký
    async index(req, res) {
        res.render('register'); 
    }
        async indexlogin(req, res) {
        res.render('login'); 
    }

    // Xử lý đăng ký người dùng
  async register(req, res) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Kiểm tra sự trùng lặp của email, username và phoneNumber trước khi lưu
        const existingUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username },
                { phoneNumber: req.body.phoneNumber }
            ]
        });

        if (existingUser) {
            let errorMessage = "";
            if (existingUser.email === req.body.email) {
                errorMessage = "Email is already registered.";
            }
            if (existingUser.username === req.body.username) {
                errorMessage = "Username is already taken.";
            }
            if (existingUser.phoneNumber === req.body.phoneNumber) {
                errorMessage = "Phone number is already registered.";
            }

            // Gửi thông báo lỗi và render lại trang
            return res.render('register', {
                errorMessage: errorMessage, // Gửi thông báo lỗi
                successMessage: '' // Không hiển thị thông báo thành công
            });
        }

        // Tạo và lưu người dùng mới
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        });

        await newUser.save();
        
        // Gửi thông báo thành công
        res.render('register', {
            successMessage: "You have registered successfully!", // Gửi thông báo thành công
            errorMessage: '' // Không hiển thị thông báo lỗi
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err });
    }
}



    //login
    async login(req, res) {
    try {
        // Tìm người dùng theo username
        const user = await User.findOne({ username: req.body.username });

        // Nếu không tìm thấy user với username
        if (!user) {
            return res.render('login', { errorMessage: "Username does not exist" }); // Trả lại trang login với thông báo lỗi
        }

        // So sánh mật khẩu người dùng với mật khẩu đã mã hóa trong cơ sở dữ liệu
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.render('login', { errorMessage: "Incorrect password" }); // Trả lại trang login với thông báo lỗi
        }

        // Nếu username và password đều hợp lệ, chuyển hướng đến trang home
        res.redirect('/'); // Ví dụ: chuyển đến honme

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}

}

module.exports = new AuthController();


