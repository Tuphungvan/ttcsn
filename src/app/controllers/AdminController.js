// AdminController.js
const Tour = require('../models/Tour'); 
const User = require("../models/User");
const bcrypt = require("bcrypt");
class AdminController {
  async dashboard(req, res) {
    try {
        res.render('admin/dashboard'); // Tạo view 'dashboard' nếu chưa có
    } catch (err) {
        console.error('Error rendering dashboard view:', err);
        res.status(500).json({ message: "Server error", error: err });
    }
}

    // [GET] /admin/manage-tours - Quản lý danh sách tour
async manageTours(req, res) {
    try {
        const tours = await Tour.find(); // Lấy danh sách tất cả các tour
        console.log(tours); 
        res.render('admin/manageTours', { tours });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}

// [GET] /admin/create-tour - Tạo tour mới
async renderCreateTour(req, res) {
    res.render('admin/createTour');
}

// [POST] /admin/create-tour - Lưu tour mới
async createTour(req, res) {
    try {
        const { name, description, videoId, level, startDate, endDate, itinerary, price } = req.body;
        const newTour = new Tour({
            name,
            description,
            videoId,
            level,
            startDate,
            endDate,
            itinerary,
            price,
            image: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
        });
        await newTour.save();
        res.redirect('/admin/manage-tours');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}

// [GET] /admin/edit-tour/:id - Chỉnh sửa tour
async renderEditTour(req, res) {
    try {
        const tour = await Tour.findById(req.params.id).lean();
        res.render('admin/editTour', { tour });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}

// [POST] /admin/edit-tour/:id - Lưu chỉnh sửa
async updateTour(req, res) {
    try {
        const { name, description, videoId, level, startDate, endDate, itinerary, price } = req.body;
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, {
            name,
            description,
            videoId,
            level,
            startDate,
            endDate,
            itinerary,
            price,
            image: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
        }, { new: true });
        res.redirect('/admin/manage-tours');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
}

// [DELETE] /admin/delete-tour/:id - Xóa tour
async deleteTour(req, res) {
    try {
        
        await Tour.findByIdAndDelete(req.params.id);
        res.redirect('/admin/manage-tours');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
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
    async renderCreateAdminForm(req, res) {
        try {
            res.render('admin/createAdmin');
        } catch (err) {
            console.error('Error rendering create admin form:', err);
            res.status(500).json({ message: 'Server error', error: err });
        }
    }

}

module.exports = new AdminController();
