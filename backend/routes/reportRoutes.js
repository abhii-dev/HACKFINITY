const express = require('express');
const { generateSummaryReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/summary', protect, authorizeRoles('admin'), generateSummaryReport);

module.exports = router;
