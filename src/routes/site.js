const express = require('express')
const router = express.Router()
const ensureActive = require('../app/middlewares/ensureActive');
const siteController = require('../app/controllers/SiteController')
// newsController.index
router.get('/search', siteController.Search)
router.get('/', ensureActive, siteController.index)
router.get('/tours/:slug', siteController.detail);


module.exports = router