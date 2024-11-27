const express = require('express')
const router = express.Router()
const ensureActive = require('../app/middlewares/ensureActive');
const siteController = require('../app/controllers/SiteController')
// newsController.index
router.get('/search', ensureActive, siteController.search)
router.get('/', ensureActive, siteController.index)



module.exports = router