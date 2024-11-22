const express = require('express')
const router = express.Router()
const searchTourController = require('../app/controllers/SearchTourController')
// Route tìm kiếm tours
router.get('/tour', searchTourController.Search);

module.exports = router;
