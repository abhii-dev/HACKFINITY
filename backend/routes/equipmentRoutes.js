const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');


const { getAllEquipment, addEquipment, editEquipment } = require('../controllers/equipmentController.js');



const router = express.Router();

router.get('/', protect, getAllEquipment);
router.post('/add', protect, authorizeRoles('admin'), addEquipment);
router.put('/:id', protect, authorizeRoles('admin'), editEquipment);

module.exports = router;
