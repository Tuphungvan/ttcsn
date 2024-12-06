const express = require('express')
const router = express.Router()
const searchTourController = require('../app/controllers/SearchTourController')
// Route tìm kiếm tours
router.get('/tours', searchTourController.search);//tôi nghĩ sai ở đây

module.exports = router;
