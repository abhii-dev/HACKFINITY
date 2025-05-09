const Request = require('../models/Request');
const Equipment = require('../models/Equipment');

// Request Equipment
exports.requestEquipment = async (req, res) => {
  const { equipmentId, quantity } = req.body;

  try {
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment || equipment.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient equipment quantity' });
    }

    const request = await Request.create({
      user: req.user._id,
      equipment: equipmentId,
      quantity
    });

    res.status(201).json({ message: 'Request submitted', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve Request
exports.approveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findById(id).populate('equipment');
    if (!request || request.status !== 'requested') {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const equipment = await Equipment.findById(request.equipment._id);
    if (equipment.quantity < request.quantity) {
      return res.status(400).json({ message: 'Not enough quantity in stock' });
    }

    request.status = 'approved';
    await request.save();

    equipment.quantity -= request.quantity;
    await equipment.save();

    res.json({ message: 'Request approved', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Return Equipment
exports.returnEquipment = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findById(id).populate('equipment');
    if (!request || request.status !== 'approved') {
      return res.status(400).json({ message: 'Request is not approved or already returned' });
    }

    request.status = 'returned';
    request.returnDate = new Date();
    await request.save();

    const equipment = await Equipment.findById(request.equipment._id);
    equipment.quantity += request.quantity;
    await equipment.save();

    res.json({ message: 'Equipment returned', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// View All Requests (Admin)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('user equipment');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// View My Requests (Coach/Player)
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user._id }).populate('equipment');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
