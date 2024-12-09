const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Tour = require('./src/app/models/Tour');  // Import model Tour
const { connect } = require('./src/config/db'); // Import hàm kết nối DB

// Kết nối MongoDB
connect();
const tourLevels = ["Easy", "Medium", "Hard"];
// Danh sách tên tour cố định
const tourNames = [
    "Hà Nội 2 ngày 1 đêm",
    "Sapa 3 ngày 2 đêm",
    "Nha Trang 4 ngày 3 đêm",
    "Đà Nẵng 3 ngày 2 đêm",
    "Phú Quốc 4 ngày 3 đêm",
    "Huế 2 ngày 1 đêm",
    "Cát Bà 3 ngày 2 đêm",
    "Mũi Né 3 ngày 2 đêm",
    "Bình Ba 2 ngày 1 đêm",
    "Hạ Long 1 ngày",
    "Ninh Bình 2 ngày 1 đêm",
    "Quảng Bình 3 ngày 2 đêm",
    "Tây Nguyên 4 ngày 3 đêm",
    "Phú Yên 3 ngày 2 đêm",
    "Cần Thơ 3 ngày 2 đêm",
    "Hà Giang 4 ngày 3 đêm",
    "Quảng Ninh 2 ngày 1 đêm",
    "Vũng Tàu 2 ngày 1 đêm",
    "Quy Nhơn 3 ngày 2 đêm",
    "Cao Bằng 3 ngày 2 đêm",
    "Phong Nha 2 ngày 1 đêm",
    "Côn Đảo 4 ngày 3 đêm",
    "Vinh 3 ngày 2 đêm",
    "Thanh Hóa 2 ngày 1 đêm",
    "Sơn La 3 ngày 2 đêm",
    "Bắc Giang 3 ngày 2 đêm",
    "Quảng Nam 2 ngày 1 đêm",
    "Vân Đồn 2 ngày 1 đêm",
    "Lào Cai 4 ngày 3 đêm",
    "Ninh Thuận 3 ngày 2 đêm",
    "Bắc Ninh 1 ngày",
    "Tam Đảo 2 ngày 1 đêm",
    "Bến Tre 1 ngày",
    "Bà Nà Hills 1 ngày",
    "Long Hải 2 ngày 1 đêm",
    "Đà Lạt 3 ngày 2 đêm",
    "Vĩnh Long 2 ngày 1 đêm",
    "Sài Gòn 1 ngày",
    "Vinpearl Nha Trang 3 ngày 2 đêm",
    "Hồ Tuyền Lâm 3 ngày 2 đêm",
    "Mỹ Tho 1 ngày",
    "Châu Đốc 3 ngày 2 đêm",
    "Động Thiên Đường 2 ngày 1 đêm",
    "Đồ Sơn 2 ngày 1 đêm",
    "Bái Đính 2 ngày 1 đêm",
    "Thái Bình 1 ngày",
    "Phan Thiết 2 ngày 1 đêm",
    "Lạng Sơn 3 ngày 2 đêm",
    "Đắk Lắk 3 ngày 2 đêm",
    "Động Tam Giang 3 ngày 2 đêm",
    "Bảo Lộc 2 ngày 1 đêm",
    "Quảng Trị 3 ngày 2 đêm",
    "Mù Cang Chải 3 ngày 2 đêm",
    "Tả Lèng 3 ngày 2 đêm",
    "Côn Sơn 2 ngày 1 đêm",
    "Bình Phước 3 ngày 2 đêm",
    "Lâm Đồng 4 ngày 3 đêm",
    "Quảng Ngãi 3 ngày 2 đêm",
    "Bãi Sao 2 ngày 1 đêm",
    "Cát Tiên 3 ngày 2 đêm",
    "Cà Mau 3 ngày 2 đêm",
    "Gành Đá Đĩa 3 ngày 2 đêm",
    "Vườn Quốc Gia Pù Mát 3 ngày 2 đêm",
    "Lai Châu 4 ngày 3 đêm",
    "Tây Bắc 3 ngày 2 đêm",
    "Pù Luông 3 ngày 2 đêm",
    "Củ Chi Tunnels 1 ngày",
    "Lạch Tray 2 ngày 1 đêm",
    "Bản Áng 3 ngày 2 đêm",
    "Cầu Đất Farm 2 ngày 1 đêm",
    "Hồ Núi Cốc 2 ngày 1 đêm",
    "Mộc Châu 2 ngày 1 đêm",
    "Mai Châu 2 ngày 1 đêm",
    "Ba Na 3 ngày 2 đêm",
    "Vườn Quốc Gia Cát Tiên 3 ngày 2 đêm",
    "Cảng Sa Kỳ 1 ngày",
    "Phú Quốc 3 ngày 2 đêm",
    "Vinpearl Phú Quốc 3 ngày 2 đêm",
    "Vạn Chài 2 ngày 1 đêm",
    "Thác Pongour 1 ngày",
    "Cáp Treo Bà Nà 2 ngày 1 đêm",
    "Đà Nẵng – Hội An 3 ngày 2 đêm",
    "Huế – Cố đô 2 ngày 1 đêm",
    "Mũi Né – Phan Thiết 3 ngày 2 đêm",
];

const fakeYouTubeLinks = [
    "https://www.youtube.com/watch?v=FClS4ni4zfo",
    "https://www.youtube.com/watch?v=2_86KFKD1wE",
    "https://www.youtube.com/watch?v=wiXL60wHv9U",
    "https://www.youtube.com/watch?v=PzC4_zNcSSM",
    "https://www.youtube.com/watch?v=__5mr_Xtb30",
    "https://www.youtube.com/watch?v=H9jnHww5fEs",
    "https://www.youtube.com/watch?v=RW399aWprpA",
    "https://www.youtube.com/watch?v=XMWxvKWst3o",
    "https://www.youtube.com/watch?v=aFyEqdFvdLg",
    "https://www.youtube.com/watch?v=vt9OL_sJ5gA",
    "https://www.youtube.com/watch?v=JKpHPKY0_Vw",
    "https://www.youtube.com/watch?v=ABGZj11HsPU",
    "https://www.youtube.com/watch?v=G_Lo50efCFc",
    "https://www.youtube.com/watch?v=praSuRn1Eog",
    "https://www.youtube.com/watch?v=ffgtLwwRSwM",
    "https://www.youtube.com/watch?v=XzEBYQpJaZI",
    "https://www.youtube.com/watch?v=hqzs0IUGZzA",
    "https://www.youtube.com/watch?v=bB_mm7cI-6k",
    "https://www.youtube.com/watch?v=CPIcHYPhL9M",
    "https://www.youtube.com/watch?v=9hhu0Jspays",
    "https://www.youtube.com/watch?v=KNlB_Ps8voc",
    "https://www.youtube.com/watch?v=Gmvd6D0x8QU",
    "https://www.youtube.com/watch?v=OUf-GhCkQMg",
    "https://www.youtube.com/watch?v=dhjfdZoKMs8",
    "https://www.youtube.com/watch?v=93YTjPu9v6c",
    "https://www.youtube.com/watch?v=XA7oCKayWuc",
    "https://www.youtube.com/watch?v=JmqtbFAtSHY",
    "https://www.youtube.com/watch?v=AQ8X8mpJO7E",
    "https://www.youtube.com/watch?v=-AREhw2Ot3o",
    "https://www.youtube.com/watch?v=dymId6vgbmc",
    "https://www.youtube.com/watch?v=AELdXndq0Ao",
    "https://www.youtube.com/watch?v=Ggq5UVbKlPE",
    "https://www.youtube.com/watch?v=DBTmT9fZM58",
    "https://www.youtube.com/watch?v=MQKGiewMGi0",
    "https://www.youtube.com/watch?v=I9x-LqccIa0",
    "https://www.youtube.com/watch?v=X4MxLi96fZ0",
    "https://www.youtube.com/watch?v=XefN1YQZQ4I",
    "https://www.youtube.com/watch?v=7egWe_NUt9M",
    "https://www.youtube.com/watch?v=3-URUlnAjV0",
    "https://www.youtube.com/watch?v=cUnqJNrOiHg",
    "https://www.youtube.com/watch?v=czBbA6N8nFc",
    "https://www.youtube.com/watch?v=bt_7UKYgBcs",
    "https://www.youtube.com/watch?v=vcHobtIGoro",
    "https://www.youtube.com/watch?v=ghGJowSpubI",
    "https://www.youtube.com/watch?v=ek_MjWD5c_I",
    "https://www.youtube.com/watch?v=DLRWjJQNoIs",
    "https://www.youtube.com/watch?v=CjmAawSGBM0",
    "https://www.youtube.com/watch?v=1hdh55Ysqow",
    "https://www.youtube.com/watch?v=Wbs9-RixX04",
    "https://www.youtube.com/watch?v=gm0iCGdQ9bM",
    "https://www.youtube.com/watch?v=5Eo9PlZdjyE",
    "https://www.youtube.com/watch?v=wgLGq4oC2rY",
    "https://www.youtube.com/watch?v=FfOziEkc9z4",
    "https://www.youtube.com/watch?v=n9zalvoXpbA",
    "https://www.youtube.com/watch?v=Ht96l3Pvc8Q",
    "https://www.youtube.com/watch?v=2uJObQOHp2w",
    "https://www.youtube.com/watch?v=kROLFoXBdk0",
    "https://www.youtube.com/watch?v=TQmbH4ibtMk",
    "https://www.youtube.com/watch?v=FG3xRslqd1A",
    "https://www.youtube.com/watch?v=GDv5fmdSr5Q",
    "https://www.youtube.com/watch?v=YUe1Y0mj-t0",
    "https://www.youtube.com/watch?v=H-In64ci7Ss",
    "https://www.youtube.com/watch?v=ks0mOYXeMJk",
    "https://www.youtube.com/watch?v=Xi8o__ui8TU",
    "https://www.youtube.com/watch?v=sVHVAfWyf1o",
    "https://www.youtube.com/watch?v=sVHVAfWyf1o",
    "https://www.youtube.com/watch?v=hWY9uxj-oZ4",
    "https://www.youtube.com/watch?v=G9BzWW38BOA",
    "https://www.youtube.com/watch?v=aGB_K-AKHus",
    "https://www.youtube.com/watch?v=OlZLB61StwA",
    "https://www.youtube.com/watch?v=tcSNJ7St0Js",
    "https://www.youtube.com/watch?v=qVlHG8BNpyg",
    "https://www.youtube.com/watch?v=--6RNepiuzs",
    "https://www.youtube.com/watch?v=1Movp6jqiWA",
    "https://www.youtube.com/watch?v=CscJkiPuU-M",
    "https://www.youtube.com/watch?v=zx2iQF_1J_0",
    "https://www.youtube.com/watch?v=nir17WYWl5g",
    "https://www.youtube.com/watch?v=-GtPcwzl_-c",
    "https://www.youtube.com/watch?v=a-BVtpTi8aM",
    "https://www.youtube.com/watch?v=LWnoKBSD-aI",
    "https://www.youtube.com/watch?v=K1ie-Vgss-Q",
    "https://www.youtube.com/watch?v=baJCHsIsOSo",
];

// Hàm tạo một tour giả lập
// Hàm trích xuất videoId từ URL YouTube
const extractVideoId = (videoUrl) => {
    if (typeof videoUrl === 'string' && videoUrl) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\?]+|\S+\/\S+\/\S+))?([a-zA-Z0-9_-]{11})/;
        const match = videoUrl.match(regex);
        return match ? match[1] : null;
    }
    return null; // Trả về null nếu không tìm thấy ID
};
const generateTour = (name, videoUrl) => {

    const daysMatch = name.match(/(\d+)\s+ngày/); // Trích xuất số ngày từ tên tour
    const days = daysMatch ? parseInt(daysMatch[1]) : 1; // Mặc định 1 ngày nếu không tìm thấy
    const startDate = faker.date.future(); // Ngẫu nhiên ngày bắt đầu
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days - 1); // Cộng số ngày (trừ 1 vì đã tính ngày đầu)

    // Trích xuất videoId từ URL
    const extractVideoId = (url) => {
        const match = url.match(/v=([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    };

    const videoId = extractVideoId(videoUrl); // Trích xuất videoId từ URL
    const image = videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : null; // Tạo thumbnail từ videoId

    return {
        name: name, // Tên tour cố định
        description: `Khám phá vẻ đẹp tuyệt vời của ${name}, một hành trình đầy thú vị và hấp dẫn. Tour này sẽ đưa bạn đến những điểm đến tuyệt đẹp, nơi bạn có thể tận hưởng cảnh quan thiên nhiên hoang sơ, những bãi biển dài, núi non hùng vĩ, cũng như văn hóa đặc sắc của mỗi vùng miền. Bạn sẽ được tham gia các hoạt động thú vị như tham quan di tích lịch sử, thưởng thức ẩm thực địa phương đặc sắc và trải nghiệm cuộc sống của người dân nơi đây. Chắc chắn rằng chuyến đi này sẽ mang đến cho bạn những kỷ niệm khó quên, sự thư giãn tuyệt đối và cảm giác hạnh phúc khi khám phá những vùng đất mới.`,
        image, // Sử dụng thumbnail URL từ videoId
        videoId: videoUrl, // Lưu video URL đầy đủ
        level: tourLevels[Math.floor(Math.random() * tourLevels.length)], // Chọn cấp độ tour ngẫu nhiên
        startDate: startDate,
            endDate: endDate,
        itinerary: faker.lorem.paragraph(), // Lịch trình tour ngẫu nhiên
        price: faker.number.int({ min: 5000000, max: 20000000 }), // Sửa lại cách sử dụng faker.number.int
        slug: faker.helpers.slugify(name) // Tạo slug từ tên tour
    };
};


// Hàm thêm dữ liệu vào MongoDB
const addTours = async () => {
    try {
        const tours = [];
        for (let i = 0; i < tourNames.length; i++) {
            // Lấy video URL từ danh sách fakeYouTubeLinks
            const videoUrl = fakeYouTubeLinks[i % fakeYouTubeLinks.length]; // Sử dụng URL tuần hoàn nếu số tên tour > số link
            const newTour = generateTour(tourNames[i], videoUrl); // Tạo một tour mới với video URL
            tours.push(newTour);
        }

        await Tour.insertMany(tours); // Chèn tất cả tour vào MongoDB
        console.log('Thêm tour thành công!');
        process.exit(); // Thoát sau khi hoàn tất
    } catch (error) {
        console.error('Lỗi khi thêm tour:', error);
        process.exit(1); // Thoát với mã lỗi
    }
};

// Gọi hàm thêm tour
addTours();
