const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['requested', 'approved', 'returned', 'rejected'],
      default: 'requested'
    },
    requestDate: {
      type: Date,
      default: Date.now
    },
    returnDate: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
