// profileRouter.js
const express = require('express');
const router = express.Router();
const ensureActive = require('../app/middlewares/ensureActive');
const profileController = require('../app/controllers/ProfileController'); // Controller cho trang profile

// Hiển thị trang profile
router.get('/', ensureActive, profileController.index);

module.exports = router;
