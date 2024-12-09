const Tour = require('../models/Tour');

class SiteController {

    // get trang chủ
    index(req, res) {
        res.render('users/home');
    }

    // get kết quả tìm kiếm
    async Search(req, res) {
        try {
            const { q, level, startDate, endDate, price } = req.query;
            const query = {};

            // Kiểm tra và xây dựng query
            if (q) {
                query.name = { $regex: q, $options: 'i' };  // Tìm theo tên tour
            }

            if (level && level !== "null") {
                query.level = level;
            }

            if (startDate && startDate !== "null") {
                query.startDate = { $gte: new Date(startDate) };
            }

            if (endDate && endDate !== "null") {
                query.endDate = { $lte: new Date(endDate) };
            }

            if (price && price !== "null") {
                query.price = { $lte: parseInt(price, 10) };
            }

            // Tìm kiếm tour từ cơ sở dữ liệu
            const searchTour = await Tour.find(query);

            // Kiểm tra nếu không có kết quả
            if (!searchTour || searchTour.length === 0) {
                return res.render('users/search', { tours: [], message: "Không tìm thấy tour phù hợp." });
            }

            // Render trang tìm kiếm và truyền dữ liệu vào view
            res.render('users/search', { tours: searchTour, message: null });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình tìm kiếm", error: err.message });
        }
    }

    async detail(req, res) {
        try {
            const { slug } = req.params;

            // Tìm tour theo slug
            const tour = await Tour.findOne({ slug });

            // Kiểm tra nếu không tìm thấy
            if (!tour) {
                return res.status(404).render('errors/404', { message: 'Tour not found' });
            }

            // Trích xuất videoId từ URL (tour.videoId)
            if (tour.videoId) {
                const urlObj = new URL(tour.videoId); // Tạo đối tượng URL
                tour.videoId = urlObj.searchParams.get('v'); // Lấy giá trị tham số 'v'
            }

            // Render trang detail với dữ liệu của tour
            res.render('users/tourdetail', { tour });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình lấy dữ liệu tour", error: err.message });
        }
    }

}

module.exports = new SiteController();
