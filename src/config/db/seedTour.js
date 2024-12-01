const mongoose = require('mongoose');
const Tour = require('../models/Tour'); // Import model Tour

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/travel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Dữ liệu mẫu
const sampleTours = [
    {
        name: 'Beach Paradise-Hạ Long',
        description: 'Relax on pristine beaches...',
        image: 'img/beach.jpg',
        videoId: 'beach123',
        level: 'Beginner',
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-05'),
        itinerary: 'Day 1: Arrival...',
        price: 500,
        slug: 'beach-paradise',
    },
    {
        name: 'Mountain Adventure-Hoàng Liên Sơn',
        description: 'Explore mountains...',
        image: 'img/mountain.jpg',
        videoId: 'mountain123',
        level: 'Intermediate',
        startDate: new Date('2024-12-10'),
        endDate: new Date('2024-12-17'),
        itinerary: 'Day 1: Arrival...',
        price: 750,
        slug: 'mountain-adventure',
    },
    {
        name: 'City Explorer-Đà Nẵng',
        description: 'Discover cultural treasures...',
        image: 'img/city.jpg',
        videoId: 'city123',
        level: 'Beginner',
        startDate: new Date('2025-01-05'),
        endDate: new Date('2025-01-07'),
        itinerary: 'Day 1: City tour...',
        price: 350,
        slug: 'city-explorer',
    },
];

// Thêm dữ liệu vào MongoDB
async function seedTours() {
    try {
        await Tour.deleteMany(); // Xóa dữ liệu (tour) cũ
        const result = await Tour.insertMany(sampleTours); // Chèn dữ liệu
        console.log('Data inserted:', result);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close(); // Đóng kết nối
    }
}

// Gọi hàm
seedTours();
