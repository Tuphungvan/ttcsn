// profileRouter.js
const express = require('express');
const router = express.Router();

const profileController = require('../app/controllers/ProfileController'); // Controller cho trang profile

// Hiển thị trang profile
router.get('/', profileController.index);

module.exports = router;
