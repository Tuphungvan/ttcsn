const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/SiteController')
// newsController.index
router.get('/search', siteController.Search)
router.get('/', siteController.index)
router.get('/tours/:slug', siteController.detail);


module.exports = router