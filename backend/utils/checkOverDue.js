const Request = require('../models/Request');
const Equipment = require('../models/Equipment');
const Notification = require('../models/Notification');

const checkOverdueAndLowStock = async () => {
  const now = new Date();
  const overdueLimit = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

  // 1. Check Overdue Requests
  const overdueRequests = await Request.find({
    status: 'approved',
    approvedAt: { $lt: new Date(now.getTime() - overdueLimit) }
  }).populate('user equipment');

  for (const request of overdueRequests) {
    const exists = await Notification.findOne({
      type: 'overdue',
      message: new RegExp(request.user.name + '.*' + request.equipment.name, 'i')
    });

    if (!exists) {
      await Notification.create({
        type: 'overdue',
        message: `${request.user.name} has not returned ${request.equipment.name} (Overdue)`
      });
    }
  }

  // 2. Check Low Stock
  const equipmentList = await Equipment.find();

  for (const equipment of equipmentList) {
    if (equipment.quantity <= equipment.threshold) {
      const exists = await Notification.findOne({
        type: 'low_stock',
        message: new RegExp(equipment.name, 'i')
      });

      if (!exists) {
        await Notification.create({
          type: 'low_stock',
          message: `Low stock alert: ${equipment.name} has only ${equipment.quantity} left`
        });
      }
    }
  }

  console.log('Checked overdue and low stock');
};

module.exports = checkOverdueAndLowStock;
