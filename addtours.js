const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Tour = require('./src/app/models/Tour');  // Import model Tour
const { connect } = require('./src/config/db'); // Import hàm kết nối DB

// Kết nối MongoDB
connect();
const tourLevels = ["Easy", "Medium", "Hard"];
// Danh sách tên tour cố định
const tourNames = [
    "Hà Nội - Hạ Long 2 ngày 1 đêm", "Sapa 3 ngày 2 đêm", "Nha Trang 4 ngày 3 đêm", "Đà Nẵng - Hội An 3 ngày 2 đêm",
    "Phú Quốc 4 ngày 3 đêm", "Huế 2 ngày 1 đêm", "Cát Bà 3 ngày 2 đêm", "Mũi Né 3 ngày 2 đêm", "Bình Ba 2 ngày 1 đêm",
    "Hạ Long 1 ngày", "Ninh Bình - Tam Cốc 2 ngày 1 đêm", "Quảng Bình - Phong Nha 3 ngày 2 đêm", "Tây Nguyên - Đà Lạt 4 ngày 3 đêm",
    "Phú Yên 3 ngày 2 đêm", "Cần Thơ - Đồng bằng sông Cửu Long 3 ngày 2 đêm", "Hà Giang 4 ngày 3 đêm", "Quảng Ninh - Vịnh Bái Tử Long 2 ngày 1 đêm",
    "Vũng Tàu 2 ngày 1 đêm", "Quy Nhơn 3 ngày 2 đêm", "Cao Bằng 3 ngày 2 đêm", "Mộc Châu 2 ngày 1 đêm", "Mai Châu 2 ngày 1 đêm",
    "Phong Nha - Kẻ Bàng 2 ngày 1 đêm", "Côn Đảo 4 ngày 3 đêm", "Hà Nội - Mai Châu 2 ngày 1 đêm", "Ninh Bình - Tràng An 2 ngày 1 đêm",
    "Vinh - Cửa Lò 3 ngày 2 đêm", "Thanh Hóa - Sầm Sơn 2 ngày 1 đêm", "Sơn La - Mộc Châu 3 ngày 2 đêm", "Bắc Giang - Tây Yên Tử 3 ngày 2 đêm",
    "Quảng Nam - Hội An 2 ngày 1 đêm", "Vân Đồn 2 ngày 1 đêm", "Lào Cai - Sapa - Fansipan 4 ngày 3 đêm", "Ninh Thuận - Phan Rang 3 ngày 2 đêm",
    "Bắc Ninh - Đền Đô 1 ngày", "Hà Nội - Tam Đảo 2 ngày 1 đêm", "Bến Tre - Mỹ Tho 1 ngày", "Đà Nẵng - Bà Nà Hills 1 ngày",
    "Hạ Long - Quảng Ninh 2 ngày 1 đêm", "Quy Nhơn - Phú Yên 4 ngày 3 đêm", "Vũng Tàu - Long Hải 2 ngày 1 đêm", "Đà Lạt 3 ngày 2 đêm",
    "Cao Bằng - Thác Bản Giốc 2 ngày 1 đêm", "Vĩnh Long - Cần Thơ 2 ngày 1 đêm", "Hồ Chí Minh - Vũng Tàu 1 ngày", "Nha Trang - Vinpearl 3 ngày 2 đêm",
    "Đà Lạt - Hồ Tuyền Lâm 3 ngày 2 đêm", "Cái Bè - Mỹ Tho 1 ngày", "An Giang - Châu Đốc 3 ngày 2 đêm", "Quảng Bình - Động Thiên Đường 2 ngày 1 đêm",
    "Hải Phòng - Đồ Sơn 2 ngày 1 đêm", "Bình Định - Quy Nhơn 4 ngày 3 đêm", "Ninh Bình - Bái Đính 2 ngày 1 đêm", "Phú Quốc - Vinpearl Safari 3 ngày 2 đêm",
    "Thái Bình - Đền Trần 1 ngày", "Bình Thuận - Phan Thiết 2 ngày 1 đêm", "Lạng Sơn 3 ngày 2 đêm", "Đắk Lắk 3 ngày 2 đêm",
    "Phan Thiết - Mũi Né 3 ngày 2 đêm", "Huế - Động Tam Giang 3 ngày 2 đêm", "Bảo Lộc - Hồ Lâm 2 ngày 1 đêm", "Quảng Trị 3 ngày 2 đêm",
    "Yên Bái - Mù Cang Chải 3 ngày 2 đêm", "Lai Châu - Tả Lèng 3 ngày 2 đêm", "Hải Dương - Chùa Côn Sơn 2 ngày 1 đêm", "Bình Phước 3 ngày 2 đêm",
    "Lâm Đồng 4 ngày 3 đêm", "Quảng Ngãi 3 ngày 2 đêm", "Phú Quốc - Bãi Sao 2 ngày 1 đêm", "Sài Gòn - Vườn quốc gia Cát Tiên 3 ngày 2 đêm",
    "Cà Mau 3 ngày 2 đêm", "Phú Yên - Gành Đá Đĩa 3 ngày 2 đêm", "Quảng Ninh - Hạ Long 1 ngày", "Nghệ An 3 ngày 2 đêm",
    "Lai Châu - Sapa 4 ngày 3 đêm", "Hà Nội - Bái Đính - Tràng An 2 ngày 1 đêm", "Quảng Bình - Vườn Quốc gia Phong Nha 3 ngày 2 đêm",
    "Sơn La - Tây Bắc 3 ngày 2 đêm", "Phong Nha - Kẻ Bàng 3 ngày 2 đêm", "Thanh Hóa - Pù Luông 3 ngày 2 đêm", "Hồ Chí Minh - Củ Chi Tunnels 1 ngày",
    "Hải Phòng - Lạch Tray 2 ngày 1 đêm", "Mộc Châu - Bản Áng 3 ngày 2 đêm", "Đà Lạt - Cầu Đất Farm 2 ngày 1 đêm", "Quảng Ninh - Hạ Long 1 ngày",
    "Nghệ An - Vườn quốc gia Pù Mát 3 ngày 2 đêm", "Thái Nguyên - Hồ Núi Cốc 2 ngày 1 đêm", "Cần Thơ - Vườn cò Bằng Lăng 2 ngày 1 đêm"
];

const toursItineraries = tourNames.map((tour) => {
    let itinerary;
    if (tour.includes("3 ngày 2 đêm")) {
        itinerary = `
Ngày 1:
\n06:00: Đón khách tại điểm hẹn, khởi hành đến điểm du lịch.
\n12:00: Ăn trưa tại nhà hàng địa phương.
\n14:00: Tham quan các điểm nổi bật tại địa phương.
\n18:30: Ăn tối, tự do khám phá khu vực về đêm.
\nNgày 2:
\n07:00: Ăn sáng tại khách sạn.
\n08:00: Tham quan các làng văn hóa, danh lam thắng cảnh nổi bật.
\n12:00: Ăn trưa tại nhà hàng địa phương.
\n14:00: Tham quan địa danh nổi tiếng, mua sắm quà lưu niệm.
\n18:30: Ăn tối, thưởng thức đặc sản địa phương.
\nNgày 3:
\n07:00: Ăn sáng, trả phòng khách sạn.
\n08:00: Khám phá các điểm du lịch thiên nhiên.
\n11:30: Ăn trưa tại nhà hàng.
\n13:30: Khởi hành về điểm hẹn ban đầu.
\n19:00: Kết thúc hành trình.
        `;
    } else if (tour.includes("2 ngày 1 đêm")) {
        itinerary = `
Ngày 1:
\n06:00: Đón khách tại điểm hẹn, khởi hành đến điểm du lịch.
\n12:00: Ăn trưa tại nhà hàng địa phương.
\n14:00: Tham quan các điểm nổi bật tại địa phương.
\n18:30: Ăn tối, tự do khám phá khu vực về đêm.
\nNgày 2:
\n07:00: Ăn sáng tại khách sạn.
\n08:00: Tham quan các điểm du lịch thiên nhiên.
\n11:30: Ăn trưa, nghỉ ngơi.
\n13:30: Khởi hành về điểm hẹn ban đầu.
\n19:00: Kết thúc hành trình.
        `;
    } else if (tour.includes("1 ngày")) {
        itinerary = `
Ngày 1:
\n06:00: Đón khách tại điểm hẹn, khởi hành đến điểm du lịch.
\n09:00: Tham quan các điểm nổi bật tại địa phương.
\n12:00: Ăn trưa tại nhà hàng địa phương.
\n14:00: Tham quan thêm một số địa danh nổi bật.
\n17:30: Khởi hành về điểm hẹn ban đầu.
\n20:00: Kết thúc hành trình.
        `;
    } else if (tour.includes("4 ngày 3 đêm")) {
        itinerary = `
Ngày 1:
\n06:00: Đón khách tại điểm hẹn, khởi hành đến điểm du lịch.
\n12:00: Ăn trưa tại nhà hàng địa phương.
\n14:00: Tham quan các địa danh nổi tiếng.
\n18:30: Ăn tối, tự do khám phá khu vực về đêm.
\nNgày 2:
\n07:00: Ăn sáng tại khách sạn.
\n08:00: Khám phá văn hóa, phong tục tại các làng địa phương.
\n12:00: Ăn trưa tại nhà hàng địa phương.
\n14:00: Tham quan thiên nhiên và các hoạt động giải trí.
\n18:30: Thưởng thức bữa tối đặc sản.
\nNgày 3:
\n07:00: Ăn sáng tại khách sạn.
\n08:00: Tham quan thêm các khu vực di sản.
\n12:00: Ăn trưa tại nhà hàng.
\n14:00: Khám phá các khu chợ hoặc mua sắm lưu niệm.
\n18:30: Thưởng thức tiệc tối tại địa phương.
\nNgày 4:
\n07:00: Ăn sáng, trả phòng khách sạn.
\n08:00: Điểm đến cuối cùng trước khi về.
\n12:00: Ăn trưa, nghỉ ngơi.
\n14:00: Khởi hành về điểm hẹn ban đầu.
\n20:00: Kết thúc hành trình.
        `;
    }
    return { tour, itinerary };
});
// Hàm tạo một tour giả lập
const generateTour = (name) => {

    const daysMatch = name.match(/(\d+)\s+ngày/); // Trích xuất số ngày từ tên tour
    const days = daysMatch ? parseInt(daysMatch[1]) : 1; // Mặc định 1 ngày nếu không tìm thấy
    const startDate = faker.date.future(); // Ngẫu nhiên ngày bắt đầu
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days - 1); // Cộng số ngày (trừ 1 vì đã tính ngày đầu)

    return {
        name: name, // Tên tour cố định
        description: `Khám phá vẻ đẹp tuyệt vời của ${name}, một hành trình đầy thú vị và hấp dẫn. Tour này sẽ đưa bạn đến những điểm đến tuyệt đẹp, nơi bạn có thể tận hưởng cảnh quan thiên nhiên hoang sơ, những bãi biển dài, núi non hùng vĩ, cũng như văn hóa đặc sắc của mỗi vùng miền. Bạn sẽ được tham gia các hoạt động thú vị như tham quan di tích lịch sử, thưởng thức ẩm thực địa phương đặc sắc và trải nghiệm cuộc sống của người dân nơi đây. Chắc chắn rằng chuyến đi này sẽ mang đến cho bạn những kỷ niệm khó quên, sự thư giãn tuyệt đối và cảm giác hạnh phúc khi khám phá những vùng đất mới.`,
        image: `https://img.youtube.com/vi/${faker.string.alphanumeric(11)}/maxresdefault.jpg`,
        videoId: `https://www.youtube.com/watch?v=${faker.string.alphanumeric(11)}`,

        level: tourLevels[Math.floor(Math.random() * tourLevels.length)], // Chọn cấp độ tour ngẫu nhiên
        startDate: startDate,
            endDate: endDate,
        itinerary: toursItineraries.find(t => t.tour === name).itinerary,
            // Lịch trình tour ngẫu nhiên
        price: faker.number.int({ min: 5000000, max: 20000000 }), // Sửa lại cách sử dụng faker.number.int
        slug: faker.helpers.slugify(name) // Tạo slug từ tên tour
    };
};


// Hàm thêm dữ liệu vào MongoDB
const addTours = async () => {
    try {
        const tours = [];
        for (let i = 0; i < tourNames.length; i++) {
            const newTour = generateTour(tourNames[i]); // Tạo một tour mới từ tên cố định
            tours.push(newTour);
        }

        await Tour.insertMany(tours); // Chèn tất cả tour vào MongoDB
        console.log('Thêm 100 tour thành công!');
        process.exit(); // Thoát sau khi hoàn tất
    } catch (error) {
        console.error('Lỗi khi thêm tour:', error);
        process.exit(1); // Thoát với mã lỗi
    }
};

// Gọi hàm thêm tour
addTours();
