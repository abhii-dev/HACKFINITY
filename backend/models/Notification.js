const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  type: { type: String, enum: ['low_stock', 'overdue'] },
  createdAt: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);
