const Equipment = require('../models/Equipment');
const Request = require('../models/Request');
const User = require('../models/user.js');

exports.generateSummaryReport = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEquipment = await Equipment.countDocuments();
    const totalRequests = await Request.countDocuments();
    const activeRequests = await Request.countDocuments({ status: { $in: ['pending', 'approved'] } });
    const returnedRequests = await Request.countDocuments({ status: 'returned' });

    res.json({
      totalUsers,
      totalEquipment,
      totalRequests,
      activeRequests,
      returnedRequests,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error generating report' });
  }
};
