const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  requestEquipment,
  approveRequest,
  returnEquipment,
  getAllRequests,
  getMyRequests
} = require('../controllers/requestController');

const router = express.Router();

// Coaches and Players request equipment
router.post('/', protect, authorizeRoles('coach', 'player'), requestEquipment);

// Coaches and Players view their own requests
router.get('/my', protect, authorizeRoles('coach', 'player'), getMyRequests);

// Admin approves request
router.put('/approve/:id', protect, authorizeRoles('admin'), approveRequest);

// Coaches/Players return equipment
router.put('/return/:id', protect, authorizeRoles('coach', 'player'), returnEquipment);

// Admin views all requests
router.get('/getall', protect, authorizeRoles('admin'), getAllRequests);

module.exports = router;
