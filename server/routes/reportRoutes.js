const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const upload = require('../middleware/upload');
const apiLimiter = require('../middleware/rateLimiter');

router.post('/', apiLimiter, upload.single('image'), reportController.createReport);
router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);

module.exports = router;
