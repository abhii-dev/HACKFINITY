const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
// const { getNotifications } = require('../controllers/notificationContoller');

const router = express.Router();

// Get notifications for a user
// router.get('/', protect, getNotifications);

module.exports = router;
