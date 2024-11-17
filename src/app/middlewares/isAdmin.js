const User = require("../models/User");

const isAdmin = async (req, res, next) => {
    try {
        // Kiểm tra nếu không có admin nào trong database
        const adminExists = await User.findOne({ admin: true });
        if (!adminExists) {
            // Cho phép truy cập nếu chưa có admin
            return next();
        }

        // Kiểm tra quyền admin từ session
        if (req.session && req.session.user && req.session.user.admin) {
            return next();
        }

        // Nếu không phải admin, chặn truy cập
        res.status(403).send('Forbidden: You do not have access to this page');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

module.exports = isAdmin;
