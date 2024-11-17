// AdminController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
class AdminController {
  async dashboard(req, res) {
    try {
        res.render('dashboard'); // Tạo view 'dashboard' nếu chưa có
    } catch (err) {
        console.error('Error rendering dashboard view:', err);
        res.status(500).json({ message: "Server error", error: err });
    }
}

  async manageUsers(req, res) {
    try {
      // Hiển thị danh sách người dùng
      const users = await User.find();
      res.render('admin/manageUsers', { users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err });
    }
  }

  // Các chức năng khác cho admin
   // Controller để tạo admin
    async createAdmin(req, res) {
        try {
          if (!req.session.user || !req.session.user.admin) {
            return res.redirect('/'); // Nếu không phải admin, chuyển hướng về trang chính
        }
            const { username, email, password, phoneNumber } = req.body;

            const existingUser = await User.findOne({
                $or: [
                    { email },
                    { username }
                ]
            });

            if (existingUser) {
                return res.render('admin/createAdmin', {
                    errorMessage: "Username or email already exists.",
                    successMessage: ''
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newAdmin = new User({
                username,
                email,
                password: hashedPassword,
                phoneNumber,
                admin: true // Gán quyền admin
            });

            await newAdmin.save();
            res.render('admin/createAdmin', {
                successMessage: "New admin created successfully!",
                errorMessage: ''
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }
}

module.exports = new AdminController();
