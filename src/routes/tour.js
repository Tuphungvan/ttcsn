const express = require('express')
const router = express.Router()
const SearchTourController = require('../app/controllers/SearchTourController')
// Route tìm kiếm tours
router.get('/tours/search', SearchTourController.search)
router.get('/', SearchTourController.index)
module.exports = router
