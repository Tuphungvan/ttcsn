
class ProfileController {
    async index(req, res) {
        try {
            // Kiểm tra xem người dùng đã đăng nhập chưa
            if (!req.session.user) {
                return res.redirect('/v1/auth/login'); // Chuyển đến trang đăng nhập nếu chưa đăng nhập
            }

            // Lấy thông tin người dùng từ session
            const user = req.session.user;

            // Render trang profile với thông tin người dùng
            res.render('profile', { user: user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }
}

module.exports = new ProfileController();
